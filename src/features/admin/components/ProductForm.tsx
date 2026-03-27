/**
 * ProductForm.tsx
 * Advanced product edit/create form with:
 *  - Language toggle on Name field (EN / US / UK / VN)
 *  - Auto-generate slug from name (user can override)
 *  - Auto-generate SKU from name + date (user can override)
 *  - Multi-select Collection & Category
 *  - Rich Attributes builder (icon picker + localized title/value)
 *  - Tabs: Basic Info | Translations | Specs & B2B | Care & Usage | Media
 */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Form, Input, Button, Select, Row, Col, message, Upload, Divider,
  Tabs, Tag, Badge, Tooltip, Modal, Space,
} from 'antd';
import {
  ArrowLeftOutlined, UploadOutlined, PlusOutlined, MinusCircleOutlined,
  SaveOutlined, InfoCircleOutlined, ToolOutlined, HeartOutlined,
  PictureOutlined, GlobalOutlined, CheckCircleFilled,
  ExclamationCircleOutlined, SwapOutlined, AppstoreOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import * as AntIcons from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '@/services/product.service';
import type { Product, ProductAttribute } from '@/domains/product/product.types';
import type { UploadFile } from 'antd/es/upload/interface';
import dynamic from 'next/dynamic';
import ImgCrop from 'antd-img-crop';

const RichTextEditor = dynamic(() => import('@/components/ui/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-24 bg-gray-50 rounded-lg border border-gray-200 animate-pulse" />,
});


const { Option } = Select;
const { TextArea } = Input;

// ─── Icon Picker catalogue ─────────────────────────────────────────────────
const ICON_OPTIONS = [
  { name: 'RulerOutlined', label: 'Ruler' },
  { name: 'ColumnHeightOutlined', label: 'Height' },
  { name: 'ColumnWidthOutlined', label: 'Width' },
  { name: 'ThunderboltOutlined', label: 'Weight' },
  { name: 'BgColorsOutlined', label: 'Color' },
  { name: 'ExperimentOutlined', label: 'Material' },
  { name: 'StarOutlined', label: 'Quality' },
  { name: 'TagOutlined', label: 'Style' },
  { name: 'SafetyOutlined', label: 'Warranty' },
  { name: 'EnvironmentOutlined', label: 'Origin' },
  { name: 'HomeOutlined', label: 'Room' },
  { name: 'BuildOutlined', label: 'Assembly' },
  { name: 'FireOutlined', label: 'Durability' },
  { name: 'ShopOutlined', label: 'Finish' },
  { name: 'ApiOutlined', label: 'Certification' },
  { name: 'ClockCircleOutlined', label: 'Lead Time' },
  { name: 'SkinOutlined', label: 'Fabric' },
  { name: 'BlockOutlined', label: 'Structure' },
  { name: 'ProfileOutlined', label: 'Specification' },
  { name: 'UserOutlined', label: 'Capacity' },
];

import { CATEGORIES, MATERIALS, MOQ_OPTIONS, COLORS, STYLES } from '@/constants/product';

const COLLECTIONS = ['Outdoor', 'Indoor'];

// ─── Helpers ───────────────────────────────────────────────────────────────
function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function autoSKU(name: string) {
  if (!name) return '';
  const words = name.trim().split(/\s+/);
  const prefix = words.map((w) => w[0]?.toUpperCase() || '').join('').slice(0, 3);
  const mid = words[words.length - 1]?.slice(0, 3).toUpperCase() || 'XXX';
  const now = new Date();
  const num = String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0');
  return `${prefix}-${mid}-${num}`;
}

function renderIcon(name: string, className = 'text-orange') {
  const Comp = (AntIcons as any)[name];
  return Comp ? <Comp className={className} /> : <AppstoreOutlined className={className} />;
}

// ─── Sub-components ────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #f97316, #ea580c)' }} />
    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{children}</span>
  </div>
);

// ─── Icon Picker Modal ─────────────────────────────────────────────────────
function IconPicker({ value, onChange }: { value?: string; onChange?: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = ICON_OPTIONS.filter((i) =>
    i.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-orange hover:bg-orange/5 transition-all cursor-pointer w-full"
      >
        <span className="text-xl flex-shrink-0">{value ? renderIcon(value, 'text-orange text-base') : <AppstoreOutlined className="text-gray-300 text-base" />}</span>
        <span className="text-sm text-gray-500 flex-1 text-left">{value ? ICON_OPTIONS.find(i => i.name === value)?.label || value : 'Pick icon…'}</span>
        <SwapOutlined className="text-gray-300 text-xs" />
      </button>

      <Modal
        title={<span className="font-semibold">Choose Icon</span>}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={480}
      >
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search icons…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 rounded-lg"
        />
        <div className="grid grid-cols-5 gap-2">
          {filtered.map((ic) => (
            <button
              key={ic.name}
              type="button"
              onClick={() => { onChange?.(ic.name); setOpen(false); }}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all cursor-pointer hover:border-orange hover:bg-orange/5 ${
                value === ic.name ? 'border-orange bg-orange/5' : 'border-gray-100'
              }`}
            >
              <span className="text-2xl">{renderIcon(ic.name, value === ic.name ? 'text-orange' : 'text-gray-500')}</span>
              <span className="text-[10px] text-gray-400 leading-none">{ic.label}</span>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}

// ─── Attribute Builder Row ─────────────────────────────────────────────────
function AttributeRow({ fieldName, remove }: { fieldName: number; remove: () => void }) {
  const [lang, setLang] = useState<'VI' | 'UK' | 'US'>('US');

  const valField = lang === 'VI' ? 'valueVI' : lang === 'UK' ? 'valueUK' : 'valueUS';
  const titleField = lang === 'VI' ? 'titleVI' : lang === 'UK' ? 'titleUK' : 'titleUS';

  return (
    <div className="group p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:border-orange/30 hover:bg-orange/[0.02] transition-all">
      <div className="flex items-start gap-3">
        {/* Icon picker */}
        <div className="w-36 flex-shrink-0">
          <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">Icon</p>
          <Form.Item name={[fieldName, 'icon']} noStyle>
            <IconPicker />
          </Form.Item>
        </div>

        {/* Title */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-gray-400 font-semibold uppercase">Label</p>
            <div className="flex gap-1">
              {(['VI', 'UK', 'US'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold transition-all ${
                    lang === l ? 'bg-orange text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <Form.Item name={[fieldName, titleField]} noStyle>
            <Input placeholder={`Label (${lang})…`} className="rounded-lg border-gray-200 text-sm" />
          </Form.Item>
        </div>

        {/* Value */}
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">Value ({lang})</p>
          <Form.Item name={[fieldName, valField]} noStyle>
            <Input placeholder={`Value (${lang})…`} className="rounded-lg border-gray-200 text-sm" />
          </Form.Item>
        </div>

        {/* Remove */}
        <button
          type="button"
          onClick={remove}
          className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
        >
          <MinusCircleOutlined />
        </button>
      </div>
    </div>
  );
}

// ─── Specification Row ─────────────────────────────────────────────────────
function SpecRow({ fieldName, remove }: { fieldName: number; remove: () => void }) {
  const [lang, setLang] = useState<'VI' | 'UK' | 'US'>('US');

  const valField = lang === 'VI' ? 'valueVI' : lang === 'UK' ? 'valueUK' : 'valueUS';
  const titleField = lang === 'VI' ? 'nameVI' : lang === 'UK' ? 'nameUK' : 'nameUS';

  return (
    <div className="group p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:border-orange/30 hover:bg-orange/[0.02] transition-all">
      <div className="flex items-start gap-4">
        {/* Title */}
        <div className="w-1/3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-gray-400 font-semibold uppercase">Key</p>
            <div className="flex gap-1">
              {(['VI', 'UK', 'US'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold transition-all ${
                    lang === l ? 'bg-orange text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <Form.Item name={[fieldName, titleField]} noStyle>
            <Input placeholder={`Key (${lang})… (e.g. Finish)`} className="rounded-lg border-gray-200 text-sm" />
          </Form.Item>
        </div>

        {/* Value */}
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">Value ({lang})</p>
          <Form.Item name={[fieldName, valField]} noStyle>
            <Input placeholder={`Value (${lang})…`} className="rounded-lg border-gray-200 text-sm" />
          </Form.Item>
        </div>

        {/* Remove */}
        <button
          type="button"
          onClick={remove}
          className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
        >
          <MinusCircleOutlined />
        </button>
      </div>
    </div>
  );
}

// ─── Description Fields with Language Toggle ──────────────────────────────
const ALL_LANGS = ['US', 'UK', 'VI'] as const;
type AllLang = typeof ALL_LANGS[number];

const LANG_FLAGS: Record<AllLang, string> = { US: '🇺🇸', UK: '🇬🇧', VI: '🇻🇳' };
const LANG_LABELS: Record<AllLang, string> = {
  US: 'American English', UK: 'British English', VI: 'Vietnamese',
};

// US → primary English fields; UK/VI → localized overrides
const SHORT_FIELD: Record<AllLang, string> = {
  US: 'description', UK: 'descriptionUK', VI: 'descriptionVI',
};
const LONG_FIELD: Record<AllLang, string> = {
  US: 'longDescription', UK: 'longDescriptionUK', VI: 'longDescriptionVI',
};

function DescriptionFields({ form }: { form: ReturnType<typeof Form.useForm>[0] }) {
  const [lang, setLang] = useState<AllLang>('US');

  const LangBar = () => (
    <div className="flex gap-1 flex-wrap">
      {ALL_LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-md font-bold transition-all ${
            lang === l
              ? 'bg-orange text-white shadow-sm'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
        >
          <span>{LANG_FLAGS[l]}</span>{l}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <SectionLabel>Descriptions</SectionLabel>

      {/* Lang switcher */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
        <span className="text-xs text-gray-500 font-medium">
          Editing: <strong>{LANG_FLAGS[lang]} {LANG_LABELS[lang]}</strong>
          {lang !== 'US' && <span className="text-gray-400 font-normal"> — blank inherits US</span>}
        </span>
        <LangBar />
      </div>

      {/* Short Description */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1.5">
          Short Description
          {lang === 'US' && <span className="ml-1 text-[10px] text-orange font-normal">(required)</span>}
        </p>
        <Form.Item
          name={SHORT_FIELD[lang]}
          rules={lang === 'US' ? [{ required: true, message: 'Short description required' }] : []}
          noStyle
        >
          <Input.TextArea
            key={lang}
            rows={2}
            placeholder={`${LANG_LABELS[lang]} short description…`}
            className="rounded-lg border-gray-200 w-full"
          />
        </Form.Item>
      </div>

      {/* Long Description (Rich Text) */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1.5">
          Long Description <span className="text-[10px] text-gray-400 font-normal">(rich text)</span>
        </p>
        <RichTextEditorControl
          key={lang}
          fieldName={LONG_FIELD[lang]}
          form={form}
          minHeight={220}
          placeholder={`${LANG_LABELS[lang]} long description…`}
        />
      </div>
    </div>
  );
}


/** Bridges Form state with the uncontrolled RichTextEditor */
function RichTextEditorControl({
  fieldName, form, placeholder, minHeight,
}: { fieldName: string; form: any; placeholder?: string; minHeight?: number }) {
  const value = Form.useWatch(fieldName, form);
  return (
    <RichTextEditor
      value={value || ''}
      onChange={(v) => form.setFieldValue(fieldName, v)}
      placeholder={placeholder}
      minHeight={minHeight}
    />
  );
}


// ─── Main Component ────────────────────────────────────────────────────────
interface ProductFormProps {
  initialValues?: Partial<Product>;
  isEdit?: boolean;
}

export default function ProductForm({ initialValues, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [activeTab, setActiveTab] = useState('info');
  // Name language toggle
  const [nameLang, setNameLang] = useState<'VI' | 'UK' | 'US'>('US');
  const [slugEdited, setSlugEdited] = useState(false);
  const [skuEdited, setSkuEdited] = useState(false);

  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (payload: Partial<Product>) => {
      const targetId = initialValues?.slug || initialValues?.id || initialValues?.code || '';
      return updateProduct(targetId, payload);
    },
    onSuccess: () => {
      message.success('Product updated!');
      queryClient.invalidateQueries({ queryKey: ['product'] });
      router.push('/admin/products');
    },
    onError: (err) => {
      console.error(err);
      message.error('Save failed. See console.');
    },
  });

  useEffect(() => {
    if (!initialValues) return;

    let specifications: any[] = [];
    if (Array.isArray(initialValues.specifications)) {
      specifications = initialValues.specifications;
    } else if (initialValues.specifications && typeof initialValues.specifications === 'object') {
      specifications = Object.entries(initialValues.specifications).map(
        ([nameUS, valueUS]) => ({ nameUS, valueUS })
      );
    }

    const initialImages: UploadFile[] = (initialValues.images || []).map((url, i) => ({
      uid: `-${i}`,
      name: `image-${i}.png`,
      status: 'done',
      url,
    }));
    if (!initialImages.length && initialValues.image) {
      initialImages.push({ uid: '-0', name: 'cover.png', status: 'done', url: initialValues.image });
    }

    setFileList(initialImages);

    // Normalize collection and category to arrays
    const collections = Array.isArray(initialValues.collection)
      ? initialValues.collection
      : initialValues.collection ? [initialValues.collection] : [];
    const categories = Array.isArray(initialValues.category)
      ? initialValues.category
      : initialValues.category ? [initialValues.category] : [];

    form.setFieldsValue({
      ...initialValues,
      collection: collections,
      category: categories,
      specifications,
    });
  }, [initialValues, form]);

  // Auto-slug from primary name
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!slugEdited) {
        form.setFieldValue('slug', slugify(e.target.value));
      }
      if (!skuEdited) {
        form.setFieldValue('code', autoSKU(e.target.value));
      }
    },
    [form, slugEdited, skuEdited]
  );

  const handleCustomUpload = useCallback(async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = async () => {
        const base64Data = reader.result as string;
        onProgress({ percent: 50 });

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Data,
            mimeType: file.type,
            filename: file.name,
            size: file.size,
          }),
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        onProgress({ percent: 100 });
        onSuccess(data, new XMLHttpRequest());
      };
      reader.onerror = (err) => onError(err);
    } catch (err) {
      onError(err);
    }
  }, []);

  const handleUploadChange = useCallback(({ fileList: fl }: { fileList: UploadFile[] }) => {
    setFileList(fl);
  }, []);

  const onFinish = (values: any) => {
    const uploadedImages = fileList.map((f) => f.url || f.response?.url || '').filter(Boolean);
    const payload = {
      ...values,
      image: uploadedImages[0] || values.image || '',
      images: uploadedImages,
    };
    if (isEdit) mutateUpdate(payload);
    else {
      message.success('Product created!');
      router.push('/admin/products');
    }
  };

  const hasTrans = (suffix: string) =>
    !!(initialValues as any)?.[`name${suffix}`] || !!(initialValues as any)?.[`description${suffix}`];

  // ── Name with language toggle (VI / UK / US only — base field is EN) ───────
  const nameFieldMap: Record<string, string> = {
    VI: 'nameVI', UK: 'nameUK', US: 'nameUS',
  };
  const namePlaceholder: Record<string, string> = {
    VI: 'Tên sản phẩm tiếng Việt',
    UK: 'British English name',
    US: 'American English name',
  };
  const nameFlagMap: Record<string, string> = { VI: '🇻🇳', UK: '🇬🇧', US: '🇺🇸' };

  const NameLangToggle = () => (
    <div className="flex gap-1">
      {(['VI', 'UK', 'US'] as const).map((l) => (
        <Tooltip key={l} title={{ VI: 'Vietnamese', UK: 'British English', US: 'American English' }[l]}>
          <button
            type="button"
            onClick={() => setNameLang(l)}
            className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-bold transition-all ${
              nameLang === l ? 'bg-orange text-white shadow-sm' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            <span>{nameFlagMap[l]}</span>{l}
          </button>
        </Tooltip>
      ))}
    </div>
  );

  // ── Translation banner ───────────────────────────────────────────────────
  const TransBanner = ({ flag, label, suffix }: { flag: string; label: string; suffix: string }) => (
    <div className="flex items-center gap-3 mb-5 p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
      <span className="text-2xl">{flag}</span>
      <div className="flex-1">
        <p className="font-semibold text-gray-800 m-0 text-sm">{label}</p>
        <p className="text-xs text-gray-400 m-0">Leave blank to inherit English</p>
      </div>
      {hasTrans(suffix)
        ? <Tag color="success" icon={<CheckCircleFilled />} className="border-0 text-xs">Done</Tag>
        : <Tag color="warning" icon={<ExclamationCircleOutlined />} className="border-0 text-xs">Empty</Tag>}
    </div>
  );

  const renderTransTab = (suffix: string, flag: string, label: string) => (
    <div className="pt-4 space-y-4">
      <TransBanner flag={flag} label={label} suffix={suffix} />
      <Form.Item name={`name${suffix}`} label="Product Name">
        <Input placeholder={`${label} name`} size="large" className="rounded-lg border-gray-200" />
      </Form.Item>
      <Form.Item name={`description${suffix}`} label="Short Description">
        <TextArea rows={3} placeholder="Translated…" className="rounded-lg border-gray-200" />
      </Form.Item>
      <Form.Item name={`longDescription${suffix}`} label="Long Description (HTML)">
        <TextArea rows={6} className="rounded-lg border-gray-200" style={{ fontFamily: 'monospace', fontSize: 12 }} />
      </Form.Item>
    </div>
  );

  // ── Dynamic list helper ──────────────────────────────────────────────────
  const DynamicList = ({ name, placeholder, btnLabel }: { name: string; placeholder: string; btnLabel: string }) => (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <div className="space-y-2">
          {fields.map((field) => (
            <div key={field.key} className="flex items-center gap-2 group">
              <Form.Item {...field} noStyle>
                <Input placeholder={placeholder} className="rounded-lg border-gray-200" />
              </Form.Item>
              <button
                type="button"
                onClick={() => remove(field.name)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity flex-shrink-0"
              >
                <MinusCircleOutlined />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => add()}
            className="flex items-center gap-1.5 text-sm text-orange hover:text-orange/70 mt-1 transition-colors"
          >
            <PlusOutlined className="text-xs" /> {btnLabel}
          </button>
        </div>
      )}
    </Form.List>
  );

  // ── Tab items ────────────────────────────────────────────────────────────
  const tabItems = [
    // ── 1. Basic Info ──────────────────────────────────────────────────────
    {
      key: 'info',
      label: <span className="flex items-center gap-1.5"><InfoCircleOutlined />Basic Info</span>,
      children: (
        <div className="pt-5 space-y-6">
          {/* ── Name (US primary + UK/VI toggle) ── */}
          <SectionLabel>Product Name</SectionLabel>
          <div className="rounded-xl border border-orange/20 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.04), rgba(251,191,36,0.06))' }}>
            <div className="p-4">
              {/* Toggle bar */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <GlobalOutlined className="text-orange" />
                  {nameFlagMap[nameLang]} {({ VI: 'Vietnamese', UK: 'British English', US: 'American English' } as Record<string,string>)[nameLang]}
                  {nameLang === 'US'
                    ? <span className="text-[10px] text-gray-400 font-normal ml-1">(primary — auto-generates slug & SKU)</span>
                    : <span className="text-[10px] text-gray-400 font-normal ml-1">— blank inherits US</span>}
                </span>
                <NameLangToggle />
              </div>
              {nameLang === 'US' ? (
                <Form.Item name="name" rules={[{ required: true, message: 'Product name is required' }]} noStyle>
                  <Input
                    size="large"
                    placeholder="Aria Dining Table"
                    onChange={handleNameChange}
                    className="rounded-lg border-orange/20"
                  />
                </Form.Item>
              ) : (
                <Form.Item name={nameFieldMap[nameLang]} noStyle>
                  <Input
                    size="large"
                    placeholder={namePlaceholder[nameLang]}
                    className="rounded-lg border-gray-200"
                  />
                </Form.Item>
              )}
            </div>
          </div>



          {/* ── URL & SKU ── */}
          <Row gutter={16}>
            <Col span={14}>
              <SectionLabel>URL Slug</SectionLabel>
              <Form.Item name="slug" rules={[{ required: true }]}>
                <Input
                  addonBefore={<span className="text-gray-400 text-xs">/catalogue/</span>}
                  placeholder="aria-dining-table"
                  className="rounded-lg border-gray-200"
                  onChange={() => setSlugEdited(true)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <SectionLabel>SKU Code</SectionLabel>
              <Form.Item name="code" rules={[{ required: true }]}>
                <Input
                  placeholder="DIN-ARI-0327"
                  className="font-mono rounded-lg border-gray-200"
                  onChange={() => setSkuEdited(true)}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* ── Collection & Category ── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SectionLabel>Collection</SectionLabel>
              <Form.Item name="collection" rules={[{ required: true }]}>
                <Select
                  mode="multiple"
                  placeholder="Select collections…"
                  className="rounded-lg"
                  allowClear
                >
                  {COLLECTIONS.map((c) => (
                    <Option key={c} value={c}>
                      {c === 'Outdoor' ? '🌿' : '🏠'} {c}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <SectionLabel>Category</SectionLabel>
              <Form.Item name="category" rules={[{ required: true }]}>
                <Select
                  mode="tags"
                  placeholder="Type or select categories…"
                  className="rounded-lg"
                  allowClear
                >
                  {CATEGORIES.map((c) => (
                    <Option key={c} value={c}>{c}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* ── Descriptions ── */}
          <DescriptionFields form={form} />

        </div>
      ),
    },

    // ── 2. Attributes & Specs ──────────────────────────────────────────────
    {
      key: 'attributes',
      label: <span className="flex items-center gap-1.5"><AppstoreOutlined />Attributes & Specs</span>,
      children: (
        <div className="pt-5 space-y-8">
          {/* A. B2B Details */}
          <div>
            <SectionLabel>B2B Details (Required)</SectionLabel>
            <p className="text-xs text-gray-400 -mt-3 mb-4">Core fields used for storefront filtering and categorization.</p>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="moq" label="MOQ" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
                  <Select placeholder="50–100 pcs" className="rounded-lg" allowClear>
                    {MOQ_OPTIONS.map((opt: string) => <Option key={opt} value={opt}>{opt}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="dimensions" label="Dimensions (L×W×H)" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
                  <Input placeholder="220 × 100 × 76 cm" className="rounded-lg border-gray-200" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="weight" label="Weight" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
                  <Input placeholder="52 kg" className="rounded-lg border-gray-200" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="material" label="Material" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
                  <Select placeholder="Walnut Wood" className="rounded-lg" allowClear mode="tags">
                    {MATERIALS.map((opt: string) => <Option key={opt} value={opt}>{opt}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="style" label="Style" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
                  <Select placeholder="Mid-Century Modern" className="rounded-lg" allowClear mode="tags">
                    {STYLES.map((opt: string) => <Option key={opt} value={opt}>{opt}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="color" label="Color / Finish" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
                  <Select placeholder="Natural Walnut" className="rounded-lg" allowClear mode="tags">
                    {COLORS.map((opt: string) => <Option key={opt} value={opt}>{opt}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Divider className="my-2" />

          {/* B. Visual Attribute Cards */}
          <div>
            <SectionLabel>Visual Attribute Cards</SectionLabel>
            <p className="text-xs text-gray-400 -mt-3 mb-5">
              These appear as icon cards on the product catalogue page (e.g. Dimensions, Material, Style).
              Each row supports labels & values in US / UK / VI.
            </p>
  
            <Form.List name="attributes">
              {(fields, { add, remove }) => (
                <div className="space-y-3">
                  {fields.map((field) => (
                    <AttributeRow
                      key={field.key}
                      fieldName={field.name}
                      remove={() => remove(field.name)}
                    />
                  ))}
  
                  <button
                    type="button"
                    onClick={() => add({ icon: 'ProfileOutlined', titleUS: '', valueUS: '' })}
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm text-orange border-2 border-dashed border-orange/30 rounded-xl hover:border-orange/60 hover:bg-orange/5 transition-all"
                  >
                    <PlusOutlined /> Add Attribute Card
                  </button>
                </div>
              )}
            </Form.List>
          </div>

          <Divider className="my-2" />

          <div>
            <SectionLabel>Specification Rows</SectionLabel>
            <p className="text-xs text-gray-400 -mt-3 mb-4">Detailed technical specifications presented in table format. Supports VI/UK/US.</p>
            <Form.List name="specifications">
              {(fields, { add, remove }) => (
                <div className="space-y-3">
                  {fields.map((field) => (
                    <SpecRow
                      key={field.key}
                      fieldName={field.name}
                      remove={() => remove(field.name)}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => add({ nameUS: '', valueUS: '' })}
                    className="flex items-center gap-1.5 text-sm text-orange hover:text-orange/70 mt-2"
                  >
                    <PlusOutlined className="text-xs" /> Add Spec Row
                  </button>
                </div>
              )}
            </Form.List>
          </div>
        </div>
      ),
    },

    // ── 5. Care & Usage ────────────────────────────────────────────────────
    {
      key: 'care',
      label: <span className="flex items-center gap-1.5"><HeartOutlined />Care</span>,
      children: (
        <div className="pt-5">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-100">
              <SectionLabel>Care Instructions</SectionLabel>
              <DynamicList name="careInstructions" placeholder="e.g. Clean with damp cloth" btnLabel="Add instruction" />
            </div>
            <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
              <SectionLabel>Usage Settings</SectionLabel>
              <DynamicList name="usageSettings" placeholder="e.g. Indoor / Covered Outdoor" btnLabel="Add setting" />
            </div>
          </div>
        </div>
      ),
    },

    // ── 6. Media ───────────────────────────────────────────────────────────
    {
      key: 'media',
      label: (
        <span className="flex items-center gap-1.5">
          <PictureOutlined />
          Media
          {fileList.length > 0 && (
            <span className="text-[10px] bg-orange/10 text-orange px-1.5 py-0.5 rounded-full font-semibold ml-0.5">
              {fileList.length}
            </span>
          )}
        </span>
      ),
      children: (
        <div className="pt-5 space-y-5">
          <SectionLabel>Product Images</SectionLabel>
          <p className="text-xs text-gray-400 -mt-3 mb-3">First image = cover. Max 10. Drag to reorder.</p>
          {/* @ts-ignore: antd-img-crop type definitions are incomplete for cropperProps overrides */}
          <ImgCrop rotationSlider aspect={4 / 3} quality={1} fillColor="white" minZoom={0.1} cropperProps={{ restrictPosition: false }}>
            <Upload
              customRequest={handleCustomUpload}
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
            >
              {fileList.length >= 10 ? null : (
                <div className="flex flex-col items-center py-1">
                  <UploadOutlined className="text-gray-400 text-xl mb-1" />
                  <div className="text-xs text-gray-400">Upload</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
          <Divider />
          <Form.Item name="video" label="Video Embed URL" help="YouTube / Vimeo embed link">
            <Input placeholder="https://youtube.com/embed/…" className="rounded-lg border-gray-200" />
          </Form.Item>
        </div>
      ),
    },
  ];

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* ── Sticky Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/products')}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
            >
              <ArrowLeftOutlined className="text-sm" />
            </button>
            {initialValues?.image && (
              <img src={initialValues.image} alt="" className="w-10 h-10 rounded-lg object-cover border-2 border-white shadow-sm" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900 m-0 leading-tight">
                  {isEdit ? initialValues?.name || 'Edit Product' : 'New Product'}
                </h1>
                {isEdit && (
                  <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {initialValues?.code}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                {[initialValues?.collection].flat().filter(Boolean).map((c) => (
                  <Tag key={c} className="text-[10px] border-0 m-0" color={c === 'Outdoor' ? 'green' : 'purple'}>
                    {c}
                  </Tag>
                ))}
                <span className="text-xs text-gray-400">
                  {[initialValues?.category].flat().filter(Boolean).join(', ')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => router.push('/admin/products')} className="rounded-lg border-gray-200 text-gray-500">
              Discard
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={isUpdating}
              onClick={() => form.submit()}
              size="large"
              className="rounded-lg border-none font-semibold px-6 shadow-md"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
            >
              {isEdit ? 'Save Changes' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Form body ─────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              size="middle"
              tabBarStyle={{ padding: '0 24px', margin: 0, borderBottom: '1px solid #f3f4f6' }}
              tabBarGutter={2}
            />
          </div>

          <style>{`
            .ant-tabs-content-holder { padding: 0 24px 32px; }
            .ant-tabs-tab { padding: 14px 6px !important; font-size: 13px; }
            .ant-tabs-tab-active .ant-tabs-tab-btn { color: #f97316 !important; font-weight: 600; }
            .ant-tabs-ink-bar { background: linear-gradient(90deg,#f97316,#ea580c) !important; height: 3px !important; border-radius: 3px 3px 0 0 !important; }
            .ant-form-item-label > label { font-size: 13px !important; font-weight: 500 !important; color: #374151 !important; }
            .ant-upload-select, .ant-upload-list-picture-card .ant-upload-list-item { border-radius: 12px !important; }
            .ant-select-selector { border-radius: 8px !important; }
          `}</style>
        </Form>
      </div>
    </div>
  );
}
