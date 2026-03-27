import React from 'react';
import { Card, Statistic, Row, Col, Table, Tag, Button, Progress, Space, Typography, Badge, Divider } from 'antd';
import { 
  PlusOutlined, FileTextOutlined, MessageOutlined, AppstoreOutlined, 
  WarningOutlined, EyeOutlined, ArrowUpOutlined, ArrowRightOutlined,
  CheckCircleOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import type { Inquiry } from '@/types/admin';

const { Title, Text } = Typography;

export default function DashboardContainer() {
  const router = useRouter();

  // --- MOCK DATA ---
  const recentInquiries: Inquiry[] = [
    { key: '1', date: 'Just now', name: 'John Doe', company: 'JD Furniture', email: 'john@jdfurniture.com', product: 'Outdoor Sofa Set A', status: 'Pending', rep: 'Unassigned' },
    { key: '2', date: '2 hrs ago', name: 'Alice Smith', company: 'Smith Hotels', email: 'alice@smithhotels.com', product: 'Aluminium Dining Chair', status: 'Replied', rep: 'Sarah' },
    { key: '3', date: '1 day ago', name: 'Robert Chen', company: 'Chen Imports', email: 'robert@chenimports.com', product: 'Teak Wood Sunbed', status: 'Quoted', rep: 'Mike' },
    { key: '4', date: '2 days ago', name: 'Elena Gomez', company: 'Gomez Retail', email: 'elena@gomezretail.com', product: 'Wicker Lounge Chair', status: 'Closed (Won)', rep: 'Sarah' },
    { key: '5', date: '3 days ago', name: 'David Kim', company: 'DK Sourcing', email: 'david@dksourcing.com', product: 'Outdoor Dining Table', status: 'Not Potential', rep: 'Mike' },
  ];

  const inquiryColumns = [
    { title: 'Time', dataIndex: 'date', key: 'date', render: (t: string) => <Text type="secondary" className="text-xs">{t}</Text> },
    { title: 'Client Info', key: 'client', render: (_: unknown, r: Inquiry) => (
      <div>
        <div className="font-medium text-navy-deep">{r.name}</div>
        <div className="text-xs text-navy/60">{r.company}</div>
      </div>
    )},
    { title: 'Interest', dataIndex: 'product', key: 'product', render: (p: string) => <Text className="font-medium">{p}</Text> },
    { 
      title: 'Status', 
      key: 'status', 
      dataIndex: 'status',
      render: (status: string) => {
        let color = 'gold';
        if (status === 'Replied') color = 'blue';
        if (status === 'Quoted') color = 'purple';
        if (status === 'Closed (Won)') color = 'green';
        if (status === 'Not Potential') color = 'default';
        return <Tag color={color} className="border-0 rounded-sm">{status.toUpperCase()}</Tag>;
      }
    },
    { title: 'Rep', dataIndex: 'rep', key: 'rep' },
  ];

  const topViewedProducts = [
    { title: 'Premium Teak Sectional Sofa', views: 1245 },
    { title: 'Aluminium Expandable Dining Table', views: 980 },
    { title: 'All-Weather Wicker Sun Lounger', views: 856 },
    { title: 'Outdoor Rope Club Chair', views: 720 },
    { title: 'Minimalist Concrete Fire Pit', views: 654 },
  ];

  const topInquiredProducts = [
    { title: 'Premium Teak Sectional Sofa', count: 42 },
    { title: 'All-Weather Wicker Sun Lounger', count: 35 },
    { title: 'Aluminium Expandable Dining Table', count: 28 },
    { title: 'Resin Wicker Dining Set', count: 21 },
    { title: 'Outdoor Rope Club Chair', count: 18 },
  ];

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
          <Button icon={<FileTextOutlined />} onClick={() => router.push('/admin/blog')}>Add Blog Post</Button>
          <Button icon={<MessageOutlined />} onClick={() => router.push('/admin/inquiries')}>View Inquiries</Button>
          <Button icon={<AppstoreOutlined />} onClick={() => router.push('/admin/collections')}>Collections</Button>
        </Space>
      </div>

      {/* ROW 1: OVERVIEW CARDS */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} lg={4}>
          <Card bordered={false} className="shadow-sm h-full" bodyStyle={{ padding: '20px' }}>
            <Statistic title={<span className="text-navy/60 text-xs font-semibold uppercase tracking-wider">Total Inquiries</span>} value={142} valueStyle={{ color: 'hsl(var(--navy-deep))', fontWeight: 600 }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card bordered={false} className="shadow-sm h-full" bodyStyle={{ padding: '20px' }}>
            <Statistic title={<span className="text-orange text-xs font-semibold uppercase tracking-wider">New Today</span>} value={8} valueStyle={{ color: 'hsl(var(--orange))', fontWeight: 600 }} prefix={<ArrowUpOutlined className="text-sm" />} />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card bordered={false} className="shadow-sm h-full bg-red-50/50" bodyStyle={{ padding: '20px' }}>
            <Statistic title={<span className="text-red-500 text-xs font-semibold uppercase tracking-wider">Pending</span>} value={15} valueStyle={{ color: '#ef4444', fontWeight: 600 }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card bordered={false} className="shadow-sm h-full" bodyStyle={{ padding: '20px' }}>
            <Statistic title={<span className="text-navy/60 text-xs font-semibold uppercase tracking-wider">Total Products</span>} value={214} valueStyle={{ color: 'hsl(var(--navy-deep))', fontWeight: 600 }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card bordered={false} className="shadow-sm h-full" bodyStyle={{ padding: '20px' }}>
            <Statistic title={<span className="text-navy/60 text-xs font-semibold uppercase tracking-wider">Blog Posts</span>} value={48} valueStyle={{ color: 'hsl(var(--navy-deep))', fontWeight: 600 }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card bordered={false} className="shadow-sm h-full border border-orange/20" bodyStyle={{ padding: '20px' }}>
            <Statistic title={<span className="text-orange text-xs font-semibold uppercase tracking-wider">Missing Data</span>} value={23} suffix="/ 214" valueStyle={{ color: 'hsl(var(--orange))', fontWeight: 600, fontSize: '1.25rem' }} />
          </Card>
        </Col>
      </Row>

      {/* ROW 2: INQUIRY TREND & COLLECTION OVERVIEW */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card title={<span className="font-display font-medium text-lg text-navy-deep">Inquiry Pipeline</span>} bordered={false} className="shadow-sm h-full">
            <Row gutter={24} className="mb-6">
              <Col span={8}>
                <div className="text-xs text-navy/60 uppercase tracking-wide mb-1">Today</div>
                <div className="text-2xl font-bold text-navy-deep">8</div>
              </Col>
              <Col span={8}>
                <div className="text-xs text-navy/60 uppercase tracking-wide mb-1">Last 7 Days</div>
                <div className="text-2xl font-bold text-navy-deep">45</div>
              </Col>
              <Col span={8}>
                <div className="text-xs text-navy/60 uppercase tracking-wide mb-1">Last 30 Days</div>
                <div className="text-2xl font-bold text-navy-deep">142</div>
              </Col>
            </Row>
            <Divider className="my-4" />
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1"><Text>Pending / Unread</Text><Text strong>15</Text></div>
                <Progress percent={10} showInfo={false} strokeColor="#ef4444" trailColor="#fee2e2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><Text>Replied (Working)</Text><Text strong>42</Text></div>
                <Progress percent={30} showInfo={false} strokeColor="#3b82f6" trailColor="#dbeafe" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><Text>Quoted</Text><Text strong>38</Text></div>
                <Progress percent={26} showInfo={false} strokeColor="#a855f7" trailColor="#f3e8ff" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><Text>Closed (Won)</Text><Text strong>25</Text></div>
                <Progress percent={18} showInfo={false} strokeColor="#22c55e" trailColor="#dcfce7" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title={<span className="font-display font-medium text-lg text-navy-deep">Products by Collection</span>} bordered={false} className="shadow-sm h-full">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2"><Text strong>Outdoor Sofa Collection</Text><Text className="text-navy/60">85 items</Text></div>
                <Progress percent={40} showInfo={false} strokeColor="hsl(var(--navy))" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><Text strong>Outdoor Dining Collection</Text><Text className="text-navy/60">65 items</Text></div>
                <Progress percent={30} showInfo={false} strokeColor="hsl(var(--navy)/0.8)" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><Text strong>Aluminium Furniture</Text><Text className="text-navy/60">42 items</Text></div>
                <Progress percent={20} showInfo={false} strokeColor="hsl(var(--navy)/0.6)" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><Text strong>Indoor Collection</Text><Text className="text-navy/60">22 items</Text></div>
                <Progress percent={10} showInfo={false} strokeColor="hsl(var(--navy)/0.4)" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ROW 3: PRODUCT BREAKDOWNS */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title={<Text className="font-display font-medium text-navy-deep">By Category</Text>} size="small" bordered={false} className="shadow-sm h-full">
            <div className="flex flex-col">
              {[
                { n: 'Sofas & Sectionals', c: 68 },
                { n: 'Dining Chairs', c: 54 },
                { n: 'Dining Tables', c: 45 },
                { n: 'Loungers & Daybeds', c: 25 },
                { n: 'Accessories', c: 22 },
              ].map((i, idx) => (
                <div key={idx} className="px-0 py-2 border-b border-gray-50 flex justify-between last:border-b-0">
                  <Text className="text-sm">{i.n}</Text><Text type="secondary" className="text-sm">{i.c}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title={<Text className="font-display font-medium text-navy-deep">By Material</Text>} size="small" bordered={false} className="shadow-sm h-full">
            <div className="flex flex-col">
              {[
                { n: 'Teak Wood', c: 85 },
                { n: 'Powder-coated Aluminium', c: 65 },
                { n: 'Synthetic Wicker (PE)', c: 42 },
                { n: 'Rope & Fabric', c: 15 },
                { n: 'Mixed Materials', c: 7 },
              ].map((i, idx) => (
                <div key={idx} className="px-0 py-2 border-b border-gray-50 flex justify-between last:border-b-0">
                  <Text className="text-sm">{i.n}</Text><Text type="secondary" className="text-sm">{i.c}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title={<Text className="font-display font-medium text-navy-deep">By MOQ</Text>} size="small" bordered={false} className="shadow-sm h-full">
            <div className="flex flex-col">
              {[
                { n: '20ft Container (Mixed)', c: 120 },
                { n: '40ft HQ', c: 55 },
                { n: '50 Sets', c: 24 },
                { n: 'Sample Orders', c: 15 },
              ].map((i, idx) => (
                <div key={idx} className="px-0 py-2 border-b border-gray-50 flex justify-between last:border-b-0">
                  <Text className="text-sm">{i.n}</Text><Text type="secondary" className="text-sm">{i.c}</Text>
                </div>
              ))}
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
            bordered={false} 
            className="shadow-sm h-full"
            bodyStyle={{ padding: 0 }}
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
            <Card title={<Text className="font-display font-medium text-navy-deep">Top Viewed Products</Text>} size="small" bordered={false} className="shadow-sm flex-1">
              <div className="flex flex-col">
                {topViewedProducts.map((item, i) => (
                  <div key={i} className="px-0 py-2 flex items-center justify-between border-b border-transparent">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <Badge count={i+1} style={{ backgroundColor: i < 3 ? 'hsl(var(--orange))' : '#d9d9d9' }} />
                      <Text className="text-sm truncate" style={{ maxWidth: 180 }} title={item.title}>{item.title}</Text>
                    </div>
                    <Text type="secondary" className="text-xs whitespace-nowrap"><EyeOutlined className="mr-1" />{item.views}</Text>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card title={<Text className="font-display font-medium text-navy-deep">Top Inquired Products</Text>} size="small" bordered={false} className="shadow-sm flex-1">
              <div className="flex flex-col">
                {topInquiredProducts.map((item, i) => (
                  <div key={i} className="px-0 py-2 flex items-center justify-between border-b border-transparent">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <Badge count={i+1} style={{ backgroundColor: i < 3 ? 'hsl(var(--navy))' : '#d9d9d9' }} />
                      <Text className="text-sm truncate" style={{ maxWidth: 180 }} title={item.title}>{item.title}</Text>
                    </div>
                    <Text type="secondary" className="text-xs whitespace-nowrap text-green-600 font-medium">{item.count} leads</Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      {/* ROW 5: BLOG, HEALTH ALERTS, COMPANY RECAP */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title={<span className="font-display font-medium text-navy-deep">Content & Blog</span>} size="small" bordered={false} className="shadow-sm h-full bg-gray-50/50">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 bg-white p-3 rounded-md border border-gray-100 text-center shadow-sm">
                <div className="text-2xl font-bold text-navy">42</div>
                <div className="text-xs text-navy/60 uppercase">Published</div>
              </div>
              <div className="flex-1 bg-white p-3 rounded-md border border-gray-100 text-center shadow-sm">
                <div className="text-2xl font-bold text-orange">6</div>
                <div className="text-xs text-navy/60 uppercase">Drafts</div>
              </div>
            </div>
            <div className="flex flex-col">
              {[
                { label: 'Top Topic', val: 'Material Guides' },
                { label: 'Blog -> Inquiry Rate', val: '2.4%' },
              ].map((i, idx) => (
                <div key={idx} className="px-0 py-1 flex justify-between">
                  <Text className="text-sm text-navy/70">{i.label}</Text>
                  <Text strong className="text-sm">{i.val}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card title={<span className="font-display font-medium text-orange"><WarningOutlined className="mr-2"/>Data Health Alerts</span>} size="small" bordered={false} className="shadow-sm h-full border border-orange/20">
            <div className="flex flex-col">
              {[
                { msg: 'Products without images', c: 4, type: 'error' },
                { msg: 'Missing category/collection', c: 12, type: 'warning' },
                { msg: 'Missing MOQ info', c: 7, type: 'warning' },
                { msg: 'Blog posts missing SEO meta', c: 3, type: 'warning' },
                { msg: 'Inquiries completely unassigned', c: 15, type: 'error' },
              ].map((i, idx) => (
                <div key={idx} className="px-0 py-1.5 flex justify-between">
                  <div className="flex items-center gap-2">
                    {i.type === 'error' ? <ExclamationCircleOutlined className="text-red-500 text-xs" /> : <WarningOutlined className="text-orange text-xs" />}
                    <Text className="text-sm">{i.msg}</Text>
                  </div>
                  <Tag color={i.type === 'error' ? 'red' : 'orange'} className="mr-0 border-0">{i.c}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title={<span className="font-display font-medium text-navy-deep">Company Profile Overview</span>} size="small" bordered={false} className="shadow-sm h-full bg-navy/2">
            <div className="flex flex-col">
              {[
                { l: 'Experience', v: '15+ Years' },
                { l: 'Capacity', v: '50K+ units/mo' },
                { l: 'Current Catalog', v: '200+ Active Products' },
                { l: 'Export Reach', v: '25+ Countries' },
                { l: 'Facilities', v: '1 Factory, 1 Showroom' },
                { l: 'Active Hotline', v: '+84 987 654 321' },
              ].map((i, idx) => (
                <div key={idx} className="px-0 py-1 flex justify-between">
                  <Text className="text-sm text-navy/70">{i.l}</Text>
                  <div className="flex items-center gap-2">
                    <Text strong className="text-sm">{i.v}</Text>
                    <CheckCircleOutlined className="text-green-500 text-xs" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-right">
              <Button type="link" size="small" className="text-xs p-0 text-navy/60 hover:text-orange">Update Profile Settings <ArrowRightOutlined/></Button>
            </div>
          </Card>
        </Col>
      </Row>

    </div>
  );
}
