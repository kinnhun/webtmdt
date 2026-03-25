import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import BlogForm from '@/features/admin/components/BlogForm';

export default function AdminBlogCreatePage() {
  return (
    <>
      <Head>
        <title>Create Blog Post | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <BlogForm />
      </AdminLayout>
    </>
  );
}
