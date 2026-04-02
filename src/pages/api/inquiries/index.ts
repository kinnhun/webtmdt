import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    
    // Ensure Product model is registered
    require("@/models/Product");

    // Sort by descending createdAt (newest first)
    const inquiries = await Contact.find().sort({ createdAt: -1 }).lean();
    
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

    return res.status(200).json({ success: true, data: inquiries });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch inquiries" });
  }
}
