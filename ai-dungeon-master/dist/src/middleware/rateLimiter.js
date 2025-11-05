"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = rateLimiter;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const dmRateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: 10,
    duration: 60,
    blockDuration: 30,
});
const generalRateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: 100,
    duration: 60,
    blockDuration: 60,
});
async function rateLimiter(req, res, next) {
    try {
        const limiter = req.path.includes('/dm/') ? dmRateLimiter : generalRateLimiter;
        const key = req.ip || 'unknown';
        await limiter.consume(key);
        next();
    }
    catch (rejRes) {
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
//# sourceMappingURL=rateLimiter.js.map