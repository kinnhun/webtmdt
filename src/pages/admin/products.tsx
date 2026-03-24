import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import ProductManagement from '@/features/admin/components/ProductManagement';

export default function AdminProductsPage() {
  return (
    <>
      <Head>
        <title>Products | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <ProductManagement />
      </AdminLayout>
    </>
  );
}
