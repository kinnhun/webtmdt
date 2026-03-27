import * as inquiryService from "@/services/inquiry.service";
import type { Inquiry, UpdateInquiryPayload } from "./inquiry.types";

export const fetchInquiries = async (): Promise<Inquiry[]> => {
  return inquiryService.getInquiries();
};

export const editInquiry = async (id: string, payload: UpdateInquiryPayload): Promise<Inquiry> => {
  return inquiryService.updateInquiry(id, payload);
};
