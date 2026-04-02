import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: string;
  permissions: string[];
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Only check if we are in admin namespace but not on the login page
    if (!router.pathname.startsWith('/admin') || router.pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
        } else {
          // If 401, redirect to login
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Failed to verify session');
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router.pathname]);

  const hasPermission = (permission: string) => {
    if (!user) return false;
    // Super admin has all permissions
    if (user.permissions.includes('system.all')) return true;
    
    // Exact match or wildcard (if we implement something like product.*)
    return user.permissions.includes(permission);
  };

  return { user, loading, hasPermission };
}
