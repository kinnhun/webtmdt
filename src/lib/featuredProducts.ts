import dbConnect from "@/lib/mongodb";
import { cached } from "@/lib/cache";
import HomeContent from "@/models/HomeContent";
import Product, { type IProduct } from "@/models/Product";
import type { Collection, Product as PublicProduct } from "@/domains/product/product.types";
import { isExcludedLegacyProduct, isStandaloneTableProduct } from "@/lib/productDisplay";

function normalizeCollection(value: string): Collection | Collection[] {
  const parts = value
    .split(",")
    .map((part) => part.trim())
    .filter((part): part is Collection => part === "Outdoor" || part === "Indoor");
  if (parts.length > 1) return parts;
  if (parts.length === 1) return parts[0];
  return "Outdoor";
}

export const FEATURED_CACHE_KEY = "featured-products-public";
const CACHE_TTL = process.env.NODE_ENV === "production" ? 60_000 : 15_000;
const DEFAULT_FALLBACK_LIMIT = 6;
const FEATURED_PRODUCT_PROJECTION =
  "productId slug name code collection category material color size style image images description features room";

type LeanProductDoc = Pick<
  IProduct,
  | "productId"
  | "slug"
  | "name"
  | "code"
  | "collection"
  | "category"
  | "material"
  | "color"
  | "size"
  | "style"
  | "image"
  | "images"
  | "description"
  | "features"
  | "room"
> & {
  _id: { toString(): string };
};

function mapProductToFeaturedDto(product: LeanProductDoc): PublicProduct {
  return {
    id: product.productId || product._id.toString(),
    slug: product.slug,
    name: product.name,
    code: product.code,
    collection: normalizeCollection(product.collection || ""),
    category: product.category,
    material: product.material,
    color: product.color,
    size: product.size,
    style: product.style,
    image: product.image,
    images: product.images,
    description: product.description,
    features: product.features,
    room: product.room,
  };
}

async function resolveConfiguredFeaturedProducts(slugs: string[]): Promise<PublicProduct[]> {
  if (!slugs.length) return [];

  const matchedDocs = (await Product.find({
    slug: { $in: slugs },
  })
    .select(FEATURED_PRODUCT_PROJECTION)
    .lean()) as unknown as LeanProductDoc[];

  const docBySlug = new Map<string, LeanProductDoc>();
  for (const doc of matchedDocs) {
    if (doc.slug) {
      docBySlug.set(doc.slug, doc);
    }
  }

  const ordered: PublicProduct[] = [];
  for (const slug of slugs) {
    const matched = docBySlug.get(slug);
    if (matched) {
      ordered.push(mapProductToFeaturedDto(matched));
    }
  }

  return ordered;
}

async function resolveFallbackFeaturedProducts(): Promise<PublicProduct[]> {
  const candidates = (await Product.find()
    .select(FEATURED_PRODUCT_PROJECTION)
    .sort({ createdAt: -1 })
    .limit(36)
    .lean()) as unknown as LeanProductDoc[];

  return candidates
    .filter(
      (product) =>
        typeof product.slug === "string" &&
        product.slug.trim() !== "" &&
        !isExcludedLegacyProduct({
          name: product.name,
          code: product.code,
          slug: product.slug,
        }) &&
        !isStandaloneTableProduct({
          name: product.name,
          category: product.category,
        })
    )
    .slice(0, DEFAULT_FALLBACK_LIMIT)
    .map(mapProductToFeaturedDto);
}

/**
 * Fetches ordered featured collections with in-memory TTL caching so both
 * `/api/products/featured` and `getStaticProps` share one consistent source.
 */
export async function getPublicFeaturedProducts(): Promise<PublicProduct[]> {
  return cached(FEATURED_CACHE_KEY, CACHE_TTL, async () => {
    await dbConnect();

    const homeDoc = (await HomeContent.findOne()
      .select("featuredProductSlugs")
      .lean()) as { featuredProductSlugs?: string[] } | null;

    const configuredSlugs = Array.isArray(homeDoc?.featuredProductSlugs)
      ? homeDoc.featuredProductSlugs.filter(
          (slug): slug is string => typeof slug === "string" && slug.trim().length > 0
        )
      : [];

    const curated = await resolveConfiguredFeaturedProducts(configuredSlugs);
    if (curated.length > 0) {
      return curated;
    }

    return resolveFallbackFeaturedProducts();
  });
}
