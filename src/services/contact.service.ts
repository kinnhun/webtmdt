import httpClient from "@/lib/http/client";
import type { ContactFormData } from "@/domains/contact/contact.types";

export async function submitInquiry(data: ContactFormData): Promise<{ success: boolean }> {
  const { data: result } = await httpClient.post<{ success: boolean }>("/contact", data);
  return result;
}
