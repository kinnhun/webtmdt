export const inquiryKeys = {
  all: ["inquiries"] as const,
  lists: () => [...inquiryKeys.all, "list"] as const,
  detail: (id: string) => [...inquiryKeys.all, "detail", id] as const,
};
