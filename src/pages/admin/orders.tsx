import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import OrderManagement from '@/features/admin/components/OrderManagement';

export default function AdminOrdersPage() {
  return (
    <>
      <Head>
        <title>Orders | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <OrderManagement />
      </AdminLayout>
    </>
  );
}
