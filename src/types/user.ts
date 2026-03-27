export type UserRole = 'ADMIN' | 'MANAGER' | 'EDITOR' | 'USER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED' | 'PENDING';

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface UserProfile extends User {
  bio?: string;
  bioVI?: string;
  bioUS?: string;
  bioUK?: string;
  address?: string;
  addressVI?: string;
  addressUS?: string;
  addressUK?: string;
  company?: string;
  jobTitle?: string;
  jobTitleVI?: string;
  jobTitleUS?: string;
  jobTitleUK?: string;
}
