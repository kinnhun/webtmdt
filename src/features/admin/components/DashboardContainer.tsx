import React from 'react';
import { Card, Statistic, Row, Col, Table, Tag, Button, Progress, Space, Typography, Badge, Divider } from 'antd';
import { 
  PlusOutlined, FileTextOutlined, MessageOutlined, AppstoreOutlined, 
  WarningOutlined, EyeOutlined, ArrowUpOutlined, ArrowRightOutlined,
  CheckCircleOutlined, ExclamationCircleOutlined, LinkOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type { Inquiry } from '@/types/admin';

import { useQuery } from '@tanstack/react-query';
import http from '@/lib/http/client';
import { useInquirySettings } from '@/domains/inquiry';

const { Title, Text } = Typography;

export default function DashboardContainer() {
  const router = useRouter();

  // Fetch Dashboard aggregate data from our new API
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const res = await http.get('/admin/dashboard');
      return res.data.data;
    },
    refetchInterval: 60000 // refresh every 1 minute
  });

  const { data: settings = [] } = useInquirySettings();
  const d = dashboardData || {};

  const statuses = settings.filter((s: { type: string; }) => s.type === 'status' && s.isActive).sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
  
  const recentInquiries = d.recentInquiries || [];
  
  const inquiryColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date', render: (t: string) => <Text type="secondary" className="text-xs">{t}</Text> },
    { title: 'Client Info', key: 'client', render: (_: unknown, r: any) => (
      <div>
        <div className="font-medium text-navy-deep">{r.name}</div>
        <div className="text-xs text-navy/60 truncate max-w-[200px]" title={r.company}>{r.company}</div>
      </div>
    )},
    { title: 'Interest', dataIndex: 'product', key: 'product', render: (p: string, r: any) => (
      r.slug ? (
        <Link href={`/catalogue/${r.slug}`} target="_blank" className="hover:text-orange transition-colors">
          <Text className="font-medium text-xs wrap-break-word cursor-pointer hover:text-orange" style={{ maxWidth: 200 }}>{p}</Text>
        </Link>
      ) : (
        <Text className="font-medium text-xs wrap-break-word" style={{ maxWidth: 200 }}>{p}</Text>
      )
    )},
    { 
      title: 'Status', 
      key: 'status', 
      dataIndex: 'status',
      render: (status: string) => {
        let color = 'gold'; // new / pending
        let text = status.toUpperCase();
        if (text === 'PROCESSING') color = 'blue';
        if (text === 'RESOLVED') color = 'green';
        if (text === 'CANCELLED') color = 'red';
        return <Tag color={color} className="border-0 rounded-sm">{text}</Tag>;
      }
    }
  ];

  const topViewedProducts = d.topViewedProducts || [];
  const topInquiredProducts = d.topInquiredProducts || [];

  return (
    <div className="space-y-6 lg:space-y-8 font-body max-w-[1600px] mx-auto pb-10">
      
      {/* HEADER & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Title level={2} className="m-0 font-display text-navy-deep" style={{ fontSize: '1.75rem' }}>Dashboard Overview</Title>
          <Text className="text-navy/60">Welcome back! Here's what's happening today.</Text>
        </div>
        <Space className="w-full sm:w-auto flex-wrap" size="small">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push('/admin/products/create')} className="bg-orange hover:bg-orange/90 border-0 shadow-sm font-medium">Add Product</Button>
          <Button icon={<MessageOutlined />} onClick={() => router.push('/admin/inquiries')}>View Inquiries</Button>
        </Space>
      </div>

      {/* ROW 1: OVERVIEW CARDS */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} lg={6}>
          <Card variant="borderless" className="shadow-sm h-full" styles={{ body: { padding: '20px' } }}>
            <Statistic title={<span className="text-navy/60 text-xs font-semibold uppercase tracking-wider">Total Inquiries</span>} value={isLoading ? '-' : d.totalInquiries} styles={{ content: { color: 'hsl(var(--navy-deep))', fontWeight: 600 } }} />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card variant="borderless" className="shadow-sm h-full" styles={{ body: { padding: '20px' } }}>
            <Statistic title={<span className="text-orange text-xs font-semibold uppercase tracking-wider">New Today</span>} value={isLoading ? '-' : d.newToday} styles={{ content: { color: 'hsl(var(--orange))', fontWeight: 600 } }} prefix={<ArrowUpOutlined className="text-sm" />} />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card variant="borderless" className="shadow-sm h-full bg-red-50/50" styles={{ body: { padding: '20px' } }}>
            <Statistic title={<span className="text-red-500 text-xs font-semibold uppercase tracking-wider">Pending</span>} value={isLoading ? '-' : d.pendingInquiries} styles={{ content: { color: '#ef4444', fontWeight: 600 } }} />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card variant="borderless" className="shadow-sm h-full" styles={{ body: { padding: '20px' } }}>
            <Statistic title={<span className="text-navy/60 text-xs font-semibold uppercase tracking-wider">Total Products</span>} value={isLoading ? '-' : d.totalProducts} styles={{ content: { color: 'hsl(var(--navy-deep))', fontWeight: 600 } }} />
          </Card>
        </Col>
      </Row>

      {/* ROW 2: INQUIRY TREND */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={24}>
          <Card title={<span className="font-display font-medium text-lg text-navy-deep">Inquiry Pipeline</span>} variant="borderless" className="shadow-sm h-full">
            <Row gutter={24} className="mb-6">
              <Col span={8}>
                <div className="text-xs text-navy/60 uppercase tracking-wide mb-1">Today</div>
                <div className="text-2xl font-bold text-navy-deep">{isLoading ? '-' : d.newToday}</div>
              </Col>
              <Col span={8}>
                <div className="text-xs text-navy/60 uppercase tracking-wide mb-1">Last 7 Days</div>
                <div className="text-2xl font-bold text-navy-deep">{isLoading ? '-' : d.newLast7Days}</div>
              </Col>
              <Col span={8}>
                <div className="text-xs text-navy/60 uppercase tracking-wide mb-1">Last 30 Days</div>
                <div className="text-2xl font-bold text-navy-deep">{isLoading ? '-' : d.newLast30Days}</div>
              </Col>
            </Row>
            <Divider className="my-4" />
            <div className="space-y-4">
              {statuses.map((s: any) => {
                const count = d.pipelineStatus?.[s.key] || 0;
                return (
                  <div key={s.key}>
                    <div className="flex justify-between text-sm mb-1">
                      <Text>{s.label}</Text>
                      <Text strong>{isLoading ? '-' : count}</Text>
                    </div>
                    <Progress 
                      percent={!d.totalInquiries ? 0 : Math.round((count / d.totalInquiries) * 100)} 
                      showInfo={false} 
                      strokeColor={s.color !== 'default' ? s.color : '#94a3b8'} 
                    />
                  </div>
                );
              })}
              {statuses.length === 0 && !isLoading && (
                <div className="text-gray-400 text-sm text-center py-4">No statuses configured.</div>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* ROW 3: PRODUCT BREAKDOWNS */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title={<Text className="font-display font-medium text-navy-deep">By Category</Text>} size="small" variant="borderless" className="shadow-sm h-full">
            <div className="flex flex-col">
              {(d.productsByCategory || []).map((i: any, idx: number) => (
                <div key={idx} className="px-0 py-2 border-b border-gray-50 flex justify-between last:border-b-0">
                  <Text className="text-sm truncate w-2/3" title={i.n}>{i.n}</Text><Text type="secondary" className="text-sm shrink-0">{i.c}</Text>
                </div>
              ))}
              {!isLoading && (d.productsByCategory?.length === 0) && <Text type="secondary" className="text-xs py-2">No data yet</Text>}
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title={<Text className="font-display font-medium text-navy-deep">By Material</Text>} size="small" variant="borderless" className="shadow-sm h-full">
            <div className="flex flex-col">
              {(d.productsByMaterial || []).map((i: any, idx: number) => (
                <div key={idx} className="px-0 py-2 border-b border-gray-50 flex justify-between last:border-b-0">
                  <Text className="text-sm truncate w-2/3" title={i.n}>{i.n}</Text><Text type="secondary" className="text-sm shrink-0">{i.c}</Text>
                </div>
              ))}
              {!isLoading && (d.productsByMaterial?.length === 0) && <Text type="secondary" className="text-xs py-2">No data yet</Text>}
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title={<Text className="font-display font-medium text-navy-deep">By MOQ</Text>} size="small" variant="borderless" className="shadow-sm h-full">
            <div className="flex flex-col">
              {(d.productsByMOQ || []).map((i: any, idx: number) => (
                <div key={idx} className="px-0 py-2 border-b border-gray-50 flex justify-between last:border-b-0">
                  <Text className="text-sm truncate w-2/3" title={i.n}>{i.n}</Text><Text type="secondary" className="text-sm shrink-0">{i.c}</Text>
                </div>
              ))}
              {!isLoading && (d.productsByMOQ?.length === 0) && <Text type="secondary" className="text-xs py-2">No data yet</Text>}
            </div>
          </Card>
        </Col>
      </Row>

      {/* ROW 4: RECENT INQUIRIES & PRODUCT EXCELLENCE */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            title={<span className="font-display font-medium text-lg text-navy-deep">Recent Inquiries</span>} 
            extra={<Button type="link" onClick={() => router.push('/admin/inquiries')}>View All <ArrowRightOutlined /></Button>}
            variant="borderless" 
            className="shadow-sm h-full"
            styles={{ body: { padding: 0 } }}
          >
            <Table 
              columns={inquiryColumns} 
              dataSource={recentInquiries} 
              pagination={false} 
              scroll={{ x: 600 }}
              size="middle"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <div className="flex flex-col gap-6 h-full">
            <Card title={<Text className="font-display font-medium text-navy-deep">Top Viewed Products</Text>} size="small" variant="borderless" className="shadow-sm flex-1">
              <div className="flex flex-col">
                {topViewedProducts.map((item: any, i: number) => (
                  <div key={i} className="px-0 py-2 flex items-center justify-between border-b border-transparent">
                    <div className="flex items-center gap-2 pr-2 overflow-hidden">
                      <Badge count={i+1} style={{ backgroundColor: i < 3 ? 'hsl(var(--orange))' : '#d9d9d9' }} />
                      <Link href={`/catalogue/${item.slug || item.title}`} target="_blank" className="hover:text-orange transition-colors truncate">
                        <Text className="text-sm cursor-pointer hover:text-orange" title={item.title}>{item.title}</Text>
                      </Link>
                    </div>
                    <Text type="secondary" className="text-xs whitespace-nowrap shrink-0"><EyeOutlined className="mr-1" />{item.views}</Text>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card title={<Text className="font-display font-medium text-navy-deep">Top Inquired Products</Text>} size="small" variant="borderless" className="shadow-sm flex-1">
              <div className="flex flex-col">
                {topInquiredProducts.map((item: any, i: number) => (
                  <div key={i} className="px-0 py-2 flex items-center justify-between border-b border-transparent">
                    <div className="flex items-center gap-2 pr-2 overflow-hidden">
                      <Badge count={i+1} style={{ backgroundColor: i < 3 ? 'hsl(var(--navy))' : '#d9d9d9' }} />
                      <Link href={`/catalogue/${item.slug || item.title}`} target="_blank" className="hover:text-navy-deep transition-colors truncate">
                        <Text className="text-sm cursor-pointer hover:text-navy-deep" title={item.title}>{item.title}</Text>
                      </Link>
                    </div>
                    <Text type="secondary" className="text-xs whitespace-nowrap text-green-600 font-medium shrink-0">{item.count} leads</Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Col>
      </Row>



    </div>
  );
}
