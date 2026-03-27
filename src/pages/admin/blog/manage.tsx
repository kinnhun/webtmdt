import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import BlogManagement from '@/features/admin/components/BlogManagement';

export default function BlogManagePage() {
  return (
    <>
      <Head>
        <title>Manage Blog Posts | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <BlogManagement />
      </AdminLayout>
    </>
  );
}
