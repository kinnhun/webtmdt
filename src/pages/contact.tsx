import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Send,
  Paperclip,
  Mail,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  Layers,
  Loader2,
  X,
} from "lucide-react";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { BrandLogo } from "@/components/ui/BrandLogos";
import type {
  BrandId,
  InquiryTypeValue,
  BrandInterestValue,
  SmartContactFormValues,
} from "@/types/dht.types";

const INQUIRY_OPTIONS: InquiryTypeValue[] = [
  "General Inquiry",
  "Request a Quotation",
  "Request Catalogue Access",
  "Discuss a Project",
  "Arrange Factory Visit",
];

type BrandDropdownOption = {
  value: BrandInterestValue;
  brandId: BrandId | "ALL";
  shortTitle: string;
  suffix: string;
};

const BRAND_DROPDOWN_OPTIONS: BrandDropdownOption[] = [
  {
    value: "DHT – Outdoor Furniture",
    brandId: "DHT",
    shortTitle: "DHT®",
    suffix: "– Outdoor Furniture",
  },
  {
    value: "JAGER – Indoor Furniture",
    brandId: "JAGER",
    shortTitle: "JAGER®",
    suffix: "– Indoor Furniture",
  },
  {
    value: "THE ONE – Project & Office Furniture",
    brandId: "THE ONE",
    shortTitle: "THE ONE®",
    suffix: "– Project & Office Furniture",
  },
  {
    value: "MEKONG – Wood Panels & Processing",
    brandId: "MEKONG",
    shortTitle: "MEKONG®",
    suffix: "– Wood Panels & Processing",
  },
  {
    value: "Multiple Brands / Not Sure",
    brandId: "ALL",
    shortTitle: "Multiple Brands",
    suffix: "/ Not Sure",
  },
];

const MARKET_COUNTRIES: string[] = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Denmark",
  "Austria",
  "Poland",
  "Belgium",
  "Sweden",
  "Australia",
  "New Zealand",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Israel",
  "Türkiye",
  "Japan",
  "South Korea",
  "Singapore",
  "India",
  "South Africa",
  "Multiple Markets / Global",
  "Other Market",
];

const FOUR_BRAND_CARDS: { id: BrandId; subtitle: string; scaleClass: string }[] = [
  { id: "DHT", subtitle: "Outdoor Furniture", scaleClass: "scale-[0.88]" },
  { id: "JAGER", subtitle: "Indoor Furniture", scaleClass: "scale-[0.88]" },
  { id: "THE ONE", subtitle: "Project & Office Furniture", scaleClass: "scale-[0.84]" },
  { id: "MEKONG", subtitle: "Wood Panels & Processing", scaleClass: "scale-[0.82]" },
];

type FormFieldErrors = Partial<
  Record<"fullName" | "businessEmail" | "companyName" | "countryMarket" | "message", string>
>;

function BrandMiniMark({ brandId }: { brandId: BrandId | "ALL" }) {
  if (brandId === "DHT") {
    return (
      <img
        src="/img/pdf-guide/logos/dht-hexagon-icon.png"
        alt=""
        className="w-[18px] h-[18px] object-contain shrink-0"
      />
    );
  }
  if (brandId === "JAGER") {
    return (
      <svg viewBox="0 0 34 36" className="w-[18px] h-[18px] shrink-0" fill="none" aria-hidden="true">
        <circle cx="17.5" cy="5.5" r="3" fill="#E03C1F" />
        <circle cx="25.2" cy="5.5" r="3" fill="#F4B629" />
        <path
          d="M23.8 11V23C23.8 28 20 31.2 14.8 31.2C9.8 31.2 6.5 28.2 6.5 23.8H11.5C11.5 25.8 12.9 27.1 15 27.1C17.3 27.1 19 25.6 19 23V11H23.8Z"
          fill="#E03C1F"
        />
        <rect x="6.5" y="15.8" width="5.5" height="3.8" rx="0.8" fill="#E03C1F" />
      </svg>
    );
  }
  if (brandId === "THE ONE") {
    return (
      <svg viewBox="0 0 36 32" className="w-[18px] h-[18px] shrink-0" fill="none" aria-hidden="true">
        <path
          d="M4 5C4 3.9 4.9 3 6 3H30C31.1 3 32 3.9 32 5V16C32 22.8 25.5 27.6 18 29.5C10.5 27.6 4 22.8 4 16V5Z"
          fill="#0E63B1"
        />
        <path
          d="M11 16L15.5 11.5L20 16L15.5 20.5L11 16ZM16 16L20.5 11.5L25 16L20.5 20.5L16 16Z"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (brandId === "MEKONG") {
    return (
      <svg viewBox="0 0 46 34" className="w-[19px] h-[16px] shrink-0" fill="none" aria-hidden="true">
        <path d="M23 3C26.2 9.2 26.5 17.5 23 24C19.5 17.5 19.8 9.2 23 3Z" fill="#173C2C" />
        <path d="M12.5 7.5C17.8 11.2 20.5 18 20 25C14.2 21.5 11.5 14.5 12.5 7.5Z" fill="#245741" />
        <path d="M33.5 7.5C28.2 11.2 25.5 18 26 25C31.8 21.5 34.5 14.5 33.5 7.5Z" fill="#245741" />
        <path d="M4.5 15.5C10.8 16.2 16 20.2 18 26.5C11.2 26.2 6.2 21.8 4.5 15.5Z" fill="#B27B42" />
        <path d="M41.5 15.5C35.2 16.2 30 20.2 28 26.5C34.8 26.2 39.8 21.8 41.5 15.5Z" fill="#B27B42" />
      </svg>
    );
  }
  return <Layers size={16} className="text-[#C57B35] shrink-0" />;
}

function resolveInquiryType(raw: string | undefined): InquiryTypeValue {
  if (!raw) return "Request Catalogue Access";
  const norm = raw.toLowerCase().trim();
  if (norm.includes("quot") || norm === "rfq") return "Request a Quotation";
  if (norm.includes("catalog") || norm.includes("collection")) return "Request Catalogue Access";
  if (norm.includes("project") || norm.includes("oem")) return "Discuss a Project";
  if (norm.includes("visit") || norm.includes("factory") || norm.includes("inspection")) {
    return "Arrange Factory Visit";
  }
  if (norm.includes("general")) return "General Inquiry";
  return "Request a Quotation";
}

function resolveBrandInterest(raw: string | undefined): BrandInterestValue {
  if (!raw) return "JAGER – Indoor Furniture";
  const norm = raw.toUpperCase().trim();
  if (norm.includes("DHT")) return "DHT – Outdoor Furniture";
  if (norm.includes("JAGER")) return "JAGER – Indoor Furniture";
  if (norm.includes("ONE")) return "THE ONE – Project & Office Furniture";
  if (norm.includes("MEKONG")) return "MEKONG – Wood Panels & Processing";
  return "Multiple Brands / Not Sure";
}

export default function ContactPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const [brandMenuOpen, setBrandMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FormFieldErrors>({});

  const [form, setForm] = useState<SmartContactFormValues>({
    inquiryType: "Request Catalogue Access",
    brandOfInterest: "JAGER – Indoor Furniture",
    fullName: "",
    businessEmail: "",
    companyName: "",
    phoneWhatsapp: "",
    countryMarket: "",
    message: "",
    attachmentName: "",
  });

  // Close custom brand dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(e.target as Node)) {
        setBrandMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBrandMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto-select Inquiry Type, Brand of Interest, and Collection from URL query params
  useEffect(() => {
    if (!router.isReady) return;
    const qInquiry =
      (router.query.inquiry as string | undefined) ||
      (router.query.type as string | undefined);
    const qBrand = router.query.brand as string | undefined;
    const qCollection = router.query.collection as string | undefined;

    setForm((prev) => {
      const nextInquiry = qInquiry ? resolveInquiryType(qInquiry) : prev.inquiryType;
      const nextBrand = qBrand ? resolveBrandInterest(qBrand) : prev.brandOfInterest;
      const nextMessage =
        qCollection && !prev.message
          ? `Inquiry regarding ${qCollection}. Please share product specifications, pricing and lead time details.`
          : prev.message;
      return {
        ...prev,
        inquiryType: nextInquiry,
        brandOfInterest: nextBrand,
        message: nextMessage,
      };
    });

    if (qInquiry || qBrand || qCollection || router.asPath.includes("#smart-contact-form")) {
      const timer = setTimeout(() => {
        const el = document.getElementById("smart-contact-form");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [router.isReady, router.query, router.asPath]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, attachmentName: file.name }));
  };

  const clearFieldError = (field: keyof FormFieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormFieldErrors = {};
    if (!form.fullName.trim()) errors.fullName = "Please enter your full name.";
    if (!form.businessEmail.trim()) {
      errors.businessEmail = "Please enter your business email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail.trim())) {
      errors.businessEmail = "Please enter a valid email address.";
    }
    if (!form.companyName.trim()) errors.companyName = "Please enter your company name.";
    if (!form.countryMarket.trim()) errors.countryMarket = "Please select your target market.";
    if (!form.message.trim()) errors.message = "Please describe your inquiry or project needs.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.businessEmail,
          company: form.companyName,
          phone: form.phoneWhatsapp,
          country: form.countryMarket,
          inquiryType: form.inquiryType,
          brandOfInterest: form.brandOfInterest,
          attachmentName: form.attachmentName,
          message: `[${form.inquiryType} | ${form.brandOfInterest} | Market: ${
            form.countryMarket
          }${form.attachmentName ? ` | Attached: ${form.attachmentName}` : ""}]\n\n${
            form.message
          }`,
        }),
      }).catch(() => null);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedBrandOption =
    BRAND_DROPDOWN_OPTIONS.find((opt) => opt.value === form.brandOfInterest) ||
    BRAND_DROPDOWN_OPTIONS[1];

  return (
    <>
      <SEO
        title="Contact DHT Furniture Vietnam | Request Catalogue, Quotation or OEM Programme"
        description="Contact DHT Furniture Vietnam. Tell us about your furniture requirements and target market. Our team will support you with product selection, sampling, quotations and OEM development."
        canonical="https://dhtcompany.com/contact"
        image="/img/pdf-guide/contact/hero-factory-mekong.jpg?v=3"
      />
      <Schema
        id="schema-breadcrumbs-contact"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://dhtcompany.com" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Contact",
              item: "https://dhtcompany.com/contact",
            },
          ],
        }}
      />

      <main className="bg-[#F9F5F1] text-[#1A1A1A] pt-16 lg:pt-[72px]">
        {/* ── SECTION 02: HERO VIDEO BANNER (Clip DHT 2 — Page 3 & 52: Autoplay, Muted, Loop, No Controls) ── */}
        <section className="relative min-h-[290px] lg:min-h-[345px] flex items-center bg-[#06291B] text-white overflow-hidden">
          {/* Right 64% Factory Video: Clip DHT 2 */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[64%] pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/img/pdf-guide/contact/hero-factory-mekong.jpg?v=3"
              className="w-full h-full object-cover object-center opacity-45 lg:opacity-95"
            >
              <source src="/video/dht-fac-2.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #06291B 0%, rgba(6, 41, 27, 0.94) 18%, rgba(6, 41, 27, 0.50) 42%, rgba(6, 41, 27, 0.08) 72%, rgba(6, 41, 27, 0) 100%)",
              }}
            />
          </div>

          <div className="max-w-[1220px] mx-auto w-full px-6 sm:px-8 lg:px-10 py-11 lg:py-14 relative z-10">
            <div className="max-w-[600px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 mb-2.5"
              >
                <span className="h-[1.5px] w-8 bg-[#D4AF5A]" />
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF5A]">
                  CONTACT US
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-display font-bold text-white leading-[1.12] tracking-[-0.01em] mb-3.5 text-[32px] sm:text-[40px] lg:text-[48px]"
              >
                Contact
                <br />
                DHT Furniture Vietnam
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
                className="font-body text-[14px] sm:text-[15.5px] text-white/88 leading-[1.58] max-w-[520px]"
              >
                Tell us about your furniture requirements and target market. Our team will support
                you with product selection, sampling, quotations and OEM development.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── SECTION 03: SMART CONTACT — EXACT 60% FORM | 1px DIVIDER | 40% DIRECT CONTACT & 4 BRANDS ── */}
        <section id="smart-contact-form" className="py-10 lg:py-[48px] scroll-mt-20">
          <div className="max-w-[1220px] mx-auto px-6 sm:px-8 lg:px-10">
            <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-0">
              {/* LEFT COLUMN (60%): SMART CONTACT FORM */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="lg:w-[60%] lg:pr-9 shrink-0"
              >
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="h-[2px] w-7 bg-[#C89444]" />
                    <h2 className="font-display font-bold text-[26px] sm:text-[30px] text-[#0B251A] leading-tight">
                      Send Us Your Request
                    </h2>
                  </div>
                  <p className="font-body text-[13px] sm:text-[13.5px] text-[#454E49] pl-10">
                    Complete the form and our team will get back to you shortly with the relevant
                    information.
                  </p>
                </div>

                <div className="bg-white rounded-[14px] border border-[#E8E2D8] p-6 sm:p-7 shadow-[0_6px_24px_-6px_rgba(14,36,27,0.06)]">
                  {submitted ? (
                    <div className="py-10 px-4 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#173C2C]/10 text-[#173C2C] flex items-center justify-center mx-auto">
                        <CheckCircle2 size={30} />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-[#0B251A]">
                        Request Received
                      </h3>
                      <p className="font-body text-sm sm:text-base text-[#454E49] max-w-lg mx-auto leading-relaxed">
                        Thank you for contacting DHT Furniture Vietnam. Your inquiry has been
                        received. Our team will review your requirements and get back to you.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-4 inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#0B251A] text-white font-body text-xs font-bold uppercase tracking-wider hover:bg-[#173C2C] transition-colors cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* Row 1: INQUIRY TYPE * | BRAND OF INTEREST * (with authentic Brand Mini Logo!) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#1A2420] mb-1.5">
                            INQUIRY TYPE <span className="text-[#C57B35]">*</span>
                          </label>
                          <div className="relative">
                            <select
                              required
                              value={form.inquiryType}
                              onChange={(e) =>
                                setForm((prev) => ({
                                  ...prev,
                                  inquiryType: e.target.value as InquiryTypeValue,
                                }))
                              }
                              className="w-full h-[42px] pl-3.5 pr-9 rounded-[8px] bg-[#FCFBFA] border border-[#DDD7CE] font-body text-[13.5px] font-semibold text-[#111D18] appearance-none focus:outline-none focus:border-[#C57B35] focus:ring-2 focus:ring-[#C57B35]/15 transition-colors cursor-pointer"
                            >
                              {INQUIRY_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#454E49] pointer-events-none"
                            />
                          </div>
                        </div>

                        <div ref={brandDropdownRef} className="relative">
                          <label className="block font-body text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#1A2420] mb-1.5">
                            BRAND OF INTEREST <span className="text-[#C57B35]">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setBrandMenuOpen((prev) => !prev)}
                            aria-haspopup="listbox"
                            aria-expanded={brandMenuOpen}
                            className={`w-full h-[42px] px-3.5 rounded-[8px] bg-[#FCFBFA] border text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                              brandMenuOpen
                                ? "border-[#C57B35] ring-2 ring-[#C57B35]/15"
                                : "border-[#DDD7CE] hover:border-[#C8BFA9]"
                            }`}
                          >
                            <span className="flex items-center gap-2 min-w-0 font-body text-[13.5px] text-[#111D18] truncate">
                              <BrandMiniMark brandId={selectedBrandOption.brandId} />
                              <span className="font-bold truncate">
                                {selectedBrandOption.shortTitle}
                              </span>
                              <span className="font-medium text-[#2E3834] truncate">
                                {selectedBrandOption.suffix}
                              </span>
                            </span>
                            <ChevronDown
                              size={16}
                              className={`text-[#454E49] shrink-0 transition-transform duration-200 ${
                                brandMenuOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {brandMenuOpen && (
                            <ul
                              role="listbox"
                              className="absolute z-30 left-0 right-0 mt-1.5 rounded-[10px] bg-white border border-[#E3DDD3] shadow-[0_12px_28px_-6px_rgba(14,36,27,0.16)] py-1.5 overflow-hidden"
                            >
                              {BRAND_DROPDOWN_OPTIONS.map((opt) => {
                                const isSelected = opt.value === form.brandOfInterest;
                                return (
                                  <li key={opt.value}>
                                    <button
                                      type="button"
                                      role="option"
                                      aria-selected={isSelected}
                                      onClick={() => {
                                        setForm((prev) => ({
                                          ...prev,
                                          brandOfInterest: opt.value,
                                        }));
                                        setBrandMenuOpen(false);
                                      }}
                                      className={`w-full px-3.5 py-2.5 text-left flex items-center gap-2.5 font-body text-[13px] transition-colors cursor-pointer ${
                                        isSelected
                                          ? "bg-[#F7F1E7] text-[#0B251A]"
                                          : "text-[#1A2420] hover:bg-[#FAF7F2]"
                                      }`}
                                    >
                                      <BrandMiniMark brandId={opt.brandId} />
                                      <span className="font-bold">{opt.shortTitle}</span>
                                      <span className="text-[#454E49]">{opt.suffix}</span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>

                      {/* Row 2: FULL NAME * | BUSINESS EMAIL * */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#1A2420] mb-1.5">
                            FULL NAME <span className="text-[#C57B35]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={form.fullName}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, fullName: e.target.value }));
                              clearFieldError("fullName");
                            }}
                            className={`w-full h-[42px] px-3.5 rounded-[8px] bg-[#FCFBFA] border font-body text-[13.5px] text-[#111D18] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C57B35] focus:ring-2 focus:ring-[#C57B35]/15 transition-colors ${
                              fieldErrors.fullName ? "border-red-400" : "border-[#DDD7CE]"
                            }`}
                          />
                          {fieldErrors.fullName && (
                            <p className="mt-1 font-body text-[11.5px] text-red-600">
                              {fieldErrors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block font-body text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#1A2420] mb-1.5">
                            BUSINESS EMAIL <span className="text-[#C57B35]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={form.businessEmail}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, businessEmail: e.target.value }));
                              clearFieldError("businessEmail");
                            }}
                            className={`w-full h-[42px] px-3.5 rounded-[8px] bg-[#FCFBFA] border font-body text-[13.5px] text-[#111D18] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C57B35] focus:ring-2 focus:ring-[#C57B35]/15 transition-colors ${
                              fieldErrors.businessEmail ? "border-red-400" : "border-[#DDD7CE]"
                            }`}
                          />
                          {fieldErrors.businessEmail && (
                            <p className="mt-1 font-body text-[11.5px] text-red-600">
                              {fieldErrors.businessEmail}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 3: COMPANY NAME * | PHONE / WHATSAPP */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#1A2420] mb-1.5">
                            COMPANY NAME <span className="text-[#C57B35]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your company name"
                            value={form.companyName}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, companyName: e.target.value }));
                              clearFieldError("companyName");
                            }}
                            className={`w-full h-[42px] px-3.5 rounded-[8px] bg-[#FCFBFA] border font-body text-[13.5px] text-[#111D18] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C57B35] focus:ring-2 focus:ring-[#C57B35]/15 transition-colors ${
                              fieldErrors.companyName ? "border-red-400" : "border-[#DDD7CE]"
                            }`}
                          />
                          {fieldErrors.companyName && (
                            <p className="mt-1 font-body text-[11.5px] text-red-600">
                              {fieldErrors.companyName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block font-body text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#1A2420] mb-1.5">
                            PHONE / WHATSAPP
                          </label>
                          <input
                            type="tel"
                            placeholder="Your phone number"
                            value={form.phoneWhatsapp}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, phoneWhatsapp: e.target.value }))
                            }
                            className="w-full h-[42px] px-3.5 rounded-[8px] bg-[#FCFBFA] border border-[#DDD7CE] font-body text-[13.5px] text-[#111D18] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C57B35] focus:ring-2 focus:ring-[#C57B35]/15 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Row 4 (Full Width — Strictly No Estimated Order Volume per Pages 3 & 54–56): COUNTRY / TARGET MARKET * */}
                      <div>
                        <label className="block font-body text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#1A2420] mb-1.5">
                          COUNTRY / TARGET MARKET <span className="text-[#C57B35]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={form.countryMarket}
                            onChange={(e) => {
                              setForm((prev) => ({ ...prev, countryMarket: e.target.value }));
                              clearFieldError("countryMarket");
                            }}
                            className={`w-full h-[42px] pl-3.5 pr-9 rounded-[8px] bg-[#FCFBFA] border font-body text-[13.5px] appearance-none focus:outline-none focus:border-[#C57B35] focus:ring-2 focus:ring-[#C57B35]/15 transition-colors cursor-pointer ${
                              form.countryMarket ? "text-[#111D18]" : "text-[#6B7280]"
                            } ${fieldErrors.countryMarket ? "border-red-400" : "border-[#DDD7CE]"}`}
                          >
                            <option value="">Select your market</option>
                            {MARKET_COUNTRIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#454E49] pointer-events-none"
                          />
                        </div>
                        {fieldErrors.countryMarket && (
                          <p className="mt-1 font-body text-[11.5px] text-red-600">
                            {fieldErrors.countryMarket}
                          </p>
                        )}
                      </div>

                      {/* Row 5: MESSAGE * */}
                      <div>
                        <label className="block font-body text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#1A2420] mb-1.5">
                          MESSAGE <span className="text-[#C57B35]">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us more about your needs (e.g. product type, project details, target pricing, timeline, etc.)."
                          value={form.message}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, message: e.target.value }));
                            clearFieldError("message");
                          }}
                          className={`w-full p-3.5 rounded-[8px] bg-[#FCFBFA] border font-body text-[13.5px] text-[#111D18] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C57B35] focus:ring-2 focus:ring-[#C57B35]/15 transition-colors resize-y ${
                            fieldErrors.message ? "border-red-400" : "border-[#DDD7CE]"
                          }`}
                        />
                        {fieldErrors.message && (
                          <p className="mt-1 font-body text-[11.5px] text-red-600">
                            {fieldErrors.message}
                          </p>
                        )}
                      </div>

                      {/* Row 6: Submit Request + Attach File (Optional) */}
                      <div className="pt-1 flex flex-wrap items-center gap-3.5">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex items-center justify-center gap-2 px-8 h-[44px] rounded-[8px] bg-[#C4761A] hover:bg-[#AD6512] text-white font-body text-[13.5px] font-bold transition-all shadow-[0_4px_12px_-3px_rgba(196,118,26,0.45)] cursor-pointer disabled:opacity-60"
                        >
                          {submitting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Send size={15} />
                          )}
                          <span>{submitting ? "Submitting..." : "Submit Request"}</span>
                        </button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.dwg,.dxf,.zip"
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center justify-center gap-2 px-6 h-[44px] rounded-[8px] bg-white hover:bg-[#F7F3EC] text-[#0F2C1E] border border-[#193B2C]/65 font-body text-[13.5px] font-semibold transition-colors cursor-pointer"
                        >
                          <Paperclip size={15} />
                          <span className="max-w-[200px] truncate">
                            {form.attachmentName ? form.attachmentName : "Attach File (Optional)"}
                          </span>
                        </button>

                        {form.attachmentName && (
                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({ ...prev, attachmentName: "" }))
                            }
                            aria-label="Remove attachment"
                            className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <X size={15} />
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Thin Vertical Divider separating 60% Form and 40% Right Column (x=60.4% in Hình 46) */}
              <div className="hidden lg:block w-px bg-[#DFD8CD] self-stretch shrink-0" />

              {/* RIGHT COLUMN (40%): DIRECT CONTACT + OUR FOUR BRANDS */}
              <div className="flex-1 lg:pl-9 space-y-7">
                {/* Block 1: Direct Contact (No physical address per Pages 50 & 59) */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-[2px] w-7 bg-[#C89444]" />
                    <h2 className="font-display font-bold text-[24px] lg:text-[26px] text-[#0B251A] leading-tight">
                      Direct Contact
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#F5EDE1] border border-[#E7D8C1] flex items-center justify-center shrink-0">
                        <Mail size={19} strokeWidth={1.7} className="text-[#C5781E]" />
                      </div>
                      <div>
                        <p className="font-body text-[13px] font-bold text-[#1A2420]">Email</p>
                        <a
                          href="mailto:sales@dhtcompany.com"
                          className="font-body text-[14.5px] text-[#28332E] hover:text-[#C5781E] transition-colors"
                        >
                          sales@dhtcompany.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#F5EDE1] border border-[#E7D8C1] flex items-center justify-center shrink-0">
                        <MessageCircle size={19} strokeWidth={1.7} className="text-[#C5781E]" />
                      </div>
                      <div>
                        <p className="font-body text-[13px] font-bold text-[#1A2420]">
                          Phone / WhatsApp
                        </p>
                        <a
                          href="tel:+84932058545"
                          className="font-body text-[14.5px] font-medium text-[#28332E] hover:text-[#C5781E] transition-colors"
                        >
                          +84 932 058 545
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-[#E3DCD2]" />

                {/* Block 2: Our Four Brands (2x2 White Elevated Cards with Harmonized Official Logos) */}
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="h-[2px] w-7 bg-[#C89444]" />
                    <h2 className="font-display font-bold text-[24px] lg:text-[26px] text-[#0B251A] leading-tight">
                      Our Four Brands
                    </h2>
                  </div>
                  <p className="font-body text-[13px] text-[#454E49] pl-10 mb-5 leading-relaxed">
                    A complete furniture offering from our family-owned manufacturing group.
                  </p>

                  <div className="grid grid-cols-2 gap-3.5">
                    {FOUR_BRAND_CARDS.map((b) => (
                      <Link
                        key={b.id}
                        href={`/catalogue?brand=${encodeURIComponent(b.id)}`}
                        className="group rounded-[12px] bg-white border border-[#EAE4DA] hover:border-[#C89444] hover:-translate-y-[2px] px-3 py-4 flex flex-col items-center justify-center text-center shadow-[0_3px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_18px_-6px_rgba(14,36,27,0.10)] transition-all duration-200 min-h-[108px]"
                      >
                        <div
                          className={`h-[42px] flex items-center justify-center mb-1.5 ${b.scaleClass}`}
                        >
                          <BrandLogo brand={b.id} variant="color" />
                        </div>
                        <span className="font-body text-[12px] font-medium text-[#3F4A45] group-hover:text-[#0B251A] transition-colors">
                          {b.subtitle}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
