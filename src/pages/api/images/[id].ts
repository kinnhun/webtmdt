import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { Media } from "@/models/Media";
import mongoose from "mongoose";
import sharp from "sharp";
import fs from "fs";
import path from "path";

// Persistent disk cache on server
const CACHE_DIR = path.join(process.cwd(), "public", "cache", "images");

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  } catch (err) {
    console.warn("Could not create image cache directory:", err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, w, q } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Valid ID is required" });
  }

  // Handle DELETE request to remove media and its cache
  if (req.method === "DELETE") {
    try {
      await dbConnect();
      const result = await Media.findByIdAndDelete(id);
      if (result) {
        // Remove cached files matching this id
        try {
          if (fs.existsSync(CACHE_DIR)) {
            const files = fs.readdirSync(CACHE_DIR);
            for (const file of files) {
              if (file.startsWith(id)) {
                fs.unlinkSync(path.join(CACHE_DIR, file));
              }
            }
          }
        } catch (unlinkErr) {
          console.warn("Failed to delete cached files for:", id, unlinkErr);
        }
        return res.status(200).json({ success: true, message: "Media deleted successfully" });
      }
      return res.status(404).json({ message: "Media not found" });
    } catch (err) {
      return res.status(500).json({ message: "Failed to delete media", error: String(err) });
    }
  }

  // Handle GET request
  const targetWidth = w ? parseInt(w as string, 10) : null;
  const quality = q ? parseInt(q as string, 10) : 80;
  const safeQuality = Math.min(Math.max(quality, 50), 95);
  
  // Cache key filename: e.g. 660a123_w500_q80.webp or 660a123_orig_q80.webp
  const cacheFileName = `${id.replace(/[^a-zA-Z0-9_-]/g, "_")}${targetWidth ? `_w${targetWidth}` : "_orig"}_q${safeQuality}.webp`;
  const cacheFilePath = path.join(CACHE_DIR, cacheFileName);

  // 1. FAST PATH: Check persistent disk cache (<1ms response)
  if (fs.existsSync(cacheFilePath)) {
    try {
      const cachedBuffer = fs.readFileSync(cacheFilePath);
      res.setHeader("Content-Type", "image/webp");
      res.setHeader("Content-Length", cachedBuffer.length);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return res.status(200).send(cachedBuffer);
    } catch (readErr) {
      console.warn("Disk cache read failed, falling back to database:", readErr);
    }
  }

  // 2. SLOW PATH: Query MongoDB, compress with sharp, write to disk cache
  try {
    await dbConnect();

    // Query media document by _id or customId or name
    let mediaDoc: any = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      mediaDoc = await Media.findById(id).lean();
    }
    if (!mediaDoc) {
      const db = mongoose.connection.db;
      if (db) {
        mediaDoc = await db.collection("media").findOne({
          $or: [{ name: id }, { customId: id }]
        });
      }
    }

    if (!mediaDoc || (!mediaDoc.base64Data && !mediaDoc.data)) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Extract Base64 binary
    let rawBase64 = mediaDoc.base64Data || mediaDoc.data || "";
    if (rawBase64.includes(";base64,")) {
      rawBase64 = rawBase64.split(";base64,")[1];
    } else if (rawBase64.includes("base64,")) {
      rawBase64 = rawBase64.split("base64,")[1];
    }

    const rawBuffer = Buffer.from(rawBase64, "base64");

    // 3. Process with Sharp: resize if requested, convert to WebP
    let pipeline = sharp(rawBuffer);
    if (targetWidth && targetWidth > 0 && targetWidth < 3840) {
      pipeline = pipeline.resize({ width: targetWidth, withoutEnlargement: true });
    }

    const webpBuffer = await pipeline
      .webp({ quality: safeQuality, effort: 4 })
      .toBuffer();

    // 4. Save to disk cache asynchronously
    try {
      if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
      }
      fs.writeFileSync(cacheFilePath, webpBuffer);
    } catch (writeErr) {
      console.warn("Failed to write image cache to disk:", writeErr);
    }

    // 5. Send optimized WebP response
    res.setHeader("Content-Type", "image/webp");
    res.setHeader("Content-Length", webpBuffer.length);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.status(200).send(webpBuffer);
  } catch (error) {
    console.error("Image GET API error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return res.status(500).json({ message: "Failed to pull image", error: errorMessage });
  }
}
