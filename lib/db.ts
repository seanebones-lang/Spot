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

// Prisma 7: Conditional initialization to avoid build-time errors
// During Next.js build, API routes are analyzed but DATABASE_URL may not be available
// We'll create the client only when DATABASE_URL is present, otherwise return a no-op proxy
const createPrismaClient = (): PrismaClient | null => {
  // During build, if DATABASE_URL is not set, return null
  // This allows the build to complete, and runtime will handle the error
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    errorFormat: 'pretty',
  });

  // Cache in global for development hot reload
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }

  return client;
};

// Export a getter function that creates client on demand
let _prismaInstance: PrismaClient | null = null;

export const prisma = (() => {
  if (_prismaInstance) return _prismaInstance;
  
  const client = createPrismaClient();
  if (!client) {
    // During build, return a mock that will fail at runtime
    // This allows Next.js build to complete
    return {} as PrismaClient;
  }
  
  _prismaInstance = client;
  return client;
})() as PrismaClient;

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
