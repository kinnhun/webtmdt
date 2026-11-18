import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { postsData } from "@/data/posts";
import { materialArticles } from "@/data/materialArticles";

const DOMAIN = "https://dhtcompany.com";
const LOCALES = ["en-US", "en-GB", "vi-VN"];

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
  alternates?: { lang: string; url: string }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const products = await Product.find({}, "slug updatedAt").lean();

    const staticPages = [
      { path: "", changefreq: "daily", priority: "1.0" },
      { path: "/catalogue/indoor", changefreq: "weekly", priority: "0.9" },
      { path: "/catalogue/outdoor", changefreq: "weekly", priority: "0.9" },
      { path: "/blog", changefreq: "weekly", priority: "0.8" },
      { path: "/about", changefreq: "monthly", priority: "0.7" },
      { path: "/contact", changefreq: "monthly", priority: "0.7" },
    ];

    const urls: SitemapUrl[] = [];

    // 1. Static Pages
    for (const page of staticPages) {
      for (const locale of LOCALES) {
        const pathPrefix = locale === "en-US" ? "" : `/${locale}`;
        const loc = `${DOMAIN}${pathPrefix}${page.path}`;
        const alternates = LOCALES.map((l) => ({
          lang: l,
          url: `${DOMAIN}${l === "en-US" ? "" : `/${l}`}${page.path}`,
        }));
        alternates.push({ lang: "x-default", url: `${DOMAIN}${page.path}` });

        urls.push({
          loc,
          changefreq: page.changefreq,
          priority: page.priority,
          alternates,
        });
      }
    }

    // 2. Material Articles
    for (const article of materialArticles) {
      for (const locale of LOCALES) {
        const pathPrefix = locale === "en-US" ? "" : `/${locale}`;
        const path = `/materials/${article.slug}`;
        const loc = `${DOMAIN}${pathPrefix}${path}`;
        const alternates = LOCALES.map((l) => ({
          lang: l,
          url: `${DOMAIN}${l === "en-US" ? "" : `/${l}`}${path}`,
        }));
        alternates.push({ lang: "x-default", url: `${DOMAIN}${path}` });

        urls.push({
          loc,
          changefreq: "weekly",
          priority: "0.8",
          alternates,
        });
      }
    }

    // 3. Blog Posts
    for (const post of postsData) {
      for (const locale of LOCALES) {
        const pathPrefix = locale === "en-US" ? "" : `/${locale}`;
        const path = `/blog/${post.slug}`;
        const loc = `${DOMAIN}${pathPrefix}${path}`;
        const alternates = LOCALES.map((l) => ({
          lang: l,
          url: `${DOMAIN}${l === "en-US" ? "" : `/${l}`}${path}`,
        }));
        alternates.push({ lang: "x-default", url: `${DOMAIN}${path}` });

        urls.push({
          loc,
          lastmod: post.date ? new Date(post.date).toISOString() : undefined,
          changefreq: "weekly",
          priority: "0.8",
          alternates,
        });
      }
    }

    // 4. Products from MongoDB
    for (const prod of products) {
      if ((prod as any).slug) {
        const slug = (prod as any).slug;
        const lastmod = (prod as any).updatedAt ? new Date((prod as any).updatedAt).toISOString() : undefined;

        for (const locale of LOCALES) {
          const pathPrefix = locale === "en-US" ? "" : `/${locale}`;
          const path = `/catalogue/${slug}`;
          const loc = `${DOMAIN}${pathPrefix}${path}`;
          const alternates = LOCALES.map((l) => ({
            lang: l,
            url: `${DOMAIN}${l === "en-US" ? "" : `/${l}`}${path}`,
          }));
          alternates.push({ lang: "x-default", url: `${DOMAIN}${path}` });

          urls.push({
            loc,
            lastmod,
            changefreq: "weekly",
            priority: "0.9",
            alternates,
          });
        }
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    ${
      u.alternates
        ? u.alternates
            .map(
              (alt) =>
                `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}"/>`
            )
            .join("\n")
        : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=600");
    return res.status(200).send(xml);
  } catch (err: any) {
    console.error("Error generating realtime sitemap:", err);
    return res.status(500).send("Error generating sitemap");
  }
}
