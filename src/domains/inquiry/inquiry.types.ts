export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'pending' | 'replied' | 'quoted' | 'closed';
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
  interestedProduct?: string;
  internalNotes?: string;
}
