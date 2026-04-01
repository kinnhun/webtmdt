import { useState } from "react";
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
  
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    company: "", 
    message: "" 
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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
    setForm({ name: "", email: "", phone: "", company: "", message: "" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
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
                <h3 className="font-display font-bold text-xl text-navy-deep leading-tight">
                  Request a Quote
                </h3>
                <p className="font-body text-xs text-gray-500 mt-1">
                  You are inquiring about: <span className="font-semibold text-orange tracking-wide">{pName} ({product.code})</span>
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
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Request Sent Successfully!</h3>
                  <p className="font-body text-sm text-gray-500 mb-8 max-w-md mx-auto">
                    Thank you for your interest in the <strong>{pName}</strong>. Our commercial team will process your inquiry and contact you within 24 hours.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={onClose} 
                      className="px-6 py-2.5 rounded-sm bg-gray-100 font-semibold text-sm hover:bg-gray-200 transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-medium">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:bg-white focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-medium">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:bg-white focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all" 
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-medium">Phone Number</label>
                      <input 
                        type="tel" 
                        value={form.phone} 
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:bg-white focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all" 
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-medium">Company Name</label>
                      <input 
                        type="text" 
                        value={form.company} 
                        onChange={(e) => setForm({ ...form, company: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:bg-white focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all" 
                        placeholder="Doe Furniture LLC"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-medium">Additional Message / Custom Requirements *</label>
                    <textarea 
                      rows={4} 
                      required 
                      value={form.message} 
                      onChange={(e) => setForm({ ...form, message: e.target.value })} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:bg-white focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all resize-none" 
                      placeholder={`I am interested in ordering the ${pName}. Please provide pricing and minimum order quantities.`}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 mt-6 pt-5">
                    <a 
                      href={`https://wa.me/1234567890?text=Hi, I'd like to inquire about ${encodeURIComponent(pName)} (${product.code})`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm font-body font-medium text-sm border transition-all hover:bg-orange/5" 
                      style={{ borderColor: "hsl(var(--orange))", color: "hsl(var(--orange))" }}
                    >
                      <Phone size={14} /> {t("product.whatsappUs", "WhatsApp")}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
