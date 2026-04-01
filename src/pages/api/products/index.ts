import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";
import type { Product as ProductType } from "@/types/product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    if (req.method === "POST") {
      const payload = { ...req.body };

      // Normalize array fields to strings for Mongoose Schema compatibility
      const arrayToStringFields = ['collection', 'category', 'material', 'color', 'style'];
      arrayToStringFields.forEach(field => {
        if (Array.isArray(payload[field])) {
          payload[field] = payload[field].join(', ');
        }
      });

      // Provide defaults for strictly required schema fields if missing
      payload.productId = payload.productId || payload.code || `p_${Date.now()}`;
      payload.room = payload.room || 'General';

      const newProduct = await Product.create(payload);
      const productObj = newProduct.toObject();
      return res.status(201).json({
        ...productObj,
        id: productObj.productId || productObj._id?.toString(),
      });
    }

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

    let products = await Product.find(filter).sort({ createdAt: -1 }).lean();

    // Map _id to id for frontend compatibility without losing any other fields
    const mapped = products.map((p) => {
      const { _id, ...rest } = p as any; 
      return {
        ...rest,
        id: p.productId || _id?.toString(),
      };
    });

    return res.status(200).json(mapped);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}
