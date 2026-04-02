import React from 'react';
import { Table, Button, Space, Tag, Badge, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PictureOutlined, GlobalOutlined } from '@ant-design/icons';
import type { Product } from '@/domains/product/product.types';
import { OUTDOOR_CATEGORIES, INDOOR_CATEGORIES } from '@/domains/product/product.types';
import Link from 'next/link';

interface ProductTableProps {
  data: (Product & { key: string })[];
  onEdit: (slugOrId: string) => void;
  onDelete: (slugOrId: string) => void;
  loading?: boolean;
  canManage?: boolean;
}

export function ProductTable({ data, onEdit, onDelete, loading, canManage = true }: ProductTableProps) {
  const columns = [
    {
      title: 'Media',
      dataIndex: 'image',
      key: 'image',
      render: (img: string, record: Product) => (
        <div className="relative inline-block">
          <img src={img} alt={record.name?.us || ''} className="w-14 h-14 rounded object-cover border border-gray-100 shadow-sm" />
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
      sorter: (a: Product, b: Product) => (a.name?.us || '').localeCompare(b.name?.us || ''),
      render: (_text: any, record: Product) => (
        <div>
          <div className="font-semibold text-navy-deep text-sm flex items-center gap-2">
            {record.name?.us || ''}
            <div className="flex gap-1">
              {(record.name?.vi) && <Tag color="blue" className="text-[10px] leading-3 px-1 border-0 m-0">VN</Tag>}
              {(record.name?.us) && <Tag color="orange" className="text-[10px] leading-3 px-1 border-0 m-0">US</Tag>}
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
        {
          text: 'Collection',
          value: 'group_collection',
          children: [
            { text: 'Indoor', value: 'COL##Indoor' },
            { text: 'Outdoor', value: 'COL##Outdoor' },
          ],
        },
        {
          text: 'Category',
          value: 'group_category',
          children: [...OUTDOOR_CATEGORIES, ...INDOOR_CATEGORIES].map(c => ({ text: c, value: `CAT##${c}` })),
        }
      ],
      onFilter: (value: React.Key | boolean, record: Product) => {
        const valStr = String(value);
        if (valStr.startsWith('COL##')) {
          const col = valStr.replace('COL##', '');
          const collectionsRaw = Array.isArray(record.collection) ? record.collection : String(record.collection || '').split(',').map(s => s.trim()).filter(Boolean);
          return collectionsRaw.includes(col);
        }
        if (valStr.startsWith('CAT##')) {
          const cat = valStr.replace('CAT##', '');
          const catArray = Array.isArray(record.category) ? record.category : [record.category];
          return catArray.some(c => (c?.us || '').includes(cat));
        }
        return false;
      },
      render: (_: unknown, record: Product) => {
        const collectionsRaw = Array.isArray(record.collection) ? record.collection : String(record.collection || '').split(',').map(s => s.trim()).filter(Boolean);
        const categories = Array.isArray(record.category) ? record.category : [record.category];
        return (
          <div className="flex flex-col gap-1 items-start">
            <div className="flex flex-wrap gap-1">
              {collectionsRaw.map((c, i) => <Tag key={i} color="cyan" className="m-0 border-0">{c}</Tag>)}
            </div>
            {categories.map((c, i) => {
              const str = c?.us || c || '';
              return (
                <Tooltip key={i} title={str} placement="topLeft">
                  <div className="text-xs text-navy/70 truncate max-w-[200px]">{str}</div>
                </Tooltip>
              );
            })}
          </div>
        )
      },
    },
    {
      title: 'Specs & Material',
      dataIndex: 'material',
      key: 'material',
      render: (_: unknown, record: Product) => {
        const mats = Array.isArray(record.material) ? record.material : [record.material];
        return (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">
              {mats.map(m => (typeof m === 'object' && m !== null) ? (m.us || '') : (typeof m === 'string' ? m : '')).filter(Boolean).join(', ')}
            </span>
            {record.moq && <span className="text-xs text-orange bg-orange/10 px-1.5 py-0.5 rounded-sm w-fit">MOQ: {record.moq}</span>}
          </div>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Product) => (
        <Space size="small">
          <Tooltip title="View Live">
            <Link href={`/catalogue/${record.slug}`} target="_blank">
              <Button 
                type="text" 
                icon={<GlobalOutlined />} 
                className="text-emerald-600 hover:bg-emerald-50"
              />
            </Link>
          </Tooltip>
          {canManage && (
            <>
              <Tooltip title="Edit Product">
                <Link href={`/admin/products/edit/${record.id || (record as any)._id || record.code || record.slug}`}>
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
                  onClick={() => onDelete(record.id || (record as any)._id || record.code || record.slug)} 
                  className="hover:bg-red-50"
                />
              </Tooltip>
            </>
          )}
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
