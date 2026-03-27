import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Space, Card, Row, Col, message, Upload } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import type { BlogPost } from '@/domains/blog/blog.types';

const { Option } = Select;
const { TextArea } = Input;

interface BlogFormProps {
  initialValues?: Partial<BlogPost>;
  isEdit?: boolean;
}

export default function BlogForm({ initialValues, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        authorName: initialValues.author?.name,
        authorRole: initialValues.author?.role,
      });
    }
  }, [initialValues, form]);

  const onFinish = (values: Partial<BlogPost>) => {
    console.log('Form values:', values);
    message.success(`Blog post ${isEdit ? 'updated' : 'created'} successfully (Demo)`);
    router.push('/admin/blog');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button 
          icon={<ArrowLeftOutlined />} 
          type="text" 
          onClick={() => router.push('/admin/blog')}
          className="text-gray-500 hover:text-navy-deep"
        />
        <div>
          <h2 className="font-display font-semibold text-2xl m-0 text-navy-deep">
            {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <p className="text-sm text-gray-500 m-0">
            {isEdit ? 'Update existing content' : 'Publish a new article to your blog'}
          </p>
        </div>
      </div>

      <Form 
        layout="vertical" 
        form={form} 
        onFinish={onFinish}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card bordered={false} className="shadow-sm">
              <Form.Item
                name="title"
                label="Post Title"
                rules={[{ required: true, message: 'Please enter the title' }]}
              >
                <Input size="large" placeholder="E.g. Top 10 Interior Trends for 2026" />
              </Form.Item>
              
              <Form.Item
                name="slug"
                label="URL Slug"
                rules={[{ required: true, message: 'Please enter a slug' }]}
                extra="Leave blank to auto-generate from title"
              >
                <Input prefix={<span className="text-gray-400 text-xs pr-1 border-r border-gray-200 mr-2">/blog/</span>} placeholder="top-10-interior-trends" />
              </Form.Item>

              <Form.Item
                name="excerpt"
                label="Excerpt / Summary"
                rules={[{ required: true, message: 'Please provide a short summary' }]}
              >
                <TextArea rows={3} placeholder="A short description of this post..." />
              </Form.Item>
            </Card>

            <Card title="Content" bordered={false} className="shadow-sm">
              <Form.Item
                name="content"
                rules={[{ required: true, message: 'Content is required' }]}
              >
                <TextArea 
                  rows={20} 
                  placeholder="<p>Write your HTML or Markdown content here...</p>" 
                  style={{ fontFamily: 'monospace' }}
                />
              </Form.Item>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Publishing" bordered={false} className="shadow-sm">
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select category" size="large">
                  <Option value="Design Tips">Design Tips</Option>
                  <Option value="Trends">Trends</Option>
                  <Option value="Materials">Materials</Option>
                  <Option value="Guides">Guides</Option>
                </Select>
              </Form.Item>
              
              <Form.Item label="Cover Image" name="coverImage">
                <Input placeholder="Enter image URL" className="mb-3" />
                <Upload action="/upload.do" listType="picture" maxCount={1} className="w-full">
                  <Button icon={<UploadOutlined />} className="w-full">Upload New Image</Button>
                </Upload>
              </Form.Item>
              
              <div className="pt-4 border-t border-gray-100 mt-4 flex gap-3">
                <Button onClick={() => router.push('/admin/blog')} className="flex-1">
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" className="flex-1 bg-orange border-none shadow-md">
                  {isEdit ? 'Save Changes' : 'Publish Post'}
                </Button>
              </div>
            </Card>

            <Card title="Author Information" bordered={false} className="shadow-sm">
              <Form.Item name="authorName" label="Author Name">
                <Input placeholder="E.g. John Doe" />
              </Form.Item>
              <Form.Item name="authorRole" label="Author Role">
                <Input placeholder="E.g. Senior Designer" />
              </Form.Item>
            </Card>
          </div>
        </div>
      </Form>
    </div>
  );
}
