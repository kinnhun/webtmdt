import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import AdminUser from "@/models/AdminUser";
import Role from "@/models/Role";
import InquiryActivity from "@/models/InquiryActivity";
import InquirySetting from "@/models/InquirySetting";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_admin_rbacs";
const SLA_HOURS = 24; // Default SLA: 24 hours

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    // Auth
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
      return res.status(403).json({ error: "Forbidden" });
    }

    // Dates
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const slaThreshold = new Date(now.getTime() - SLA_HOURS * 60 * 60 * 1000);
    const staleThreshold = new Date(now.getTime() - 48 * 60 * 60 * 1000);
    const days7Ago = new Date(startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000);

    // ===== SUMMARY =====
    const [total, newToday] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ createdAt: { $gte: startOfToday } }),
    ]);

    const statusAgg = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const statusMap: Record<string, number> = {};
    statusAgg.forEach((s) => (statusMap[s._id] = s.count));

    const unassigned = await Contact.countDocuments({
      status: { $in: ["new", "pending"] },
      assignedTo: null,
    });
    const waitingAccept = statusMap["assigned"] || 0;
    const inProgress = (statusMap["accepted"] || 0) + (statusMap["in_progress"] || 0) + (statusMap["processing"] || 0);
    const resolved = (statusMap["resolved"] || 0) + (statusMap["closed"] || 0);
    const cancelled = (statusMap["rejected"] || 0) + (statusMap["cancelled"] || 0);

    // Overdue: active inquiries older than SLA with no firstResponseAt
    const overdue = await Contact.countDocuments({
      status: { $in: ["new", "assigned", "pending"] },
      createdAt: { $lt: slaThreshold },
      firstResponseAt: null,
    });

    const summary = { total, newToday, unassigned, waitingAccept, inProgress, resolved, overdue, cancelled };

    // ===== BY CATEGORY =====
    const byCategory = await Contact.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Fetch category labels from settings
    const categorySettings = await InquirySetting.find({ type: "category", isActive: true }).lean();
    const catLabelMap: Record<string, string> = {};
    categorySettings.forEach((c: any) => (catLabelMap[c.key] = c.label));

    const byCategoryData = byCategory.map((c) => ({
      key: c._id || "other",
      label: catLabelMap[c._id] || c._id || "Khác",
      count: c.count,
    }));

    // ===== BY STATUS =====
    const statusSettings = await InquirySetting.find({ type: "status", isActive: true })
      .sort({ order: 1 })
      .lean();
    const byStatusData = statusSettings.map((s: any) => ({
      key: s.key,
      label: s.label,
      color: s.color || "default",
      count: statusMap[s.key] || 0,
    }));

    // ===== BY DAY (last 7 days) =====
    const byDayCreated = await Contact.aggregate([
      { $match: { createdAt: { $gte: days7Ago } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "+07:00" } },
          created: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const byDayResolved = await Contact.aggregate([
      { $match: { resolvedAt: { $gte: days7Ago } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$resolvedAt", timezone: "+07:00" } },
          resolved: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Build 7-day array
    const byDay: Array<{ date: string; created: number; resolved: number }> = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(startOfToday.getTime() - i * 24 * 60 * 60 * 1000);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${day}`;
      
      const createdEntry = byDayCreated.find((x) => x._id === dateStr);
      const resolvedEntry = byDayResolved.find((x) => x._id === dateStr);
      byDay.push({
        date: dateStr,
        created: createdEntry?.created || 0,
        resolved: resolvedEntry?.resolved || 0,
      });
    }

    // ===== STAFF PERFORMANCE =====
    // Get all active staff
    const allStaff = await AdminUser.find({ status: "active" })
      .populate("roleId")
      .lean();

    const staffList = allStaff.filter((u: any) => {
      const rn = u.roleId ? (u.roleId as any).name : "";
      return rn !== "Super Admin"; // Show all except super admin
    });

    const staffPerformance = await Promise.all(
      staffList.map(async (staff: any) => {
        const staffId = staff._id;
        const [assigned, accepted, inProg, resolvedCount, overdueCount] = await Promise.all([
          Contact.countDocuments({ assignedTo: staffId }),
          Contact.countDocuments({ assignedTo: staffId, status: "accepted" }),
          Contact.countDocuments({ assignedTo: staffId, status: { $in: ["accepted", "in_progress", "processing"] } }),
          Contact.countDocuments({ assignedTo: staffId, status: { $in: ["resolved", "closed"] } }),
          Contact.countDocuments({
            assignedTo: staffId,
            status: { $in: ["assigned", "accepted", "in_progress"] },
            createdAt: { $lt: slaThreshold },
            firstResponseAt: null,
          }),
        ]);

        // FRT calculation
        const frtDocs = await Contact.find({
          assignedTo: staffId,
          firstResponseAt: { $exists: true },
          assignedAt: { $exists: true },
        })
          .select("assignedAt firstResponseAt")
          .lean();

        let avgFirstResponseMinutes = 0;
        if (frtDocs.length > 0) {
          const totalMinutes = frtDocs.reduce((sum, doc: any) => {
            const diff = new Date(doc.firstResponseAt).getTime() - new Date(doc.assignedAt).getTime();
            return sum + diff / (1000 * 60);
          }, 0);
          avgFirstResponseMinutes = Math.round(totalMinutes / frtDocs.length);
        }

        // Avg accept time
        const acceptDocs = await Contact.find({
          assignedTo: staffId,
          acceptedAt: { $exists: true },
          assignedAt: { $exists: true },
        })
          .select("assignedAt acceptedAt")
          .lean();

        let avgAcceptMinutes = 0;
        if (acceptDocs.length > 0) {
          const totalMin = acceptDocs.reduce((sum, doc: any) => {
            const diff = new Date(doc.acceptedAt).getTime() - new Date(doc.assignedAt).getTime();
            return sum + diff / (1000 * 60);
          }, 0);
          avgAcceptMinutes = Math.round(totalMin / acceptDocs.length);
        }

        const completionRate = assigned > 0 ? Math.round((resolvedCount / assigned) * 100) : 0;

        const roleName = staff.roleId ? (staff.roleId as any).name : "Staff";

        return {
          userId: staffId.toString(),
          name: staff.name,
          role: roleName,
          assigned,
          accepted,
          inProgress: inProg,
          resolved: resolvedCount,
          overdue: overdueCount,
          avgFirstResponseMinutes,
          avgAcceptMinutes,
          completionRate,
          currentLoad: inProg,
        };
      })
    );

    // Sort: overloaded first, then by current load desc
    staffPerformance.sort((a, b) => b.currentLoad - a.currentLoad);

    // ===== CRITICAL CASES =====
    const critUnassigned = await Contact.find({
      status: { $in: ["new", "pending"] },
      assignedTo: null,
    })
      .sort({ createdAt: 1 })
      .limit(10)
      .select("_id name company subject createdAt status priority")
      .lean();

    const critWaitingAccept = await Contact.find({ status: "assigned" })
      .sort({ assignedAt: 1 })
      .limit(10)
      .select("_id name company subject assignedAt assignedTo status")
      .populate("assignedTo", "name")
      .lean();

    const critOverdue = await Contact.find({
      status: { $in: ["new", "assigned", "pending"] },
      createdAt: { $lt: slaThreshold },
      firstResponseAt: null,
    })
      .sort({ createdAt: 1 })
      .limit(10)
      .select("_id name company subject createdAt status assignedTo priority")
      .populate("assignedTo", "name")
      .lean();

    const critStale = await Contact.find({
      status: { $in: ["accepted", "in_progress", "processing"] },
      updatedAt: { $lt: staleThreshold },
    })
      .sort({ updatedAt: 1 })
      .limit(10)
      .select("_id name company subject updatedAt status assignedTo")
      .populate("assignedTo", "name")
      .lean();

    const criticalCases = {
      unassigned: critUnassigned.map((c: any) => ({
        _id: c._id.toString(),
        name: c.name,
        company: c.company,
        subject: c.subject,
        createdAt: c.createdAt,
        status: c.status,
        priority: c.priority,
      })),
      waitingAccept: critWaitingAccept.map((c: any) => ({
        _id: c._id.toString(),
        name: c.name,
        company: c.company,
        subject: c.subject,
        assignedAt: c.assignedAt,
        assignedTo: c.assignedTo ? (c.assignedTo as any).name : "N/A",
        status: c.status,
      })),
      overdue: critOverdue.map((c: any) => ({
        _id: c._id.toString(),
        name: c.name,
        company: c.company,
        subject: c.subject,
        createdAt: c.createdAt,
        status: c.status,
        assignedTo: c.assignedTo ? (c.assignedTo as any).name : "Unassigned",
        priority: c.priority,
      })),
      stale: critStale.map((c: any) => ({
        _id: c._id.toString(),
        name: c.name,
        company: c.company,
        subject: c.subject,
        updatedAt: c.updatedAt,
        status: c.status,
        assignedTo: c.assignedTo ? (c.assignedTo as any).name : "N/A",
      })),
    };

    // ===== RECENT ACTIVITY =====
    const recentActivity = await InquiryActivity.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const recentActivityData = recentActivity.map((a: any) => ({
      _id: a._id.toString(),
      action: a.action,
      inquiryId: a.inquiryId.toString(),
      customerName: a.customerName || "N/A",
      performedByName: a.performedByName || "System",
      fromValue: a.fromValue,
      toValue: a.toValue,
      createdAt: a.createdAt,
    }));

    // ===== RECENT INQUIRIES =====
    const recentInquiries = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("_id name company subject category status priority assignedTo createdAt updatedAt firstResponseAt")
      .populate("assignedTo", "name")
      .lean();

    const recentInquiriesData = recentInquiries.map((iq: any) => ({
      _id: iq._id.toString(),
      name: iq.name,
      company: iq.company,
      subject: iq.subject,
      category: iq.category,
      status: iq.status,
      priority: iq.priority,
      assignedTo: iq.assignedTo ? (iq.assignedTo as any).name : null,
      createdAt: iq.createdAt,
      updatedAt: iq.updatedAt,
      firstResponseAt: iq.firstResponseAt,
    }));

    // ===== RESPONSE TIME STATS (GLOBAL) =====
    const frtGlobal = await Contact.find({
      firstResponseAt: { $exists: true },
      createdAt: { $exists: true },
    })
      .select("createdAt firstResponseAt")
      .lean();

    let avgFRTMinutes = 0;
    if (frtGlobal.length > 0) {
      const totalMin = frtGlobal.reduce((sum, doc: any) => {
        const diff = new Date(doc.firstResponseAt).getTime() - new Date(doc.createdAt).getTime();
        return sum + diff / (1000 * 60);
      }, 0);
      avgFRTMinutes = Math.round(totalMin / frtGlobal.length);
    }

    const handlingDocs = await Contact.find({
      resolvedAt: { $exists: true },
      createdAt: { $exists: true },
    })
      .select("createdAt resolvedAt")
      .lean();

    let avgHandlingMinutes = 0;
    if (handlingDocs.length > 0) {
      const totalMin = handlingDocs.reduce((sum, doc: any) => {
        const diff = new Date(doc.resolvedAt).getTime() - new Date(doc.createdAt).getTime();
        return sum + diff / (1000 * 60);
      }, 0);
      avgHandlingMinutes = Math.round(totalMin / handlingDocs.length);
    }

    const totalWithResponse = frtGlobal.length;
    const totalResolvable = await Contact.countDocuments({
      status: { $nin: ["new"] },
    });
    const slaCompliance = totalResolvable > 0
      ? Math.round(((totalResolvable - overdue) / totalResolvable) * 100)
      : 100;

    const responseMetrics = {
      avgFRTMinutes,
      avgHandlingMinutes,
      slaCompliance,
      totalWithResponse,
    };

    return res.status(200).json({
      success: true,
      data: {
        summary,
        byCategory: byCategoryData,
        byStatus: byStatusData,
        byDay,
        staffPerformance,
        criticalCases,
        recentActivity: recentActivityData,
        recentInquiries: recentInquiriesData,
        responseMetrics,
      },
    });
  } catch (error: unknown) {
    console.error("Inquiry Dashboard API Error:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
}
