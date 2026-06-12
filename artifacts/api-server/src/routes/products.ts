import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db, productsTable } from "@workspace/db";
import {
  ListProductsQueryParams,
  GetProductParams,
  GetProductResponse,
  GetFeaturedProductsResponse,
  GetProductStatsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function noCache(_req: Request, res: Response, next: NextFunction) {
  res.set("Cache-Control", "no-store");
  next();
}

router.use(noCache);

router.get("/products/featured", async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.featured, true));
  res.json(GetFeaturedProductsResponse.parse(products));
});

router.get("/products/stats", async (_req, res): Promise<void> => {
  const all = await db.select().from(productsTable);
  const byCategory = {
    trucks: all.filter((p) => p.category === "trucks").length,
    "mining-trucks": all.filter((p) => p.category === "mining-trucks").length,
    "drilling-motors": all.filter((p) => p.category === "drilling-motors").length,
  };
  res.json(
    GetProductStatsResponse.parse({
      totalProducts: all.length,
      byCategory,
    })
  );
});

router.get("/products", async (req, res): Promise<void> => {
  const parsed = ListProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  let products;
  if (parsed.data.category) {
    products = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.category, parsed.data.category));
  } else {
    products = await db.select().from(productsTable);
  }

  res.json(products);
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetProductParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, params.data.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(GetProductResponse.parse(product));
});

export default router;
