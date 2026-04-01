import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { Media } from "@/models/Media";

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
    await dbConnect();

    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Convert Base64 string directly to binary buffer
    // The client might have sent `data:image/jpeg;base64,/9j/4AA...` or just the pure base64 string
    const base64Content = media.base64Data.includes("base64,")
      ? media.base64Data.split("base64,")[1]
      : media.base64Data;

    const buffer = Buffer.from(base64Content, "base64");

    // Set high-performance headers "cho thật đẹp"
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
