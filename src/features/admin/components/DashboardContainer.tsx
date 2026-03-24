import { Card, Statistic, Row, Col, Table, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { productsData } from '@/data/products';

export default function DashboardContainer() {
  const recentOrders = [
    { key: '1', orderId: '#ORD-001', customer: 'John Doe', date: '2025-10-15', total: '$1,299.00', status: 'Delivered' },
    { key: '2', orderId: '#ORD-002', customer: 'Jane Smith', date: '2025-10-14', total: '$850.50', status: 'Processing' },
    { key: '3', orderId: '#ORD-003', customer: 'Bob Johnson', date: '2025-10-14', total: '$2,100.00', status: 'Shipped' },
    { key: '4', orderId: '#ORD-004', customer: 'Alice Brown', date: '2025-10-13', total: '$450.00', status: 'Pending' },
    { key: '5', orderId: '#ORD-005', customer: 'Charlie Wilson', date: '2025-10-12', total: '$3,400.00', status: 'Delivered' },
  ];

  const columns = [
    { title: 'Order ID', dataIndex: 'orderId', key: 'orderId', render: (text: string) => <a className="text-orange">{text}</a> },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    { 
      title: 'Status', 
      key: 'status', 
      dataIndex: 'status',
      render: (status: string) => {
        let color = status === 'Delivered' ? 'green' : status === 'Processing' ? 'blue' : status === 'Shipped' ? 'cyan' : 'gold';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-2xl m-0 text-navy-deep">Dashboard Overview</h2>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Revenue (Monthly)"
              value={42589}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix="$"
              suffix={<ArrowUpOutlined className="text-sm ml-1 text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Orders"
              value={124}
              valueStyle={{ color: '#3f8600' }}
              suffix={<ArrowUpOutlined className="text-sm ml-1" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Active Products"
              value={productsData.length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Traffic Growth"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Orders" bordered={false} className="shadow-sm overflow-hidden">
        <Table 
          columns={columns} 
          dataSource={recentOrders} 
          pagination={false} 
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
}
