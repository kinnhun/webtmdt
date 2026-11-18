import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ChevronLeft, ChevronRight, Play,
  Ruler, Shirt, Shield, Sparkles, Settings2, MapPin,
  ArrowUpRight, Share2, Palette
} from "lucide-react";
import * as AntIcons from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { Product, ProductAttribute, ProductSpecification } from "@/domains/product/product.types";
import ProductInquiryModal from "./ProductInquiryModal";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

const renderAntIcon = (name: string, size = 16) => {
  if (!name) return null;
  const Comp = (AntIcons as any)[name];
  return Comp ? <Comp style={{ fontSize: size, color: "hsl(var(--orange))" }} /> : null;
};

/* ── Image Gallery ── */
function ImageGallery({ images, name, landscapeImage, landscapeImages }: { images: string[]; name: string; landscapeImage?: string; landscapeImages?: string[] }) {
  const landscapeList = landscapeImages?.length ? landscapeImages : (landscapeImage ? [landscapeImage] : []);
  const imageList = Array.isArray(images) ? images.filter(Boolean) : [];
  const galleryImages = imageList.length
    ? [...imageList, ...landscapeList.filter((img) => img && !imageList.includes(img))]
    : landscapeList;
  const [active, setActive] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const getThumbnailUrl = (url: string) => url?.split('?')[0] || '';

  return (
    <>
      <div className="w-full min-w-0">
        {/* Main image */}
        <div 
          className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 cursor-pointer group" 
          style={{ backgroundColor: "hsl(var(--navy)/0.04)" }}
          onClick={() => setIsLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image src={getThumbnailUrl(galleryImages[active])} alt={name} fill className="object-contain p-2 md:p-3" sizes="(max-width: 768px) 100vw, 55vw" priority />
            </motion.div>
          </AnimatePresence>
          {galleryImages.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); setActive((active - 1 + galleryImages.length) % galleryImages.length); }} 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-white shadow transition-all z-10 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setActive((active + 1) % galleryImages.length); }} 
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-white shadow transition-all z-10 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
        {/* Thumbnails */}
        {galleryImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {galleryImages.map((img, i) => (
              <button key={i} onClick={() => setActive(i)} className="relative w-20 h-16 rounded-md overflow-hidden border-2 transition-all shrink-0 snap-start bg-white" style={{ borderColor: i === active ? "hsl(var(--orange))" : "transparent", opacity: i === active ? 1 : 0.55 }}>
                <Image src={getThumbnailUrl(img)} alt={`${name} ${i + 1}`} fill className="object-contain p-1" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-[10000]"
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={(() => {
                  const src = galleryImages[active];
                  if (!src) return '';
                  try {
                    const urlObj = new URL(src, window.location.origin);
                    return urlObj.searchParams.get('original') || src;
                  } catch {
                    return src;
                  }
                })()} 
                alt={name} 
                fill 
                className="object-contain" 
                sizes="90vw"
                priority 
              />
            </motion.div>

            {galleryImages.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActive((active - 1 + galleryImages.length) % galleryImages.length); }} 
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 text-white transition-all z-[10000]"
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActive((active + 1) % galleryImages.length); }} 
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 text-white transition-all z-[10000]"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Tab Section ── */
function DetailTabs({ product }: { product: Product }) {
  const { t, i18n } = useTranslation();
  const langEnum: Record<string, 'vi' | 'uk' | 'us'> = { "vi-VN": "vi", "en-GB": "uk", "en-US": "us" };
  const langId = langEnum[i18n?.language] || "us";
  const getList = (field: unknown, lang: string): string[] => {
    if (Array.isArray(field)) {
      return field.filter((item): item is string => typeof item === "string" && item.trim() !== "");
    }
    if (field && typeof field === 'object') {
      const localizedField = field as { [key: string]: unknown; us?: unknown };
      const arr = localizedField[lang];
      if (Array.isArray(arr) && arr.length > 0) {
        return arr.filter((item): item is string => typeof item === "string" && item.trim() !== "");
      }
      if (Array.isArray(localizedField.us) && localizedField.us.length > 0) {
        return localizedField.us.filter((item): item is string => typeof item === "string" && item.trim() !== "");
      }
    }
    return [];
  };

  const specifications = Array.isArray(product.specifications)
    ? product.specifications.filter((spec) => {
        const localizedSpec = spec as ProductSpecification & { [key: string]: string | undefined };
        const key = localizedSpec[`name${langId.toUpperCase()}`] || localizedSpec.nameUS || "";
        const val = localizedSpec[`value${langId.toUpperCase()}`] || localizedSpec.valueUS || "";
        if (/testing/i.test(key) || /testing/i.test(val)) return false;
        if (/fsc/i.test(key) && (/100%/i.test(val) || val === "100" || !val.trim())) return false;
        return Boolean(key.trim() || val.trim());
      })
    : [];

  const pCare = getList(product.careInstructions, langId);
  const pUsage = getList(product.usageSettings, langId);

  const tabs = [
    specifications.length > 0 ? { id: "specs", label: t("productDetail.specifications") } : null,
    pCare.length > 0 ? { id: "care", label: t("productDetail.care") } : null,
    pUsage.length > 0 ? { id: "usage", label: t("productDetail.usage") } : null,
  ].filter((tab): tab is { id: string; label: string } => Boolean(tab));

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "specs");

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex border-b" style={{ borderColor: "hsl(var(--navy)/0.1)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-3 font-body text-sm font-semibold transition-all relative"
            style={{ color: activeTab === tab.id ? "hsl(var(--orange))" : "hsl(var(--navy)/0.45)" }}
          >
            {tab.label}
            {activeTab === tab.id && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: "hsl(var(--orange))" }} />}
          </button>
        ))}
      </div>
      <div className="py-6">
        <AnimatePresence mode="wait">
          {activeTab === "specs" && specifications.length > 0 && (
            <motion.div key="specs" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {specifications.map((spec, i) => {
                  const localizedSpec = spec as ProductSpecification & { [key: string]: string | undefined };
                  const key = localizedSpec[`name${langId.toUpperCase()}`] || localizedSpec.nameUS;
                  const val = localizedSpec[`value${langId.toUpperCase()}`] || localizedSpec.valueUS;
                  if (!key) return null;
                  return (
                    <div key={i} className="flex justify-between py-2 border-b" style={{ borderColor: "hsl(var(--navy)/0.06)" }}>
                      <span className="font-body text-sm font-semibold" style={{ color: "hsl(var(--navy-deep))" }}>{key}</span>
                      <span className="font-body text-sm" style={{ color: "hsl(var(--navy)/0.55)" }}>{val}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
          {activeTab === "care" && pCare.length > 0 && (
            <motion.div key="care" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <ul className="space-y-3">
                {pCare.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Shield size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--orange))" }} />
                    <span className="font-body text-sm" style={{ color: "hsl(var(--navy)/0.65)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          {activeTab === "usage" && pUsage.length > 0 && (
            <motion.div key="usage" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div className="grid grid-cols-2 gap-3">
                {pUsage.map((setting) => (
                  <div key={setting} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "hsl(var(--navy)/0.08)", backgroundColor: "hsl(var(--navy)/0.02)" }}>
                    <MapPin size={15} style={{ color: "hsl(var(--orange))" }} />
                    <span className="font-body text-sm font-medium" style={{ color: "hsl(var(--navy-deep))" }}>{setting}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Main Container ── */
export default function ProductDetailContainer({ product, relatedProducts }: Props) {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dimUnit, setDimUnit] = useState<'cm' | 'in'>('cm');

  const langEnum: Record<string, 'vi' | 'uk' | 'us'> = { "vi-VN": "vi", "en-GB": "uk", "en-US": "us" };
  const langId = langEnum[i18n?.language] || "us";
  const isVi = langId === 'vi';

  const pName = product.name?.[langId] || product.name?.us || "";
  const pDesc = product.description?.[langId] || product.description?.us || "";
  const pMat = product.material?.[langId] || product.material?.us || "";
  const pStyle = product.style?.[langId] || product.style?.us || "";
  const pFabric = product.fabric?.[langId] || product.fabric?.us || "";
  const getList = (field: any, lang: string) => {
    if (Array.isArray(field)) return field;
    if (field && typeof field === 'object') {
      const arr = field[lang];
      if (Array.isArray(arr) && arr.length > 0) return arr;
      if (Array.isArray(field.us) && field.us.length > 0) return field.us;
    }
    return [];
  };

  const pFeatures = getList(product.features, langId);
  const pCategory = product.category?.[langId] || product.category?.us || "";
  const pCare = getList(product.careInstructions, langId);
  const pUsage = getList(product.usageSettings, langId);
  const pLongDesc = product.longDescription?.[langId] || product.longDescription?.us || "";

  const pColorStr = product.color?.[langId] || product.color?.us || "";
  const colorList = typeof pColorStr === 'string' ? pColorStr.split(',').map(s => s.trim()).filter(Boolean) : [];

  const renderColorItem = (colorStr: string) => {
    const match = colorStr.match(/^\[(#[A-Fa-f0-9]+)\]\s*(.*)$/);
    if (match) {
      return (
        <div key={colorStr} className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full pr-2 p-0.5 shadow-sm shrink-0">
          <div className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: match[1] }} />
          <span className="text-[10px] font-medium text-gray-700">{match[2]}</span>
        </div>
      );
    }
    return (
      <span key={colorStr} className="px-2 py-1 bg-white flex items-center border border-gray-100 rounded-full text-[10px] shadow-sm shrink-0">
        {colorStr}
      </span>
    );
  };

  const handleShare = useCallback(() => {
    if (typeof navigator !== "undefined") navigator.clipboard.writeText(window.location.href);
  }, []);

  const isAmalfi = (product.slug || "").toLowerCase().includes("amalfi") || (product.name?.us || "").toLowerCase().includes("amalfi");
  const isBenson = (product.slug || "").toLowerCase().includes("benson") || (product.name?.us || "").toLowerCase().includes("benson");
  const isBalemora = (product.slug || "").toLowerCase().includes("balemora") || (product.name?.us || "").toLowerCase().includes("balemora") || (product.slug || "").toLowerCase().includes("balmora");
  const isTimor = (product.slug || "").toLowerCase().includes("timor") || (product.name?.us || "").toLowerCase().includes("timor");
  const isWestley = (product.slug || "").toLowerCase().includes("westley") || (product.name?.us || "").toLowerCase().includes("westley");
  const cleanDimensions = (product.dimensions || "").replace(/^[~\s]+/, "").trim();

  // Helper to parse dimension string into cm and in
  const parseDimensions = (val: string) => {
    if (!val || typeof val !== "string") return null;
    const clean = val.replace(/mm|h|inch|in/gi, "").trim();
    const parts = clean.split(/[x×\t\s]+/).filter(Boolean).map(Number).filter(n => !isNaN(n));
    if (parts.length >= 3) {
      if (parts[0] > 200) {
        // Source in mm
        const cm = parts.slice(0, 3).map(n => Math.round(n / 10)).join(" × ") + " cm";
        const inch = parts.slice(0, 3).map(n => (n / 25.4).toFixed(1)).join(" × ") + " in";
        return { cm, inch };
      } else {
        // Source in inches
        const cm = parts.slice(0, 3).map(n => Math.round(n * 2.54)).join(" × ") + " cm";
        const inch = parts.slice(0, 3).map(n => n.toString()).join(" × ") + " in";
        return { cm, inch };
      }
    } else if (parts.length === 2) {
      if (parts[0] > 200) {
        const cm = parts.map(n => Math.round(n / 10)).join(" × ") + " cm";
        const inch = parts.map(n => (n / 25.4).toFixed(1)).join(" × ") + " in";
        return { cm, inch };
      } else {
        const cm = parts.map(n => Math.round(n * 2.54)).join(" × ") + " cm";
        const inch = parts.map(n => n.toString()).join(" × ") + " in";
        return { cm, inch };
      }
    }
    return null;
  };

  const parsedSingleDim = cleanDimensions !== "" && cleanDimensions !== "~" ? parseDimensions(cleanDimensions) : null;

  const formatItemName = (nameStr: string) => {
    if (!nameStr) return "";
    return nameStr
      .toLowerCase()
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const getItemNameVi = (nameUs: string): string => {
    const s = nameUs || "";
    if (/Amalfi.*?(?:Swirl|Swivel).*?Chair/i.test(s) || /(?:Swirl|Swivel) Chair/i.test(s)) return 'Ghế xoay ngoài trời kèm đệm';
    if (/Amalfi.*?Side Table/i.test(s)) return 'Bàn góc phụ ngoài trời Amalfi';
    if (/Balemora.*?Triple/i.test(s)) return 'Sofa 3 chỗ Balemora ngoài trời có đệm';
    if (/Balemora.*?Single/i.test(s)) return 'Ghế đơn lounge Balemora có đệm';
    if (/Balemora.*?Coffee Table/i.test(s)) return 'Bàn trà Balemora ngoài trời';
    if (/Timor.*?Daybed/i.test(s) || /Daybed/i.test(s)) return 'Giường nằm ngoài trời Timor Losil có đệm';
    if (/Single Lounge/i.test(s) || /Single Seat/i.test(s)) return 'Ghế đơn lounge có đệm';
    if (/Double Lounge/i.test(s) || /Double Seat/i.test(s) || /2-Seater/i.test(s)) return 'Sofa đôi ngoài trời có đệm';
    if (/Triple Lounge/i.test(s) || /Triple Seat/i.test(s) || /3-Seater/i.test(s)) return 'Sofa 3 chỗ ngoài trời có đệm';
    if (/Ottoman/i.test(s)) return 'Đôn ottoman ngoài trời có đệm';
    if (/Coffee Table.*?Top/i.test(s)) return 'Mặt bàn trà ngoài trời';
    if (/Coffee Table.*?Frame/i.test(s)) return 'Khung bàn trà ngoài trời';
    if (/Coffee Table/i.test(s)) return 'Bàn trà ngoài trời';
    if (/Side Table.*?Top/i.test(s)) return 'Mặt bàn phụ ngoài trời';
    if (/Side Table.*?Frame/i.test(s)) return 'Khung bàn phụ ngoài trời';
    if (/Side Table/i.test(s)) return 'Bàn góc phụ ngoài trời';
    if (/End Table/i.test(s)) return 'Bàn góc ngoài trời';
    if (/Dining Chair/i.test(s)) return 'Ghế ăn ngoài trời';
    if (/Dining Table|Dinning Table/i.test(s)) return 'Bàn ăn ngoài trời';
    return formatItemName(s);
  };

  const collectionItems: Array<{
    name: string;
    nameVi?: string;
    code: string;
    cm: string;
    inch: string;
  }> = [];

  if (product.attributes && product.attributes.length > 0) {
    product.attributes.forEach((attr: any, idx: number) => {
      const rawTitle = attr[`title${langId.toUpperCase()}`] || attr.titleUS || attr.title || "";
      const rawVal = attr[`value${langId.toUpperCase()}`] || attr.valueUS || attr.value || "";
      if (!rawTitle || rawTitle.toLowerCase().includes("testing") || !rawVal) return;

      const parsed = parseDimensions(rawVal);
      const cmVal = parsed ? parsed.cm : (rawVal ? `${rawVal} cm` : "—");
      const inVal = parsed ? parsed.inch : (rawVal ? `${rawVal} in` : "—");

      collectionItems.push({
        name: formatItemName(attr.titleUS || rawTitle),
        nameVi: attr.titleVI ? formatItemName(attr.titleVI) : getItemNameVi(attr.titleUS || rawTitle),
        code: `${product.code}-${String(idx + 1).padStart(2, "0")}`,
        cm: cmVal,
        inch: inVal,
      });
    });
  }

  return (
    <div className="pt-[80px]" style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 font-body text-xs" style={{ color: "hsl(var(--navy)/0.45)" }}>
            <Link href="/" className="hover:underline">{t("nav.home")}</Link>
            <span>/</span>
            <Link href={product?.collection === "Indoor" ? "/catalogue/indoor" : "/catalogue/outdoor"} className="hover:underline">{t("nav.collections", "Collections")}</Link>
            <span>/</span>
            <span style={{ color: "hsl(var(--navy-deep))" }}>{pName}</span>
          </div>
        </div>
      </div>

      {/* Product Hero: Gallery + Info */}
      <section className="container mx-auto px-6 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
          {/* Left — Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="min-w-0 w-full">
            <ImageGallery images={product.images} landscapeImage={product.landscapeImage} landscapeImages={product.landscapeImages} name={pName} />
          </motion.div>

          {/* Right — Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {(pCategory || product.code) && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {pCategory && pCategory.trim() !== "" && (
                  <span className="px-2.5 py-1 rounded-sm font-body text-[10px] font-semibold tracking-wider uppercase text-white shadow-sm" style={{ backgroundColor: "#B97846" }}>
                    {pCategory}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-sm font-body text-[10px] font-semibold tracking-wider uppercase text-white shadow-sm bg-[#173C2C]">
                  {isVi ? "Gỗ Chứng Nhận FSC" : "FSC-Certified Wood"}
                </span>
                {product.code && product.code.trim() !== "" && (
                  <span className="font-body text-xs font-mono font-medium" style={{ color: "hsl(var(--navy)/0.5)" }}>{product.code}</span>
                )}
              </div>
            )}

            <h1 className="font-display font-bold leading-tight mb-3" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "hsl(var(--navy-deep))" }}>
              {pName}
            </h1>

            {pDesc && pDesc.replace(/<[^>]*>?/gm, '').trim() !== "" && (
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--navy)/0.55)" }}>
                {pDesc}
              </p>
            )}

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {collectionItems.length === 0 && cleanDimensions !== "" && cleanDimensions !== "~" && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg" style={{ backgroundColor: "hsl(var(--navy)/0.03)" }}>
                  <Ruler size={16} style={{ color: "hsl(var(--orange))" }} />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-wider font-medium" style={{ color: "hsl(var(--navy)/0.4)" }}>{t("productDetail.dimensions")}</p>
                    <p className="font-body text-xs font-semibold" style={{ color: "hsl(var(--navy-deep))" }}>
                      {parsedSingleDim ? (dimUnit === 'cm' ? parsedSingleDim.cm : parsedSingleDim.inch) : cleanDimensions}
                    </p>
                  </div>
                </div>
              )}
              {pFabric && pFabric.trim() !== "" && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg" style={{ backgroundColor: "hsl(var(--navy)/0.03)" }}>
                  <Shirt size={16} style={{ color: "hsl(var(--orange))" }} />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-wider font-medium" style={{ color: "hsl(var(--navy)/0.4)" }}>{t("productDetail.fabric")}</p>
                    <p className="font-body text-xs font-semibold" style={{ color: "hsl(var(--navy-deep))" }}>{pFabric}</p>
                  </div>
                </div>
              )}
              {pMat && pMat.trim() !== "" && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg" style={{ backgroundColor: "hsl(var(--navy)/0.03)" }}>
                  <Sparkles size={16} style={{ color: "hsl(var(--orange))" }} />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-wider font-medium" style={{ color: "hsl(var(--navy)/0.4)" }}>{t("productDetail.material")}</p>
                    <p className="font-body text-xs font-semibold" style={{ color: "hsl(var(--navy-deep))" }}>{pMat}</p>
                  </div>
                </div>
              )}
              {pStyle && pStyle.trim() !== "" && (
                <div className="flex items-center gap-2.5 p-3 rounded-lg" style={{ backgroundColor: "hsl(var(--navy)/0.03)" }}>
                  <Settings2 size={16} style={{ color: "hsl(var(--orange))" }} />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-wider font-medium" style={{ color: "hsl(var(--navy)/0.4)" }}>{t("productDetail.style")}</p>
                    <p className="font-body text-xs font-semibold" style={{ color: "hsl(var(--navy-deep))" }}>{pStyle}</p>
                  </div>
                </div>
              )}
              {colorList.length > 0 && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg col-span-2" style={{ backgroundColor: "hsl(var(--navy)/0.03)" }}>
                  <Palette size={16} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--orange))" }} />
                  <div className="w-full flex-1 overflow-hidden">
                    <p className="font-body text-[10px] uppercase tracking-wider font-medium mb-1.5" style={{ color: "hsl(var(--navy)/0.4)" }}>{t("productDetail.color") || "Color"}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {colorList.map(renderColorItem)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FSC Timber Integrity Statement */}
            <div className="flex items-start gap-3 p-3.5 rounded-lg border border-[#173C2C]/20 bg-[#173C2C]/5 mb-6">
              <Shield size={18} className="text-[#173C2C] shrink-0 mt-0.5" />
              <div>
                <span className="font-body text-xs font-bold text-[#173C2C] block uppercase tracking-wider mb-0.5">
                  {isVi ? "Gỗ Chứng Nhận FSC" : "FSC-Certified Wood"}
                </span>
                <p className="font-body text-xs text-[#173C2C]/90 font-medium leading-relaxed">
                  {isVi
                    ? "Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Hồ sơ chứng minh được lưu trữ tương ứng với từng công bố FSC áp dụng."
                    : "All wood used in DHT furniture is FSC-certified. Supporting documentation is maintained for the applicable FSC claim."}
                </p>
              </div>
            </div>

            {/* Collection Items & Dimensions Table */}
            {collectionItems.length > 0 ? (
              <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-gray-50/70 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Ruler size={16} className="text-[#B97846]" />
                    <h3 className="font-display font-bold text-sm text-[#173C2C]">
                      {isVi ? "Danh mục sản phẩm & Kích thước" : "Collection Items & Dimensions"}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setDimUnit('cm')}
                      className={`px-2.5 py-0.5 rounded font-medium transition-all ${
                        dimUnit === 'cm'
                          ? 'bg-[#173C2C] text-white shadow-xs'
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      cm
                    </button>
                    <button
                      type="button"
                      onClick={() => setDimUnit('in')}
                      className={`px-2.5 py-0.5 rounded font-medium transition-all ${
                        dimUnit === 'in'
                          ? 'bg-[#173C2C] text-white shadow-xs'
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      inches
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-body border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px]">
                        <th className="py-2 text-left font-semibold">{isVi ? "Sản phẩm" : "Item"}</th>
                        <th className="py-2 text-left font-semibold px-2">{isVi ? "Mã sản phẩm" : "Item code"}</th>
                        <th className="py-2 text-right font-semibold">
                          {isVi 
                            ? `Kích thước (${dimUnit === 'cm' ? 'D × R × C, cm' : 'D × R × C, in'})` 
                            : `Dimensions (W × D × H, ${dimUnit === 'cm' ? 'cm' : 'in'})`}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {collectionItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-white/60 transition-colors">
                          <td className="py-2.5 pr-2 font-medium text-gray-900 leading-snug">
                            {isVi && item.nameVi ? item.nameVi : item.name}
                          </td>
                          <td className="py-2.5 px-2 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                            {item.code}
                          </td>
                          <td className="py-2.5 pl-2 text-right font-mono font-semibold text-[#173C2C] whitespace-nowrap">
                            {dimUnit === 'cm' ? item.cm : item.inch}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Confirmed packing & loading note per Guide P02-P03 */}
                <div className="mt-3 pt-2.5 border-t border-gray-200/80 text-[11px] text-gray-600">
                  <p className="italic text-gray-500 leading-relaxed">
                    {isVi
                      ? "Thông tin đóng gói và tải container được xác nhận theo cấu hình báo giá."
                      : "Packing & loading information confirmed for the quoted configuration."}
                  </p>
                </div>

                {/* Amalfi Specific Quotation Policy per Guide P01, tr. 21 */}
                {isAmalfi && (
                  <div className="mt-3 p-3 rounded-md bg-[#173C2C]/5 border border-[#173C2C]/15 text-xs">
                    <p className="font-semibold text-[#173C2C] mb-1">
                      {isVi ? "Bộ sưu tập Amalfi Lounge" : "Amalfi Lounge Collection"}
                    </p>
                    <p className="text-[#173C2C]/85 leading-relaxed">
                      {isVi
                        ? "Vật liệu, hoàn thiện bề mặt, tùy chọn vải nệm và cấu hình thành phần bộ sản phẩm được xác nhận cụ thể theo từng báo giá. Toàn bộ gỗ sử dụng trong sản phẩm DHT đều có chứng chỉ FSC."
                        : "Materials, finishes, fabric options and set composition are confirmed for each quotation. All wood used in DHT furniture is FSC-certified."}
                    </p>
                  </div>
                )}

                {/* Benson Specific Quotation Policy per Guide P02, tr. 22 */}
                {isBenson && (
                  <div className="mt-3 p-3 rounded-md bg-[#173C2C]/5 border border-[#173C2C]/15 text-xs">
                    <p className="font-semibold text-[#173C2C] mb-1">
                      {isVi ? "Bộ sưu tập Benson Lounge" : "Benson Lounge Collection"}
                    </p>
                    <p className="text-[#173C2C]/85 leading-relaxed">
                      {isVi
                        ? "Bộ sưu tập Benson Lounge cung cấp giải pháp ghế ngồi ngoài trời đồng bộ và bàn phụ cho các chương trình dân cư và nghỉ dưỡng cao cấp. Cấu hình thành phần bộ, vật liệu, hoàn thiện bề mặt và thông số đệm được xác nhận cụ thể theo từng báo giá. Toàn bộ gỗ sử dụng trong sản phẩm DHT đều có chứng nhận FSC."
                        : "The Benson Lounge Collection offers coordinated outdoor seating and occasional tables for residential and hospitality programmes. Set composition, materials, finishes and cushion specifications are confirmed for each quotation. All wood used in DHT furniture is FSC-certified."}
                    </p>
                  </div>
                )}

                {/* Balemora Specific Quotation Policy per Guide P02 / Mã 24 */}
                {isBalemora && (
                  <div className="mt-3 p-3 rounded-md bg-[#173C2C]/5 border border-[#173C2C]/15 text-xs">
                    <p className="font-semibold text-[#173C2C] mb-1">
                      {isVi ? "Bộ sưu tập Balemora Lounge" : "Balemora Lounge Collection"}
                    </p>
                    <p className="text-[#173C2C]/85 leading-relaxed">
                      {isVi
                        ? "Vật liệu, hoàn thiện bề mặt, tùy chọn vải nệm và cấu hình thành phần bộ sản phẩm được xác nhận cụ thể theo từng báo giá. Toàn bộ gỗ sử dụng trong sản phẩm DHT đều có chứng chỉ FSC."
                        : "Materials, finishes, fabric options and set composition are confirmed for each quotation. All wood used in DHT furniture is FSC-certified."}
                    </p>
                  </div>
                )}

                {/* Timor Specific Quotation Policy per Guide P02, D11 / Mã 25 */}
                {isTimor && (
                  <div className="mt-3 p-3 rounded-md bg-[#173C2C]/5 border border-[#173C2C]/15 text-xs">
                    <p className="font-semibold text-[#173C2C] mb-1">
                      {isVi ? "Bộ sưu tập Timor Losil" : "Timor Losil Collection"}
                    </p>
                    <p className="text-[#173C2C]/85 leading-relaxed">
                      {isVi
                        ? "Tùy chọn loài gỗ (Gỗ Keo FSC hoặc Gỗ Tếch FSC), hoàn thiện bề mặt, thông số vải đệm và cấu hình thành phần được xác nhận cụ thể theo từng báo giá. Toàn bộ gỗ sử dụng trong sản phẩm DHT đều có chứng chỉ FSC."
                        : "Wood species options (FSC Acacia or FSC Teak), surface finishes, fabric specifications and set composition are confirmed for each quotation. All wood used in DHT furniture is FSC-certified."}
                    </p>
                  </div>
                )}

                {/* Westley Specific Quotation Policy per Guide P02 / Mã 19, 21 */}
                {isWestley && (
                  <div className="mt-3 p-3 rounded-md bg-[#173C2C]/5 border border-[#173C2C]/15 text-xs">
                    <p className="font-semibold text-[#173C2C] mb-1">
                      {isVi ? "Bộ sưu tập Westley Lounge" : "Westley Lounge Collection"}
                    </p>
                    <p className="text-[#173C2C]/85 leading-relaxed">
                      {isVi
                        ? "Cấu hình thành phần bộ, tùy chọn loài gỗ (Keo FSC), hoàn thiện bề mặt và thông số đệm Olefin được xác nhận cụ thể theo từng báo giá. Toàn bộ gỗ sử dụng trong sản phẩm DHT đều có chứng chỉ FSC."
                        : "Set composition, timber options (FSC Acacia), surface finishes and Olefin cushion specifications are confirmed for each quotation. All wood used in DHT furniture is FSC-certified."}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-gray-50/70 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Ruler size={16} className="text-[#B97846]" />
                    <h3 className="font-display font-bold text-sm text-[#173C2C]">
                      {isVi ? "Thông số & Kích thước sản phẩm" : "Item Specifications & Dimensions"}
                    </h3>
                  </div>
                  {parsedSingleDim && (
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md p-0.5 text-xs">
                      <button
                        type="button"
                        onClick={() => setDimUnit('cm')}
                        className={`px-2.5 py-0.5 rounded font-medium transition-all ${
                          dimUnit === 'cm'
                            ? 'bg-[#173C2C] text-white shadow-xs'
                            : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        cm
                      </button>
                      <button
                        type="button"
                        onClick={() => setDimUnit('in')}
                        className={`px-2.5 py-0.5 rounded font-medium transition-all ${
                          dimUnit === 'in'
                            ? 'bg-[#173C2C] text-white shadow-xs'
                            : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        inches
                      </button>
                    </div>
                  )}
                </div>

                {parsedSingleDim ? (
                  <div className="overflow-x-auto mb-3">
                    <table className="w-full text-xs font-body border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px]">
                          <th className="py-2 text-left font-semibold">{isVi ? "Sản phẩm" : "Item"}</th>
                          <th className="py-2 text-left font-semibold px-2">{isVi ? "Mã sản phẩm" : "Item code"}</th>
                          <th className="py-2 text-right font-semibold">
                            {isVi 
                              ? `Kích thước (${dimUnit === 'cm' ? 'D × R × C, cm' : 'D × R × C, in'})` 
                              : `Dimensions (W × D × H, ${dimUnit === 'cm' ? 'cm' : 'in'})`}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-white/60 transition-colors">
                          <td className="py-2.5 pr-2 font-medium text-gray-900 leading-snug">{pName}</td>
                          <td className="py-2.5 px-2 font-mono text-[11px] text-gray-500 whitespace-nowrap">{product.code || "—"}</td>
                          <td className="py-2.5 pl-2 text-right font-mono font-semibold text-[#173C2C] whitespace-nowrap">
                            {dimUnit === 'cm' ? parsedSingleDim.cm : parsedSingleDim.inch}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded border border-gray-200/80 mb-3 text-xs leading-relaxed text-gray-700">
                    <p className="font-semibold text-gray-900 mb-1">{pName} {product.code ? `(${product.code})` : ""}</p>
                    <p className="text-gray-600">
                      {isVi
                        ? "Thông số kích thước chi tiết, bản vẽ kỹ thuật và quy cách đóng gói được xác nhận theo cấu hình báo giá và yêu cầu chương trình đặt hàng."
                        : "Detailed item dimensions, technical drawings, and packing/loading specifications are confirmed for the quoted configuration upon buyer programme requirements."}
                    </p>
                  </div>
                )}

                {/* Confirmed packing & loading note per Guide P02-P03 */}
                <div className="pt-2 border-t border-gray-200/80 text-[11px] text-gray-600">
                  <p className="italic text-gray-500 leading-relaxed">
                    {isVi
                      ? "Thông tin đóng gói và tải container được xác nhận theo cấu hình báo giá."
                      : "Packing & loading information confirmed for the quoted configuration."}
                  </p>
                </div>
              </div>
            )}

            {/* Features */}
            {pFeatures && pFeatures.length > 0 && (
              <div className="mb-6">
                <h3 className="font-display font-semibold text-sm mb-3" style={{ color: "hsl(var(--navy-deep))" }}>{t("productDetail.features")}</h3>
                <ul className="space-y-2">
                  {pFeatures.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "hsl(var(--orange))" }} />
                      <span className="font-body text-sm" style={{ color: "hsl(var(--navy)/0.6)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTAs */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "hsl(var(--orange))", outline: "none", border: "none" }}
              >
                {t("productDetail.inquire")} <ArrowUpRight size={15} />
              </button>
              <button onClick={handleShare} className="px-4 py-3 rounded-sm border font-body text-sm transition-all hover:bg-gray-50" style={{ borderColor: "hsl(var(--navy)/0.12)", color: "hsl(var(--navy)/0.55)" }}>
                <Share2 size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      {product.video && (
        <section className="py-8 md:py-12" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <Play size={20} style={{ color: "hsl(var(--orange))" }} />
                <h2 className="font-display font-bold text-xl" style={{ color: "hsl(var(--navy-deep))" }}>{t("productDetail.videoTitle")}</h2>
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src={product.video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={pName}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Long description */}
      {product.longDescription && (
        <section className="container mx-auto px-6 py-10 md:py-14">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto prose-dht" dangerouslySetInnerHTML={{ __html: pLongDesc.replace(/&nbsp;/g, ' ') }} />
        </section>
      )}

      {/* Specifications / Care / Usage Tabs */}
      <section className="border-t" style={{ borderColor: "hsl(var(--navy)/0.06)" }}>
        <div className="container mx-auto px-6 py-8 md:py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <DetailTabs product={product} />
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-10 md:py-14" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
          <div className="container mx-auto px-6">
            <h2 className="font-display font-bold text-xl mb-6" style={{ color: "hsl(var(--navy-deep))" }}>{t("productDetail.relatedProducts")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p, idx) => (
                <Link key={p.id || p.code || `related-${idx}`} href={`/catalogue/${p.slug}`} className="group block">
                  <div className="rounded-lg overflow-hidden border border-black/5 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1" style={{ backgroundColor: "#fff" }}>
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: "hsl(var(--warm-beige))" }}>
                      <Image src={p.image} alt={p.name?.[langId] || p.name?.us || ""} fill className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                    </div>
                    <div className="p-3 md:p-4">
                      <p className="font-body text-[10px] uppercase tracking-wider mb-1" style={{ color: "hsl(var(--navy)/0.4)" }}>{p.code}</p>
                      <h3 className="font-display font-semibold text-sm leading-snug transition-colors group-hover:text-[hsl(var(--orange))]" style={{ color: "hsl(var(--navy-deep))" }}>
                        {p.name?.[langId] || p.name?.us || ""}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Modal Popup */}
      <ProductInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </div>
  );
}
