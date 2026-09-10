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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params || {};

  if (!slug || typeof slug !== "string") {
    return { notFound: true };
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

