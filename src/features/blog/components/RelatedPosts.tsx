import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PostCard from "./PostCard";
import type { BlogPost } from "@/domains/blog/blog.types";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const { t } = useTranslation();

  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="font-body text-xs tracking-[0.25em] uppercase font-medium mb-2" style={{ color: "hsl(var(--orange))" }}>
            {t("blog.related.label")}
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "hsl(var(--navy-deep))" }}>
            {t("blog.related.heading")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
