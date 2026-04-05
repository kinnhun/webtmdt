import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import AboutRevision from "@/models/AboutRevision";
import AboutContent from "@/models/AboutContent";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const bodyData = req.body;
      if (!bodyData || typeof bodyData !== "object") {
        return res.status(400).json({ error: "Invalid request body" });
      }

      // Find current actual doc ID to associate
      const currentDoc = await AboutContent.findOne().lean();

      // Clear previous defaults
      await AboutRevision.updateMany({ isDefault: true }, { $set: { isDefault: false } });

      // Create new default revision
      const doc = await AboutRevision.create({
        aboutContentId: currentDoc?._id || new mongoose.Types.ObjectId(), // fallbacks
        data: bodyData,
        note: "Bản Phục Hồi Mặc Định (Set by Admin)",
        isDefault: true,
        createdBy: "Admin"
      });

      return res.status(200).json({ success: true, data: doc, message: "Đã lưu bản mặc định." });
    } catch (error) {
      console.error("Set Default Error:", error);
      return res.status(500).json({ error: "Failed to set default" });
    }
  }

  if (req.method === "GET") {
    try {
      const defaultRev = await AboutRevision.findOne({ isDefault: true }).lean();
      return res.status(200).json({ success: true, data: defaultRev?.data || null });
    } catch (error) {
       console.error("Get Default Error:", error);
       return res.status(500).json({ error: "Failed to fetch default" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
