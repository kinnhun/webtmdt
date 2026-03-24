import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { Award, Users, Truck, Shield, Globe, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import MarqueeStrip from "@/components/MarqueeStrip";

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    { icon: Award, title: t("about.values.qualityFirst.title"), desc: t("about.values.qualityFirst.desc") },
    { icon: Users, title: t("about.values.craftspeople.title"), desc: t("about.values.craftspeople.desc") },
    { icon: Truck, title: t("about.values.globalExport.title"), desc: t("about.values.globalExport.desc") },
    { icon: Shield, title: t("about.values.warranty.title"), desc: t("about.values.warranty.desc") },
    { icon: Globe, title: t("about.values.customOem.title"), desc: t("about.values.customOem.desc") },
    { icon: Leaf, title: t("about.values.sustainable.title"), desc: t("about.values.sustainable.desc") },
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

        <section className="py-16 text-center" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>{t("about.cta.heading")}</motion.h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm font-body font-semibold text-sm text-white mt-4 hover:opacity-90 transition-all" style={{ backgroundColor: "hsl(var(--orange))" }}>{t("about.cta.button")}</Link>
        </section>
      </div>
    </>
  );
}
