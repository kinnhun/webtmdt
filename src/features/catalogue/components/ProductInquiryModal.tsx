import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Product } from "@/domains/product/product.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function ProductInquiryModal({ isOpen, onClose, product }: Props) {
  const { t, i18n } = useTranslation();
  const langEnum: Record<string, 'vi' | 'uk' | 'us'> = { "vi-VN": "vi", "en-GB": "uk", "en-US": "us" };
  const langId = langEnum[i18n?.language] || "us";
  const pName = product.name?.[langId] || product.name?.us || "";
  
  const [form, setForm] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [dbData, setDbData] = useState<any>(null);

  useEffect(() => {
    if (isOpen && !dbData) {
      fetch("/api/contact-content")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setDbData(data.data);
          }
        })
        .catch(() => {});
    }
  }, [isOpen, dbData]);

  const hasDB = !!dbData;
  const d = (dbPath: string[], fallback: string): string => {
    if (hasDB && dbData) {
      let val: any = dbData;
      for (const key of dbPath) {
        val = val?.[key];
      }
      if (val && typeof val === 'object' && ('us' in val || 'uk' in val || 'vi' in val)) {
        const textValue = val[langId] || val.us || '';
        if (textValue.trim() !== '') return textValue;
      } else if (typeof val === 'string' && val.trim() !== '') {
        return val;
      }
    }
    return fallback;
  };

  // Close when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const payload = {
        ...form,
        subject: `Inquiry about ${pName} (${product.code})`,
        interestedProduct: product.id,
      };

      await fetch("/api/contact", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload) 
      });
      setSent(true);
    } catch {
      // ignore
    }
    setSending(false);
  };

  const handleReset = () => {
    setSent(false);
    setForm({});
  };

  const legacy = dbData?.formSection?.labels || {};
  const allFields = dbData?.formSection?.fields?.length > 0 ? dbData.formSection.fields : [
    { id: 'f1', key: 'name', type: 'text', required: true, width: 'half', label: legacy.name || { us: '<p>Name</p>', uk: '<p>Name</p>', vi: '<p>Họ tên</p>' } },
    { id: 'f2', key: 'email', type: 'email', required: true, width: 'half', label: legacy.email || { us: '<p>Email</p>', uk: '<p>Email</p>', vi: '<p>Email</p>' } },
    { id: 'f3', key: 'phone', type: 'tel', required: false, width: 'half', label: legacy.phone || { us: '<p>Phone</p>', uk: '<p>Phone</p>', vi: '<p>Số điện thoại</p>' } },
    { id: 'f4', key: 'company', type: 'text', required: false, width: 'half', label: legacy.company || { us: '<p>Company</p>', uk: '<p>Company</p>', vi: '<p>Công ty</p>' } },
    { id: 'f7', key: 'message', type: 'textarea', required: true, width: 'full', label: legacy.message || { us: '<p>Message</p>', uk: '<p>Message</p>', vi: '<p>Nội dung</p>' } },
  ];
  
  // Exclude category and subject for the modal, since they are pre-filled or handled implicitly
  const fields = allFields.filter((f: any) => f.key !== 'category' && f.key !== 'subject');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          style={{ zIndex: 60 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h3 className="font-display font-bold text-xl text-navy-deep leading-tight rt-reset" dangerouslySetInnerHTML={{ __html: d(['inquiryModal', 'title'], "Request a Quote") }} />
                <p className="font-body text-xs text-gray-500 mt-1 rt-reset">
                  <span dangerouslySetInnerHTML={{ __html: d(['inquiryModal', 'subtitlePrefix'], "You are inquiring about:") }} /> <span className="font-semibold text-orange tracking-wide">{pName} ({product.code})</span>
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto font-body">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-50">
                    <Send size={24} className="text-green-500" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2 rt-reset" dangerouslySetInnerHTML={{ __html: d(['inquiryModal', 'successTitle'], "Request Sent Successfully!") }} />
                  <div className="font-body text-sm text-gray-500 mb-8 max-w-md mx-auto inquiry-modal-rt">
                     <span dangerouslySetInnerHTML={{ __html: d(['inquiryModal', 'successDescPrefix'], "Thank you for your interest in the") }} /> <strong>{pName}</strong>. <span dangerouslySetInnerHTML={{ __html: d(['inquiryModal', 'successDescSuffix'], "Our commercial team will process your inquiry and contact you within 24 hours.") }} />
                  </div>
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={onClose} 
                      className="px-6 py-2.5 rounded-sm bg-gray-100 font-semibold text-sm hover:bg-gray-200 transition-colors rt-reset"
                      dangerouslySetInnerHTML={{ __html: d(['inquiryModal', 'closeBtn'], "Close Window") }}
                    />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex flex-wrap -mx-2.5">
                    {fields.map((f: any) => {
                      const labelText = typeof f.label === 'object' ? (f.label[langId] || f.label.us || f.key) : f.label;
                      const isHalf = f.width === 'half';
                      
                      return (
                        <div key={f.key} className={`px-2.5 mb-5 ${isHalf ? 'w-full md:w-1/2' : 'w-full'}`}>
                          <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-medium rt-reset">
                            <span dangerouslySetInnerHTML={{ __html: labelText }} /> {f.required && "*"}
                          </label>
                          
                          {f.type === 'textarea' ? (
                            <textarea 
                              rows={4} 
                              required={f.required} 
                              value={form[f.key] || ""} 
                              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} 
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:bg-white focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all resize-none" 
                            />
                          ) : f.type === 'select' ? (
                             <select 
                               required={f.required} 
                               value={form[f.key] || ""} 
                               onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} 
                               className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:bg-white focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all"
                             >
                               <option value="" disabled>Select an option</option>
                               {(f.options || []).map((o: any) => {
                                 const optLabel = typeof o.label === 'object' ? (o.label[langId] || o.label.us || o.key) : o.label;
                                 return <option key={o.key} value={optLabel}>{optLabel}</option>
                               })}
                             </select>
                          ) : (
                            <input 
                              type={f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : 'text'} 
                              required={f.required} 
                              value={form[f.key] || ""} 
                              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} 
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:bg-white focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all" 
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 mt-6 pt-5">
                    <a 
                      href={`https://wa.me/1234567890?text=Hi, I'd like to inquire about ${encodeURIComponent(pName)} (${product.code})`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm font-body font-medium text-sm border transition-all hover:bg-orange/5" 
                      style={{ borderColor: "hsl(var(--orange))", color: "hsl(var(--orange))" }}
                    >
                      <Phone size={14} /> <span className="rt-reset" dangerouslySetInnerHTML={{ __html: d(['inquiryModal', 'whatsappText'], t("product.whatsappUs", "WhatsApp")) }} />
                    </a>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button 
                        type="button" 
                        onClick={onClose}
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={sending} 
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60" 
                        style={{ backgroundColor: "hsl(var(--orange))" }}
                      >
                        <Send size={15} /> {sending ? "Sending..." : "Send Request"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <style jsx global>{`
              .inquiry-modal-rt p { display: inline; margin-bottom: 0; }
              .rt-reset p { margin: 0 !important; display: inline !important; }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
