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

// Lazy Prisma Client getter - only creates client when actually accessed
// This prevents build-time instantiation errors when DATABASE_URL is not available
function getPrismaClient(): PrismaClient {
  if (globalThis.prisma) {
    return globalThis.prisma;
  }

  // During build, if DATABASE_URL is not set, Prisma 7 requires adapter/accelerateUrl
  // We'll create client anyway - it will fail at runtime if DATABASE_URL is missing
  // This allows Next.js build to complete (build doesn't execute API routes)
  const client = new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['warn', 'error'],
    errorFormat: 'pretty',
  });

  // Cache in global for development hot reload
  if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
  }

  return client;
}

// Export as Proxy to defer instantiation until runtime
// This prevents PrismaClient from being created during Next.js build analysis
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
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
// Skip during build to avoid Proxy access issues
if (typeof window === 'undefined') {
  try {
    const client = getPrismaClient();
    client.$on('error' as never, (e: unknown) => {
      logger.error('Prisma database error', e);
    });
  } catch (e) {
    // Ignore during build
  }
}

// In development, prevent multiple instances during hot reload
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Graceful shutdown (only at runtime)
if (typeof window === 'undefined') {
  async function disconnect() {
    try {
      const client = getPrismaClient();
      await client.$disconnect();
    } catch (e) {
      // Ignore during build
    }
  }

  process.on('SIGTERM', disconnect);
  process.on('SIGINT', disconnect);
}

export default prisma;
