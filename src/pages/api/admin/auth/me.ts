import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_admin_rbacs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clearCookieAndReturn401 = (message: string) => {
    res.setHeader(
      "Set-Cookie",
      "admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"
    );
    return res.status(401).json({ error: message });
  };

  const token = req.cookies.admin_token;
  if (!token) {
    return clearCookieAndReturn401("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Optionally fetch latest from DB
    await dbConnect();
    const user = await AdminUser.findById(decoded.id).populate("roleId").lean();

    if (!user) {
      return clearCookieAndReturn401("User not found");
    }

    if (user.status !== "active") {
      res.setHeader(
        "Set-Cookie",
        "admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"
      );
      return res.status(403).json({ error: "Account locked" });
    }

    const rolePermissions = user.roleId ? (user.roleId as any).permissions : [];

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.roleId ? (user.roleId as any).name : "Unknown",
        permissions: rolePermissions,
      },
    });
  } catch (error) {
    return clearCookieAndReturn401("Invalid token");
  }
}
