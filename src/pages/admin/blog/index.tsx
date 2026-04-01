import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import BlogOverview from '@/features/admin/components/BlogOverview';

export default function AdminBlogIndex() {
  return (
    <>
      <Head>
        <title>Blog Overview | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <BlogOverview />
      </AdminLayout>
    </>
  );
}
