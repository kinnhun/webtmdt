import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import AboutEditor from '@/features/admin/components/AboutEditor';

export default function AdminAboutPage() {
  return (
    <>
      <Head>
        <title>About Page | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <AboutEditor />
      </AdminLayout>
    </>
  );
}
