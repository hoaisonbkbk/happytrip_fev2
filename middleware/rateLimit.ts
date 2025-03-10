import { rateLimit } from '~/utils/rateLimit';

export default defineEventHandler((event) => {
  const ip = getRequestIP(event);
  if (rateLimit.exceedsLimit(ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests'
    });
  }
}); 