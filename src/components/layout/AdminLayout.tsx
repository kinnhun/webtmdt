import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  InboxOutlined,
  TeamOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  GlobalOutlined,
  EditOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { user, loading, hasPermission } = useAdminAuth();

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
    (hasPermission('product.view') || hasPermission('product.manage')) ? {
      key: '/admin/products',
      icon: <ShoppingOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/products" className="font-body text-sm font-medium">{t('admin.menu.products', 'Products')}</Link>,
    } : null,
    (hasPermission('inquiry.view') || hasPermission('inquiry.manage')) ? {
      key: '/admin/inquiries',
      icon: <InboxOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/inquiries" className="font-body text-sm font-medium">{t('admin.menu.inquiries', 'Inquiries All')}</Link>,
    } : null,
    (hasPermission('inquiry.manage') && user?.role !== 'Admin') ? {
      key: '/admin/my-inquiries',
      icon: <InboxOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/my-inquiries" className="font-body text-sm font-medium">My Inquiries</Link>,
    } : null,
    (hasPermission('staff.view') || hasPermission('staff.manage')) ? {
      key: '/admin/users',
      icon: <TeamOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/users" className="font-body text-sm font-medium">{t('admin.menu.users', 'Staff Accounts')}</Link>,
    } : null,
    (hasPermission('staff.view') || hasPermission('staff.manage')) ? {
      key: '/admin/roles',
      icon: <SafetyCertificateOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/roles" className="font-body text-sm font-medium">{t('admin.menu.roles', 'Roles')}</Link>,
    } : null,
    hasPermission('system.all') ? {
      key: '/admin/about',
      icon: <FileTextOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/about" className="font-body text-sm font-medium">About Page</Link>,
    } : null,
    hasPermission('system.all') ? {
      key: '/admin/contact',
      icon: <PhoneOutlined className="text-[1.1rem]" />,
      label: <Link href="/admin/contact" className="font-body text-sm font-medium">Contact Page</Link>,
    } : null,
  ].filter(Boolean) as any[];

  const userMenu = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <span className="font-body text-sm">{t('admin.header.profile', 'Profile')}</span>,
        onClick: () => router.push('/admin/profile'),
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: <span className="font-body text-sm">{t('admin.header.logout', 'Logout')}</span>,
        danger: true,
        onClick: async () => {
          try {
            await fetch('/api/admin/auth/logout', { method: 'POST' });
          } finally {
            router.push('/admin/login');
          }
        },
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

  const routePermissions: Record<string, string[]> = {
    '/admin/products/create': ['product.manage'],
    '/admin/products/edit': ['product.manage'],
    '/admin/products': ['product.view', 'product.manage'],
    '/admin/my-inquiries': ['inquiry.manage'],
    '/admin/inquiries': ['inquiry.view', 'inquiry.manage'],
    '/admin/users': ['staff.view', 'staff.manage'],
    '/admin/roles': ['staff.view', 'staff.manage'],
    '/admin/settings': ['setting.manage'],
    '/admin/about': ['system.all'],
    '/admin/contact': ['system.all'],
  };

  const checkRouteAccess = () => {
    if (loading || !user) return true; // Let loading state bypass, or if no user (since we return null early)
    const currentPath = router.pathname;

    // Sort keys by length descending to match longest prefix first
    const sortedRoutes = Object.keys(routePermissions).sort((a, b) => b.length - a.length);
    const requiredPerms = sortedRoutes.find(route => currentPath.startsWith(route));

    if (!requiredPerms) return true; // Open routes like /admin

    const allowed = routePermissions[requiredPerms];
    return allowed.some(perm => hasPermission(perm));
  };

  if (!mounted || loading || !user) return null; // Avoid hydration mismatch, flicker, and unauthenticated layout flash

  const getSelectedKey = () => {
    // If we are deep inside products like /admin/products/create, hilight the main tab
    if (router.pathname.startsWith('/admin/products')) return '/admin/products';
    if (router.pathname.startsWith('/admin/inquiries')) return '/admin/inquiries';
    if (router.pathname.startsWith('/admin/users')) return '/admin/users';
    if (router.pathname.startsWith('/admin/roles')) return '/admin/roles';
    if (router.pathname.startsWith('/admin/settings')) return '/admin/settings';
    if (router.pathname.startsWith('/admin/about')) return '/admin/about';
    return router.pathname;
  };

  const getOpenKeys = () => {
    return [];
  };

  return (
    <Layout className="min-h-screen font-body" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={260}
        collapsedWidth={isMobile ? 0 : 80}
        className="shadow-sm z-50"
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
          setIsMobile(broken);
        }}
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
            selectedKeys={[getSelectedKey()]}
            defaultOpenKeys={getOpenKeys()}
            items={menuItems}
            className="border-none bg-transparent admin-custom-menu"
          />
        </div>
      </Sider>

      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity" 
          onClick={() => setCollapsed(true)} 
        />
      )}

      <Layout className="site-layout transition-all duration-300" style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 260) }}>
        <Header
          className="p-0 flex items-center justify-between sticky top-0 z-30 px-3 sm:px-6 bg-white"
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
              <div className="flex items-center gap-1 sm:gap-2 cursor-pointer text-sm font-medium px-2 sm:px-3 py-1.5 rounded-md hover:bg-black/5 transition-colors" style={{ color: "hsl(var(--navy)/0.65)" }}>
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
              <div className="flex items-center gap-3 cursor-pointer pl-1 sm:pl-2 pr-1 sm:pr-4 py-1.5 rounded-full hover:bg-black/5 transition-colors border border-transparent hover:border-black/5">
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: "hsl(var(--orange))" }} />
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="font-body font-semibold text-sm text-foreground">
                    {user?.name || t('admin.header.adminUser', 'Admin User')}
                  </span>
                  <span className="font-body text-[11px] font-medium" style={{ color: "hsl(var(--navy)/0.45)" }}>
                    {user?.role || 'Staff'}
                  </span>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="m-3 sm:m-6 bg-transparent">
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 md:p-8 min-h-[calc(100vh-160px)]" style={{ borderColor: "hsl(var(--navy)/0.06)" }}>
            {checkRouteAccess() ? (
              children
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-12">
                <div className="text-red-500 mb-4">
                  <SafetyCertificateOutlined className="text-6xl opacity-50" />
                </div>
                <h2 className="text-2xl font-display font-bold text-navy-deep">403 Forbidden</h2>
                <p className="text-gray-500 mt-2">
                  Bạn không có đủ thẩm quyền để truy cập phân hệ này.<br />
                  Vui lòng liên hệ quản trị viên cấp cao nếu cần cấp quyền.
                </p>
                <Link href="/admin">
                  <Button type="primary" className="mt-6 bg-navy-deep hover:bg-navy">Trở về Dashboard</Button>
                </Link>
              </div>
            )}
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
          .admin-custom-menu .ant-menu-submenu-title {
            border-radius: 8px;
            height: 48px;
            display: flex;
            align-items: center;
          }
          .admin-custom-menu .ant-menu-submenu-title:hover {
            background-color: hsl(var(--navy) / 0.04) !important;
          }
          .admin-custom-menu .ant-menu-sub.ant-menu-inline {
            background: transparent !important;
          }
          .admin-custom-menu .ant-menu-sub .ant-menu-item {
            height: 40px;
            padding-left: 48px !important;
          }
          .admin-custom-menu .ant-menu-submenu-selected > .ant-menu-submenu-title {
            color: hsl(var(--orange)) !important;
          }
          .admin-custom-menu .ant-menu-submenu-selected > .ant-menu-submenu-title .anticon {
            color: hsl(var(--orange)) !important;
          }
        `}</style>
      </Layout>
    </Layout>
  );
}
