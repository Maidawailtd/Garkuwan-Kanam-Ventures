import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 60s)
  maxRequests?: number; // Max requests per window (default: 100)
  keyGenerator?: (req: Request) => string;
}

export function rateLimit(options: RateLimitOptions = {}) {
  const windowMs = options.windowMs ?? 60 * 1000; // 1 minute default
  const maxRequests = options.maxRequests ?? 100;
  const keyGenerator = options.keyGenerator ?? ((req: Request) => {
    return req.ip || req.socket.remoteAddress || 'unknown';
  });

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();

    // Initialize or get existing entry
    if (!store[key] || now > store[key].resetTime) {
      store[key] = {
        count: 0,
        resetTime: now + windowMs,
      };
    }

    store[key].count++;

    // Set rate limit headers
    const remaining = Math.max(0, maxRequests - store[key].count);
    const resetTime = store[key].resetTime;

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000));

    if (store[key].count > maxRequests) {
      res.status(429).json({
        error: 'Too many requests',
        message: 'Please try again after some time',
        retryAfter: Math.ceil((resetTime - now) / 1000),
      });
      return;
    }

    next();
  };
}

/**
 * Strict rate limiter for sensitive endpoints (checkout, payment verification)
 */
export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute
});

/**
 * Standard rate limiter for API endpoints
 */
export const standardRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
});

/**
 * Loose rate limiter for read-only endpoints
 */
export const looseRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 1000, // 1000 requests per minute
});
