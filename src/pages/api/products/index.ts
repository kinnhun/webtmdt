import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { cached, invalidateCache } from "@/lib/cache";
import Product from "@/models/Product";
import mongoose from "mongoose";

const PRODUCTS_LIST_CACHE_KEY = "products-list-all";
const PRODUCTS_LIST_TTL = process.env.NODE_ENV === "production" ? 30_000 : 10_000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    if (req.method === "POST") {
      const payload = { ...req.body };

      // Ensure collection is a plain string (schema: String, not I18nText)
      if (Array.isArray(payload.collection)) {
        payload.collection = payload.collection.join(', ');
      }

      let { productId, code, slug } = payload;

      productId = productId || code || `p_${Date.now()}`;
      code = code || `SDK-${Date.now()}`;
      slug = slug || `slug-${Date.now()}`;

      let isUnique = false;
      let suffix = '';
      while (!isUnique) {
        const testProductId = suffix ? `${productId}-${suffix}` : productId;
        const testCode = suffix ? `${code}-${suffix}` : code;
        const testSlug = suffix ? `${slug}-${suffix}` : slug;

        const existing = await Product.findOne({
          $or: [{ productId: testProductId }, { code: testCode }, { slug: testSlug }]
        }).lean();

        if (!existing) {
          payload.productId = testProductId;
          payload.code = testCode;
          payload.slug = testSlug;
          isUnique = true;
        } else {
          suffix = Math.floor(1000 + Math.random() * 9000).toString();
        }
      }

      payload.room = payload.room || { us: 'General', uk: 'General', vi: 'General' };

      if (!payload.image || typeof payload.image !== 'string' || payload.image.trim() === '') {
        payload.image = '/images/products/placeholder.webp'; // Schema required fallback
      }

      const newProduct = await Product.create(payload);
      invalidateCache("featured-products-public");
      invalidateCache(PRODUCTS_LIST_CACHE_KEY);
      const productObj = newProduct.toObject();
      return res.status(201).json({
        ...productObj,
        id: productObj.productId || productObj._id?.toString(),
      });
    }

    const { search, category, material, color, size, style } = req.query;
    const isUnfilteredList = !search && !category && !material && !color && !size && !style;

    if (isUnfilteredList) {
      const mappedAll = await cached(PRODUCTS_LIST_CACHE_KEY, PRODUCTS_LIST_TTL, async () => {
        const allProducts = await Product.find({}).sort({ createdAt: -1 }).lean();
        return allProducts.map((p) => {
          const { _id, ...rest } = p as Record<string, unknown>;
          return {
            ...rest,
            id: (p as { productId?: string }).productId || (_id as mongoose.Types.ObjectId)?.toString(),
          };
        });
      });

      res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
      return res.status(200).json(mappedAll);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (search && typeof search === "string") {
      const regex = new RegExp(search.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
      filter.$or = [
        { "name.us": regex },
        { "name.vi": regex },
        { "name.uk": regex },
        { code: regex },
        { "category.us": regex },
        { "category.vi": regex },
        { "material.us": regex },
        { "material.uk": regex },
        { "material.vi": regex },
        { collection: regex },
        { "style.us": regex },
      ];
    }

    const buildRegex = (val: string) => {
      const items = val.split(",").map((c: string) => c.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).filter(Boolean);
      return items.length > 0 ? new RegExp(`(${items.join('|')})`, 'i') : null;
    };

    // I18nText fields and plain strings that store comma-separated lists
    if (category && typeof category === "string") {
      const rx = buildRegex(category);
      if (rx) filter["category.us"] = rx;
    }
    if (material && typeof material === "string") {
      const rx = buildRegex(material);
      if (rx) filter["material.us"] = rx;
    }
    if (color && typeof color === "string") {
      const rx = buildRegex(color);
      if (rx) filter["color.us"] = rx;
    }
    if (size && typeof size === "string") {
      filter.size = { $in: size.split(",") }; // Assuming size isn't multiple tags in UI
    }
    if (style && typeof style === "string") {
      const rx = buildRegex(style);
      if (rx) filter["style.us"] = rx;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();

    // Map _id to id for frontend compatibility
    const mapped = products.map((p) => {
      const { _id, ...rest } = p as Record<string, unknown>;
      return {
        ...rest,
        id: (p as { productId?: string }).productId || (_id as mongoose.Types.ObjectId)?.toString(),
      };
    });

    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json(mapped);
  } catch (error: unknown) {
    console.error("Products API Error:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}
