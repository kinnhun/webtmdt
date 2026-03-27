import { useRouter } from "next/router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/product.service";
import { productsData } from "@/data/products";

export const useProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug as string),
    enabled: router.isReady && !!slug,
    retry: 1
  });

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((p) => p.id !== product.id && (p.category === product.category || p.material === product.material))
      .slice(0, 4);
  }, [product]);

  return {
    isReady: router.isReady && !isLoading,
    isLoading: !router.isReady || isLoading,
    isError,
    product,
    relatedProducts
  };
};
