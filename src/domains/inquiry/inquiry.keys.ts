export const inquiryKeys = {
  all: ["inquiries"] as const,
  lists: (params?: { scope?: string }) => [...inquiryKeys.all, "list", params] as const,
  detail: (id: string) => [...inquiryKeys.all, "detail", id] as const,
};
