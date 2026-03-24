import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import type { BlogPost } from "@/domains/blog/blog.types";
import { useTranslation } from "react-i18next";

interface PostDetailProps {
  post: BlogPost;
}

export default function PostDetail({ post }: PostDetailProps) {
  const { t } = useTranslation();
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      {/* Cover image — pt-[80px] to offset fixed header */}
      <div className="relative w-full overflow-hidden" style={{ paddingTop: "80px", backgroundColor: "hsl(var(--navy-deep))" }}>
        <div className="relative w-full" style={{ height: "clamp(320px, 45vw, 560px)" }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, hsl(var(--navy-deep)) 0%, hsl(var(--navy-deep)/0.3) 40%, transparent 100%)" }} />
        </div>

        {/* Back button */}
        <div className="absolute left-6 z-10" style={{ top: "100px" }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-body text-sm text-white/80 hover:text-white transition-all"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
          >
            <ArrowLeft size={15} /> {t("blog.backToList")}
          </Link>
        </div>

        {/* Title overlay at bottom of cover */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-6 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span
                className="inline-block px-3 py-1 rounded-sm font-body text-xs font-semibold tracking-wider uppercase text-white mb-4"
                style={{ backgroundColor: "hsl(var(--orange))" }}
              >
                {post.category}
              </span>
              <h1
                className="font-display font-bold text-white leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.75rem)" }}
              >
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-body text-white/60">
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {formattedDate}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime} min {t("blog.readTime")}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Author bar */}
      <div className="border-b" style={{ borderColor: "hsl(var(--navy)/0.08)", backgroundColor: "#fff" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-body font-semibold text-sm" style={{ color: "hsl(var(--navy-deep))" }}>{post.author.name}</p>
                <p className="font-body text-xs" style={{ color: "hsl(var(--navy)/0.45)" }}>{post.author.role}</p>
              </div>
            </div>
            <button
              onClick={() => { if (typeof navigator !== "undefined") navigator.clipboard.writeText(window.location.href); }}
              className="flex items-center gap-2 px-3 py-2 rounded-sm font-body text-xs font-medium transition-all hover:opacity-80"
              style={{ backgroundColor: "hsl(var(--navy)/0.06)", color: "hsl(var(--navy)/0.55)" }}
            >
              <Share2 size={13} /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="container mx-auto px-6 py-12 md:py-16" style={{ backgroundColor: "#fff" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto prose-dht"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-10 pt-8 border-t flex flex-wrap items-center gap-2"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          <Tag size={14} style={{ color: "hsl(var(--navy)/0.35)" }} />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-sm font-body text-xs"
              style={{ backgroundColor: "hsl(var(--navy)/0.06)", color: "hsl(var(--navy)/0.55)" }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </article>
  );
}
