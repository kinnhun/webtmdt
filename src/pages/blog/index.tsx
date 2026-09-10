import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { useTranslation } from "react-i18next";
import BlogContainer from "@/features/blog";

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t("blog.seo.title", "Furniture Manufacturing Insights & Architectural Design Trends | DHT Blog")}
        description={t("blog.seo.description", "Articles, guides, and expert advice on luxury furniture manufacturing, hospitality FF&E procurement, wood materials, and outdoor living trends.")}
        image="/img/categories/outdoor.jpg"
      />
      <Schema 
        id="schema-breadcrumbs-blog"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://dhtcompany.com"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog & Insights",
              item: "https://dhtcompany.com/blog"
            }
          ]
        }}
      />
      <BlogContainer />
    </>
  );
}

