import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const b = req.body || {};
    const name = b.name || b["Full Name"] || b["Họ tên"] || b.fullName || b.f_name || "Anonymous";
    const email = b.email || b["Email Address"] || b["Business Email"] || b["Email"] || b.businessEmail || b.f_email || "No Email";
    const phone = b.phone || b["Phone / WhatsApp"] || b["Phone"] || b["Số điện thoại"] || b.phoneNumber || b.f_phone || "";
    const company = b.company || b["Company Name"] || b["Company"] || b["Tên công ty"] || b.companyName || b.f_company || "";
    const category = b.category || b["Inquiry Type"] || b["Inquiry Category"] || b.inquiryType || b.f_category || "other";
    const subject = b.subject || b["Subject"] || b["Tiêu đề"] || b.title || b.f_subject || "Website Inquiry";
    const message = b.message || b["Message"] || b["Nội dung"] || b.content || b.notes || b.f_message || "No explicit message provided.";
    const interestedProduct = b.interestedProduct || b.product || b["Product Interest"] || null;

    await dbConnect();

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      subject,
      message,
      category,
      interestedProduct,
      source: interestedProduct ? "Website Product Inquiry" : "Website Contact Form",
      status: "new",
      priority: "normal",
      dynamicData: Object.keys(b).length > 0 ? b : undefined,
    });

    return res.status(201).json({ 
      success: true, 
      id: contact._id,
      message: "Inquiry submitted successfully" 
    });
  } catch (error) {
    console.error("Contact Submission Error:", error);
    return res.status(500).json({ error: "Failed to submit inquiry" });
  }
}
