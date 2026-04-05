import React, { useEffect, useState } from 'react';
import {
  Collapse, Form, Input, Button, message, Space, Tooltip, Modal, Spin,
  Typography, Drawer, Popconfirm, Tabs, Card, Row, Col, Divider, Select
} from 'antd';
import {
  SaveOutlined, GlobalOutlined, TranslationOutlined,
  DeleteOutlined, PlusOutlined, UpOutlined, DownOutlined,
  HistoryOutlined, RollbackOutlined, StarOutlined, EditOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
const { TextArea } = Input;

import { LoadingOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

// Reusable Label
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }} />
    <span className="font-display text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--navy)/0.55)' }}>
      {children}
    </span>
  </div>
);

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

function I18nTextField({
  baseName, listPath, absoluteListPath, label, textarea = false, rows = 3, required = false, form
}: {
  baseName: (string | number)[]; listPath?: (string | number)[]; absoluteListPath?: (string | number)[]; label: string;
  textarea?: boolean; rows?: number; required?: boolean; form?: import('antd').FormInstance;
}) {
  const [lang, setLang] = useState<Lang>('US');
  const [translating, setTranslating] = useState(false);
  const InputComp = textarea ? TextArea : Input;

  const getPath = (langKey: string) => listPath ? [...listPath, ...baseName, langKey] : [...baseName, langKey];
  const getAbsPath = (langKey: string) => absoluteListPath ? [...absoluteListPath, ...getPath(langKey)] : getPath(langKey);

  const handleTranslate = async () => {
    if (!form) return;
    const usVal = form.getFieldValue(getAbsPath('us')) || '';
    const ukVal = form.getFieldValue(getAbsPath('uk')) || '';
    const viVal = form.getFieldValue(getAbsPath('vi')) || '';
    
    let sourceText = lang === 'US' ? usVal : lang === 'UK' ? ukVal : viVal;
    if (!sourceText.trim()) {
      message.warning('Vui lòng nhập văn bản trước khi dịch.');
      return;
    }

    setTranslating(true);
    try {
      if (lang === 'US' || lang === 'UK') {
        const otherEnField = lang === 'US' ? 'uk' : 'us';
        form.setFieldValue(getAbsPath(otherEnField), sourceText);

        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sourceText, targetLang: 'vi', sourceLang: 'en' }),
        });
        const data = await res.json();
        if (res.ok && data.translated) {
          form.setFieldValue(getAbsPath('vi'), data.translated);
        }
      } else {
        const res2 = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sourceText, targetLang: 'en', sourceLang: 'vi' }),
        });
        const data2 = await res2.json();
        if (res2.ok && data2.translated) {
          form.setFieldValue(getAbsPath('us'), data2.translated);
          form.setFieldValue(getAbsPath('uk'), data2.translated);
        }
      }
      message.success(`Đã dịch từ ${lang}!`);
    } catch {
      message.error('Lỗi khi dịch.');
    } finally {
      setTranslating(false);
    }
  };

  const translateLabel = lang === 'US' ? 'Translate từ US sang UK & VN' : lang === 'UK' ? 'Translate từ UK sang US & VN' : 'Translate từ VN sang US & UK';


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
      <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3 space-y-0 mb-4">
        <div style={{ display: lang === 'US' ? 'block' : 'none' }}>
           <Form.Item name={getPath('us')} className="mb-0"><InputComp placeholder={`${label} (US)...`} rows={rows} /></Form.Item>
        </div>
        <div style={{ display: lang === 'UK' ? 'block' : 'none' }}>
           <Form.Item name={getPath('uk')} className="mb-0"><InputComp placeholder={`${label} (UK)...`} rows={rows} /></Form.Item>
        </div>
        <div style={{ display: lang === 'VI' ? 'block' : 'none' }}>
           <Form.Item name={getPath('vi')} className="mb-0"><InputComp placeholder={`${label} (VN)...`} rows={rows} /></Form.Item>
        </div>
      </div>
    </div>
  );
}

function I18nRichTextField({
  baseName, listPath, absoluteListPath, label, required = false, form
}: {
  baseName: (string | number)[]; listPath?: (string | number)[]; absoluteListPath?: (string | number)[]; label: string;
  required?: boolean; form?: import('antd').FormInstance;
}) {
  const [lang, setLang] = useState<Lang>('US');
  const [translating, setTranslating] = useState(false);

  const getPath = (langKey: string) => listPath ? [...listPath, ...baseName, langKey] : [...baseName, langKey];
  const getAbsPath = (langKey: string) => absoluteListPath ? [...absoluteListPath, ...getPath(langKey)] : getPath(langKey);

  const handleTranslate = async () => {
    if (!form) return;
    const usVal = form.getFieldValue(getAbsPath('us')) || '';
    const ukVal = form.getFieldValue(getAbsPath('uk')) || '';
    const viVal = form.getFieldValue(getAbsPath('vi')) || '';

    let sourceText = lang === 'US' ? usVal : lang === 'UK' ? ukVal : viVal;
    const strippedText = sourceText.replace(/<[^>]*>?/gm, '').trim();
    if (!strippedText) {
      message.warning('Vui lòng nhập văn bản trước khi dịch.');
      return;
    }

    setTranslating(true);
    try {
      if (lang === 'US' || lang === 'UK') {
        const otherEnField = lang === 'US' ? 'uk' : 'us';
        form.setFieldValue(getAbsPath(otherEnField), sourceText);

        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sourceText, targetLang: 'vi', sourceLang: 'en' }),
        });
        const data = await res.json();
        if (res.ok && data.translated) {
          form.setFieldValue(getAbsPath('vi'), data.translated);
        }
      } else {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sourceText, targetLang: 'en', sourceLang: 'vi' }),
        });
        const data = await res.json();
        if (res.ok && data.translated) {
          form.setFieldValue(getAbsPath('us'), data.translated);
          form.setFieldValue(getAbsPath('uk'), data.translated);
        }
      }
      message.success(`Đã dịch từ ${lang}!`);
    } catch {
      message.error('Lỗi khi dịch.');
    } finally {
      setTranslating(false);
    }
  };

  const translateLabel = lang === 'US' ? 'Translate từ US sang UK & VN' : lang === 'UK' ? 'Translate từ UK sang US & VN' : 'Translate từ VN sang US & UK';


  return (
    <div className="mb-4">
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
        <div style={{ display: lang === 'US' ? 'block' : 'none' }}>
           <Form.Item name={getPath('us')} className="mb-0"><ReactQuill theme="snow" placeholder={`${label} (US)...`} /></Form.Item>
        </div>
        <div style={{ display: lang === 'UK' ? 'block' : 'none' }}>
           <Form.Item name={getPath('uk')} className="mb-0"><ReactQuill theme="snow" placeholder={`${label} (UK)...`} /></Form.Item>
        </div>
        <div style={{ display: lang === 'VI' ? 'block' : 'none' }}>
           <Form.Item name={getPath('vi')} className="mb-0"><ReactQuill theme="snow" placeholder={`${label} (VN)...`} /></Form.Item>
        </div>
      </div>
      <style jsx global>{`
        .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #f3f4f6 !important; background: #fff !important; }
        .ql-container.ql-snow { border: none !important; background: #fff !important; min-height: 120px; }
        .ql-editor { min-height: 120px; }
      `}</style>
    </div>
  );
}

// ───────────────────────────────────────────────
// HISTORY DRAWER
// ───────────────────────────────────────────────
function HistoryDrawer({ open, onClose, onRestore, t }: {
  open: boolean;
  onClose: () => void;
  onRestore: (doc: any) => void;
  t: any;
}) {
  const [revisions, setRevisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRevisions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contact/revisions');
      const data = await res.json();
      if (data.success) setRevisions(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchRevisions();
  }, [open]);

  const doRollback = async (revId: string) => {
    try {
      const res = await fetch('/api/admin/contact/revisions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revisionId: revId })
      });
      const data = await res.json();
      if (data.success) {
        message.success(t('admin.adminContact.msgRestoreSuccess'));
        onRestore(data.data);
        onClose();
      } else throw new Error();
    } catch {
      message.error(t('admin.adminContact.msgRestoreError'));
    }
  };

  const doDelete = async (revId: string) => {
    try {
      const res = await fetch(`/api/admin/contact/revisions?id=${revId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        message.success(t('admin.adminContact.msgDeleteSuccess'));
        fetchRevisions();
      } else message.error(data.error);
    } catch {
      message.error(t('admin.adminContact.msgDeleteError'));
    }
  };

  const doSetDefault = async (revId: string) => {
    try {
      const res = await fetch('/api/admin/contact/default', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revisionId: revId })
      });
      const data = await res.json();
      if (data.success) {
        message.success(data.message);
        fetchRevisions();
      } else message.error(data.error);
    } catch {
      message.error(t('admin.adminContact.msgDefaultError'));
    }
  };

  const handleEditNote = (revId: string, currentNote: string) => {
    let newNote = currentNote;
    Modal.confirm({
      title: t('admin.adminContact.revEditLoad'),
      content: (
        <div className="mt-3">
          <Input
            defaultValue={currentNote}
            placeholder={t('admin.adminContact.notePlaceholder')}
            onChange={(e) => newNote = e.target.value}
          />
        </div>
      ),
      okText: t('adminAbout.btnOk'),
      cancelText: t('adminAbout.btnCancel'),
      onOk: async () => {
        try {
          const res = await fetch(`/api/admin/contact/revisions?id=${revId}`, {
            method: 'PATCH', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note: newNote })
          });
          const data = await res.json();
          if (data.success) {
            message.success(t('admin.adminContact.msgSaveSuccess'));
            fetchRevisions();
          } else message.error(data.error);
        } catch {
          message.error(t('admin.adminContact.msgNoteError'));
        }
      }
    });
  };

  return (
    <Drawer title={t('adminAbout.history')} placement="right" onClose={onClose} open={open} size="default">
      {loading ? (
        <div className="flex justify-center p-10"><Spin /></div>
      ) : revisions.length > 0 ? (
        <div className="flex flex-col gap-1">
          {revisions.map((rev, index) => (
            <div key={rev._id} className={`rounded-xl border p-3 transition-colors ${
              rev.isDefault 
                ? 'border-orange-300 bg-orange-50/50' 
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}>
              {/* Row 1: Title + badges */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-semibold text-sm text-gray-800 truncate flex-1">
                  {rev.note || t('admin.adminContact.revNoNote')}
                </span>
                {index === 0 && <span className="text-[10px] text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full font-bold shrink-0">Latest</span>}
                {rev.isDefault && <span className="text-[10px] text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full font-bold shrink-0">★ Default</span>}
              </div>
              {/* Row 2: Metadata */}
              <div className="text-[11px] text-gray-400 mb-2.5">
                {new Date(rev.createdAt).toLocaleString()} · {rev.createdBy}
              </div>
              {/* Row 3: Actions */}
              <div className="flex items-center gap-1 flex-wrap">
                <PopconfirmStyled
                  title={t('adminAbout.revRestoreTitle')}
                  description={t('adminAbout.revRestoreDesc')}
                  onConfirm={() => doRollback(rev._id)}
                  okText={t('adminAbout.btnOk')}
                  cancelText={t('adminAbout.btnCancel')}
                >
                  <Button size="small" type="default" icon={<RollbackOutlined />} className="rounded-lg text-xs">{t('adminAbout.revRestoreBtn')}</Button>
                </PopconfirmStyled>

                <Button size="small" type="default" icon={<EditOutlined />} onClick={() => handleEditNote(rev._id, rev.note || '')} className="rounded-lg text-xs">{t('adminAbout.revEditBtn')}</Button>

                <Button size="small" type="default" icon={<EditOutlined />} className="rounded-lg text-xs text-blue-500 border-blue-200 hover:border-blue-400" onClick={() => {
                  if (rev.data) {
                    onRestore(rev.data);
                    onClose();
                  } else {
                    message.error(t('admin.adminContact.msgRestoreError'));
                  }
                }}>{t('admin.adminContact.revEditLoad')}</Button>

                {rev.isDefault ? (
                  <Tooltip title={t('adminAbout.revDefaultTooltip')}>
                    <Button size="small" disabled icon={<StarOutlined />} className="rounded-lg text-xs">{t('adminAbout.revDefaultBtn')}</Button>
                  </Tooltip>
                ) : (
                  <>
                    <PopconfirmStyled title={t('adminAbout.revDefaultTitle')} description={t('adminAbout.revDefaultDesc')} onConfirm={() => doSetDefault(rev._id)} okText={t('adminAbout.btnOk')} cancelText={t('adminAbout.btnCancel')}>
                      <Button size="small" type="default" icon={<StarOutlined />} className="rounded-lg text-xs text-orange-500 border-orange-200 hover:border-orange-400">{t('adminAbout.revDefaultBtn')}</Button>
                    </PopconfirmStyled>
                    <PopconfirmStyled title={t('adminAbout.revDeleteTitle')} description={t('adminAbout.revDeleteDesc')} onConfirm={() => doDelete(rev._id)} okText={t('adminAbout.revDeleteBtn')} cancelText={t('adminAbout.btnCancel')}>
                      <Button size="small" type="text" danger icon={<DeleteOutlined />} className="rounded-lg text-xs" />
                    </PopconfirmStyled>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10">{t('admin.adminContact.revNoHistory')}</div>
      )}
    </Drawer>
  );
}

// Wrapper so Popconfirm works the same as in AboutEditor
const PopconfirmStyled = Popconfirm;

// ───────────────────────────────────────────────
// MAIN EDITOR & TABS
// ───────────────────────────────────────────────
const SEOHeroTab = ({ form, t }: { form: any, t: any }) => (
  <div className="space-y-8">
    <Card variant="borderless" className="shadow-sm">
      <SectionLabel>{t('admin.adminContact.sectionSeo')}</SectionLabel>
      <I18nTextField form={form} baseName={['seo', 'title']} listPath={[]} label={t('adminAbout.lblTitle')} />
      <I18nTextField form={form} baseName={['seo', 'description']} listPath={[]} textarea label={t('adminAbout.lblDescription')} />
    </Card>
    <Card variant="borderless" className="shadow-sm">
      <SectionLabel>{t('admin.adminContact.sectionHero')}</SectionLabel>
      <I18nRichTextField form={form} baseName={['hero', 'title']} listPath={[]} label={t('adminAbout.lblTitle')} />
      <I18nRichTextField form={form} baseName={['hero', 'subtitle']} listPath={[]} label={t('adminAbout.lblSubtitle')} />
    </Card>
  </div>
);

const LocationsTab = ({ form, t }: { form: any, t: any }) => (
  <Card variant="borderless" className="shadow-sm">
    <SectionLabel>{t('admin.adminContact.tabLocations')}</SectionLabel>
    <I18nRichTextField form={form} baseName={['locations', 'heading']} label={t('adminAbout.lblHeading')} />
    <Form.List name={['locations', 'items']}>
      {(fields, { add, remove, move }) => (
        <div className="mt-4 border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
          {fields.map((field, idx) => (
            <div key={field.name} className="bg-white p-4 rounded-md shadow-sm border border-gray-100 mb-4 relative">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button size="small" onClick={() => move(idx, idx - 1)} disabled={idx === 0} icon={<UpOutlined />} />
                <Button size="small" onClick={() => move(idx, idx + 1)} disabled={idx === fields.length - 1} icon={<DownOutlined />} />
                <Button size="small" danger onClick={() => remove(field.name)} icon={<DeleteOutlined />} />
              </div>
              <Space className="w-full mb-4">
                <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">Location #{idx + 1}</span>
              </Space>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name={[field.name, 'key']} hidden><Input /></Form.Item>
                  <Form.Item name={[field.name, 'phone']} label={t('adminAbout.lblPhone')}><Input /></Form.Item>
                  <Form.Item name={[field.name, 'href']} label={t('adminAbout.lblMapUrl')}><Input /></Form.Item>
                </Col>
                <Col span={12}>
                  <I18nRichTextField form={form} absoluteListPath={['locations', 'items']} listPath={[field.name]} baseName={['title']} label={t('adminAbout.lblTitle')} />
                  <I18nRichTextField form={form} absoluteListPath={['locations', 'items']} listPath={[field.name]} baseName={['subtitle']} label={t('adminAbout.lblSubtitle')} />
                </Col>
              </Row>
              <I18nRichTextField form={form} absoluteListPath={['locations', 'items']} listPath={[field.name]} baseName={['address']} label={t('adminAbout.lblAddress')} />
              <I18nRichTextField form={form} absoluteListPath={['locations', 'items']} listPath={[field.name]} baseName={['hours']} label={t('admin.adminContact.lblWorkingHours')} />
            </div>
          ))}
          <Button type="dashed" onClick={() => add({ key: Math.random().toString(36).substring(7) })} block icon={<PlusOutlined />} className="h-12 border-orange/30 text-orange bg-orange/5 hover:bg-orange/10">
            {t('adminAbout.btnAddLocation')}
          </Button>
        </div>
      )}
    </Form.List>
  </Card>
);

const FormTab = ({ form, t }: { form: any, t: any }) => (
  <div className="space-y-8">
    <Card variant="borderless" className="shadow-sm">
      <SectionLabel>{t('admin.adminContact.sectionFormTexts')}</SectionLabel>
      <I18nRichTextField form={form} baseName={['formSection', 'title']} label={t('adminAbout.lblTitle')} />
      <I18nRichTextField form={form} baseName={['formSection', 'subtitle']} label={t('adminAbout.lblSubtitle')} />
      <Divider />
      <SectionLabel>{t('admin.adminContact.sectionSuccessMsg')}</SectionLabel>
      <I18nRichTextField form={form} baseName={['formSection', 'successTitle']} label={t('admin.adminContact.lblSuccessTitle')} />
      <I18nRichTextField form={form} baseName={['formSection', 'successDesc']} label={t('admin.adminContact.lblSuccessDesc')} />
      <I18nRichTextField form={form} baseName={['formSection', 'sendAnotherBtn']} label={t('admin.adminContact.lblSendAnotherBtn')} />
    </Card>
    
    <Card variant="borderless" className="shadow-sm">
      <SectionLabel>{t('admin.adminContact.sectionFormButtons')}</SectionLabel>
      <Row gutter={16}>
        <Col span={12}>
           <I18nRichTextField form={form} baseName={['formSection', 'labels', 'sendBtn']} label={t('admin.adminContact.lblSendBtnText')} />
        </Col>
        <Col span={12}>
           <I18nRichTextField form={form} baseName={['formSection', 'labels', 'sendingBtn']} label={t('admin.adminContact.lblSendingBtnText')} />
        </Col>
      </Row>
    </Card>

    <Card variant="borderless" className="shadow-sm">
      <SectionLabel>{t('admin.adminContact.sectionDynamicFields')}</SectionLabel>
      <Form.List name={['formSection', 'fields']}>
        {(fields, { add, remove, move }) => (
          <div className="mt-4 border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
            {fields.map((field, idx) => (
              <div key={field.name} className="bg-white p-4 rounded-md shadow-sm border border-gray-100 mb-4 relative">
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <Button size="small" onClick={() => move(idx, idx - 1)} disabled={idx === 0} icon={<UpOutlined />} />
                  <Button size="small" onClick={() => move(idx, idx + 1)} disabled={idx === fields.length - 1} icon={<DownOutlined />} />
                  <Button size="small" danger onClick={() => remove(field.name)} icon={<DeleteOutlined />} />
                </div>
                <Space className="w-full mb-4">
                  <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">{t('admin.adminContact.lblFieldNum', { num: idx + 1 })}</span>
                </Space>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item name={[field.name, 'id']} hidden><Input /></Form.Item>
                    <Form.Item name={[field.name, 'key']} label={t('admin.adminContact.lblUniqueKey')} rules={[{ required: true }]}>
                       <Input placeholder="name" />
                    </Form.Item>
                    <Form.Item name={[field.name, 'type']} label={t('admin.adminContact.lblFieldType')} rules={[{ required: true }]}>
                       <Select>
                          <Select.Option value="text">{t('admin.adminContact.optText')}</Select.Option>
                          <Select.Option value="email">{t('admin.adminContact.optEmail')}</Select.Option>
                          <Select.Option value="tel">{t('admin.adminContact.optPhone')}</Select.Option>
                          <Select.Option value="textarea">{t('admin.adminContact.optTextarea')}</Select.Option>
                          <Select.Option value="category">{t('admin.adminContact.optCategory')}</Select.Option>
                          <Select.Option value="select">{t('admin.adminContact.optSelect')}</Select.Option>
                       </Select>
                    </Form.Item>
                    <div className="flex gap-4">
                      <Form.Item name={[field.name, 'width']} label={t('admin.adminContact.lblWidth')} rules={[{ required: true }]} initialValue="full">
                         <Select>
                            <Select.Option value="half">{t('admin.adminContact.optHalfWidth')}</Select.Option>
                            <Select.Option value="full">{t('admin.adminContact.optFullWidth')}</Select.Option>
                         </Select>
                      </Form.Item>
                      <Form.Item name={[field.name, 'required']} label={t('admin.adminContact.lblRequired')} valuePropName="checked" initialValue={false}>
                         <Select>
                            <Select.Option value={true}>{t('admin.adminContact.optYes')}</Select.Option>
                            <Select.Option value={false}>{t('admin.adminContact.optNo')}</Select.Option>
                         </Select>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={16}>
                    <I18nRichTextField form={form} absoluteListPath={['formSection', 'fields']} listPath={[field.name]} baseName={['label']} label={t('admin.adminContact.lblFieldLabel')} />
                  </Col>
                </Row>
                
                <Form.Item noStyle shouldUpdate={(prev, current) => {
                  const prevType = prev?.formSection?.fields?.[field.name]?.type;
                  const currentType = current?.formSection?.fields?.[field.name]?.type;
                  return prevType !== currentType;
                }}>
                  {() => {
                     const isSelect = form.getFieldValue(['formSection', 'fields', field.name, 'type']) === 'select';
                     if (!isSelect) return null;
                     return (
                       <Form.List name={[field.name, 'options']}>
                         {(optionFields, optList) => (
                            <div className="mt-4 p-4 border rounded-sm bg-gray-50/50">
                               <p className="font-semibold text-sm mb-2 text-navy-deep">{t('admin.adminContact.lblCustomOptions')}</p>
                               {optionFields.map((opt, optIdx) => (
                                  <div key={opt.name} className="flex gap-4 items-start mb-2">
                                     <Form.Item name={[opt.name, 'key']} rules={[{required: true}]} className="mb-0 flex-1">
                                        <Input placeholder={t('admin.adminContact.phOptionValue')} />
                                     </Form.Item>
                                     <div className="flex-1">
                                        <Form.Item name={[opt.name, 'label', 'vi']} rules={[{required: true}]} className="mb-1"><Input placeholder="Label VI" /></Form.Item>
                                        <Form.Item name={[opt.name, 'label', 'us']} rules={[{required: true}]} className="mb-1"><Input placeholder="Label US" /></Form.Item>
                                        <Form.Item name={[opt.name, 'label', 'uk']} rules={[{required: true}]} className="mb-0"><Input placeholder="Label UK" /></Form.Item>
                                     </div>
                                     <Button danger icon={<DeleteOutlined />} onClick={() => optList.remove(opt.name)} />
                                  </div>
                               ))}
                               <Button type="dashed" onClick={() => optList.add({ key: 'opt_' + Math.random().toString(36).substring(7) })} icon={<PlusOutlined />} size="small" className="mt-2 text-orange">{t('admin.adminContact.btnAddOption')}</Button>
                            </div>
                         )}
                       </Form.List>
                     )
                  }}
                </Form.Item>

              </div>
            ))}
            <Button type="dashed" onClick={() => add({ id: Math.random().toString(36).substring(7), key: 'field_' + Math.random().toString(36).substring(7), type: 'text', width: 'full', required: false })} block icon={<PlusOutlined />} className="h-12 border-orange/30 text-orange bg-orange/5 hover:bg-orange/10">
              {t('admin.adminContact.btnAddField')}
            </Button>
          </div>
        )}
      </Form.List>
    </Card>
  </div>
);

const ModalTab = ({ form, t }: { form: any, t: any }) => (
  <Card variant="borderless" className="shadow-sm">
    <SectionLabel>{t('admin.adminContact.sectionInquiryModal')}</SectionLabel>
    <I18nRichTextField form={form} baseName={['inquiryModal', 'title']} label={t('adminAbout.lblTitle')} />
    <I18nRichTextField form={form} baseName={['inquiryModal', 'subtitlePrefix']} label={t('admin.adminContact.lblSubtitlePrefix')} />
    <I18nRichTextField form={form} baseName={['inquiryModal', 'successTitle']} label={t('admin.adminContact.lblSuccessTitle')} />
    <I18nRichTextField form={form} baseName={['inquiryModal', 'successDescPrefix']} label={t('admin.adminContact.lblSuccessDescPrefix')} />
    <I18nRichTextField form={form} baseName={['inquiryModal', 'successDescSuffix']} label={t('admin.adminContact.lblSuccessDescSuffix')} />
    <I18nRichTextField form={form} baseName={['inquiryModal', 'closeBtn']} label={t('admin.adminContact.lblCloseBtn')} />
    <Divider />
    <SectionLabel>{t('admin.adminContact.sectionWhatsapp')}</SectionLabel>
    <I18nRichTextField form={form} baseName={['inquiryModal', 'whatsappText']} label={t('admin.adminContact.lblWhatsappBtnText')} />
    <Form.Item name={['inquiryModal', 'whatsappNumber']} label={t('admin.adminContact.lblWhatsappNumber')}>
      <Input placeholder={t('admin.adminContact.phWhatsappNumber')} />
    </Form.Item>
  </Card>
);

export default function ContactEditor() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [mode, setMode] = useState<'view'|'edit'>('edit');
  const [customExists, setCustomExists] = useState(true);
  const [updateNote, setUpdateNote] = useState("");

  const applyDataToForm = (doc: any) => {
    if (!doc.formSection) doc.formSection = {};
    if (!doc.formSection.fields || doc.formSection.fields.length === 0) {
       const legacy = doc.formSection.labels || {};
       doc.formSection.fields = [
         { id: 'f1', key: 'name', type: 'text', required: true, width: 'half', label: legacy.name || { us: '<p>Name</p>', uk: '<p>Name</p>', vi: '<p>Họ tên</p>' } },
         { id: 'f2', key: 'email', type: 'email', required: true, width: 'half', label: legacy.email || { us: '<p>Email</p>', uk: '<p>Email</p>', vi: '<p>Email</p>' } },
         { id: 'f3', key: 'phone', type: 'tel', required: false, width: 'half', label: legacy.phone || { us: '<p>Phone</p>', uk: '<p>Phone</p>', vi: '<p>Số điện thoại</p>' } },
         { id: 'f4', key: 'company', type: 'text', required: false, width: 'half', label: legacy.company || { us: '<p>Company</p>', uk: '<p>Company</p>', vi: '<p>Công ty</p>' } },
         { id: 'f5', key: 'category', type: 'category', required: true, width: 'full', label: legacy.category || { us: '<p>Inquiry Category</p>', uk: '<p>Inquiry Category</p>', vi: '<p>Danh mục quan tâm</p>' } },
         { id: 'f6', key: 'subject', type: 'text', required: true, width: 'full', label: legacy.subject || { us: '<p>Subject</p>', uk: '<p>Subject</p>', vi: '<p>Tiêu đề</p>' } },
         { id: 'f7', key: 'message', type: 'textarea', required: true, width: 'full', label: legacy.message || { us: '<p>Message</p>', uk: '<p>Message</p>', vi: '<p>Nội dung</p>' } },
       ];
    }
    // CRITICAL: resetFields() clears Form.List internal state before populating.
    // Without this, Ant Design merges arrays incorrectly and dynamic fields stay empty.
    form.resetFields();
    form.setFieldsValue(doc);
  };

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/contact');
      const data = await res.json();
      if (data.success && data.data) {
        applyDataToForm(data.data);
        setCustomExists(true);
      } else {
        setCustomExists(false);
      }
    } catch {
      message.error(t('admin.adminContact.msgLoadError'));
    }
  };

  useEffect(() => {
    loadData();
  }, [form]);

  const onFinish = async (values: any) => {
    setIsSaving(true);
    try {
      const payload = { ...values, _note: updateNote || t('admin.adminContact.msgDefaultNote') };
      const res = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        message.success(t('admin.adminContact.msgSaveSuccess'));
        setCustomExists(true);
        setUpdateNote("");
      } else throw new Error();
    } catch {
      message.error(t('admin.adminContact.msgSaveError'));
    } finally {
      setIsSaving(false);
    }
  };

  const fetchDefaultAndSet = async () => {
    try {
      const res = await fetch('/api/admin/contact/default');
      const json = await res.json();
      if (json.success && json.data) {
        applyDataToForm(json.data);
        message.success(t('admin.adminContact.msgBackupLoaded'));
      } else {
        message.info(t('admin.adminContact.revNoHistory'));
      }
    } catch {
      message.error(t('admin.adminContact.msgLoadError'));
    }
  };

  return (
    <div className="w-full h-full bg-slate-50 min-h-screen">
      <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 z-50 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-navy-deep m-0 leading-tight">
                {t('admin.adminContact.pageTitle')}
              </h1>
              <p className="text-xs text-gray-500 m-0 mt-1">
                {t('admin.adminContact.pageSubtitle')}
              </p>
            </div>
         </div>
         
         <div className="flex gap-3">
           <Button icon={<FileTextOutlined />} onClick={() => {
             Modal.confirm({
               title: t('adminAbout.loadDefault'),
               content: t('admin.adminContact.loadDefaultDesc'),
               okText: t('adminAbout.btnOk'),
               cancelText: t('adminAbout.btnCancel'),
               onOk: fetchDefaultAndSet
             });
           }}>
              {t('adminAbout.loadDefault')}
           </Button>
           <Button icon={<HistoryOutlined />} onClick={() => setHistoryOpen(true)}>
              {t('adminAbout.history')}
           </Button>
           <Input 
              placeholder={t('admin.adminContact.notePlaceholder')}
              value={updateNote}
              onChange={e => setUpdateNote(e.target.value)}
              style={{ width: 220 }}
           />
           <Button 
             type="primary" 
             icon={<SaveOutlined />} 
             onClick={() => form.submit()} 
             loading={isSaving} 
             style={{ backgroundColor: 'hsl(var(--orange))', borderColor: 'hsl(var(--orange))' }}
           >
             {t('adminAbout.saveAll')}
           </Button>
         </div>
      </div>

      <div className="p-6 max-w-[1200px] mx-auto">
         <Form form={form} layout="vertical" onFinish={onFinish}>
            <Tabs items={[
              { forceRender: true, key: '1', label: t('admin.adminContact.tabSeoHero'), children: <SEOHeroTab form={form} t={t} /> },
              { forceRender: true, key: '2', label: t('admin.adminContact.tabLocations'), children: <LocationsTab form={form} t={t} /> },
              { forceRender: true, key: '3', label: t('admin.adminContact.tabForm'), children: <FormTab form={form} t={t} /> },
              { forceRender: true, key: '4', label: t('admin.adminContact.tabModal'), children: <ModalTab form={form} t={t} /> },
            ]} />
         </Form>
      </div>

      <HistoryDrawer 
        t={t}
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onRestore={(d) => { applyDataToForm(d); message.info(t('admin.adminContact.msgBackupLoaded')); }}
      />
    </div>
  );
}
