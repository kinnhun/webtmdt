/**
 * Appends width and quality query parameters to `/api/images/<id>` URLs so
 * card and thumbnail views download disk-cached WebP variants rather than
 * full-resolution source images.
 */
export function withImageVariant(
  src: string | undefined | null,
  width: number,
  quality = 80
): string {
  if (!src) return "/img/hero-poster.webp";
  if (!src.startsWith("/api/images/")) return src;
  if (/[?&]w=\d+/.test(src)) return src;
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}w=${width}&q=${quality}`;
}

