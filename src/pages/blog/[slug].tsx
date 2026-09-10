import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import BlogDetailContainer from "@/features/blog/BlogDetailContainer";
import { postsData } from "@/data/posts";
import type { BlogPost } from "@/types/blog";

interface BlogDetailPageProps {
  post: BlogPost;
}

const LOCALES = ["en-US", "en-GB", "vi-VN"] as const;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = LOCALES.flatMap((locale) =>
    postsData.map((post) => ({
      params: { slug: post.slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogDetailPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = postsData.find((p) => p.slug === slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  const router = useRouter();

  if (!post) return null;

  const locale = router.locale || "en-US";
  const isVi = locale === "vi-VN";
  const isUk = locale === "en-GB";

  const title = (isVi ? post.titleVI : isUk ? post.titleUK : post.titleUS) || post.title;
  const excerpt = (isVi ? post.excerptVI : isUk ? post.excerptUK : post.excerptUS) || post.excerpt;

  return (
    <>
      <SEO 
        title={`${title} — DHT Furniture Blog`}
        description={excerpt}
        image={post.coverImage}
        type="article"
        author={post.author?.name || "DHT Furniture Editorial Team"}
        publishedTime={post.date}
        section={post.category || "Design & Architecture"}
        tags={post.tags}
      />
      <Schema 
        id="schema-article"
        type="Article"
        data={{
          headline: title,
          description: excerpt,
          image: [post.coverImage],
          datePublished: post.date,
          dateModified: post.date,
          author: {
            "@type": "Person",
            name: post.author?.name || "DHT Furniture Editorial Team",
          },
          publisher: {
            "@type": "Organization",
            name: "DHT Furniture Vietnam",
            logo: {
              "@type": "ImageObject",
              url: "https://dhtcompany.com/img/logo.png"
            }
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://dhtcompany.com/blog/${post.slug}`
          }
        }}
      />
      <Schema 
        id="schema-breadcrumbs-article"
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
              name: "Blog",
              item: "https://dhtcompany.com/blog"
            },
            {
              "@type": "ListItem",
              position: 3,
              name: title,
              item: `https://dhtcompany.com/blog/${post.slug}`
            }
          ]
        }}
      />
      <BlogDetailContainer slug={post.slug} />
    </>
  );
}

