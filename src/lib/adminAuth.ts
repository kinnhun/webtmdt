import type { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import Role from "@/models/Role";
import type { AdminJwtPayload, AdminVerifyResult } from "@/types/auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_admin_rbacs";

type PopulatedRoleDoc = {
  permissions?: string[];
};

type AdminUserLeanDoc = {
  _id: { toString(): string };
  username: string;
  status: string;
  roleId?: PopulatedRoleDoc | null;
};

function isAdminJwtPayload(value: string | jwt.JwtPayload): value is AdminJwtPayload & jwt.JwtPayload {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.id === "string" &&
    typeof value.username === "string"
  );
}

/**
 * Verifies admin JWT cookie and checks that the active admin user holds at least one required permission.
 */
export async function verifyAdminRequest(
  req: NextApiRequest,
  requiredPermissions: readonly string[]
): Promise<AdminVerifyResult> {
  const token = req.cookies.admin_token;
  if (!token) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!isAdminJwtPayload(decoded)) {
      return { ok: false, status: 401, error: "Invalid token payload" };
    }

    await dbConnect();
    void Role;

    const user = (await AdminUser.findById(decoded.id)
      .populate("roleId")
      .lean()) as AdminUserLeanDoc | null;

    if (!user) {
      return { ok: false, status: 401, error: "User not found" };
    }

    if (user.status !== "active") {
      return { ok: false, status: 403, error: "Account locked" };
    }

    const permissions = Array.isArray(user.roleId?.permissions)
      ? user.roleId.permissions
      : [];

    const hasAccess =
      permissions.includes("system.all") ||
      requiredPermissions.some((perm) => permissions.includes(perm));

    if (!hasAccess) {
      return { ok: false, status: 403, error: "Insufficient permissions" };
    }

    return {
      ok: true,
      user: {
        userId: user._id.toString(),
        username: user.username,
        permissions,
      },
    };
  } catch {
    return { ok: false, status: 401, error: "Invalid token" };
  }
}

