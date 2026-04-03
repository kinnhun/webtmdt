import React, { useEffect, useState } from 'react';
import { Card, Tabs, Form, Input, Button, message, Timeline, Empty, Typography, Row, Col, Progress, Tag, Spin } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  DashboardOutlined, 
  ClockCircleOutlined,
  InboxOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  FireOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { useProfileData, useUpdateName, useUpdatePassword } from '@/domains/profile';
import { format } from 'date-fns';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

export default function ProfileManagement() {
  const { t } = useTranslation();
  
  function formatMinutes(minutes: number): string {
    if (minutes === 0) return 'N/A';
    if (minutes < 60) return `${minutes} ${t('admin.profile.time.minutes', 'phút')}`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h < 24) return m > 0 ? `${h}${t('admin.profile.time.h', 'h')} ${m}${t('admin.profile.time.m', 'm')}` : `${h} ${t('admin.profile.time.hours', 'giờ')}`;
    const d = Math.floor(h / 24);
    const rh = h % 24;
    return rh > 0 ? `${d}${t('admin.profile.time.d', 'd')} ${rh}${t('admin.profile.time.h', 'h')}` : `${d} ${t('admin.profile.time.days', 'ngày')}`;
  }

  function getActionLabel(action: string): { text: string; color: string } {
    const map: Record<string, { text: string; color: string }> = {
      created: { text: t('admin.profile.action.created', 'Tạo mới'), color: '#1890ff' },
      assigned: { text: t('admin.profile.action.assigned', 'Được giao'), color: '#722ed1' },
      accepted: { text: t('admin.profile.action.accepted', 'Đã nhận'), color: '#52c41a' },
      rejected: { text: t('admin.profile.action.rejected', 'Từ chối'), color: '#ff4d4f' },
      status_changed: { text: t('admin.profile.action.status_changed', 'Đổi trạng thái'), color: '#fa8c16' },
      note_updated: { text: t('admin.profile.action.note_updated', 'Ghi chú'), color: '#8c8c8c' },
      resolved: { text: t('admin.profile.action.resolved', 'Hoàn tất'), color: '#52c41a' },
      closed: { text: t('admin.profile.action.closed', 'Đã đóng'), color: '#595959' },
    };
    return map[action] || { text: action, color: '#8c8c8c' };
  }

  const { data: profilePayload, isLoading } = useProfileData();
  const updateNameMutation = useUpdateName();
  const updatePasswordMutation = useUpdatePassword();
  
  const [nameForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user: authedUser } = useAdminAuth();

  useEffect(() => {
    if (profilePayload?.data?.user) {
      nameForm.setFieldsValue({
        name: profilePayload.data.user.name,
        username: profilePayload.data.user.username,
        role: profilePayload.data.user.roleId?.name || 'Staff'
      });
    }
  }, [profilePayload, nameForm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" description={t('admin.profile.loading', 'Đang tải hồ sơ...')} />
      </div>
    );
  }

  const payload = profilePayload?.data;
  if (!payload) return <Empty description={t('admin.profile.errorLoad', 'Không tải được dữ liệu hồ sơ')} />;

  const { user, metrics, recentActivity } = payload;

  const handleUpdateName = (values: { name: string }) => {
    updateNameMutation.mutate(values.name, {
      onSuccess: () => {
        message.success(t('admin.profile.successUpdateName', 'Cập nhật tên thành công'));
        setTimeout(() => window.location.reload(), 1000);
      },
      onError: (err: any) => {
        message.error(err.message || t('admin.profile.errorUpdateName', 'Cập nhật thất bại'));
      }
    });
  };

  const handleUpdatePassword = (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error(t('admin.profile.errorPasswordMatch', 'Mật khẩu xác nhận không khớp'));
      return;
    }

    updatePasswordMutation.mutate({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    }, {
      onSuccess: () => {
        message.success(t('admin.profile.successUpdatePassword', 'Đổi mật khẩu thành công'));
        passwordForm.resetFields();
      },
      onError: (err: any) => {
        message.error(err.message || t('admin.profile.errorUpdatePassword', 'Đổi mật khẩu thất bại'));
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto font-body space-y-6">
      {/* Header Profile Summary */}
      <div className="flex items-center justify-between bg-navy-deep text-white p-6 md:p-8 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
        
        <div className="flex items-center gap-6 relative z-10 w-full">
          <div className="w-24 h-24 rounded-full bg-orange flex items-center justify-center text-4xl font-display font-bold text-white uppercase shadow-lg border-4 border-white/20">
            {user.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-display font-bold m-0 mb-1">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-white font-medium">
                <SafetyCertificateOutlined /> {user.roleId?.name || 'Staff'}
              </span>
              <span className="flex items-center gap-1 opacity-80">
                <UserOutlined /> {user.username}
              </span>
              <span className="flex items-center gap-1 opacity-80">
                {t('admin.profile.performance', 'Hiệu suất')}: <strong className="text-green-400">{metrics.completionRate}%</strong> {t('admin.profile.completed', 'hoàn tất')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <Card variant="borderless" className="shadow-sm" styles={{ body: { padding: '24px 32px' } }}>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          size="middle"
          items={[
            {
              key: 'dashboard',
              label: <span className="font-medium text-[15px]"><DashboardOutlined /> {t('admin.profile.dashboardTab', 'Tổng quan cá nhân')}</span>,
              children: (
                <div className="pt-6 animate-fade-in space-y-8">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50/50 p-4 border border-blue-100 rounded-xl">
                      <div className="text-xs font-semibold text-blue-500 uppercase mb-1">{t('admin.profile.kpiAssigned', 'Được giao')}</div>
                      <div className="text-3xl font-display font-bold text-navy-deep">{metrics.assigned}</div>
                    </div>
                    <div className="bg-orange-50/50 p-4 border border-orange-100 rounded-xl">
                      <div className="text-xs font-semibold text-orange-500 uppercase mb-1">{t('admin.profile.kpiInProgress', 'Đang xử lý')}</div>
                      <div className="text-3xl font-display font-bold text-navy-deep">{metrics.inProgress}</div>
                    </div>
                    <div className="bg-green-50/50 p-4 border border-green-100 rounded-xl">
                      <div className="text-xs font-semibold text-green-500 uppercase mb-1">{t('admin.profile.kpiResolved', 'Hoàn tất')}</div>
                      <div className="text-3xl font-display font-bold text-navy-deep">{metrics.resolved}</div>
                    </div>
                    <div className="bg-red-50/50 p-4 border border-red-100 rounded-xl">
                      <div className="text-xs font-semibold text-red-500 uppercase mb-1">{t('admin.profile.kpiOverdue', 'Quá SLA')}</div>
                      <div className="text-3xl font-display font-bold text-navy-deep">{metrics.overdue}</div>
                    </div>
                  </div>

                  <Row gutter={24}>
                    <Col xs={24} md={10}>
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 h-full">
                        <h3 className="font-display font-semibold text-lg text-navy-deep mb-4 border-b pb-2">{t('admin.profile.qualityMetrics', 'Chỉ số chất lượng')}</h3>
                        <div className="space-y-5">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500 flex items-center gap-1"><ThunderboltOutlined /> {t('admin.profile.frt', 'Thời gian phản hồi đầu')} (FRT)</span>
                              <span className="font-bold text-navy-deep">{formatMinutes(metrics.avgFirstResponseMinutes)}</span>
                            </div>
                            <Progress percent={Math.min(100, metrics.avgFirstResponseMinutes > 0 ? Math.round((60 / metrics.avgFirstResponseMinutes) * 100) : 100)} showInfo={false} strokeColor="#1890ff" size="small" />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500 flex items-center gap-1"><CheckCircleOutlined /> {t('admin.profile.completionRate', 'Tỷ lệ hoàn tất')}</span>
                              <span className="font-bold text-green-600">{metrics.completionRate}%</span>
                            </div>
                            <Progress percent={metrics.completionRate} showInfo={false} strokeColor="#52c41a" size="small" />
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col xs={24} md={14}>
                      <h3 className="font-display font-semibold text-lg text-navy-deep mb-4 border-b pb-2">{t('admin.profile.recentActivity', 'Hoạt động gần đây của bạn')}</h3>
                      {recentActivity.length === 0 ? (
                        <Empty description={t('admin.profile.noActivity', 'Bạn chưa có hoạt động nào')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      ) : (
                        <div className="max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                          <Timeline 
                            items={recentActivity.map((a: any) => {
                              const { text, color } = getActionLabel(a.action);
                              return {
                                color,
                                content: (
                                  <div className="text-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Tag color={color} className="border-0 m-0 px-1.5 py-0 text-[10px]">{text}</Tag>
                                      {a.toValue && <span className="font-semibold text-navy-deep">{a.toValue}</span>}
                                      <span className="text-[11px] text-gray-400 font-mono ml-auto">
                                        {format(new Date(a.createdAt), 'dd/MM/yyyy HH:mm')}
                                      </span>
                                    </div>
                                    <div className="text-[11px] text-gray-500">
                                      {t('admin.profile.inquiryCode', 'Mã yêu cầu')}: <span className="font-mono text-gray-400">...{a.inquiryId.slice(-6)}</span>
                                      {a.customerName && a.customerName !== 'N/A' && ` - ${t('admin.profile.customer', 'Khách hàng')}: ${a.customerName}`}
                                    </div>
                                  </div>
                                )
                              };
                            })}
                          />
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              )
            },
            {
              key: 'settings',
              label: <span className="font-medium text-[15px]"><UserOutlined /> {t('admin.profile.settingsTab', 'Đổi thông tin')}</span>,
              children: (
                <div className="pt-6 animate-fade-in max-w-lg">
                  <h3 className="font-display font-semibold text-xl text-navy-deep mb-6">{t('admin.profile.personalInfo', 'Thông tin cá nhân')}</h3>
                  <Form form={nameForm} layout="vertical" onFinish={handleUpdateName}>
                    <Form.Item label={t('admin.profile.username', 'Tên đăng nhập')} name="username">
                      <Input size="large" disabled className="bg-gray-50 text-gray-500 font-mono" />
                    </Form.Item>
                    <Form.Item label={t('admin.profile.role', 'Chức vụ')} name="role">
                      <Input size="large" disabled className="bg-gray-50 text-gray-500 font-semibold" />
                    </Form.Item>
                    <Form.Item 
                      label={t('admin.profile.displayName', 'Tên hiển thị')} 
                      name="name" 
                      rules={[{ required: true, message: t('admin.profile.displayNameRequired', 'Vui lòng nhập tên hiển thị') }]}
                    >
                      <Input size="large" placeholder={t('admin.profile.displayNamePlaceholder', 'Nhập tên hiển thị của bạn')} />
                    </Form.Item>

                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      size="large" 
                      loading={updateNameMutation.isPending}
                      className="bg-navy hover:bg-navy-deep mt-2"
                    >
                      {t('admin.profile.saveChanges', 'Lưu thay đổi')}
                    </Button>
                  </Form>
                  
                  <div className="mt-8 p-4 bg-blue-50/50 rounded-lg text-sm text-blue-800 border border-blue-100 flex gap-3">
                    <UserOutlined className="text-lg text-blue-500" />
                    <div>
                      <p className="font-semibold mb-1">{t('admin.profile.usernameNoteTitle', 'Lưu ý về Tên đăng nhập')}</p>
                      <p className="m-0 text-blue-600/80">{t('admin.profile.usernameNoteDesc', 'Tên đăng nhập (username) là định danh duy nhất để đăng nhập hệ thống và không thể thay đổi để đảm bảo tính toàn vẹn bảo mật. Bạn chỉ có thể sửa đổi Tên hiển thị.')}</p>
                    </div>
                  </div>
                </div>
              )
            },
            {
              key: 'security',
              label: <span className="font-medium text-[15px]"><LockOutlined /> {t('admin.profile.securityTab', 'Đổi mật khẩu')}</span>,
              children: (
                <div className="pt-6 animate-fade-in max-w-lg">
                  <h3 className="font-display font-semibold text-xl text-navy-deep mb-6">{t('admin.profile.securityTitle', 'Bảo mật tài khoản')}</h3>
                  <Form form={passwordForm} layout="vertical" onFinish={handleUpdatePassword}>
                    <Form.Item 
                      label={t('admin.profile.oldPassword', 'Mật khẩu cũ')} 
                      name="oldPassword"
                      rules={[{ required: true, message: t('admin.profile.oldPasswordRequired', 'Vui lòng nhập mật khẩu cũ') }]}
                    >
                      <Input.Password size="large" placeholder={t('admin.profile.oldPasswordPlaceholder', 'Nhập mật khẩu hiện tại')} />
                    </Form.Item>

                    <Form.Item 
                      label={t('admin.profile.newPassword', 'Mật khẩu mới')} 
                      name="newPassword"
                      rules={[
                        { required: true, message: t('admin.profile.newPasswordRequired', 'Vui lòng nhập mật khẩu mới') },
                        { min: 6, message: t('admin.profile.newPasswordMin', 'Mật khẩu phải từ 6 ký tự') }
                      ]}
                    >
                      <Input.Password size="large" placeholder={t('admin.profile.newPasswordPlaceholder', 'Nhập mật khẩu mới')} />
                    </Form.Item>

                    <Form.Item 
                      label={t('admin.profile.confirmPassword', 'Xác nhận mật khẩu mới')} 
                      name="confirmPassword"
                      dependencies={['newPassword']}
                      rules={[
                        { required: true, message: t('admin.profile.confirmPasswordRequired', 'Vui lòng xác nhận mật khẩu mới') },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error(t('admin.profile.errorPasswordMatch', 'Mật khẩu xác nhận không khớp!')));
                          },
                        }),
                      ]}
                    >
                      <Input.Password size="large" placeholder={t('admin.profile.confirmPasswordPlaceholder', 'Nhập lại mật khẩu mới')} />
                    </Form.Item>

                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      size="large" 
                      loading={updatePasswordMutation.isPending}
                      className="bg-orange hover:bg-orange/90 mt-2 border-none"
                    >
                      {t('admin.profile.updatePasswordBtn', 'Cập nhật mật khẩu')}
                    </Button>
                  </Form>
                </div>
              )
            }
          ]}
        />
      </Card>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
