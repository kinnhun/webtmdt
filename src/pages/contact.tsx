import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const { product, code } = router.query;
    if (product) {
      setForm((prev) => ({
        ...prev,
        subject: t("contact.form.inquirySubject", { product, code: code ? ` (${code})` : "" }),
        message: t("contact.form.inquiryMessage", { product, code: code ? ` (Code: ${code})` : "" }),
      }));
    }
  }, [router.query, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setSent(true);
      setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch { /* ignore */ }
    setSending(false);
  };

  const locations = [
    {
      title: "DHT Furniture Vietnam Factory",
      subtitle: "Manufacturing & Production",
      address: "19 National Highway, Nguyen Hue Ward, Phuoc Loc, Tuy Phuoc District, Binh Dinh Province, Vietnam",
      phone: "+84 902 907 399",
      href: "tel:+84902907399",
      hours: "From 8:00 AM - 17:00 PM (VN Time)"
    },
    {
      title: "DHT Private Garden Showroom",
      subtitle: "Exclusive Displays",
      address: "Vinh Thanh 2 Hamlet, Tuy Phuoc Commune, Gia Lai Province, Vietnam",
      phone: "+84 907 386 898",
      href: "tel:+84907386898",
      hours: "From 8:00 AM - 17:00 PM (VN Time)"
    },
    {
      title: "DHT Furniture Vietnam Office",
      subtitle: "Commercial & CS Dept.",
      address: "72 Le Thanh Ton Street, Sai Gon Ward, Ho Chi Minh City, Vietnam",
      phone: "+84 907 386 898",
      href: "tel:+84907386898",
      hours: "24/7"
    },
    {
      title: "JDD Global Furnishing Co. Ltd",
      subtitle: "Global Distribution",
      address: "226 Go Dua Street, Tam Binh Ward, Thu Duc City, Ho Chi Minh City, Vietnam",
      phone: "+84 932 058 545",
      href: "tel:+84932058545",
      hours: "From 8:00 AM - 17:00 PM (VN Time)"
    }
  ];

  return (
    <>
      <Head>
        <title>{t("contact.seo.title")}</title>
        <meta name="description" content={t("contact.seo.description")} />
      </Head>
      <div className="pt-20" style={{ minHeight: "100vh", backgroundColor: "hsl(var(--warm-cream))" }}>
        <div className="py-20 text-center" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>{t("contact.hero.title")}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-body text-white/60 text-base max-w-xl mx-auto px-4">{t("contact.hero.subtitle")}</motion.p>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 py-20">
          {/* LOCATIONS GRID */}
          <div className="mb-24">
            <h2 className="font-display text-3xl font-bold text-center mb-12" style={{ color: "hsl(var(--navy-deep))" }}>Our Global Presence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {locations.map((loc, i) => (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.5 }} key={loc.title} className="bg-white p-6 rounded-sm border border-border flex flex-col h-full hover:shadow-lg transition-shadow">
                  <h3 className="font-display font-bold text-lg mb-1 leading-tight" style={{ color: "hsl(var(--navy-deep))" }}>{loc.title}</h3>
                  <p className="font-body text-[10px] tracking-wider uppercase font-semibold mb-5" style={{ color: "hsl(var(--orange))" }}>{loc.subtitle}</p>
                  
                  <div className="space-y-4 font-body text-sm text-muted-foreground flex-1">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--orange))" }} />
                      <span className="leading-relaxed">{loc.address}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--orange))" }} />
                      <div>
                        <a href={loc.href} className="font-medium hover:text-orange transition-colors block mb-0.5 text-foreground">{loc.phone}</a>
                        <span className="text-xs opacity-80 block">{loc.hours}</span>
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
              <h2 className="font-display text-3xl font-bold mb-4" style={{ color: "hsl(var(--navy-deep))" }}>Send an Inquiry</h2>
              <p className="font-body text-muted-foreground">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-white rounded-sm border border-border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--orange)/0.1)" }}>
                  <Send size={24} style={{ color: "hsl(var(--orange))" }} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">{t("contact.success.title")}</h3>
                <p className="font-body text-sm text-muted-foreground mb-6">{t("contact.success.description")}</p>
                <button onClick={() => setSent(false)} className="font-body text-sm font-medium" style={{ color: "hsl(var(--orange))" }}>{t("contact.success.sendAnother")}</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-border p-6 sm:p-10 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("contact.form.name")} *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition shadow-sm" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("contact.form.email")} *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition shadow-sm" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("contact.form.phone")}</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition shadow-sm" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("contact.form.company")}</label>
                    <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition shadow-sm" />
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("contact.form.subject")} *</label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition shadow-sm" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">{t("contact.form.message")} *</label>
                    <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition resize-none shadow-sm" />
                  </div>
                  <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 mt-2 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: "hsl(var(--orange))" }}>
                    <Send size={15} /> {sending ? t("contact.form.sending") : t("contact.form.sendInquiry")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
