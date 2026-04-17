import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { Media } from "@/models/Media";

const imageCache = new Map<string, { buffer: Buffer; mimeType: string }>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Valid ID is required" });
  }

  try {
    if (imageCache.has(id)) {
      const cached = imageCache.get(id)!;
      res.setHeader("Content-Type", cached.mimeType);
      res.setHeader("Content-Length", cached.buffer.length);
      res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
      return res.end(cached.buffer);
    }

    await dbConnect();

    const media = await Media.findById(id).lean();

    if (!media || !media.base64Data) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Convert Base64 string directly to binary buffer
    const base64Content = media.base64Data.includes("base64,")
      ? media.base64Data.split("base64,")[1]
      : media.base64Data;

    const buffer = Buffer.from(base64Content, "base64");

    // Save to cache for future requests to prevent huge MongoDB network drops
    if (imageCache.size > 200) imageCache.clear(); // simple eviction
    imageCache.set(id, { buffer, mimeType: media.mimeType });

    // Set high-performance headers
    res.setHeader("Content-Type", media.mimeType);
    res.setHeader("Content-Length", buffer.length);
    // Cache for 30 days (public) since these are static uploaded assets
    res.setHeader("Cache-Control", "public, max-age=2592000, immutable");

    // Pipe buffer to response
    res.end(buffer);
  } catch (error) {
    console.error("Image GET API error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ message: "Failed to pull image", error: errorMessage });
  }
}
