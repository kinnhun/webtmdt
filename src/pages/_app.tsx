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
import SEO from "@/components/SEO";

export default function App({ Component, pageProps }: AppProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  // Synchronize react-i18next with Next.js i18n router
  if (router.locale && i18n.language !== router.locale) {
    i18n.changeLanguage(router.locale);
  }

  // Handle client-side persistence if user manually changes language
  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: any) => {
       // Optional: Log path changes
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <QueryProvider>
      <SEO />
      {!isAdminRoute && <SiteHeader onSearchOpen={() => setSearchOpen(true)} />}
      <main>
        <Component {...pageProps} />
      </main>
      {!isAdminRoute && <SiteFooter />}
      {!isAdminRoute && <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />}
    </QueryProvider>
  );
}
