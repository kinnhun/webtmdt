import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import { CreateProductFeature } from '@/features/admin/components/product-management/CreateProductFeature';

export default function CreateProductPage() {
  return (
    <>
      <Head>
        <title>Create Product | Admin Dashboard</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <CreateProductFeature />
      </AdminLayout>
    </>
  );
}
