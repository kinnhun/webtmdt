import httpClient from "@/lib/http/client";
import type { Product, FilterState } from "@/domains/product/product.types";

export async function getProducts(filters: FilterState, search: string): Promise<Product[]> {
  const params: Record<string, string> = {};

  if (search) params.search = search;
  if (filters.category.length) params.category = filters.category.join(",");
  if (filters.material.length) params.material = filters.material.join(",");
  if (filters.color.length) params.color = filters.color.join(",");
  if (filters.style.length) params.style = filters.style.join(",");

  const { data } = await httpClient.get<Product[]>("/products", { params });
  return data;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await httpClient.get<Product[]>("/products/featured");
  return data;
}
