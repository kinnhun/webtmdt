import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import AdminUser from "@/models/AdminUser";
import Product from "@/models/Product";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_admin_rbacs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    
    // Auth Check
    const token = req.cookies.admin_token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
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
    const scope = req.query.scope; // 'my_assigned'

    let filter: any = {};
    if (!isAdmin) {
      // If not admin, FORCE query to only return assigned to this user
      filter.assignedTo = user._id;
    } else if (scope === "my_assigned") {
      // Admin but specifically requested their own
      filter.assignedTo = user._id;
    }

    // Models are already imported or registered top-level

    // Populate assignedTo and assignedBy
    const inquiries = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "name username")
      .populate("assignedBy", "name username")
      .lean();
    
    // Manually populate interestedProduct to avoid ObjectId cast errors
    // Some older records might have product code instead of ObjectId
    const productIdsOrCodes = inquiries
      .map(iq => iq.interestedProduct ? iq.interestedProduct.toString() : null)
      .filter(Boolean) as string[];

    if (productIdsOrCodes.length > 0) {
      // Find products that match either _id, code, or productId
      const validObjectIds = productIdsOrCodes.filter(id => mongoose.Types.ObjectId.isValid(id));
      const textIds = productIdsOrCodes.filter(id => !mongoose.Types.ObjectId.isValid(id));

      const products = await mongoose.models.Product.find({
        $or: [
          { _id: { $in: validObjectIds } },
          { code: { $in: textIds } }
        ]
      }).select("name slug code image").lean();

      // Map products back to inquiries
      inquiries.forEach(iq => {
        if (iq.interestedProduct) {
          const iqProdVal = iq.interestedProduct.toString();
          const product = products.find((p: any) => 
            p._id.toString() === iqProdVal || 
            p.code === iqProdVal
          );
          if (product) {
            iq.interestedProduct = product as any;
          }
        }
      });
    }

    return res.status(200).json(inquiries);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch inquiries" });
  }
}
