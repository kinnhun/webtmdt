import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const { product, code } = router.query;
    if (product) {
      setForm((prev) => ({
        ...prev,
        subject: `Inquiry: ${product}${code ? ` (${code})` : ""}`,
        message: `Hi, I would like to inquire about ${product}${code ? ` (Code: ${code})` : ""}.\n\nPlease provide pricing and availability information.\n\nThank you.`,
      }));
    }
  }, [router.query]);

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

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+62 21 234 567 890", href: "tel:+6221234567890" },
    { icon: Mail, label: "Email", value: "info@dht-furniture.com", href: "mailto:info@dht-furniture.com" },
    { icon: MapPin, label: "Factory", value: "12 Commerce Blvd, Jakarta 12345" },
    { icon: Clock, label: "Hours", value: "Mon–Fri, 08:00 – 17:00 WIB" },
    { icon: Globe, label: "Export", value: "Worldwide shipping available" },
  ];

  return (
    <>
      <Head>
        <title>Contact — DHT Outdoor Furniture</title>
        <meta name="description" content="Get in touch for quotes, custom orders, and project inquiries." />
      </Head>
      <div className="pt-20" style={{ minHeight: "100vh", backgroundColor: "hsl(var(--warm-cream))" }}>
        <div className="py-16 text-center" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display font-bold text-white mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Get in Touch</motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-body text-white/50 text-sm max-w-md mx-auto">Contact our team for custom quotes, orders, and inquiries</motion.p>
        </div>
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-4 bg-white rounded-sm border border-border">
                  <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(var(--orange)/0.1)" }}>
                    <Icon size={18} style={{ color: "hsl(var(--orange))" }} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (<a href={href} className="font-body text-sm font-medium text-foreground hover:text-orange transition-colors">{value}</a>) : (<p className="font-body text-sm font-medium text-foreground">{value}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-white rounded-sm border border-border">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--orange)/0.1)" }}>
                    <Send size={24} style={{ color: "hsl(var(--orange))" }} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">Thank You!</h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">Your inquiry has been submitted. We&apos;ll respond within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="font-body text-sm font-medium" style={{ color: "hsl(var(--orange))" }}>Send another inquiry</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-border p-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Name *</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition" />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition" />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Phone</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition" />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Company</label>
                      <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition" />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Subject *</label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition" />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Message *</label>
                    <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm font-body text-sm outline-none focus:ring-2 focus:ring-orange/30 transition resize-none" />
                  </div>
                  <button type="submit" disabled={sending} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: "hsl(var(--orange))" }}>
                    <Send size={15} /> {sending ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
