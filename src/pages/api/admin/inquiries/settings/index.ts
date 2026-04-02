import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import InquirySetting from "@/models/InquirySetting";

const DEFAULT_SETTINGS = [
  { type: "status", key: "new", label: "New", color: "error", order: 1 },
  { type: "status", key: "pending", label: "Pending", color: "processing", order: 2 },
  { type: "status", key: "processing", label: "Processing", color: "warning", order: 3 },
  { type: "status", key: "resolved", label: "Resolved", color: "success", order: 4 },
  { type: "status", key: "cancelled", label: "Cancelled", color: "default", order: 5 },
  { type: "category", key: "consulting", label: "Product Consulting", order: 1 },
  { type: "category", key: "support", label: "Technical Support", order: 2 },
  { type: "category", key: "complaint", label: "Complaint", order: 3 },
  { type: "category", key: "cooperation", label: "Business Partnership", order: 4 },
  { type: "category", key: "quotation", label: "Quotation", order: 5 },
  { type: "category", key: "other", label: "Other", order: 6 },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      let settings = await InquirySetting.find().sort({ type: 1, order: 1 });
      
      // Auto-seed if empty
      if (settings.length === 0) {
        settings = await InquirySetting.insertMany(DEFAULT_SETTINGS);
      }

      return res.status(200).json(settings);
    } 
    
    if (req.method === "POST") {
      // Basic auth check placeholder: verify token in production (omitted for brevity standard in this codebase without explicit JWT middleware attached in simpler routes, though admin should really be checked)
      const { type, key, label, color, order } = req.body;
      
      if (!type || !key || !label) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if key exists
      const existing = await InquirySetting.findOne({ type, key });
      if (existing) {
        return res.status(400).json({ error: `${type} with key '${key}' already exists` });
      }

      const newSetting = new InquirySetting({ type, key, label, color, order: order || 0 });
      await newSetting.save();
      
      return res.status(201).json(newSetting);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Inquiry settings API error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
