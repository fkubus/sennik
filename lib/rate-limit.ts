import "server-only";
import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const redis = isConfigured ? Redis.fromEnv() : null;

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
function createRateLimiter(prefix: string, limit: number, window: Duration) {
  const limiter = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, window),
        prefix: `sennik:${prefix}`,
      })
    : null;

  return async (identifier: string): Promise<RateLimitResult> => {
    if (!limiter) {
      return { success: true, limit: Infinity, remaining: Infinity };
    }
    return limiter.limit(identifier);
  };
}

export const checkInterpretRateLimit = createRateLimiter(
  "interpret",
  5,
  "10 m",
);
export const checkAuthRateLimit = createRateLimiter("auth", 5, "15 m");
