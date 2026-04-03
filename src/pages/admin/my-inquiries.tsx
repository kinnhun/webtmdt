import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import MyInquiriesContainer from '@/features/admin/components/MyInquiriesContainer';

export default function MyInquiriesPage() {
  return (
    <>
      <Head>
        <title>My Inquiries - Administrative Dashboard</title>
      </Head>
      <AdminLayout>
        <MyInquiriesContainer />
      </AdminLayout>
    </>
  );
}
