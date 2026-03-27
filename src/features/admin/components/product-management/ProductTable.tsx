import React from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Product } from '@/domains/product/product.types';

interface ProductTableProps {
  data: (Product & { key: string })[];
  onEdit: (slugOrId: string) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({ data, onEdit, onDelete }: ProductTableProps) {
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (img: string) => (
        <img src={img} alt="product" className="w-12 h-12 rounded object-cover border border-gray-100" />
      ),
      width: 80,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
      render: (text: string, record: Product) => (
        <div>
          <div className="font-semibold text-navy-deep">{text}</div>
          <div className="text-xs text-gray-400">{record.code}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Bedroom', value: 'Bedroom' },
        { text: 'Living Room', value: 'Living Room' },
        { text: 'Dining Room', value: 'Dining Room' },
        { text: 'Outdoor', value: 'Outdoor' },
      ],
      onFilter: (value: any, record: Product) => record.category === value,
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(record.slug || record.id)} 
            className="text-blue-500"
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(record.id)} 
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: 800 }}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}
