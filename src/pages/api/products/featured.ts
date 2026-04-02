import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    let products = await Product.find().limit(8).lean();

    if (!products.length) {
      return res.status(200).json([]);
    }

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
  } catch {
    return res.status(200).json([]);
  }
}
