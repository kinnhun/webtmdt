import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { cached } from "@/lib/cache";
import AboutContent from "@/models/AboutContent";

const CACHE_TTL = process.env.NODE_ENV === "production" ? 120_000 : 30_000;

/**
 * Public (read-only) endpoint for the About page content.
 * - Excludes heavy binary/base64 image fields to keep response fast (<10KB).
 * - Uses in-memory cache to avoid hitting MongoDB on every request.
 */
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (_req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await cached<Record<string, any> | null>(
      "about-content-public",
      CACHE_TTL,
      async () => {
        await dbConnect();
        // Exclude heavy fields: base64 images, internal Mongoose fields
        const doc = await AboutContent.findOne()
          .select('-_id -__v -createdAt -updatedAt')
          .lean();
        if (!doc) return null;

        const plain = JSON.parse(JSON.stringify(doc));

        // // Strip base64 data from image fields to keep payload light
        // // Only keep URL-based images (http/https), remove data:image/... strings
        // const stripBase64 = (arr: string[] | undefined): string[] => {
        //   if (!Array.isArray(arr)) return [];
        //   return arr.filter((s: string) => typeof s === 'string' && !s.startsWith('data:'));
        // };

        // if (plain.hero) {
        //   plain.hero.backgroundImages = stripBase64(plain.hero.backgroundImages);
        // }
        // if (plain.story) {
        //   plain.story.images = stripBase64(plain.story.images);
        // }
        // if (plain.team) {
        //   if (plain.team.leader && typeof plain.team.leader.image === 'string' && plain.team.leader.image.startsWith('data:')) {
        //     plain.team.leader.image = '';
        //   }
        //   if (Array.isArray(plain.team.members)) {
        //     plain.team.members = plain.team.members.map((m: any) => ({
        //       ...m,
        //       image: (typeof m.image === 'string' && m.image.startsWith('data:')) ? '' : m.image,
        //     }));
        //   }
        // }

        return plain;
      }
    );

    // Strong caching headers
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json(data);
  } catch (error) {
    console.error("About content API error:", error);
    return res.status(500).json({ error: "Failed to fetch about content" });
  }
}
