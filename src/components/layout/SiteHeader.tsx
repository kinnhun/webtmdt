import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { DhtHorizontalLogo } from "@/components/ui/BrandLogos";

type LanguageItem = {
  code: string;
  label: string;
  name: string;
  flag: string;
};

type NavLinkItem = {
  href: string;
  label: string;
  isActive: boolean;
};

const LANGUAGES: LanguageItem[] = [
  { code: "en-US", label: "US", name: "English (US)", flag: "https://flagcdn.com/w40/us.png" },
  { code: "en-GB", label: "UK", name: "English (UK)", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "vi-VN", label: "VN", name: "Tiếng Việt", flag: "https://flagcdn.com/w40/vn.png" },
];

export default function SiteHeader({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const { i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { pathname, asPath, query } = router;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLang = !mounted
    ? LANGUAGES[0]
    : LANGUAGES.find((l) => l.code === (router.locale || i18n.language)) ||
      LANGUAGES.find((l) => (router.locale || i18n.language)?.startsWith(l.code.split("-")[0])) ||
      LANGUAGES[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks: NavLinkItem[] = [
    { href: "/", label: "Home", isActive: pathname === "/" },
    { href: "/about", label: "About DHT", isActive: pathname === "/about" },
    { href: "/manufacturing", label: "Manufacturing", isActive: pathname === "/manufacturing" },
    { href: "/our-brands", label: "Our Brands", isActive: pathname === "/our-brands" },
    {
      href: "/catalogue",
      label: "Collections",
      isActive: pathname.startsWith("/catalogue") || pathname.startsWith("/collections"),
    },
    { href: "/contact", label: "Contact", isActive: pathname === "/contact" },
  ];

  const handleRequestQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (pathname === "/contact") {
      e.preventDefault();
      router.replace(
        { pathname: "/contact", query: { ...query, inquiry: "quotation" } },
        undefined,
        { shallow: true }
      );
      const formEl = document.getElementById("smart-contact-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0C2118]/95 backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-[#0C2118]/90 backdrop-blur-sm border-b border-white/10"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-[72px]">
          {/* Left: Official Horizontal Logo */}
          <Link href="/" className="shrink-0 group">
            <DhtHorizontalLogo iconSize={34} textClassName="text-base sm:text-lg lg:text-xl" />
          </Link>

          {/* Center: 6 Navigation Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 font-body text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                  link.isActive ? "text-[#E5B869] font-semibold" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {link.label === "Collections" && (
                  <ChevronDown size={13} className="inline-block ml-1 opacity-75" />
                )}
                {link.isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5B869] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: Search, Language, Request a Quote CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onSearchOpen?.()}
              aria-label="Search"
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Search size={18} />
            </button>

            {/* Language Selector */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-body text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <img
                  src={currentLang.flag}
                  alt={currentLang.label}
                  className="w-4 h-3 object-cover rounded-[1px]"
                />
                <span>{currentLang.label}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-white/15 bg-[#0E241B] shadow-xl overflow-hidden z-50"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        type="button"
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 font-body text-xs text-left transition-colors cursor-pointer ${
                          currentLang.code === lang.code
                            ? "bg-[#B97846]/25 text-[#E5B869] font-semibold"
                            : "text-white/85 hover:bg-white/10"
                        }`}
                      >
                        <img
                          src={lang.flag}
                          alt={lang.label}
                          className="w-4 h-3 object-cover rounded-[1px] shrink-0"
                        />
                        <div>
                          <div className="leading-tight font-medium">{lang.label}</div>
                          <div className="text-[10px] text-white/55 leading-tight">{lang.name}</div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Request a Quote CTA */}
            <Link
              href="/contact?inquiry=quotation#smart-contact-form"
              onClick={handleRequestQuoteClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 lg:px-5 py-2 rounded-full bg-gradient-to-r from-[#D89B3C] to-[#B97846] text-[#0E241B] font-body text-xs lg:text-sm font-bold tracking-wide hover:brightness-110 transition-all shadow-sm whitespace-nowrap"
            >
              <span>Request a Quote</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className="lg:hidden p-2 rounded-md text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-white/10 bg-[#0C2118]"
            >
              <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-2.5 px-3 rounded-lg font-body text-sm font-medium transition-colors ${
                      link.isActive
                        ? "bg-white/10 text-[#E5B869] font-semibold"
                        : "text-white/85 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact?inquiry=quotation#smart-contact-form"
                  onClick={handleRequestQuoteClick}
                  className="mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-gradient-to-r from-[#D89B3C] to-[#B97846] text-[#0E241B] font-body text-sm font-bold"
                >
                  <span>Request a Quote</span>
                  <ArrowRight size={15} />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
