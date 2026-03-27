import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  InboxOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin" className="font-body text-sm font-medium">{t('admin.menu.dashboard', 'Dashboard')}</Link>,
    },
    {
      key: '/admin/products',
      icon: <ShoppingOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/products" className="font-body text-sm font-medium">{t('admin.menu.products', 'Products')}</Link>,
    },
    {
      key: '/admin/inquiries',
      icon: <InboxOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/inquiries" className="font-body text-sm font-medium">{t('admin.menu.inquiries', 'Inquiries')}</Link>,
    },
    {
      key: '/admin/customers',
      icon: <TeamOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/customers" className="font-body text-sm font-medium">{t('admin.menu.customers', 'Customers')}</Link>,
    },
    {
      key: '/admin/blog',
      icon: <FileTextOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/blog" className="font-body text-sm font-medium">{t('admin.menu.blog', 'Blog Posts')}</Link>,
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/settings" className="font-body text-sm font-medium">{t('admin.menu.settings', 'Settings')}</Link>,
    },
  ];

  const userMenu = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <span className="font-body text-sm">{t('admin.header.profile', 'Profile')}</span>,
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: <span className="font-body text-sm">{t('admin.header.logout', 'Logout')}</span>,
        danger: true,
        onClick: () => router.push('/'),
      },
    ],
  };

  const langMenu = {
    items: [
      { key: 'vi-VN', label: <span className="font-body text-sm">Vietnamese (VI)</span>, onClick: () => changeLanguage('vi-VN') },
      { key: 'en-US', label: <span className="font-body text-sm">English (US)</span>, onClick: () => changeLanguage('en-US') },
      { key: 'en-GB', label: <span className="font-body text-sm">English (UK)</span>, onClick: () => changeLanguage('en-GB') },
    ],
  };

  if (!mounted) return null;

  return (
    <Layout className="min-h-screen font-body" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        width={260}
        className="shadow-sm z-40"
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          borderRight: "1px solid hsl(var(--navy)/0.08)",
          background: "#ffffff"
        }}
      >
        <div className="h-20 flex items-center justify-center border-b" style={{ borderColor: "hsl(var(--navy)/0.06)" }}>
          <Link href="/admin">
            <h1 className="font-display font-bold m-0 tracking-tight transition-all duration-300" style={{ 
              color: "hsl(var(--navy-deep))", 
              fontSize: collapsed ? "1.5rem" : "1.75rem",
              letterSpacing: collapsed ? "0" : "-0.02em"
            }}>
              {collapsed ? 'D' : 'DHT Admin'}
              {!collapsed && <span style={{ color: "hsl(var(--orange))" }}>.</span>}
            </h1>
          </Link>
        </div>

        <div className="px-3 py-6">
          <Menu
            mode="inline"
            selectedKeys={[router.pathname]}
            items={menuItems}
            className="border-none bg-transparent admin-custom-menu"
          />
        </div>
      </Sider>

      <Layout className="site-layout transition-all duration-300" style={{ marginLeft: collapsed ? 80 : 260 }}>
        <Header 
          className="p-0 flex items-center justify-between sticky top-0 z-30 px-6 bg-white" 
          style={{ 
            height: "80px", 
            backgroundColor: "#ffffff",
            borderBottom: "1px solid hsl(var(--navy)/0.06)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
          }}
        >
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-black/5"
              style={{ color: "hsl(var(--navy)/0.65)" }}
            />
          </div>

          <div className="flex items-center gap-6">
            <Dropdown menu={langMenu} placement="bottomRight" trigger={['click']}>
              <div className="flex items-center gap-2 cursor-pointer text-sm font-medium px-3 py-1.5 rounded-md hover:bg-black/5 transition-colors" style={{ color: "hsl(var(--navy)/0.65)" }}>
                <GlobalOutlined className="text-lg" />
                <span className="hidden sm:inline-block font-body uppercase text-xs tracking-wider">
                  {i18n.language ? i18n.language.split('-')[0] : 'EN'}
                </span>
              </div>
            </Dropdown>

            <div className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-black/5 transition-colors" style={{ color: "hsl(var(--navy)/0.65)" }}>
              <BellOutlined className="text-[1.25rem]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border-2 border-white" style={{ backgroundColor: "hsl(var(--orange))" }}></span>
            </div>

            <div className="h-8 w-px bg-black/5 mx-1" />

            <Dropdown menu={userMenu} placement="bottomRight" trigger={['click']}>
              <div className="flex items-center gap-3 cursor-pointer pl-2 pr-4 py-1.5 rounded-full hover:bg-black/5 transition-colors border border-transparent hover:border-black/5">
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: "hsl(var(--orange))" }} />
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="font-body font-semibold text-sm text-foreground">{t('admin.header.adminUser', 'Admin User')}</span>
                  <span className="font-body text-[11px] font-medium" style={{ color: "hsl(var(--navy)/0.45)" }}>Master Admin</span>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="m-6 bg-transparent">
          <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 min-h-[calc(100vh-160px)]" style={{ borderColor: "hsl(var(--navy)/0.06)" }}>
            {children}
          </div>
        </Content>

        <style jsx global>{`
          .admin-custom-menu .ant-menu-item {
            border-radius: 8px;
            margin-bottom: 4px;
            height: 48px;
            display: flex;
            align-items: center;
          }
          .admin-custom-menu .ant-menu-item-selected {
            background-color: hsl(var(--orange) / 0.1) !important;
            color: hsl(var(--orange)) !important;
          }
          .admin-custom-menu .ant-menu-item-selected a {
            color: hsl(var(--orange)) !important;
            font-weight: 600;
          }
          .admin-custom-menu .ant-menu-item-selected .anticon {
            color: hsl(var(--orange)) !important;
          }
          .admin-custom-menu .ant-menu-item:hover:not(.ant-menu-item-selected) {
            background-color: hsl(var(--navy) / 0.04) !important;
            color: hsl(var(--navy-deep)) !important;
          }
          .admin-custom-menu .ant-menu-item:hover:not(.ant-menu-item-selected) a {
            color: hsl(var(--navy-deep)) !important;
          }
        `}</style>
      </Layout>
    </Layout>
  );
}
