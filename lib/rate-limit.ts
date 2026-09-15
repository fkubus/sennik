import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const interpretRatelimit = isConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "sennik:interpret",
    })
  : null;

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
}

/**
 * Bez skonfigurowanego Upstash (np. lokalny dev bez kluczy) limiter jest
 * pominięty — endpoint działa, ale bez ochrony przed nadużyciem. W produkcji
 * UPSTASH_REDIS_REST_URL/TOKEN muszą być ustawione (patrz .env.example).
 */
export async function checkInterpretRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  if (!interpretRatelimit) {
    return { success: true, limit: Infinity, remaining: Infinity };
  }

  const result = await interpretRatelimit.limit(identifier);
  return result;
}
