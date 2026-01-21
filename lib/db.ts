/**
 * Database Client
 * Prisma client singleton with connection pooling
 * Use this for all database operations
 */

<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";
import { withTimeout, TIMEOUTS } from "./timeout";
=======
import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { withTimeout, TIMEOUTS } from './timeout';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

// Prisma Client singleton - Edge runtime compatible with binary engine
// Prevents multiple instances during hot reload in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Prisma Client factory function - creates client with binary engine
// Only called when actually accessed (lazy initialization)
function getPrismaClient(): PrismaClient {
  if (globalThis.prisma) {
    return globalThis.prisma;
  }

  const client = new PrismaClient({
    log:
<<<<<<< HEAD
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["warn", "error"],
    errorFormat: "pretty",
  });

  // Cache in global for development hot reload
  if (process.env.NODE_ENV !== "production") {
=======
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['warn', 'error'],
    errorFormat: 'pretty',
  });

  // Cache in global for development hot reload
  if (process.env.NODE_ENV !== 'production') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    globalThis.prisma = client;
  }

  return client;
}

// Export as Proxy to defer instantiation until runtime
// This prevents PrismaClient from being created during Next.js build analysis
// The binary engine still requires DATABASE_URL at runtime, but not during build
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = (client as any)[prop];
<<<<<<< HEAD
    return typeof value === "function" ? value.bind(client) : value;
=======
    return typeof value === 'function' ? value.bind(client) : value;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
  timeoutMs: number = TIMEOUTS.DATABASE_QUERY,
): Promise<T> {
  return withTimeout(query, timeoutMs, "Database query timeout");
}

// Handle connection errors gracefully (only at runtime, not during build)
if (typeof window === "undefined") {
  try {
    const client = getPrismaClient();
    client.$on("error" as never, (e: unknown) => {
      logger.error("Prisma database error", e);
=======
  timeoutMs: number = TIMEOUTS.DATABASE_QUERY
): Promise<T> {
  return withTimeout(query, timeoutMs, 'Database query timeout');
}

// Handle connection errors gracefully (only at runtime, not during build)
if (typeof window === 'undefined') {
  try {
    const client = getPrismaClient();
    client.$on('error' as never, (e: unknown) => {
      logger.error('Prisma database error', e);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    });
  } catch (e) {
    // Ignore during build - client not needed until runtime
  }
}

// Graceful shutdown (only at runtime)
<<<<<<< HEAD
if (typeof window === "undefined") {
=======
if (typeof window === 'undefined') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  async function disconnect() {
    try {
      const client = getPrismaClient();
      await client.$disconnect();
    } catch (e) {
      // Ignore during build
    }
  }

<<<<<<< HEAD
  process.on("SIGTERM", disconnect);
  process.on("SIGINT", disconnect);
=======
  process.on('SIGTERM', disconnect);
  process.on('SIGINT', disconnect);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

export default prisma;
