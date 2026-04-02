import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { status, category, interestedProduct, internalNotes } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid inquiry ID" });
    }

    await dbConnect();

    const updatedInquiry = await Contact.findByIdAndUpdate(
      id,
      {
        ...(status && { status }),
        ...(category && { category }),
        ...(typeof interestedProduct !== "undefined" && { interestedProduct }),
        ...(typeof internalNotes !== "undefined" && { internalNotes }),
      },
      { new: true }
    ).lean();

    if (!updatedInquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    return res.status(200).json({ success: true, data: updatedInquiry });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to update inquiry" });
  }
}
