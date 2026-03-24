import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import i18n, { STORAGE_KEY, SUPPORTED_LANGS } from "@/lib/i18n";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@/styles/globals.css";
import QueryProvider from "@/providers/QueryProvider";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SearchOverlay from "@/components/SearchOverlay";

export default function App({ Component, pageProps }: AppProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  // Restore saved language AFTER hydration to avoid SSR mismatch
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved) && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
  }, []);

  return (
    <QueryProvider>
      {!isAdminRoute && <SiteHeader onSearchOpen={() => setSearchOpen(true)} />}
      <main>
        <Component {...pageProps} />
      </main>
      {!isAdminRoute && <SiteFooter />}
      {!isAdminRoute && <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />}
    </QueryProvider>
  );
}
