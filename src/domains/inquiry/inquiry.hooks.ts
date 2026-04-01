import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInquiries, editInquiry } from "./inquiry.api";
import { inquiryKeys } from "./inquiry.keys";
import type { UpdateInquiryPayload } from "./inquiry.types";

export function useInquiries() {
  return useQuery({
    queryKey: inquiryKeys.lists(),
    queryFn: fetchInquiries,
  });
}

export function useUpdateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateInquiryPayload }) =>
      editInquiry(id, payload),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
    },
  });
}
