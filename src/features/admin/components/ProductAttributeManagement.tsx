import React, { useState } from 'react';
import { Tabs, Table, Button, Input, Space, Tag, Modal, Form, message, Select, Badge } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { CATEGORIES, OUTDOOR_CATEGORIES, INDOOR_CATEGORIES, MATERIALS, MOQ_OPTIONS, COLORS, STYLES } from '@/constants/product';

const { TabPane } = Tabs;
const { Option } = Select;

// -- Types --
interface AttributeRow {
  key: string;
  name: string;
  count: number;
  collection?: string; // For categories
  color?: string; // For colors
}

// -- Mock Initial Data --
const MOCK_DATA = {
  categories: CATEGORIES.map((cat, i) => ({
    key: `cat-${i}`,
    name: cat,
    count: Math.floor(Math.random() * 20) + 1,
    collection: OUTDOOR_CATEGORIES.includes(cat) ? 'Outdoor' : 'Indoor',
  })),
  materials: MATERIALS.map((mat, i) => ({ key: `mat-${i}`, name: mat, count: Math.floor(Math.random() * 15) })),
  moq: MOQ_OPTIONS.map((moq, i) => ({ key: `moq-${i}`, name: moq, count: Math.floor(Math.random() * 50) })),
  colors: COLORS.map((col, i) => ({ 
    key: `col-${i}`, 
    name: col, 
    count: Math.floor(Math.random() * 30),
    color: col.toLowerCase().includes('wood') ? '#8b5a2b' : col.toLowerCase()
  })),
  styles: STYLES.map((st, i) => ({ key: `st-${i}`, name: st, count: Math.floor(Math.random() * 10) })),
};

export default function ProductAttributeManagement() {
  const [activeTab, setActiveTab] = useState('categories');
  const [searchText, setSearchText] = useState('');
  
  // Modals
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<AttributeRow | null>(null);
  const [form] = Form.useForm();

  // Active data based on tab
  const getActiveData = (): AttributeRow[] => {
    switch (activeTab) {
      case 'categories': return MOCK_DATA.categories;
      case 'materials': return MOCK_DATA.materials;
      case 'moq': return MOCK_DATA.moq;
      case 'colors': return MOCK_DATA.colors;
      case 'styles': return MOCK_DATA.styles;
      default: return [];
    }
  };

  const filteredData = getActiveData().filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (record: AttributeRow) => {
    setEditingItem(record);
    form.setFieldsValue({ 
      name: record.name,
      collection: record.collection,
      color: record.color,
    });
    setModalVisible(true);
  };

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const action = editingItem ? 'updated' : 'created';
      message.success(`Item "${values.name}" ${action} successfully (Demo)`);
      setModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (name: string) => {
    Modal.confirm({
      title: 'Delete Attribute',
      content: `Are you sure you want to delete "${name}"? Products using this attribute will lose the reference.`,
      okText: 'Delete',
      okType: 'danger',
      onOk: () => message.success(`"${name}" deleted successfully (Demo)`),
    });
  };

  // Columns definition
  const columns = [
    {
      title: activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1) + ' Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: AttributeRow) => (
        <div className="flex items-center gap-3">
          {activeTab === 'colors' && record.color ? (
            <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: record.color }} />
          ) : (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: 'hsl(var(--orange)/0.8)' }}>
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-semibold text-sm" style={{ color: 'hsl(var(--navy-deep))' }}>{name}</span>
        </div>
      ),
    },
    ...(activeTab === 'categories' ? [{
      title: 'Collection',
      dataIndex: 'collection',
      key: 'collection',
      render: (collection: string) => (
        <Tag color={collection === 'Outdoor' ? 'green' : 'blue'} className="rounded-full px-3 py-0.5 border-0 font-medium">
          {collection === 'Outdoor' ? '🌿 ' : '🏠 '}{collection}
        </Tag>
      )
    }] : []),
    {
      title: 'Products Count',
      dataIndex: 'count',
      key: 'count',
      render: (count: number) => (
        <Badge count={count} showZero color="#f0f0f0" style={{ color: '#666', fontWeight: 600, boxShadow: 'none' }} />
      ),
      width: 150,
      sorter: (a: AttributeRow, b: AttributeRow) => a.count - b.count,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: AttributeRow) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} className="text-blue-500 hover:bg-blue-50" />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.name)} className="hover:bg-red-50" />
        </Space>
      ),
      width: 120,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="font-display font-semibold text-2xl m-0 tracking-tight" style={{ color: 'hsl(var(--navy-deep))' }}>
            <SettingOutlined className="mr-2" style={{ color: 'hsl(var(--orange))' }} />
            Attributes & Filters
          </h2>
          <p className="text-sm text-gray-500 m-0 mt-1">Manage global product categories, materials, colors, and formatting rules.</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          className="bg-orange hover:bg-orange/90 border-none shadow-md h-10 px-6 font-semibold"
          style={{ backgroundImage: 'linear-gradient(135deg, hsl(var(--orange)), #ea580c)' }}
        >
          Add {activeTab.slice(0, -1)}
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        <Tabs 
          activeKey={activeTab} 
          onChange={(k) => { setActiveTab(k); setSearchText(''); }}
          tabBarStyle={{ padding: '0 16px', marginBottom: 0 }}
          items={[
            { key: 'categories', label: 'Categories' },
            { key: 'materials', label: 'Materials' },
            { key: 'moq', label: 'Min Order Qty (MOQ)' },
            { key: 'colors', label: 'Colors' },
            { key: 'styles', label: 'Styles' },
          ]}
        />
        
        <div className="p-4 sm:p-6 bg-gray-50/30">
          {/* Search */}
          <div className="mb-4 flex items-center justify-between">
            <Input
              placeholder={`Search ${activeTab}...`}
              prefix={<SearchOutlined className="text-gray-400" />}
              className="max-w-md rounded-lg"
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span className="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">
              {filteredData.length} records
            </span>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 10, hideOnSinglePage: true }}
              scroll={{ x: 600 }}
              rowClassName="hover:bg-orange/5 transition-colors cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        open={modalVisible}
        title={<span className="font-semibold">{editingItem ? 'Edit' : 'Create'} {activeTab.slice(0, -1)}</span>}
        onCancel={() => { setModalVisible(false); form.resetFields(); }}
        onOk={handleSave}
        okText={editingItem ? 'Save Changes' : 'Create'}
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #f97316, #ea580c)', borderColor: 'transparent', fontWeight: 600 } }}
        destroyOnClose
      >
        <Form form={form} layout="vertical" className="mt-5">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
            <Input placeholder="e.g. Dining Chairs" size="large" className="rounded-lg" />
          </Form.Item>
          
          {activeTab === 'categories' && (
            <Form.Item name="collection" label="Parent Collection" rules={[{ required: true, message: 'Please select a collection' }]}>
              <Select size="large" className="rounded-lg">
                <Option value="Outdoor">Outdoor Collection</Option>
                <Option value="Indoor">Indoor Collection</Option>
              </Select>
            </Form.Item>
          )}

          {activeTab === 'colors' && (
            <Form.Item name="color" label="CSS Color Value (Hex/Name)" help="e.g. #FF0000 or red">
              <Input placeholder="#8b5a2b" size="large" className="rounded-lg" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}
