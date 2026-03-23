import { useMutation } from "@tanstack/react-query";
import { submitInquiry } from "@/services/contact.service";
import type { ContactFormData } from "./contact.types";

export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: ContactFormData) => submitInquiry(data),
  });
}
