import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    await dbConnect();

    // PUT /api/admin/users/[id]
    if (req.method === "PUT") {
      const { name, roleId, status, password } = req.body;
      
      const user = await AdminUser.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const updateData: any = { name, status };
      if (roleId) updateData.roleId = roleId;

      // Reset password if provided
      if (password && password.trim() !== "") {
        updateData.passwordHash = await bcrypt.hash(password, 10);
      }

      // Prevent locking the master admin
      if (user.username === "admin" && status === "locked") {
        return res.status(400).json({ error: "Cannot lock the master admin account." });
      }

      const updatedUser = await AdminUser.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-passwordHash");

      return res.status(200).json({ success: true, data: updatedUser });
    }

    // DELETE /api/admin/users/[id]
    if (req.method === "DELETE") {
      const user = await AdminUser.findById(id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.username === "admin") {
        return res.status(400).json({ error: "Cannot delete the master admin account." });
      }

      await AdminUser.findByIdAndDelete(id);

      return res.status(200).json({ success: true, message: "User deleted successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("User Detail API Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
