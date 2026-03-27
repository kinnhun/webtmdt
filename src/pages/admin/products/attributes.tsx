import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import ProductAttributeManagement from '@/features/admin/components/ProductAttributeManagement';

export default function ProductAttributesPage() {
  return (
    <>
      <Head>
        <title>Attributes & Filters | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <ProductAttributeManagement />
      </AdminLayout>
    </>
  );
}
