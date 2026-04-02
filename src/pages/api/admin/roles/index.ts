import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Role from "@/models/Role";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    // GET /api/admin/roles
    if (req.method === "GET") {
      const roles = await Role.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: roles });
    }

    // POST /api/admin/roles
    if (req.method === "POST") {
      const { name, slug, permissions } = req.body;
      
      if (!name || !slug) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const existingRole = await Role.findOne({ slug });
      if (existingRole) {
        return res.status(400).json({ error: "Role slug already exists" });
      }

      const newRole = await Role.create({ name, slug, permissions: permissions || [] });
      return res.status(201).json({ success: true, data: newRole });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Roles API Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
