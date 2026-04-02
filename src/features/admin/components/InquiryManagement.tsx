import React, { useState } from 'react';
import Link from 'next/link';
import { Table, Button, Input, Space, Tag, Drawer, Form, Select, Typography, Row, Col, message } from 'antd';
import { SearchOutlined, EyeOutlined, MailOutlined, InboxOutlined, UserOutlined, ClockCircleOutlined, InfoCircleOutlined, ShoppingOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { useInquiries, useUpdateInquiry, type Inquiry } from '@/domains/inquiry';
import { useProducts, emptyFilters } from '@/domains/product';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const STATUS_COLORS: Record<string, string> = {
  pending: 'processing',
  processing: 'warning',
  resolved: 'success',
  cancelled: 'default',
};

const CATEGORY_LABELS: Record<string, string> = {
  consulting: 'Tư vấn sản phẩm',
  support: 'Hỗ trợ kỹ thuật',
  complaint: 'Khiếu nại',
  cooperation: 'Hợp tác',
  quotation: 'Báo giá',
  other: 'Khác',
};

export default function InquiryManagement() {
  const { data: inquiries = [], isLoading } = useInquiries();
  const { mutate: updateInquiry, isPending: isUpdating } = useUpdateInquiry();
  const { data: productsData } = useProducts(emptyFilters, '');

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Drawer state
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [form] = Form.useForm();

  // Filtered data
  const filteredData = inquiries.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.company?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      item._id.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleView = (record: Inquiry) => {
    setSelectedInquiry(record);
    form.setFieldsValue({
      status: record.status,
      category: record.category,
      interestedProduct: record.interestedProduct && typeof record.interestedProduct === 'object' ? record.interestedProduct._id : record.interestedProduct,
      internalNotes: record.internalNotes,
    });
    setDrawerVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (selectedInquiry) {
        updateInquiry(
          { id: selectedInquiry._id, payload: values },
          {
            onSuccess: () => {
              message.success(`Inquiry ${selectedInquiry._id.slice(-6)} updated successfully.`);
              setDrawerVisible(false);
              setSelectedInquiry({ ...selectedInquiry, ...values });
            },
            onError: (err) => {
              message.error(err.message || 'Failed to update inquiry');
            }
          }
        );
      }
    });
  };

  const columns = [
    {
      title: 'Date / ID',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string, record: Inquiry) => (
        <div>
          <div className="font-semibold text-sm" style={{ color: 'hsl(var(--navy-deep))' }}>
            {date ? format(new Date(date), 'MMM dd, yyyy') : 'N/A'}
          </div>
          <div className="text-xs text-gray-400 font-mono mt-0.5 leading-tight" title={record._id}>
            ...{record._id.slice(-6)}
          </div>
        </div>
      ),
      sorter: (a: Inquiry, b: Inquiry) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      defaultSortOrder: 'descend' as const,
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_: unknown, record: Inquiry) => (
        <div>
          <div className="font-semibold text-sm" style={{ color: 'hsl(var(--navy-deep))' }}>{record.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{record.company}</div>
        </div>
      ),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject: string, record: Inquiry) => (
        <div>
          <div className="text-sm font-medium line-clamp-1">{subject}</div>
          <div className="flex items-center gap-2 mt-0.5 whitespace-nowrap overflow-hidden">
            <div className="text-xs text-blue-500 flex items-center gap-1 shrink-0">
              <InfoCircleOutlined /> {record.source}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Interested Product',
      key: 'interestedProduct',
      width: 200,
      render: (_: unknown, record: Inquiry) => {
        if (!record.interestedProduct) {
          return <span className="text-gray-400 text-xs italic">General Inquiry</span>;
        }
        
        if (typeof record.interestedProduct === 'object') {
          return (
            <div onClick={(e) => e.stopPropagation()}>
              <a 
                href={`/catalogue/${(record.interestedProduct as any).slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 hover:bg-orange-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-orange-100"
              >
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {record.interestedProduct.image ? (
                    <div className="w-8 h-8 rounded bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                      <img src={record.interestedProduct.image} alt={typeof (record.interestedProduct as any).name === 'object' ? (record.interestedProduct as any).name.us : (record.interestedProduct as any).name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center text-gray-400">
                      <ShoppingOutlined />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {typeof (record.interestedProduct as any).name === 'object' ? (record.interestedProduct as any).name.us : (record.interestedProduct as any).name}
                    </div>
                    <div className="text-[10px] text-gray-500 line-clamp-1 uppercase tracking-wider">
                      {(record.interestedProduct as any).code}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        }

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <a 
              href={`/catalogue/${record.interestedProduct}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Tag color="orange" className="border-0 m-0 rounded-full px-2 py-0 text-[10px] leading-tight flex items-center gap-1 shadow-sm w-fit hover:bg-orange-100 transition-colors cursor-pointer">
                <ShoppingOutlined /> Product Linked ({record.interestedProduct})
              </Tag>
            </a>
          </div>
        );
      }
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="geekblue" className="rounded-full px-2 py-0 border-0 font-medium">
          {CATEGORY_LABELS[category] || category || 'Khác'}
        </Tag>
      ),
      filters: Object.entries(CATEGORY_LABELS).map(([k, v]) => ({ text: v, value: k })),
      onFilter: (value: boolean | React.Key, record: Inquiry) => record.category === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={STATUS_COLORS[status] || 'default'} className="rounded-full px-3 py-0.5 capitalize shadow-sm border-0 font-medium tracking-wide">
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Processing', value: 'processing' },
        { text: 'Resolved', value: 'resolved' },
        { text: 'Cancelled', value: 'cancelled' },
      ],
      onFilter: (value: boolean | React.Key, record: Inquiry) => record.status === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Inquiry) => (
        <Button 
          type="text" 
          icon={<EyeOutlined />} 
          onClick={() => handleView(record)}
          className="text-blue-600 hover:bg-blue-50"
        >
          Review
        </Button>
      ),
      width: 100,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="font-display font-semibold text-2xl m-0 tracking-tight" style={{ color: 'hsl(var(--navy-deep))' }}>
            <InboxOutlined className="mr-2" style={{ color: 'hsl(var(--orange))' }} />
            Inquiries & Leads
          </h2>
          <p className="text-sm text-gray-500 m-0 mt-1">Manage wholesale inquiries, trade applications, and direct leads.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-black font-body">
        <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between gap-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <Input
              placeholder="Search by name, company, or ID..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="max-w-md rounded-lg"
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Select
              className="w-40"
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">All Statuses</Option>
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="resolved">Resolved</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
            <Select
              className="w-40"
              size="large"
              value={categoryFilter}
              onChange={setCategoryFilter}
            >
              <Option value="all">All Categories</Option>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                <Option key={k} value={k}>{v}</Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 font-medium bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
              {filteredData.length} records found
            </span>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredData}
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
              <Tag color={STATUS_COLORS[selectedInquiry.status]} className="capitalize m-0 rounded-full border-0">
                {selectedInquiry.status}
              </Tag>
            )}
          </div>
        }
        placement="right"
        size="large"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        destroyOnClose
        extra={
          <Button 
            type="primary" 
            onClick={handleSave} 
            loading={isUpdating}
            className="bg-orange hover:bg-orange/90 border-none font-semibold px-6 shadow-md rounded-lg"
          >
            Save Changes
          </Button>
        }
        styles={{ body: { backgroundColor: '#fafafb', padding: 0 } }}
      >
        {selectedInquiry && (
          <div className="flex flex-col h-full font-body">
            {/* Customer Overview */}
            <div className="bg-white p-6 border-b border-gray-100 shadow-sm relative z-10">
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Text type="secondary" className="text-xs uppercase tracking-wider font-semibold block mb-1">Customer</Text>
                  <div className="flex items-center gap-2">
                    <UserOutlined className="text-gray-400" />
                    <span className="font-semibold text-base" style={{ color: 'hsl(var(--navy-deep))' }}>{selectedInquiry.name}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 pl-6">{selectedInquiry.company}</div>
                </Col>
                <Col span={12}>
                  <Text type="secondary" className="text-xs uppercase tracking-wider font-semibold block mb-1">Contact Details</Text>
                  <div className="text-sm mb-1"><a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">{selectedInquiry.email}</a></div>
                  <div className="text-sm font-mono text-gray-700">{selectedInquiry.phone}</div>
                </Col>
              </Row>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                <span>Received: {selectedInquiry.createdAt ? format(new Date(selectedInquiry.createdAt), 'PPpp') : 'N/A'}</span>
                <span>Source: <span className="font-medium text-gray-700">{selectedInquiry.source || 'Website Contact Form'}</span></span>
              </div>
            </div>

            {/* Message Body */}
            <div className="p-6 flex-1 overflow-auto">
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-6">
                <Text type="secondary" className="text-xs uppercase tracking-wider font-semibold block mb-3">Subject</Text>
                <div className="font-semibold text-lg mb-4" style={{ color: 'hsl(var(--navy-deep))' }}>{selectedInquiry.subject}</div>
                
                <Text type="secondary" className="text-xs uppercase tracking-wider font-semibold block mb-2">Message</Text>
                <Paragraph className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap mb-0">
                  {selectedInquiry.message}
                </Paragraph>
              </div>

              {selectedInquiry.interestedProduct && typeof selectedInquiry.interestedProduct === 'object' ? (
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
                    <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{(selectedInquiry.interestedProduct as any).code}</div>
                  </div>
                </div>
              ) : selectedInquiry.interestedProduct ? (
                <div className="bg-white p-5 rounded-xl border border-orange-100 shadow-sm mb-6 flex items-start gap-4">
                  <div className="flex-1">
                    <Text type="secondary" className="text-[10px] uppercase tracking-wider font-bold text-orange mb-1 flex items-center gap-1">
                      <ShoppingOutlined /> Product Linked
                    </Text>
                    <a 
                      href={`/catalogue/${selectedInquiry.interestedProduct}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-base text-gray-900 hover:text-orange block"
                    >
                      {selectedInquiry.interestedProduct}
                    </a>
                    <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Details unavailable</div>
                  </div>
                </div>
              ) : null}

              {/* Admin Actions Form */}
              <div className="bg-white p-5 rounded-xl border border-indigo-50 shadow-sm border-l-4 border-l-indigo-500">
                <Title level={5} className="font-display m-0 mb-4" style={{ color: 'hsl(var(--navy-deep))' }}>Admin Processing</Title>
                <Form form={form} layout="vertical">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Select size="large" className="rounded-lg">
                          {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                            <Option key={k} value={k}>{v}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="status" label="Inquiry Status" rules={[{ required: true }]}>
                        <Select size="large" className="rounded-lg">
                          <Option value="pending">Pending (Chưa xử lý)</Option>
                          <Option value="processing">Processing (Đang xử lý)</Option>
                          <Option value="resolved">Resolved (Đã xử lý)</Option>
                          <Option value="cancelled">Cancelled (Đã huỷ)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="interestedProduct" label="Interested Product">
                        <Select 
                          showSearch 
                          placeholder="Link to product..." 
                          size="large"
                          className="rounded-lg"
                          allowClear
                          filterOption={(input, option) =>
                            String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          options={Array.isArray(productsData) ? productsData.map((p: any) => ({ value: p.id || p._id, label: `${p.code} - ${typeof p.name === 'object' ? p.name?.us : p.name}` })) : (productsData as any)?.data?.map((p: any) => ({ value: p.id || p._id, label: `${p.code} - ${typeof p.name === 'object' ? p.name?.us : p.name}` })) || []}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Form.Item name="internalNotes" label="Internal Notes (Not visible to customer)">
                    <Input.TextArea 
                      rows={4} 
                      placeholder="Add processing notes, quote IDs, or next steps..."
                      className="rounded-lg bg-yellow-50/50 focus:bg-yellow-50" 
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
