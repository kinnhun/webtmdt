import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import Product from "@/models/Product";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    
    // Ensure Product model is registered
    require("@/models/Product");

    // Dates for filtering
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOf7DaysAgo = new Date(startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOf30DaysAgo = new Date(startOfToday.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Queries for Contacts
    const totalInquiries = await Contact.countDocuments();
    const newToday = await Contact.countDocuments({ createdAt: { $gte: startOfToday } });
    const newLast7Days = await Contact.countDocuments({ createdAt: { $gte: startOf7DaysAgo } });
    const newLast30Days = await Contact.countDocuments({ createdAt: { $gte: startOf30DaysAgo } });
    const pendingInquiries = await Contact.countDocuments({ status: "pending" });

    // Pipeline by Status
    const pipelineStatusRaw = await Contact.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const pipelineStatus = {
      pending: pipelineStatusRaw.find((s: any) => s._id === "pending")?.count || 0,
      processing: pipelineStatusRaw.find((s: any) => s._id === "processing")?.count || 0,
      resolved: pipelineStatusRaw.find((s: any) => s._id === "resolved")?.count || 0,
    };

    // Queries for Products
    const totalProducts = await Product.countDocuments();

    // Aggregations
    const productsByCategoryRaw = await Product.aggregate([
      { $group: { _id: "$category.us", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Some older docs might have flat strings for category, ensure we pick a string
    const productsByCategory = productsByCategoryRaw.map((cat: any) => ({
      n: cat._id || 'Uncategorized',
      c: cat.count
    }));

    const productsByMaterialRaw = await Product.aggregate([
      { $group: { _id: "$material.us", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    const productsByMaterial = productsByMaterialRaw.map((mat: any) => ({
      n: mat._id || 'Unknown',
      c: mat.count
    }));

    const productsByMOQRaw = await Product.aggregate([
      { $group: { _id: "$moq", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    const productsByMOQ = productsByMOQRaw.map((moq: any) => ({
      n: moq._id || 'Not specified',
      c: moq.count
    }));

    // Top Inquired Products
    const topInquiredRaw = await Contact.aggregate([
      { $match: { interestedProduct: { $ne: null } } },
      { $group: { _id: "$interestedProduct", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Top Viewed (Real sorting by views, if view is 0 or undefined, they fallback to below)
    const topViewedRaw = await Product.find().sort({ views: -1, createdAt: -1 }).limit(5).select("name code slug _id views").lean();
    const topViewedProducts = topViewedRaw.map((p: any) => {
      let title = "Unknown Product";
      if (p && typeof p.name === 'object') title = p.name.us;
      else if (p) title = p.name || p.code;
      return {
        title,
        slug: p.slug || p._id?.toString(),
        views: p.views || 0 // Fetch real views. Default to 0
      };
    });

    // Recent Inquiries mapped securely
    const recentInquiriesRaw = await Contact.find().sort({ createdAt: -1 }).limit(5).lean();

    // Collect all IDs to populate
    const inqIds = recentInquiriesRaw.map((iq: any) => iq.interestedProduct ? iq.interestedProduct.toString() : null).filter(Boolean) as string[];
    const topInqIds = topInquiredRaw.map((iq: any) => iq._id ? iq._id.toString() : null).filter(Boolean) as string[];
    const allIdsToFetch = Array.from(new Set([...inqIds, ...topInqIds]));

    let populatedProducts: any[] = [];
    if (allIdsToFetch.length > 0) {
      const validObjectIds = allIdsToFetch.filter(id => mongoose.Types.ObjectId.isValid(id));
      const textIds = allIdsToFetch.filter(id => !mongoose.Types.ObjectId.isValid(id));
      populatedProducts = await mongoose.models.Product.find({
        $or: [
          { _id: { $in: validObjectIds } },
          { code: { $in: textIds } }
        ]
      }).select("name slug code").lean();
    }

    const recentInquiries = recentInquiriesRaw.map((iq: any) => {
      let productStr = "N/A";
      let slug = "";
      if (iq.interestedProduct) {
        const iqProdVal = iq.interestedProduct.toString();
        const prod = populatedProducts.find((p: any) => p._id.toString() === iqProdVal || p.code === iqProdVal);
        if (prod && typeof prod.name === 'object') productStr = prod.name.us;
        else if (prod) productStr = prod.name;
        else productStr = iqProdVal;
        
        if (prod) slug = prod.slug || prod._id.toString();
      }

      return {
        key: iq._id.toString(),
        date: new Date(iq.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        name: iq.name || "Unknown",
        company: iq.company || "Unknown",
        product: productStr,
        slug: slug,
        status: iq.status?.toUpperCase() || "NEW"
      };
    });

    const topInquiredProducts = topInquiredRaw.map((iq: any) => {
      let title = iq._id.toString();
      let slug = title;
      const prod = populatedProducts.find((p: any) => p._id.toString() === title || p.code === title);
      
      if (prod) {
        if (typeof prod.name === 'object') title = prod.name.us;
        else if (prod.name) title = prod.name;
        else if (prod.code) title = prod.code;
        slug = prod.slug || prod._id.toString();
      }

      return {
        title,
        slug,
        count: iq.count
      };
    });

    const data = {
      totalInquiries,
      newToday,
      newLast7Days,
      newLast30Days,
      pendingInquiries,
      totalProducts,
      pipelineStatus,
      productsByCategory,
      productsByMaterial,
      productsByMOQ,
      recentInquiries,
      topInquiredProducts,
      topViewedProducts
    };

    return res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    console.error("Dashboard API Error:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
}
