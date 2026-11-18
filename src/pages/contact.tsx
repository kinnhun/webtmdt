import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Send,
  Paperclip,
  Mail,
  PhoneCall,
  Play,
  Pause,
  CheckCircle2,
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

const BRAND_INTEREST_OPTIONS: BrandInterestValue[] = [
  "DHT – Outdoor Furniture",
  "JAGER – Indoor Furniture",
  "THE ONE – Project & Office Furniture",
  "MEKONG – Wood Panels & Processing",
  "Multiple Brands / Not Sure",
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

const FOUR_BRAND_CARDS: { id: BrandId; subtitle: string }[] = [
  { id: "DHT", subtitle: "Outdoor Furniture" },
  { id: "JAGER", subtitle: "Indoor Furniture" },
  { id: "THE ONE", subtitle: "Project & Office Furniture" },
  { id: "MEKONG", subtitle: "Wood Panels & Processing" },
];

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const toggleVideoPlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, attachmentName: file.name }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (
      !form.fullName.trim() ||
      !form.businessEmail.trim() ||
      !form.companyName.trim() ||
      !form.countryMarket.trim() ||
      !form.message.trim()
    ) {
      setErrorMsg("Please complete all required fields marked with *.");
      return;
    }

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

  return (
    <>
      <SEO
        title="Contact DHT Furniture Vietnam | Request Catalogue, Quotation or OEM Programme"
        description="Contact DHT Furniture Vietnam. Tell us about your requirements and target market. Our team will help you identify the next steps for product selection, sampling or an OEM programme."
        canonical="https://dhtcompany.com/contact"
        image="/img/pdf-guide/contact/hero-factory-mekong.jpg"
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

      <main className="bg-[#F7F5F0] text-[#1A1A1A] pt-16 lg:pt-[72px]">
        {/* ── SECTION 02: HERO BANNER — VIDEO MEKONG (Hình 46 Top) ── */}
        <section className="relative min-h-[290px] lg:min-h-[330px] flex items-center bg-[#0F2C1E] text-white overflow-hidden">
          {/* Right 58% MEKONG Factory Video */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/img/pdf-guide/contact/hero-factory-mekong.jpg"
              className="w-full h-full object-cover"
            >
              <source src="/video/hero-banner.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #0F2C1E 0%, rgba(15, 44, 30, 0.85) 34%, rgba(15, 44, 30, 0.15) 100%)",
              }}
            />

            {/* Video Play/Pause Button Overlay */}
            <button
              type="button"
              onClick={toggleVideoPlay}
              aria-label={isPlaying ? "Pause factory video" : "Play factory video"}
              className="hidden lg:flex absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/45 hover:bg-black/65 border-2 border-white/85 text-white items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              {isPlaying ? (
                <Pause size={22} className="fill-white" />
              ) : (
                <Play size={22} className="fill-white ml-0.5" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-14 relative z-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="h-[2px] w-7 bg-[#C59B27]" />
                <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27]">
                  CONTACT US
                </span>
              </div>

              <h1
                className="font-display font-bold text-white leading-[1.12] mb-3.5"
                style={{ fontSize: "clamp(1.95rem, 3.6vw, 3rem)" }}
              >
                Contact
                <br />
                DHT Furniture Vietnam
              </h1>

              <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed">
                Tell us about your requirements and target market. Our team will help you identify
                the next steps for product selection, sampling or an OEM programme.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 03: MAIN CONTENT — 2 COLUMNS (60% Smart Form + 40% Direct Contact & 4 Brands) ── */}
        <section id="smart-contact-form" className="py-12 lg:py-16 scroll-mt-20">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* LEFT COLUMN (60% -> 7 cols): SMART CONTACT FORM */}
              <div className="lg:col-span-7">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="h-[2px] w-7 bg-[#C59B27]" />
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F2C1E]">
                      Send Us Your Request
                    </h2>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#4A4A4A] pl-10">
                    Complete the form and our team will get back to you shortly with the relevant
                    information.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-[#EAE6DF] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  {submitted ? (
                    <div className="py-10 px-4 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-[#173C2C]/10 text-[#173C2C] flex items-center justify-center mx-auto">
                        <CheckCircle2 size={30} />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-[#0F2C1E]">
                        Request Received
                      </h3>
                      <p className="font-body text-sm sm:text-base text-[#4A4A4A] max-w-lg mx-auto leading-relaxed">
                        Thank you for contacting DHT Furniture Vietnam. Your inquiry has been
                        received. Our team will review your requirements and get back to you.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-4 inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#0F2C1E] text-white font-body text-xs font-bold uppercase tracking-wider hover:bg-[#173C2C] transition-colors cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {errorMsg && (
                        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 font-body text-xs font-medium">
                          {errorMsg}
                        </div>
                      )}

                      {/* Row 1: INQUIRY TYPE * | BRAND OF INTEREST * */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                            INQUIRY TYPE <span className="text-[#C57B35]">*</span>
                          </label>
                          <select
                            required
                            value={form.inquiryType}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                inquiryType: e.target.value as InquiryTypeValue,
                              }))
                            }
                            className="w-full h-11 px-3.5 rounded-lg bg-[#FAFAFA] border border-[#DEDEDE] font-body text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#1B3B2B] transition-colors"
                          >
                            {INQUIRY_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                            BRAND OF INTEREST <span className="text-[#C57B35]">*</span>
                          </label>
                          <select
                            required
                            value={form.brandOfInterest}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                brandOfInterest: e.target.value as BrandInterestValue,
                              }))
                            }
                            className="w-full h-11 px-3.5 rounded-lg bg-[#FAFAFA] border border-[#DEDEDE] font-body text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#1B3B2B] transition-colors"
                          >
                            {BRAND_INTEREST_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 2: FULL NAME * | BUSINESS EMAIL * */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                            FULL NAME <span className="text-[#C57B35]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={form.fullName}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, fullName: e.target.value }))
                            }
                            className="w-full h-11 px-3.5 rounded-lg bg-[#FAFAFA] border border-[#DEDEDE] font-body text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B3B2B] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                            BUSINESS EMAIL <span className="text-[#C57B35]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={form.businessEmail}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, businessEmail: e.target.value }))
                            }
                            className="w-full h-11 px-3.5 rounded-lg bg-[#FAFAFA] border border-[#DEDEDE] font-body text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B3B2B] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Row 3: COMPANY NAME * | PHONE / WHATSAPP */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                            COMPANY NAME <span className="text-[#C57B35]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your company name"
                            value={form.companyName}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, companyName: e.target.value }))
                            }
                            className="w-full h-11 px-3.5 rounded-lg bg-[#FAFAFA] border border-[#DEDEDE] font-body text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B3B2B] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                            PHONE / WHATSAPP
                          </label>
                          <input
                            type="tel"
                            placeholder="Your phone number"
                            value={form.phoneWhatsapp}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, phoneWhatsapp: e.target.value }))
                            }
                            className="w-full h-11 px-3.5 rounded-lg bg-[#FAFAFA] border border-[#DEDEDE] font-body text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B3B2B] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Row 4 (Full Width — No Estimated Order Volume per Page 56): COUNTRY / TARGET MARKET * */}
                      <div>
                        <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                          COUNTRY / TARGET MARKET <span className="text-[#C57B35]">*</span>
                        </label>
                        <select
                          required
                          value={form.countryMarket}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, countryMarket: e.target.value }))
                          }
                          className="w-full h-11 px-3.5 rounded-lg bg-[#FAFAFA] border border-[#DEDEDE] font-body text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1B3B2B] transition-colors"
                        >
                          <option value="">Select your market</option>
                          {MARKET_COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Row 5: MESSAGE * */}
                      <div>
                        <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                          MESSAGE <span className="text-[#C57B35]">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us more about your needs (e.g. product type, project details, target pricing, timeline, etc.)."
                          value={form.message}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, message: e.target.value }))
                          }
                          className="w-full p-3.5 rounded-lg bg-[#FAFAFA] border border-[#DEDEDE] font-body text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1B3B2B] transition-colors resize-y"
                        />
                      </div>

                      {/* Row 6: Submit Request + Attach File (Optional) */}
                      <div className="pt-1 flex flex-wrap items-center gap-3.5">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex items-center justify-center gap-2 px-7 h-11 rounded-lg bg-[#C57B35] hover:bg-[#B26A28] text-white font-body text-sm font-bold transition-colors shadow-xs cursor-pointer disabled:opacity-60"
                        >
                          <Send size={15} />
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
                          className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-lg bg-white hover:bg-[#F4F1EA] text-[#1B3B2B] border border-[#1B3B2B]/60 font-body text-sm font-bold transition-colors cursor-pointer"
                        >
                          <Paperclip size={15} />
                          <span>
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
              </div>

              {/* RIGHT COLUMN (40% -> 5 cols): DIRECT CONTACT + OUR FOUR BRANDS */}
              <div className="lg:col-span-5 lg:pl-6 lg:border-l lg:border-[#E5E0D8] space-y-8">
                {/* Block 1: Direct Contact (No physical addresses per Page 50 & 59) */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-[2px] w-7 bg-[#C59B27]" />
                    <h2 className="font-display font-bold text-2xl text-[#0F2C1E]">
                      Direct Contact
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#F2E9D8] border border-[#E2D2B5] flex items-center justify-center shrink-0">
                        <Mail size={19} className="text-[#C57B35]" />
                      </div>
                      <div>
                        <p className="font-body text-xs font-bold text-[#1A1A1A]">Email</p>
                        <a
                          href="mailto:sales@dhtcompany.com"
                          className="font-body text-sm sm:text-base text-[#1A1A1A] hover:text-[#C57B35] transition-colors"
                        >
                          sales@dhtcompany.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#F2E9D8] border border-[#E2D2B5] flex items-center justify-center shrink-0">
                        <PhoneCall size={19} className="text-[#C57B35]" />
                      </div>
                      <div>
                        <p className="font-body text-xs font-bold text-[#1A1A1A]">
                          Phone / WhatsApp
                        </p>
                        <a
                          href="tel:+84932058545"
                          className="font-body text-sm sm:text-base font-medium text-[#1A1A1A] hover:text-[#C57B35] transition-colors"
                        >
                          +84 932 058 545
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-[#E5E0D8]" />

                {/* Block 2: Our Four Brands (2x2 Grid of Official Logo Cards) */}
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="h-[2px] w-7 bg-[#C59B27]" />
                    <h2 className="font-display font-bold text-2xl text-[#0F2C1E]">
                      Our Four Brands
                    </h2>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#4A4A4A] pl-10 mb-5 leading-relaxed">
                    A complete furniture offering from our family-owned manufacturing group.
                  </p>

                  <div className="grid grid-cols-2 gap-3.5">
                    {FOUR_BRAND_CARDS.map((b) => (
                      <Link
                        key={b.id}
                        href={`/catalogue?brand=${encodeURIComponent(b.id)}`}
                        className="group rounded-xl bg-white border border-[#EAE6DF] hover:border-[#C57B35] p-4 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md transition-all min-h-[104px]"
                      >
                        <div className="mb-2">
                          <BrandLogo brand={b.id} variant="color" />
                        </div>
                        <span className="font-body text-xs font-medium text-[#4A4A4A] group-hover:text-[#0F2C1E] transition-colors">
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
