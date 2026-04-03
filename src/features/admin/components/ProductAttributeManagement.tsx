import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, Table, Button, Input, Space, Tag, Modal, Form, message, Select, Badge, Spin, Empty, Tooltip, ColorPicker } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  ReloadOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  seedAttributes,
  type AttributeType,
  type ProductAttributeDTO,
} from '@/services/attribute.service';
import { translateText } from '@/utils/translator';

const { Option } = Select;

// ── Tab → attribute type mapping ────────────────────────────────
const TAB_CONFIG: { key: AttributeType; label: string }[] = [
  { key: 'category', label: 'Categories' },
  { key: 'material', label: 'Materials' },
  { key: 'moq', label: 'Min Order Qty (MOQ)' },
  { key: 'color', label: 'Colors' },
  { key: 'style', label: 'Styles' },
];

export default function ProductAttributeManagement() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<AttributeType>('category');
  const [searchText, setSearchText] = useState('');

  // Modals
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductAttributeDTO | null>(null);
  const [form] = Form.useForm();

  // ── Fetch all attributes ──────────────────────────────────────
  const { data: allAttributes, isLoading, isError } = useQuery({
    queryKey: ['product-attributes'],
    queryFn: () => getAttributes(),
    staleTime: 30_000,
  });

  // ── Group by type & filter by search ──────────────────────────
  const filteredData = useMemo(() => {
    const items = (allAttributes || []).filter((a) => a.type === activeTab);
    if (!searchText) return items;
    const q = searchText.toLowerCase();
    return items.filter((a) => 
      a.nameUS?.toLowerCase().includes(q) || 
      a.nameUK?.toLowerCase().includes(q) || 
      a.nameVI?.toLowerCase().includes(q)
    );
  }, [allAttributes, activeTab, searchText]);

  // ── Tab counts ────────────────────────────────────────────────
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    (allAttributes || []).forEach((a) => {
      counts[a.type] = (counts[a.type] || 0) + 1;
    });
    return counts;
  }, [allAttributes]);

  // ── Create mutation ───────────────────────────────────────────
  const createMut = useMutation({
    mutationFn: createAttribute,
    onSuccess: () => {
      message.success('Attribute created successfully');
      queryClient.invalidateQueries({ queryKey: ['product-attributes'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (err: any) => {
      const errMsg = err?.response?.data?.error || 'Failed to create attribute';
      message.error(errMsg);
    },
  });

  // ── Update mutation ───────────────────────────────────────────
  const updateMut = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      updateAttribute(id, payload),
    onSuccess: () => {
      message.success('Attribute updated successfully');
      queryClient.invalidateQueries({ queryKey: ['product-attributes'] });
      setModalVisible(false);
      form.resetFields();
      setEditingItem(null);
    },
    onError: (err: any) => {
      const errMsg = err?.response?.data?.error || 'Failed to update attribute';
      message.error(errMsg);
    },
  });

  // ── Delete mutation ───────────────────────────────────────────
  const deleteMut = useMutation({
    mutationFn: deleteAttribute,
    onSuccess: () => {
      message.success('Attribute deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['product-attributes'] });
    },
    onError: () => {
      message.error('Failed to delete attribute');
    },
  });

  // ── Seed mutation ─────────────────────────────────────────────
  const seedMut = useMutation({
    mutationFn: seedAttributes,
    onSuccess: (result) => {
      message.success(`Seed completed: ${result.upserted} new, ${result.matched} existing`);
      queryClient.invalidateQueries({ queryKey: ['product-attributes'] });
    },
    onError: () => {
      message.error('Failed to seed attributes');
    },
  });

  // ── Handlers ──────────────────────────────────────────────────
  const handleEdit = useCallback((record: ProductAttributeDTO) => {
    setEditingItem(record);
    form.setFieldsValue({
      nameUS: record.nameUS,
      nameUK: record.nameUK,
      nameVI: record.nameVI,
      collection: record.collection,
      colorHex: record.colorHex,
    });
    setModalVisible(true);
  }, [form]);

  const handleCreate = useCallback(() => {
    setEditingItem(null);
    form.resetFields();
    setModalVisible(true);
  }, [form]);

  const handleSave = useCallback(() => {
    form.validateFields().then((values) => {
      if (editingItem) {
        updateMut.mutate({ id: editingItem._id, payload: values });
      } else {
        createMut.mutate({ ...values, type: activeTab });
      }
    });
  }, [form, editingItem, activeTab, updateMut, createMut]);

  const handleDelete = useCallback((record: ProductAttributeDTO) => {
    Modal.confirm({
      title: 'Delete Attribute',
      content: `Are you sure you want to delete "${record.nameUS}"? Products using this attribute will lose the reference.`,
      okText: 'Delete',
      okType: 'danger',
      onOk: () => deleteMut.mutate(record._id),
    });
  }, [deleteMut]);

  // ── Color helper ──────────────────────────────────────────────
  const getColorDisplay = (hex: string | null, name: string) => {
    if (hex) return hex;
    const lower = name.toLowerCase();
    if (lower.includes('wood')) return '#8b5a2b';
    if (lower.includes('brown')) return '#8b4513';
    if (lower.includes('black')) return '#000000';
    if (lower.includes('white')) return '#ffffff';
    if (lower.includes('grey') || lower.includes('gray')) return '#808080';
    if (lower.includes('beige')) return '#f5f5dc';
    if (lower.includes('green')) return '#228b22';
    return '#cccccc';
  };

  // ── Table columns ─────────────────────────────────────────────
  const columns = [
    {
      title:
        (() => {
          const tabConf = TAB_CONFIG.find((t) => t.key === activeTab);
          const singular = tabConf ? tabConf.label.replace(/ies$/, 'y').replace(/s$/, '') : 'Attribute';
          return `${singular} Name (US)`;
        })(),
      dataIndex: 'nameUS',
      key: 'nameUS',
      render: (nameUS: string, record: ProductAttributeDTO) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            {activeTab === 'color' ? (
              <div
                className="w-6 h-6 rounded-full border border-gray-200 shadow-sm shrink-0"
                style={{ backgroundColor: getColorDisplay(record.colorHex, nameUS) }}
              />
            ) : (
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: 'hsl(var(--orange)/0.8)' }}
              >
                {nameUS?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-semibold text-sm" style={{ color: 'hsl(var(--navy-deep))' }}>
              <span className="mr-1.5 opacity-80" title="US English">🇺🇸</span>{nameUS}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Name (UK)',
      dataIndex: 'nameUK',
      key: 'nameUK',
      render: (nameUK: string | undefined) => (
        <span className="text-sm">
          {nameUK ? <><span className="mr-1.5 opacity-80" title="UK English">🇬🇧</span>{nameUK}</> : <span className="text-gray-300">—</span>}
        </span>
      ),
    },
    {
      title: 'Name (VI)',
      dataIndex: 'nameVI',
      key: 'nameVI',
      render: (nameVI: string | undefined) => (
        <span className="text-sm">
          {nameVI ? <><span className="mr-1.5 opacity-80" title="Vietnamese">🇻🇳</span>{nameVI}</> : <span className="text-gray-300">—</span>}
        </span>
      ),
    },
    ...(activeTab === 'category'
      ? [
          {
            title: 'Collection',
            dataIndex: 'collection',
            key: 'collection',
            render: (collection: string | null) =>
              collection ? (
                <Tag
                  color={collection === 'Outdoor' ? 'green' : 'blue'}
                  className="rounded-full px-3 py-0.5 border-0 font-medium"
                >
                  {collection === 'Outdoor' ? '🌿 ' : '🏠 '}
                  {collection}
                </Tag>
              ) : (
                <span className="text-gray-300">—</span>
              ),
          },
        ]
      : []),
    {
      title: 'Products Count',
      dataIndex: 'count',
      key: 'count',
      render: (count: number) => (
        <Badge
          count={count}
          showZero
          color="#f0f0f0"
          style={{ color: '#666', fontWeight: 600, boxShadow: 'none' }}
        />
      ),
      width: 150,
      sorter: (a: ProductAttributeDTO, b: ProductAttributeDTO) => a.count - b.count,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: ProductAttributeDTO) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="text-blue-500 hover:bg-blue-50"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            className="hover:bg-red-50"
          />
        </Space>
      ),
      width: 120,
    },
  ];

  // ── Empty state: show seed button ─────────────────────────────
  const isEmpty = !isLoading && (allAttributes || []).length === 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2
            className="font-display font-semibold text-2xl m-0 tracking-tight"
            style={{ color: 'hsl(var(--navy-deep))' }}
          >
            <SettingOutlined className="mr-2" style={{ color: 'hsl(var(--orange))' }} />
            Attributes &amp; Filters
          </h2>
          <p className="text-sm text-gray-500 m-0 mt-1">
            Manage global product categories, materials, colors, and formatting rules.
            <span className="ml-1 text-xs text-green-600 font-medium">
              <DatabaseOutlined className="mr-1" />
              Live from MongoDB
            </span>
          </p>
        </div>
        <Space>
          {isEmpty && (
            <Tooltip title="Seed initial data from constants">
              <Button
                icon={<DatabaseOutlined />}
                onClick={() => seedMut.mutate()}
                loading={seedMut.isPending}
                className="border-green-400 text-green-600 hover:bg-green-50"
              >
                Seed Data
              </Button>
            </Tooltip>
          )}
          <Tooltip title="Refresh">
            <Button
              icon={<ReloadOutlined />}
              onClick={() => queryClient.invalidateQueries({ queryKey: ['product-attributes'] })}
              className="border-gray-300"
            />
          </Tooltip>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            className="bg-orange hover:bg-orange/90 border-none shadow-md h-10 px-6 font-semibold"
            style={{ backgroundImage: 'linear-gradient(135deg, hsl(var(--orange)), #ea580c)' }}
          >
            Add {TAB_CONFIG.find((t) => t.key === activeTab)?.label.replace(/ies$/, 'y').replace(/s$/, '') || 'Item'}
          </Button>
        </Space>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        <Tabs
          activeKey={activeTab}
          onChange={(k) => {
            setActiveTab(k as AttributeType);
            setSearchText('');
          }}
          tabBarStyle={{ padding: '0 16px', marginBottom: 0 }}
          items={TAB_CONFIG.map((t) => ({
            key: t.key,
            label: (
              <span>
                {t.label}
                {tabCounts[t.key] != null && (
                  <Badge
                    count={tabCounts[t.key]}
                    showZero
                    className="ml-2"
                    style={{
                      backgroundColor: activeTab === t.key ? 'hsl(var(--orange))' : '#e5e7eb',
                      color: activeTab === t.key ? '#fff' : '#666',
                      fontSize: '11px',
                      boxShadow: 'none',
                    }}
                  />
                )}
              </span>
            ),
          }))}
        />

        <div className="p-4 sm:p-6 bg-gray-50/30">
          {/* Search */}
          <div className="mb-4 flex items-center justify-between">
            <Input
              placeholder={`Search ${TAB_CONFIG.find((t) => t.key === activeTab)?.label || ''}...`}
              prefix={<SearchOutlined className="text-gray-400" />}
              className="max-w-md rounded-lg"
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <span className="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">
              {filteredData.length} records
            </span>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Spin size="large" description="Loading attributes..." />
              </div>
            ) : isError ? (
              <div className="py-16 text-center">
                <Empty description="Failed to load attributes. Check MongoDB connection." />
                <Button
                  type="primary"
                  className="mt-4"
                  onClick={() => queryClient.invalidateQueries({ queryKey: ['product-attributes'] })}
                >
                  Retry
                </Button>
              </div>
            ) : isEmpty ? (
              <div className="py-16 text-center">
                <Empty description="No attributes found. Click 'Seed Data' to populate initial data." />
                <Button
                  type="primary"
                  icon={<DatabaseOutlined />}
                  className="mt-4"
                  onClick={() => seedMut.mutate()}
                  loading={seedMut.isPending}
                  style={{ backgroundImage: 'linear-gradient(135deg, hsl(var(--orange)), #ea580c)', border: 'none' }}
                >
                  Seed Initial Data
                </Button>
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="_id"
                pagination={{ pageSize: 10, hideOnSinglePage: true }}
                scroll={{ x: 600 }}
                rowClassName="hover:bg-orange/5 transition-colors cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        open={modalVisible}
        title={
          <span className="font-semibold">
            {editingItem ? 'Edit' : 'Create'}{' '}
            {TAB_CONFIG.find((t) => t.key === activeTab)?.label.replace(/ies$/, 'y').replace(/s$/, '') || 'Attribute'}
          </span>
        }
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingItem(null);
        }}
        onOk={handleSave}
        okText={editingItem ? 'Save Changes' : 'Create'}
        confirmLoading={createMut.isPending || updateMut.isPending}
        okButtonProps={{
          style: {
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            borderColor: 'transparent',
            fontWeight: 600,
          },
        }}
        destroyOnClose
      >
        <Form form={form} layout="vertical" className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Form.Item
              name="nameUS"
              label="Name (🇺🇸 US)"
              rules={[
                { required: true, message: 'Required' },
                { whitespace: true, message: 'Cannot be empty' },
              ]}
            >
              <Input placeholder="e.g. Dining Chairs" className="rounded-lg" />
            </Form.Item>
            <Form.Item name="nameUK" label="Name (🇬🇧 UK)">
              <Input placeholder="Optional" className="rounded-lg" />
            </Form.Item>
            <Form.Item name="nameVI" label="Name (🇻🇳 VI)">
              <Input placeholder="Optional" className="rounded-lg" />
            </Form.Item>
          </div>

          {activeTab === 'category' && (
            <Form.Item
              name="collection"
              label="Parent Collection"
              rules={[{ required: true, message: 'Please select a collection' }]}
            >
              <Select size="large" className="rounded-lg">
                <Option value="Outdoor">Outdoor Collection</Option>
                <Option value="Indoor">Indoor Collection</Option>
              </Select>
            </Form.Item>
          )}

          {activeTab === 'color' && (
            <Form.Item label="CSS Color Value (Hex)" help="e.g. #FF0000. Pick a color to auto-generate the name.">
              <Space>
                <Form.Item
                  name="colorHex"
                  noStyle
                  rules={[{ required: true, message: 'Please enter or pick a color' }]}
                >
                  <Input placeholder="#8b5a2b" size="large" className="rounded-lg w-32" />
                </Form.Item>
                
                <Form.Item shouldUpdate={(prev, curr) => prev.colorHex !== curr.colorHex} noStyle>
                  {({ getFieldValue }) => (
                    <ColorPicker
                      value={getFieldValue('colorHex') || '#1677ff'}
                      onChangeComplete={async (value) => {
                        const hex = value.toHexString();
                        form.setFieldsValue({ colorHex: hex });

                        try {
                          const res = await fetch(`https://www.thecolorapi.com/id?hex=${hex.substring(1)}`);
                          if (res.ok) {
                            const data = await res.json();
                            const colorName = data?.name?.value;
                            if (colorName) {
                              const nameVI = await translateText(colorName, "vi");
                              const nameUK = await translateText(colorName, "uk");

                              form.setFieldsValue({ 
                                nameUS: colorName,
                                nameUK: nameUK,
                                nameVI: nameVI
                              });
                            }
                          }
                        } catch (e) {
                          // Ignore API error
                        }
                      }}
                    />
                  )}
                </Form.Item>
              </Space>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}
