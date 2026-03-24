import React, { useState } from 'react';
import { Table, Button, Input, Space, Tag, Drawer, Form, Select, Upload, Row, Col, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { productsData } from '@/data/products';
import type { Product } from '@/domains/product/product.types';

const { Option } = Select;
const { TextArea } = Input;

export default function ProductManagement() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // Mock data for table
  const dataSource = productsData.map((p) => ({ ...p, key: p.id }));

  const filteredData = dataSource.filter(
    (item) => 
      item.name.toLowerCase().includes(searchText.toLowerCase()) || 
      item.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id: string) => {
    message.success(`Product ${id} deleted successfully (Demo)`);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (img: string) => (
        <img src={img} alt="product" className="w-12 h-12 rounded object-cover border border-gray-100" />
      ),
      width: 80,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
      render: (text: string, record: Product) => (
        <div>
          <div className="font-semibold text-navy-deep">{text}</div>
          <div className="text-xs text-gray-400">{record.code}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Bedroom', value: 'Bedroom' },
        { text: 'Living Room', value: 'Living Room' },
        { text: 'Dining Room', value: 'Dining Room' },
        { text: 'Outdoor', value: 'Outdoor' },
      ],
      onFilter: (value: any, record: Product) => record.category === value,
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => {
              form.setFieldsValue(record);
              setDrawerVisible(true);
            }} 
            className="text-blue-500"
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)} 
          />
        </Space>
      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('Product saved successfully (Demo)');
    setDrawerVisible(false);
    form.resetFields();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-display font-semibold text-2xl m-0 text-navy-deep">Products</h2>
          <p className="text-sm text-gray-500 m-0">Manage your catalogue and inventory</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => {
            form.resetFields();
            setDrawerVisible(true);
          }}
          className="bg-orange hover:bg-orange/90 border-none shadow-md h-10 px-6 font-semibold"
        >
          Add Product
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
        <Input
          placeholder="Search products by name or code..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="max-w-md"
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          scroll={{ x: 800 }}
          pagination={{ pageSize: 8 }}
        />
      </div>

      <Drawer
        title={<span className="font-display font-semibold text-lg">Product Details</span>}
        width={720}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
            <Button onClick={() => form.submit()} type="primary" className="bg-orange border-none">
              Save Product
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[{ required: true, message: 'Please enter product name' }]}
              >
                <Input placeholder="e.g. Oslo Bed Frame" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="SKU / Code"
                rules={[{ required: true, message: 'Please enter product code' }]}
              >
                <Input placeholder="e.g. BED-OSL-001" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select a category">
                  <Option value="Bedroom">Bedroom</Option>
                  <Option value="Living Room">Living Room</Option>
                  <Option value="Dining Room">Dining Room</Option>
                  <Option value="Outdoor">Outdoor</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="material"
                label="Material"
              >
                <Input placeholder="e.g. Solid Oak" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Short Description"
              >
                <TextArea rows={3} placeholder="Brief product overview..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Product Images">
                <Upload action="/upload.do" listType="picture-card">
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}
