export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: string;
  category: string;
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
  assignedTo?: { _id: string; name: string; username: string };
  assignedBy?: { _id: string; name: string; username: string };
  assignedAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  closedAt?: string;
  priority: "low" | "normal" | "high" | "urgent";
  lastActionBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateInquiryPayload {
  status?: string;
  category?: string;
  interestedProduct?: string;
  internalNotes?: string;
  assignedTo?: string | null;
  priority?: "low" | "normal" | "high" | "urgent";
}

export interface InquirySetting {
  _id: string;
  type: 'category' | 'status';
  key: string;
  label: string;
  color?: string;
  order: number;
  isActive: boolean;
}
