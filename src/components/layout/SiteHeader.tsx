import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type SiteHeaderProps = {
  onSearchOpen?: () => void;
};

export default function SiteHeader({ onSearchOpen }: SiteHeaderProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const tr = (key: string, defaultVal?: string) => t(key, { defaultValue: defaultVal, lng: router.locale });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
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
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group py-1">
              <Image
                src="/img/logo.png"
                alt="DHT Furniture"
                width={48}
                height={48}
                className="h-9 sm:h-11 w-auto object-contain transition-all duration-200 group-hover:scale-105"
                priority
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-display font-bold text-lg sm:text-xl tracking-[0.14em] text-[#D4A853] uppercase">
                  DHT
                </span>
                <span className="font-body font-semibold text-[10px] sm:text-[11px] tracking-[0.26em] text-white/90 uppercase mt-0.5">
                  FURNITURE
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-7">
              {/* 1. Home */}
              <Link
                href="/"
                className={`relative font-body text-sm tracking-wide group transition-colors ${
                  router.pathname === "/" ? "font-semibold" : "font-medium hover:text-white"
                }`}
                style={{ color: router.pathname === "/" ? "#F5CA7B" : "rgba(255,255,255,0.92)" }}
              >
                {tr("nav.home", "Home")}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] transition-all duration-300"
                  style={{
                    width: router.pathname === "/" ? "100%" : "0",
                    backgroundColor: "#F5CA7B",
                  }}
                />
              </Link>

              {/* 2. Manufacturing */}
              <Link
                href="/manufacturing"
                className={`relative font-body text-sm tracking-wide group transition-colors ${
                  router.pathname === "/manufacturing" ? "font-semibold" : "font-medium hover:text-white"
                }`}
                style={{ color: router.pathname === "/manufacturing" ? "#F5CA7B" : "rgba(255,255,255,0.92)" }}
              >
                {tr("nav.manufacturing", "Manufacturing")}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] transition-all duration-300"
                  style={{
                    width: router.pathname === "/manufacturing" ? "100%" : "0",
                    backgroundColor: "#F5CA7B",
                  }}
                />
              </Link>

              {/* 3. Collections */}
              <Link
                href="/catalogue"
                className={`relative font-body text-sm tracking-wide group transition-colors ${
                  isCollectionsActive ? "font-semibold" : "font-medium hover:text-white"
                }`}
                style={{ color: isCollectionsActive ? "#F5CA7B" : "rgba(255,255,255,0.92)" }}
              >
                {tr("nav.collections", "Collections")}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] transition-all duration-300"
                  style={{
                    width: isCollectionsActive ? "100%" : "0",
                    backgroundColor: "#F5CA7B",
                  }}
                />
              </Link>

              {/* 4. Contact */}
              <Link
                href="/contact"
                className={`relative font-body text-sm tracking-wide group transition-colors ${
                  router.pathname === "/contact" ? "font-semibold" : "font-medium hover:text-white"
                }`}
                style={{ color: router.pathname === "/contact" ? "#F5CA7B" : "rgba(255,255,255,0.92)" }}
              >
                {tr("nav.contact", "Contact")}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] transition-all duration-300"
                  style={{
                    width: router.pathname === "/contact" ? "100%" : "0",
                    backgroundColor: "#F5CA7B",
                  }}
                />
              </Link>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={onSearchOpen}
                className="w-8 h-8 flex items-center justify-center rounded-sm text-white/85 hover:text-white hover:bg-white/10 transition-all"
                aria-label={tr("nav.search", "Search")}
              >
                <Search size={17} />
              </button>

              <LanguageSwitcher />



              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-sm font-body font-semibold text-white text-sm transition-all hover:brightness-110 shadow-sm"
                style={{ backgroundColor: "#A45E2F" }}
              >
                {tr("nav.requestQuote", "Request a Quote")}
              </Link>

              <button
                type="button"
                className="lg:hidden w-8 h-8 flex items-center justify-center text-white/90 hover:text-white transition-colors"
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
                className={`font-body text-base font-medium py-2 border-b border-white/10 transition-colors ${
                  router.pathname === "/" ? "text-[#F5CA7B] font-semibold" : "text-white/90 hover:text-white"
                }`}
              >
                {tr("nav.home", "Home")}
              </Link>
              <Link
                href="/manufacturing"
                className={`font-body text-base font-medium py-2 border-b border-white/10 transition-colors ${
                  router.pathname === "/manufacturing" ? "text-[#F5CA7B] font-semibold" : "text-white/90 hover:text-white"
                }`}
              >
                {tr("nav.manufacturing", "Manufacturing")}
              </Link>
              <Link
                href="/catalogue"
                className={`font-body text-base font-medium py-2 border-b border-white/10 transition-colors ${
                  isCollectionsActive ? "text-[#F5CA7B] font-semibold" : "text-white/90 hover:text-white"
                }`}
              >
                {tr("nav.collections", "Collections")}
              </Link>
              <Link
                href="/contact"
                className={`font-body text-base font-medium py-2 border-b border-white/10 transition-colors ${
                  router.pathname === "/contact" ? "text-[#F5CA7B] font-semibold" : "text-white/90 hover:text-white"
                }`}
              >
                {tr("nav.contact", "Contact")}
              </Link>

              <div className="pt-4 flex flex-col gap-3">


                <Link
                  href="/contact"
                  className="text-center py-3.5 rounded-sm font-body font-semibold text-white text-base shadow-sm hover:brightness-110 transition-all"
                  style={{ backgroundColor: "#A45E2F" }}
                >
                  {tr("nav.requestQuote", "Request a Quote")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
