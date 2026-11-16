import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { invalidateCache } from "@/lib/cache";
import { verifyAdminRequest } from "@/lib/adminAuth";
import HomeContent from "@/models/HomeContent";
import Product, { type IProduct } from "@/models/Product";
import {
  formatProductDisplayTitle,
  isExcludedLegacyProduct,
  isStandaloneTableProduct,
} from "@/lib/productDisplay";
import type {
  FeaturedProductCandidate,
  FeaturedProductsGetResponse,
  FeaturedProductsSaveResponse,
} from "@/features/admin/types/featuredProducts.types";

const MAX_FEATURED_PRODUCTS = 12;

type CandidateLeanDoc = Pick<
  IProduct,
  "productId" | "slug" | "code" | "name" | "category" | "collection" | "image"
> & {
  _id: { toString(): string };
};

function mapCandidate(doc: CandidateLeanDoc): FeaturedProductCandidate {
  const collectionValue = Array.isArray(doc.collection)
    ? doc.collection.join(", ")
    : doc.collection || "";

  return {
    id: doc.productId || doc._id.toString(),
    slug: doc.slug,
    code: doc.code || "",
    nameUs: formatProductDisplayTitle(doc.name?.us || ""),
    nameVi: formatProductDisplayTitle(doc.name?.vi || doc.name?.us || ""),
    categoryUs: doc.category?.us || collectionValue || "Collections",
    collection: collectionValue,
    image: doc.image || "",
    isStandaloneTable: isStandaloneTableProduct({
      name: doc.name,
      category: doc.category,
    }),
    isLegacyExcluded: isExcludedLegacyProduct({
      name: doc.name,
      code: doc.code,
      slug: doc.slug,
    }),
  };
}

function normalizeOrderedSlugs(input: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of input) {
    const trimmed = item.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    result.push(trimmed);
    if (result.length >= MAX_FEATURED_PRODUCTS) break;
  }

  return result;
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const auth = await verifyAdminRequest(req, ["product.view", "product.manage", "system.all"]);
  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.error });
  }

  try {
    await dbConnect();

    const [homeDoc, productDocs] = await Promise.all([
      HomeContent.findOne().select("featuredProductSlugs").lean() as Promise<{
        featuredProductSlugs?: string[];
      } | null>,
      Product.find()
        .select("productId slug code name category collection image")
        .sort({ createdAt: -1 })
        .lean() as unknown as Promise<CandidateLeanDoc[]>,
    ]);

    const candidates = productDocs
      .filter((doc) => typeof doc.slug === "string" && doc.slug.trim() !== "")
      .map(mapCandidate);

    const validSlugSet = new Set(candidates.map((c) => c.slug));
    const storedSlugs = Array.isArray(homeDoc?.featuredProductSlugs)
      ? homeDoc.featuredProductSlugs.filter((slug) => validSlugSet.has(slug))
      : [];

    const response: FeaturedProductsGetResponse = {
      success: true,
      data: {
        featuredProductSlugs: storedSlugs,
        candidates,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Admin featured products GET error:", error);
    return res.status(500).json({ error: "Failed to load featured products settings" });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const auth = await verifyAdminRequest(req, ["product.manage", "system.all"]);
  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.error });
  }

  const rawSlugs: string[] | null = Array.isArray(req.body?.featuredProductSlugs)
    ? req.body.featuredProductSlugs.filter((v: string) => typeof v === "string")
    : null;

  if (!rawSlugs) {
    return res.status(400).json({ error: "featuredProductSlugs must be an array of strings" });
  }

  try {
    await dbConnect();

    const uniqueSlugs = normalizeOrderedSlugs(rawSlugs);
    const existingDocs = uniqueSlugs.length
      ? ((await Product.find({ slug: { $in: uniqueSlugs } })
          .select("slug")
          .lean()) as Array<{ slug: string }>)
      : [];

    const existingSlugSet = new Set(existingDocs.map((doc) => doc.slug));
    const validOrderedSlugs = uniqueSlugs.filter((slug) => existingSlugSet.has(slug));

    await HomeContent.findOneAndUpdate(
      {},
      { $set: { featuredProductSlugs: validOrderedSlugs } },
      { returnDocument: "after", upsert: true, runValidators: true }
    ).lean();

    invalidateCache("featured-products-public");
    invalidateCache("home-content-public");
    invalidateCache("products-list-all");

    // Trigger ISR revalidation for home locales so SSR HTML matches Admin edits right away.
    await Promise.allSettled([
      res.revalidate("/"),
      res.revalidate("/vi-VN"),
      res.revalidate("/en-GB"),
    ]);

    const response: FeaturedProductsSaveResponse = {
      success: true,
      data: {
        featuredProductSlugs: validOrderedSlugs,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Admin featured products PUT error:", error);
    return res.status(500).json({ error: "Failed to save featured products order" });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return handleGet(req, res);
  }
  if (req.method === "PUT") {
    return handlePut(req, res);
  }
  return res.status(405).json({ error: "Method not allowed" });
}

