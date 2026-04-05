import Head from "next/head";
import AdminLayout from "@/components/layout/AdminLayout";
import ContactEditor from "@/features/admin/components/ContactEditor";

export default function AdminContactPage() {
  return (
    <>
      <Head>
        <title>Quản Lý Contact Page | Admin DHT</title>
      </Head>
      <AdminLayout>
        <ContactEditor />
      </AdminLayout>
    </>
  );
}
