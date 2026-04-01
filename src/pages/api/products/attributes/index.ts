import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import ProductAttribute from "@/models/ProductAttribute";
import Product from "@/models/Product";

/**
 * GET  /api/products/attributes?type=category|material|moq|color|style
 *      Returns attributes of given type with real product counts.
 *      If no type, returns all grouped by type.
 *
 * POST /api/products/attributes
 *      Create a new attribute { type, nameUS, nameUK?, nameVI?, collection?, colorHex? }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

// ── Field mapping: attribute type → product field name ──
const TYPE_TO_FIELD: Record<string, string> = {
  category: "category",
  material: "material",
  moq: "moq",
  color: "color",
  style: "style",
};

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { type } = req.query;
    const filter: Record<string, unknown> = { isActive: true };
    if (type && typeof type === "string") {
      filter.type = type;
    }

    const attributes = await ProductAttribute.find(filter)
      .sort({ type: 1, order: 1, nameUS: 1 })
      .lean();

    // Count actual products per attribute value (aggregation per type)
    const typesInResult = [...new Set(attributes.map((a) => a.type))];

    // Build count maps: { [type]: { [name]: count } }
    const countMaps: Record<string, Record<string, number>> = {};

    await Promise.all(
      typesInResult.map(async (t) => {
        const field = TYPE_TO_FIELD[t];
        if (!field) return;

        const counts = await Product.aggregate([
          { $match: { [field]: { $exists: true, $ne: null } } },
          { $group: { _id: `$${field}`, count: { $sum: 1 } } },
        ]);

        countMaps[t] = {};
        counts.forEach((c: { _id: string; count: number }) => {
          countMaps[t][c._id] = c.count;
        });
      })
    );

    const result = attributes.map((attr) => ({
      _id: attr._id,
      key: attr._id.toString(),
      type: attr.type,
      nameUS: attr.nameUS,
      nameUK: attr.nameUK,
      nameVI: attr.nameVI,
      collection: attr.collection || null,
      colorHex: attr.colorHex || null,
      order: attr.order,
      count: countMaps[attr.type]?.[attr.nameUS] || 0,
    }));

    return res.status(200).json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to fetch attributes";
    return res.status(500).json({ error: msg });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { type, nameUS, nameUK, nameVI, collection, colorHex } = req.body;

    if (!type || !nameUS) {
      return res.status(400).json({ error: "type and nameUS are required" });
    }

    // Get next order for this type
    const maxOrder = await ProductAttribute.findOne({ type })
      .sort({ order: -1 })
      .select("order")
      .lean();
    const order = (maxOrder?.order ?? -1) + 1;

    const doc = await ProductAttribute.create({
      type,
      nameUS: nameUS.trim(),
      nameUK: nameUK?.trim(),
      nameVI: nameVI?.trim(),
      collection: type === "category" ? collection : undefined,
      colorHex: type === "color" ? colorHex : undefined,
      order,
    });

    return res.status(201).json({
      _id: doc._id,
      key: doc._id.toString(),
      type: doc.type,
      nameUS: doc.nameUS,
      nameUK: doc.nameUK,
      nameVI: doc.nameVI,
      collection: doc.collection || null,
      colorHex: doc.colorHex || null,
      order: doc.order,
      count: 0,
    });
  } catch (error: unknown) {
    if ((error as any)?.code === 11000) {
      return res.status(409).json({ error: "Attribute already exists" });
    }
    const msg = error instanceof Error ? error.message : "Failed to create attribute";
    return res.status(500).json({ error: msg });
  }
}
