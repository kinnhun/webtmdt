import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import BlogDetailContainer from "@/features/blog/BlogDetailContainer";
import { postsData } from "@/data/posts";

export default function BlogDetailPage() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const post = useMemo(() => postsData.find((p) => p.slug === slug), [slug]);

  if (!router.isReady) return null;

  return (
    <>
      <Head>
        <title>{post ? `${post.title} — DHT Blog` : "Blog — DHT"}</title>
        {post && <meta name="description" content={post.excerpt} />}
      </Head>
      {slug && <BlogDetailContainer slug={slug} />}
    </>
  );
}
