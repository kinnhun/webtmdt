import { useMemo } from "react";
import PostDetail from "./components/PostDetail";
import RelatedPosts from "./components/RelatedPosts";
import { postsData } from "@/data/posts";

interface BlogDetailContainerProps {
  slug: string;
}

export default function BlogDetailContainer({ slug }: BlogDetailContainerProps) {
  const post = useMemo(() => postsData.find((p) => p.slug === slug), [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return postsData
      .filter((p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
      .slice(0, 3);
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="font-body text-lg" style={{ color: "hsl(var(--navy)/0.4)" }}>Post not found.</p>
      </div>
    );
  }

  return (
    <>
      <PostDetail post={post} />
      <RelatedPosts posts={relatedPosts} />
    </>
  );
}
