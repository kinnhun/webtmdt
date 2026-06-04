import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { invalidateCache } from "@/lib/cache";
import HomeContent from "@/models/HomeContent";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const doc = await HomeContent.findOne().lean();
      return res.status(200).json({ success: true, data: doc || null });
    } catch (error) {
      console.error("Admin Home GET Error:", error);
      return res.status(500).json({ error: "Failed to fetch home content" });
    }
  }

  if (req.method === "PUT") {
    try {
      const bodyData = req.body;
      if (!bodyData || typeof bodyData !== "object") {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const doc = await HomeContent.findOneAndUpdate(
        {},
        { $set: bodyData },
        { returnDocument: 'after', upsert: true, runValidators: true }
      ).lean();

      invalidateCache("home-content-public");

      return res.status(200).json({ success: true, data: doc });
    } catch (error) {
      console.error("Admin Home PUT Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: "Failed to update home content", details: errorMessage });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
