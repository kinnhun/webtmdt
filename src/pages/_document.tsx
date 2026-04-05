import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

export default function Document(props: DocumentProps) {
  // Use the locale injected by Next.js i18n routing, fallback to en
  const currentLocale = props.locale || "en";

  return (
    <Html lang={currentLocale} data-scroll-behavior="smooth">
      <Head>
        <link rel="icon" href="/img/logo-no-text.png" type="image/png" />
        <link rel="apple-touch-icon" href="/img/logo-no-text.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
