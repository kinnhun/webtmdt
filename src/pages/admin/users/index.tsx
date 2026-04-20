import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Typography, Modal, Form, Input, Tag, Space, Popconfirm, Select, message } from 'antd';
import { TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import AdminLayout from '@/components/layout/AdminLayout';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const { Title } = Typography;

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form] = Form.useForm();

  const { hasPermission } = useAdminAuth();
  const canManage = hasPermission('staff.manage');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/admin/roles');
      const data = await res.json();
      if (data.success) {
        setRoles(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleOpenModal = (user?: any) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue({
        ...user,
        roleId: user.roleId ? user.roleId._id : undefined,
        password: '', // Blank empty for edit unless they want to change
      });
    } else {
      setEditingUser(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSaveUser = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const url = editingUser ? `/api/admin/users/${editingUser._id}` : '/api/admin/users';
      const method = editingUser ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        message.success(editingUser ? 'User updated' : 'User created');
        setIsModalOpen(false);
        fetchUsers();
      } else {
        message.error(data.error || 'Operation failed');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        message.success('User deleted');
        fetchUsers();
      } else {
        message.error(data.error || 'Failed to delete user');
      }
    } catch (error) {
      message.error('System error');
    }
  };

  const handleToggleLock = async (record: any) => {
    try {
      const newStatus = record.status === 'active' ? 'locked' : 'active';
      const res = await fetch(`/api/admin/users/${record._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        message.success(`User ${newStatus === 'locked' ? 'locked' : 'unlocked'}`);
        fetchUsers();
      } else {
        message.error(data.error || 'Failed to change status');
      }
    } catch (error) {
      message.error('System error');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div>
          <div className="font-semibold text-navy-deep">{text}</div>
          <div className="text-xs text-gray-500">@{record.username}</div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (role: any) => role ? <Tag color="blue">{role.name}</Tag> : <Tag color="default">None</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'} className="uppercase text-xs font-bold">
          {status}
        </Tag>
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
          />
          <Popconfirm
            title={`Are you sure you want to ${record.status === 'active' ? 'LOCK' : 'UNLOCK'} this user?`}
            onConfirm={() => handleToggleLock(record)}
            disabled={record.username === 'admin'}
          >
            <Button 
              type="text" 
              icon={record.status === 'active' ? <LockOutlined className="text-red-500" /> : <UnlockOutlined className="text-green-500" />} 
              disabled={record.username === 'admin'}
            />
          </Popconfirm>
          <Popconfirm
            title="Delete this user? This cannot be undone."
            onConfirm={() => handleDeleteUser(record._id)}
            disabled={record.username === 'admin'}
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              disabled={record.username === 'admin'}
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
            <TeamOutlined className="text-orange" />
            Staff Accounts
          </Title>
          <p className="text-gray-500 mt-1">Manage admin users and their access roles.</p>
        </div>
        {canManage && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            className="bg-navy-deep hover:bg-navy"
            onClick={() => handleOpenModal()}
          >
            Add Staff
          </Button>
        )}
      </div>

      <Card className="shadow-sm border-gray-100 rounded-xl overflow-hidden">
        <Table 
          columns={columns} 
          dataSource={users} 
          rowKey="_id" 
          loading={loading}
          pagination={false}
          scroll={{ x: 600 }}
        />
      </Card>

      <Modal
        title={editingUser ? 'Edit Staff Account' : 'Create New Staff'}
        open={isModalOpen}
        onOk={handleSaveUser}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
        width={500}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="e.g. John Doe" />
          </Form.Item>
          
          <Form.Item name="username" label="Username (Login ID)" rules={[{ required: true }]}>
            <Input placeholder="e.g. johndoe" disabled={!!editingUser} />
          </Form.Item>

          <Form.Item 
            name="password" 
            label={editingUser ? "Reset Password (Optional)" : "Password"} 
            rules={[{ required: !editingUser, message: 'Password is required for new users' }]}
            extra={editingUser && "Leave blank to keep current password"}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item name="roleId" label="Assign Role" rules={[{ required: true }]}>
            <Select placeholder="Select a role">
              {roles.map(r => (
                <Select.Option key={r._id} value={r._id}>{r.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
}
