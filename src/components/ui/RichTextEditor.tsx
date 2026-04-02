/**
 * RichTextEditor.tsx
 * Canva-like rich text editor built on Quill 2.
 * ─────────────────────────────────────────────────
 * Features:
 *  • Image upload (file picker → base64) + drag-and-drop images
 *  • YouTube / Vimeo video embedding with URL auto-detection
 *  • Floating image toolbar: resize (25/50/75/100%), layout
 *    (inline / left / center / right / full-width), alt text, delete
 *  • Expanded toolbar: H1-H3, font, size, colors, alignment, code-block…
 *  • RichTextEditorRef for external HTML injection (block inserter)
 */
'use client';
import React, { useEffect, useRef, useCallback } from 'react';

/* ── Types ── */
interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  className?: string;
  expanded?: boolean;
}

interface QuillInstance {
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  getSemanticHTML: () => string;
  getText: () => string;
  getLength: () => number;
  getSelection: (focus?: boolean) => { index: number; length: number } | null;
  insertEmbed: (index: number, type: string, value: unknown, source?: unknown) => void;
  setSelection: (index: number, length?: number) => void;
  clipboard: { dangerouslyPasteHTML: (html: string) => void };
  root: HTMLElement;
}

export interface RichTextEditorRef {
  insertHTML: (html: string) => void;
  getQuill: () => QuillInstance | null;
}

/* ═══════════════════════════════════════════════════
 * Helper: parse YouTube / Vimeo URLs → embed URLs
 * ═══════════════════════════════════════════════════ */
function toEmbedURL(url: string): string | null {
  // YouTube  (full, short, embed)
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Vimeo
  const vmMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`;

  // Already an embed URL
  if (url.includes('/embed/') || url.includes('player.vimeo.com')) return url;

  return null;
}

/* ═══════════════════════════════════════════════════
 * Helper: Beautiful Image / Video Upload Dialog (DOM)
 * Creates a dark-mode modal with two tabs:
 *   Upload (drag-drop / file picker) | URL (paste link)
 * Returns a Promise<string|null> with the chosen value
 * ═══════════════════════════════════════════════════ */
function showMediaDialog(mode: 'image' | 'video'): Promise<string | null> {
  return new Promise((resolve) => {
    // ── Overlay ──
    const overlay = document.createElement('div');
    overlay.className = 'rte-media-overlay';

    const modal = document.createElement('div');
    modal.className = 'rte-media-modal';

    const title = mode === 'image' ? '📷  Insert Image' : '🎬  Embed Video';
    const uploadLabel = mode === 'image' ? 'Upload Image' : 'Upload';
    const urlLabel = mode === 'image' ? 'Image URL' : 'Video URL';
    const urlPlaceholder = mode === 'image'
      ? 'https://example.com/photo.jpg'
      : 'https://www.youtube.com/watch?v=... or Vimeo URL';

    modal.innerHTML = `
      <div class="rte-modal-header">
        <h3>${title}</h3>
        <button class="rte-modal-close" type="button">✕</button>
      </div>
      <div class="rte-modal-tabs">
        ${mode === 'image' ? `<button type="button" class="rte-tab active" data-tab="upload">${uploadLabel}</button>` : ''}
        <button type="button" class="rte-tab ${mode === 'video' ? 'active' : ''}" data-tab="url">${urlLabel}</button>
      </div>
      ${mode === 'image' ? `
      <div class="rte-tab-panel" data-panel="upload">
        <div class="rte-drop-zone" id="rte-drop-zone">
          <div class="rte-drop-icon">📁</div>
          <p class="rte-drop-text">Drag & drop your image here</p>
          <p class="rte-drop-hint">or</p>
          <label class="rte-file-btn">
            Browse Files
            <input type="file" accept="image/*" hidden id="rte-file-input" />
          </label>
          <p class="rte-drop-formats">Supports: JPG, PNG, GIF, WebP (Max 5MB)</p>
        </div>
        <div class="rte-preview-area" id="rte-preview-area" style="display:none">
          <img id="rte-preview-img" />
          <div class="rte-preview-info">
            <span id="rte-preview-name"></span>
            <span id="rte-preview-size"></span>
            <button type="button" class="rte-remove-img" id="rte-remove-img">Remove</button>
          </div>
        </div>
      </div>` : ''}
      <div class="rte-tab-panel ${mode === 'video' ? '' : 'hidden'}" data-panel="url">
        <input type="text" class="rte-url-input" id="rte-url-input" placeholder="${urlPlaceholder}" />
        ${mode === 'video' ? '<p class="rte-url-hint">Supports: YouTube, Vimeo, or any embed URL</p>' : ''}
      </div>
      <div class="rte-modal-footer">
        <button type="button" class="rte-btn-cancel">Cancel</button>
        <button type="button" class="rte-btn-insert" id="rte-btn-insert">Insert</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // ── State ──
    let base64Result: string | null = null;
    let activeTab = mode === 'image' ? 'upload' : 'url';

    // ── Close ──
    function cleanup(result: string | null) {
      overlay.remove();
      resolve(result);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cleanup(null);
    });
    modal.querySelector('.rte-modal-close')?.addEventListener('click', () => cleanup(null));
    modal.querySelector('.rte-btn-cancel')?.addEventListener('click', () => cleanup(null));

    // ── Tabs ──
    modal.querySelectorAll<HTMLButtonElement>('.rte-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab || 'url';
        modal.querySelectorAll('.rte-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        modal.querySelectorAll<HTMLDivElement>('.rte-tab-panel').forEach(p => {
          p.classList.toggle('hidden', p.dataset.panel !== activeTab);
        });
      });
    });

    // ── File handling (base64) ──
    function handleFile(file: File) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large. Maximum 5MB allowed.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        base64Result = reader.result as string;
        const previewArea = document.getElementById('rte-preview-area');
        const dropZone = document.getElementById('rte-drop-zone');
        const previewImg = document.getElementById('rte-preview-img') as HTMLImageElement;
        const previewName = document.getElementById('rte-preview-name');
        const previewSize = document.getElementById('rte-preview-size');
        if (previewArea && dropZone && previewImg && previewName && previewSize) {
          dropZone.style.display = 'none';
          previewArea.style.display = 'flex';
          previewImg.src = base64Result;
          previewName.textContent = file.name;
          previewSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
        }
      };
      reader.readAsDataURL(file);
    }

    if (mode === 'image') {
      // File picker
      const fileInput = document.getElementById('rte-file-input') as HTMLInputElement;
      fileInput?.addEventListener('change', () => {
        if (fileInput.files?.[0]) handleFile(fileInput.files[0]);
      });

      // Drag & drop
      const dropZone = document.getElementById('rte-drop-zone');
      if (dropZone) {
        ['dragenter', 'dragover'].forEach(evt => {
          dropZone.addEventListener(evt, (e) => {
            e.preventDefault();
            dropZone.classList.add('rte-drop-active');
          });
        });
        ['dragleave', 'drop'].forEach(evt => {
          dropZone.addEventListener(evt, (e) => {
            e.preventDefault();
            dropZone.classList.remove('rte-drop-active');
          });
        });
        dropZone.addEventListener('drop', (e) => {
          const dt = (e as DragEvent).dataTransfer;
          if (dt?.files?.[0]) handleFile(dt.files[0]);
        });
      }

      // Remove image preview
      document.getElementById('rte-remove-img')?.addEventListener('click', () => {
        base64Result = null;
        const previewArea = document.getElementById('rte-preview-area');
        const dropZone2 = document.getElementById('rte-drop-zone');
        if (previewArea) previewArea.style.display = 'none';
        if (dropZone2) dropZone2.style.display = 'flex';
      });
    }

    // ── Insert ──
    document.getElementById('rte-btn-insert')?.addEventListener('click', () => {
      if (activeTab === 'upload' && base64Result) {
        cleanup(base64Result);
      } else if (activeTab === 'url') {
        const url = (document.getElementById('rte-url-input') as HTMLInputElement)?.value?.trim();
        if (!url) return;
        if (mode === 'video') {
          const embed = toEmbedURL(url);
          cleanup(embed || url);
        } else {
          cleanup(url);
        }
      }
    });

    // Focus URL input
    setTimeout(() => {
      if (mode === 'video') {
        (document.getElementById('rte-url-input') as HTMLInputElement)?.focus();
      }
    }, 100);
  });
}

/* ═══════════════════════════════════════════════════
 * Helper: Floating Image Toolbar
 * ═══════════════════════════════════════════════════ */
function setupImageToolbar(editorRoot: HTMLElement, fireChange: () => void) {
  let toolbar: HTMLDivElement | null = null;
  let activeImg: HTMLImageElement | null = null;

  const sizeOptions = [
    { label: '25%', value: '25%' },
    { label: '50%', value: '50%' },
    { label: '75%', value: '75%' },
    { label: '100%', value: '100%' },
  ];

  const layoutOptions = [
    { label: '⬆ Inline', value: 'inline', title: 'Inline (default)' },
    { label: '◀ Left', value: 'float-left', title: 'Float left' },
    { label: '▐ Center', value: 'center', title: 'Center' },
    { label: '▶ Right', value: 'float-right', title: 'Float right' },
    { label: '▬ Full', value: 'full', title: 'Full width' },
  ];

  function createToolbar() {
    const tb = document.createElement('div');
    tb.className = 'ql-image-toolbar';
    tb.innerHTML = `
      <div class="ql-img-tb-section">
        <span class="ql-img-tb-label">SIZE</span>
        <div class="ql-img-tb-btns">
          ${sizeOptions.map(s => `<button type="button" data-size="${s.value}" class="ql-img-tb-btn">${s.label}</button>`).join('')}
        </div>
      </div>
      <div class="ql-img-tb-divider"></div>
      <div class="ql-img-tb-section">
        <span class="ql-img-tb-label">LAYOUT</span>
        <div class="ql-img-tb-btns">
          ${layoutOptions.map(l => `<button type="button" data-layout="${l.value}" class="ql-img-tb-btn" title="${l.title}">${l.label}</button>`).join('')}
        </div>
      </div>
      <div class="ql-img-tb-divider"></div>
      <div class="ql-img-tb-section">
        <button type="button" class="ql-img-tb-btn ql-img-tb-delete" title="Delete image">🗑 Delete</button>
        <button type="button" class="ql-img-tb-btn ql-img-tb-alt" title="Edit alt text">✏ Alt</button>
      </div>
    `;
    tb.style.display = 'none';
    editorRoot.parentElement?.appendChild(tb);
    return tb;
  }

  function positionToolbar(img: HTMLImageElement) {
    if (!toolbar) return;
    const editorRect = editorRoot.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const top = imgRect.top - editorRect.top - 48;
    const left = (imgRect.left - editorRect.left) + (imgRect.width / 2);
    toolbar.style.top = `${Math.max(top, -44)}px`;
    toolbar.style.left = `${left}px`;
    toolbar.style.transform = 'translateX(-50%)';
    toolbar.style.display = 'flex';
  }

  function updateActiveStates(img: HTMLImageElement) {
    if (!toolbar) return;
    toolbar.querySelectorAll<HTMLButtonElement>('[data-size]').forEach(btn => {
      const w = img.style.width || '100%';
      btn.classList.toggle('active', btn.dataset.size === w);
    });
    const fl = img.style.float || '';
    const mx = img.style.marginLeft || '';
    const display = img.style.display || '';
    let currentLayout = 'inline';
    if (fl === 'left') currentLayout = 'float-left';
    else if (fl === 'right') currentLayout = 'float-right';
    else if (mx === 'auto' && img.style.marginRight === 'auto') currentLayout = 'center';
    else if (display === 'block' && img.style.width === '100%') currentLayout = 'full';
    toolbar.querySelectorAll<HTMLButtonElement>('[data-layout]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.layout === currentLayout);
    });
  }

  function applySize(img: HTMLImageElement, size: string) {
    img.style.width = size;
    img.style.height = 'auto';
    updateActiveStates(img);
    positionToolbar(img);
    fireChange();
  }

  function applyLayout(img: HTMLImageElement, layout: string) {
    img.style.float = '';
    img.style.display = '';
    img.style.marginLeft = '';
    img.style.marginRight = '';
    img.style.clear = '';
    switch (layout) {
      case 'float-left':
        img.style.float = 'left'; img.style.marginRight = '16px'; img.style.marginBottom = '12px'; break;
      case 'float-right':
        img.style.float = 'right'; img.style.marginLeft = '16px'; img.style.marginBottom = '12px'; break;
      case 'center':
        img.style.display = 'block'; img.style.marginLeft = 'auto'; img.style.marginRight = 'auto'; break;
      case 'full':
        img.style.display = 'block'; img.style.width = '100%'; break;
    }
    updateActiveStates(img);
    positionToolbar(img);
    fireChange();
  }

  function hideToolbar() {
    if (toolbar) toolbar.style.display = 'none';
    if (activeImg) { activeImg.classList.remove('ql-img-selected'); activeImg = null; }
  }

  function handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (toolbar?.contains(target)) {
      e.preventDefault(); e.stopPropagation();
      const btn = (target.closest('[data-size]') || target.closest('[data-layout]') || target.closest('.ql-img-tb-delete') || target.closest('.ql-img-tb-alt')) as HTMLButtonElement | null;
      if (!btn || !activeImg) return;
      if (btn.dataset.size) applySize(activeImg, btn.dataset.size);
      else if (btn.dataset.layout) applyLayout(activeImg, btn.dataset.layout);
      else if (btn.classList.contains('ql-img-tb-delete')) { activeImg.remove(); hideToolbar(); fireChange(); }
      else if (btn.classList.contains('ql-img-tb-alt')) {
        const alt = prompt('Image alt text:', activeImg.alt || '');
        if (alt !== null) { activeImg.alt = alt; fireChange(); }
      }
      return;
    }
    if (target.tagName === 'IMG' && editorRoot.contains(target)) {
      e.preventDefault();
      if (!toolbar) toolbar = createToolbar();
      if (activeImg) activeImg.classList.remove('ql-img-selected');
      activeImg = target as HTMLImageElement;
      activeImg.classList.add('ql-img-selected');
      positionToolbar(activeImg); updateActiveStates(activeImg);
      return;
    }
    hideToolbar();
  }

  const container = editorRoot.parentElement || editorRoot;
  container.addEventListener('click', handleClick, true);
  editorRoot.addEventListener('scroll', () => { if (activeImg && toolbar) positionToolbar(activeImg); });

  return () => { container.removeEventListener('click', handleClick, true); toolbar?.remove(); };
}

/* ═══════════════════════════════════════════════════
 * Helper: Drag-and-drop images onto editor
 * ═══════════════════════════════════════════════════ */
function setupDragDrop(editorRoot: HTMLElement, quillRef: React.RefObject<QuillInstance | null>, fireChange: () => void) {
  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    editorRoot.classList.add('ql-drag-over');
  }
  function handleDragLeave() {
    editorRoot.classList.remove('ql-drag-over');
  }
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    editorRoot.classList.remove('ql-drag-over');
    const files = e.dataTransfer?.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > 5 * 1024 * 1024) { alert('Image too large (max 5MB)'); return; }
      const reader = new FileReader();
      reader.onload = () => {
        const q = quillRef.current;
        if (!q) return;
        const range = q.getSelection(true);
        const idx = range ? range.index : q.getLength() - 1;
        q.insertEmbed(idx, 'image', reader.result, 'user');
        fireChange();
      };
      reader.readAsDataURL(file);
    });
  }

  editorRoot.addEventListener('dragover', handleDragOver);
  editorRoot.addEventListener('dragleave', handleDragLeave);
  editorRoot.addEventListener('drop', handleDrop);

  return () => {
    editorRoot.removeEventListener('dragover', handleDragOver);
    editorRoot.removeEventListener('dragleave', handleDragLeave);
    editorRoot.removeEventListener('drop', handleDrop);
  };
}


/* ═══════════════════════════════════════════════════
 * Main Component
 * ═══════════════════════════════════════════════════ */
const RichTextEditor = React.forwardRef<RichTextEditorRef, RichTextEditorProps>(({
  value, onChange, placeholder = 'Type here…', minHeight = 200, className = '', expanded = false,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillInstance | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const valueRef = useRef(value);
  valueRef.current = value;
  const isSettingRef = useRef(false);

  const insertHTML = useCallback((html: string) => {
    if (!quillRef.current) return;
    const quill = quillRef.current;
    const currentHTML = quill.getSemanticHTML();
    quill.clipboard.dangerouslyPasteHTML(currentHTML + html);
    const newHTML = quill.getSemanticHTML();
    const isEmpty = quill.getText().trim() === '';
    onChangeRef.current?.(isEmpty ? '' : newHTML);
  }, []);

  React.useImperativeHandle(ref, () => ({
    insertHTML,
    getQuill: () => quillRef.current,
  }), [insertHTML]);

  useEffect(() => {
    if (!containerRef.current) return;
    let isMounted = true;
    let cleanupImageToolbar: (() => void) | null = null;
    let cleanupDragDrop: (() => void) | null = null;

    import('quill').then(({ default: Quill }) => {
      if (!isMounted || !containerRef.current) return;

      const linkId = 'quill-snow-css';
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css';
        document.head.appendChild(link);
      }

      containerRef.current.innerHTML = '';
      const editorEl = document.createElement('div');
      containerRef.current.appendChild(editorEl);

      const toolbarConfig = expanded ? [
        [{ header: [1, 2, 3, false] }],
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        [{ direction: 'rtl' }],
        ['clean'],
      ] : [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'link'],
        [{ align: [] }],
        ['clean'],
      ];

      const quill = new Quill(editorEl, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: {
            container: toolbarConfig,
            handlers: expanded ? {
              /* ── Custom image handler: open upload modal ── */
              image: async function() {
                const result = await showMediaDialog('image');
                if (result) {
                  const q = quillRef.current;
                  if (!q) return;
                  const range = q.getSelection(true);
                  q.insertEmbed(range ? range.index : 0, 'image', result, 'user');
                }
              },
              /* ── Custom video handler: parse YouTube/Vimeo ── */
              video: async function() {
                const result = await showMediaDialog('video');
                if (result) {
                  const q = quillRef.current;
                  if (!q) return;
                  const range = q.getSelection(true);
                  q.insertEmbed(range ? range.index : 0, 'video', result, 'user');
                }
              },
            } : {},
          },
        },
      });

      quillRef.current = quill as unknown as QuillInstance;

      // Floating image toolbar + drag-and-drop (expanded mode only)
      if (expanded) {
        const fc = () => {
          const html = quill.getSemanticHTML();
          const isEmpty = quill.getText().trim() === '';
          onChangeRef.current?.(isEmpty ? '' : html);
        };
        cleanupImageToolbar = setupImageToolbar(quill.root, fc);
        cleanupDragDrop = setupDragDrop(quill.root, quillRef, fc);
      }

      quill.on('text-change', (_delta: unknown, _oldDelta: unknown, source: unknown) => {
        if (source !== 'user') return;
        const html = quill.getSemanticHTML();
        const isEmpty = quill.getText().trim() === '';
        onChangeRef.current?.(isEmpty ? '' : html);
      });

      if (valueRef.current) {
        isSettingRef.current = true;
        quill.clipboard.dangerouslyPasteHTML(valueRef.current);
        isSettingRef.current = false;
      }
    });

    return () => {
      isMounted = false;
      cleanupImageToolbar?.();
      cleanupDragDrop?.();
      if (quillRef.current && containerRef.current) {
        containerRef.current.innerHTML = '';
        quillRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes
  useEffect(() => {
    if (!quillRef.current) return;
    const current = quillRef.current.getSemanticHTML();
    const incoming = value || '';
    if (current !== incoming && incoming !== '<p></p>' && incoming !== '<p><br></p>') {
      isSettingRef.current = true;
      quillRef.current.clipboard.dangerouslyPasteHTML(incoming);
      isSettingRef.current = false;
    }
  }, [value]);

  return (
    <>
      <div
        ref={containerRef}
        className={`quill-custom-wrap ${expanded ? 'quill-expanded' : ''} ${className}`}
        style={{ minHeight }}
      />
      <style>{EDITOR_STYLES(minHeight)}</style>
    </>
  );
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;


/* ═══════════════════════════════════════════════════
 * All styles (extracted for readability)
 * ═══════════════════════════════════════════════════ */
function EDITOR_STYLES(minHeight: number) {
  return `
    /* ── Base ── */
    .quill-custom-wrap .ql-toolbar {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: #fafafa;
      border-color: #e5e7eb;
      font-family: inherit;
      position: sticky;
      top: 80px;
      z-index: 10;
    }
    .quill-custom-wrap .ql-container {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-color: #e5e7eb;
      font-size: 14px;
      font-family: inherit;
      min-height: ${minHeight}px;
      position: relative;
    }
    .quill-custom-wrap .ql-editor {
      min-height: ${minHeight}px;
      padding: 16px 20px;
      line-height: 1.8;
    }
    .quill-custom-wrap .ql-editor.ql-blank::before {
      color: #9ca3af;
      font-style: normal;
      left: 20px;
      right: 20px;
    }
    .quill-custom-wrap:focus-within .ql-toolbar,
    .quill-custom-wrap:focus-within .ql-container {
      border-color: #f97316;
      transition: border-color 0.2s;
    }

    /* ── Expanded toolbar ── */
    .quill-expanded .ql-toolbar {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding: 8px 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
    }
    .quill-expanded .ql-toolbar .ql-formats {
      margin-right: 8px;
      padding-right: 8px;
      border-right: 1px solid #e5e7eb;
    }
    .quill-expanded .ql-toolbar .ql-formats:last-child { border-right: none; }
    .quill-expanded .ql-toolbar button {
      width: 30px; height: 30px; border-radius: 6px; transition: all 0.15s;
    }
    .quill-expanded .ql-toolbar button:hover {
      background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .quill-expanded .ql-toolbar button.ql-active {
      background: hsl(24, 95%, 53%); color: #fff;
    }
    .quill-expanded .ql-toolbar button.ql-active .ql-stroke { stroke: #fff; }
    .quill-expanded .ql-toolbar button.ql-active .ql-fill { fill: #fff; }

    /* ── Rich content styling ── */
    .quill-custom-wrap .ql-editor h1 { font-size: 1.75rem; font-weight: 700; margin-top: 1.5rem; color: #1a2332; }
    .quill-custom-wrap .ql-editor h2 { font-size: 1.35rem; font-weight: 700; margin-top: 1.25rem; color: #1a2332; }
    .quill-custom-wrap .ql-editor h3 { font-size: 1.1rem; font-weight: 600; margin-top: 1rem; color: #2d3748; }
    .quill-custom-wrap .ql-editor blockquote {
      border-left: 4px solid #f97316; margin: 1rem 0; color: #4a5568;
      font-style: italic; background: #fffbf5; padding: 12px 16px; border-radius: 0 8px 8px 0;
    }
    .quill-custom-wrap .ql-editor pre {
      background: #1a2332; color: #e2e8f0; border-radius: 8px; padding: 16px;
      font-family: 'Fira Code','Consolas',monospace; font-size: 13px;
    }
    .quill-custom-wrap .ql-editor img {
      max-width: 100%; border-radius: 8px; margin: 8px 0;
      cursor: pointer; transition: outline 0.15s, box-shadow 0.15s;
    }
    .quill-custom-wrap .ql-editor img:hover {
      outline: 2px solid hsl(24,95%,53%,0.4); outline-offset: 2px;
    }
    .quill-custom-wrap .ql-editor img.ql-img-selected {
      outline: 3px solid hsl(24,95%,53%); outline-offset: 2px;
      box-shadow: 0 0 0 6px hsl(24,95%,53%,0.12);
    }
    .quill-custom-wrap .ql-editor .ql-video {
      width: 100%; min-height: 320px; border-radius: 8px;
    }
    .quill-custom-wrap .ql-editor a { color: #f97316; text-decoration: underline; }

    /* ── Drag-and-drop overlay ── */
    .quill-expanded .ql-editor.ql-drag-over {
      background: hsl(24, 95%, 53%, 0.04);
      outline: 2px dashed hsl(24, 95%, 53%, 0.4);
      outline-offset: -4px;
    }

    /* ═══ Floating Image Toolbar ═══ */
    .ql-image-toolbar {
      position: absolute; z-index: 100; display: flex; align-items: center; gap: 4px;
      background: #1a2332; color: #fff; border-radius: 10px; padding: 6px 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.25); pointer-events: auto;
      animation: qlImgTbFadeIn 0.15s ease; white-space: nowrap;
    }
    @keyframes qlImgTbFadeIn {
      from { opacity:0; transform: translateX(-50%) translateY(4px); }
      to   { opacity:1; transform: translateX(-50%) translateY(0); }
    }
    .ql-image-toolbar::after {
      content:''; position:absolute; bottom:-6px; left:50%;
      transform:translateX(-50%); border:6px solid transparent;
      border-top-color:#1a2332; border-bottom:none;
    }
    .ql-img-tb-section { display:flex; align-items:center; gap:3px; }
    .ql-img-tb-label {
      font-size:9px; font-weight:700; letter-spacing:0.06em;
      color:rgba(255,255,255,0.45); margin-right:2px; text-transform:uppercase;
    }
    .ql-img-tb-btns { display:flex; gap:2px; }
    .ql-img-tb-btn {
      background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12);
      color:#fff; font-size:10px; font-weight:600; padding:3px 7px; border-radius:5px;
      cursor:pointer; transition:all 0.12s; white-space:nowrap; font-family:inherit;
    }
    .ql-img-tb-btn:hover { background:rgba(255,255,255,0.2); border-color:rgba(255,255,255,0.3); }
    .ql-img-tb-btn.active { background:hsl(24,95%,53%); border-color:hsl(24,95%,53%); }
    .ql-img-tb-delete {
      background:rgba(239,68,68,0.15)!important; border-color:rgba(239,68,68,0.3)!important; color:#fca5a5!important;
    }
    .ql-img-tb-delete:hover { background:rgba(239,68,68,0.35)!important; }
    .ql-img-tb-alt {
      background:rgba(59,130,246,0.15)!important; border-color:rgba(59,130,246,0.3)!important; color:#93c5fd!important;
    }
    .ql-img-tb-alt:hover { background:rgba(59,130,246,0.35)!important; }
    .ql-img-tb-divider { width:1px; height:20px; background:rgba(255,255,255,0.15); margin:0 4px; }
    @media (max-width:720px) {
      .ql-image-toolbar { flex-wrap:wrap; max-width:320px; justify-content:center; }
    }

    /* ═══ Upload Modal (rte-media-*) ═══ */
    .rte-media-overlay {
      position:fixed; inset:0; z-index:10000;
      background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);
      display:flex; align-items:center; justify-content:center;
      animation:rteOverlayIn 0.2s ease;
    }
    @keyframes rteOverlayIn { from{opacity:0} to{opacity:1} }
    .rte-media-modal {
      background:#fff; border-radius:16px; width:480px; max-width:calc(100vw - 32px);
      box-shadow:0 24px 64px rgba(0,0,0,0.2); overflow:hidden;
      animation:rteModalIn 0.25s ease;
    }
    @keyframes rteModalIn {
      from{opacity:0;transform:scale(0.95) translateY(16px)}
      to{opacity:1;transform:scale(1) translateY(0)}
    }
    .rte-modal-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:16px 20px; border-bottom:1px solid #f0f0f0;
    }
    .rte-modal-header h3 { margin:0; font-size:16px; font-weight:700; color:#1a2332; }
    .rte-modal-close {
      width:32px; height:32px; border-radius:8px; border:none;
      background:#f5f5f5; font-size:14px; cursor:pointer; color:#666;
      display:flex; align-items:center; justify-content:center;
      transition:all 0.15s;
    }
    .rte-modal-close:hover { background:#eee; color:#333; }
    .rte-modal-tabs {
      display:flex; border-bottom:1px solid #f0f0f0; padding:0 20px;
    }
    .rte-tab {
      padding:10px 16px; font-size:13px; font-weight:600; border:none;
      background:none; color:#999; cursor:pointer; border-bottom:2px solid transparent;
      transition:all 0.15s;
    }
    .rte-tab:hover { color:#666; }
    .rte-tab.active { color:#f97316; border-bottom-color:#f97316; }
    .rte-tab-panel { padding:20px; }
    .rte-tab-panel.hidden { display:none; }

    /* ── Drop zone ── */
    .rte-drop-zone {
      border:2px dashed #e0e0e0; border-radius:12px; padding:32px 20px;
      display:flex; flex-direction:column; align-items:center; gap:6px;
      transition:all 0.2s; cursor:pointer; background:#fafafa;
    }
    .rte-drop-zone:hover, .rte-drop-zone.rte-drop-active {
      border-color:#f97316; background:hsl(24,95%,53%,0.04);
    }
    .rte-drop-icon { font-size:36px; line-height:1; }
    .rte-drop-text { font-size:14px; font-weight:600; color:#333; margin:4px 0 0; }
    .rte-drop-hint { font-size:12px; color:#bbb; margin:2px 0; }
    .rte-drop-formats { font-size:11px; color:#ccc; margin-top:6px; }
    .rte-file-btn {
      display:inline-flex; align-items:center; padding:8px 20px;
      background:linear-gradient(135deg,#f97316,#ea580c); color:#fff;
      border-radius:8px; font-size:13px; font-weight:600; cursor:pointer;
      transition:all 0.15s; border:none;
    }
    .rte-file-btn:hover { opacity:0.9; box-shadow:0 4px 12px rgba(249,115,22,0.3); }

    /* ── Preview ── */
    .rte-preview-area {
      display:flex; align-items:center; gap:12px; padding:12px;
      border:1px solid #e5e7eb; border-radius:12px; background:#fafafa;
    }
    .rte-preview-area img {
      width:80px; height:60px; object-fit:cover; border-radius:8px;
      border:1px solid #e5e7eb;
    }
    .rte-preview-info {
      display:flex; flex-direction:column; gap:2px; flex:1;
    }
    .rte-preview-info span:first-child {
      font-size:13px; font-weight:600; color:#333; overflow:hidden;
      text-overflow:ellipsis; white-space:nowrap; max-width:260px;
    }
    .rte-preview-info span:nth-child(2) { font-size:11px; color:#999; }
    .rte-remove-img {
      font-size:12px; color:#ef4444; background:none; border:1px solid #fecaca;
      border-radius:6px; padding:4px 10px; cursor:pointer; width:fit-content;
      margin-top:4px; transition:all 0.15s;
    }
    .rte-remove-img:hover { background:#fef2f2; }

    /* ── URL input ── */
    .rte-url-input {
      width:100%; padding:10px 14px; border:1px solid #e5e7eb;
      border-radius:10px; font-size:14px; outline:none; box-sizing:border-box;
      transition:border-color 0.2s;
    }
    .rte-url-input:focus { border-color:#f97316; box-shadow:0 0 0 3px hsl(24,95%,53%,0.1); }
    .rte-url-hint { font-size:11px; color:#bbb; margin:6px 0 0; }

    /* ── Footer ── */
    .rte-modal-footer {
      display:flex; justify-content:flex-end; gap:8px;
      padding:14px 20px; border-top:1px solid #f0f0f0; background:#fafafa;
    }
    .rte-btn-cancel {
      padding:8px 16px; border:1px solid #e5e7eb; border-radius:8px;
      background:#fff; font-size:13px; font-weight:600; cursor:pointer;
      color:#666; transition:all 0.15s;
    }
    .rte-btn-cancel:hover { border-color:#ccc; background:#fafafa; }
    .rte-btn-insert {
      padding:8px 20px; border:none; border-radius:8px;
      background:linear-gradient(135deg,#f97316,#ea580c); color:#fff;
      font-size:13px; font-weight:700; cursor:pointer; transition:all 0.15s;
    }
    .rte-btn-insert:hover { opacity:0.9; box-shadow:0 4px 12px rgba(249,115,22,0.3); }
  `;
}
