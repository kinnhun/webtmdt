import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import i18n, { STORAGE_KEY, SUPPORTED_LANGS } from "@/lib/i18n";
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/600.css";
import "@fontsource/lora/700.css";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@/styles/globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { LoadingProvider, useGlobalLoading } from "@/contexts/LoadingContext";
import GlobalLoading from "@/components/ui/GlobalLoading";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SearchOverlay from "@/components/SearchOverlay";
import SEO from "@/components/SEO";

/* Hook tự động show loading khi chuyển trang */
function useRouteLoading() {
  const router = useRouter();
  const { showLoading, hideLoading } = useGlobalLoading();

  useEffect(() => {
    const onStart = () => showLoading();
    const onDone = () => hideLoading();

    router.events.on("routeChangeStart", onStart);
    router.events.on("routeChangeComplete", onDone);
    router.events.on("routeChangeError", onDone);

    return () => {
      router.events.off("routeChangeStart", onStart);
      router.events.off("routeChangeComplete", onDone);
      router.events.off("routeChangeError", onDone);
    };
  }, [router.events, showLoading, hideLoading]);
}

/* Inner shell — phải nằm bên trong LoadingProvider */
function AppShell({ Component, pageProps }: AppProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');

  // Synchronize react-i18next with Next.js i18n router
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    const normalizedSavedLanguage = SUPPORTED_LANGS.includes(savedLanguage as typeof SUPPORTED_LANGS[number])
      ? savedLanguage
      : null;
    const targetLanguage = normalizedSavedLanguage ?? router.locale ?? i18n.language;

    if (targetLanguage && i18n.language !== targetLanguage) {
      void i18n.changeLanguage(targetLanguage);
    }

    if (targetLanguage && router.locale !== targetLanguage) {
      void router.replace(
        { pathname: router.pathname, query: router.query },
        router.asPath,
        { locale: targetLanguage, shallow: true }
      );
    }
  }, [router, router.locale]);

  useRouteLoading();

  return (
    <>
      <SEO />
      {!isAdminRoute && <SiteHeader onSearchOpen={() => setSearchOpen(true)} />}
      <main>
        <Component {...pageProps} />
      </main>
      {!isAdminRoute && <SiteFooter />}
      {!isAdminRoute && <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />}
      <GlobalLoading />
    </>
  );
}

export default function App(appProps: AppProps) {
  return (
    <QueryProvider>
      <LoadingProvider>
        <AppShell {...appProps} />
      </LoadingProvider>
    </QueryProvider>
  );
}
