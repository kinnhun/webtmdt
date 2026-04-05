import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import ContactContent from "@/models/ContactContent";
import ContactRevision from "@/models/ContactRevision";

// Increase body size limit just in case
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const doc = await ContactContent.findOne().lean();
      return res.status(200).json({ success: true, data: doc || null });
    } catch (error) {
      console.error("Admin Contact GET Error:", error);
      return res.status(500).json({ error: "Failed to fetch contact content" });
    }
  }

  if (req.method === "PUT" || req.method === "POST") {
    try {
      const { _note, ...bodyData } = req.body;
      if (!bodyData || typeof bodyData !== "object") {
        return res.status(400).json({ error: "Invalid request body" });
      }

      // 1. Get current document before updating
      const currentDoc = await ContactContent.findOne().lean();

      // 2. Upsert: update if exists, create if not
      const doc = await ContactContent.findOneAndUpdate(
        {},
        { $set: bodyData },
        { returnDocument: 'after', upsert: true, runValidators: true }
      ).lean();

      // 3. Save snapshot to ContactRevision if there was a previous document
      if (currentDoc) {
        await ContactRevision.create({
          contactContentId: currentDoc._id,
          data: currentDoc,
          note: _note || "Lưu tự động",
          createdBy: "Admin" 
        });
      }

      return res.status(200).json({ success: true, data: doc });
    } catch (error) {
      console.error("Admin Contact PUT Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: "Failed to update contact content", details: errorMessage });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
