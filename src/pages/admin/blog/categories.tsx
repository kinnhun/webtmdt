import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import BlogCategoryManagement from '@/features/admin/components/BlogCategoryManagement';

export default function BlogCategoriesPage() {
  return (
    <>
      <Head>
        <title>Blog Categories | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <BlogCategoryManagement />
      </AdminLayout>
    </>
  );
}
