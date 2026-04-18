/**
 * Simple server-side in-memory cache with TTL.
 * Prevents redundant DB queries during dev mode
 * (where getStaticProps runs on every request).
 *
 * In production with ISR, the cache still helps during
 * revalidation bursts when multiple requests hit simultaneously.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();

/**
 * Get or set a cached value.
 * @param key   Unique cache key
 * @param ttlMs Time-to-live in milliseconds (default 30s)
 * @param fn    Async function to compute value on cache miss
 */
export async function cached<T>(
  key: string,
  ttlMs: number,
  fn: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const existing = store.get(key) as CacheEntry<T> | undefined;

  if (existing && existing.expiresAt > now) {
    return existing.data;
  }

  const data = await fn();
  store.set(key, { data, expiresAt: now + ttlMs });
  return data;
}

/** Invalidate a specific key */
export function invalidateCache(key: string): void {
  store.delete(key);
}

/** Invalidate all keys */
export function clearCache(): void {
  store.clear();
}
