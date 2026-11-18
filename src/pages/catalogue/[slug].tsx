import type { GetServerSideProps } from "next";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductDetailWrapper from "@/features/catalogue/components/ProductDetailWrapper";

interface ProductDetailPageProps {
  initialProduct?: any;
  initialRelated?: any[];
}

export default function ProductDetailPage({ initialProduct, initialRelated }: ProductDetailPageProps) {
  return <ProductDetailWrapper initialProduct={initialProduct} initialRelated={initialRelated} />;
}

const SLUG_ALIASES: Record<string, string> = {
  // Spelling fixes (Audit Issues 19 & 20)
  "bondi-lougne": "bondi-lounge-collection",
  "bondi-lougne-collection": "bondi-lounge-collection",
  "bondi-lounge": "bondi-lounge-collection",
  "bondi": "bondi-lounge-collection",
  "mobley-dinning": "mobley-dining-collection",
  "mobley-dinning-collection": "mobley-dining-collection",
  "mobley-dining": "mobley-dining-collection",
  "mobley": "mobley-dining-collection",
  "wesley-dinning": "wesley-dining-collection",
  "wesley-dinning-collection": "wesley-dining-collection",
  "wesley-dining": "wesley-dining-collection",
  "wesley": "wesley-dining-collection",
  "retangle-table": "rectangular-table",
  "rectangle-table": "rectangular-table",
  "retangle": "rectangular-table",
  // Master name variants & alias fallbacks
  "brooks-lounge": "brooksc-lounge-collection",
  "brooks-lounge-collection": "brooksc-lounge-collection",
  "brooksc-lounge": "brooksc-lounge-collection",
  "brooks": "brooksc-lounge-collection",
  "brooksc": "brooksc-lounge-collection",
  "balmora-lounge": "balemora-lounge-collection",
  "balmora-lounge-collection": "balemora-lounge-collection",
  "balmora": "balemora-lounge-collection",
  "siena-table": "seina-table",
  "siena": "seina-table",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};

  if (!slug || typeof slug !== "string") {
    return { notFound: true };
  }

  const normalizedSlug = slug.toLowerCase();
  if (SLUG_ALIASES[normalizedSlug]) {
    const targetSlug = SLUG_ALIASES[normalizedSlug];
    return {
      redirect: {
        destination: `/catalogue/${targetSlug}`,
        permanent: true,
      },
    };
  }

  try {
    await dbConnect();

    const orConditions: Record<string, unknown>[] = [{ slug }, { code: slug }, { productId: slug }];
    if (mongoose.isValidObjectId(slug)) {
      orConditions.push({ _id: slug });
    }

    const product = await Product.findOne({ $or: orConditions }).lean();

    if (!product) {
      return { notFound: true };
    }

    // Fetch related products
    const relatedQuery: Record<string, unknown> = {
      _id: { $ne: product._id },
    };
    const orConds: Record<string, unknown>[] = [];
    if ((product as any).category?.us) orConds.push({ "category.us": (product as any).category.us });
    if ((product as any).material?.us) orConds.push({ "material.us": (product as any).material.us });
    if (orConds.length > 0) relatedQuery.$or = orConds;

    const relatedProducts = orConds.length > 0
      ? await Product.find(relatedQuery)
          .select("name slug code image images category material collection")
          .limit(4)
          .lean()
      : [];

    const formattedProduct = JSON.parse(
      JSON.stringify({
        ...product,
        id: (product as any).productId || product._id?.toString(),
      })
    );

    const formattedRelated = JSON.parse(
      JSON.stringify(
        relatedProducts.map((p: any) => ({
          ...p,
          id: p.productId || p._id?.toString(),
        }))
      )
    );

    return {
      props: {
        initialProduct: formattedProduct,
        initialRelated: formattedRelated,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps for product:", error);
    return { notFound: true };
  }
};

