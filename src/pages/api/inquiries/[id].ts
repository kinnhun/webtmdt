import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import AdminUser from "@/models/AdminUser";
import Role from "@/models/Role";
import InquiryActivity from "@/models/InquiryActivity";

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

    // (Access check removed per user request - any manager can access/edit any inquiry)

    // (Managers are now allowed to assign inquiries per user request)

    // 4. Build Update Payload
    const updateData: any = {
      lastActionBy: user._id,
      ...(category && { category }),
      ...(typeof interestedProduct !== "undefined" && { interestedProduct }),
      ...(typeof internalNotes !== "undefined" && { internalNotes }),
      ...(priority && { priority }),
    };

    // Track activity logs
    const activities: Array<{
      action: string;
      fromValue?: string;
      toValue?: string;
      metadata?: Record<string, unknown>;
    }> = [];

    // Only allow setting standard fields if provided
    if (status) {
      updateData.status = status;

      if (status !== existingInquiry.status) {
        activities.push({
          action: "status_changed",
          fromValue: existingInquiry.status,
          toValue: status,
        });
      }

      // Auto-timestamp for status changes
      if (status === "accepted" && existingInquiry.status !== "accepted") {
        updateData.acceptedAt = new Date();
        // Set firstResponseAt if not already set
        if (!existingInquiry.firstResponseAt) {
          updateData.firstResponseAt = new Date();
        }
      } else if (status === "in_progress" && !existingInquiry.firstResponseAt) {
        updateData.firstResponseAt = new Date();
      } else if ((status === "resolved") && existingInquiry.status !== "resolved") {
        updateData.resolvedAt = new Date();
        if (!existingInquiry.closedAt) {
          updateData.closedAt = new Date();
        }
      } else if (status === "closed" && existingInquiry.status !== "closed") {
        updateData.closedAt = new Date();
        if (!existingInquiry.resolvedAt) {
          updateData.resolvedAt = new Date();
        }
      } else if (status === "rejected" && existingInquiry.status !== "rejected") {
        updateData.rejectedAt = new Date();
        updateData.assignedTo = null; // Un-assign if rejected
      }
    }

    // Admin assigning to someone
    if (assignedTo !== undefined) {
      if (assignedTo === null || assignedTo === "") {
        updateData.assignedTo = null;
        if (existingInquiry.assignedTo) {
          activities.push({
            action: "unassigned",
            fromValue: existingInquiry.assignedTo.toString(),
          });
        }
      } else {
        updateData.assignedTo = new mongoose.Types.ObjectId(assignedTo);
        // Only set assign metadata if actually changing person
        if (existingInquiry.assignedTo?.toString() !== assignedTo) {
          updateData.assignedBy = user._id;
          updateData.assignedAt = new Date();
          updateData.status = "assigned"; // Auto-move to assigned

          // Find assigned user name for activity
          const assignedUser = await AdminUser.findById(assignedTo).select("name").lean();
          activities.push({
            action: "assigned",
            fromValue: existingInquiry.assignedTo?.toString() || undefined,
            toValue: assignedUser ? (assignedUser as any).name : assignedTo,
          });
        }
      }
    }

    // Log internal notes change
    if (typeof internalNotes !== "undefined" && internalNotes !== existingInquiry.internalNotes) {
      activities.push({ action: "note_updated" });
    }

    const updatedInquiry = await Contact.findByIdAndUpdate(id, updateData, { new: true }).lean();

    // Save activity logs
    if (activities.length > 0) {
      const activityDocs = activities.map((a) => ({
        inquiryId: existingInquiry._id,
        action: a.action,
        performedBy: user._id,
        performedByName: user.name,
        customerName: existingInquiry.name,
        fromValue: a.fromValue,
        toValue: a.toValue,
        metadata: a.metadata,
      }));
      await InquiryActivity.insertMany(activityDocs);
    }

    return res.status(200).json(updatedInquiry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to update inquiry" });
  }
}
