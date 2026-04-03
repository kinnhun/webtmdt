import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import Contact from "@/models/Contact";
import InquiryActivity from "@/models/InquiryActivity";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_admin_rbacs";
const SLA_HOURS = 24;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    // Verify Auth
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userId = decoded.id;
    const user = await AdminUser.findById(userId).populate("roleId", "name").lean();
    if (!user || user.status !== "active") {
      return res.status(403).json({ error: "Forbidden: Account inactive" });
    }

    // GET: Fetch profile details, metrics, and activity
    if (req.method === "GET") {
      const slaThreshold = new Date(Date.now() - SLA_HOURS * 60 * 60 * 1000);

      // Staff Performance metrics
      const [assigned, inProgress, resolvedCount, overdueCount] = await Promise.all([
        Contact.countDocuments({ assignedTo: userId }),
        Contact.countDocuments({ assignedTo: userId, status: { $in: ["accepted", "in_progress", "processing"] } }),
        Contact.countDocuments({ assignedTo: userId, status: { $in: ["resolved", "closed"] } }),
        Contact.countDocuments({
          assignedTo: userId,
          status: { $in: ["assigned", "accepted", "in_progress"] },
          createdAt: { $lt: slaThreshold },
          firstResponseAt: null,
        }),
      ]);

      // FRT Calculation
      const frtDocs = await Contact.find({
        assignedTo: userId,
        firstResponseAt: { $exists: true, $ne: null },
        createdAt: { $exists: true, $ne: null },
      })
        .select("createdAt firstResponseAt")
        .lean();

      let avgFirstResponseMinutes = 0;
      if (frtDocs.length > 0) {
        const totalMinutes = frtDocs.reduce((sum, doc: any) => {
          const diff = new Date(doc.firstResponseAt).getTime() - new Date(doc.createdAt).getTime();
          return sum + diff / (1000 * 60);
        }, 0);
        avgFirstResponseMinutes = Math.round(totalMinutes / frtDocs.length);
      }

      const completionRate = assigned > 0 ? Math.round((resolvedCount / assigned) * 100) : 0;

      const metrics = {
        assigned,
        inProgress,
        resolved: resolvedCount,
        overdue: overdueCount,
        avgFirstResponseMinutes,
        completionRate,
      };

      // Recent Activity by this user
      // Assuming performedBy exists or performedByName matches name. 
      // Because we usually log performedByName, let's also fetch by name just in case. 
      // Wait, InquiryActivity model might have performedBy as an ObjectId depending on implementation. 
      // It has performedByName usually. We'll search by name string.
      const recentActivity = await InquiryActivity.find({ performedByName: user.name })
        .sort({ createdAt: -1 })
        .limit(15)
        .lean();

      const activityData = recentActivity.map((a: any) => ({
        _id: a._id.toString(),
        action: a.action,
        inquiryId: a.inquiryId.toString(),
        customerName: a.customerName || "N/A",
        fromValue: a.fromValue,
        toValue: a.toValue,
        createdAt: a.createdAt,
      }));

      // Return sanitized user
      const { passwordHash: _, ...safeUser } = user as any;

      return res.status(200).json({
        success: true,
        data: {
          user: safeUser,
          metrics,
          recentActivity: activityData,
        },
      });
    }

    // PUT: Update Profile Name
    if (req.method === "PUT") {
      const { name } = req.body;
      if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Tên hiển thị không được để trống" });
      }

      await AdminUser.findByIdAndUpdate(userId, { name: name.trim() }, { runValidators: true });
      return res.status(200).json({ success: true, message: "Cập nhật tên thành công" });
    }

    // PATCH: Update Password
    if (req.method === "PATCH") {
      const { oldPassword, newPassword } = req.body;
      
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: "Vui lòng nhập đầy đủ mật khẩu cũ và mới" });
      }

      // Fetch user WITH passwordHash since it's not selected naturally sometimes 
      // Actually AdminUser model in this project probably has it selected by default or we need to find it directly
      const userWithHash = await AdminUser.findById(userId).select("+passwordHash");
      
      if (!userWithHash) {
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      }
      
      const isMatch = await bcrypt.compare(oldPassword, userWithHash.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ error: "Mật khẩu cũ không chính xác" });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await AdminUser.findByIdAndUpdate(userId, { passwordHash: hashedNewPassword });

      return res.status(200).json({ success: true, message: "Đổi mật khẩu thành công" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Admin Profile API Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
