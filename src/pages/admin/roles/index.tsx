import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Typography, Modal, Form, Input, Tag, Checkbox, message, Space, Popconfirm } from 'antd';
import { SafetyCertificateOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminLayout from '@/components/layout/AdminLayout';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const { Title } = Typography;

const AVAILABLE_PERMISSIONS = [
  { label: 'All Permissions (Super Admin)', value: 'system.all' },
  { label: 'View Products', value: 'product.view' },
  { label: 'Manage Products', value: 'product.manage' },
  { label: 'View Inquiries', value: 'inquiry.view' },
  { label: 'Manage Inquiries', value: 'inquiry.manage' },
  { label: 'View Staff & Roles', value: 'staff.view' },
  { label: 'Manage Staff & Roles', value: 'staff.manage' },
  { label: 'Manage Settings', value: 'setting.manage' },
];

export default function RolesManagement() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [form] = Form.useForm();

  const { hasPermission } = useAdminAuth();
  const canManage = hasPermission('staff.manage');

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/roles');
      const data = await res.json();
      if (data.success) {
        setRoles(data.data);
      }
    } catch (error) {
      message.error('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleOpenModal = (role?: any) => {
    if (role) {
      setEditingRole(role);
      form.setFieldsValue(role);
    } else {
      setEditingRole(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSaveRole = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const url = editingRole ? `/api/admin/roles/${editingRole._id}` : '/api/admin/roles';
      const method = editingRole ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        message.success(editingRole ? 'Role updated' : 'Role created');
        setIsModalOpen(false);
        fetchRoles();
      } else {
        message.error(data.error || 'Operation failed');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/roles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        message.success('Role deleted');
        fetchRoles();
      } else {
        message.error(data.error || 'Failed to delete role');
      }
    } catch (error) {
      message.error('System error');
    }
  };

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <span className="font-semibold text-navy-deep">
          {text} {record.slug === 'super_admin' && <Tag color="red" className="ml-2">System</Tag>}
        </span>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (perms: string[]) => (
        <div className="flex flex-wrap gap-1">
          {perms.slice(0, 3).map(p => <Tag color="blue" key={p}>{p}</Tag>)}
          {perms.length > 3 && <Tag color="default">+{perms.length - 3} more</Tag>}
        </div>
      ),
    },
  ];

  if (canManage) {
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined className="text-orange" />} 
            onClick={() => handleOpenModal(record)} 
            disabled={record.slug === 'super_admin'}
          />
          <Popconfirm
            title="Delete this role?"
            onConfirm={() => handleDeleteRole(record._id)}
            disabled={record.slug === 'super_admin'}
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              disabled={record.slug === 'super_admin'}
            />
          </Popconfirm>
        </Space>
      ),
    } as any);
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title level={3} className="m-0 font-display flex items-center gap-2">
            <SafetyCertificateOutlined className="text-orange" />
            Roles & Permissions
          </Title>
          <p className="text-gray-500 mt-1">Manage what your staff can view or modify on the system.</p>
        </div>
        {canManage && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            className="bg-navy-deep hover:bg-navy"
            onClick={() => handleOpenModal()}
          >
            Create Role
          </Button>
        )}
      </div>

      <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden">
        <Table 
          columns={columns} 
          dataSource={roles} 
          rowKey="_id" 
          loading={loading}
          pagination={false}
        />
      </Card>

      <Modal
        title={editingRole ? 'Edit Role' : 'Create New Role'}
        open={isModalOpen}
        onOk={handleSaveRole}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
        width={600}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="name" label="Role Name" rules={[{ required: true }]}>
              <Input placeholder="e.g. Content Editor" />
            </Form.Item>
            <Form.Item name="slug" label="Role Slug (Identifier)" rules={[{ required: true }]}>
              <Input placeholder="e.g. content_editor" disabled={!!editingRole} />
            </Form.Item>
          </div>
          <Form.Item name="permissions" label="System Permissions">
            <Checkbox.Group className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {AVAILABLE_PERMISSIONS.map(p => (
                  <div key={p.value}>
                    <Checkbox value={p.value} className="text-sm font-medium text-gray-700">
                      {p.label}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
}
