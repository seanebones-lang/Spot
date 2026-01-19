/**
 * Database Client
 * Prisma client singleton with connection pooling
 * Use this for all database operations
 */

import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { withTimeout, TIMEOUTS } from './timeout';

// Prisma Client singleton pattern
// In development, prevent multiple instances during hot reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma Client singleton - optimized for edge runtime compatibility
// Uses binary engine (default) which works in both Node.js and Edge runtimes
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['warn', 'error']
        : ['error'],
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

// In development, prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown
async function disconnect() {
  await prisma.$disconnect();
}

// Handle process termination
process.on('SIGTERM', disconnect);
process.on('SIGINT', disconnect);

export default prisma;
