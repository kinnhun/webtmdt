import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { Award, Users, Shield, Globe, Leaf, ArrowDown, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import MarqueeStrip from "@/components/MarqueeStrip";

export default function AboutPage() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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

      <div className="bg-white">
        {/* ── 1. Hero Parallax ── */}
        <section ref={heroRef} className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-black">
          <motion.div style={{ y, opacity }} className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2400&auto=format&fit=crop&q=90" alt="Factory" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
          
          <div className="container mx-auto px-6 relative z-10 text-center mt-20">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-body text-white/70 tracking-[0.5em] md:tracking-[0.8em] uppercase text-xs md:text-sm mb-8 block font-bold">
              {t("about.seo.title")}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4 }} className="font-display font-black text-white italic tracking-tighter uppercase mb-8 leading-[0.85]" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", color: "hsl(var(--orange))" }}>
              {t("about.hero.title")}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }} className="font-body text-white/80 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              {t("about.hero.subtitle")}
            </motion.p>
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <ArrowDown size={32} strokeWidth={1} />
          </motion.div>
        </section>

        <MarqueeStrip />

        {/* ── 2. Welcome Message (DHT) ── */}
        <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=85" alt="Background" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              {/* Left Column */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
                <h2 className="font-display font-black uppercase italic tracking-tighter text-white mb-8 leading-[0.85] whitespace-pre-line" style={{ fontSize: "clamp(4rem, 10vw, 7rem)", color: "hsl(var(--orange))" }}>
                  {t("about.welcome.heading")}
                </h2>
                <div className="w-16 h-16 mb-10 rounded-full flex items-center justify-center bg-[hsl(var(--orange))] shadow-2xl shadow-[hsl(var(--orange))]/30">
                  <span className="text-4xl text-[hsl(var(--navy-deep))] transform -translate-y-1">❞</span>
                </div>
                <p className="font-body text-white text-xl sm:text-2xl leading-relaxed max-w-md font-light">
                  {t("about.welcome.intro")}
                </p>
              </motion.div>

              {/* Right Column */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.3 }} className="space-y-16">
                {['d', 'h', 't'].map((letter) => (
                  <div key={letter} className="flex items-start gap-6 sm:gap-10 group">
                    <div className="font-display font-black leading-none group-hover:scale-110 transition-transform duration-500 origin-bottom-left" style={{ fontSize: "clamp(6rem, 15vw, 10rem)", color: "hsl(var(--orange))", marginTop: "-0.1em" }}>
                      {t(`about.welcome.${letter}.letter`)}
                    </div>
                    <div className="pt-3 sm:pt-6">
                      <h3 className="font-display font-bold text-white text-xl sm:text-3xl tracking-[0.2em] mb-2 uppercase">
                        {t(`about.welcome.${letter}.word`)}
                      </h3>
                      <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed font-light">
                        {t(`about.welcome.${letter}.desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 3. Our Story ── */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              <div className="lg:col-span-5 lg:sticky top-32">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="h-px w-16 bg-[hsl(var(--orange))]" />
                    <span className="font-body text-xs tracking-[0.3em] uppercase font-bold text-[hsl(var(--orange))]">{t("about.story.label")}</span>
                  </div>
                  <h2 className="font-display font-black text-foreground leading-[1.1] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                    {t("about.story.heading")}
                  </h2>
                  <div className="w-24 h-2 bg-[hsl(var(--orange))] mb-10" />
                </motion.div>
              </div>
              
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }} className="prose prose-lg md:prose-xl prose-stone font-body text-muted-foreground leading-relaxed max-w-none">
                  <p className="text-2xl md:text-3xl text-foreground font-light leading-snug mb-10">{t("about.story.paragraph1")}</p>
                  <p className="mb-8">{t("about.story.paragraph2")}</p>
                  <p>{t("about.story.paragraph3")}</p>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="mt-16 rounded-sm overflow-hidden aspect-[16/9] shadow-2xl relative group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 z-10" />
                  <img src="https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1600&q=90" alt="DHT production" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Core Values ── */}
        <section className="py-32 relative overflow-hidden bg-[#FAFAFA]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-20 lg:mb-28">
              <div className="flex items-center gap-4 justify-center mb-8">
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
                <span className="font-body text-xs tracking-[0.3em] uppercase font-bold text-[hsl(var(--orange))]">{t("about.values.label")}</span>
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
              </div>
              <h2 className="font-display font-black text-foreground" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{t("about.values.heading")}</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {values.map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.1 }} className="group relative bg-white p-10 lg:p-12 border border-border/60 hover:border-[hsl(var(--orange))]/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] scroll-smooth overflow-hidden">
                  <div className="absolute -top-10 -right-4 font-display font-black text-[12rem] leading-none text-black/[0.02] group-hover:text-[hsl(var(--orange))]/[0.05] transition-colors duration-700 pointer-events-none select-none z-0">
                    {i + 1}
                  </div>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[hsl(var(--warm-cream))] mb-10 group-hover:bg-[hsl(var(--orange))] transition-colors duration-500 relative z-10">
                    <Icon size={32} className="text-foreground group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4 relative z-10">{title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed text-lg relative z-10">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Timeline (Elegant Vertical) ── */}
        <section className="py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-24 lg:mb-32">
              <div className="flex items-center gap-4 justify-center mb-8">
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
                <span className="font-body text-xs tracking-[0.3em] uppercase font-bold text-[hsl(var(--orange))]">{t("about.timeline.label")}</span>
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
              </div>
              <h2 className="font-display font-black text-foreground" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{t("about.timeline.heading")}</h2>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              {/* Central Axis */}
              <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-border/60 md:-translate-x-1/2" />
              
              {timeline.map(({ year, title, desc }, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={year} className="relative flex flex-col md:flex-row items-center mb-16 lg:mb-24 last:mb-0 group">
                    <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[hsl(var(--orange))] shadow-[0_0_0_8px_white] md:-translate-x-1/2 z-10 group-hover:scale-150 transition-transform duration-500" />
                    
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:ml-auto'}`}>
                      <motion.div initial={{ opacity: 0, x: isEven ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.1 }}>
                        <span className="font-body font-bold tracking-tight text-5xl md:text-6xl text-[hsl(var(--orange))] mb-6 block leading-none">{year}</span>
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">{title}</h3>
                        <p className="font-body text-muted-foreground leading-relaxed text-lg">{desc}</p>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. Stats & Capabilities (Dark Premium) ── */}
        <section className="py-32 bg-[hsl(var(--navy-deep))] text-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=50')] opacity-5 bg-cover bg-center mix-blend-overlay" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-24 lg:mb-32">
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="font-display font-black text-white mb-6" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{t("about.stats.heading")}</motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="font-body text-white/50 text-xl max-w-2xl mx-auto font-light leading-relaxed">{t("about.stats.subtitle")}</motion.p>
            </div>

            {/* Elegant Numbers Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-32">
              {[
                { value: "80K", suffix: "m²", label: t("about.stats.factorySize") },
                { value: "350K", suffix: "+", label: t("about.stats.yearlyOutput") },
                { value: "60-70", suffix: "", label: t("about.stats.monthlyContainers") },
                { value: "250", suffix: "+", label: t("about.stats.workers") }
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="relative bg-white/[0.02] border border-white/5 p-6 sm:p-8 lg:p-10 hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-500 rounded-sm overflow-hidden group hover:shadow-2xl">
                  {/* Subtle Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[hsl(var(--orange))] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <div className="font-body font-bold text-4xl sm:text-5xl lg:text-5xl tracking-tight mb-4 text-white group-hover:text-[hsl(var(--orange))] transition-colors duration-500">
                    {stat.value}<span className="text-xl sm:text-2xl lg:text-3xl ml-1 font-medium">{stat.suffix}</span>
                  </div>
                  <p className="font-body font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 leading-relaxed">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Info Cards */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Human Resources & R&D */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-10 lg:p-16 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-sm hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-500">
                <h3 className="font-display font-black text-3xl lg:text-4xl mb-12 text-white flex items-center gap-4">
                  <span className="w-12 h-1 bg-[hsl(var(--orange))]" />
                  {t("about.hr.heading")}
                </h3>
                <ul className="space-y-8">
                  {[t("about.hr.prodWorkers"), t("about.hr.techStaff"), t("about.hr.rndModels")].map((item, i) => (
                    <li key={i} className="flex items-start gap-5 group">
                      <div className="shrink-0 mt-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-[hsl(var(--orange))/0.15] text-[hsl(var(--orange))] group-hover:bg-[hsl(var(--orange))] group-hover:text-black transition-colors duration-300">
                        <div className="w-2 h-2 rounded-full bg-current" />
                      </div> 
                      <span className="font-body text-white/80 text-lg leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Machinery */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="p-10 lg:p-16 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-sm hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-500">
                <h3 className="font-display font-black text-3xl lg:text-4xl mb-12 text-white flex items-center gap-4">
                  <span className="w-12 h-1 bg-[hsl(var(--orange))]" />
                  {t("about.machinery.heading")}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
                  {[
                    { count: "15+", label: t("about.machinery.panelSaws") },
                    { count: "12", label: t("about.machinery.planers") },
                    { count: "5", label: t("about.machinery.pressing") },
                    { count: "4", label: t("about.machinery.cnc") },
                    { count: "8", label: t("about.machinery.coating") },
                    { count: "5", label: t("about.machinery.kilns") },
                    { count: "3", label: t("about.machinery.packaging") }
                  ].map((item, i) => (
                    <li key={i} className="flex flex-col gap-3 relative pl-5 border-l-2 border-[hsl(var(--orange))/0.2] hover:border-[hsl(var(--orange))] transition-colors duration-300">
                      <span className="font-body font-bold tracking-tight text-3xl md:text-4xl leading-none text-[hsl(var(--orange))]">{item.count}</span> 
                      <span className="font-body text-white/70 leading-relaxed font-light text-sm sm:text-base">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 7. Executive Board ── */}
        <section className="py-32 relative overflow-hidden bg-white">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 -mt-32 -mr-32 w-[500px] h-[500px] bg-[hsl(var(--orange))/0.03] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-[500px] h-[500px] bg-[hsl(var(--orange))/0.03] rounded-full blur-[100px]" />

          <div className="container mx-auto px-6 relative z-10">
            {/* Heading */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-24">
              <h2 className="font-display font-black uppercase text-foreground mb-6" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>
                {t("about.team.heading")}
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--orange))] mx-auto" />
            </motion.div>

            {/* Featured (John Vo) */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center lg:items-start bg-[#FAFAFA] p-8 lg:p-12 border border-border/60 rounded-sm mb-16 hover:shadow-2xl hover:shadow-black/[0.03] transition-all duration-500">
              <div className="w-48 sm:w-64 lg:w-[22rem] aspect-[3/4] overflow-hidden shrink-0 shadow-lg rounded-sm">
                <img src="/img/profile/johnvo.png" alt="John Vo" className="w-full h-full object-cover object-top" />
              </div>
              <div className="pt-2 flex-grow text-center md:text-left flex flex-col justify-center h-full">
                <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-wider mb-4 text-foreground">John Vo</h3>
                <div className="mb-10">
                  <span className="inline-block px-5 py-2.5 text-xs font-body font-bold uppercase tracking-[0.2em] bg-[hsl(var(--orange))] text-white rounded-sm">
                    {t("about.team.john.role")}
                  </span>
                </div>
                
                <p className="font-display italic text-2xl sm:text-3xl text-muted-foreground leading-relaxed mb-12 md:border-l-4 md:pl-8 border-[hsl(var(--orange))/0.4]">
                  &ldquo;{t("about.team.john.quote")}&rdquo;
                </p>

                <div className="flex flex-col sm:flex-row gap-8 font-body text-base text-muted-foreground font-medium justify-center md:justify-start">
                  <a href="mailto:sales@dhtcompany.com" className="flex items-center gap-3 hover:text-[hsl(var(--orange))] transition-colors">
                    <span className="text-[hsl(var(--orange))] text-xl">✉</span> sales@dhtcompany.com
                  </a>
                  <a href="tel:+84932058545" className="flex items-center gap-3 hover:text-[hsl(var(--orange))] transition-colors">
                    <span className="text-[hsl(var(--orange))] text-xl">✆</span> +84 932 058 545
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Subordinates */}
            {(() => {
              const team = [
                { name: "Tyler Lê", key: "tyler", email: "tyler@dhtcompany.com", phone: "+84 902 907 399", image: "/img/profile/tylerle.png" },
                { name: "Dylan", key: "dylan", email: "dylan@dhtcompany.com", phone: "+84 907 386 898", image: "/img/profile/dylan.png" },
                { name: "David", key: "david", email: "david@dhtcompany.com", phone: "+84 932 057 861", image: "/img/profile/david.png" },
                { name: "Alicia", key: "alicia", email: "alicia@dhtcompany.com", phone: "+84 964 256 456", image: "/img/profile/alicia.png" },
              ];

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {team.map((m, i) => (
                    <motion.div key={m.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="flex flex-col bg-white border border-border/60 hover:border-[hsl(var(--orange))/0.4] hover:shadow-xl hover:shadow-[hsl(var(--orange))]/5 transition-all duration-500 rounded-sm overflow-hidden group">
                      <div className="w-full aspect-[4/5] overflow-hidden bg-[#FAFAFA]">
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-8 flex flex-col grow text-center">
                        <h3 className="font-display font-black text-2xl uppercase tracking-wider mb-2 text-foreground group-hover:text-[hsl(var(--orange))] transition-colors duration-500">{m.name}</h3>
                        <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] mb-6 text-[hsl(var(--orange))]">{t(`about.team.${m.key}.role`)}</span>
                        
                        <p className="font-display italic text-sm text-muted-foreground leading-relaxed mb-8 grow">
                          &ldquo;{t(`about.team.${m.key}.quote`)}&rdquo;
                        </p>

                        <div className="space-y-4 font-body text-sm text-muted-foreground font-medium border-t border-border/50 pt-6">
                          <a href={`mailto:${m.email}`} className="flex items-center justify-center gap-3 hover:text-black transition-colors">
                            <span className="text-[hsl(var(--orange))]">✉</span> <span className="truncate">{m.email}</span>
                          </a>
                          <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-3 hover:text-black transition-colors">
                            <span className="text-[hsl(var(--orange))]">✆</span> {m.phone}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── 8. Locations ── */}
        <section className="py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-24">
              <h2 className="font-display font-black text-foreground mb-6" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{t("about.locations.heading")}</h2>
              <div className="w-24 h-1 bg-[hsl(var(--orange))] mx-auto" />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['factory', 'office', 'showroom', 'jdd'].map((key, i) => (
                <motion.div key={key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="group p-10 bg-white border border-border hover:border-[hsl(var(--orange))] hover:shadow-2xl hover:shadow-[hsl(var(--orange))]/10 transition-all duration-500">
                  <div className="w-16 h-16 bg-[hsl(var(--warm-cream))] rounded-full flex items-center justify-center mb-8 group-hover:bg-[hsl(var(--orange))] transition-colors duration-500">
                    <Globe size={24} className="text-foreground group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-display font-black text-2xl mb-4 text-foreground uppercase tracking-wide">{t(`about.locations.${key}.name`)}</h3>
                  <p className="font-body text-muted-foreground mb-8 leading-loose font-light">
                    {t(`about.locations.${key}.address`)}
                  </p>
                  <a href={`tel:${t(`about.locations.${key}.hotline`).replace(/\s/g, "")}`} className="font-body font-bold text-lg text-[hsl(var(--orange))] hover:text-black transition-colors block border-t pt-6 line-clamp-1">
                    {t(`about.locations.${key}.hotline`)}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. Call To Action ── */}
        <section className="py-40 text-center relative overflow-hidden bg-[hsl(var(--navy-deep))]">
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="font-display font-black text-white mb-12 uppercase tracking-tight" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              {t("about.cta.heading")}
            </motion.h2>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-6 font-display font-black text-lg text-black bg-[hsl(var(--orange))] hover:bg-white hover:text-black transition-all duration-500 shadow-xl hover:shadow-white/20 uppercase tracking-widest group">
                {t("about.cta.button")}
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
