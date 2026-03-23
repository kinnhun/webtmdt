export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...productKeys.lists(), filters] as const,
  featured: () => [...productKeys.all, "featured"] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
};
