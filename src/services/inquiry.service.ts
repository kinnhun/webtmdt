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

// --- Settings (Admin) ---
export const getInquirySettings = async () => {
  const response = await httpClient.get("/admin/inquiries/settings");
  return response.data;
};

export const createInquirySetting = async (payload: any) => {
  const response = await httpClient.post("/admin/inquiries/settings", payload);
  return response.data;
};

export const updateInquirySetting = async (id: string, payload: any) => {
  const response = await httpClient.put(`/admin/inquiries/settings/${id}`, payload);
  return response.data;
};

export const deleteInquirySetting = async (id: string) => {
  const response = await httpClient.delete(`/admin/inquiries/settings/${id}`);
  return response.data;
};
