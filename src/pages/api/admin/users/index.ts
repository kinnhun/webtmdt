import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    // GET /api/admin/users
    if (req.method === "GET") {
      const users = await AdminUser.find()
        .populate("roleId", "name slug")
        .select("-passwordHash")
        .sort({ createdAt: -1 });

      return res.status(200).json({ success: true, data: users });
    }

    // POST /api/admin/users
    if (req.method === "POST") {
      const { username, password, name, roleId, status } = req.body;
      
      if (!username || !password || !name) {
        return res.status(400).json({ error: "Username, password and name are required fields" });
      }

      const existingUser = await AdminUser.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      
      const payload: any = { username, passwordHash, name, status: status || "active" };
      if (roleId) payload.roleId = roleId;

      const newUser = await AdminUser.create(payload);
      
      // Don't send back passwordHash
      const userRes = newUser.toObject();
      delete (userRes as any).passwordHash;

      return res.status(201).json({ success: true, data: userRes });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Users API Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
