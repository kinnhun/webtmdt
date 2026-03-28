import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import ProductAttribute from "@/models/ProductAttribute";

/**
 * POST /api/products/attributes/seed
 *
 * Seeds initial attribute data from the existing constants.
 * Skips duplicates (upsert by type+name).
 */

const OUTDOOR_CATEGORIES = [
  "Outdoor Sofas",
  "Dining Sets",
  "Lounge & Daybeds",
  "Tables",
  "Chairs",
];
const INDOOR_CATEGORIES = [
  "Living Room Furniture",
  "Dining Room Furniture",
  "Bathroom Furniture",
];
const MATERIALS = ["Teak", "Acacia", "Aluminium"];
const MOQ_OPTIONS = ["Under 10", "10–50", "50–100", "100+"];
const COLORS = [
  { name: "Natural Wood", hex: "#8b5a2b" },
  { name: "Brown", hex: "#8b4513" },
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Grey", hex: "#808080" },
  { name: "Beige", hex: "#f5f5dc" },
  { name: "Green", hex: "#228b22" },
];
const STYLES = ["Modern", "Contemporary", "Minimalist", "Coastal", "Luxury"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    const ops: Array<{
      updateOne: {
        filter: { type: string; nameUS: string };
        update: { $setOnInsert: Record<string, unknown> };
        upsert: true;
      };
    }> = [];

    // Categories
    OUTDOOR_CATEGORIES.forEach((name, i) => {
      ops.push({
        updateOne: {
          filter: { type: "category", nameUS: name },
          update: { $setOnInsert: { type: "category", nameUS: name, collection: "Outdoor", order: i, isActive: true } },
          upsert: true,
        },
      });
    });
    INDOOR_CATEGORIES.forEach((name, i) => {
      ops.push({
        updateOne: {
          filter: { type: "category", nameUS: name },
          update: {
            $setOnInsert: {
              type: "category",
              nameUS: name,
              collection: "Indoor",
              order: OUTDOOR_CATEGORIES.length + i,
              isActive: true,
            },
          },
          upsert: true,
        },
      });
    });

    // Materials
    MATERIALS.forEach((name, i) => {
      ops.push({
        updateOne: {
          filter: { type: "material", nameUS: name },
          update: { $setOnInsert: { type: "material", nameUS: name, order: i, isActive: true } },
          upsert: true,
        },
      });
    });

    // MOQ
    MOQ_OPTIONS.forEach((name, i) => {
      ops.push({
        updateOne: {
          filter: { type: "moq", nameUS: name },
          update: { $setOnInsert: { type: "moq", nameUS: name, order: i, isActive: true } },
          upsert: true,
        },
      });
    });

    // Colors
    COLORS.forEach((c, i) => {
      ops.push({
        updateOne: {
          filter: { type: "color", nameUS: c.name },
          update: { $setOnInsert: { type: "color", nameUS: c.name, colorHex: c.hex, order: i, isActive: true } },
          upsert: true,
        },
      });
    });

    // Styles
    STYLES.forEach((name, i) => {
      ops.push({
        updateOne: {
          filter: { type: "style", nameUS: name },
          update: { $setOnInsert: { type: "style", nameUS: name, order: i, isActive: true } },
          upsert: true,
        },
      });
    });

    const result = await ProductAttribute.bulkWrite(ops);

    return res.status(200).json({
      message: "Seed completed",
      upserted: result.upsertedCount,
      matched: result.matchedCount,
      total: ops.length,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Seed failed";
    return res.status(500).json({ error: msg });
  }
}
