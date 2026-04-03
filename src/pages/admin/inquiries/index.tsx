import Head from 'next/head';
import { useState } from 'react';
import { Tabs } from 'antd';
import { DashboardOutlined, UnorderedListOutlined } from '@ant-design/icons';
import AdminLayout from '@/components/layout/AdminLayout';
import InquiryDashboard from '@/features/admin/components/InquiryDashboard';
import InquiryManagement from '@/features/admin/components/InquiryManagement';

export default function InquiryManagementPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
      <Head>
        <title>Inquiries & Leads | DHT Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AdminLayout>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          className="inquiry-page-tabs"
          items={[
            {
              key: 'dashboard',
              label: (
                <span className="flex items-center gap-2 font-display font-medium">
                  <DashboardOutlined /> Dashboard
                </span>
              ),
              children: <InquiryDashboard />,
            },
            {
              key: 'list',
              label: (
                <span className="flex items-center gap-2 font-display font-medium">
                  <UnorderedListOutlined /> All Inquiries
                </span>
              ),
              children: <InquiryManagement />,
            },
          ]}
        />
        <style jsx global>{`
          .inquiry-page-tabs > .ant-tabs-nav {
            margin-bottom: 24px;
          }
          .inquiry-page-tabs .ant-tabs-tab {
            padding: 8px 4px;
          }
          .inquiry-page-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
            color: hsl(var(--orange)) !important;
          }
          .inquiry-page-tabs .ant-tabs-ink-bar {
            background: hsl(var(--orange)) !important;
          }
        `}</style>
      </AdminLayout>
    </>
  );
}
