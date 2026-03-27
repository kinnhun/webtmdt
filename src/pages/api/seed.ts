import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { productsData } from "@/data/products";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    // Clear existing products
    await Product.deleteMany({});

    // Insert all products
    const docs = productsData.map((p) => ({
      ...p,
      productId: p.id,
    }));

    await Product.insertMany(docs);

    return res.status(200).json({ success: true, count: docs.length });
  } catch (error) {
    return res.status(500).json({ error: "Seed failed", details: String(error) });
  }
}
