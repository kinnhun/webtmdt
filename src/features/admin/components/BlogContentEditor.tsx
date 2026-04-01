/**
 * BlogContentEditor.tsx
 * A premium blog content editor that wraps the RichTextEditor with a
 * visual "Block Inserter" panel for quick insertion of rich layout blocks.
 * 
 * Supports: Image grids (2/3 col), side-by-side layouts, callout boxes,
 * pull quotes, video embeds, figures with captions, dividers, and more.
 */
import React, { useRef, useState } from 'react';
import { Tooltip, Modal, Input, Select, message } from 'antd';
import {
  AppstoreOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  HighlightOutlined,
  FileTextOutlined,
  MinusOutlined,
  LayoutOutlined,
  BorderOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import type { RichTextEditorRef } from '@/components/ui/RichTextEditor';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/ui/RichTextEditor'), { ssr: false });

interface BlogContentEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

/* ── Block Templates ── */
const BLOCK_TEMPLATES = {
  'image-grid-2': {
    icon: <AppstoreOutlined />,
    label: 'Image Grid (2 cols)',
    description: '2-column image layout',
    promptFields: ['Image URL 1', 'Image URL 2', 'Alt text 1', 'Alt text 2'],
    template: (fields: string[]) => `
<div class="image-grid cols-2">
  <img src="${fields[0] || 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop'}" alt="${fields[2] || 'Image 1'}" />
  <img src="${fields[1] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'}" alt="${fields[3] || 'Image 2'}" />
</div>`,
  },
  'image-grid-3': {
    icon: <AppstoreOutlined />,
    label: 'Image Grid (3 cols)',
    description: '3-column image layout',
    promptFields: ['Image URL 1', 'Image URL 2', 'Image URL 3'],
    template: (fields: string[]) => `
<div class="image-grid cols-3">
  <img src="${fields[0] || 'https://via.placeholder.com/500x350'}" alt="Image 1" />
  <img src="${fields[1] || 'https://via.placeholder.com/500x350'}" alt="Image 2" />
  <img src="${fields[2] || 'https://via.placeholder.com/500x350'}" alt="Image 3" />
</div>`,
  },
  'side-by-side': {
    icon: <LayoutOutlined />,
    label: 'Side by Side',
    description: 'Image + text layout',
    promptFields: ['Image URL', 'Text content'],
    template: (fields: string[]) => `
<div class="side-by-side">
  <img src="${fields[0] || 'https://via.placeholder.com/600x400'}" alt="Side image" />
  <div>
    <p>${fields[1] || 'Write your text content here. This will appear next to the image in a side-by-side layout.'}</p>
  </div>
</div>`,
  },
  'figure': {
    icon: <PictureOutlined />,
    label: 'Figure + Caption',
    description: 'Image with caption below',
    promptFields: ['Image URL', 'Caption text'],
    template: (fields: string[]) => `
<figure>
  <img src="${fields[0] || 'https://via.placeholder.com/1000x600'}" alt="${fields[1] || 'Figure'}" />
  <figcaption>${fields[1] || 'Write your caption here — describe the image content'}</figcaption>
</figure>`,
  },
  'callout': {
    icon: <BulbOutlined />,
    label: 'Callout Box',
    description: 'Highlighted info box',
    promptFields: ['Callout content'],
    template: (fields: string[]) => `
<div class="callout">
  <p><strong>💡 Pro Tip:</strong> ${fields[0] || 'Write your callout content here. This draws attention to important information.'}</p>
</div>`,
  },
  'pull-quote': {
    icon: <HighlightOutlined />,
    label: 'Pull Quote',
    description: 'Featured quote block',
    promptFields: ['Quote text'],
    template: (fields: string[]) => `
<div class="pull-quote">
  "${fields[0] || 'Write your featured quote here. This will be displayed prominently.'}"
</div>`,
  },
  'video-embed': {
    icon: <PlayCircleOutlined />,
    label: 'Video Embed',
    description: 'YouTube / Vimeo video',
    promptFields: ['YouTube embed URL'],
    template: (fields: string[]) => `
<div class="video-embed">
  <iframe src="${fields[0] || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Video"></iframe>
</div>`,
  },
  'divider': {
    icon: <MinusOutlined />,
    label: 'Divider',
    description: 'Horizontal separator',
    promptFields: [],
    template: () => `<hr />`,
  },
  'cta-block': {
    icon: <BorderOutlined />,
    label: 'CTA Block',
    description: 'Call to action section',
    promptFields: ['CTA text', 'Link URL'],
    template: (fields: string[]) => `
<p class="text-center"><em>${fields[0] || 'Want to learn more?'} <strong><a href="${fields[1] || '/contact'}">Get in touch with our team</a></strong> for more details.</em></p>`,
  },
};

type BlockKey = keyof typeof BLOCK_TEMPLATES;

export default function BlogContentEditor({ value, onChange, placeholder }: BlogContentEditorProps) {
  const editorRef = useRef<RichTextEditorRef>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeBlock, setActiveBlock] = useState<BlockKey | null>(null);
  const [fieldValues, setFieldValues] = useState<string[]>([]);

  /* ── Open block inserter modal ── */
  const handleBlockClick = (key: BlockKey) => {
    const block = BLOCK_TEMPLATES[key];
    if (block.promptFields.length === 0) {
      // No fields needed — insert immediately
      const html = block.template([]);
      editorRef.current?.insertHTML(html);
      message.success(`${block.label} inserted`);
      return;
    }
    setActiveBlock(key);
    setFieldValues(new Array(block.promptFields.length).fill(''));
    setModalVisible(true);
  };

  /* ── Insert block from modal ── */
  const handleInsert = () => {
    if (!activeBlock) return;
    const block = BLOCK_TEMPLATES[activeBlock];
    const html = block.template(fieldValues);
    editorRef.current?.insertHTML(html);
    message.success(`${block.label} inserted`);
    setModalVisible(false);
    setActiveBlock(null);
    setFieldValues([]);
  };

  const activeBlockData = activeBlock ? BLOCK_TEMPLATES[activeBlock] : null;

  return (
    <div className="blog-content-editor space-y-3">
      {/* ── Block Inserter Panel ── */}
      <div className="p-3 rounded-xl border bg-gradient-to-r from-gray-50 to-white" style={{ borderColor: 'hsl(var(--navy)/0.08)' }}>
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-1 h-4 rounded-full" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }} />
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--navy)/0.5)' }}>
            Insert Content Block
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(BLOCK_TEMPLATES) as BlockKey[]).map((key) => {
            const block = BLOCK_TEMPLATES[key];
            return (
              <Tooltip key={key} title={block.description} placement="bottom">
                <button
                  type="button"
                  onClick={() => handleBlockClick(key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:shadow-sm active:scale-95"
                  style={{
                    borderColor: 'hsl(var(--navy)/0.1)',
                    color: 'hsl(var(--navy)/0.65)',
                    backgroundColor: '#fff',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'hsl(24, 95%, 53%)';
                    e.currentTarget.style.color = 'hsl(24, 95%, 53%)';
                    e.currentTarget.style.backgroundColor = 'hsl(24, 95%, 53%, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'hsl(var(--navy)/0.1)';
                    e.currentTarget.style.color = 'hsl(var(--navy)/0.65)';
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                >
                  {block.icon}
                  {block.label}
                </button>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* ── Rich Text Editor ── */}
      <RichTextEditor
        ref={editorRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Start writing your article here…'}
        minHeight={450}
        expanded
      />

      {/* ── Block Inserter Modal ── */}
      <Modal
        open={modalVisible}
        title={
          <div className="flex items-center gap-2">
            {activeBlockData?.icon}
            <span>Insert {activeBlockData?.label}</span>
          </div>
        }
        onCancel={() => { setModalVisible(false); setActiveBlock(null); }}
        onOk={handleInsert}
        okText="Insert Block"
        okButtonProps={{ style: { background: 'linear-gradient(135deg, #f97316, #ea580c)', borderColor: 'transparent' } }}
        width={520}
      >
        <div className="space-y-4 pt-3">
          <p className="text-xs text-gray-400 m-0">{activeBlockData?.description}. Fill in the fields below or leave blank for defaults.</p>
          {activeBlockData?.promptFields.map((label, idx) => (
            <div key={idx}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
              {label.toLowerCase().includes('content') || label.toLowerCase().includes('text') || label.toLowerCase().includes('quote') || label.toLowerCase().includes('caption') ? (
                <Input.TextArea
                  rows={3}
                  placeholder={`Enter ${label.toLowerCase()}…`}
                  value={fieldValues[idx]}
                  onChange={(e) => {
                    const newVals = [...fieldValues];
                    newVals[idx] = e.target.value;
                    setFieldValues(newVals);
                  }}
                  className="rounded-lg"
                />
              ) : (
                <Input
                  placeholder={`Enter ${label.toLowerCase()}…`}
                  value={fieldValues[idx]}
                  onChange={(e) => {
                    const newVals = [...fieldValues];
                    newVals[idx] = e.target.value;
                    setFieldValues(newVals);
                  }}
                  className="rounded-lg"
                />
              )}
            </div>
          ))}

          {/* Preview */}
          {activeBlock && activeBlock !== 'divider' && (
            <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-wider">Preview Structure</div>
              <div className="text-xs text-gray-500 font-mono leading-relaxed whitespace-pre-wrap" style={{ maxHeight: 120, overflow: 'auto' }}>
                {BLOCK_TEMPLATES[activeBlock].template(fieldValues).trim()}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* ── Custom CSS for block inserter ── */}
      <style>{`
        .blog-content-editor .quill-expanded .ql-editor {
          font-family: 'Inter', -apple-system, sans-serif;
        }
      `}</style>
    </div>
  );
}
