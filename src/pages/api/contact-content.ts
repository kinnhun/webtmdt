import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { cached } from "@/lib/cache";
import ContactContent from "@/models/ContactContent";

const CACHE_TTL = process.env.NODE_ENV === "production" ? 120_000 : 30_000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await cached<Record<string, any> | null>(
      "contact-content-public",
      CACHE_TTL,
      async () => {
        await dbConnect();
        const doc = await ContactContent.findOne().lean();
        return doc ? JSON.parse(JSON.stringify(doc)) : null;
      }
    );

    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json({ success: true, data: data || null });
  } catch (error) {
    console.error("Contact Content GET Error:", error);
    return res.status(500).json({ error: "Failed to fetch contact content" });
  }
}
