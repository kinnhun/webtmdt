import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Role from "@/models/Role";
import AdminUser from "@/models/AdminUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid role ID" });
  }

  try {
    await dbConnect();

    // PUT /api/admin/roles/[id]
    if (req.method === "PUT") {
      const { name, slug, permissions } = req.body;
      
      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }

      // Check slug collision
      if (slug && slug !== role.slug) {
        const existing = await Role.findOne({ slug });
        if (existing) return res.status(400).json({ error: "Slug already in use" });
      }

      const updatedRole = await Role.findByIdAndUpdate(
        id,
        { name, slug, permissions },
        { new: true, runValidators: true }
      );

      return res.status(200).json({ success: true, data: updatedRole });
    }

    // DELETE /api/admin/roles/[id]
    if (req.method === "DELETE") {
      // Prevent deleting if assigned to users
      const assignedUsersCount = await AdminUser.countDocuments({ roleId: id });
      
      if (assignedUsersCount > 0) {
        return res.status(400).json({ error: `Cannot delete role. It is assigned to ${assignedUsersCount} users.` });
      }

      const deleted = await Role.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Role not found" });
      }

      return res.status(200).json({ success: true, message: "Role deleted successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Role Detail API Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
