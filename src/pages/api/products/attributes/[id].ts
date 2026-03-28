import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import ProductAttribute from "@/models/ProductAttribute";

/**
 * PUT    /api/products/attributes/[id]  → update
 * DELETE /api/products/attributes/[id]  → soft-delete (isActive=false)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid attribute id" });
  }

  switch (req.method) {
    case "PUT":
      return handleUpdate(id, req, res);
    case "DELETE":
      return handleDelete(id, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

async function handleUpdate(id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    const { nameUS, nameUK, nameVI, collection, colorHex } = req.body;

    const existing = await ProductAttribute.findById(id);
    if (!existing) {
      return res.status(404).json({ error: "Attribute not found" });
    }

    if (nameUS !== undefined) existing.nameUS = nameUS.trim();
    if (nameUK !== undefined) existing.nameUK = nameUK.trim();
    if (nameVI !== undefined) existing.nameVI = nameVI.trim();
    if (existing.type === "category" && collection !== undefined) {
      existing.collection = collection;
    }
    if (existing.type === "color" && colorHex !== undefined) {
      existing.colorHex = colorHex;
    }

    await existing.save();

    return res.status(200).json({
      _id: existing._id,
      key: existing._id.toString(),
      type: existing.type,
      nameUS: existing.nameUS,
      nameUK: existing.nameUK,
      nameVI: existing.nameVI,
      collection: existing.collection || null,
      colorHex: existing.colorHex || null,
      order: existing.order,
    });
  } catch (error: unknown) {
    if ((error as any)?.code === 11000) {
      return res.status(409).json({ error: "Attribute name already exists for this type" });
    }
    const msg = error instanceof Error ? error.message : "Failed to update attribute";
    return res.status(500).json({ error: msg });
  }
}

async function handleDelete(id: string, res: NextApiResponse) {
  try {
    const result = await ProductAttribute.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Attribute not found" });
    }
    return res.status(200).json({ success: true, deleted: id });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete attribute";
    return res.status(500).json({ error: msg });
  }
}
