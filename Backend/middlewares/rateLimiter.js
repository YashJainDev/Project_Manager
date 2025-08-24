import { rateLimit } from 'express-rate-limit'

export default rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, //  maximum of 100 requests per windowMs
	legacyHeaders: true, // Configure the `X-RateLimit-*` headers.
})