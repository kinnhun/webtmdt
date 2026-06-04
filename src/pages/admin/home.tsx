import Head from 'next/head';
import AdminLayout from '@/components/layout/AdminLayout';
import HomeEditor from '@/features/admin/components/HomeEditor';

export default function AdminHomePage() {
  return (
    <>
      <Head>
        <title>Home Page Settings | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <HomeEditor />
      </AdminLayout>
    </>
  );
}
