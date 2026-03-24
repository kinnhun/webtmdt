import Head from "next/head";
import { useTranslation } from "react-i18next";
import BlogContainer from "@/features/blog";

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("blog.seo.title")}</title>
        <meta name="description" content={t("blog.seo.description")} />
      </Head>
      <BlogContainer />
    </>
  );
}
