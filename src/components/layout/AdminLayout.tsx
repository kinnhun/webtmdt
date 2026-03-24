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
  LogoutOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link href="/admin">Dashboard</Link>,
    },
    {
      key: '/admin/products',
      icon: <ShoppingOutlined />,
      label: <Link href="/admin/products">Products</Link>,
    },
    {
      key: '/admin/orders',
      icon: <InboxOutlined />,
      label: <Link href="/admin/orders">Orders</Link>,
    },
    {
      key: '/admin/customers',
      icon: <TeamOutlined />,
      label: <Link href="/admin/customers">Customers</Link>,
    },
    {
      key: '/admin/blog',
      icon: <FileTextOutlined />,
      label: <Link href="/admin/blog">Blog Posts</Link>,
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: <Link href="/admin/settings">Settings</Link>,
    },
  ];

  const userMenu = {
    items: [
      {
        key: ' profile',
        icon: <UserOutlined />,
        label: 'Profile',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        danger: true,
        onClick: () => router.push('/'),
      },
    ],
  };

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        className="border-r border-gray-200"
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <Link href="/admin">
            <h1 className="font-display font-bold text-xl m-0 text-navy-deep whitespace-nowrap overflow-hidden">
              {collapsed ? 'DHT' : 'DHT Admin'}
            </h1>
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[router.pathname]}
          items={menuItems}
          className="py-4 border-none"
        />
      </Sider>
      <Layout>
        <Header className="p-0 flex items-center justify-between shadow-sm z-10 px-4" style={{ backgroundColor: '#ffffff' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg w-10 h-10"
          />
          <div className="flex items-center gap-4">
            <Dropdown menu={userMenu} placement="bottomRight" arrow>
              <div className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-50 transition-colors">
                <Avatar icon={<UserOutlined />} className="bg-orange" />
                <span className="font-body hidden sm:inline-block">Admin User</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="m-4 md:m-6 p-4 md:p-6 bg-white rounded-lg shadow-sm min-h-[280px]">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
