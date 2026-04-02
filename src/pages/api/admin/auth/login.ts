import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import Role from "@/models/Role";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_admin_rbacs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    // Auto-seed Super Admin if empty
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      console.log("No AdminUser found, seeding default Super Admin...");
      let superRole = await Role.findOne({ slug: "super_admin" });
      if (!superRole) {
        superRole = await Role.create({
          name: "Super Admin",
          slug: "super_admin",
          permissions: ["system.all"], // Or any wildcard
        });
      }

      const defaultHash = await bcrypt.hash("admin123", 10);
      await AdminUser.create({
        username: "admin",
        passwordHash: defaultHash,
        name: "Administrator",
        roleId: superRole._id,
        status: "active",
      });
      console.log("Seeded default username: admin, password: admin123");
    }

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Vui lòng nhập tài khoản và mật khẩu." });
    }

    const user = await AdminUser.findOne({ username }).populate("roleId");

    if (!user) {
      return res.status(401).json({ error: "Tài khoản hoặc mật khẩu không chính xác." });
    }

    if (user.status !== "active") {
      return res.status(403).json({ error: "Tài khoản của bạn đã bị khóa." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Tài khoản hoặc mật khẩu không chính xác." });
    }

    // Prepare Token Payload
    const rolePermissions = user.roleId ? (user.roleId as any).permissions : [];
    const payload = {
      id: user._id.toString(),
      username: user.username,
      permissions: rolePermissions,
    };

    // Sign JWT
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    // Set HTTPOnly Cookie
    res.setHeader(
      "Set-Cookie",
      serialize("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })
    );

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.roleId ? (user.roleId as any).name : "Unknown",
        permissions: rolePermissions,
      },
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Failed to login" });
  }
}
