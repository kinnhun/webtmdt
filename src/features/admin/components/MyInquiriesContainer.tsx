import React, { useState } from 'react';
import { Table, Button, Tag, Drawer, Typography, Row, Col, message, Tabs } from 'antd';
import { EyeOutlined, UserOutlined, ClockCircleOutlined, ShoppingOutlined, InboxOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { useInquiries, useUpdateInquiry, useInquirySettings, type Inquiry } from '@/domains/inquiry';

const { Title, Text, Paragraph } = Typography;

export default function MyInquiriesContainer() {
  // Fetch only inquiries assigned to me
  const { data: inquiries = [], isLoading } = useInquiries({ scope: 'my_assigned' });
  const { mutate: updateInquiry, isPending: isUpdating } = useUpdateInquiry();
  const { data: settings = [] } = useInquirySettings();

  const [activeTab, setActiveTab] = useState('assigned');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Helper maps for settings
  const categories = settings.filter((s: any) => s.type === 'category' && s.isActive).sort((a: any, b: any) => a.order - b.order);
  const statuses = settings.filter((s: any) => s.type === 'status' && s.isActive).sort((a: any, b: any) => a.order - b.order);
  
  const categoryMap = Object.fromEntries(categories.map((c: any) => [c.key, c.label]));
  const statusLabels = Object.fromEntries(statuses.map((s: any) => [s.key, s.label]));
  const statusColors = Object.fromEntries(statuses.map((s: any) => [s.key, s.color || 'default']));

  // Tab grouping
  const unacceptedInquiries = inquiries.filter(iq => iq.status === 'assigned');
  const activeInquiries = inquiries.filter(iq => iq.status === 'accepted' || iq.status === 'in_progress');
  const completedInquiries = inquiries.filter(iq => iq.status === 'resolved' || iq.status === 'closed' || iq.status === 'rejected');

  const getFilteredData = () => {
    switch (activeTab) {
      case 'assigned': return unacceptedInquiries;
      case 'active': return activeInquiries;
      case 'completed': return completedInquiries;
      default: return [];
    }
  };

  const handleView = (record: Inquiry) => {
    setSelectedInquiry(record);
    setDrawerVisible(true);
  };

  const handleAccept = (record: Inquiry, e?: React.MouseEvent) => {
    e?.stopPropagation();
    updateInquiry(
      { id: record._id, payload: { status: 'accepted' } },
      {
        onSuccess: () => {
          message.success(`Đã nhận chăm sóc liên hệ ${record._id.slice(-6)}`);
          if (drawerVisible && selectedInquiry?._id === record._id) {
            setSelectedInquiry(prev => prev ? { ...prev, status: 'accepted' } : null);
          }
        },
        onError: (err) => message.error(err.message || 'Lỗi khi nhận liên hệ')
      }
    );
  };

  const handleReject = (record: Inquiry, e?: React.MouseEvent) => {
    e?.stopPropagation();
    updateInquiry(
      { id: record._id, payload: { status: 'rejected' } },
      {
        onSuccess: () => {
          message.warning(`Đã từ chối liên hệ ${record._id.slice(-6)}`);
          setDrawerVisible(false);
        },
        onError: (err) => message.error(err.message || 'Lỗi khi từ chối')
      }
    );
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (!selectedInquiry) return;
    updateInquiry(
      { id: selectedInquiry._id, payload: { status: newStatus } },
      {
        onSuccess: () => {
          message.success(`Đã cập nhật trạng thái thành: ${statusLabels[newStatus] || newStatus}`);
          setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
        },
        onError: (err) => message.error(err.message || 'Lỗi khi cập nhật')
      }
    );
  };

  const columns = [
    {
      title: 'Date / ID',
      key: 'createdAt',
      render: (_: unknown, record: Inquiry) => (
        <div>
          <div className="font-semibold text-sm text-navy-deep">
            {record.createdAt ? format(new Date(record.createdAt), 'MMM dd, yyyy') : 'N/A'}
          </div>
          <div className="text-xs text-gray-400 font-mono mt-0.5 leading-tight">
            ...{record._id.slice(-6)}
          </div>
        </div>
      ),
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_: unknown, record: Inquiry) => (
        <div>
          <div className="font-semibold text-sm text-navy-deep">{record.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{record.company}</div>
        </div>
      ),
    },
    {
      title: 'Subject',
      key: 'subject',
      render: (_: unknown, record: Inquiry) => (
        <div>
          <div className="text-sm font-medium line-clamp-1">{record.subject}</div>
          <div className="text-xs text-blue-500 mt-0.5">{record.source}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      key: 'category',
      render: (_: unknown, record: Inquiry) => (
        <Tag color="geekblue" className="rounded-full px-2 py-0 border-0 font-medium">
          {categoryMap[record.category] || record.category || 'Khác'}
        </Tag>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: unknown, record: Inquiry) => (
        <Tag color={statusColors[record.status] || 'default'} className="rounded-full px-3 py-0.5 shadow-sm border-0 font-medium tracking-wide">
          {statusLabels[record.status] || record.status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Inquiry) => (
        <div className="flex gap-2">
          {record.status === 'assigned' && (
            <Button 
              type="primary" 
              size="small" 
              icon={<CheckCircleOutlined />} 
              onClick={(e) => handleAccept(record, e)}
              className="bg-green-600 hover:bg-green-500 border-none"
            >
              Nhận kết nối
            </Button>
          )}
          <Button 
            type="default" 
            size="small" 
            icon={<EyeOutlined />} 
            onClick={(e) => {
              e.stopPropagation();
              handleView(record);
            }}
          >
            Chi tiết
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display font-semibold text-2xl m-0 tracking-tight text-navy-deep">
          <InboxOutlined className="mr-2 text-orange" />
          My Inquiries
        </h2>
        <p className="text-sm text-gray-500 m-0 mt-1">Danh sách liên hệ khách hàng đang được giao cho bạn chăm sóc.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { 
              key: 'assigned', 
              label: `Chờ tiếp nhận (${unacceptedInquiries.length})`
            },
            { 
              key: 'active', 
              label: `Đang chăm sóc (${activeInquiries.length})`
            },
            { 
              key: 'completed', 
              label: `Đã hoàn tất (${completedInquiries.length})` 
            }
          ]}
        />

        <Table
          columns={columns}
          dataSource={getFilteredData()}
          rowKey="_id"
          loading={isLoading}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          scroll={{ x: 800 }}
          rowClassName="hover:bg-slate-50 transition-colors cursor-pointer"
          onRow={(record) => ({
            onClick: () => handleView(record),
          })}
        />
      </div>

      {/* Detail Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-lg" title={selectedInquiry?._id}>
              {selectedInquiry?._id.slice(-6)}
            </span>
            {selectedInquiry && (
              <Tag color={statusColors[selectedInquiry.status] || 'default'} className="m-0 rounded-full border-0">
                {statusLabels[selectedInquiry.status] || selectedInquiry.status}
              </Tag>
            )}
          </div>
        }
        placement="right"
        size="large"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        destroyOnClose
        styles={{ body: { backgroundColor: '#fafafb', padding: 0 } }}
      >
        {selectedInquiry && (
          <div className="flex flex-col h-full font-body">
            <div className="bg-white p-6 border-b border-gray-100 shadow-sm relative z-10">
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Text type="secondary" className="text-xs uppercase tracking-wider font-semibold block mb-1">Customer</Text>
                  <div className="flex items-center gap-2">
                    <UserOutlined className="text-gray-400" />
                    <span className="font-semibold text-base text-navy-deep">{selectedInquiry.name}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 pl-6">{selectedInquiry.company}</div>
                </Col>
                <Col span={12}>
                  <Text type="secondary" className="text-xs uppercase tracking-wider font-semibold block mb-1">Contact Details</Text>
                  <div className="text-sm mb-1"><a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">{selectedInquiry.email}</a></div>
                  <div className="text-sm font-mono text-gray-700">{selectedInquiry.phone}</div>
                </Col>
              </Row>
            </div>

            <div className="p-6 flex-1 overflow-auto">
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-6">
                <Text type="secondary" className="text-xs uppercase tracking-wider font-semibold block mb-3">Subject</Text>
                <div className="font-semibold text-lg mb-4 text-navy-deep">{selectedInquiry.subject}</div>
                
                <Text type="secondary" className="text-xs uppercase tracking-wider font-semibold block mb-2">Message</Text>
                <Paragraph className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap mb-0">
                  {selectedInquiry.message}
                </Paragraph>
              </div>

              {selectedInquiry.interestedProduct && typeof selectedInquiry.interestedProduct === 'object' && (
                <div className="bg-white p-5 rounded-xl border border-orange-100 shadow-sm mb-6 flex items-start gap-4">
                  {(selectedInquiry.interestedProduct as any).image && (
                    <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                      <img src={(selectedInquiry.interestedProduct as any).image} alt="Product" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Text type="secondary" className="text-[10px] uppercase tracking-wider font-bold text-orange mb-1 flex items-center gap-1">
                      <ShoppingOutlined /> Interested In
                    </Text>
                    <a 
                      href={`/catalogue/${(selectedInquiry.interestedProduct as any).slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-base text-gray-900 hover:text-orange block"
                    >
                      {typeof (selectedInquiry.interestedProduct as any).name === 'object' ? (selectedInquiry.interestedProduct as any).name.us : (selectedInquiry.interestedProduct as any).name}
                    </a>
                  </div>
                </div>
              )}

              {/* Actions Section */}
              <div className="bg-white p-5 rounded-xl border shadow-sm mt-6">
                <Title level={5} className="font-display m-0 mb-4 text-navy-deep">Hành động của bạn</Title>
                
                {selectedInquiry.status === 'assigned' && (
                  <div className="flex gap-3">
                    <Button type="primary" className="bg-green-600 border-none" size="large" onClick={() => handleAccept(selectedInquiry)}>
                      Nhận chăm sóc
                    </Button>
                    <Button danger size="large" onClick={() => handleReject(selectedInquiry)}>
                      Từ chối
                    </Button>
                  </div>
                )}

                {(selectedInquiry.status === 'accepted' || selectedInquiry.status === 'in_progress') && (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <Button onClick={() => handleUpdateStatus('in_progress')}>Đang xử lý</Button>
                      <Button onClick={() => handleUpdateStatus('resolved')} type="primary" className="bg-blue-600">Đã giải quyết xong</Button>
                      <Button onClick={() => handleUpdateStatus('closed')} danger>Đóng (hủy bỏ)</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
