import type { NextApiRequest, NextApiResponse } from "next";
import { getPublicFeaturedProducts } from "@/lib/featuredProducts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const items = await getPublicFeaturedProducts();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(items);
  } catch (error) {
    console.error("Featured products API error:", error);
    return res.status(200).json([]);
  }
}
