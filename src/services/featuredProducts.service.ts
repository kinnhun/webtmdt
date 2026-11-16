import httpClient from "@/lib/http/client";
import type {
  FeaturedProductsAdminData,
  FeaturedProductsGetResponse,
  FeaturedProductsSaveResponse,
} from "@/features/admin/types/featuredProducts.types";

/**
 * Fetches saved Home featured product order and selectable product candidates for Admin.
 */
export async function getAdminFeaturedProducts(): Promise<FeaturedProductsAdminData> {
  const { data } = await httpClient.get<FeaturedProductsGetResponse>("/admin/featured-products");
  return data.data;
}

/**
 * Persists Admin-chosen product slugs in exact priority order for the Home showcase.
 */
export async function saveAdminFeaturedProducts(featuredProductSlugs: string[]): Promise<string[]> {
  const { data } = await httpClient.put<FeaturedProductsSaveResponse>("/admin/featured-products", {
    featuredProductSlugs,
  });
  return data.data.featuredProductSlugs;
}

