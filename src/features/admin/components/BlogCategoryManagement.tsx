import React, { useState } from 'react';
import { Table, Button, Input, Space, Tag, Modal, Form, message, ColorPicker } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, FolderOutlined } from '@ant-design/icons';
import { postsData, blogCategories } from '@/data/posts';

interface CategoryRow {
  key: string;
  name: string;
  postCount: number;
  color: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Materials: '#f97316',
  Design: '#8b5cf6',
  Manufacturing: '#06b6d4',
  'Care Guide': '#22c55e',
  'Case Study': '#ec4899',
  Sustainability: '#eab308',
};

export default function BlogCategoryManagement() {
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryRow | null>(null);
  const [form] = Form.useForm();

  const categories = blogCategories.filter((c) => c !== 'All');

  const dataSource: CategoryRow[] = categories.map((cat) => ({
    key: cat,
    name: cat,
    postCount: postsData.filter((p) => p.category === cat).length,
    color: CATEGORY_COLORS[cat] || '#6b7280',
  }));

  const filteredData = dataSource.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (record: CategoryRow) => {
    setEditingCat(record);
    form.setFieldsValue({ name: record.name });
    setModalVisible(true);
  };

  const handleCreate = () => {
    setEditingCat(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingCat) {
        message.success(`Category "${values.name}" updated successfully (Demo)`);
      } else {
        message.success(`Category "${values.name}" created successfully (Demo)`);
      }
      setModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (name: string) => {
    Modal.confirm({
      title: 'Delete Category',
      content: `Are you sure you want to delete "${name}"? Posts in this category won't be deleted.`,
      okText: 'Delete',
      okType: 'danger',
      onOk: () => message.success(`Category "${name}" deleted successfully (Demo)`),
    });
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: CategoryRow) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: record.color }}>
            {name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'hsl(var(--navy-deep))' }}>{name}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Posts',
      dataIndex: 'postCount',
      key: 'postCount',
      render: (count: number) => (
        <Tag color={count > 0 ? 'blue' : 'default'} className="rounded-full text-xs px-3">
          {count} post{count !== 1 ? 's' : ''}
        </Tag>
      ),
      width: 120,
      sorter: (a: CategoryRow, b: CategoryRow) => a.postCount - b.postCount,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (color: string) => (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: color }} />
          <span className="text-xs text-gray-400 font-mono">{color}</span>
        </div>
      ),
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: CategoryRow) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} className="text-blue-500" />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.name)} />
        </Space>
      ),
      width: 120,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-display font-semibold text-2xl m-0" style={{ color: 'hsl(var(--navy-deep))' }}>
            <FolderOutlined className="mr-2" style={{ color: 'hsl(var(--orange))' }} />
            Blog Categories
          </h2>
          <p className="text-sm text-gray-500 m-0">Manage blog post categories and labels</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          className="bg-orange hover:bg-orange/90 border-none shadow-md h-10 px-6 font-semibold"
        >
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
        <Input
          placeholder="Search categories..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="max-w-md"
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="text-xs text-gray-400 font-body">{filteredData.length} categories</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          scroll={{ x: 500 }}
        />
      </div>

      {/* Create / Edit Modal */}
      <Modal
        open={modalVisible}
        title={editingCat ? 'Edit Category' : 'Create Category'}
        onCancel={() => { setModalVisible(false); form.resetFields(); }}
        onOk={handleSave}
        okText={editingCat ? 'Update' : 'Create'}
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #f97316, #ea580c)', borderColor: 'transparent' } }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please enter a category name' }]}>
            <Input placeholder="e.g. Design Tips" size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="description" label="Description (optional)">
            <Input.TextArea rows={3} placeholder="Brief description of this category..." className="rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
