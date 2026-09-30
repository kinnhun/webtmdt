import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
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
  Trash, Settings, Wrench, Menu, Home, User, Smile, Eye, Music, Play,
  Ship, FileText, CheckSquare, ShieldCheck, ArrowRight
} from "lucide-react";
import { useTranslation } from "react-i18next";
import MarqueeStrip from "@/components/MarqueeStrip";
import { useQuery } from "@tanstack/react-query";
import { aboutDefaults } from "@/features/admin/constants/aboutDefaults";
import { MASTER_LOCATIONS } from "@/constants/locations";

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
  const router = useRouter();
  const { i18n } = useTranslation();
  const lang = router.locale || i18n.language;
  // Map i18next locale to DB key
  if (lang === 'vi-VN' || lang === 'vi') return 'vi';
  if (lang === 'en-GB') return 'uk';
  return 'us';
}

function txt(obj: { us?: string; uk?: string; vi?: string } | undefined, langKey: string): string {
  if (!obj) return '';
  const val = (obj as Record<string, string>)[langKey] || obj.us || '';
  return val
    .replace(/partnerships\.KKK/gi, 'partnerships.')
    .replace(/đối tác lâu dài\.KKK/gi, 'đối tác lâu dài.')
    .replace(/Built for B2B Buyerskk/gi, 'Built for B2B Buyers')
    .replace(/người mua B2Bkk/gi, 'người mua B2B')
    .replace(/Export Readykk/gi, 'Export Ready')
    .replace(/xuất khẩu toàn cầukk/gi, 'xuất khẩu toàn cầu')
    .replace(/kinh nghiệm vận chuyển toàn cầukk/gi, 'kinh nghiệm vận chuyển toàn cầu')
    .replace(/toàn cầukkk/gi, 'toàn cầu')
    .replace(/worldwidekkk/gi, 'worldwide')
    .replace(/DHT\?KKK/gi, 'DHT?')
    .replace(/FSC\.kkk/gi, 'FSC.')
    .replace(/FSC certified wood\.kkk/gi, 'FSC-certified wood.')
    .replace(/sửa kkk/gi, '')
    .replace(/&nbsp;/g, ' ');
}

export default function AboutPage() {
  /* ── Client-side fetch: non-blocking, page renders instantly with i18n fallback ── */
  const { data: dbData = null } = useQuery<Record<string, any> | null>({
    queryKey: ["about-content"],
    queryFn: async () => {
      const res = await fetch("/api/about-content");
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: 30 * 1000, // 30s — admin changes show quickly after save
  });

  const { t } = useTranslation();
  const langKey = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tlProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });

  // ── Timeline line: direct DOM refs (zero React re-renders) ──
  const tlLineRef = useRef<HTMLDivElement>(null);
  const tlTipRef = useRef<HTMLDivElement>(null);
  const tlWrapRef = useRef<HTMLDivElement>(null); // inner wrapper containing line + items
  const tlItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  useMotionValueEvent(tlProgress, "change", (v: number) => {
    if (tlLineRef.current) tlLineRef.current.style.transform = `scaleY(${v})`;
    if (tlTipRef.current) tlTipRef.current.style.opacity = v > 0.01 ? "1" : "0";
    // Toggle active + focus classes on milestones
    const wrap = tlWrapRef.current;
    if (!wrap) return;
    const wrapH = wrap.offsetHeight;
    const lineBottomPx = wrapH * v;
    const viewportCenter = window.innerHeight / 2;
    let closestIdx = -1;
    let closestDist = Infinity;
    tlItemsRef.current.forEach((el, idx) => {
      if (!el) return;
      const elCenter = el.offsetTop + el.offsetHeight * 0.3;
      // Active: line has passed this milestone
      if (lineBottomPx >= elCenter) {
        el.classList.add("tl-active");
      } else {
        el.classList.remove("tl-active");
      }
      // Focus: find milestone closest to viewport center
      const rect = el.getBoundingClientRect();
      const elViewCenter = rect.top + rect.height * 0.4;
      const dist = Math.abs(elViewCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });
    // Apply focus class only to the closest milestone
    tlItemsRef.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === closestIdx && closestDist < window.innerHeight * 0.6) {
        el.classList.add("tl-focus");
      } else {
        el.classList.remove("tl-focus");
      }
    });
  });

  const hasDB = !!dbData;

  /* ── Helper: get text from DB, or aboutDefaults, or fallback to i18n ── */
  const d = (dbPath: string[], i18nKey: string): string => {
    let source = hasDB && dbData ? dbData : aboutDefaults;
    let val: any = source;
    for (const key of dbPath) {
      val = val?.[key];
    }
    if (!val && source !== aboutDefaults) {
      val = aboutDefaults as any;
      for (const key of dbPath) {
        val = val?.[key];
      }
    }
    if (val && typeof val === 'object' && ('us' in val || 'uk' in val || 'vi' in val)) {
      const textValue = txt(val, langKey);
      if (textValue.trim() !== '') return textValue;
    } else if (typeof val === 'string' && val.trim() !== '') {
      return val;
    }
    return t(i18nKey);
  };

  /* ── Story Images ── */
  const rawStoryImages = (hasDB && dbData.story?.images?.length) ? dbData.story.images : DEFAULT_STORY_IMAGES;
  const storyImages = rawStoryImages.filter((s: string) => s && s.trim() !== '');
  const [storyImgIdx, setStoryImgIdx] = useState(0);
  useEffect(() => {
    if (storyImages.length <= 1) return;
    const timer = setInterval(() => {
      setStoryImgIdx((prev) => (prev + 1) % storyImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [storyImages.length]);

  /* ── Hero background images (slider support) ── */
  const rawHeroImages: string[] = (hasDB && dbData.hero?.backgroundImages?.length)
    ? dbData.hero.backgroundImages
    : (hasDB && dbData.hero?.backgroundImage) ? [dbData.hero.backgroundImage]
      : ["/img/about/image.png"];
  const heroImages = rawHeroImages.filter((s: string) => s && s.trim() !== '');
  // Ensure at least one image
  if (heroImages.length === 0) heroImages.push("/img/about/image.png");
  const [heroImgIdx, setHeroImgIdx] = useState(0);
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setHeroImgIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  /* ── Values ── */
  const rawValues = (dbData?.values?.items && dbData.values.items.length > 0)
    ? dbData.values.items
    : (aboutDefaults.values?.items || []);
  const values = rawValues.map((v: any) => ({
    icon: ICON_MAP[v.icon] || Award,
    title: txt(v.title, langKey)?.trim() || '',
    desc: txt(v.desc, langKey)?.trim() || '',
  }));

  /* ── Timeline ── */
  const isDeprecatedTimeline = (items: any): boolean => {
    if (!Array.isArray(items) || items.length === 0) return true;
    return items.some((item) => {
      const titleStr = typeof item.title === 'string' ? item.title : JSON.stringify(item.title || {});
      const descStr = typeof item.desc === 'string' ? item.desc : JSON.stringify(item.desc || {});
      const s = (titleStr + " " + descStr).toLowerCase();
      return (
        s.includes("foundation of dht furniture") ||
        s.includes("manufacturing network integration") ||
        s.includes("global compliance & scale") ||
        s.includes("global compliance and scale") ||
        s.includes("full fsc") ||
        s.includes("bsci/smeta") ||
        s.includes("coverage")
      );
    });
  };

  const rawTimeline = (dbData?.timeline?.items && dbData.timeline.items.length > 0 && !isDeprecatedTimeline(dbData.timeline.items))
    ? dbData.timeline.items
    : (aboutDefaults.timeline?.items || []);
  const timeline = rawTimeline.map((item: any) => ({
    year: item.year?.trim() || '',
    title: txt(item.title, langKey)?.trim() || '',
    desc: txt(item.desc, langKey)?.trim() || '',
  }));

  /* ── Welcome values ── */
  const rawWelcomeValues = (dbData?.welcome?.values && dbData.welcome.values.length > 0)
    ? dbData.welcome.values
    : (aboutDefaults.welcome?.values || []);
  const welcomeValues = rawWelcomeValues.map((v: any) => ({
    title: txt(v.title, langKey)?.trim() || '',
    desc: txt(v.desc, langKey)?.trim() || '',
  }));

  /* ── Marquee ── */
  const isDeprecatedMarquee = (items: any): boolean => {
    if (!Array.isArray(items) || items.length === 0) return true;
    return items.some((item) => {
      if (typeof item !== "string") return false;
      const s = item.toLowerCase();
      return (
        s.includes("18+") ||
        s.includes("50,000") ||
        s.includes("50.000") ||
        s.includes("35+") ||
        s.includes("400+") ||
        s.includes("250") ||
        s.includes("30 kỹ") ||
        s.includes("40-50")
      );
    });
  };

  const dbMarqueeArr = hasDB && dbData.marquee?.[langKey === 'uk' ? 'uk' : langKey === 'vi' ? 'vi' : 'us'];
  const fallbackMarquee = aboutDefaults.marquee?.[langKey === 'uk' ? 'uk' : langKey === 'vi' ? 'vi' : 'us']
    || (t("about.marquee", { returnObjects: true }) as string[]);

  const marqueeItems = (dbMarqueeArr && Array.isArray(dbMarqueeArr) && !isDeprecatedMarquee(dbMarqueeArr))
    ? dbMarqueeArr
    : fallbackMarquee;

  /* ── Stats ── */
  const rawStats = (dbData?.stats?.items && dbData.stats.items.length > 0)
    ? dbData.stats.items
    : (aboutDefaults.stats?.items || []);
  const statItems = rawStats.map((s: any) => ({
    value: s.value?.trim() || '',
    suffix: s.suffix || '',
    label: txt(s.label, langKey)?.trim() || '',
  }));

  /* ── HR Items ── */
  const rawHrItems = (dbData?.stats?.hr?.items && dbData.stats.hr.items.length > 0)
    ? dbData.stats.hr.items
    : (aboutDefaults.stats?.hr?.items || []);
  const hrItems = rawHrItems.map((item: any) => txt(item, langKey)?.trim() || '');

  /* ── Machinery Items ── */
  const rawMachinery = (dbData?.stats?.machinery?.items && dbData.stats.machinery.items.length > 0)
    ? dbData.stats.machinery.items
    : (aboutDefaults.stats?.machinery?.items || []);
  const machineryItems = rawMachinery.map((m: any) => ({
    count: m.count?.trim() || '',
    label: txt(m.label, langKey)?.trim() || '',
  }));

  /* ── Team ── */
  const rawMembers = (dbData?.team?.members && dbData.team.members.length > 0)
    ? dbData.team.members
    : (aboutDefaults.team?.members || []);
  const allMembers: any[] = rawMembers.map((m: any, idx: number) => {
    const isLeader = !!m.isLeader || idx === 0 || m.key === 'john';
    let rawPhone = typeof m.phone === 'string' ? m.phone.trim() : '';
    if (rawPhone.includes('xxx') || rawPhone.includes('932 058 545')) {
      rawPhone = '';
    }
    const cleanEmail = m.email && !m.email.includes('xxx') ? m.email.trim() : 'sales@dhtcompany.com';
    return {
      name: m.name?.trim() || '',
      key: m.key || `m${idx}`,
      isLeader,
      role: txt(m.role, langKey)?.trim() || '',
      quote: txt(m.quote, langKey)?.trim() || '',
      email: cleanEmail,
      phone: rawPhone,
      image: m.image || '',
    };
  });



  const teamLeader = allMembers.find((m: any) => m.isLeader) || allMembers[0] || {};
  const teamMembers = allMembers.filter((m: any) => m !== teamLeader);

  /* ── Locations ── */
  const rawLocations = (dbData?.locations?.items && dbData.locations.items.length > 0)
    ? dbData.locations.items
    : MASTER_LOCATIONS.map((loc) => ({
        key: loc.key,
        name: loc.title,
        address: loc.address,
        hotline: loc.phone,
      }));

  const locationItems = rawLocations.map((loc: any) => {
    let name = txt(loc.name, langKey) || (typeof loc.name === 'string' ? loc.name : '');
    if (name.includes("Head Office & Commercial") || name.includes("Trụ Sở & Phòng Thương Mại")) {
      name = MASTER_LOCATIONS[0].title[langKey as 'us' | 'uk' | 'vi'] || MASTER_LOCATIONS[0].title.us;
    }
    return {
      key: loc.key || '',
      name,
      address: txt(loc.address, langKey) || (typeof loc.address === 'string' ? loc.address : ''),
      hotline: loc.hotline || loc.phone || '',
    };
  });

  /* ── 6-Stage Operating Model (Item 05) ── */
  const rawOperatingSteps = (t("about.operatingModel.steps", { returnObjects: true }) as any[]) || [];
  const defaultSteps = [
    {
      step: "01",
      title: langKey === 'vi' ? "Tiếp Nhận Yêu Cầu (Buyer Brief)" : "Buyer Brief & Specification",
      desc: langKey === 'vi' 
        ? "Rà soát chi tiết yêu cầu kỹ thuật, bản vẽ sơ bộ, tiêu chuẩn thị trường mục tiêu, khối lượng đơn hàng và vật liệu mong muốn (gỗ chứng nhận FSC, nhôm định hình)." 
        : "Detailed review of buyer requirements, product specifications, target markets, order volumes, and material preferences (FSC-certified timber, architectural aluminium).",
      icon: <FileText size={20} />,
    },
    {
      step: "02",
      title: langKey === 'vi' ? "Phát Triển Kỹ Thuật (Technical Dev)" : "Technical Development",
      desc: langKey === 'vi' 
        ? "Triển khai bản vẽ CAD sản xuất, kết cấu mộng ngàm knock-down, tối ưu hóa vật tư và lập bảng định mức nguyên vật liệu (BOM) chi tiết." 
        : "CAD shop drawings, structural joint engineering, value engineering, and detailed Bill of Materials (BOM) prepared by DHT technical engineers.",
      icon: <Compass size={20} />,
    },
    {
      step: "03",
      title: langKey === 'vi' ? "Phê Duyệt Mẫu (Sample Approval)" : "Sample Approval",
      desc: langKey === 'vi' 
        ? "Gia công mẫu thử nghiệm thực tế tại xưởng mẫu chuyên biệt (thời gian làm mẫu thông thường 7–14 ngày sau khi duyệt bản vẽ và mẫu vật liệu). Đánh giá công năng, độ ổn định kết cấu, đối chiếu màu sơn và thử nghiệm đóng gói trước khi chốt sản xuất." 
        : "Physical prototype crafting at our dedicated sampling facility. Typical sample lead time is 7–14 days post-drawing and material approval. Functional testing, stability assessment, finish matching, and carton drop-test verification.",
      icon: <CheckSquare size={20} />,
    },
    {
      step: "04",
      title: langKey === 'vi' ? "Lập Kế Hoạch Sản Xuất (Production Planning)" : "Production Planning",
      desc: langKey === 'vi' 
        ? "Phân bổ đơn hàng tới nhà máy phù hợp nhất trong 10 xưởng thành phẩm theo thế mạnh vật liệu. Tiến độ sản xuất bắt đầu tính từ khi nhận đặt cọc thương mại và duyệt bản vẽ kỹ thuật (thông thường 60–90 ngày cho đơn hàng mới, 45–60 ngày cho đơn hàng lặp lại). Sấy gỗ đạt độ ẩm chuẩn 8–12% và gia công chi tiết đồng bộ." 
        : "Facility allocation across our 10 furniture plants based on material specialization. Production lead times commence upon receipt of confirmed commercial deposit and approved shop drawings (typical 60–90 days for new production runs, 45–60 days for repeat orders). Timber kiln drying to 8–12% MC and synchronized component batching.",
      icon: <Factory size={20} />,
    },
    {
      step: "05",
      title: langKey === 'vi' ? "Kiểm Soát Chất Lượng (Quality Verification)" : "Quality Verification",
      desc: langKey === 'vi' 
        ? "Quy trình kiểm soát chất lượng 6 cửa xuyên suốt từ độ ẩm phôi gỗ đầu vào, dung sai gia công chi tiết, ráp thử khung mộng, độ bám dính bề mặt đến nghiệm thu thành phẩm." 
        : "Standardised 6-gate in-line QC covering timber moisture, machining tolerances, dry-fitting assembly, finish coating adhesion, and pre-pack audit.",
      icon: <ShieldCheck size={20} />,
    },
    {
      step: "06",
      title: langKey === 'vi' ? "Đóng Gói & Xuất Hàng (Packing & Shipment)" : "Packing & Shipment",
      desc: langKey === 'vi' 
        ? "Đóng gói tiêu chuẩn xuất khẩu chịu va đập, giám sát đóng container tại xưởng và hoàn tất thủ tục xuất khẩu qua các cảng Quy Nhơn, Cát Lái, Cái Mép hoặc Hải Phòng." 
        : "Export drop-test verified packaging, coordinated container stuffing, and maritime dispatch via Quy Nhon, Cat Lai, Cai Mep, or Hai Phong ports.",
      icon: <Ship size={20} />,
    },
  ];

  const operatingSteps = Array.isArray(rawOperatingSteps) && rawOperatingSteps.length === 6
    ? rawOperatingSteps.map((s: any, idx: number) => ({
        step: s.step || `0${idx + 1}`,
        title: s.title || defaultSteps[idx].title,
        desc: s.desc || defaultSteps[idx].desc,
        icon: defaultSteps[idx].icon,
      }))
    : defaultSteps;

  /* ── 5 Functional Coordination Departments (Item 11) ── */
  const rawDepartments = (t("about.departments.items", { returnObjects: true }) as any[]) || [];
  const defaultDepartments = [
    {
      title: langKey === 'vi' ? "Phát triển Kinh doanh & Khách hàng" : "Sales & Commercial Development",
      desc: langKey === 'vi' 
        ? "Quản trị quan hệ đối tác, báo giá kỹ thuật, ký kết thương mại và lập kế hoạch chương trình cung ứng." 
        : "Direct buyer account management, quotation dossiers, commercial agreements, and programme scheduling.",
    },
    {
      title: langKey === 'vi' ? "Phát triển Sản phẩm & Kỹ thuật" : "Product Development & Engineering",
      desc: langKey === 'vi' 
        ? "Bản vẽ kỹ thuật CAD, cải tiến giá trị (value engineering), thử nghiệm kết cấu, tiêu chuẩn hóa vật tư và kiểm định mẫu." 
        : "CAD technical drawings, value engineering, joinery optimization, material qualification, and prototype verification.",
    },
    {
      title: langKey === 'vi' ? "Điều phối Sản xuất" : "Production Coordination",
      desc: langKey === 'vi' 
        ? "Phân bổ đơn hàng vào 10 nhà máy chuyên môn hóa, theo dõi tiến độ sấy gỗ, cân bằng công suất và kiểm soát tiến độ giao hàng." 
        : "Strategic factory allocation among 10 furniture plants, timber kiln scheduling, capacity balancing, and lead time tracking.",
    },
    {
      title: langKey === 'vi' ? "Quản lý Chất lượng & Tuân thủ (6-Gate QC)" : "Quality & Compliance (6-Gate QC)",
      desc: langKey === 'vi' 
        ? "Kiểm tra chất lượng đa tầng in-line, đo độ ẩm gỗ (8–12% MC), giám sát tuân thủ tiêu chuẩn và thử nghiệm thả rơi bao bì carton." 
        : "In-line multi-gate quality inspections, timber moisture auditing (8–12% MC), factory compliance, and carton drop testing.",
    },
    {
      title: langKey === 'vi' ? "Xuất khẩu & Logistics" : "Export & Logistics",
      desc: langKey === 'vi' 
        ? "Giám sát đóng container, điều phối luồng hàng qua 4 cụm cảng (Quy Nhơn, Cát Lái, Cái Mép, Hải Phòng), thủ tục hải quan và chứng từ vận tải quốc tế." 
        : "Container stuffing supervision, multi-port routing (Quy Nhon, Cat Lai, Cai Mep, Hai Phong), customs clearance, and export documentation.",
    },
  ];

  const departmentItems = Array.isArray(rawDepartments) && rawDepartments.length === 5
    ? rawDepartments.map((d: any, idx: number) => ({
        title: d.title || defaultDepartments[idx].title,
        desc: d.desc || defaultDepartments[idx].desc,
      }))
    : defaultDepartments;

  return (
    <>
      <SEO title={d(['hero', 'title'], "about.seo.title")} description={d(['hero', 'description'], "about.seo.description")} />
      <Schema 
        id="schema-breadcrumbs-about"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://dhtcompany.com"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "About Us",
              item: "https://dhtcompany.com/about"
            }
          ]
        }}
      />

      <div className="bg-white">
        {/* ── 1. Hero Parallax ── */}
        <section ref={heroRef} className="relative min-h-[100svh] py-24 flex items-center justify-center overflow-hidden bg-black">
          <motion.div style={{ y, opacity }} className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={heroImgIdx}
                src={heroImages[heroImgIdx]}
                alt="Factory"
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              />
            </AnimatePresence>
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center mt-12 sm:mt-20">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="font-body text-[hsl(var(--orange))] tracking-widest md:tracking-[0.4em] uppercase text-xs sm:text-sm mb-6 sm:mb-8 block font-bold">
              {d(['hero', 'subtitle'], "about.hero.subtitle")}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4 }} className="font-display font-black text-white italic tracking-tighter uppercase mb-6 leading-[1.1] max-w-5xl mx-auto break-words" style={{ fontSize: "clamp(1.75rem, 5vw + 1rem, 4.5rem)" }}>
              {d(['hero', 'title'], "about.hero.title")}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }} className="font-body text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
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
                    <div className="w-16 sm:w-24 shrink-0 text-left font-display font-black leading-none group-hover:scale-110 transition-transform duration-500 origin-bottom-left" style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)", color: "hsl(var(--orange))", marginTop: "-0.1em" }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="pt-2 sm:pt-4 min-w-0 flex-1">
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

                {storyImages.length > 0 && storyImages[storyImgIdx] && (
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
                )}
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

        {/* ── 5. Timeline (Interactive Storytelling) ── */}
        <section className="py-32 relative overflow-hidden bg-white">
          {/* Subtle Background Motion — moving gradient orbs for depth */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: ["-10%", "10%"], y: ["-10%", "10%"] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 15, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px]"
              style={{ background: "radial-gradient(circle, hsl(var(--orange) / 0.04), transparent 70%)" }}
            />
            <motion.div
              animate={{ x: ["10%", "-10%"], y: ["10%", "-10%"] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 20, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px]"
              style={{ background: "radial-gradient(circle, hsl(var(--navy) / 0.04), transparent 70%)" }}
            />
            <motion.div
              animate={{ x: ["-5%", "5%"], y: ["5%", "-5%"] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 25, ease: "easeInOut" }}
              className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
              style={{ background: "radial-gradient(circle, hsl(var(--orange) / 0.025), transparent 70%)" }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10" ref={timelineRef}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }} className="text-center mb-24 lg:mb-32">
              <div className="flex items-center gap-4 justify-center mb-8">
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
                <span className="font-body text-xs tracking-widest uppercase font-bold text-[hsl(var(--orange))]">{d(['timeline', 'label'], "about.timeline.label")}</span>
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
              </div>
              <h2 className="font-display font-black text-foreground" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>{d(['timeline', 'heading'], "about.timeline.heading")}</h2>
            </motion.div>

            <div ref={tlWrapRef} className="relative max-w-5xl mx-auto pb-16">
              {/* ─── Center Line: drawn by scroll via scaleY + direct DOM ref (zero re-renders) ─── */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 pointer-events-none z-0" style={{ width: 2 }}>
                {/* Background track — always visible */}
                <div className="absolute inset-0" style={{ width: 2, backgroundColor: "rgba(245,166,35,0.15)" }} />
                {/* Animated fill line — scaleY via ref, no React state */}
                <div
                  ref={tlLineRef}
                  className="absolute inset-0 origin-top will-change-transform"
                  style={{
                    width: 2,
                    transform: "scaleY(0)",
                    background: "linear-gradient(to bottom, hsl(var(--orange)), rgba(245,166,35,0.6) 60%, rgba(245,166,35,0.2))",
                  }}
                >
                  {/* Glowing teardrop tip */}
                  <div
                    ref={tlTipRef}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-pulse"
                    style={{
                      width: 10,
                      height: 14,
                      backgroundColor: "hsl(var(--orange))",
                      borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
                      boxShadow: "0 2px 12px 3px rgba(245,166,35,0.45)",
                      opacity: 0,
                    }}
                  />
                </div>
              </div>

              {timeline.map(({ year, title, desc }: any, i: number) => {
                const isEven = i % 2 === 0;

                // Icon per milestone
                let TimelineIcon = Factory; // 2016 → 🏭
                if (year.includes("2018") || year.includes("2020") || year.includes("2019")) TimelineIcon = Settings; // ⚙️
                else if (year.includes("2021") || year.includes("2022") || year.includes("2023") || year.includes("2024")) TimelineIcon = Globe; // 🌍
                else if (year.includes("2025")) TimelineIcon = Users; // 🤝

                return (
                  <div
                    key={year}
                    ref={(el) => { tlItemsRef.current[i] = el; }}
                    className="tl-item relative flex flex-col md:flex-row items-center mb-20 lg:mb-32 last:mb-0 cursor-default"
                  >
                    {/* ─── Popping Dot with Icon ─── */}
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                      className="tl-dot absolute left-6 md:left-1/2 w-12 h-12 -ml-6 md:ml-0 rounded-full bg-white border-2 border-[hsl(var(--orange))] md:-translate-x-1/2 z-10 flex items-center justify-center transition-all duration-400"
                      style={{
                        boxShadow: "0 0 0 4px rgba(245,166,35,0.08), 0 0 20px rgba(245,166,35,0.15)",
                      }}
                    >
                      <TimelineIcon size={18} className="tl-dot-icon text-[hsl(var(--orange))] transition-colors duration-300" />
                      {/* Hover ring pulse */}
                      <div className="tl-ring absolute inset-0 rounded-full border-2 border-[hsl(var(--orange))] opacity-0 scale-100 transition-all duration-500 pointer-events-none" />
                    </motion.div>

                    {/* ─── Content Card with slide animation ─── */}
                    <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-20 lg:md:pr-28 md:text-right' : 'md:pl-20 lg:md:pl-28 md:ml-auto'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -50 : 50, y: 10 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="tl-card relative bg-white/60 backdrop-blur-sm p-7 md:p-8 rounded-xl transition-all duration-400 border border-transparent"
                      >
                        {/* Year — HERO treatment with gradient + glow */}
                        <span
                          suppressHydrationWarning
                          translate="no"
                          className="tl-year notranslate font-display font-black tracking-tight mb-4 block leading-none transition-transform duration-400"
                          style={{
                            fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                            background: "linear-gradient(135deg, hsl(var(--orange)), #F9D079, hsl(var(--orange)))",
                            backgroundSize: "200% 200%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0 2px 8px rgba(245,166,35,0.25))",
                            transformOrigin: isEven ? "right center" : "left center",
                          }}
                        >
                          {year}
                        </span>
                        <h3 className="tl-title font-display font-bold text-xl md:text-2xl text-foreground mb-3 transition-colors duration-300">{title}</h3>
                        <p className="tl-desc font-body text-muted-foreground leading-relaxed text-base md:text-lg transition-colors duration-300">{desc}</p>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ─── Closing Statement ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 text-center"
            >
              <div className="w-16 h-px bg-[hsl(var(--orange))] mx-auto mb-8" />
              <p className="font-body text-xl md:text-2xl text-muted-foreground font-light italic max-w-3xl mx-auto leading-relaxed">
                &ldquo;Continuously scaling to meet global demand with consistent quality and reliable delivery.&rdquo;
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 6. Stats & Capabilities (Dark Premium) ── */}
        <section className="py-32 bg-[hsl(var(--navy-deep))] text-white relative">
          <div className="absolute inset-0 bg-[url('/img/WhyDHT.png')] opacity-5 bg-cover bg-center mix-blend-overlay" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-24 lg:mb-32">
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="font-display font-black text-white mb-6 break-words hyphens-auto" style={{ fontSize: "clamp(1.75rem, 8vw, 4.5rem)", wordBreak: "break-word" }}>{d(['stats', 'heading'], "about.stats.heading")}</motion.h2>
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

            {/* Manufacturing Footprint & Headcount Breakdown */}
            <div className="mb-20 p-6 rounded-lg bg-white/[0.03] border border-white/10 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                <div className="px-4 py-2">
                  <p className="font-display text-xl font-bold text-[#B97846]">283,380 m²</p>
                  <p className="font-body text-xs text-white/70 uppercase tracking-wider mt-1">Dedicated Finished Furniture</p>
                  <p className="font-body text-[11px] text-white/40 mt-0.5">10 Facilities (Indoor & Outdoor)</p>
                </div>
                <div className="px-4 py-2">
                  <p className="font-display text-xl font-bold text-[#B97846]">260,000 m²</p>
                  <p className="font-body text-xs text-white/70 uppercase tracking-wider mt-1">Panel & Primary Processing</p>
                  <p className="font-body text-[11px] text-white/40 mt-0.5">Engineered Wood Hub (Phu Tho)</p>
                </div>
                <div className="px-4 py-2">
                  <p className="font-display text-xl font-bold text-[#B97846]">~20 vs ~2,400</p>
                  <p className="font-body text-xs text-white/70 uppercase tracking-wider mt-1">Central Team vs Group Staff</p>
                  <p className="font-body text-[11px] text-white/40 mt-0.5">Commercial & QC Coordination</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <p className="font-body text-xs text-[#B97846]/90 tracking-wide">
                  {langKey === 'vi'
                    ? "* Toàn bộ gỗ dùng trong sản phẩm DHT đều đạt chứng nhận FSC (Acacia hybrid, Eucalyptus grandis, Brazilian Teak)."
                    : "* All wood used in DHT furniture is FSC-certified (Acacia hybrid, Eucalyptus grandis, Brazilian Teak)."}
                </p>
                <Link
                  href="/manufacturing"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-[hsl(var(--orange))] transition-colors shrink-0 bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full"
                >
                  <span>{langKey === 'vi' ? 'Xem 4 Cụm & Bản Đồ' : 'Explore 4 Clusters & Map'}</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Info Cards */}
            <div className={`grid gap-8 lg:gap-12 ${machineryItems.length > 0 ? "lg:grid-cols-2" : "grid-cols-1 max-w-4xl mx-auto w-full"}`}>
              {/* Human Resources & R&D */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={`p-10 lg:p-16 bg-white/2 backdrop-blur-md border border-white/5 rounded-sm hover:bg-white/4 hover:border-white/10 transition-colors duration-500 ${machineryItems.length === 0 ? "text-center flex flex-col items-center" : ""}`}>
                <h3 className={`font-display font-black text-3xl lg:text-4xl mb-12 text-white flex items-center gap-4 ${machineryItems.length === 0 ? "justify-center" : ""}`}>
                  {machineryItems.length > 0 && <span className="w-12 h-1 bg-[hsl(var(--orange))]" />}
                  {d(['stats', 'hr', 'heading'], "about.hr.heading")}
                  {/* {machineryItems.length === 0 && <span className="w-12 h-1 bg-[hsl(var(--orange))]" />} */}
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
              {machineryItems.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="p-10 lg:p-16 bg-white/2 backdrop-blur-md border border-white/5 rounded-sm hover:bg-white/4 hover:border-white/10 transition-colors duration-500">
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
              )}
            </div>
          </div>
        </section>

        {/* ── 6.5. Operating Model (6-Stage B2B Execution Workflow) ── */}
        <section className="py-28 relative overflow-hidden bg-[#FBF9F5] border-y border-border/40">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-4 justify-center mb-6">
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
                <span className="font-body text-xs tracking-widest uppercase font-bold text-[hsl(var(--orange))]">
                  {t("about.operatingModel.badge", langKey === 'vi' ? "Mô Hình Vận Hành B2B" : "B2B Operating Model")}
                </span>
                <span className="h-px w-8 bg-[hsl(var(--orange))]" />
              </div>
              <h2 className="font-display font-black text-foreground mb-4 text-3xl sm:text-4xl lg:text-5xl leading-tight">
                {t("about.operatingModel.heading", langKey === 'vi' ? "Quy Trình Phối Hợp 6 Bước" : "6-Stage Programme Execution")}
              </h2>
              <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed">
                {t("about.operatingModel.subtitle", langKey === 'vi'
                  ? "Cách đội ngũ điều phối trung tâm DHT quản trị đơn hàng từ yêu cầu người mua đến vận chuyển quốc tế qua 11 cơ sở sản xuất."
                  : "How our centralised DHT commercial team coordinates buyer requirements across 11 specialised manufacturing facilities in Vietnam.")}
              </p>
            </motion.div>

            {/* 6 Step Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {operatingSteps.map((s, idx) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="group relative bg-white p-7 sm:p-8 rounded-xl border border-black/5 shadow-xs hover:border-[hsl(var(--orange))/0.4] hover:shadow-xl transition-all duration-400 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-display font-black text-2xl text-[hsl(var(--orange))] bg-[hsl(var(--orange))/0.1] px-3 py-1 rounded-md">
                        {s.step}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#F3EFE7] flex items-center justify-center text-[#173C2C] group-hover:bg-[hsl(var(--orange))] group-hover:text-white transition-colors duration-300">
                        {s.icon}
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-3 leading-snug group-hover:text-[hsl(var(--orange))] transition-colors">
                      {s.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/5 text-[11px] font-bold text-[hsl(var(--orange))] tracking-wider uppercase flex items-center justify-between">
                    <span>{langKey === 'vi' ? `Giai đoạn ${idx + 1}/6` : `Stage ${idx + 1} of 6`}</span>
                    {idx < 5 && <ArrowRight size={14} className="text-black/30 group-hover:translate-x-1 group-hover:text-[hsl(var(--orange))] transition-all" />}
                  </div>
                </motion.div>
              ))}
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
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col md:flex-row md:gap-10 lg:gap-16 items-center md:items-start bg-white md:bg-[#FAFAFA] border border-border/60 rounded-sm overflow-hidden mb-16 hover:shadow-2xl hover:shadow-black/3 transition-all duration-500 md:p-8 lg:p-12">
              <div className="w-full md:w-64 lg:w-88 aspect-4/5 md:aspect-3/4 overflow-hidden shrink-0 md:shadow-lg md:rounded-sm bg-[#FAFAFA]">
                {teamLeader.image ? (
                  <img src={teamLeader.image} alt={teamLeader.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[hsl(var(--navy-deep))] to-[hsl(var(--navy))]">
                    <User size={64} className="text-white/30" />
                  </div>
                )}
              </div>
              <div className="p-8 pb-10 md:p-0 md:pt-2 grow text-center md:text-left flex flex-col justify-center h-full w-full">
                {teamLeader.name && <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-wider mb-4 text-foreground">{teamLeader.name}</h3>}
                {teamLeader.role && (
                  <div className="mb-10">
                    <span className="inline-block px-5 py-2.5 text-xs font-body font-bold uppercase tracking-widest bg-[hsl(var(--orange))] text-white rounded-sm">
                      {teamLeader.role}
                    </span>
                  </div>
                )}

                {teamLeader.quote && teamLeader.quote.trim() !== '' && (
                  <p className="text-left font-body italic text-base sm:text-2xl md:text-3xl text-muted-foreground leading-relaxed mb-12 border-l-4 pl-6 md:pl-8 border-[hsl(var(--orange))/0.4]">
                    &ldquo;{teamLeader.quote}&rdquo;
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-8 font-body text-base text-muted-foreground font-medium justify-center md:justify-start">
                  {teamLeader.email && teamLeader.email.trim() !== '' && (
                    <a href={`mailto:${teamLeader.email}`} className="flex items-center gap-3 hover:text-[hsl(var(--orange))] transition-colors">
                      <span className="text-[hsl(var(--orange))] text-xl">✉</span> {teamLeader.email}
                    </a>
                  )}
                  {teamLeader.phone && teamLeader.phone.trim() !== '' && !teamLeader.phone.includes('xxx') && (
                    <a href={`tel:${teamLeader.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-[hsl(var(--orange))] transition-colors">
                      <span className="text-[hsl(var(--orange))] text-xl">✆</span> {teamLeader.phone}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
              {teamMembers.map((m: any, i: number) => (
                <motion.div key={m.key || i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="flex flex-col bg-white border border-border/60 hover:border-[hsl(var(--orange))/0.4] hover:shadow-xl hover:shadow-[hsl(var(--orange))]/5 transition-all duration-500 rounded-sm overflow-hidden group h-full">
                  <div className="w-full aspect-4/5 overflow-hidden bg-[#FAFAFA] shrink-0">
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[hsl(var(--navy-deep))] to-[hsl(var(--navy))]">
                        <User size={48} className="text-white/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col grow text-center">
                    {m.name && <h3 className="font-display font-black text-4xl sm:text-2xl uppercase tracking-wider mb-2 text-foreground group-hover:text-[hsl(var(--orange))] transition-colors duration-500">{m.name}</h3>}
                    {m.role && <span className="text-xs sm:text-[10px] font-body font-bold uppercase tracking-widest mb-6 text-[hsl(var(--orange))]">{m.role}</span>}

                    {m.quote && m.quote.trim() !== '' && (
                      <p className="text-left font-body italic text-sm text-muted-foreground leading-relaxed mb-8 grow border-l-2 pl-4 border-[hsl(var(--orange))/0.3]">
                        &ldquo;{m.quote}&rdquo;
                      </p>
                    )}
                    {!m.quote || m.quote.trim() === '' ? <div className="grow" /> : null}

                    <div className="space-y-4 font-body text-base sm:text-sm text-muted-foreground font-medium border-t border-border/50 pt-6 mt-auto">
                      {m.email && m.email.trim() !== '' && (
                        <a href={`mailto:${m.email}`} className="flex items-center justify-center gap-3 hover:text-black transition-colors">
                          <span className="text-[hsl(var(--orange))]">✉</span> <span className="truncate">{m.email}</span>
                        </a>
                      )}
                      {m.phone && m.phone.trim() !== '' && !m.phone.includes('xxx') && (
                        <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-3 hover:text-black transition-colors">
                          <span className="text-[hsl(var(--orange))]">✆</span> {m.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 5 Functional Coordination Departments Matrix (Item 11) */}
            <div className="mt-20 pt-16 border-t border-border/60">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="font-body text-xs tracking-widest uppercase font-bold text-[hsl(var(--orange))] block mb-2">
                  {t("about.departments.badge", langKey === 'vi' ? "Điều Phối Trung Tâm" : "Central Coordination")}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
                  {t("about.departments.heading", langKey === 'vi' ? "5 Phòng Ban Phối Hợp Chuyên Môn" : "5 Functional Coordination Departments")}
                </h3>
                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t("about.departments.subtitle", langKey === 'vi'
                    ? "Đội ngũ trung tâm khoảng 20 nhân sự trực tiếp làm việc với khách hàng quốc tế để điều phối kỹ thuật, vận hành và quản lý chất lượng xuyên suốt mạng lưới 11 cơ sở."
                    : "The centralised DHT team of approximately 20 professionals directly interfaces with international buyers to coordinate technical, operational, and commercial execution across all group facilities.")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {departmentItems.map((dep, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg bg-[#FAFAFA] border border-border/70 hover:border-[hsl(var(--orange))/0.4] hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--orange))/0.15] text-[hsl(var(--orange))] flex items-center justify-center font-bold text-xs mb-3 font-display">
                        0{idx + 1}
                      </div>
                      <h4 className="font-display font-bold text-sm text-foreground mb-2 leading-snug">
                        {dep.title}
                      </h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        {dep.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Our Team Banner */}
            <div className="mt-16 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 sm:px-8 py-4 bg-[#FAFAFA] border border-border/70 rounded-full font-body text-sm sm:text-base text-foreground shadow-sm">
                <span className="font-semibold text-muted-foreground">{langKey === 'vi' ? 'Liên hệ đội ngũ chúng tôi:' : 'Contact our team:'}</span>
                <a href="mailto:sales@dhtcompany.com" className="font-bold text-[hsl(var(--orange))] hover:underline flex items-center gap-1.5">
                  <span>✉</span> sales@dhtcompany.com
                </a>
                <span className="text-border">|</span>
                <a href="tel:+84932058545" className="font-bold text-foreground hover:text-[hsl(var(--orange))] transition-colors flex items-center gap-1.5">
                  <span>✆</span> +84 932 058 545
                </a>
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locationItems.map((loc: any, i: number) => {
                const nameStr = typeof loc.name === 'string' ? loc.name : '';
                const addressStr = typeof loc.address === 'string' ? loc.address : '';
                const hotlineStr = typeof loc.hotline === 'string' ? loc.hotline : '';

                const hasName = nameStr && nameStr.replace(/<[^>]*>?/gm, '').trim() !== '';
                const hasAddress = addressStr && addressStr.replace(/<[^>]*>?/gm, '').trim() !== '';
                const hasHotline = hotlineStr && hotlineStr.replace(/<[^>]*>?/gm, '').trim() !== '';

                const hasAnyContent = hasName || hasAddress || hasHotline;
                if (!hasAnyContent) return null;

                return (
                  <motion.div key={loc.key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className="group p-10 bg-white border border-border hover:border-[hsl(var(--orange))] hover:shadow-2xl hover:shadow-[hsl(var(--orange))]/10 transition-all duration-500 flex flex-col h-full overflow-hidden">
                    <div className="w-16 h-16 bg-[hsl(var(--warm-cream))] rounded-full flex items-center justify-center mb-8 shrink-0 group-hover:bg-[hsl(var(--orange))] transition-colors duration-500">
                      <Globe size={24} className="text-foreground group-hover:text-white transition-colors duration-500" />
                    </div>
                    {hasName && (
                      <h3 className="font-display font-black text-2xl mb-4 text-foreground uppercase tracking-wide wrap-break-word">{loc.name}</h3>
                    )}
                    {hasAddress ? (
                      <p className="font-body text-muted-foreground mb-8 leading-loose font-light grow wrap-break-word">
                        {loc.address}
                      </p>
                    ) : (
                      <div className="grow" />
                    )}
                    {hasHotline && (
                      <div className="mt-auto border-t pt-6 border-border/50">
                        <a href={`tel:${loc.hotline.replace(/\\s/g, "")}`} className="font-body font-bold text-lg text-[hsl(var(--orange))] hover:text-black transition-colors block line-clamp-1 wrap-break-word">
                          {loc.hotline}
                        </a>
                      </div>
                    )}
                  </motion.div>
                );
              })}
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

        /* ── Timeline active + hover states ── */
        .tl-item:hover .tl-dot,
        .tl-item.tl-active .tl-dot {
          background-color: hsl(var(--orange)) !important;
          box-shadow: 0 0 0 6px rgba(245,166,35,0.12), 0 0 30px rgba(245,166,35,0.4) !important;
          transform: scale(1.1) translateX(-50%);
        }
        .tl-item:hover .tl-dot-icon,
        .tl-item.tl-active .tl-dot-icon {
          color: white !important;
        }
        .tl-item:hover .tl-ring,
        .tl-item.tl-active .tl-ring {
          opacity: 1 !important;
          transform: scale(1.5);
        }
        .tl-item:hover .tl-card,
        .tl-item.tl-active .tl-card {
          border-color: rgba(245,166,35,0.25) !important;
          background-color: white !important;
          box-shadow: 0 20px 50px -12px rgba(245,166,35,0.12) !important;
          transform: translateY(-6px);
        }
        .tl-item:hover .tl-year,
        .tl-item.tl-active .tl-year {
          transform: scale(1.06);
        }
        .tl-item:hover .tl-title,
        .tl-item.tl-active .tl-title {
          color: hsl(var(--navy-deep)) !important;
        }
        .tl-item:hover .tl-desc,
        .tl-item.tl-active .tl-desc {
          color: rgba(0,0,0,0.7) !important;
        }

        /* ── Scroll Storytelling: focus + dim ── */
        .tl-item {
          opacity: 0.35;
          transform: scale(0.97);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .tl-item.tl-active {
          opacity: 0.55;
          transform: scale(0.98);
        }
        .tl-item.tl-focus {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
        .tl-item:hover {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `}</style>
    </>
  );
}
