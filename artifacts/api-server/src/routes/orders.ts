import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, productsTable, ordersTable } from "@workspace/db";
import {
  CreateOrderBody,
  GetOrderParams,
  GetOrderResponse,
  VerifyPaymentParams,
  VerifyPaymentBody,
} from "@workspace/api-zod";
import { logger } from "../lib/logger";
import { strictRateLimit, standardRateLimit } from "../middleware/rateLimit";
import { validateProductStock, sanitize } from "../middleware/validation";

const router: IRouter = Router();

function generateTxRef(orderId: number): string {
  return `GKC-${orderId}-${Date.now()}`;
}

async function initFlutterwavePayment(params: {
  txRef: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  redirectUrl: string;
}): Promise<string | null> {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey) {
    logger.warn("FLUTTERWAVE_SECRET_KEY not set — payment link unavailable");
    return null;
  }

  try {
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: params.txRef,
        amount: params.amount,
        currency: "NGN",
        redirect_url: params.redirectUrl,
        customer: {
          email: params.customerEmail,
          phonenumber: params.customerPhone,
          name: params.customerName,
        },
        customizations: {
          title: "Garkuwan Kanam & Co Ventures",
          description: `Purchase of ${params.productName}`,
          logo: "",
        },
        payment_options: "card,ussd,bank_transfer,mobilemoney",
      }),
    });

    const data = (await response.json()) as { status: string; data?: { link: string } };
    if (data.status === "success" && data.data?.link) {
      return data.data.link;
    }
    logger.warn({ data }, "Flutterwave payment init failed");
    return null;
  } catch (err) {
    logger.error({ err }, "Flutterwave API error");
    return null;
  }
}

router.post("/orders", strictRateLimit, async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", issues: parsed.error.issues });
    return;
  }

  const { productId, quantity, customerName, customerEmail, customerPhone, shippingAddress, notes } =
    parsed.data;

  // Validate stock
  const stockCheck = await validateProductStock(db, productsTable, productId, quantity);
  if (!stockCheck.valid) {
    res.status(400).json({ error: stockCheck.error });
    return;
  }

  const product = stockCheck.product;

  const totalAmountNgn = product.priceNgn * quantity;

  const [order] = await db
    .insert(ordersTable)
    .values({
      productId,
      productName: product.name,
      quantity,
      totalAmountNgn,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress: shippingAddress ?? null,
      notes: notes ?? null,
      status: "pending",
      paymentStatus: "pending",
    })
    .returning();

  const txRef = generateTxRef(order.id);

  const domains = process.env.REPLIT_DOMAINS?.split(",")[0] ?? "localhost";
  const redirectUrl = `https://${domains}/order-confirmation?orderId=${order.id}`;

  const paymentLink = await initFlutterwavePayment({
    txRef,
    amount: totalAmountNgn,
    customerName,
    customerEmail,
    customerPhone,
    productName: product.name,
    redirectUrl,
  });

  await db
    .update(ordersTable)
    .set({ txRef, paymentLink })
    .where(eq(ordersTable.id, order.id));

  req.log.info({ orderId: order.id, txRef }, "Order created");

  res.status(201).json({
    orderId: order.id,
    paymentLink: paymentLink ?? `https://checkout.flutterwave.com/pay/${txRef}`,
    txRef,
    totalAmountNgn,
  });
});

router.get("/orders/:id", standardRateLimit, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetOrderParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid order ID", issues: params.error.issues });
    return;
  }

  const [order] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, params.data.id));

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json(GetOrderResponse.parse(order));
});

router.post("/orders/:id/verify", strictRateLimit, async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = VerifyPaymentParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid order ID", issues: params.error.issues });
    return;
  }

  const body = VerifyPaymentBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Validation failed", issues: body.error.issues });
    return;
  }

  const [order] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, params.data.id));

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey) {
    res.status(400).json({ error: "Payment verification unavailable — API key not configured" });
    return;
  }

  try {
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${body.data.transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as {
      status: string;
      data?: { status: string; tx_ref: string; flw_ref: string; amount: number; currency: string };
    };

    if (
      data.status === "success" &&
      data.data?.status === "successful" &&
      data.data.tx_ref === order.txRef &&
      data.data.currency === "NGN" &&
      data.data.amount >= order.totalAmountNgn
    ) {
      const [updated] = await db
        .update(ordersTable)
        .set({
          paymentStatus: "paid",
          status: "confirmed",
          flwRef: data.data.flw_ref,
        })
        .where(eq(ordersTable.id, order.id))
        .returning();

      req.log.info({ orderId: order.id, flwRef: data.data.flw_ref }, "Payment verified");
      res.json(GetOrderResponse.parse(updated));
      return;
    }

    await db
      .update(ordersTable)
      .set({ paymentStatus: "failed" })
      .where(eq(ordersTable.id, order.id));

    res.status(400).json({ error: "Payment verification failed or amount mismatch" });
  } catch (err) {
    req.log.error({ err }, "Error verifying payment");
    res.status(500).json({ error: "Payment verification error" });
  }
});

export default router;
