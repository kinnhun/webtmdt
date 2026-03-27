import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import InquiryManagement from '@/features/admin/components/InquiryManagement';

export default function InquiryManagementPage() {
  return (
    <>
      <Head>
        <title>Inquiries & Leads | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <InquiryManagement />
      </AdminLayout>
    </>
  );
}
