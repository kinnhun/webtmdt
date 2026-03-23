import { useState } from "react";
import type { AppProps } from "next/app";
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

  return (
    <QueryProvider>
      <SiteHeader onSearchOpen={() => setSearchOpen(true)} />
      <main>
        <Component {...pageProps} />
      </main>
      <SiteFooter />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </QueryProvider>
  );
}
