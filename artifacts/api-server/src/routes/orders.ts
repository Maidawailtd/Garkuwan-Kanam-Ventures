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
import nodemailer from "nodemailer";

function formatNgn(n: number) {
  return "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });
}

async function sendReceiptEmail(order: {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  quantity: number;
  totalAmountNgn: number;
  txRef?: string | null;
  flwRef?: string | null;
  shippingAddress?: string | null;
}) {
  const TO = order.customerEmail;
  const BCC = process.env.CONTACT_EMAIL_TO || "mglink@mail.com";
  const FROM = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@gkc-ventures.com";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.mail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  const orderRef = `GKC-${String(order.id).padStart(6, "0")}`;
  const date = new Date().toLocaleDateString("en-NG", { day: "2-digit", month: "long", year: "numeric" });

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#f9fafb">
    <!-- Header -->
    <div style="background:#0d0d0d;padding:32px 36px;text-align:center">
      <h1 style="color:#f5a623;margin:0 0 4px;font-size:22px;letter-spacing:3px;text-transform:uppercase">Garkuwan Kanam & Co</h1>
      <p style="color:#6b7280;margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase">Official Purchase Receipt</p>
    </div>

    <!-- Success banner -->
    <div style="background:#16a34a;padding:18px 36px;display:flex;align-items:center;gap:12px">
      <div style="color:#fff;font-size:24px">✓</div>
      <div>
        <p style="color:#fff;margin:0;font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase">Payment Confirmed</p>
        <p style="color:#bbf7d0;margin:4px 0 0;font-size:12px">Your order has been received and is being processed</p>
      </div>
    </div>

    <!-- Order details -->
    <div style="background:#fff;padding:36px">
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
        <tr>
          <td style="padding:6px 0;color:#6b7280;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;width:160px">Order Reference</td>
          <td style="padding:6px 0;color:#111;font-size:13px;font-weight:bold;font-family:monospace">${orderRef}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px">Date</td>
          <td style="padding:6px 0;color:#111;font-size:13px">${date}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#6b7280;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px">Flutterwave Ref</td>
          <td style="padding:6px 0;color:#111;font-size:13px;font-family:monospace">${order.flwRef || order.txRef || "—"}</td>
        </tr>
      </table>

      <!-- Product -->
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-left:4px solid #f5a623;padding:20px 24px;margin-bottom:28px">
        <p style="margin:0 0 6px;color:#6b7280;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1px">Equipment Ordered</p>
        <p style="margin:0 0 4px;color:#111;font-size:16px;font-weight:bold;text-transform:uppercase">${order.productName}</p>
        <p style="margin:0;color:#6b7280;font-size:12px">Qty: ${order.quantity} unit${order.quantity !== 1 ? "s" : ""}</p>
      </div>

      <!-- Amount -->
      <div style="background:#0d0d0d;padding:20px 24px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:center">
        <span style="color:#9ca3af;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px">Total Amount Paid</span>
        <span style="color:#f5a623;font-size:22px;font-weight:bold">${formatNgn(order.totalAmountNgn)}</span>
      </div>

      <!-- Customer details -->
      <h3 style="font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#6b7280;margin:0 0 14px">Buyer Information</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
        ${[
          ["Name", order.customerName],
          ["Email", order.customerEmail],
          ["Phone", order.customerPhone],
          ["Delivery Address", order.shippingAddress || "To be confirmed"],
        ].map(([k, v]) => `
        <tr style="border-bottom:1px solid #f3f4f6">
          <td style="padding:10px 0;color:#6b7280;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;width:160px">${k}</td>
          <td style="padding:10px 0;color:#111;font-size:13px">${v}</td>
        </tr>`).join("")}
      </table>

      <!-- Next steps -->
      <div style="background:#fffbeb;border:1px solid #fde68a;padding:18px 20px;margin-bottom:28px">
        <p style="margin:0 0 8px;color:#92400e;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px">What Happens Next</p>
        <ul style="margin:0;padding-left:18px;color:#78350f;font-size:12px;line-height:2">
          <li>Our team will contact you within 24 hours to confirm delivery details</li>
          <li>Equipment inspection and logistics coordination will begin immediately</li>
          <li>You will receive a formal invoice and shipping documentation via email</li>
        </ul>
      </div>

      <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.8">
        For any enquiries, call us on <strong style="color:#111">+234 803 989 1568</strong> or reply to this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:20px 36px;background:#0d0d0d;text-align:center">
      <p style="margin:0 0 6px;color:#4b5563;font-size:10px;letter-spacing:2px;text-transform:uppercase">Garkuwan Kanam & Co Ventures · Nigeria</p>
      <p style="margin:0;color:#374151;font-size:10px">This is an automated receipt. Retain for your records.</p>
    </div>
  </div>`;

  await transporter.sendMail({
    from: `"Garkuwan Kanam & Co Ventures" <${FROM}>`,
    to: TO,
    bcc: BCC,
    subject: `Payment Confirmed — ${orderRef} | ${order.productName}`,
    html,
    text: `Payment Confirmed — ${orderRef}\n\nDear ${order.customerName},\n\nThank you for your purchase.\n\nProduct: ${order.productName}\nQty: ${order.quantity}\nAmount: ${formatNgn(order.totalAmountNgn)}\nRef: ${order.flwRef || order.txRef || "—"}\n\nOur team will contact you within 24 hours.\n\nGarkuwan Kanam & Co Ventures`,
  });
}

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
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY || process.env["Secret-Key"];
  if (!secretKey) {
    logger.warn("Flutterwave secret key not set — payment link unavailable");
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

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { productId, quantity, customerName, customerEmail, customerPhone, shippingAddress, notes } =
    parsed.data;

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, productId));

  if (!product) {
    res.status(400).json({ error: "Product not found" });
    return;
  }

  if (!product.inStock) {
    res.status(400).json({ error: "Product is out of stock" });
    return;
  }

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

router.get("/orders/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetOrderParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
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

router.post("/orders/:id/verify", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = VerifyPaymentParams.safeParse({ id: parseInt(rawId, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = VerifyPaymentBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
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

  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY || process.env["Secret-Key"];
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

      sendReceiptEmail({
        ...updated,
        flwRef: data.data.flw_ref,
      }).catch((err) => req.log.error({ err }, "Failed to send receipt email"));

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
