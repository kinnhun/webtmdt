import React, { useState } from 'react';
import { Table, Button, Input, Space, Tag, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { postsData } from '@/data/posts';

export default function BlogManagement() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const dataSource = postsData.map((p, idx) => ({ ...p, key: p.slug || idx }));

  const filteredData = dataSource.filter(
    (item) => 
      item.title.toLowerCase().includes(searchText.toLowerCase()) || 
      item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (slug: string) => {
    message.success(`Blog post ${slug} deleted successfully (Demo)`);
  };

  const columns = [
    {
      title: 'Cover Image',
      dataIndex: 'coverImage',
      key: 'coverImage',
      render: (img: string) => (
        <img src={img} alt="cover" className="w-16 h-10 rounded object-cover border border-gray-100" />
      ),
      width: 100,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div>
          <div className="font-semibold text-navy-deep">{text}</div>
          <div className="text-xs text-gray-400">/{record.slug}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="purple">{category}</Tag>,
      width: 150,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (author: any) => author?.name || 'Unknown',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => router.push(`/admin/blog/${record.slug}`)} 
            className="text-blue-500"
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.slug)} 
          />
        </Space>
      ),
      width: 120,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-display font-semibold text-2xl m-0 text-navy-deep">Blog Posts</h2>
          <p className="text-sm text-gray-500 m-0">Manage articles and content</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => router.push('/admin/blog/create')}
          className="bg-orange hover:bg-orange/90 border-none shadow-md h-10 px-6 font-semibold"
        >
          Create Post
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
        <Input
          placeholder="Search blog posts by title or category..."
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
          scroll={{ x: 800 }}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  );
}
