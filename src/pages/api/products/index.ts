import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    if (req.method === "POST") {
      const payload = { ...req.body };

      // Ensure collection is a plain string (schema: String, not I18nText)
      if (Array.isArray(payload.collection)) {
        payload.collection = payload.collection.join(', ');
      }

      // Provide defaults for strictly required schema fields if missing
      payload.productId = payload.productId || payload.code || `p_${Date.now()}`;
      payload.room = payload.room || { us: 'General', uk: 'General', vi: 'General' };

      const newProduct = await Product.create(payload);
      const productObj = newProduct.toObject();
      return res.status(201).json({
        ...productObj,
        id: productObj.productId || productObj._id?.toString(),
      });
    }

    const { search, category, material, color, size, style } = req.query;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (search && typeof search === "string") {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { "name.us": regex },
        { "name.vi": regex },
        { "name.uk": regex },
        { code: regex },
        { "category.us": regex },
        { "style.us": regex },
      ];
    }

    // I18nText fields: filter on the .us sub-field
    if (category && typeof category === "string") {
      filter["category.us"] = { $in: category.split(",") };
    }
    if (material && typeof material === "string") {
      filter["material.us"] = { $in: material.split(",") };
    }
    if (color && typeof color === "string") {
      filter["color.us"] = { $in: color.split(",") };
    }
    if (size && typeof size === "string") {
      filter.size = { $in: size.split(",") };
    }
    if (style && typeof style === "string") {
      filter["style.us"] = { $in: style.split(",") };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();

    // Map _id to id for frontend compatibility
    const mapped = products.map((p) => {
      const { _id, ...rest } = p as Record<string, unknown>;
      return {
        ...rest,
        id: (p as any).productId || (_id as mongoose.Types.ObjectId)?.toString(),
      };
    });

    return res.status(200).json(mapped);
  } catch (error: unknown) {
    console.error("Products API Error:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}
