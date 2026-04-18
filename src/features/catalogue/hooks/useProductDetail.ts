import { useRouter } from "next/router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/product.service";

export const useProductDetail = () => {
  const router = useRouter();
  const rawId = router.query.id || router.query.slug;
  const identifier = Array.isArray(rawId) ? rawId[0] : rawId;

  const { data: rawData, isLoading, isError } = useQuery({
    queryKey: ['product', identifier],
    queryFn: () => getProduct(identifier as string),
    enabled: router.isReady && !!identifier,
    retry: 1
  });

  // The API now returns _related alongside the product data
  const product = useMemo(() => {
    if (!rawData) return undefined;
    const { _related, ...rest } = rawData as any;
    return rest;
  }, [rawData]);

  const relatedProducts = useMemo(() => {
    if (!rawData) return [];
    return (rawData as any)._related || [];
  }, [rawData]);

  return {
    isReady: router.isReady && !isLoading,
    isLoading: !router.isReady || isLoading,
    isError,
    product,
    relatedProducts
  };
};
