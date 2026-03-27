import { useRouter } from "next/router";
import { useMemo } from "react";
import { productsData } from "@/data/products";

export const useProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const isReady = router.isReady;

  const product = useMemo(() => {
    if (!isReady || !slug) return null;
    return productsData.find((p) => p.slug === slug) || null;
  }, [isReady, slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((p) => p.id !== product.id && (p.category === product.category || p.material === product.material))
      .slice(0, 4);
  }, [product]);

  return {
    isReady,
    product,
    relatedProducts
  };
};
