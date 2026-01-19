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

// Prisma 7: Runtime-only initialization to avoid build-time errors
// During Next.js build, API routes are analyzed but DATABASE_URL may not be available
// We'll use a function-based approach that only creates client when actually called
function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  // Prisma 7: If DATABASE_URL is not set, Prisma will throw at runtime
  // This is acceptable - build will complete, runtime will handle the error
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
}

// Export a Proxy that lazily creates the client only when accessed
// This prevents PrismaClient from being instantiated during Next.js build analysis
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    // Only create client when actually accessed (runtime)
    const client = getPrismaClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
  set(_target, prop, value) {
    const client = getPrismaClient();
    (client as any)[prop] = value;
    return true;
  },
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

// Handle connection errors gracefully (only at runtime)
if (typeof window === 'undefined') {
  // Only in Node.js environment (server-side)
  try {
    const client = getPrismaClient();
    client.$on('error' as never, (e: unknown) => {
      logger.error('Prisma database error', e);
    });
  } catch (e) {
    // Ignore errors during build
  }
}

// Graceful shutdown (only at runtime)
if (typeof window === 'undefined') {
  async function disconnect() {
    try {
      const client = getPrismaClient();
      await client.$disconnect();
    } catch (e) {
      // Ignore errors during build
    }
  }

  process.on('SIGTERM', disconnect);
  process.on('SIGINT', disconnect);
}

export default prisma;
