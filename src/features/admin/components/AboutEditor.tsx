import React, { useCallback, useEffect, useState } from 'react';
import {
  Collapse, Form, Input, Button, message, Upload, Divider, Space, Tooltip,
  Spin, Card, Row, Col, Select, Modal, Drawer, Popconfirm, Typography, Alert,
  Tabs, Segmented, Checkbox
} from 'antd';
import type { CollapseProps } from 'antd';
import {
  SaveOutlined, EyeOutlined, PlusOutlined,
  MinusCircleOutlined, UploadOutlined, GlobalOutlined,
  LoadingOutlined, PictureOutlined, DeleteOutlined,
  TranslationOutlined, SoundOutlined, SmileOutlined,
  ReadOutlined, TrophyOutlined, HistoryOutlined,
  BarChartOutlined, TeamOutlined, EnvironmentOutlined,
  RocketOutlined, RollbackOutlined, FileTextOutlined,
  UpOutlined, DownOutlined, ReloadOutlined, StarOutlined, EditOutlined,
  FormOutlined
} from '@ant-design/icons';
import { 
  Award, Users, Shield, Globe, Leaf, Star, Heart, Zap, Target, CheckCircle,
  Factory, Truck, Package, ShoppingCart, ShoppingBag, Box, Building, Briefcase, 
  Cpu, Battery, Phone, Mail, MapPin, Clock, Calendar, MessageCircle, AlertCircle, 
  Info, Flag, Sun, Moon, TreePine, Droplet, Flame, Lightbulb, Link as LucideLink, Lock, Search, 
  Send, ThumbsUp, TrendingUp, Compass, Anchor, Layout, Code, Coffee, Activity, 
  Gem, Key, Map as MapIcon, Layers, LayoutGrid, LayoutTemplate, PenTool,
  Camera, Video, Monitor, Smartphone, Tablet, Watch, Speaker, Headphones, Mic, 
  Wifi, Bluetooth, Share, Download, Cloud, Server, Database, Save, Edit, 
  Trash, Settings, Wrench, Menu, Home, User, Smile, Eye, Music, Play
} from 'lucide-react';
import type { UploadFile, UploadProps } from 'antd';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { aboutDefaults } from '../constants/aboutDefaults';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
const { Text } = Typography;
const { TextArea } = Input;

const iconMap: Record<string, React.ReactElement> = {
  Award: <Award size={16} />, Users: <Users size={16} />, Shield: <Shield size={16} />, 
  Globe: <Globe size={16} />, Leaf: <Leaf size={16} />, Star: <Star size={16} />, 
  Heart: <Heart size={16} />, Zap: <Zap size={16} />, Target: <Target size={16} />, 
  CheckCircle: <CheckCircle size={16} />, Factory: <Factory size={16} />, Truck: <Truck size={16} />, 
  Package: <Package size={16} />, ShoppingCart: <ShoppingCart size={16} />, ShoppingBag: <ShoppingBag size={16} />, 
  Box: <Box size={16} />, Building: <Building size={16} />, Briefcase: <Briefcase size={16} />, 
  Cpu: <Cpu size={16} />, Battery: <Battery size={16} />, Phone: <Phone size={16} />, 
  Mail: <Mail size={16} />, MapPin: <MapPin size={16} />, Clock: <Clock size={16} />, 
  Calendar: <Calendar size={16} />, MessageCircle: <MessageCircle size={16} />, AlertCircle: <AlertCircle size={16} />, 
  Info: <Info size={16} />, Flag: <Flag size={16} />, Sun: <Sun size={16} />, 
  Moon: <Moon size={16} />, TreePine: <TreePine size={16} />, Droplet: <Droplet size={16} />, 
  Flame: <Flame size={16} />, Lightbulb: <Lightbulb size={16} />, Link: <LucideLink size={16} />, 
  Lock: <Lock size={16} />, Search: <Search size={16} />, Send: <Send size={16} />, 
  ThumbsUp: <ThumbsUp size={16} />, TrendingUp: <TrendingUp size={16} />, Compass: <Compass size={16} />, 
  Anchor: <Anchor size={16} />, Layout: <Layout size={16} />, Code: <Code size={16} />, 
  Coffee: <Coffee size={16} />, Activity: <Activity size={16} />, Gem: <Gem size={16} />, 
  Key: <Key size={16} />, Map: <MapIcon size={16} />, Layers: <Layers size={16} />, 
  LayoutGrid: <LayoutGrid size={16} />, LayoutTemplate: <LayoutTemplate size={16} />, PenTool: <PenTool size={16} />,
  Camera: <Camera size={16} />, Video: <Video size={16} />, Monitor: <Monitor size={16} />, 
  Smartphone: <Smartphone size={16} />, Tablet: <Tablet size={16} />, Watch: <Watch size={16} />, 
  Speaker: <Speaker size={16} />, Headphones: <Headphones size={16} />, Mic: <Mic size={16} />, 
  Wifi: <Wifi size={16} />, Bluetooth: <Bluetooth size={16} />, Share: <Share size={16} />, 
  Download: <Download size={16} />, Cloud: <Cloud size={16} />, Server: <Server size={16} />, 
  Database: <Database size={16} />, Save: <Save size={16} />, Edit: <Edit size={16} />, 
  Trash: <Trash size={16} />, Settings: <Settings size={16} />, 
  Wrench: <Wrench size={16} />, Menu: <Menu size={16} />, Home: <Home size={16} />, 
  User: <User size={16} />, Smile: <Smile size={16} />, Eye: <Eye size={16} />, 
  Music: <Music size={16} />, Play: <Play size={16} />
};

const ICON_OPTIONS = Object.keys(iconMap).map(key => ({
  value: key,
  label: (
    <div className="flex items-center gap-2">
      {iconMap[key]}
      <span>{key}</span>
    </div>
  )
}));

/* ── Reusable Label ── */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }} />
    <span className="font-display text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--navy)/0.55)' }}>
      {children}
    </span>
  </div>
);

/* ── Language Toggle ── */
type Lang = 'US' | 'UK' | 'VI';
const LANG_LABELS: Record<Lang, string> = { US: 'English (US)', UK: 'English (UK)', VI: 'Vietnamese' };

function LangToggle({ value, onChange }: { value: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {(['US', 'UK', 'VI'] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => onChange(lng)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all border"
          style={{
            backgroundColor: value === lng ? 'hsl(var(--orange))' : 'transparent',
            color: value === lng ? '#fff' : 'hsl(var(--navy)/0.4)',
            borderColor: value === lng ? 'hsl(var(--orange))' : 'hsl(var(--navy)/0.1)',
          }}
        >
          <GlobalOutlined className="text-[10px]" />
          {lng === 'VI' ? 'VN' : lng}
        </button>
      ))}
    </div>
  );
}

/* ── i18n Text Field Group = 3 inputs for us/uk/vi + auto-translate ── */
function I18nTextField({
  baseName,
  listPath,
  label,
  textarea = false,
  rows = 3,
  required = false,
  form,
}: {
  baseName: (string | number)[];
  listPath?: (string | number)[];
  label: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
  form?: import('antd').FormInstance;
}) {
  const [lang, setLang] = useState<Lang>('US');
  const [translating, setTranslating] = useState(false);
  const InputComp = textarea ? TextArea : Input;

  const getPath = (langKey: string) => listPath ? [...listPath, ...baseName, langKey] : [...baseName, langKey];

  const handleTranslate = async () => {
    if (!form) return;
    const pathUs = getPath('us');
    const pathUk = getPath('uk');
    const pathVi = getPath('vi');
    
    const usVal = form.getFieldValue(pathUs);
    const ukVal = form.getFieldValue(pathUk);
    const viVal = form.getFieldValue(pathVi);

    const stringUsVal = typeof usVal === 'string' ? usVal : '';
    const stringUkVal = typeof ukVal === 'string' ? ukVal : '';
    const stringViVal = typeof viVal === 'string' ? viVal : '';

    let sourceText = '';
    if (lang === 'US') sourceText = stringUsVal;
    else if (lang === 'UK') sourceText = stringUkVal;
    else sourceText = stringViVal;

    if (!sourceText.trim()) {
      message.warning(`Please enter ${label} in ${lang} first. Path: ${pathUs.join('.')}`);
      return;
    }

    setTranslating(true);
    try {
      if (lang === 'US' || lang === 'UK') {
        const otherEnField = lang === 'US' ? 'uk' : 'us';
        form.setFieldValue(getPath(otherEnField), sourceText);

        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sourceText, targetLang: 'vi', sourceLang: 'en' }),
        });
        const data = await res.json();
        if (res.ok && data.translated) {
          form.setFieldValue(getPath('vi'), data.translated);
        }
      } else {
        // Translate from Vietnamese to English
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sourceText, targetLang: 'en', sourceLang: 'vi' }),
        });
        const data = await res.json();
        if (res.ok && data.translated) {
          form.setFieldValue(getPath('us'), data.translated);
          form.setFieldValue(getPath('uk'), data.translated);
        }
      }
      message.success(`Translated ${label} from ${lang}!`);
    } catch {
      message.error('Translation failed.');
    } finally {
      setTranslating(false);
    }
  };

  const translateLabel = lang === 'US' ? 'Translate → UK & VN' : lang === 'UK' ? 'Translate → US & VN' : 'Translate → US & UK';

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-600">{label}</span>
        <div className="flex items-center gap-2">
          {form && (
            <button
              type="button"
              onClick={handleTranslate}
              disabled={translating}
              className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm"
              style={{ backgroundColor: 'hsl(var(--orange)/0.1)', color: 'hsl(var(--orange))' }}
            >
              {translating ? <LoadingOutlined spin /> : <TranslationOutlined />}
              {translateLabel}
            </button>
          )}
          <LangToggle value={lang} onChange={setLang} />
        </div>
      </div>
      <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3 space-y-0">
        {(['us', 'uk', 'vi'] as const).map((l) => {
          const langKey = l === 'us' ? 'US' : l === 'uk' ? 'UK' : 'VI';
          return (
            <div key={l} style={{ display: lang === langKey ? 'block' : 'none' }}>
              <Form.Item
                name={[...baseName, l]}
                rules={l === 'us' && required ? [{ required: true, message: `${label} (US) is required` }] : []}
                className="mb-0"
              >
                <InputComp
                  placeholder={`${label} (${LANG_LABELS[langKey]})…`}
                  className="rounded-lg border-gray-200"
                  {...(textarea ? { rows } : {})}
                />
              </Form.Item>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── i18n Rich Text Field Group ── */
function I18nRichTextField({
  baseName,
  label,
  required = false,
  form,
}: {
  baseName: (string | number)[];
  label: string;
  required?: boolean;
  form?: import('antd').FormInstance;
}) {
  const [lang, setLang] = useState<Lang>('US');
  const [translating, setTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!form) return;
    const usVal = form.getFieldValue([...baseName, 'us']) || '';
    const ukVal = form.getFieldValue([...baseName, 'uk']) || '';
    const viVal = form.getFieldValue([...baseName, 'vi']) || '';

    let sourceText = '';
    if (lang === 'US') sourceText = usVal;
    else if (lang === 'UK') sourceText = ukVal;
    else sourceText = viVal;

    // Remove empty HTML tags before checking if empty
    const strippedText = sourceText.replace(/<[^>]*>?/gm, '').trim();
    if (!strippedText) {
      message.warning(`Please enter ${label} in ${lang} first.`);
      return;
    }

    setTranslating(true);
    try {
      if (lang === 'US' || lang === 'UK') {
        const otherEnField = lang === 'US' ? 'uk' : 'us';
        form.setFieldValue([...baseName, otherEnField], sourceText);

        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sourceText, targetLang: 'vi', sourceLang: 'en' }),
        });
        const data = await res.json();
        if (res.ok && data.translated) {
          form.setFieldValue([...baseName, 'vi'], data.translated);
        }
      } else {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sourceText, targetLang: 'en', sourceLang: 'vi' }),
        });
        const data = await res.json();
        if (res.ok && data.translated) {
          form.setFieldValue([...baseName, 'us'], data.translated);
          form.setFieldValue([...baseName, 'uk'], data.translated);
        }
      }
      message.success(`Translated ${label} from ${lang}!`);
    } catch {
      message.error('Translation failed.');
    } finally {
      setTranslating(false);
    }
  };

  const translateLabel = lang === 'US' ? 'Translate → UK & VN' : lang === 'UK' ? 'Translate → US & VN' : 'Translate → US & UK';

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-600">{label} (Rich Text)</span>
        <div className="flex items-center gap-2">
          {form && (
            <button
              type="button"
              onClick={handleTranslate}
              disabled={translating}
              className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm"
              style={{ backgroundColor: 'hsl(var(--orange)/0.1)', color: 'hsl(var(--orange))' }}
            >
              {translating ? <LoadingOutlined spin /> : <TranslationOutlined />}
              {translateLabel}
            </button>
          )}
          <LangToggle value={lang} onChange={setLang} />
        </div>
      </div>
      <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-0 overflow-hidden">
        {(['us', 'uk', 'vi'] as const).map((l) => {
          const langKey = l === 'us' ? 'US' : l === 'uk' ? 'UK' : 'VI';
          return (
            <div key={l} style={{ display: lang === langKey ? 'block' : 'none' }}>
              <Form.Item
                name={[...baseName, l]}
                rules={l === 'us' && required ? [{ required: true, message: `${label} (US) is required` }] : []}
                className="mb-0"
              >
                <ReactQuill theme="snow" placeholder={`${label} (${LANG_LABELS[langKey]})…`} />
              </Form.Item>
            </div>
          );
        })}
      </div>
      {/* Quill override styles */}
      <style jsx global>{`
        .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #f3f4f6 !important; background: #fff !important; }
        .ql-container.ql-snow { border: none !important; background: #fff !important; min-height: 120px; }
        .ql-editor { min-height: 120px; }
      `}</style>
    </div>
  );
}

/* ── Base64 Image Upload Helper (single image) ── */
function ImageUploadField({
  value,
  onChange,
  label,
}: {
  value?: string;
  onChange?: (url: string) => void;
  label: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    const { file } = options;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = () => {
        const base64 = reader.result as string;
        onChange?.(base64);
        message.success('Ảnh đã được tải lên!');
        setUploading(false);
      };
      reader.onerror = () => {
        message.error('Đọc file thất bại');
        setUploading(false);
      };
    } catch {
      message.error('Upload thất bại');
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="text-xs font-semibold text-gray-600 block mb-1.5">{label}</span>
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm shrink-0">
            <img src={value} alt={label} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange?.('')}
              className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] hover:bg-red-600"
            >
              <DeleteOutlined />
            </button>
          </div>
        )}
        <Upload
          showUploadList={false}
          customRequest={handleUpload}
          accept="image/*"
        >
          <Button icon={uploading ? <LoadingOutlined spin /> : <UploadOutlined />} loading={uploading} size="small">
            {value ? 'Đổi ảnh' : 'Tải ảnh'}
          </Button>
        </Upload>
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Hoặc dán URL…"
          className="rounded-lg border-gray-200 flex-1"
          size="small"
        />
      </div>
    </div>
  );
}

/* ── Base64 Multi-Image Upload (slider support) ── */
function MultiImageField({
  value,
  onChange,
  label,
  max = 10,
}: {
  value?: string[];
  onChange?: (urls: string[]) => void;
  label: string;
  max?: number;
}) {
  const images = value || [];
  const [uploading, setUploading] = useState(false);

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    const { file } = options;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = () => {
        const base64 = reader.result as string;
        onChange?.([...images, base64]);
        message.success('Ảnh đã được tải lên!');
        setUploading(false);
      };
      reader.onerror = () => {
        message.error('Đọc file thất bại');
        setUploading(false);
      };
    } catch {
      message.error('Upload thất bại');
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    const updated = images.filter((_, i) => i !== idx);
    onChange?.(updated);
  };

  return (
    <div>
      <span className="text-xs font-semibold text-gray-600 block mb-1.5">{label} {images.length > 1 && <span className="text-orange-500">(Slider: {images.length} ảnh)</span>}</span>
      <div className="flex flex-wrap gap-3 mb-2">
        {images.map((url, i) => (
          <div key={i} className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
            <img src={url} alt={`${label} ${i + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <DeleteOutlined />
            </button>
          </div>
        ))}
        {images.length < max && (
          <Upload showUploadList={false} customRequest={handleUpload} accept="image/*">
            <div className="w-24 h-16 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 transition-colors">
              {uploading ? <LoadingOutlined spin className="text-gray-400" /> : <PlusOutlined className="text-gray-400" />}
              <span className="text-[10px] text-gray-400 mt-0.5">Upload</span>
            </div>
          </Upload>
        )}
      </div>
    </div>
  );
}



/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */
export default function AboutEditor() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Revisions & Preview States
  const [previewOpen, setPreviewOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [revisions, setRevisions] = useState<any[]>([]);
  const [fetchingRevisions, setFetchingRevisions] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  /* ── Fetch existing data ── */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/about');
        const json = await res.json();
        if (json.success && json.data) {
          setTimeout(() => form.setFieldsValue(json.data), 0);
          setIsDefault(false);
        } else {
          // Fallback to default
          setTimeout(() => form.setFieldsValue(aboutDefaults), 0);
          setIsDefault(true);
          message.info("No saved data found. Loaded default template.");
        }
      } catch (err) {
        console.error('Failed to load about content:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [form]);

  /* ── Fetch Revisions ── */
  const fetchRevisions = async () => {
    setFetchingRevisions(true);
    try {
      const res = await fetch('/api/admin/about/revisions');
      const json = await res.json();
      if (json.success) setRevisions(json.data);
    } catch {
      message.error("Failed to load revisions");
    } finally {
      setFetchingRevisions(false);
    }
  };

  /* ── Save ── */
  const handleSave = async (note: string = "Manual Update") => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      // Clean up Mongoose fields that shouldn't be sent back
      delete values._id;
      delete values.__v;
      delete values.createdAt;
      delete values.updatedAt;

      // Attach note for revision history
      values._note = note;

      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (json.success) {
        message.success('About page updated successfully!');
        if (isDefault) setIsDefault(false);
        if (historyOpen) fetchRevisions();
      } else {
        message.error(json.error || 'Save failed');
      }
    } catch (err) {
      console.error('Save error:', err);
      message.error('Validation failed. Please check all fields.');
    } finally {
      setSaving(false);
    }
  };

  const showSaveConfirm = () => {
    let note = "";
    Modal.confirm({
      title: 'Save Changes',
      content: (
        <div className="mt-4">
          <p className="mb-2 text-sm">Enter a note for this revision (optional):</p>
          <Input placeholder="e.g., Updated team photos" onChange={(e) => note = e.target.value} />
        </div>
      ),
      onOk: () => handleSave(note || "Admin Update"),
      okText: 'Save',
    });
  };

  const handleSetDefault = (revisionId: string) => {
    Modal.confirm({
      title: 'Đặt làm bản Mặc Định?',
      content: 'Bản này sẽ trở thành mặc định. Khi bấm "Load Default" sẽ khôi phục dữ liệu của bản này. Bản mặc định không thể bị xoá. Bạn có chắc?',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await fetch('/api/admin/about/default', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ revisionId }),
          });
          const json = await res.json();
          if (json.success) {
            message.success('Đã đặt làm bản mặc định!');
            fetchRevisions();
          } else {
            message.error(json.error || 'Thất bại');
          }
        } catch {
          message.error('Lỗi kết nối!');
        }
      }
    });
  };

  const handleEditRevision = (revisionId: string, currentNote: string) => {
    let newNote = currentNote;
    Modal.confirm({
      title: 'Sửa ghi chú',
      content: (
        <div className="mt-3">
          <Input
            defaultValue={currentNote}
            placeholder="Nhập ghi chú mới..."
            onChange={(e) => newNote = e.target.value}
          />
        </div>
      ),
      okText: 'Lưu',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await fetch(`/api/admin/about/revisions?id=${revisionId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note: newNote }),
          });
          const json = await res.json();
          if (json.success) {
            message.success('Đã cập nhật ghi chú!');
            fetchRevisions();
          } else {
            message.error(json.error || 'Cập nhật thất bại');
          }
        } catch {
          message.error('Lỗi kết nối!');
        }
      }
    });
  };

  const fetchDefaultAndSet = async () => {
    try {
      const res = await fetch('/api/admin/about/default');
      const json = await res.json();
      if (json.success && json.data) {
        form.resetFields();
        setTimeout(() => form.setFieldsValue(json.data), 0);
        message.success('Custom Default loaded. Please verify before saving.');
      } else {
        form.resetFields();
        setTimeout(() => form.setFieldsValue(aboutDefaults), 0);
        message.success('Factory Default loaded.');
      }
    } catch {
      form.resetFields();
      setTimeout(() => form.setFieldsValue(aboutDefaults), 0);
      message.error("Failed to load custom default, using factory default.");
    }
  };

  const handleLoadRevisionToForm = (revisionData: any) => {
    form.resetFields();
    setTimeout(() => {
      form.setFieldsValue(revisionData);
      message.info(t('adminAbout.msgBackupLoaded') || 'Backup loaded into form (not saved yet).');
    }, 0);
    setHistoryOpen(false);
  };

  const handleRollback = async (id: string) => {
    Modal.confirm({
      title: 'Confirm Rollback',
      content: 'Are you sure you want to restore this version? Your current work will be backed up.',
      okText: 'Rollback',
      okType: 'danger',
      onOk: async () => {
        try {
          const res = await fetch('/api/admin/about/revisions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ revisionId: id }),
          });
          const json = await res.json();
          if (json.success && json.data) {
            form.setFieldsValue(json.data);
            message.success('Rolled back successfully!');
            fetchRevisions();
          } else {
            message.error(json.error || 'Rollback failed');
          }
        } catch {
          message.error('Rollback request failed');
        }
      }
    });
  };

  const handleDeleteRevision = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/about/revisions?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        message.success('Revision deleted');
        fetchRevisions();
      }
    } catch {
      message.error('Failed to delete revision');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  /* ── Panel Header Helper ── */
  const panelHeader = (icon: React.ReactNode, title: string, subtitle: string) => (
    <div className="flex items-center gap-3 py-1">
      <span className="text-lg" style={{ color: 'hsl(var(--orange))' }}>{icon}</span>
      <div>
        <span className="font-display font-bold text-sm text-gray-800">{title}</span>
        <span className="text-xs text-gray-400 ml-2">{subtitle}</span>
      </div>
    </div>
  );

  /* ── Collapse Items (no deprecated Panel children) ── */
  const collapseItems: CollapseProps['items'] = [
    {
      key: 'hero',
      label: panelHeader(<PictureOutlined />, t('adminAbout.heroSection'), t('adminAbout.heroSectionDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <I18nTextField form={form} baseName={['hero', 'title']} label={t('adminAbout.lblTitle')} required />
          <I18nTextField form={form} baseName={['hero', 'subtitle']} label={t('adminAbout.lblSubtitle')} />
          <I18nTextField form={form} baseName={['hero', 'description']} label={t('adminAbout.lblDescription')} textarea rows={3} />
          <Form.Item name={['hero', 'backgroundImages']} noStyle>
            <MultiImageField label="Background Images (2+ ảnh = slider tự động)" max={10} />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'marquee',
      label: panelHeader(<SoundOutlined />, t('adminAbout.marqueeStrip'), t('adminAbout.marqueeStripDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <p className="text-xs text-gray-400 mb-2">Comma-separated items or one per line. These scroll continuously across the page.</p>
          <Form.List name={['marquee', 'us']}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1"><GlobalOutlined className="text-orange-500" /> US</span>
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({key, ...rest}) => rest)(field)} className="flex-1 mb-0">
                      <Input placeholder={t('adminAbout.phMarqueeUS')} className="rounded-lg border-gray-200" />
                    </Form.Item>
                    <Button icon={<MinusCircleOutlined />} type="text" danger onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add('')} icon={<PlusOutlined />} className="w-full rounded-lg">{t('adminAbout.btnAddItem')}</Button>
              </div>
            )}
          </Form.List>
          <Divider className="my-3" />
          <Form.List name={['marquee', 'vi']}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1"><GlobalOutlined className="text-red-500" /> VN</span>
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({key, ...rest}) => rest)(field)} className="flex-1 mb-0">
                      <Input placeholder="Marquee item (VN)…" className="rounded-lg border-gray-200" />
                    </Form.Item>
                    <Button icon={<MinusCircleOutlined />} type="text" danger onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add('')} icon={<PlusOutlined />} className="w-full rounded-lg">{t('adminAbout.btnAddItem')}</Button>
              </div>
            )}
          </Form.List>
          <Divider className="my-3" />
          <Form.List name={['marquee', 'uk']}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1"><GlobalOutlined className="text-blue-500" /> UK</span>
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({key, ...rest}) => rest)(field)} className="flex-1 mb-0">
                      <Input placeholder={t('adminAbout.phMarqueeUK')} className="rounded-lg border-gray-200" />
                    </Form.Item>
                    <Button icon={<MinusCircleOutlined />} type="text" danger onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add('')} icon={<PlusOutlined />} className="w-full rounded-lg">{t('adminAbout.btnAddItem')}</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: 'welcome',
      label: panelHeader(<SmileOutlined />, t('adminAbout.welcomeMsg'), t('adminAbout.welcomeMsgDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <I18nTextField form={form} baseName={['welcome', 'title']} label={t('adminAbout.lblTitle')} required />
          <I18nRichTextField form={form} baseName={['welcome', 'description']} label={t('adminAbout.lblDescription')} />
          <Divider className="my-3" />
          <SectionLabel>Value Points (displayed on the right)</SectionLabel>
          <Form.List name={['welcome', 'values']}>
            {(fields, { add, remove }) => (
              <div className="space-y-3">
                {fields.map((field, idx) => (
                  <Card key={field.key} size="small" className="border-gray-100 shadow-sm"
                    extra={<Button icon={<MinusCircleOutlined />} type="text" danger size="small" onClick={() => remove(field.name)} />}
                    title={<span className="text-xs font-bold text-gray-500">Value {idx + 1}</span>}
                  >
                    <I18nTextField form={form} listPath={['welcome', 'values']} baseName={[field.name, 'title']} label={t('adminAbout.lblTitle')} />
                    <div className="mt-3">
                      <I18nTextField form={form} listPath={['welcome', 'values']} baseName={[field.name, 'desc']} label={t('adminAbout.lblDescription')} />
                    </div>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add({ title: { us: '', uk: '', vi: '' }, desc: { us: '', uk: '', vi: '' } })} icon={<PlusOutlined />} className="w-full rounded-lg">
                  Add Value Point
                </Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: 'story',
      label: panelHeader(<ReadOutlined />, t('adminAbout.ourStory'), t('adminAbout.ourStoryDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <I18nTextField form={form} baseName={['story', 'label']} label="Section Label" />
          <I18nTextField form={form} baseName={['story', 'heading']} label={t('adminAbout.lblHeading')} required />
          <Divider className="my-2" />
          <I18nRichTextField form={form} baseName={['story', 'content']} label="Story Content" required />
          <Divider className="my-2" />
          <Form.Item name={['story', 'images']} noStyle>
            <MultiImageField label="Story Slideshow Images (rotates every 4s)" max={6} />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'values',
      label: panelHeader(<TrophyOutlined />, t('adminAbout.coreValues'), t('adminAbout.coreValuesDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <I18nTextField form={form} baseName={['values', 'label']} label="Section Label" />
          <I18nTextField form={form} baseName={['values', 'heading']} label={t('adminAbout.lblHeading')} />
          <Divider className="my-2" />
          <Form.List name={['values', 'items']}>
            {(fields, { add, remove }) => (
              <div className="space-y-3">
                {fields.map((field, idx) => (
                  <Card key={field.key} size="small" className="border-gray-100 shadow-sm"
                    extra={<Button icon={<MinusCircleOutlined />} type="text" danger size="small" onClick={() => remove(field.name)} />}
                    title={<span className="text-xs font-bold text-gray-500">Value Card {idx + 1}</span>}
                  >
                    <Form.Item name={[field.name, 'icon']} label="Icon" className="mb-3">
                      <Select options={ICON_OPTIONS} placeholder="Select icon" className="w-full" />
                    </Form.Item>
                    <I18nTextField form={form} listPath={['values', 'items']} baseName={[field.name, 'title']} label={t('adminAbout.lblTitle')} />
                    <div className="mt-3">
                      <I18nTextField form={form} listPath={['values', 'items']} baseName={[field.name, 'desc']} label={t('adminAbout.lblDescription')} />
                    </div>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add({ icon: 'Award', title: { us: '', uk: '', vi: '' }, desc: { us: '', uk: '', vi: '' } })} icon={<PlusOutlined />} className="w-full rounded-lg">
                  Add Value Card
                </Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: 'timeline',
      label: panelHeader(<HistoryOutlined />, t('adminAbout.timeline'), t('adminAbout.timelineDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <I18nTextField form={form} baseName={['timeline', 'label']} label="Section Label" />
          <I18nTextField form={form} baseName={['timeline', 'heading']} label={t('adminAbout.lblHeading')} />
          <Divider className="my-2" />
          <Form.List name={['timeline', 'items']}>
            {(fields, { add, remove }) => (
              <div className="space-y-3">
                {fields.map((field, idx) => (
                  <Card key={field.key} size="small" className="border-gray-100 shadow-sm"
                    extra={<Button icon={<MinusCircleOutlined />} type="text" danger size="small" onClick={() => remove(field.name)} />}
                    title={<span className="text-xs font-bold text-gray-500">Milestone {idx + 1}</span>}
                  >
                    <Form.Item name={[field.name, 'year']} label={t('adminAbout.lblYear')} className="mb-3">
                      <Input placeholder="E.g. 2016, 2018–2020" className="rounded-lg border-gray-200" />
                    </Form.Item>
                    <I18nTextField form={form} listPath={['timeline', 'items']} baseName={[field.name, 'title']} label={t('adminAbout.lblTitle')} />
                    <div className="mt-3">
                      <I18nTextField form={form} listPath={['timeline', 'items']} baseName={[field.name, 'desc']} label={t('adminAbout.lblDescription')} />
                    </div>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add({ year: '', title: { us: '', uk: '', vi: '' }, desc: { us: '', uk: '', vi: '' } })} icon={<PlusOutlined />} className="w-full rounded-lg">
                  Add Milestone
                </Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: 'stats',
      label: panelHeader(<BarChartOutlined />, t('adminAbout.stats'), t('adminAbout.statsDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <I18nTextField form={form} baseName={['stats', 'heading']} label={t('adminAbout.lblHeading')} />
          <I18nTextField form={form} baseName={['stats', 'subtitle']} label={t('adminAbout.lblSubtitle')} textarea rows={2} />

          {/* Stat Cards */}
          <Divider className="my-2" />
          <SectionLabel>Stat Numbers</SectionLabel>
          <Form.List name={['stats', 'items']}>
            {(fields, { add, remove }) => (
              <div className="space-y-3">
                {fields.map((field, idx) => (
                  <Card key={field.key} size="small" className="border-gray-100"
                    extra={<Button icon={<MinusCircleOutlined />} type="text" danger size="small" onClick={() => remove(field.name)} />}
                    title={<span className="text-xs font-bold text-gray-500">Stat {idx + 1}</span>}
                  >
                    <Row gutter={12}>
                      <Col span={8}>
                        <Form.Item name={[field.name, 'value']} label={t('adminAbout.lblValue')} className="mb-2">
                          <Input placeholder="80K" className="rounded-lg border-gray-200" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item name={[field.name, 'suffix']} label="Suffix" className="mb-2">
                          <Input placeholder="m²" className="rounded-lg border-gray-200" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <I18nTextField form={form} listPath={['stats', 'items']} baseName={[field.name, 'label']} label={t('adminAbout.lblLabel')} />
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add({ value: '', suffix: '', label: { us: '', uk: '', vi: '' } })} icon={<PlusOutlined />} className="w-full rounded-lg">
                  Add Stat
                </Button>
              </div>
            )}
          </Form.List>

          {/* HR */}
          <Divider className="my-2" />
          <SectionLabel>Human Resources & R&D</SectionLabel>
          <I18nTextField form={form} baseName={['stats', 'hr', 'heading']} label="HR Section Title" />
          <Form.List name={['stats', 'hr', 'items']}>
            {(fields, { add, remove }) => (
              <div className="space-y-2 mt-2">
                {fields.map((field, idx) => (
                  <div key={field.key} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <I18nTextField form={form} listPath={['stats', 'hr', 'items']} baseName={[field.name]} label={`HR Item ${idx + 1}`} />
                    </div>
                    <Button icon={<MinusCircleOutlined />} type="text" danger onClick={() => remove(field.name)} className="mt-6" />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add({ us: '', uk: '', vi: '' })} icon={<PlusOutlined />} className="w-full rounded-lg">Add HR Item</Button>
              </div>
            )}
          </Form.List>

          {/* Machinery */}
          <Divider className="my-2" />
          <SectionLabel>Key Machinery</SectionLabel>
          <I18nTextField form={form} baseName={['stats', 'machinery', 'heading']} label="Machinery Section Title" />
          <Form.List name={['stats', 'machinery', 'items']}>
            {(fields, { add, remove }) => (
              <div className="space-y-3 mt-2">
                {fields.map((field, idx) => (
                  <div key={field.key} className="flex gap-2 items-start p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                    <div className="w-20 shrink-0">
                      <Form.Item name={[field.name, 'count']} label="Count" className="mb-0">
                        <Input placeholder="15+" className="rounded-lg border-gray-200" />
                      </Form.Item>
                    </div>
                    <div className="flex-1">
                      <I18nTextField form={form} listPath={['stats', 'machinery', 'items']} baseName={[field.name, 'label']} label="Machine Label" />
                    </div>
                    <Button icon={<MinusCircleOutlined />} type="text" danger onClick={() => remove(field.name)} className="mt-6" />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add({ count: '', label: { us: '', uk: '', vi: '' } })} icon={<PlusOutlined />} className="w-full rounded-lg">Add Machine</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: 'team',
      label: panelHeader(<TeamOutlined />, t('adminAbout.team'), t('adminAbout.teamDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <I18nTextField form={form} baseName={['team', 'heading']} label={t('adminAbout.lblHeading')} />
          
          {/* Team Members */}
          <Divider className="my-2" />
          <SectionLabel>{t('adminAbout.team')}</SectionLabel>
          <Form.List name={['team', 'members']}>
            {(fields, { add, remove, move }) => (
              <div className="space-y-3">
                {fields.map((field, idx) => (
                  <Card key={field.key} size="small" className="border-gray-100 shadow-sm"
                    extra={
                      <Space>
                        <Button icon={<UpOutlined />} size="small" onClick={() => move(field.name, field.name - 1)} disabled={field.name === 0} />
                        <Button icon={<DownOutlined />} size="small" onClick={() => move(field.name, field.name + 1)} disabled={field.name === fields.length - 1} />
                        <Button icon={<MinusCircleOutlined />} type="text" danger size="small" onClick={() => remove(field.name)} />
                      </Space>
                    }
                    title={<span className="text-xs font-bold text-gray-500">Member {idx + 1}</span>}
                  >
                    <Row gutter={12}>
                      <Col xs={24} md={8}>
                        <Form.Item name={[field.name, 'name']} label={t('adminAbout.lblName')} className="mb-2">
                          <Input placeholder={t('adminAbout.lblFullName')} className="rounded-lg border-gray-200" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item name={[field.name, 'email']} label={t('adminAbout.lblEmail')} className="mb-2">
                          <Input placeholder="email@company.com" className="rounded-lg border-gray-200" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item name={[field.name, 'phone']} label={t('adminAbout.lblPhone')} className="mb-2">
                          <Input placeholder="+84 xxx" className="rounded-lg border-gray-200" />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Row gutter={12} className="items-center mb-2">
                      <Col xs={12} md={8}>
                        <Form.Item name={[field.name, 'key']} label={t('adminAbout.lblKey')} className="mb-0">
                          <Input placeholder={t('adminAbout.phKey')} className="rounded-lg border-gray-200" />
                        </Form.Item>
                      </Col>
                      <Col xs={12} md={8} className="pt-7">
                        <Form.Item name={[field.name, 'isLeader']} valuePropName="checked" className="mb-0">
                          <Checkbox className="font-medium text-orange-600">{t('adminAbout.lblFeaturedLeader')}</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item name={[field.name, 'image']} noStyle>
                      <ImageUploadField label="Profile Photo" />
                    </Form.Item>
                    <div className="mt-3">
                      <I18nTextField form={form} listPath={['team', 'members']} baseName={[field.name, 'role']} label="Role / Title" />
                    </div>
                    <div className="mt-3">
                      <I18nTextField form={form} listPath={['team', 'members']} baseName={[field.name, 'quote']} label={t('adminAbout.lblQuote')} textarea rows={2} />
                    </div>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add({
                  name: '', key: '', isLeader: false, email: '', phone: '', image: '',
                  role: { us: '', uk: '', vi: '' }, quote: { us: '', uk: '', vi: '' },
                })} icon={<PlusOutlined />} className="w-full rounded-lg">
                  Add Team Member
                </Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: 'locations',
      label: panelHeader(<EnvironmentOutlined />, t('adminAbout.locations'), t('adminAbout.locationsDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <I18nTextField form={form} baseName={['locations', 'heading']} label={t('adminAbout.lblHeading')} />
          <Divider className="my-2" />
          <Form.List name={['locations', 'items']}>
            {(fields, { add, remove }) => (
              <div className="space-y-3">
                {fields.map((field, idx) => (
                  <Card key={field.key} size="small" className="border-gray-100 shadow-sm"
                    extra={<Button icon={<MinusCircleOutlined />} type="text" danger size="small" onClick={() => remove(field.name)} />}
                    title={<span className="text-xs font-bold text-gray-500">Location {idx + 1}</span>}
                  >
                    <Form.Item name={[field.name, 'key']} label="Key" className="mb-3">
                      <Input placeholder="factory, office, showroom…" className="rounded-lg border-gray-200" />
                    </Form.Item>
                    <I18nTextField form={form} listPath={['locations', 'items']} baseName={[field.name, 'name']} label={t('adminAbout.lblLocation')} />
                    <div className="mt-3">
                      <I18nTextField form={form} listPath={['locations', 'items']} baseName={[field.name, 'address']} label={t('adminAbout.lblAddress')} textarea rows={2} />
                    </div>
                    <Form.Item name={[field.name, 'hotline']} label="Hotline" className="mt-3 mb-0">
                      <Input placeholder="Hotline: +84 xxx xxx xxx" className="rounded-lg border-gray-200" />
                    </Form.Item>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add({
                  key: '', hotline: '',
                  name: { us: '', uk: '', vi: '' }, address: { us: '', uk: '', vi: '' },
                })} icon={<PlusOutlined />} className="w-full rounded-lg">
                  Add Location
                </Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: 'cta',
      label: panelHeader(<RocketOutlined />, t('adminAbout.cta'), t('adminAbout.ctaDesc')),
      className: 'mb-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm',
      style: { background: '#fff' },
      children: (
        <div className="space-y-4 p-2">
          <I18nTextField form={form} baseName={['cta', 'heading']} label={t('adminAbout.lblHeading')} />
          <I18nTextField form={form} baseName={['cta', 'button']} label={t('adminAbout.lblButtonText')} />
        </div>
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical" className="relative">
      {isDefault && (
        <Alert 
          message={t("adminAbout.noCustomData")} 
          description={t("adminAbout.noCustomDataDesc")} 
          type="warning" showIcon className="mb-4 rounded-xl border-orange-200 bg-orange-50" 
        />
      )}
      
      {/* ── Sticky Header ── */}
      <div
        className="sticky top-[80px] z-20 bg-white/95 backdrop-blur-md border-b px-4 sm:px-6 py-4 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        style={{ borderColor: 'hsl(var(--navy)/0.06)' }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 m-0 leading-tight font-display">
            {t("adminAbout.title")}
          </h1>
          <p className="text-[13px] m-0 mt-1 text-gray-500">
            {t("adminAbout.description")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            icon={<FileTextOutlined />}
            onClick={() => {
              Modal.confirm({
                title: 'Load Default Template?',
                content: 'This will replace all current inputs with the custom default template (or factory default if none set). You still need to click "Save All" to apply changes. Are you sure?',
                okText: 'Yes, load defaults',
                cancelText: 'Cancel',
                onOk: fetchDefaultAndSet
              });
            }}
            className="rounded-lg border-gray-200"
          >
            {t("adminAbout.loadDefault")}
          </Button>
          <Button
            icon={<HistoryOutlined />}
            onClick={() => { setHistoryOpen(true); fetchRevisions(); }}
            className="rounded-lg border-gray-200"
          >
            {t("adminAbout.history")}
          </Button>
          <Button
            icon={<EyeOutlined />}
            onClick={() => setPreviewOpen(true)}
            className="rounded-lg border-gray-200"
          >
            {t("adminAbout.preview")}
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={showSaveConfirm}
            size="large"
            className="rounded-lg border-none font-semibold px-6 shadow-md"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            {t("adminAbout.saveAll")}
          </Button>
        </div>
      </div>

      {/* ── Sections Organized into Tabs ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <Tabs
          defaultActiveKey="main"
          size="large"
          className="admin-about-tabs"
          tabBarStyle={{ padding: '0 24px', marginBottom: 0, backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0' }}
          items={[
            {
              key: 'main',
              label: <span className="font-semibold text-[15px] px-2"><PictureOutlined className="mr-2"/>{t("adminAbout.tabMain")}</span>,
              children: <div className="p-6 bg-gray-50/30"><Collapse defaultActiveKey={['hero']} items={collapseItems.filter(i => ['hero', 'marquee', 'cta'].includes(i.key as string))} className="about-editor-collapse" style={{ background: 'transparent', border: 'none' }} /></div>
            },
            {
              key: 'story',
              label: <span className="font-semibold text-[15px] px-2"><ReadOutlined className="mr-2"/>{t("adminAbout.tabStory")}</span>,
              children: <div className="p-6 bg-gray-50/30"><Collapse defaultActiveKey={['welcome', 'story']} items={collapseItems.filter(i => ['welcome', 'story', 'values', 'timeline'].includes(i.key as string))} className="about-editor-collapse" style={{ background: 'transparent', border: 'none' }} /></div>
            },
            {
              key: 'team',
              label: <span className="font-semibold text-[15px] px-2"><TeamOutlined className="mr-2"/>{t("adminAbout.tabTeam")}</span>,
              children: <div className="p-6 bg-gray-50/30"><Collapse defaultActiveKey={['stats', 'team']} items={collapseItems.filter(i => ['stats', 'team', 'locations'].includes(i.key as string))} className="about-editor-collapse" style={{ background: 'transparent', border: 'none' }} /></div>
            }
          ]}
        />
      </div>

      {/* ── Bottom Save Bar ── */}
      <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t mt-6 py-4 -mx-6 md:-mx-8 px-6 md:px-8 flex justify-end"
        style={{ borderColor: 'hsl(var(--navy)/0.06)' }}>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          loading={saving}
          onClick={showSaveConfirm}
          size="large"
          className="rounded-lg border-none font-semibold px-8 shadow-md"
          style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
        >
          Save All Changes
        </Button>
      </div>

      {/* ── Fullscreen Preview Modal ── */}
      <Modal
        title="Live Preview"
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={null}
        width="100%"
        style={{ top: 0, padding: 0, margin: 0, height: '100vh', maxWidth: '100vw' }}
        styles={{ body: { height: 'calc(100vh - 55px)', padding: 0, overflow: 'hidden' } }}
        className="full-screen-modal"
      >
        <iframe src="/about" className="w-full h-full border-none" title="About Preview" />
      </Modal>

      {/* ── Revisions Drawer ── */}
      <Drawer
        title="Revision History"
        placement="right"
        onClose={() => setHistoryOpen(false)}
        open={historyOpen}
        size="default"
      >
        {fetchingRevisions ? (
          <div className="flex justify-center p-10"><Spin /></div>
        ) : revisions.length > 0 ? (
          <div className="flex flex-col gap-1">
            {revisions.map((item, index) => (
              <div key={item._id || index} className={`rounded-xl border p-3 transition-colors ${
                item.isDefault 
                  ? 'border-orange-300 bg-orange-50/50' 
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}>
                {/* Row 1: Title + badges */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-sm text-gray-800 truncate flex-1">
                    {item.note || 'No note'}
                  </span>
                  {index === 0 && <span className="text-[10px] text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full font-bold shrink-0">Latest</span>}
                  {item.isDefault && <span className="text-[10px] text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full font-bold shrink-0">★ Mặc định</span>}
                </div>
                {/* Row 2: Metadata */}
                <div className="text-[11px] text-gray-400 mb-2.5">
                  {new Date(item.createdAt).toLocaleString()} · {item.createdBy}
                </div>
                {/* Row 3: Actions */}
                <div className="flex items-center gap-1 flex-wrap">
                  <Popconfirm title={t('adminAbout.revRestoreTitle')} description={t('adminAbout.revRestoreDesc')} onConfirm={() => handleRollback(item._id)} okText={t('adminAbout.btnOk')} cancelText={t('adminAbout.btnCancel')}>
                    <Button size="small" type="default" icon={<RollbackOutlined />} className="rounded-lg text-xs">{t('adminAbout.revRestoreBtn')}</Button>
                  </Popconfirm>
                  <Button 
                    size="small" 
                    type="default" 
                    icon={<FormOutlined />} 
                    onClick={() => handleLoadRevisionToForm(item.data)} 
                    className="rounded-lg text-xs text-blue-600 border-blue-200 hover:border-blue-400"
                  >
                    {t('adminAbout.revEditLoadBtn') || 'Sửa (Tải vào form)'}
                  </Button>
                  <Button size="small" type="default" icon={<EditOutlined />} onClick={() => handleEditRevision(item._id, item.note || '')} className="rounded-lg text-xs">{t('adminAbout.revEditBtn')}</Button>
                  {item.isDefault ? (
                    <Tooltip title={t('adminAbout.revDefaultTooltip')}>
                      <Button size="small" disabled icon={<StarOutlined />} className="rounded-lg text-xs">{t('adminAbout.revDefaultBtn')}</Button>
                    </Tooltip>
                  ) : (
                    <>
                      <Popconfirm title={t('adminAbout.revDefaultTitle')} description={t('adminAbout.revDefaultDesc')} onConfirm={() => handleSetDefault(item._id)} okText={t('adminAbout.btnOk')} cancelText={t('adminAbout.btnCancel')}>
                        <Button size="small" type="default" icon={<StarOutlined />} className="rounded-lg text-xs text-orange-500 border-orange-200 hover:border-orange-400">{t('adminAbout.revDefaultBtn')}</Button>
                      </Popconfirm>
                      <Popconfirm title={t('adminAbout.revDeleteTitle')} description={t('adminAbout.revDeleteDesc')} onConfirm={() => handleDeleteRevision(item._id)} okText={t('adminAbout.revDeleteBtn')} cancelText={t('adminAbout.btnCancel')}>
                        <Button size="small" type="text" danger icon={<DeleteOutlined />} className="rounded-lg text-xs" />
                      </Popconfirm>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">{t('adminAbout.noCustomData')}</div>
        )}
      </Drawer>

      {/* ── Custom Collapse Styles ── */}
      <style jsx global>{`
        .full-screen-modal .ant-modal-content {
          border-radius: 0;
          height: 100vh;
        }
        .about-editor-collapse .ant-collapse-item {
          border: none !important;
        }
        .about-editor-collapse .ant-collapse-header {
          padding: 12px 16px !important;
          border-radius: 12px !important;
          font-size: 14px;
        }
        .about-editor-collapse .ant-collapse-content-box {
          padding: 16px !important;
        }
        .about-editor-collapse > .ant-collapse-item > .ant-collapse-header:hover {
          background: hsl(var(--orange) / 0.04) !important;
        }
        .about-editor-collapse > .ant-collapse-item-active > .ant-collapse-header {
          background: hsl(var(--orange) / 0.06) !important;
        }
      `}</style>
    </Form>
  );
}
