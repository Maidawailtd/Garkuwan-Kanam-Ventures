import { Router } from "express";
import { desc } from "drizzle-orm";
import { db, ordersTable } from "@workspace/db";

const router = Router();

const ADMIN_KEY = process.env.ADMIN_KEY || "GKC@2025";

router.get("/admin/orders", async (req, res): Promise<void> => {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const orders = await db
    .select()
    .from(ordersTable)
    .orderBy(desc(ordersTable.createdAt));
  res.json(orders);
});

export default router;
