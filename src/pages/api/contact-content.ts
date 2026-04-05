import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import ContactContent from "@/models/ContactContent";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    const doc = await ContactContent.findOne().lean();
    return res.status(200).json({ success: true, data: doc || null });
  } catch (error) {
    console.error("Contact Content GET Error:", error);
    return res.status(500).json({ error: "Failed to fetch contact content" });
  }
}
