import * as inquiryService from "@/services/inquiry.service";
import type { Inquiry, UpdateInquiryPayload } from "./inquiry.types";

export const fetchInquiries = async (params?: { scope?: string }): Promise<Inquiry[]> => {
  return inquiryService.getInquiries(params);
};

export const editInquiry = async (id: string, payload: UpdateInquiryPayload): Promise<Inquiry> => {
  return inquiryService.updateInquiry(id, payload);
};

export const fetchSettings = async (): Promise<any[]> => inquiryService.getInquirySettings();
export const createSetting = async (payload: any): Promise<any> => inquiryService.createInquirySetting(payload);
export const updateSetting = async (id: string, payload: any): Promise<any> => inquiryService.updateInquirySetting(id, payload);
export const deleteSetting = async (id: string): Promise<any> => inquiryService.deleteInquirySetting(id);
