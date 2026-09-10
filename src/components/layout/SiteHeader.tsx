import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Phone, ChevronDown, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface SiteHeaderProps {
  onSearchOpen?: () => void;
}

export default function SiteHeader({ onSearchOpen }: SiteHeaderProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsDropdown, setCollectionsDropdown] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const { data: dbData } = useQuery({
    queryKey: ['headerContactContent'],
    queryFn: async () => {
      const res = await fetch('/api/contact-content');
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setCollectionsDropdown(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCollectionsDropdown(false);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCollectionsDropdown(false);
  }, [router.pathname]);

  const isHome = router.pathname === "/";
  const shouldShowSolidBg = !isHome || scrolled;
  const isCollectionsActive = router.pathname.startsWith("/catalogue");

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          backgroundColor: shouldShowSolidBg ? "hsl(var(--navy-deep)/0.97)" : "transparent",
          boxShadow: shouldShowSolidBg ? "0 1px 0 hsl(var(--navy-light)/0.3)" : "none",
          padding: scrolled ? "0" : "0",
          backdropFilter: "none",
        }}
      >
        <div className="container mx-auto px-6">
          <div
            className="flex items-center justify-between transition-all duration-300 py-1"
            style={{ minHeight: scrolled ? "64px" : "80px" }}
          >
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <Image
                src="/img/logo-no-text.png"
                alt="DHT Logo"
                width={40}
                height={40}
                className="transition-all group-hover:scale-105 rounded-sm"
                style={{ width: "auto", height: "auto" }}
                priority
              />
              <div>
                <span
                  className="font-display font-bold text-lg tracking-wide leading-none block"
                  style={{
                    background: "linear-gradient(180deg, #f5d76e 0%, #e8a838 50%, #d4862a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  DHT
                </span>
                <span
                  className="font-body text-[8.5px] md:text-[9.5px] tracking-[0.1em] uppercase leading-[1.2] mt-1 block max-w-[160px] md:max-w-[200px] text-wrap"
                  style={{
                    background: "linear-gradient(180deg, #e8a838 0%, #d4862a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t("nav.furnitureVietnam", "Furniture Vietnam")}
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-7">
              {/* 1. Home */}
              <Link
                href="/"
                className="relative font-body text-sm font-medium tracking-wide group"
                style={{ color: router.pathname === "/" ? "hsl(var(--orange))" : "rgba(255,255,255,0.85)" }}
              >
                {t("nav.home", "Home")}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    width: router.pathname === "/" ? "100%" : "0",
                    backgroundColor: "hsl(var(--orange))",
                  }}
                />
              </Link>

              {/* 2. About */}
              <Link
                href="/about"
                className="relative font-body text-sm font-medium tracking-wide group"
                style={{ color: router.pathname === "/about" ? "hsl(var(--orange))" : "rgba(255,255,255,0.85)" }}
              >
                {t("nav.about", "About DHT")}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    width: router.pathname === "/about" ? "100%" : "0",
                    backgroundColor: "hsl(var(--orange))",
                  }}
                />
              </Link>

              {/* 3. Manufacturing */}
              <Link
                href="/manufacturing"
                className="relative font-body text-sm font-medium tracking-wide group"
                style={{ color: router.pathname === "/manufacturing" ? "hsl(var(--orange))" : "rgba(255,255,255,0.85)" }}
              >
                {t("nav.manufacturing", "Manufacturing")}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    width: router.pathname === "/manufacturing" ? "100%" : "0",
                    backgroundColor: "hsl(var(--orange))",
                  }}
                />
              </Link>

              {/* 4. Collections Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => setCollectionsDropdown(!collectionsDropdown)}
                  className="flex items-center gap-1 font-body text-sm font-medium tracking-wide transition-colors py-2"
                  style={{ color: isCollectionsActive ? "hsl(var(--orange))" : "rgba(255,255,255,0.85)" }}
                >
                  {t("nav.collections", "Collections")}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${collectionsDropdown ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {collectionsDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-56 py-2 mt-1 rounded shadow-xl border border-white/10 z-50 backdrop-blur-md"
                      style={{ backgroundColor: "hsl(var(--navy-deep)/0.98)" }}
                    >
                      <Link
                        href="/catalogue/outdoor"
                        className="block px-4 py-2.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {t("nav.outdoorCollection", "Outdoor Collections")}
                      </Link>
                      <Link
                        href="/catalogue/indoor"
                        className="block px-4 py-2.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors border-t border-white/5"
                      >
                        {t("nav.indoorCollection", "Indoor & Projects")}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 5. Quality & Compliance */}
              <Link
                href="/quality-compliance"
                className="relative font-body text-sm font-medium tracking-wide group"
                style={{ color: router.pathname === "/quality-compliance" ? "hsl(var(--orange))" : "rgba(255,255,255,0.85)" }}
              >
                {t("nav.qualityCompliance", "Quality & Compliance")}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    width: router.pathname === "/quality-compliance" ? "100%" : "0",
                    backgroundColor: "hsl(var(--orange))",
                  }}
                />
              </Link>

              {/* 6. Contact */}
              <Link
                href="/contact"
                className="relative font-body text-sm font-medium tracking-wide group"
                style={{ color: router.pathname === "/contact" ? "hsl(var(--orange))" : "rgba(255,255,255,0.85)" }}
              >
                {t("nav.contact", "Contact")}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    width: router.pathname === "/contact" ? "100%" : "0",
                    backgroundColor: "hsl(var(--orange))",
                  }}
                />
              </Link>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={onSearchOpen}
                className="w-8 h-8 flex items-center justify-center rounded-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label={t("nav.search", "Search")}
              >
                <Search size={17} />
              </button>

              <LanguageSwitcher />

              <a
                href="/DHT_Company_Profile_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-white/20 font-body font-medium text-white/80 text-xs hover:text-white hover:border-white/50 transition-all"
              >
                <FileText size={13} />
                {t("nav.companyProfile", "Company Profile")}
              </a>

              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-sm font-body font-semibold text-white text-sm transition-all hover:opacity-90 shadow-sm"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              >
                {t("nav.requestQuote", "Request a Quote")}
              </Link>

              <button
                className="lg:hidden w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 right-0 z-40 shadow-2xl border-t border-white/10 max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: "hsl(var(--navy-deep)/0.98)" }}
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-3">
              <Link
                href="/"
                className="font-body text-base font-medium text-white/75 hover:text-white py-2 border-b border-white/10 transition-colors"
              >
                {t("nav.home", "Home")}
              </Link>
              <Link
                href="/about"
                className="font-body text-base font-medium text-white/75 hover:text-white py-2 border-b border-white/10 transition-colors"
              >
                {t("nav.about", "About DHT")}
              </Link>
              <Link
                href="/manufacturing"
                className="font-body text-base font-medium text-white/75 hover:text-white py-2 border-b border-white/10 transition-colors"
              >
                {t("nav.manufacturing", "Manufacturing")}
              </Link>
              <div className="py-2 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider text-[#B97846] font-semibold block mb-2">
                  {t("nav.collections", "Collections")}
                </span>
                <div className="flex flex-col gap-2 pl-3">
                  <Link
                    href="/catalogue/outdoor"
                    className="font-body text-sm font-medium text-white/70 hover:text-white py-1 transition-colors"
                  >
                    • {t("nav.outdoorCollection", "Outdoor Collections")}
                  </Link>
                  <Link
                    href="/catalogue/indoor"
                    className="font-body text-sm font-medium text-white/70 hover:text-white py-1 transition-colors"
                  >
                    • {t("nav.indoorCollection", "Indoor & Projects")}
                  </Link>
                </div>
              </div>
              <Link
                href="/quality-compliance"
                className="font-body text-base font-medium text-white/75 hover:text-white py-2 border-b border-white/10 transition-colors"
              >
                {t("nav.qualityCompliance", "Quality & Compliance")}
              </Link>
              <Link
                href="/contact"
                className="font-body text-base font-medium text-white/75 hover:text-white py-2 border-b border-white/10 transition-colors"
              >
                {t("nav.contact", "Contact")}
              </Link>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="/DHT_Company_Profile_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-3 rounded-sm border border-white/20 font-body font-medium text-white text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={15} />
                  {t("nav.companyProfile", "Company Profile (PDF)")}
                </a>

                <Link
                  href="/contact"
                  className="text-center py-3.5 rounded-sm font-body font-semibold text-white text-base shadow-sm"
                  style={{ backgroundColor: "hsl(var(--orange))" }}
                >
                  {t("nav.requestQuote", "Request a Quote")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
