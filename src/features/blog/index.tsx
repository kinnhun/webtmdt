import { useState, useMemo } from "react";
import BlogHero from "./components/BlogHero";
import PostCard from "./components/PostCard";
import { postsData, blogCategories } from "@/data/posts";

export default function BlogContainer() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return postsData;
    return postsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const [featured, ...rest] = filteredPosts;

  return (
    <>
      <BlogHero
        activeCategory={activeCategory}
        categories={blogCategories}
        onCategoryChange={setActiveCategory}
      />

      <section className="py-14 md:py-20" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
        <div className="container mx-auto px-6">
          {/* Featured post */}
          {featured && (
            <div className="mb-12">
              <PostCard post={featured} index={0} featured />
            </div>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && (
            <p className="text-center font-body py-16" style={{ color: "hsl(var(--navy)/0.4)" }}>
              No posts in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
