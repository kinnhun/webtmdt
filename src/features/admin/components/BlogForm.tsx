import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Tabs, Tag, message, Upload, Divider, DatePicker } from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  InfoCircleOutlined,
  EditOutlined,
  PictureOutlined,
  TagsOutlined,
  UploadOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import type { BlogPost } from '@/domains/blog/blog.types';
import { blogCategories } from '@/data/posts';

const BlogContentEditor = dynamic(() => import('@/features/admin/components/BlogContentEditor'), { ssr: false });

const { Option } = Select;
const { TextArea } = Input;

interface BlogFormProps {
  initialValues?: Partial<BlogPost>;
  isEdit?: boolean;
}

/* ── Shared Label ── */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }} />
    <span className="font-display text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--navy)/0.55)' }}>
      {children}
    </span>
  </div>
);

export default function BlogForm({ initialValues, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);

  /* ── i18n language toggle (for multilingual content) ── */
  const [contentLang, setContentLang] = useState<'US' | 'VI' | 'UK'>('US');

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        authorName: initialValues.author?.name,
        authorRole: initialValues.author?.role,
        authorAvatar: initialValues.author?.avatar,
        tags: initialValues.tags || [],
      });
    }
  }, [initialValues, form]);

  /* ── Auto-generate slug from title ── */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!slugEdited && !isEdit) {
      const slug = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      form.setFieldsValue({ slug });
    }
  };

  const onFinish = (values: Record<string, unknown>) => {
    setSaving(true);
    setTimeout(() => {
      console.log('Blog form values:', values);
      message.success(`Blog post ${isEdit ? 'updated' : 'published'} successfully (Demo)`);
      setSaving(false);
      router.push('/admin/blog/manage');
    }, 800);
  };

  /* ── Language buttons for content fields ── */
  const LangToggle = () => (
    <div className="flex items-center gap-1.5">
      {(['VI', 'UK', 'US'] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => setContentLang(lng)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all border"
          style={{
            backgroundColor: contentLang === lng ? 'hsl(var(--orange))' : 'transparent',
            color: contentLang === lng ? '#fff' : 'hsl(var(--navy)/0.4)',
            borderColor: contentLang === lng ? 'hsl(var(--orange))' : 'hsl(var(--navy)/0.1)',
          }}
        >
          <GlobalOutlined className="text-[10px]" />
          {lng === 'VI' ? 'VN' : lng}
        </button>
      ))}
    </div>
  );

  /* ── Content field name based on current language ── */
  const contentField = contentLang === 'US' ? 'content' : `content${contentLang}`;
  const excerptField = contentLang === 'US' ? 'excerpt' : `excerpt${contentLang}`;
  const titleField = contentLang === 'US' ? 'title' : `title${contentLang}`;

  /* ── Tab Items ── */
  const tabItems = [
    // ── 1. General ──
    {
      key: 'general',
      label: <span className="flex items-center gap-1.5"><InfoCircleOutlined />General</span>,
      children: (
        <div className="pt-5 space-y-6">
          {/* ── Title with language toggle ── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel>Post Title</SectionLabel>
              <LangToggle />
            </div>
            <div className="p-4 rounded-xl border" style={{ borderColor: 'hsl(var(--navy)/0.08)', backgroundColor: 'hsl(var(--orange)/0.02)' }}>
              {contentLang === 'US' ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: 'hsl(var(--orange))', color: '#fff' }}>
                      <GlobalOutlined className="mr-1" />US
                    </span>
                    <span className="text-xs text-gray-400">American English (primary)</span>
                  </div>
                  <Form.Item name="title" className="mb-0" rules={[{ required: true, message: 'Title is required' }]}>
                    <Input
                      size="large"
                      placeholder="E.g. Top 10 Outdoor Furniture Trends for 2026"
                      className="rounded-lg border-gray-200 text-base font-semibold"
                      onChange={handleTitleChange}
                    />
                  </Form.Item>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: contentLang === 'VI' ? '#dc2626' : '#1d4ed8', color: '#fff' }}>
                      <GlobalOutlined className="mr-1" />{contentLang === 'VI' ? 'VN' : 'UK'}
                    </span>
                    <span className="text-xs text-gray-400">{contentLang === 'VI' ? 'Vietnamese' : 'British English'}</span>
                  </div>
                  <Form.Item name={titleField} className="mb-0">
                    <Input size="large" placeholder={`Title (${contentLang === 'VI' ? 'Tiếng Việt' : 'British English'})…`} className="rounded-lg border-gray-200" />
                  </Form.Item>
                </div>
              )}
            </div>
          </div>

          {/* ── URL Slug & Category ── */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={14}>
              <SectionLabel>URL Slug</SectionLabel>
              <Form.Item name="slug" rules={[{ required: true }]}>
                <Input
                  prefix={<span className="text-gray-400 text-xs pr-1.5 mr-1.5 border-r border-gray-200">/blog/</span>}
                  placeholder="choosing-the-right-outdoor-furniture"
                  className="rounded-lg border-gray-200"
                  onChange={() => setSlugEdited(true)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <SectionLabel>Category</SectionLabel>
              <Form.Item name="category" rules={[{ required: true }]}>
                <Select placeholder="Select category" className="w-full rounded-lg" size="large">
                  {blogCategories.filter((c) => c !== 'All').map((cat) => (
                    <Option key={cat} value={cat}>{cat}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* ── Excerpt / Summary ── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel>Excerpt / Summary</SectionLabel>
              <LangToggle />
            </div>
            <Form.Item name={excerptField} rules={contentLang === 'US' ? [{ required: true, message: 'Excerpt is required' }] : []}>
              <TextArea
                rows={3}
                placeholder={contentLang === 'US' ? 'A compelling summary that appears in post listings…' : `Summary (${contentLang === 'VI' ? 'Tiếng Việt' : 'British English'})…`}
                className="rounded-lg border-gray-200"
              />
            </Form.Item>
          </div>

          {/* ── Reading Time ── */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <SectionLabel>Read Time (min)</SectionLabel>
              <Form.Item name="readTime">
                <Input type="number" placeholder="5" className="rounded-lg border-gray-200" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <SectionLabel>Publish Date</SectionLabel>
              <Form.Item name="date">
                <Input type="date" className="rounded-lg border-gray-200" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },

    // ── 2. Content (Rich Text + Block Inserter) ──
    {
      key: 'content',
      label: <span className="flex items-center gap-1.5"><EditOutlined />Content</span>,
      children: (
        <div className="pt-5 space-y-4">
          <div className="flex items-center justify-between">
            <SectionLabel>Post Content</SectionLabel>
            <LangToggle />
          </div>
          <p className="text-xs text-gray-400 -mt-2 mb-4">
            Use the toolbar and block inserter to create rich, visually engaging content with image grids, callouts, quotes, videos, and more.
          </p>
          <Form.Item name={contentField} rules={contentLang === 'US' ? [{ required: true, message: 'Content is required' }] : []}>
            <BlogContentEditor
              placeholder={contentLang === 'US' ? 'Start writing your article here…' : `Content (${contentLang === 'VI' ? 'Tiếng Việt' : 'British English'})…`}
            />
          </Form.Item>
        </div>
      ),
    },

    // ── 3. Media ──
    {
      key: 'media',
      label: <span className="flex items-center gap-1.5"><PictureOutlined />Media</span>,
      children: (
        <div className="pt-5 space-y-6">
          {/* Cover Image */}
          <div>
            <SectionLabel>Cover Image</SectionLabel>
            <p className="text-xs text-gray-400 -mt-3 mb-4">This appears as the hero image on the post detail page and in blog listings.</p>
            <Form.Item name="coverImage">
              <Input size="large" placeholder="https://images.unsplash.com/photo-…" className="rounded-lg border-gray-200" />
            </Form.Item>
            {initialValues?.coverImage && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm" style={{ maxWidth: 480 }}>
                <img src={initialValues.coverImage} alt="Cover preview" className="w-full h-auto object-cover" style={{ maxHeight: 280 }} />
                <div className="px-4 py-2.5 bg-gray-50 text-xs text-gray-400">
                  Current cover image preview
                </div>
              </div>
            )}
          </div>

          <Divider />

          {/* Gallery / Additional Images */}
          <div>
            <SectionLabel>Additional Media</SectionLabel>
            <p className="text-xs text-gray-400 -mt-3 mb-4">
              Upload or link additional images used within the article body.
            </p>
            <Upload
              listType="picture-card"
              className="blog-upload-grid"
              maxCount={6}
              beforeUpload={() => false}
            >
              <div className="flex flex-col items-center py-1">
                <UploadOutlined className="text-gray-400 text-xl mb-1" />
                <div className="text-xs text-gray-400">Upload</div>
              </div>
            </Upload>
          </div>
        </div>
      ),
    },

    // ── 4. Tags & SEO ──
    {
      key: 'seo',
      label: <span className="flex items-center gap-1.5"><TagsOutlined />Tags & SEO</span>,
      children: (
        <div className="pt-5 space-y-6">
          <div>
            <SectionLabel>Tags</SectionLabel>
            <p className="text-xs text-gray-400 -mt-3 mb-4">
              Add tags for content categorization and discovery. Type and press Enter.
            </p>
            <Form.Item name="tags">
              <Select
                mode="tags"
                placeholder="Type a tag and press Enter…"
                size="large"
                className="w-full"
                tokenSeparators={[',']}
              />
            </Form.Item>
          </div>

          <Divider />

          {/* Author Section */}
          <div>
            <SectionLabel>Author Information</SectionLabel>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Form.Item name="authorName" label="Name">
                  <Input placeholder="E.g. DHT Team" className="rounded-lg border-gray-200" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="authorRole" label="Role / Title">
                  <Input placeholder="E.g. Design Director" className="rounded-lg border-gray-200" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="authorAvatar" label="Avatar URL">
                  <Input placeholder="https://..." className="rounded-lg border-gray-200" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Divider />

          {/* SEO Preview */}
          <div>
            <SectionLabel>SEO Preview</SectionLabel>
            <div className="p-4 rounded-xl border bg-gray-50" style={{ borderColor: 'hsl(var(--navy)/0.08)' }}>
              <p className="text-sm font-semibold text-blue-700 m-0 mb-1">
                {form.getFieldValue('title') || 'Post Title'} — DHT Blog
              </p>
              <p className="text-xs text-green-700 m-0 mb-1">
                https://dht-furniture.com/blog/{form.getFieldValue('slug') || 'post-slug'}
              </p>
              <p className="text-xs text-gray-500 m-0 leading-relaxed">
                {form.getFieldValue('excerpt')?.slice(0, 160) || 'Post excerpt will appear here as the meta description…'}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      className="relative"
    >
      {/* ── Sticky Header ── */}
      <div
        className="sticky top-[80px] z-20 bg-white/95 backdrop-blur-md border-b px-4 sm:px-6 py-3 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        style={{ borderColor: 'hsl(var(--navy)/0.06)' }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/blog/manage')}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all"
          >
            <ArrowLeftOutlined className="text-sm" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 m-0 leading-tight truncate max-w-[200px] sm:max-w-md">
                {isEdit ? initialValues?.title || 'Edit Post' : 'New Blog Post'}
              </h1>
              {isEdit && (
                <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  /{initialValues?.slug}
                </span>
              )}
            </div>
            <p className="text-[11px] m-0 mt-0.5" style={{ color: 'hsl(var(--navy)/0.4)' }}>
              {isEdit ? 'Update existing article' : 'Compose and publish a new article'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-start sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          <Button onClick={() => router.push('/admin/blog/manage')} className="rounded-lg border-gray-200 text-gray-500 flex-1 sm:flex-none">
            Discard
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={() => form.submit()}
            size="large"
            className="rounded-lg border-none font-semibold px-4 sm:px-6 shadow-md flex-1 sm:flex-none"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            {isEdit ? 'Save Changes' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white rounded-xl border shadow-sm" style={{ borderColor: 'hsl(var(--navy)/0.06)' }}>
        <Tabs
          defaultActiveKey="general"
          className="admin-product-tabs"
          tabBarStyle={{ padding: '0 20px', marginBottom: 0, borderBottom: '1px solid hsl(var(--navy)/0.06)' }}
          items={tabItems}
          tabBarExtraContent={
            <div className="flex items-center gap-2 pr-2">
              {isEdit && initialValues?.category && (
                <Tag color="purple" className="text-[11px] rounded-full px-3">{initialValues.category}</Tag>
              )}
            </div>
          }
          style={{ padding: '0 20px 20px' }}
        />
      </div>
    </Form>
  );
}
