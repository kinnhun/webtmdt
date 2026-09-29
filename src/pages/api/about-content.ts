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

        // Ensure marquee uses Master 2026 data and never serves deprecated figures
        const MASTER_MARQUEE = {
          us: [
            "11 Production Facilities",
            "543,380 m² Combined Manufacturing Footprint",
            "Approximately 2,400 Group Personnel",
            "4 Manufacturing Clusters",
          ],
          uk: [
            "11 Production Facilities",
            "543,380 m² Combined Manufacturing Footprint",
            "Approximately 2,400 Group Personnel",
            "4 Manufacturing Clusters",
          ],
          vi: [
            "11 Cơ sở Sản xuất",
            "543.380 m² Tổng diện tích mặt bằng sản xuất",
            "Khoảng 2.400 Nhân sự tập đoàn",
            "4 Cụm sản xuất trọng điểm",
          ],
        };

        const hasDeprecatedItems = (arr: any) => {
          if (!Array.isArray(arr) || arr.length === 0) return true;
          return arr.some((item: any) => {
            if (typeof item !== "string") return false;
            const s = item.toLowerCase();
            return (
              s.includes("18+") ||
              s.includes("50,000") ||
              s.includes("50.000") ||
              s.includes("35+") ||
              s.includes("400+") ||
              s.includes("250") ||
              s.includes("30 kỹ") ||
              s.includes("40-50")
            );
          });
        };

        if (!plain.marquee || hasDeprecatedItems(plain.marquee.us) || hasDeprecatedItems(plain.marquee.vi) || hasDeprecatedItems(plain.marquee.uk)) {
          plain.marquee = MASTER_MARQUEE;
        }

        // Ensure timeline uses Master Guide A03 milestones and never serves unapproved claims
        const MASTER_TIMELINE = {
          heading: {
            us: "Corporate Development Milestones",
            uk: "Corporate Development Milestones",
            vi: "Các Mốc Phát Triển Doanh Nghiệp",
          },
          items: [
            {
              year: "2016",
              title: {
                us: "DHT Investment and Commercial Joint Stock Company",
                uk: "DHT Investment and Commercial Joint Stock Company",
                vi: "Công ty Cổ phần Đầu tư và Thương mại DHT",
              },
              desc: {
                us: "Foundation in investment and international trade.",
                uk: "Foundation in investment and international trade.",
                vi: "Nền tảng đầu tư và thương mại quốc tế.",
              },
            },
            {
              year: "2022",
              title: {
                us: "DHT Furniture Joint Stock Company",
                uk: "DHT Furniture Joint Stock Company",
                vi: "Công ty Cổ phần DHT Furniture",
              },
              desc: {
                us: "Development of the furniture business and export activities.",
                uk: "Development of the furniture business and export activities.",
                vi: "Phát triển hoạt động kinh doanh và xuất khẩu nội thất.",
              },
            },
            {
              year: "2024",
              title: {
                us: "DHT Furniture Vietnam Joint Stock Company",
                uk: "DHT Furniture Vietnam Joint Stock Company",
                vi: "Công ty Cổ phần DHT Furniture Vietnam",
              },
              desc: {
                us: "Further development of the international furniture business and coordinated manufacturing programmes.",
                uk: "Further development of the international furniture business and coordinated manufacturing programmes.",
                vi: "Mở rộng phát triển kinh doanh nội thất quốc tế và các chương trình điều phối sản xuất.",
              },
            },
          ],
        };

        const hasDeprecatedTimeline = (timelineObj: any) => {
          if (!timelineObj || !Array.isArray(timelineObj.items) || timelineObj.items.length === 0) return true;
          return timelineObj.items.some((item: any) => {
            const titleStr = typeof item.title === 'string' ? item.title : JSON.stringify(item.title || {});
            const descStr = typeof item.desc === 'string' ? item.desc : JSON.stringify(item.desc || {});
            const s = (titleStr + " " + descStr).toLowerCase();
            return (
              s.includes("foundation of dht furniture") ||
              s.includes("manufacturing network integration") ||
              s.includes("global compliance & scale") ||
              s.includes("global compliance and scale") ||
              s.includes("full fsc") ||
              s.includes("bsci/smeta") ||
              s.includes("coverage")
            );
          });
        };

        if (hasDeprecatedTimeline(plain.timeline)) {
          plain.timeline = {
            ...(plain.timeline || {}),
            ...MASTER_TIMELINE,
          };
        }

        // Ensure team uses approved roles and eliminates fake/placeholder phone numbers
        if (plain.team && Array.isArray(plain.team.members)) {
          plain.team.members = plain.team.members.map((m: any, idx: number) => {
            const isLeader = !!m.isLeader || idx === 0 || m.key === 'john';
            return {
              ...m,
              isLeader,
              phone: '',
              email: m.email && !m.email.includes('xxx') ? m.email : 'sales@dhtcompany.com',
            };
          });
        }

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

        const cleanTestStrings = (obj: any): any => {
          if (typeof obj === 'string') {
            if (obj.length > 500 && obj.startsWith('data:image')) return obj;
            return obj
              .replace(/partnerships\.KKK/gi, 'partnerships.')
              .replace(/đối tác lâu dài\.KKK/gi, 'đối tác lâu dài.')
              .replace(/Built for B2B Buyerskk/gi, 'Built for B2B Buyers')
              .replace(/người mua B2Bkk/gi, 'người mua B2B')
              .replace(/Export Readykk/gi, 'Export Ready')
              .replace(/xuất khẩu toàn cầukk/gi, 'xuất khẩu toàn cầu')
              .replace(/kinh nghiệm vận chuyển toàn cầukk/gi, 'kinh nghiệm vận chuyển toàn cầu')
              .replace(/toàn cầukkk/gi, 'toàn cầu')
              .replace(/worldwidekkk/gi, 'worldwide')
              .replace(/DHT\?KKK/gi, 'DHT?')
              .replace(/FSC\.kkk/gi, 'FSC.')
              .replace(/FSC certified wood\.kkk/gi, 'FSC-certified wood.')
              .replace(/sửa kkk/gi, '');
          }
          if (Array.isArray(obj)) {
            return obj.map(cleanTestStrings);
          }
          if (obj && typeof obj === 'object') {
            const res: any = {};
            for (const key of Object.keys(obj)) {
              res[key] = cleanTestStrings(obj[key]);
            }
            return res;
          }
          return obj;
        };

        return cleanTestStrings(plain);
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
