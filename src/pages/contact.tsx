import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { GetServerSideProps } from "next";
import dbConnect from "@/lib/mongodb";
import ContactContent from "@/models/ContactContent";

function useLang() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  if (lang === 'vi-VN' || lang === 'vi') return 'vi';
  if (lang === 'en-GB') return 'uk';
  return 'us';
}

function txt(obj: any, langKey: string): string {
  if (!obj) return '';
  const val = obj[langKey];
  if (val) return val;
  return obj.us || '';
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await dbConnect();
    const doc = await ContactContent.findOne().lean();
    return {
      props: {
        dbData: doc ? JSON.parse(JSON.stringify(doc)) : null,
      },
    };
  } catch {
    return { props: { dbData: null } };
  }
};

export default function ContactPage({ dbData }: { dbData: any }) {
  const router = useRouter();
  const { t } = useTranslation();
  const langKey = useLang();
  
  const hasDB = !!dbData;
  const d = (dbPath: string[], i18nKey: string): string => {
    if (hasDB && dbData) {
      let val: any = dbData;
      for (const key of dbPath) {
        val = val?.[key];
      }
      if (val && typeof val === 'object' && ('us' in val || 'uk' in val || 'vi' in val)) {
        const textValue = txt(val, langKey);
        if (textValue.trim() !== '') return textValue;
      } else if (typeof val === 'string' && val.trim() !== '') {
        return val;
      }
    }
    return t(i18nKey);
  };

  const legacy = dbData?.formSection?.labels || {};
  const fields = dbData?.formSection?.fields?.length > 0 ? dbData.formSection.fields : [
    { id: 'f1', key: 'name', type: 'text', required: true, width: 'half', label: legacy.name || { us: '<p>Name</p>', uk: '<p>Name</p>', vi: '<p>Họ tên</p>' } },
    { id: 'f2', key: 'email', type: 'email', required: true, width: 'half', label: legacy.email || { us: '<p>Email</p>', uk: '<p>Email</p>', vi: '<p>Email</p>' } },
    { id: 'f3', key: 'phone', type: 'tel', required: false, width: 'half', label: legacy.phone || { us: '<p>Phone</p>', uk: '<p>Phone</p>', vi: '<p>Số điện thoại</p>' } },
    { id: 'f4', key: 'company', type: 'text', required: false, width: 'half', label: legacy.company || { us: '<p>Company</p>', uk: '<p>Company</p>', vi: '<p>Công ty</p>' } },
    { id: 'f5', key: 'category', type: 'category', required: true, width: 'full', label: legacy.category || { us: '<p>Inquiry Category</p>', uk: '<p>Inquiry Category</p>', vi: '<p>Danh mục quan tâm</p>' } },
    { id: 'f6', key: 'subject', type: 'text', required: true, width: 'full', label: legacy.subject || { us: '<p>Subject</p>', uk: '<p>Subject</p>', vi: '<p>Tiêu đề</p>' } },
    { id: 'f7', key: 'message', type: 'textarea', required: true, width: 'full', label: legacy.message || { us: '<p>Message</p>', uk: '<p>Message</p>', vi: '<p>Nội dung</p>' } },
  ];

  const [form, setForm] = useState<Record<string, string>>({ interestedProduct: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [categories, setCategories] = useState<{key: string, label: string}[]>([]);

  useEffect(() => {
    const { product, code } = router.query;
    if (product) {
      setForm((prev) => ({
        ...prev,
        subject: t("contact.form.inquirySubject", { product, code: code ? ` (${code})` : "" }),
        message: t("contact.form.inquiryMessage", { product, code: code ? ` (Code: ${code})` : "" }),
        interestedProduct: `${product}${code ? ` - ${code}` : ""}`,
      }));
    }
  }, [router.query, t]);

  useEffect(() => {
    // Fetch categories dynamically
    fetch("/api/admin/inquiries/settings")
      .then(res => res.json())
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          const cats = data.filter(s => s.type === 'category' && s.isActive).sort((a,b) => a.order - b.order);
          setCategories(cats);
          if (cats.length > 0) {
            setForm(prev => ({ ...prev, category: cats[0].key }));
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setSent(true);
      setForm({ interestedProduct: "" });
    } catch { /* ignore */ }
    setSending(false);
  };

  const locations = (hasDB && dbData.locations?.items?.length) 
    ? dbData.locations.items.map((loc: any) => ({
        title: txt(loc.title, langKey),
        subtitle: txt(loc.subtitle, langKey),
        address: txt(loc.address, langKey),
        phone: loc.phone || "",
        href: loc.href || `tel:${(loc.phone || "").replace(/\s/g, "")}`,
        hours: txt(loc.hours, langKey)
      }))
    : [
        {
          title: t("contact.locations.hqTitle"),
          subtitle: t("contact.locations.hqSubtitle"),
          address: "19 National Highway, Nguyen Hue Ward, Phuoc Loc, Tuy Phuoc District, Binh Dinh Province, Vietnam",
          phone: "+84 902 907 399",
          href: "tel:+84902907399",
          hours: t("contact.locations.timingsFactory")
        },
        {
          title: t("contact.locations.showroomTitle"),
          subtitle: t("contact.locations.showroomSubtitle"),
          address: "Vinh Thanh 2 Hamlet, Tuy Phuoc Commune, Gia Lai Province, Vietnam",
          phone: "+84 907 386 898",
          href: "tel:+84907386898",
          hours: t("contact.locations.timingsFactory")
        },
        {
          title: t("contact.locations.officeTitle"),
          subtitle: t("contact.locations.officeSubtitle"),
          address: "72 Le Thanh Ton Street, Sai Gon Ward, Ho Chi Minh City, Vietnam",
          phone: "+84 907 386 898",
          href: "tel:+84907386898",
          hours: t("contact.locations.timings247")
        },
        {
          title: t("contact.locations.distributorTitle"),
          subtitle: t("contact.locations.distributorSubtitle"),
          address: "226 Go Dua Street, Tam Binh Ward, Thu Duc City, Ho Chi Minh City, Vietnam",
          phone: "+84 932 058 545",
          href: "tel:+84932058545",
          hours: t("contact.locations.timingsFactory")
        }
      ];

  return (
    <>
      <Head>
        <title>{d(['seo', 'title'], "contact.seo.title")}</title>
        <meta name="description" content={d(['seo', 'description'], "contact.seo.description")} />
      </Head>
      <div className="pt-20" style={{ minHeight: "100vh", backgroundColor: "hsl(var(--warm-cream))" }}>
        <div className="py-20 text-center" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display font-bold text-white mb-4 rt-reset" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }} dangerouslySetInnerHTML={{ __html: d(['hero', 'title'], "contact.hero.title") }} />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-body text-white/60 text-base max-w-xl mx-auto px-4 rt-reset" dangerouslySetInnerHTML={{ __html: d(['hero', 'subtitle'], "contact.hero.subtitle") }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 py-20">
          {/* LOCATIONS GRID */}
          <div className="mb-24">
            <h2 className="font-display text-3xl font-bold text-center mb-12 rt-reset" style={{ color: "hsl(var(--navy-deep))" }} dangerouslySetInnerHTML={{ __html: d(['locations', 'heading'], "contact.locations.title") }} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {locations.map((loc: any, i: number) => (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.5 }} key={i} className="bg-white p-6 rounded-sm border border-border flex flex-col h-full hover:shadow-lg transition-shadow">
                  <h3 className="font-display font-bold text-lg mb-1 leading-tight rt-reset" style={{ color: "hsl(var(--navy-deep))" }} dangerouslySetInnerHTML={{ __html: loc.title }} />
                  <div className="font-body text-[10px] tracking-wider uppercase font-semibold mb-5 rt-reset" style={{ color: "hsl(var(--orange))" }} dangerouslySetInnerHTML={{ __html: loc.subtitle }} />
                  
                  <div className="space-y-4 font-body text-sm text-muted-foreground flex-1">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--orange))" }} />
                      <span className="leading-relaxed rt-reset block flex-1 break-words min-w-0" dangerouslySetInnerHTML={{ __html: loc.address }} />
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--orange))" }} />
                      <div className="flex-1 min-w-0 break-words">
                        <a href={loc.href} className="font-medium hover:text-orange transition-colors block mb-0.5 text-foreground break-words">{loc.phone}</a>
                        <span className="text-xs opacity-80 block rt-reset break-words" dangerouslySetInnerHTML={{ __html: loc.hours }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold mb-4 rt-reset" style={{ color: "hsl(var(--navy-deep))" }} dangerouslySetInnerHTML={{ __html: d(['formSection', 'title'], "contact.formSection.title") }} />
              <div 
                className="font-body text-muted-foreground contact-subtitle-rt" 
                dangerouslySetInnerHTML={{ __html: d(['formSection', 'subtitle'], "contact.formSection.subtitle") }} 
              />
            </div>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-white rounded-sm border border-border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--orange)/0.1)" }}>
                  <Send size={24} style={{ color: "hsl(var(--orange))" }} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2 rt-reset" dangerouslySetInnerHTML={{ __html: d(['formSection', 'successTitle'], "contact.success.title") }} />
                <div 
                  className="font-body text-sm text-muted-foreground mb-6" 
                  dangerouslySetInnerHTML={{ __html: d(['formSection', 'successDesc'], "contact.success.description") }} 
                />
                <button onClick={() => setSent(false)} className="font-body text-sm font-medium rt-reset" style={{ color: "hsl(var(--orange))" }} dangerouslySetInnerHTML={{ __html: d(['formSection', 'sendAnotherBtn'], "contact.success.sendAnother") }} />
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-border p-6 sm:p-10 shadow-sm">
                <div className="flex flex-wrap -mx-2.5">
                  {fields.map((f: any, idx: number) => {
                    const labelText = txt(f.label, langKey) || f.key;
                    const isHalf = f.width === 'half';
                    
                    return (
                      <div key={f.key || f.id || `field-${idx}`} className={`px-2.5 mb-5 ${isHalf ? 'w-full md:w-1/2' : 'w-full'}`}>
                        <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block rt-reset">
                          <span dangerouslySetInnerHTML={{ __html: labelText }} /> {f.required && "*"}
                        </label>
                        
                        {f.type === 'textarea' ? (
                          <textarea 
                            rows={5} 
                            required={f.required} 
                            value={form[f.key] || ""} 
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} 
                            className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition resize-none shadow-sm" 
                          />
                        ) : f.type === 'category' ? (
                          <select 
                            required={f.required} 
                            value={form[f.key] || ""} 
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} 
                            className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition shadow-sm bg-white"
                          >
                            {categories.length > 0 ? categories.map((c, cIdx) => (
                              <option key={c.key || `cat-${cIdx}`} value={c.key}>{c.label}</option>
                            )) : (
                              <option value="other">Other</option>
                            )}
                          </select>
                        ) : f.type === 'select' ? (
                           <select 
                             required={f.required} 
                             value={form[f.key] || ""} 
                             onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} 
                             className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition shadow-sm bg-white"
                           >
                             <option value="" disabled>Select an option</option>
                             {(f.options || []).map((o: any, oIdx: number) => (
                               <option key={o.key || `opt-${oIdx}`} value={txt(o.label, langKey)}>{txt(o.label, langKey)}</option>
                             ))}
                           </select>
                        ) : (
                          <input 
                            type={f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : 'text'} 
                            required={f.required} 
                            value={form[f.key] || ""} 
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} 
                            className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition shadow-sm" 
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: "hsl(var(--orange))" }}>
                    {!sending && <Send size={16} />}
                    <span className="rt-reset" dangerouslySetInnerHTML={{ __html: sending ? d(['formSection', 'labels', 'sendingBtn'], "contact.form.sending") : d(['formSection', 'labels', 'sendBtn'], "contact.form.sendInquiry") }} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .contact-subtitle-rt p { margin-bottom: 0.5rem; }
        .contact-subtitle-rt p:last-child { margin-bottom: 0; }
        .contact-subtitle-rt strong { font-weight: bold; color: inherit; }
        .contact-subtitle-rt em { font-style: italic; }
        .rt-reset p { margin: 0 !important; display: inline !important; }
      `}</style>
    </>
  );
}
