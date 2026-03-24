import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import DashboardContainer from '@/features/admin/components/DashboardContainer';

export default function AdminDashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <DashboardContainer />
      </AdminLayout>
    </>
  );
}
