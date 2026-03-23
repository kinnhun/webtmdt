import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Phone } from "lucide-react";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";

interface SiteHeaderProps {
  onSearchOpen?: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader({ onSearchOpen }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const isHome = router.pathname === "/";
  // Non-home pages always get a solid dark header
  const shouldShowSolidBg = !isHome || scrolled;

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
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? "64px" : "80px" }}
          >
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center transition-all group-hover:scale-105"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              >
                <span className="font-display text-white font-bold text-base leading-none">D</span>
              </div>
              <div>
                <span className="font-display text-white font-bold text-lg tracking-wide leading-none block">DHT</span>
                <span className="font-body text-white/40 text-xs tracking-[0.2em] uppercase leading-none">Outdoor Furniture</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = router.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative font-body text-sm font-medium tracking-wide group"
                    style={{ color: isActive ? "hsl(var(--orange))" : "rgba(255,255,255,0.75)" }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                      style={{
                        width: isActive ? "100%" : "0",
                        backgroundColor: "hsl(var(--orange))",
                      }}
                    />
                    <span
                      className="absolute -bottom-1 left-0 h-px transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:w-full"
                      style={{
                        width: "0",
                        backgroundColor: "rgba(255,255,255,0.4)",
                      }}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={onSearchOpen}
                className="w-8 h-8 flex items-center justify-center rounded-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Search"
              >
                <Search size={17} />
              </button>

              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 font-body text-sm text-white/60 hover:text-white transition-colors px-2 py-1"
              >
                <Phone size={14} />
                WhatsApp
              </a>

              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-sm font-body font-semibold text-white text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              >
                Get Quote
              </Link>

              <button
                className="md:hidden w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 right-0 z-40 shadow-2xl border-t border-white/10"
            style={{ backgroundColor: "hsl(var(--navy-deep)/0.98)" }}
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-base font-medium text-white/75 hover:text-white py-2 border-b border-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 text-center py-3.5 rounded-sm font-body font-semibold text-white text-base"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              >
                Get Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
