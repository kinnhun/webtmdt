import { useQuery } from "@tanstack/react-query";
import { productKeys } from "./product.keys";
import { getProducts, getFeaturedProducts } from "@/services/product.service";
import type { FilterState, Product } from "./product.types";

export function useProducts(filters: FilterState, search: string, enabled = true) {
  return useQuery({
    queryKey: productKeys.list({ ...filters, search }),
    queryFn: () => getProducts(filters, search),
    enabled,
  });
}

export function useFeaturedProducts(initialData?: Product[]) {
  const hasInitialData = Array.isArray(initialData) && initialData.length > 0;
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: getFeaturedProducts,
    initialData: hasInitialData ? initialData : undefined,
    initialDataUpdatedAt: hasInitialData ? 0 : undefined,
  });
}
