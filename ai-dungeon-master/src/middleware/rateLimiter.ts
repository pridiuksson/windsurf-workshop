import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
import { createError } from './errorHandler';

// Rate limiter for DM requests (more restrictive)
const dmRateLimiter = new RateLimiterMemory({
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
  blockDuration: 30, // Block for 30 seconds if limit exceeded
});

// Rate limiter for general requests
const generalRateLimiter = new RateLimiterMemory({
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds
  blockDuration: 60, // Block for 60 seconds if limit exceeded
});

export async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Use stricter rate limiting for DM endpoints
    const limiter = req.path.includes('/dm/') ? dmRateLimiter : generalRateLimiter;
    const key = req.ip || 'unknown';
    
    await limiter.consume(key);
    next();
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    
    res.set('Retry-After', String(secs));
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests, please try again later.',
        retryAfter: secs
      }
    });
  }
}
