import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import AboutRevision from "@/models/AboutRevision";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // POST: Set a specific revision as default (by revisionId)
  if (req.method === "POST") {
    try {
      const { revisionId } = req.body;
      if (!revisionId) {
        return res.status(400).json({ error: "Missing revisionId" });
      }

      const revision = await AboutRevision.findById(revisionId);
      if (!revision) {
        return res.status(404).json({ error: "Revision not found" });
      }

      // Clear previous defaults
      await AboutRevision.updateMany({ isDefault: true }, { $set: { isDefault: false } });

      // Set this revision as default
      revision.isDefault = true;
      revision.note = revision.note || "Bản Mặc Định";
      await revision.save();

      return res.status(200).json({ success: true, message: "Đã đặt làm bản mặc định." });
    } catch (error) {
      console.error("Set Default Error:", error);
      return res.status(500).json({ error: "Failed to set default" });
    }
  }

  // GET: Fetch the current default revision data
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
