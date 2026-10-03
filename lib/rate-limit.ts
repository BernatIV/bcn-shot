/**
 * Límit de peticions en memòria (finestra fixa per clau).
 * Suficient per a un sol procés. En hosting serverless amb múltiples instàncies
 * el límit és per instància: si cal més, substituir per un magatzem compartit.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();

  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  bucket.count += 1;
  return { ok: bucket.count <= limit };
}
