import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/domains/blog/blog.types";

interface PostCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
}

export default function PostCard({ post, index, featured }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link href={`/blog/${post.slug}`} className="group block">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 rounded-lg overflow-hidden border border-black/5" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span
                className="absolute top-4 left-4 px-3 py-1 rounded-sm font-body text-xs font-semibold tracking-wide uppercase text-white"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              >
                {post.category}
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8 md:pr-10">
              <div className="flex items-center gap-4 text-sm font-body mb-4" style={{ color: "hsl(var(--navy)/0.45)" }}>
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {formattedDate}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime} min</span>
              </div>
              <h2 className="font-display font-bold leading-snug mb-3 transition-colors group-hover:text-[hsl(var(--orange))]" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "hsl(var(--navy-deep))" }}>
                {post.title}
              </h2>
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--navy)/0.55)" }}>
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold transition-colors group-hover:gap-2.5" style={{ color: "hsl(var(--orange))" }}>
                Read Article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="h-full rounded-lg overflow-hidden border border-black/5 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1" style={{ backgroundColor: "#fff" }}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span
              className="absolute top-3 left-3 px-2.5 py-1 rounded-sm font-body text-[10px] font-semibold tracking-wider uppercase text-white"
              style={{ backgroundColor: "hsl(var(--orange))" }}
            >
              {post.category}
            </span>
          </div>
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-3 text-xs font-body mb-3" style={{ color: "hsl(var(--navy)/0.4)" }}>
              <span className="flex items-center gap-1"><Calendar size={11} /> {formattedDate}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} min</span>
            </div>
            <h3 className="font-display font-bold text-lg leading-snug mb-2 transition-colors group-hover:text-[hsl(var(--orange))]" style={{ color: "hsl(var(--navy-deep))" }}>
              {post.title}
            </h3>
            <p className="font-body text-sm leading-relaxed line-clamp-2" style={{ color: "hsl(var(--navy)/0.5)" }}>
              {post.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
