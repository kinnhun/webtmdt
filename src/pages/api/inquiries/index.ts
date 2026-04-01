import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    
    // Ensure Product model is registered
    require("@/models/Product");

    // Sort by descending createdAt (newest first)
    const inquiries = await Contact.find().sort({ createdAt: -1 }).populate({
      path: "interestedProduct",
      model: "Product",
      select: "name slug code image"
    }).lean();
    
    return res.status(200).json({ success: true, data: inquiries });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch inquiries" });
  }
}
