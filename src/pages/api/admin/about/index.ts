import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { invalidateCache } from "@/lib/cache";
import AboutContent from "@/models/AboutContent";
import AboutRevision from "@/models/AboutRevision";

// Increase body size limit for base64 images
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const doc = await AboutContent.findOne().lean();
      return res.status(200).json({ success: true, data: doc || null });
    } catch (error) {
      console.error("Admin About GET Error:", error);
      return res.status(500).json({ error: "Failed to fetch about content" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { _note, ...bodyData } = req.body;
      if (!bodyData || typeof bodyData !== "object") {
        return res.status(400).json({ error: "Invalid request body" });
      }

      // 1. Get current document before updating
      const currentDoc = await AboutContent.findOne().lean();

      // 2. Upsert: update if exists, create if not
      const doc = await AboutContent.findOneAndUpdate(
        {},
        { $set: bodyData },
        { returnDocument: 'after', upsert: true, runValidators: true }
      ).lean();

      // 3. Save snapshot to AboutRevision if there was a previous document
      if (currentDoc) {
        await AboutRevision.create({
          aboutContentId: currentDoc._id,
          data: currentDoc,
          note: _note || "Lưu tự động",
          createdBy: "Admin" // Can be extracted from session later
        });
      }

      // 4. Invalidate public about-content cache so visitors see changes immediately
      invalidateCache("about-content-public");

      return res.status(200).json({ success: true, data: doc });
    } catch (error) {
      console.error("Admin About PUT Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: "Failed to update about content", details: errorMessage });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
