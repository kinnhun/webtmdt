import { Locale } from './i18n';

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  messageVI?: string;
  messageUS?: string;
  messageUK?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
