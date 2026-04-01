import httpClient from "@/lib/http/client";
import type { Inquiry, UpdateInquiryPayload } from "@/domains/inquiry/inquiry.types";

export const getInquiries = async (): Promise<Inquiry[]> => {
  const response = await httpClient.get<{ success: boolean; data: Inquiry[] }>("/inquiries");
  return response.data.data;
};

export const updateInquiry = async (id: string, payload: UpdateInquiryPayload): Promise<Inquiry> => {
  const response = await httpClient.patch<{ success: boolean; data: Inquiry }>(`/inquiries/${id}`, payload);
  return response.data.data;
};
