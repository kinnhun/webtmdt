import Head from "next/head";
import { useTranslation } from "react-i18next";
import HomeContainer from "@/features/home";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("home.seo.title")}</title>
        <meta name="description" content={t("home.seo.description")} />
      </Head>
      <HomeContainer />
    </>
  );
}
