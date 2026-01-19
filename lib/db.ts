/**
 * Database Client
 * Prisma client singleton with connection pooling
 * Use this for all database operations
 */

import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { withTimeout, TIMEOUTS } from './timeout';

// Prisma Client singleton - Edge runtime compatible with binary engine
// Prevents multiple instances during hot reload in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Prisma Client factory function - creates client with binary engine
const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['warn', 'error'],
    errorFormat: 'pretty',
  });
};

// Global singleton pattern - edge runtime compatible
declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Export singleton - lazy initialization prevents build-time errors
export const prisma = globalThis.prisma ?? prismaClientSingleton();

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
