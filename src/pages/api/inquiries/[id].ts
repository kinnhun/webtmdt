import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import AdminUser from "@/models/AdminUser";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_admin_rbacs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { status, category, interestedProduct, internalNotes, assignedTo, priority } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid inquiry ID" });
    }

    await dbConnect();

    // 1. Auth & Identification
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await AdminUser.findById(decoded.id).populate("roleId").lean();
    if (!user || user.status !== "active") {
      return res.status(403).json({ error: "Account inactive or not found" });
    }

    const roleName = user.roleId ? (user.roleId as any).name : "Unknown";
    const rolePermissions: string[] = user.roleId ? (user.roleId as any).permissions || [] : [];
    const isAdmin = roleName === "Admin" || roleName === "Super Admin" || rolePermissions.includes("system.all");

    // 2. Fetch Existing Inquiry to Check Permissions
    const existingInquiry = await Contact.findById(id);
    if (!existingInquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    // Manager can only edit their own inquiries
    if (!isAdmin && existingInquiry.assignedTo?.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Thao tác trên liên hệ của người khác bị từ chối (403 Forbidden)" });
    }

    // 3. Prevent Manager from reassigning
    if (assignedTo !== undefined && assignedTo !== existingInquiry.assignedTo?.toString() && !isAdmin) {
      return res.status(403).json({ error: "Chỉ Admin mới có quyền phân công người phụ trách" });
    }

    // 4. Build Update Payload
    const updateData: any = {
      lastActionBy: user._id,
      ...(category && { category }),
      ...(typeof interestedProduct !== "undefined" && { interestedProduct }),
      ...(typeof internalNotes !== "undefined" && { internalNotes }),
      ...(priority && { priority }),
    };

    // Only allow setting standard fields if provided
    if (status) {
      updateData.status = status;
      // Auto-timestamp for status changes
      if (status === "accepted" && existingInquiry.status !== "accepted") {
        updateData.acceptedAt = new Date();
      } else if (status === "closed" && existingInquiry.status !== "closed") {
        updateData.closedAt = new Date();
      } else if (status === "rejected" && existingInquiry.status !== "rejected") {
        updateData.rejectedAt = new Date();
        updateData.assignedTo = null; // Un-assign if rejected
      }
    }

    // Admin assigning to someone
    if (assignedTo !== undefined) {
      if (assignedTo === null || assignedTo === "") {
        updateData.assignedTo = null;
      } else {
        updateData.assignedTo = new mongoose.Types.ObjectId(assignedTo);
        // Only set assign metadata if actually changing person
        if (existingInquiry.assignedTo?.toString() !== assignedTo) {
          updateData.assignedBy = user._id;
          updateData.assignedAt = new Date();
          updateData.status = "assigned"; // Auto-move to assigned
        }
      }
    }

    const updatedInquiry = await Contact.findByIdAndUpdate(id, updateData, { new: true }).lean();

    return res.status(200).json(updatedInquiry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to update inquiry" });
  }
}
