import { useRouter } from "next/router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/product.service";
import { useProducts } from "@/domains/product/product.hooks";

export const useProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug as string),
    enabled: router.isReady && !!slug,
    retry: 1
  });

  const emptyFilters = { category: [], material: [], moq: [], color: [], style: [] };
  const { data: rawProducts = [] } = useProducts(emptyFilters, "");

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const productsToFilter = Array.isArray(rawProducts) ? rawProducts : (rawProducts as any)?.data || [];
    return productsToFilter
      .filter((p: any) => p.id !== product.id && (p.category?.us === product.category?.us || p.material?.us === product.material?.us))
      .slice(0, 4);
  }, [product, rawProducts]);

  return {
    isReady: router.isReady && !isLoading,
    isLoading: !router.isReady || isLoading,
    isError,
    product,
    relatedProducts
  };
};
