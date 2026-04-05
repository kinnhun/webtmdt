import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import ContactRevision from "@/models/ContactRevision";
import ContactContent from "@/models/ContactContent";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const limit = Number(req.query.limit) || 100;
      const revisions = await ContactRevision.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      
      return res.status(200).json({ success: true, data: revisions });
    } catch (error) {
      console.error("Admin ContactRevisions GET Error:", error);
      return res.status(500).json({ error: "Failed to fetch revisions" });
    }
  }

  // POST: Rollback to a specific revision
  if (req.method === "POST") {
    try {
      const { revisionId } = req.body;
      if (!revisionId) {
        return res.status(400).json({ error: "Missing revisionId" });
      }

      const revisionToRestore = await ContactRevision.findById(revisionId).lean();
      if (!revisionToRestore) {
        return res.status(404).json({ error: "Revision not found" });
      }

      // 1. Current state snapshot before rollback
      const currentDoc = await ContactContent.findOne().lean();
      if (currentDoc) {
        await ContactRevision.create({
          contactContentId: currentDoc._id,
          data: currentDoc,
          note: `Auto-backup before rollback to revision ${revisionId}`,
          createdBy: "System"
        });
      }

      // 2. Restore data from revision
      const { _id, createdAt, updatedAt, ...restoreData } = revisionToRestore.data as any;

      const updatedDoc = await ContactContent.findOneAndUpdate(
        {},
        { $set: restoreData },
        { new: true, upsert: true, runValidators: true }
      ).lean();

      return res.status(200).json({ success: true, data: updatedDoc, message: "Rollback successful" });
    } catch (error) {
      console.error("Admin ContactRevisions POST Error:", error);
      return res.status(500).json({ error: "Failed to rollback" });
    }
  }

  // DELETE: Delete a specific revision
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "Missing revision id" });
      }

      const revision = await ContactRevision.findById(id);
      if (!revision) {
        return res.status(404).json({ error: "Revision not found" });
      }

      if (revision.isDefault) {
        return res.status(400).json({ error: "Không được xóa bản mặc định" });
      }

      await ContactRevision.findByIdAndDelete(id);
      
      return res.status(200).json({ success: true, message: "Revision deleted" });
    } catch (error) {
      console.error("Admin ContactRevisions DELETE Error:", error);
      return res.status(500).json({ error: "Failed to delete revision" });
    }
  }

  // PATCH: Update revision note
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { note } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Missing revision id" });
      }

      const revision = await ContactRevision.findById(id);
      if (!revision) {
        return res.status(404).json({ error: "Revision not found" });
      }

      if (note !== undefined) revision.note = note;
      await revision.save();

      return res.status(200).json({ success: true, message: "Revision updated" });
    } catch (error) {
      console.error("Admin ContactRevisions PATCH Error:", error);
      return res.status(500).json({ error: "Failed to update revision" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
