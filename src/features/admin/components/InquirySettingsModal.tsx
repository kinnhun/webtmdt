import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Table, Button, Space, Tag, Popconfirm, Form, Input, ColorPicker, message, InputNumber, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { 
  useInquirySettings, 
  useCreateInquirySetting, 
  useUpdateInquirySetting, 
  useDeleteInquirySetting,
  type InquirySetting
} from '@/domains/inquiry';

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd').replace(/Đ/g, 'd') // Handle Vietnamese d
    .replace(/[^a-z0-9]+/g, '_') // Replace non-alphanumeric with underscore
    .replace(/(^_|_$)+/g, ''); // Trim underscores
}

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function InquirySettingsModal({ open, onClose }: SettingsModalProps) {
  const { data: settings = [], isLoading } = useInquirySettings();
  const { mutate: createSetting, isPending: isCreating } = useCreateInquirySetting();
  const { mutate: updateSetting, isPending: isUpdating } = useUpdateInquirySetting();
  const { mutate: deleteSetting, isPending: isDeleting } = useDeleteInquirySetting();

  const [activeTab, setActiveTab] = useState<'category' | 'status'>('category');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  
  // Track if user manually edited key
  const [isKeyManuallyEdited, setIsKeyManuallyEdited] = useState(false);

  // Filter settings by current tab
  const tabSettings = settings.filter(s => s.type === activeTab).sort((a, b) => a.order - b.order);

  const columns = [
    { title: 'Label', dataIndex: 'label', key: 'label' },
    { title: 'Machine Key', dataIndex: 'key', key: 'key', render: (k: string) => <code className="text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-600">{k}</code> },
    ...(activeTab === 'status' ? [{
      title: 'Color', dataIndex: 'color', key: 'color',
      render: (color: string) => <Tag color={color}>{color || 'default'}</Tag>
    }] : []),
    { title: 'Order', dataIndex: 'order', key: 'order', width: 80 },
    {
      title: 'Status', dataIndex: 'isActive', key: 'isActive', width: 100,
      render: (isActive: boolean) => <Tag color={isActive ? 'green' : 'default'}>{isActive ? 'Active' : 'Hidden'}</Tag>
    },
    {
      title: 'Actions', key: 'actions', width: 120,
      render: (_: any, record: InquirySetting) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete setting?"
            description="Are you sure you want to delete this setting? Historical data using this key will remain unchanged."
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: InquirySetting) => {
    setEditingId(record._id);
    setIsKeyManuallyEdited(true); // Don't auto-update key when editing
    form.setFieldsValue({
      ...record,
      color: record.color || '#1677ff', // default fallback for color picker or input
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsKeyManuallyEdited(false);
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    deleteSetting(id, {
      onSuccess: () => message.success('Setting deleted successfully'),
      onError: (err: any) => message.error(err.response?.data?.error || 'Failed to delete setting')
    });
  };

  const handleFinish = (values: any) => {
    // Convert color obj to hex if using ColorPicker, else take string directly. 
    // We'll use a simple input for AntD standard colors or hex.
    const payload = {
      type: activeTab,
      ...values,
      color: typeof values.color === 'string' ? values.color : values.color?.toHexString(),
    };

    if (editingId) {
      updateSetting({ id: editingId, payload }, {
        onSuccess: () => {
          message.success('Setting updated successfully');
          handleCancel();
        },
        onError: (err: any) => message.error(err.response?.data?.error || 'Failed to update setting')
      });
    } else {
      createSetting(payload, {
        onSuccess: () => {
          message.success('Setting created successfully');
          handleCancel();
        },
        onError: (err: any) => message.error(err.response?.data?.error || 'Failed to create setting')
      });
    }
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      <div className="pt-2">
        <h2 className="text-xl font-display font-semibold mb-4 text-navy-deep">Inquiry Settings</h2>
        
        <Tabs 
          activeKey={activeTab} 
          onChange={(key) => { setActiveTab(key as any); handleCancel(); }}
          items={[
            { key: 'category', label: 'Categories' },
            { key: 'status', label: 'Statuses' },
          ]}
        />

        <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
          <h3 className="font-semibold mb-3">{editingId ? 'Edit Setting' : 'Add New Setting'}</h3>
          <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ isActive: true, order: 0 }}>
            <div className="flex gap-4">
              <Form.Item name="label" label="Display Label" rules={[{ required: true }]} className="flex-1">
                <Input 
                  placeholder="e.g., Complaint" 
                  onChange={(e) => {
                    if (!editingId && !isKeyManuallyEdited) {
                      form.setFieldValue('key', slugify(e.target.value));
                    }
                  }}
                />
              </Form.Item>
              <Form.Item 
                name="key" 
                label="Machine Key" 
                rules={[{ required: true, pattern: /^[a-z0-9_]+$/, message: 'Lowercase, numbers, and underscores only' }]} 
                className="flex-1"
                help={editingId ? "Cannot change key" : "Once set, usually shouldn't change"}
              >
                <Input 
                  placeholder="e.g., complaint" 
                  disabled={!!editingId} 
                  onChange={() => setIsKeyManuallyEdited(true)}
                />
              </Form.Item>
            </div>
            
            <div className="flex gap-4 items-center">
              {activeTab === 'status' && (
                <Form.Item name="color" label="Color (AntD or Hex)" className="w-40">
                  <Input placeholder="e.g., error, #f5222d" />
                </Form.Item>
              )}
              <Form.Item name="order" label="Sort Priority" className="w-24">
                <InputNumber min={0} className="w-full" />
              </Form.Item>
              <Form.Item name="isActive" label="Visibility" valuePropName="checked" className="ml-4">
                <Switch checkedChildren="Active" unCheckedChildren="Hidden" />
              </Form.Item>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button onClick={handleCancel}>Clear / Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isCreating || isUpdating}>
                {editingId ? 'Save Changes' : 'Add Setting'}
              </Button>
            </div>
          </Form>
        </div>

        <Table
          columns={columns}
          dataSource={tabSettings}
          rowKey="_id"
          pagination={false}
          loading={isLoading}
          size="middle"
          scroll={{ y: 300 }}
        />
      </div>
    </Modal>
  );
}
