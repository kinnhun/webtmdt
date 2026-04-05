import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { 
  Award, Users, Shield, Globe, Leaf, ArrowDown, ChevronRight, Star, Heart, Zap, Target, CheckCircle,
  Factory, Truck, Package, ShoppingCart, ShoppingBag, Box, Building, Briefcase, 
  Cpu, Battery, Phone, Mail, MapPin, Clock, Calendar, MessageCircle, AlertCircle, 
  Info, Flag, Sun, Moon, TreePine, Droplet, Flame, Lightbulb, Link as LucideLink, Lock, Search, 
  Send, ThumbsUp, TrendingUp, Compass, Anchor, Layout, Code, Coffee, Activity, 
  Gem, Key, Map as MapIcon, Layers, LayoutGrid, LayoutTemplate, PenTool,
  Camera, Video, Monitor, Smartphone, Tablet, Watch, Speaker, Headphones, Mic, 
  Wifi, Bluetooth, Share, Download, Cloud, Server, Database, Save, Edit, 
  Trash, Settings, Wrench, Menu, Home, User, Smile, Eye, Music, Play
} from "lucide-react";
import { useTranslation } from "react-i18next";
import MarqueeStrip from "@/components/MarqueeStrip";
import type { GetServerSideProps } from "next";
import dbConnect from "@/lib/mongodb";
import AboutContent from "@/models/AboutContent";

/* ── Icon map for dynamic icon resolution ── */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Award, Users, Shield, Globe, Leaf, Star, Heart, Zap, Target, CheckCircle,
  Factory, Truck, Package, ShoppingCart, ShoppingBag, Box, Building, Briefcase,
  Cpu, Battery, Phone, Mail, MapPin, Clock, Calendar, MessageCircle, AlertCircle,
  Info, Flag, Sun, Moon, TreePine, Droplet, Flame, Lightbulb, Link: LucideLink, Lock, Search,
  Send, ThumbsUp, TrendingUp, Compass, Anchor, Layout, Code, Coffee, Activity,
  Gem, Key, Map: MapIcon, Layers, LayoutGrid, LayoutTemplate, PenTool,
  Camera, Video, Monitor, Smartphone, Tablet, Watch, Speaker, Headphones, Mic, 
  Wifi, Bluetooth, Share, Download, Cloud, Server, Database, Save, Edit, 
  Trash, Settings, Wrench, Menu, Home, User, Smile, Eye, Music, Play
};

const DEFAULT_STORY_IMAGES = [
  "/img/readyToWork/1.png",
  "/img/readyToWork/2.png",
  "/img/readyToWork/3.png",
];

/* ── Helper: resolve i18n text from DB data ── */
function useLang() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  // Map i18next locale to DB key
  if (lang === 'vi-VN' || lang === 'vi') return 'vi';
  if (lang === 'en-GB') return 'uk';
  return 'us';
}

function txt(obj: { us?: string; uk?: string; vi?: string } | undefined, langKey: string): string {
  if (!obj) return '';
  const val = (obj as Record<string, string>)[langKey];
  if (val) return val;
  return obj.us || '';
}

interface AboutPageProps {
  dbData: Record<string, any> | null;
}

export const getServerSideProps: GetServerSideProps<AboutPageProps> = async () => {
  try {
    await dbConnect();
    const doc = await AboutContent.findOne().lean();
    return {
      props: {
        dbData: doc ? JSON.parse(JSON.stringify(doc)) : null,
      },
    };
  } catch {
    return { props: { dbData: null } };
  }
};

export default function AboutPage({ dbData }: AboutPageProps) {
  const { t } = useTranslation();
  const langKey = useLang();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const hasDB = !!dbData;

  /* ── Helper: get text from DB or fallback to i18n ── */
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

  /* ── Story Images ── */
  const storyImages = (hasDB && dbData.story?.images?.length) ? dbData.story.images : DEFAULT_STORY_IMAGES;
  const [storyImgIdx, setStoryImgIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setStoryImgIdx((prev) => (prev + 1) % storyImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [storyImages.length]);

  /* ── Hero background ── */
  const heroBg = (hasDB && dbData.hero?.backgroundImage) ? dbData.hero.backgroundImage : "/img/about/image.png";

  /* ── Values ── */
  const defaultValues = [
    { icon: Award, title: t("about.values.quality.title"), desc: t("about.values.quality.desc") },
    { icon: Shield, title: t("about.values.transparency.title"), desc: t("about.values.transparency.desc") },
    { icon: Globe, title: t("about.values.creativity.title"), desc: t("about.values.creativity.desc") },
    { icon: Leaf, title: t("about.values.sustainability.title"), desc: t("about.values.sustainability.desc") },
    { icon: Users, title: t("about.values.dedication.title"), desc: t("about.values.dedication.desc") },
  ];
  const values = hasDB && dbData.values?.items?.length
    ? dbData.values.items.map((v: any, idx: number) => ({
        icon: ICON_MAP[v.icon] || defaultValues[idx]?.icon || Award,
        title: txt(v.title, langKey)?.trim() || defaultValues[idx]?.title || '',
        desc: txt(v.desc, langKey)?.trim() || defaultValues[idx]?.desc || '',
      }))
    : defaultValues;

  /* ── Timeline ── */
  const defaultTimeline = t("about.timeline.items", { returnObjects: true }) as Array<{ year: string; title: string; desc: string }>;
  const timeline = hasDB && dbData.timeline?.items?.length
    ? dbData.timeline.items.map((item: any, idx: number) => ({
        year: item.year?.trim() || defaultTimeline[idx]?.year || '',
        title: txt(item.title, langKey)?.trim() || defaultTimeline[idx]?.title || '',
        desc: txt(item.desc, langKey)?.trim() || defaultTimeline[idx]?.desc || '',
      }))
    : defaultTimeline;

  /* ── Welcome values ── */
  const defaultWelcomeValues = t("about.welcome.values", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const welcomeValues = hasDB && dbData.welcome?.values?.length
    ? dbData.welcome.values.map((v: any, idx: number) => ({
        title: txt(v.title, langKey)?.trim() || defaultWelcomeValues[idx]?.title || '',
        desc: txt(v.desc, langKey)?.trim() || defaultWelcomeValues[idx]?.desc || '',
      }))
    : defaultWelcomeValues;

  /* ── Marquee ── */
  const marqueeItems = hasDB && dbData.marquee?.[langKey === 'uk' ? 'uk' : langKey === 'vi' ? 'vi' : 'us']?.length
    ? dbData.marquee[langKey === 'uk' ? 'uk' : langKey === 'vi' ? 'vi' : 'us']
    : (hasDB && dbData.marquee?.us?.length ? dbData.marquee.us : undefined);

  /* ── Stats ── */
  const defaultStats = [
    { value: "80K", suffix: "m²", label: t("about.stats.factorySize") },
    { value: "350K", suffix: "+", label: t("about.stats.yearlyOutput") },
    { value: "60-70", suffix: "", label: t("about.stats.monthlyContainers") },
    { value: "250", suffix: "+", label: t("about.stats.workers") },
  ];
  const statItems = hasDB && dbData.stats?.items?.length
    ? dbData.stats.items.map((s: any, idx: number) => ({
        value: s.value?.trim() || defaultStats[idx]?.value || '',
        suffix: s.suffix || defaultStats[idx]?.suffix || '',
        label: txt(s.label, langKey)?.trim() || defaultStats[idx]?.label || '',
      }))
    : defaultStats;

  /* ── HR Items ── */
  const defaultHr = [t("about.hr.prodWorkers"), t("about.hr.techStaff"), t("about.hr.rndModels")];
  const hrItems = hasDB && dbData.stats?.hr?.items?.length
    ? dbData.stats.hr.items.map((item: any, idx: number) => {
        const val = txt(item, langKey)?.trim();
        return val || defaultHr[idx] || '';
      })
    : defaultHr;

  /* ── Machinery Items ── */
  const defaultMachinery = [
    { count: "15+", label: t("about.machinery.panelSaws") },
    { count: "12", label: t("about.machinery.planers") },
    { count: "5", label: t("about.machinery.pressing") },
    { count: "4", label: t("about.machinery.cnc") },
    { count: "8", label: t("about.machinery.coating") },
    { count: "5", label: t("about.machinery.kilns") },
    { count: "3", label: t("about.machinery.packaging") },
  ];
  const machineryItems = hasDB && dbData.stats?.machinery?.items?.length
    ? dbData.stats.machinery.items.map((m: any, idx: number) => ({
        count: m.count?.trim() || defaultMachinery[idx]?.count || '',
        label: txt(m.label, langKey)?.trim() || defaultMachinery[idx]?.label || '',
      }))
    : defaultMachinery;

  /* ── Team ── */
  const allMembers: any[] = [];
  if (hasDB && dbData?.team) {
    if (Array.isArray(dbData.team.members)) {
      dbData.team.members.forEach((m: any, idx: number) => {
        allMembers.push({
          name: m.name?.trim() || '',
          key: m.key || `m${idx}`,
          isLeader: !!m.isLeader,
          role: txt(m.role, langKey)?.trim() || '',
          quote: txt(m.quote, langKey)?.trim() || '',
          email: m.email,
          phone: m.phone,
          image: m.image,
        });
      });
    }
  }

  if (allMembers.length === 0) {
     allMembers.push({
        name: "JOHN VO",
        isLeader: true,
        role: t("about.team.leader.role"),
        quote: "Our goal is not just to manufacture furniture, but to create lasting value for our partners worldwide.",
        email: "dht.company@vnn.vn",
        phone: "+84 274 362 5599",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
     });
     const mFallback = [
       {
         name: "Tyler Lê",
         role: { us: "Co-Founder & CEO", uk: "Co-Founder & CEO", vi: "Đồng Sáng Lập & Giám đốc Điều hành" },
       },
       {
         name: "Dylan",
         role: { us: "General Director", uk: "General Director", vi: "Tổng Giám Đốc Điều Hành" },
       },
       {
         name: "David",
         role: { us: "Product Development Director", uk: "Product Development Director", vi: "GĐ Phát Triển Sản Phẩm" },
       },
       {
         name: "Alicia",
         role: { us: "Sales Manager", uk: "Sales Manager", vi: "Trưởng Phòng Kinh Doanh" },
       }
     ];
     mFallback.forEach((m: any, i: number) => {
        allMembers.push({
           name: m.name,
           key: `fallback-${i}`,
           isLeader: false,
           role: txt(m.role, langKey),
           quote: "", email: "", phone: "",
           image: i === 0 ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80"
        });
     });
  }

  const teamLeader = allMembers.find((m: any) => m.isLeader) || allMembers[0] || {};
  const teamMembers = allMembers.filter((m: any) => m !== teamLeader);

  /* ── Locations ── */
  const locationKeys = ['factory', 'office', 'showroom', 'jdd'];
  const locationItems = hasDB && dbData.locations?.items?.length
    ? dbData.locations.items.map((loc: any) => ({
        key: loc.key,
        name: txt(loc.name, langKey),
        address: txt(loc.address, langKey),
        hotline: loc.hotline,
      }))
    : locationKeys.map((key) => ({
        key,
        name: t(`about.locations.${key}.name`),
        address: t(`about.locations.${key}.address`),
        hotline: t(`about.locations.${key}.hotline`),
      }));

  return (
    <>
      <Head>
        <title>{d(['hero', 'title'], "about.seo.title")}</title>
        <meta name="description" content={d(['hero', 'description'], "about.seo.description")} />
      </Head>

      <div className="bg-white">
        {/* ── 1. Hero Parallax ── */}
        <section ref={heroRef} className="relative h-svh flex items-center justify-center overflow-hidden bg-black">
          <motion.div style={{ y, opacity }} className="absolute inset-0">
            <img src={heroBg} alt="Factory" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black" />
          
          <div className="container mx-auto px-6 relative z-10 text-center mt-20">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-body text-[hsl(var(--orange))] tracking-widest md:tracking-[0.4em] uppercase text-xs md:text-sm mb-8 block font-bold">
              {d(['hero', 'subtitle'], "about.hero.subtitle")}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4 }} className="font-display font-black text-white italic tracking-tighter uppercase mb-6 leading-[1.1] max-w-6xl mx-auto text-balance" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", textWrap: "balance" }}>
              {d(['hero', 'title'], "about.hero.title")}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }} className="font-body text-white/80 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              {d(['hero', 'description'], "about.hero.description")}
            </motion.p>
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <ArrowDown size={32} strokeWidth={1} />
          </motion.div>
        </section>

        <MarqueeStrip items={marqueeItems || (t("about.marquee", { returnObjects: true }) as string[])} />

        {/* ── 2. Welcome Message (DHT) ── */}
        <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=85" alt="Background" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="min-w-0 w-full">
                <h2 className="font-display font-black uppercase italic tracking-tighter text-white mb-8 leading-[0.85] whitespace-pre-line" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "hsl(var(--orange))" }}>
                  {d(['welcome', 'title'], "about.welcome.title")}
                </h2>
                <div className="w-16 h-16 mb-10 rounded-full flex items-center justify-center bg-[hsl(var(--orange))] shadow-2xl shadow-[hsl(var(--orange))]/30">
                  <span className="text-4xl text-[hsl(var(--navy-deep))] transform -translate-y-1">❞</span>
                </div>
                <div 
                  className="font-body text-white text-xl sm:text-2xl leading-relaxed max-w-md lg:max-w-xl font-light about-rich-text"
                  dangerouslySetInnerHTML={{ __html: String(d(['welcome', 'description'], "about.welcome.description")).replace(/&nbsp;/g, ' ') }}
                />
              </motion.div>

              {/* Right Column */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.3 }} className="space-y-12 lg:space-y-16 min-w-0 w-full">
                {welcomeValues.map((val: any, i: number) => (
                  <div key={i} className="flex items-start gap-5 sm:gap-8 group">
                    <div className="grow font-display font-black leading-none group-hover:scale-110 transition-transform duration-500 origin-bottom-left shrink-0" style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)", color: "hsl(var(--orange))", marginTop: "-0.1em" }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="pt-2 sm:pt-4 min-w-0">
                      <h3 className="font-display font-bold text-white text-xl sm:text-3xl tracking-widest mb-2 uppercase">
                        {val.title}
                      </h3>
                      <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed font-light">
                        {val.desc}
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
                    <span className="font-body text-xs tracking-widest uppercase font-bold text-[hsl(var(--orange))]">{d(['story', 'label'], "about.story.label")}</span>
                  </div>
                  <h2 className="font-display font-black text-foreground leading-[1.1] tracking-tight mb-8" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                    {d(['story', 'heading'], "about.story.heading")}
                  </h2>
                  <div className="w-24 h-2 bg-[hsl(var(--orange))] mb-10" />
                </motion.div>
              </div>
              
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }} className="prose prose-lg md:prose-xl prose-stone font-body text-muted-foreground leading-relaxed max-w-none">
                  <div className="text-lg md:text-xl text-foreground font-light leading-relaxed about-rich-text" dangerouslySetInnerHTML={{ __html: String(d(['story', 'content'], "about.story.content")).replace(/&nbsp;/g, ' ') }} />
                </motion.div>
                
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="mt-16 rounded-sm overflow-hidden aspect-video shadow-2xl relative group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 z-20" />
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={storyImgIdx}
                      src={storyImages[storyImgIdx]}
                      alt="DHT production"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                    />
                  </AnimatePresence>
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
                <span className="font-body text-xs tracking-widest uppercase font-bold text-[hsl(var(--orange))]">{d(['values', 'label'], "about.values.label")}</span>
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
              </div>
              <h2 className="font-display font-black text-foreground" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{d(['values', 'heading'], "about.values.heading")}</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {values.map(({ icon: Icon, title, desc }: any, i: number) => (
                <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.1 }} className="group relative bg-white/20 p-10 lg:p-12 border border-border/10 hover:border-[hsl(var(--orange))]/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] scroll-smooth overflow-hidden">
                  <div className="absolute -top-10 -right-4 font-display font-black text-[12rem] leading-none text-black/20 group-hover:text-[hsl(var(--orange))]/5 transition-colors duration-700 pointer-events-none select-none z-0">
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
                <span className="font-body text-xs tracking-widest uppercase font-bold text-[hsl(var(--orange))]">{d(['timeline', 'label'], "about.timeline.label")}</span>
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
              </div>
              <h2 className="font-display font-black text-foreground" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{d(['timeline', 'heading'], "about.timeline.heading")}</h2>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              {/* Central Axis */}
              <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-border/60 md:-translate-x-1/2" />
              
              {timeline.map(({ year, title, desc }: any, i: number) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={year} className="relative flex flex-col md:flex-row items-center mb-16 lg:mb-24 last:mb-0 group">
                    <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[hsl(var(--orange))] shadow-[0_0_0_8px_white] md:-translate-x-1/2 z-10 group-hover:scale-150 transition-transform duration-500" />
                    
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:ml-auto'}`}>
                      <motion.div initial={{ opacity: 0, x: isEven ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.1 }}>
                        <span suppressHydrationWarning translate="no" className="notranslate font-body font-bold tracking-tight text-5xl md:text-6xl text-[hsl(var(--orange))] mb-6 block leading-none">{year}</span>
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
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="font-display font-black text-white mb-6" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{d(['stats', 'heading'], "about.stats.heading")}</motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="font-body text-white/50 text-xl max-w-2xl mx-auto font-light leading-relaxed">{d(['stats', 'subtitle'], "about.stats.subtitle")}</motion.p>
            </div>

            {/* Elegant Numbers Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-32">
              {statItems.map((stat: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="relative bg-white/[0.02] border border-white/5 p-6 sm:p-8 lg:p-10 hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-500 rounded-sm overflow-hidden group hover:shadow-2xl">
                  {/* Subtle Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[hsl(var(--orange))] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <div suppressHydrationWarning translate="no" className="notranslate font-body font-bold text-4xl sm:text-5xl lg:text-5xl tracking-tight mb-4 text-white group-hover:text-[hsl(var(--orange))] transition-colors duration-500">
                    {stat.value}<span className="text-xl sm:text-2xl lg:text-3xl ml-1 font-medium">{stat.suffix}</span>
                  </div>
                  <p className="font-body font-bold text-[10px] sm:text-xs uppercase tracking-widest text-white/50 leading-relaxed">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Info Cards */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Human Resources & R&D */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-10 lg:p-16 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-sm hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-500">
                <h3 className="font-display font-black text-3xl lg:text-4xl mb-12 text-white flex items-center gap-4">
                  <span className="w-12 h-1 bg-[hsl(var(--orange))]" />
                  {d(['stats', 'hr', 'heading'], "about.hr.heading")}
                </h3>
                <ul className="space-y-8">
                  {hrItems.map((item: string, i: number) => (
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
                  {d(['stats', 'machinery', 'heading'], "about.machinery.heading")}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
                  {machineryItems.map((item: any, i: number) => (
                    <li key={i} className="flex flex-col gap-3 relative pl-5 border-l-2 border-[hsl(var(--orange))/0.2] hover:border-[hsl(var(--orange))] transition-colors duration-300">
                      <span suppressHydrationWarning translate="no" className="notranslate font-body font-bold tracking-tight text-3xl md:text-4xl leading-none text-[hsl(var(--orange))]">{item.count}</span> 
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
                {d(['team', 'heading'], "about.team.heading")}
              </h2>
              <div className="w-24 h-1 bg-[hsl(var(--orange))] mx-auto" />
            </motion.div>

            {/* Featured Leader */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center lg:items-start bg-[#FAFAFA] p-8 lg:p-12 border border-border/60 rounded-sm mb-16 hover:shadow-2xl hover:shadow-black/3 transition-all duration-500">
              <div className="w-48 sm:w-64 lg:w-88 aspect-3/4 overflow-hidden shrink-0 shadow-lg rounded-sm">
                <img src={teamLeader.image} alt={teamLeader.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="pt-2 flex-grow text-center md:text-left flex flex-col justify-center h-full">
                {teamLeader.name && <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-wider mb-4 text-foreground">{teamLeader.name}</h3>}
                {teamLeader.role && (
                  <div className="mb-10">
                    <span className="inline-block px-5 py-2.5 text-xs font-body font-bold uppercase tracking-widest bg-[hsl(var(--orange))] text-white rounded-sm">
                      {teamLeader.role}
                    </span>
                  </div>
                )}
                
                {teamLeader.quote && teamLeader.quote.trim() !== '' && (
                  <p className="font-display italic text-2xl sm:text-3xl text-muted-foreground leading-relaxed mb-12 md:border-l-4 md:pl-8 border-[hsl(var(--orange))/0.4]">
                    &ldquo;{teamLeader.quote}&rdquo;
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-8 font-body text-base text-muted-foreground font-medium justify-center md:justify-start">
                  {teamLeader.email && teamLeader.email.trim() !== '' && (
                    <a href={`mailto:${teamLeader.email}`} className="flex items-center gap-3 hover:text-[hsl(var(--orange))] transition-colors">
                      <span className="text-[hsl(var(--orange))] text-xl">✉</span> {teamLeader.email}
                    </a>
                  )}
                  {teamLeader.phone && teamLeader.phone.trim() !== '' && (
                    <a href={`tel:${teamLeader.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-[hsl(var(--orange))] transition-colors">
                      <span className="text-[hsl(var(--orange))] text-xl">✆</span> {teamLeader.phone}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((m: any, i: number) => (
                <motion.div key={m.key || i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="flex flex-col bg-white border border-border/60 hover:border-[hsl(var(--orange))/0.4] hover:shadow-xl hover:shadow-[hsl(var(--orange))]/5 transition-all duration-500 rounded-sm overflow-hidden group">
                  <div className="w-full aspect-4/5 overflow-hidden bg-[#FAFAFA]">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex flex-col grow text-center">
                    {m.name && <h3 className="font-display font-black text-2xl uppercase tracking-wider mb-2 text-foreground group-hover:text-[hsl(var(--orange))] transition-colors duration-500">{m.name}</h3>}
                    {m.role && <span className="text-[10px] font-body font-bold uppercase tracking-widest mb-6 text-[hsl(var(--orange))]">{m.role}</span>}
                    
                    {m.quote && m.quote.trim() !== '' && (
                      <p className="font-display italic text-sm text-muted-foreground leading-relaxed mb-8 grow">
                        &ldquo;{m.quote}&rdquo;
                      </p>
                    )}

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
          </div>
        </section>

        {/* ── 8. Locations ── */}
        <section className="py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-24">
              <h2 className="font-display font-black text-foreground mb-6" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{d(['locations', 'heading'], "about.locations.heading")}</h2>
              <div className="w-24 h-1 bg-[hsl(var(--orange))] mx-auto" />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {locationItems.map((loc: any, i: number) => (
                <motion.div key={loc.key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="group p-10 bg-white border border-border hover:border-[hsl(var(--orange))] hover:shadow-2xl hover:shadow-[hsl(var(--orange))]/10 transition-all duration-500">
                  <div className="w-16 h-16 bg-[hsl(var(--warm-cream))] rounded-full flex items-center justify-center mb-8 group-hover:bg-[hsl(var(--orange))] transition-colors duration-500">
                    <Globe size={24} className="text-foreground group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-display font-black text-2xl mb-4 text-foreground uppercase tracking-wide">{loc.name}</h3>
                  <p className="font-body text-muted-foreground mb-8 leading-loose font-light">
                    {loc.address}
                  </p>
                  <a href={`tel:${loc.hotline.replace(/\s/g, "")}`} className="font-body font-bold text-lg text-[hsl(var(--orange))] hover:text-black transition-colors block border-t pt-6 line-clamp-1">
                    {loc.hotline}
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
              {d(['cta', 'heading'], "about.cta.heading")}
            </motion.h2>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-6 font-display font-black text-lg text-black bg-[hsl(var(--orange))] hover:bg-white hover:text-black transition-all duration-500 shadow-xl hover:shadow-white/20 uppercase tracking-widest group">
                {d(['cta', 'button'], "about.cta.button")}
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .about-rich-text p { margin-bottom: 0.75rem; }
        .about-rich-text p:last-child { margin-bottom: 0; }
        .about-rich-text strong { font-weight: bold; color: inherit; }
        .about-rich-text em { font-style: italic; }
      `}</style>
    </>
  );
}
