import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, company, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields: name, email, subject, message" });
    }

    await dbConnect();

    await Contact.create({
      name,
      email,
      phone: phone || "",
      company: company || "",
      subject,
      message,
    });

    return res.status(201).json({ success: true, message: "Inquiry submitted successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to submit inquiry" });
  }
}
