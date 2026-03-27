import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import { Media } from "@/models/Media";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb", // Allow up to 20MB for Base64 image payload
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { base64Data, filename, mimeType, size } = req.body;

    if (!base64Data || !mimeType) {
      return res.status(400).json({ message: "base64Data and mimeType are required" });
    }

    // Connect DB
    await dbConnect();

    // Check for duplicate by computing MD5 hash of base64Data
    const md5 = crypto.createHash("md5").update(base64Data).digest("hex");

    // Check if the image already exists
    let media = await Media.findOne({ md5 });

    if (!media) {
      // Create new media document
      media = await Media.create({
        filename: filename || `upload-${Date.now()}`,
        mimeType,
        base64Data,
        size: size || Buffer.from(base64Data, 'base64').length,
        md5,
      });
    }

    // Return the URL that will stream the binary image back
    // The client can use this exact string in their `src` attributes.
    const url = `/api/images/${media._id}`;

    res.status(200).json({ url, id: media._id });
  } catch (error: any) {
    console.error("Upload API error:", error);
    res.status(500).json({ message: "Failed to upload image", error: error.message });
  }
}
