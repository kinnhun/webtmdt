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
  firstResponseAt?: string;
  resolvedAt?: string;
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

// ===== Dashboard Types =====

export interface InquiryDashboardSummary {
  total: number;
  newToday: number;
  unassigned: number;
  waitingAccept: number;
  inProgress: number;
  resolved: number;
  overdue: number;
  cancelled: number;
}

export interface DashboardCategoryItem {
  key: string;
  label: string;
  count: number;
}

export interface DashboardStatusItem {
  key: string;
  label: string;
  color: string;
  count: number;
}

export interface DashboardDayItem {
  date: string;
  created: number;
  resolved: number;
}

export interface StaffPerformance {
  userId: string;
  name: string;
  role: string;
  assigned: number;
  accepted: number;
  inProgress: number;
  resolved: number;
  overdue: number;
  avgFirstResponseMinutes: number;
  avgAcceptMinutes: number;
  completionRate: number;
  currentLoad: number;
}

export interface CriticalCaseItem {
  _id: string;
  name: string;
  company?: string;
  subject: string;
  status: string;
  priority?: string;
  assignedTo?: string;
  createdAt?: string;
  assignedAt?: string;
  updatedAt?: string;
}

export interface CriticalCases {
  unassigned: CriticalCaseItem[];
  waitingAccept: CriticalCaseItem[];
  overdue: CriticalCaseItem[];
  stale: CriticalCaseItem[];
}

export interface InquiryActivityItem {
  _id: string;
  action: string;
  inquiryId: string;
  customerName: string;
  performedByName: string;
  fromValue?: string;
  toValue?: string;
  createdAt: string;
}

export interface DashboardRecentInquiry {
  _id: string;
  name: string;
  company?: string;
  subject: string;
  category: string;
  status: string;
  priority: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  firstResponseAt?: string;
}

export interface ResponseMetrics {
  avgFRTMinutes: number;
  avgHandlingMinutes: number;
  slaCompliance: number;
  totalWithResponse: number;
}

export interface InquiryDashboardData {
  summary: InquiryDashboardSummary;
  byCategory: DashboardCategoryItem[];
  byStatus: DashboardStatusItem[];
  byDay: DashboardDayItem[];
  staffPerformance: StaffPerformance[];
  criticalCases: CriticalCases;
  recentActivity: InquiryActivityItem[];
  recentInquiries: DashboardRecentInquiry[];
  responseMetrics: ResponseMetrics;
}
