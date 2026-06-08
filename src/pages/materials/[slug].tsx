import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Factory, Globe2, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { getMaterialArticle, materialArticles, type MaterialArticle } from "@/data/materialArticles";

const icons = [ShieldCheck, Factory, Truck, PackageCheck, Globe2, Sparkles];

function SectionCard({ section, index, layout }: { section: MaterialArticle["sections"][number]; index: number; layout: MaterialArticle["layout"] }) {
  const Icon = icons[index % icons.length];
  const imageFirst = layout === "comfort" || (layout === "technical" && index === 1);

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 ${section.image ? "lg:grid-cols-2" : ""}`}
    >
      {section.image && imageFirst && (
        <div className="relative min-h-[300px] overflow-hidden bg-slate-100">
          <img src={section.image} alt={section.title} className="absolute inset-0 h-full w-full object-cover brightness-[1.08] contrast-[1.06] saturate-[1.08] transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/5" />
        </div>
      )}

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <Icon size={23} />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Chapter {index + 1}</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-950 sm:text-3xl">{section.title}</h2>
        {section.body && <p className="mt-4 text-base leading-8 text-slate-600">{section.body}</p>}
        {section.bullets && (
          <ul className="mt-6 space-y-3">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-7 text-slate-700 sm:text-base">
                <CheckCircle2 className="mt-1 shrink-0 text-orange-500" size={18} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {section.image && !imageFirst && (
        <div className="relative min-h-[300px] overflow-hidden bg-slate-100">
          <img src={section.image} alt={section.title} className="absolute inset-0 h-full w-full object-cover brightness-[1.08] contrast-[1.06] saturate-[1.08] transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/5" />
        </div>
      )}
    </motion.section>
  );
}

function MaterialPage({ article }: { article: MaterialArticle }) {
  const isPremium = article.layout === "premium";
  const isTechnical = article.layout === "technical";
  const isComfort = article.layout === "comfort";

  return (
    <>
      <Head>
        <title>{article.headline} | DHT Furniture Materials</title>
        <meta name="description" content={article.intro} />
      </Head>

      <main className="min-h-screen bg-[#f7f4ee] pt-[80px]">
        <section className={`relative overflow-hidden ${isPremium ? "bg-stone-950" : isTechnical ? "bg-slate-950" : isComfort ? "bg-[#1f3345]" : "bg-[hsl(var(--navy))]"}`}>
          <div className="absolute inset-0 opacity-55">
            <img src={article.hoverImage} alt={article.badge} className="h-full w-full object-cover brightness-[1.1] contrast-[1.07] saturate-[1.12]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/36 to-black/5" />
          <div className="container relative mx-auto px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
            <Link href="/#materials" className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white">
              <ArrowLeft size={16} /> Back to Materials
            </Link>
            <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-orange-300">{article.badge}</p>
                <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">{article.headline}</h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{article.intro}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.12 }} className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                  <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover brightness-[1.08] contrast-[1.06] saturate-[1.1]" />
                  <img src={article.hoverImage} alt={`${article.title} detail`} className="absolute inset-0 h-full w-full object-cover opacity-0 brightness-[1.08] contrast-[1.06] saturate-[1.1] transition-opacity duration-700 hover:opacity-100" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
          <div className="grid gap-4 md:grid-cols-3">
            {article.stats.map((stat, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div key={stat} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="mb-4 text-orange-500" size={24} />
                  <p className="font-display text-lg font-bold text-slate-950">{stat}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className={`container mx-auto space-y-7 px-4 pb-14 sm:px-6 sm:pb-20 ${isTechnical ? "lg:space-y-10" : ""}`}>
          {article.sections.map((section, index) => (
            <SectionCard key={section.title} section={section} index={index} layout={article.layout} />
          ))}
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-12 sm:px-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">Explore more materials</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">Built for outdoor performance</h2>
              </div>
              <Link href="/" className="hidden rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 sm:inline-flex">Home</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {materialArticles.filter((item) => item.slug !== article.slug).map((item) => (
                <Link key={item.slug} href={`/materials/${item.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={item.image} alt={item.badge} className="h-full w-full object-cover brightness-[1.06] contrast-[1.04] saturate-[1.08] transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">{item.badge}</p>
                    <h3 className="mt-2 font-display text-lg font-bold text-slate-950">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const MATERIAL_LOCALES = ["en-US", "en-GB", "vi-VN"] as const;

export async function getStaticPaths() {
  return {
    paths: MATERIAL_LOCALES.flatMap((locale) =>
      materialArticles.map((article) => ({
        params: { slug: article.slug },
        locale,
      })),
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const article = getMaterialArticle(params.slug);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
  };
}

export default function MaterialArticlePage({ article }: { article: MaterialArticle }) {
  const router = useRouter();

  if (router.isFallback || !article) return null;

  return <MaterialPage article={article} />;
}
