import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import InquirySetting from "@/models/InquirySetting";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await dbConnect();

    if (req.method === "PUT") {
      const { label, color, order, isActive } = req.body;
      
      const updated = await InquirySetting.findByIdAndUpdate(
        id,
        { label, color, order, isActive },
        { new: true }
      );
      
      if (!updated) return res.status(404).json({ error: "Setting not found" });
      return res.status(200).json(updated);
    } 
    
    if (req.method === "DELETE") {
      const deleted = await InquirySetting.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: "Setting not found" });
      return res.status(200).json({ message: "Setting deleted successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Inquiry setting API error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
