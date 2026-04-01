import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import { EditProductFeature } from '@/features/admin/components/product-management/EditProductFeature';

export default function EditProductPage() {
  return (
    <>
      <Head>
        <title>Edit Product | Admin Dashboard</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <EditProductFeature />
      </AdminLayout>
    </>
  );
}
