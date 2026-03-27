import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";
import type { Product as ProductType } from "@/types/product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { search, category, material, color, size, style } = req.query;

    const filter: Record<string, string | { $in: string[] } | Array<{ [key: string]: RegExp }>> = {};

    if (search && typeof search === "string") {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { name: regex },
        { code: regex },
        { category: regex },
        { style: regex },
      ];
    }

    if (category && typeof category === "string") {
      filter.category = { $in: category.split(",") };
    }
    if (material && typeof material === "string") {
      filter.material = { $in: material.split(",") };
    }
    if (color && typeof color === "string") {
      filter.color = { $in: color.split(",") };
    }
    if (size && typeof size === "string") {
      filter.size = { $in: size.split(",") };
    }
    if (style && typeof style === "string") {
      filter.style = { $in: style.split(",") };
    }

    let products = await Product.find(filter).lean();

    // Only map _id to id for frontend compatibility
    const mapped = products.map((p) => ({
      id: p.productId || p._id?.toString(),
      name: p.name,
      code: p.code,
      category: p.category,
      material: p.material,
      color: p.color,
      size: p.size,
      style: p.style,
      image: p.image,
      images: p.images,
      description: p.description,
      features: p.features,
      room: p.room,
    }));

    return res.status(200).json(mapped);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}
