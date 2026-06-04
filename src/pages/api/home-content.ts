import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { cached } from "@/lib/cache";
import HomeContent from "@/models/HomeContent";

const CACHE_TTL = process.env.NODE_ENV === "production" ? 120_000 : 30_000;

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (_req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await cached<Record<string, any> | null>(
      "home-content-public",
      CACHE_TTL,
      async () => {
        await dbConnect();
        const doc = await HomeContent.findOne()
          .select('-_id -__v -createdAt -updatedAt')
          .lean();
        if (!doc) return null;
        return JSON.parse(JSON.stringify(doc));
      }
    );

    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Home content API error:", error);
    return res.status(500).json({ error: "Failed to fetch home content" });
  }
}
