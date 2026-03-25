import React, { useState } from 'react';
import { Table, Button, Input, Space, Tag, Dropdown, Menu } from 'antd';
import { SearchOutlined, EyeOutlined, MoreOutlined, CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';

export default function OrderManagement() {
  const [searchText, setSearchText] = useState('');

  // Extended mock data for orders
  const ordersData = [
    { key: '1', orderId: '#ORD-001', customer: 'John Doe', email: 'john@example.com', date: '2025-10-15', total: '$1,299.00', items: 2, status: 'Delivered', payment: 'Paid' },
    { key: '2', orderId: '#ORD-002', customer: 'Jane Smith', email: 'jane@example.com', date: '2025-10-14', total: '$850.50', items: 1, status: 'Processing', payment: 'Paid' },
    { key: '3', orderId: '#ORD-003', customer: 'Bob Johnson', email: 'bob@example.com', date: '2025-10-14', total: '$2,100.00', items: 4, status: 'Shipped', payment: 'Paid' },
    { key: '4', orderId: '#ORD-004', customer: 'Alice Brown', email: 'alice@example.com', date: '2025-10-13', total: '$450.00', items: 1, status: 'Pending', payment: 'Unpaid' },
    { key: '5', orderId: '#ORD-005', customer: 'Charlie Wilson', email: 'charlie@example.com', date: '2025-10-12', total: '$3,400.00', items: 5, status: 'Delivered', payment: 'Paid' },
    { key: '6', orderId: '#ORD-006', customer: 'Diana Prince', email: 'diana@example.com', date: '2025-10-11', total: '$620.00', items: 2, status: 'Processing', payment: 'Paid' },
    { key: '7', orderId: '#ORD-007', customer: 'Bruce Wayne', email: 'bruce@example.com', date: '2025-10-10', total: '$12,500.00', items: 8, status: 'Shipped', payment: 'Paid' },
    { key: '8', orderId: '#ORD-008', customer: 'Clark Kent', email: 'clark@example.com', date: '2025-10-09', total: '$150.00', items: 1, status: 'Cancelled', payment: 'Refunded' },
  ];

  const filteredData = ordersData.filter(
    (item) => 
      item.customer.toLowerCase().includes(searchText.toLowerCase()) || 
      item.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const actionItems = [
    { key: '1', icon: <EyeOutlined />, label: 'View Details' },
    { key: '2', icon: <SyncOutlined />, label: 'Mark as Processing' },
    { key: '3', icon: <CheckCircleOutlined />, label: 'Mark as Shipped' },
  ];

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text: string) => <a className="text-orange font-semibold">{text}</a>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text: string, record: any) => (
        <div>
          <div className="font-semibold text-navy-deep">{text}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      align: 'center' as const,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    { 
      title: 'Payment', 
      key: 'payment', 
      dataIndex: 'payment',
      render: (payment: string) => {
        let color = payment === 'Paid' ? 'green' : payment === 'Unpaid' ? 'red' : 'default';
        return <Tag color={color} className="rounded-full px-2">{payment}</Tag>;
      }
    },
    { 
      title: 'Status', 
      key: 'status', 
      dataIndex: 'status',
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Processing', value: 'Processing' },
        { text: 'Shipped', value: 'Shipped' },
        { text: 'Delivered', value: 'Delivered' },
        { text: 'Cancelled', value: 'Cancelled' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: string) => {
        let color = status === 'Delivered' ? 'green' : status === 'Processing' ? 'blue' : status === 'Shipped' ? 'cyan' : status === 'Pending' ? 'orange' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} className="text-navy" />
          <Dropdown menu={{ items: actionItems }} trigger={['click']}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-display font-semibold text-2xl m-0 text-navy-deep">Orders</h2>
          <p className="text-sm text-gray-500 m-0">View and process customer orders</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
        <Input
          placeholder="Search by order ID, customer name or email..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="max-w-md"
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          scroll={{ x: 1000 }}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}
