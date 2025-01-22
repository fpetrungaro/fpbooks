import rateLimit from "express-rate-limit";


export const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 500, // Limit each IP to 100 requests per window
    standardHeaders: true, // Adds `RateLimit-*` headers (RFC standard)
    legacyHeaders: false, // Disable `X-RateLimit-*` headers (deprecated)
    message: { error: "Too many requests, please try again later." },
});