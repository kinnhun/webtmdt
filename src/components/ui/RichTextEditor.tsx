/**
 * RichTextEditor.tsx
 * Custom Quill editor wrapper using useRef — React 18 compatible.
 * Avoids react-quill's findDOMNode crash in React 18 / Next.js Turbopack.
 */
'use client';
import React, { useEffect, useRef } from 'react';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Type here…',
  minHeight = 200,
  className = '',
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Track whether we're updating from external value to avoid loops
  const isSettingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically import Quill (safe for SSR/Turbopack)
    let isMounted = true;
    import('quill').then(({ default: Quill }) => {
      if (!isMounted || !containerRef.current) return;

      // Import Quill CSS once
      const linkId = 'quill-snow-css';
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css';
        document.head.appendChild(link);
      }

      // Cleanup any existing editor DOM in Strict Mode / Fast Refresh
      containerRef.current.innerHTML = '';

      const editorEl = document.createElement('div');
      containerRef.current.appendChild(editorEl);

      const quill = new Quill(editorEl, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: [
            [{ header: [2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'link'],
            [{ align: [] }],
            ['clean'],
          ],
        },
      });

      quillRef.current = quill;

      // Listen for changes FIRST, before setting initial content to catch events correctly if needed
      quill.on('text-change', () => {
        if (isSettingRef.current) return;
        const html = quill.getSemanticHTML();
        const isEmpty = quill.getText().trim() === '';
        onChangeRef.current?.(isEmpty ? '' : html);
      });

      // Set initial content
      if (value) {
        isSettingRef.current = true;
        quill.clipboard.dangerouslyPasteHTML(value);
        isSettingRef.current = false;
      }
    });

    return () => {
      isMounted = false;
      // Cleanup on unmount
      if (quillRef.current && containerRef.current) {
        containerRef.current.innerHTML = '';
        quillRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes (language switch or DB load)
  useEffect(() => {
    if (!quillRef.current) return;
    const current = quillRef.current.getSemanticHTML();
    const incoming = value || '';
    
    // Only update Quill if the incoming value actually differs materially
    // Prevents cursor jumping and unnecessary DOM updates while typing
    if (current !== incoming && incoming !== '<p></p>' && incoming !== '<p><br></p>') {
      // Small safeguard: if user is actively focusing the editor, don't overwrite wildly
      // unless it's genuinely a language switch/load.
      isSettingRef.current = true;
      quillRef.current.clipboard.dangerouslyPasteHTML(incoming);
      isSettingRef.current = false;
    }
  }, [value]);

  return (
    <>
      <div
        ref={containerRef}
        className={`quill-custom-wrap ${className}`}
        style={{ minHeight }}
      />
      <style>{`
        .quill-custom-wrap .ql-toolbar {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          background: #fafafa;
          border-color: #e5e7eb;
          font-family: inherit;
        }
        .quill-custom-wrap .ql-container {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          border-color: #e5e7eb;
          font-size: 14px;
          font-family: inherit;
          min-height: ${minHeight}px;
        }
        .quill-custom-wrap .ql-editor {
          min-height: ${minHeight}px;
          padding: 12px 16px;
          line-height: 1.6;
        }
        /* Ensure placeholder is styling correctly and gracefully disappears */
        .quill-custom-wrap .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
          left: 16px;
          right: 16px;
        }
        .quill-custom-wrap:focus-within .ql-toolbar,
        .quill-custom-wrap:focus-within .ql-container {
          border-color: #f97316;
          transition: border-color 0.2s;
        }
      `}</style>
    </>
  );
}
