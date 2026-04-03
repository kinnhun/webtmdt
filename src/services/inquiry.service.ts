import httpClient from "@/lib/http/client";
import type { Inquiry, UpdateInquiryPayload, InquiryDashboardData } from "@/domains/inquiry/inquiry.types";

export const getInquiries = async (params?: { scope?: string }): Promise<Inquiry[]> => {
  const response = await httpClient.get<Inquiry[]>("/inquiries", { params });
  return response.data;
};

export const updateInquiry = async (id: string, payload: UpdateInquiryPayload): Promise<Inquiry> => {
  const response = await httpClient.patch<Inquiry>(`/inquiries/${id}`, payload);
  return response.data;
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

// --- Dashboard ---
export const getInquiryDashboard = async (): Promise<InquiryDashboardData> => {
  const response = await httpClient.get("/admin/inquiries/dashboard");
  return response.data.data;
};
