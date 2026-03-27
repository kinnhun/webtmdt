import React from 'react';
import { Table, Button, Space, Tag, Badge, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PictureOutlined, GlobalOutlined } from '@ant-design/icons';
import type { Product } from '@/domains/product/product.types';
import Link from 'next/link';

interface ProductTableProps {
  data: (Product & { key: string })[];
  onEdit: (slugOrId: string) => void;
  onDelete: (slugOrId: string) => void;
  loading?: boolean;
}

export function ProductTable({ data, onEdit, onDelete, loading }: ProductTableProps) {
  const columns = [
    {
      title: 'Media',
      dataIndex: 'image',
      key: 'image',
      render: (img: string, record: Product) => (
        <div className="relative inline-block">
          <img src={img} alt={record.name} className="w-14 h-14 rounded object-cover border border-gray-100 shadow-sm" />
          {record.images && record.images.length > 1 && (
            <Badge count={record.images.length} className="absolute -top-2 -right-2" style={{ backgroundColor: '#1890ff' }} />
          )}
        </div>
      ),
      width: 80,
    },
    {
      title: 'Identification',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
      render: (text: string, record: Product) => (
        <div>
          <div className="font-semibold text-navy-deep text-sm flex items-center gap-2">
            {text}
            <div className="flex gap-1">
              {(record.nameVI || record.descriptionVI) && <Tag color="blue" className="text-[10px] leading-3 px-1 border-0 m-0">VN</Tag>}
              {(record.nameUS || record.descriptionUS) && <Tag color="orange" className="text-[10px] leading-3 px-1 border-0 m-0">US</Tag>}
            </div>
          </div>
          <div className="text-xs text-navy/60 font-mono mt-0.5">{record.code}</div>
        </div>
      ),
    },
    {
      title: 'Classification',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Sofa', value: 'Sofa' },
        { text: 'Dining', value: 'Dining' },
        { text: 'Lounge', value: 'Lounge' },
      ],
      onFilter: (value: any, record: Product) => record.category.includes(value),
      render: (_: any, record: Product) => (
        <div className="flex flex-col gap-1 items-start">
          <Tag color="cyan" className="m-0 border-0">{record.collection}</Tag>
          <span className="text-xs text-navy/70">{record.category}</span>
        </div>
      ),
    },
    {
      title: 'Specs & Material',
      dataIndex: 'material',
      key: 'material',
      render: (material: string, record: Product) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{material}</span>
          {record.moq && <span className="text-xs text-orange bg-orange/10 px-1.5 py-0.5 rounded-sm w-fit">MOQ: {record.moq}</span>}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="small">
          <Tooltip title="Edit Product">
            <Link href={`/admin/products/edit/${record.slug || record.id}`}>
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                className="text-blue-600 hover:bg-blue-50"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => onDelete(record.slug || record.id)} 
              className="hover:bg-red-50"
            />
          </Tooltip>
        </Space>
      ),
      width: 100,
      align: 'right' as const,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <Table 
        columns={columns} 
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.slug || record.id || record.code}
        scroll={{ x: 800 }}
        pagination={{ pageSize: 10, showSizeChanger: true }}
      />
    </div>
  );
}
