import { useQuery } from "@tanstack/react-query";
import { productKeys } from "./product.keys";
import { getProducts, getFeaturedProducts } from "@/services/product.service";
import type { FilterState } from "./product.types";

export function useProducts(filters: FilterState, search: string) {
  return useQuery({
    queryKey: productKeys.list({ ...filters, search }),
    queryFn: () => getProducts(filters, search),
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: getFeaturedProducts,
  });
}
