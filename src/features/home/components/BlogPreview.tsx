import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { postsData } from "@/data/posts";

export default function BlogPreview() {
  const { t } = useTranslation();
  const latestPosts = postsData.slice(0, 3);

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ backgroundColor: "hsl(var(--orange))" }} />
              <p className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>
                {t("blog.hero.label")}
              </p>
            </div>
            <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "hsl(var(--navy-deep))" }}>
              {t("blog.hero.heading")}
            </h2>
            <p className="font-body mt-2 max-w-md" style={{ color: "hsl(var(--navy)/0.5)" }}>
              {t("blog.hero.description")}
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-body text-sm font-semibold text-white transition-all hover:opacity-90 self-start md:self-auto"
            style={{ backgroundColor: "hsl(var(--orange))" }}
          >
            {t("blog.filterAll")} Articles <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {latestPosts.map((post, i) => {
            const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="h-full rounded-lg overflow-hidden border border-black/5 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1" style={{ backgroundColor: "#fff" }}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
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
          })}
        </div>
      </div>
    </section>
  );
}
