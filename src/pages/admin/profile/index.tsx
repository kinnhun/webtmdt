import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import ProfileManagement from '@/features/admin/components/ProfileManagement';

export default function AdminProfilePage() {
  return (
    <>
      <Head>
        <title>Hồ sơ cá nhân | DHT Admin</title>
      </Head>
      <AdminLayout>
        <ProfileManagement />
      </AdminLayout>
    </>
  );
}
