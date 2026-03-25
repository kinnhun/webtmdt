import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { Award, Users, Shield, Globe, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import MarqueeStrip from "@/components/MarqueeStrip";

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    { icon: Award, title: t("about.values.quality.title"), desc: t("about.values.quality.desc") },
    { icon: Shield, title: t("about.values.transparency.title"), desc: t("about.values.transparency.desc") },
    { icon: Globe, title: t("about.values.creativity.title"), desc: t("about.values.creativity.desc") },
    { icon: Leaf, title: t("about.values.sustainability.title"), desc: t("about.values.sustainability.desc") },
    { icon: Users, title: t("about.values.dedication.title"), desc: t("about.values.dedication.desc") },
  ];

  const timeline = t("about.timeline.items", { returnObjects: true }) as Array<{ year: string; title: string; desc: string }>;

  return (
    <>
      <Head>
        <title>{t("about.seo.title")}</title>
        <meta name="description" content={t("about.seo.description")} />
      </Head>
      <div className="pt-20">
        <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=85" alt="Factory" className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>{t("about.hero.title")}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-body text-white/60 text-base max-w-lg mx-auto">{t("about.hero.subtitle")}</motion.p>
          </div>
        </section>

        <MarqueeStrip />

        <section className="py-24" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                  <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>{t("about.story.label")}</span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{t("about.story.heading")}</h2>
                <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                  <p>{t("about.story.paragraph1")}</p>
                  <p>{t("about.story.paragraph2")}</p>
                  <p>{t("about.story.paragraph3")}</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-sm overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src="https://images.unsplash.com/photo-1549497538-303791108f95?w=900&auto=format&fit=crop&q=85" alt="DHT production" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            <div className="mb-24">
              <div className="text-center mb-12">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                  <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>{t("about.values.label")}</span>
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                </div>
                <h2 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{t("about.values.heading")}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-white rounded-sm p-7 border border-border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded flex items-center justify-center mb-4" style={{ backgroundColor: "hsl(var(--orange)/0.1)" }}>
                      <Icon size={22} style={{ color: "hsl(var(--orange))" }} />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-center mb-12">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                  <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>{t("about.timeline.label")}</span>
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                </div>
                <h2 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{t("about.timeline.heading")}</h2>
              </div>
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-6 top-0 bottom-0 w-px" style={{ backgroundColor: "hsl(var(--border))" }} />
                {timeline.map(({ year, title, desc }, i) => (
                  <motion.div key={year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative pl-16 pb-10 last:pb-0">
                    <div className="absolute left-3.5 top-1 w-5 h-5 rounded-full border-2 bg-white" style={{ borderColor: "hsl(var(--orange))" }} />
                    <span className="font-body text-xs font-bold tracking-wider uppercase" style={{ color: "hsl(var(--orange))" }}>{year}</span>
                    <h3 className="font-display font-semibold text-lg text-foreground mt-1 mb-1">{title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Executive Board ── */}
        <section className="py-16 sm:py-28 relative overflow-hidden" style={{ backgroundColor: "hsl(var(--navy-dark))" }}>
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=85" alt="" className="w-full h-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(var(--navy-dark)) 0%, transparent 50%, hsl(var(--navy-dark)) 100%)" }} />
          </div>
          {/* Watermark */}
          <span className="absolute bottom-5 left-8 font-body text-xs tracking-[0.2em] uppercase text-white/10 z-10 hidden lg:block">www.dhtcompany.com</span>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* ─── Row 1: Logo+Title (left) │ John Vo (right) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-10">
              {/* Left — Logo + Heading */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="flex flex-col justify-center">
                <img src="/img/logo.png" alt="DHT" className="w-20 h-20 sm:w-28 sm:h-28 object-contain mb-8 rounded-sm" />
                <h2 className="font-display font-black uppercase leading-[0.9]" style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "hsl(var(--orange))", letterSpacing: "-0.02em" }}>
                  {t("about.team.heading")}
                </h2>
                <div className="mt-4 h-1 w-20 rounded-full" style={{ backgroundColor: "hsl(var(--orange))" }} />
              </motion.div>

              {/* Right — John Vo (featured) */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                className="flex gap-5 sm:gap-6 items-start">
                <div className="w-32 sm:w-44 aspect-[3/4] rounded-lg overflow-hidden shrink-0 border-2" style={{ borderColor: "hsl(var(--orange)/0.4)" }}>
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80" alt="John Vo" className="w-full h-full object-cover" />
                </div>
                <div className="pt-2">
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide" style={{ color: "hsl(var(--orange))" }}>John Vo</h3>
                  <span className="inline-block px-4 py-1 rounded-full text-xs font-body font-bold uppercase tracking-wider mt-2 mb-4 border" style={{ borderColor: "hsl(var(--orange))", color: "hsl(var(--orange))", backgroundColor: "hsl(var(--orange)/0.1)" }}>{t("about.team.john.role")}</span>
                  <div className="space-y-1.5 font-body text-sm text-white/60 mb-4">
                    <a href="mailto:sales@dhtcompany.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                      <span className="text-base" style={{ color: "hsl(var(--orange))" }}>✉</span> sales@dhtcompany.com
                    </a>
                    <a href="tel:+84932058545" className="flex items-center gap-2.5 hover:text-white transition-colors">
                      <span className="text-base" style={{ color: "hsl(var(--orange))" }}>✆</span> +84 932 058 545
                    </a>
                  </div>
                  <p className="font-body text-sm text-white/45 italic leading-relaxed max-w-sm">&ldquo;{t("about.team.john.quote")}&rdquo;</p>
                </div>
              </motion.div>
            </div>

            {/* ─── Row 2 & 3 ─── */}
            {(() => {
              const row2 = [
                { name: "Tyler Lê", key: "tyler", email: "tyler@dhtcompany.com", phone: "+84 902 907 399", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80" },
                { name: "Dylan", key: "dylan", email: "dylan@dhtcompany.com", phone: "+84 907 386 898", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
              ];
              const row3 = [
                { name: "David", key: "david", email: "david@dhtcompany.com", phone: "+84 932 057 861", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80" },
                { name: "Alicia", key: "alicia", email: "alicia@dhtcompany.com", phone: "+84 964 256 456", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" },
              ];

              const renderCard = (m: typeof row2[0], delay: number) => (
                <motion.div key={m.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}
                  className="flex gap-4 sm:gap-5 items-start p-5 sm:p-7 rounded-lg border border-white/[0.08] backdrop-blur-sm hover:border-white/15 transition-colors duration-300"
                  style={{ backgroundColor: "hsl(var(--navy-deep)/0.5)" }}>
                  <div className="w-24 sm:w-28 aspect-[3/4] rounded-lg overflow-hidden shrink-0 border" style={{ borderColor: "hsl(var(--orange)/0.3)" }}>
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 pt-1">
                    <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-wide" style={{ color: "hsl(var(--orange))" }}>{m.name}</h3>
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-body font-bold uppercase tracking-wider mt-1 mb-3 border" style={{ borderColor: "hsl(var(--orange))", color: "hsl(var(--orange))", backgroundColor: "hsl(var(--orange)/0.1)" }}>{t(`about.team.${m.key}.role`)}</span>
                    <div className="space-y-1 font-body text-sm text-white/55 mb-3">
                      <a href={`mailto:${m.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                        <span style={{ color: "hsl(var(--orange))" }}>✉</span> {m.email}
                      </a>
                      <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white transition-colors">
                        <span style={{ color: "hsl(var(--orange))" }}>✆</span> {m.phone}
                      </a>
                    </div>
                    <p className="font-body text-sm text-white/40 italic leading-relaxed">&ldquo;{t(`about.team.${m.key}.quote`)}&rdquo;</p>
                  </div>
                </motion.div>
              );

              return (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
                    {row2.map((m, i) => renderCard(m, 0.1 + i * 0.08))}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {row3.map((m, i) => renderCard(m, 0.15 + i * 0.08))}
                  </div>
                </>
              );
            })()}
          </div>
        </section>

        <section className="py-16 text-center" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>{t("about.cta.heading")}</motion.h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm font-body font-semibold text-sm text-white mt-4 hover:opacity-90 transition-all" style={{ backgroundColor: "hsl(var(--orange))" }}>{t("about.cta.button")}</Link>
        </section>
      </div>
    </>
  );
}
