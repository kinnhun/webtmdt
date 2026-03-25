import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Space, Card, Row, Col, message, Upload, InputNumber, Divider } from 'antd';
import { ArrowLeftOutlined, UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import type { Product } from '@/domains/product/product.types';

const { Option } = Select;
const { TextArea } = Input;

interface ProductFormProps {
  initialValues?: Partial<Product>;
  isEdit?: boolean;
}

export default function ProductForm({ initialValues, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      // Convert specifications object to array of {name, value} for Form.List
      let specList: any[] = [];
      if (initialValues.specifications) {
        specList = Object.entries(initialValues.specifications).map(([name, value]) => ({ name, value }));
      }
      form.setFieldsValue({
        ...initialValues,
        specList
      });
    }
  }, [initialValues, form]);

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success(`Product ${isEdit ? 'updated' : 'created'} successfully (Demo)`);
    router.push('/admin/products');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button 
          icon={<ArrowLeftOutlined />} 
          type="text" 
          onClick={() => router.push('/admin/products')}
          className="text-gray-500 hover:text-navy-deep"
        />
        <div>
          <h2 className="font-display font-semibold text-2xl m-0 text-navy-deep">
            {isEdit ? 'Edit Product' : 'Create New Product'}
          </h2>
          <p className="text-sm text-gray-500 m-0">
            {isEdit ? `Update details for ${initialValues?.name}` : 'Add a new product to your catalogue'}
          </p>
        </div>
      </div>

      <Form 
        layout="vertical" 
        form={form} 
        onFinish={onFinish}
        className="space-y-6 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="Basic Information" bordered={false} className="shadow-sm">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                    <Input placeholder="E.g. Oslo Bed Frame" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
                    <Input placeholder="oslo-bed-frame" size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="code" label="SKU Code" rules={[{ required: true }]}>
                    <Input placeholder="BED-OSL-001" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select placeholder="Select Category">
                      <Option value="Bedroom">Bedroom</Option>
                      <Option value="Living Room">Living Room</Option>
                      <Option value="Dining Room">Dining Room</Option>
                      <Option value="Outdoor">Outdoor</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="description" label="Short Description" rules={[{ required: true }]}>
                    <TextArea rows={3} placeholder="A short, catchy description..." />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item name="longDescription" label="Long Description (HTML)">
                    <TextArea rows={8} placeholder="<p>Full product details...</p>" style={{ fontFamily: 'monospace' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Pricing & Inventory" bordered={false} className="shadow-sm">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="price" label="Current Price ($)" rules={[{ required: true }]}>
                    <InputNumber className="w-full" min={0} precision={2} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="oldPrice" label="Old Price ($) (Optional)">
                    <InputNumber className="w-full" min={0} precision={2} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="stock" label="Stock Quantity">
                    <InputNumber className="w-full" min={0} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card title="Attributes & Features" bordered={false} className="shadow-sm">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="material" label="Material">
                    <Input placeholder="Solid Oak" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="color" label="Color">
                    <Input placeholder="Natural Wood" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="size" label="Size (General)">
                    <Input placeholder="King" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="dimensions" label="Dimensions">
                    <Input placeholder="200cm × 180cm × 95cm" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="weight" label="Weight">
                    <Input placeholder="68 kg" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider>Bullet Points</Divider>
              <Form.List name="features">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Row key={field.key} gutter={16} align="middle" className="mb-2">
                        <Col flex="auto">
                          <Form.Item {...field} noStyle>
                            <Input placeholder="Feature bullet point" />
                          </Form.Item>
                        </Col>
                        <Col flex="none">
                          <MinusCircleOutlined className="text-red-500" onClick={() => remove(field.name)} />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Feature
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Divider>Specifications (Key-Value)</Divider>
              <Form.List name="specList">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={16} align="middle" className="mb-2">
                        <Col span={10}>
                          <Form.Item {...restField} name={[name, 'name']} noStyle>
                            <Input placeholder="Name (e.g. Finish)" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item {...restField} name={[name, 'value']} noStyle>
                            <Input placeholder="Value (e.g. Matte)" />
                          </Form.Item>
                        </Col>
                        <Col span={2} className="text-center">
                          <MinusCircleOutlined className="text-red-500" onClick={() => remove(name)} />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Specification
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <Card title="Media" bordered={false} className="shadow-sm">
              <Form.Item name="image" label="Cover Image URL">
                <Input placeholder="https://..." />
              </Form.Item>
              <Form.Item label="Upload Images">
                <Upload action="/upload.do" listType="picture-card" multiple>
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item name="video" label="Video Embed URL">
                <Input placeholder="https://youtube.com/embed/..." />
              </Form.Item>
            </Card>

            <Card title="Publishing" bordered={false} className="shadow-sm">
              <Button type="primary" htmlType="submit" className="w-full bg-orange border-none shadow-md h-12 mb-3">
                {isEdit ? 'Save Changes' : 'Publish Product'}
              </Button>
              <Button onClick={() => router.push('/admin/products')} className="w-full h-10">
                Cancel
              </Button>
            </Card>
          </div>
        </div>
      </Form>
    </div>
  );
}
