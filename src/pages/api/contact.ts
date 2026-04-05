import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, company, subject, message, interestedProduct, category, ...rest } = req.body;

    await dbConnect();

    await Contact.create({
      name: name || "Anonymous",
      email: email || "No Email",
      phone: phone || "",
      company: company || "",
      subject: subject || "Website Inquiry",
      message: message || "No explicit message provided.",
      category: category || "other",
      interestedProduct: interestedProduct || null,
      dynamicData: Object.keys(rest).length > 0 ? rest : undefined,
    });

    return res.status(201).json({ success: true, message: "Inquiry submitted successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to submit inquiry" });
  }
}
