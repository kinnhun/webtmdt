import type { NextApiRequest, NextApiResponse } from "next";

const MAX_CHUNK = 4500; // Google Translate unofficial endpoint supports ~5000 chars

/**
 * Split text into chunks by sentence boundaries,
 * each chunk <= MAX_CHUNK characters.
 */
function splitIntoChunks(text: string): string[] {
  if (text.length <= MAX_CHUNK) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= MAX_CHUNK) {
      chunks.push(remaining);
      break;
    }

    const slice = remaining.slice(0, MAX_CHUNK);
    let splitIdx = -1;

    for (const sep of ['. ', '! ', '? ', '.\n', '\n', ', ', ' ']) {
      const idx = slice.lastIndexOf(sep);
      if (idx > 0) {
        splitIdx = idx + sep.length;
        break;
      }
    }

    if (splitIdx <= 0) splitIdx = MAX_CHUNK;

    chunks.push(remaining.slice(0, splitIdx));
    remaining = remaining.slice(splitIdx);
  }

  return chunks;
}

async function translateChunk(text: string, sourceLang: string, targetLang: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Google Translate returned ${response.status}`);
  }

  const data = await response.json();

  // Response format: [[["translated text","source text",null,null,x],...],...]
  if (Array.isArray(data) && Array.isArray(data[0])) {
    const translated = data[0]
      .filter((segment: unknown) => Array.isArray(segment) && segment[0])
      .map((segment: unknown[]) => segment[0])
      .join("");
    return translated;
  }

  throw new Error("Unexpected response format from Google Translate");
}

/**
 * POST /api/translate
 * Body: { text: string, targetLang: "vi" | "en-GB" }
 * Uses Google Translate (unofficial free endpoint).
 * Splits long text into chunks, translates each, then joins results.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, targetLang, sourceLang = "auto" } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: "Missing text or targetLang" });
  }

  try {
    const chunks = splitIntoChunks(text);

    const translatedChunks: string[] = [];
    for (const chunk of chunks) {
      const result = await translateChunk(chunk.trim(), sourceLang, targetLang);
      translatedChunks.push(result);
    }

    const translated = translatedChunks.join("");

    return res.status(200).json({ translated });
  } catch (error: unknown) {
    console.error("Translation API error:", error);
    const msg = error instanceof Error ? error.message : "Translation service unavailable";
    return res.status(500).json({ error: msg });
  }
}
