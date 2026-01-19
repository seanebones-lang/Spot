/**
 * Database Client
 * Prisma client singleton with connection pooling
 * Use this for all database operations
 */

import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { withTimeout, TIMEOUTS } from './timeout';

// Prisma Client singleton - Edge runtime compatible
// Prevents multiple instances during hot reload in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Prisma Client singleton - optimized for edge runtime compatibility
// Uses binary engine (default) which works in both Node.js and Edge runtimes
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['warn', 'error'],
    errorFormat: 'pretty',
  });

/**
 * Execute Prisma query with timeout
 * Wraps database operations to prevent hanging queries
 */
export async function dbQueryWithTimeout<T>(
  query: Promise<T>,
  timeoutMs: number = TIMEOUTS.DATABASE_QUERY
): Promise<T> {
  return withTimeout(query, timeoutMs, 'Database query timeout');
}

// Handle connection errors gracefully
prisma.$on('error' as never, (e: unknown) => {
  logger.error('Prisma database error', e);
});

// In development, prevent multiple instances during hot reload
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Graceful shutdown
async function disconnect() {
  await prisma.$disconnect();
}

// Handle process termination
process.on('SIGTERM', disconnect);
process.on('SIGINT', disconnect);

export default prisma;
