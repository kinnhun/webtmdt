export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'pending' | 'processing' | 'resolved' | 'cancelled';
  category: 'consulting' | 'support' | 'complaint' | 'cooperation' | 'quotation' | 'other';
  source: string;
  interestedProduct?: string | {
    _id: string;
    id?: string;
    name: string;
    code: string;
    slug: string;
    image?: string;
  };
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateInquiryPayload {
  status?: Inquiry['status'];
  category?: Inquiry['category'];
  interestedProduct?: string;
  internalNotes?: string;
}
