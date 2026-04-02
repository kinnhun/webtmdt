import React from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface CanAccessProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function CanAccess({ permission, children, fallback = null }: CanAccessProps) {
  const { loading, hasPermission } = useAdminAuth();

  // If still fetching session, return null to prevent screen flicker
  if (loading) return null;

  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
