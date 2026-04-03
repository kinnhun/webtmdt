import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInquiries, editInquiry, fetchSettings, createSetting, updateSetting, deleteSetting, fetchInquiryDashboard } from "./inquiry.api";
import { inquiryKeys } from "./inquiry.keys";
import type { UpdateInquiryPayload } from "./inquiry.types";

export function useInquiries(params?: { scope?: string }) {
  return useQuery({
    queryKey: inquiryKeys.lists(params),
    queryFn: () => fetchInquiries(params),
  });
}

export function useUpdateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateInquiryPayload }) =>
      editInquiry(id, payload),
    onSuccess: () => {
      // Invalidate and refetch all inquiry lists + dashboard
      queryClient.invalidateQueries({ queryKey: inquiryKeys.all });
    },
  });
}

// --- Settings Hooks ---
export function useInquirySettings() {
  return useQuery({
    queryKey: ['inquiry-settings'],
    queryFn: fetchSettings,
  });
}

export function useCreateInquirySetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSetting,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiry-settings'] }),
  });
}

export function useUpdateInquirySetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => updateSetting(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiry-settings'] }),
  });
}

export function useDeleteInquirySetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSetting,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiry-settings'] }),
  });
}

// --- Dashboard Hook ---
export function useInquiryDashboard() {
  return useQuery({
    queryKey: inquiryKeys.dashboard,
    queryFn: fetchInquiryDashboard,
    refetchInterval: 60000, // refresh every 60 seconds
  });
}
