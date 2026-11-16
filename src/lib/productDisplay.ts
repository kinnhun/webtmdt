/**
 * Shared formatting and filtering helpers for catalogue and featured products.
 */

import type { Product } from "@/types/product";

const EXCLUDED_WATERMARK_KEYWORDS = [
  "SUN ROUND TABLE",
  "SEINA TABLE",
  "RECTANGULAR TABLE",
  "RETANGLE TABLE",
  "HAYMONT TABLE",
  "SANTOS",
  "-TAB-",
] as const;

const TITLE_TYPO_REPLACEMENTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bBROOKSC\b/gi, "BROOKS"],
  [/\bDINNING\b/gi, "DINING"],
  [/\bRETANGLE\b/gi, "RECTANGULAR"],
];

/**
 * Normalizes known legacy spelling typos in product titles without mutating raw data.
 */
export function formatProductDisplayTitle(rawTitle: string): string {
  if (!rawTitle) return "";
  return TITLE_TYPO_REPLACEMENTS.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    rawTitle
  ).trim();
}

/**
 * Returns true if the product matches known legacy assets carrying old watermarks.
 */
export function isExcludedLegacyProduct(product: Pick<Product, "name" | "code" | "slug">): boolean {
  const haystack = [
    product.name?.us || "",
    product.name?.uk || "",
    product.name?.vi || "",
    product.code || "",
    product.slug || "",
  ]
    .join(" ")
    .toUpperCase();

  return EXCLUDED_WATERMARK_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

/**
 * Returns true if the product is a standalone table rather than a full furniture collection/set.
 */
export function isStandaloneTableProduct(product: Pick<Product, "name" | "category">): boolean {
  const nameUs = (product.name?.us || "").trim().toUpperCase();
  const catUs = (product.category?.us || "").trim().toUpperCase();
  return catUs === "TABLES" || nameUs.endsWith(" TABLE");
}


