/**
 * Startup Validation
 * Validates environment variables and configuration on application startup
 * This should be imported early in the application lifecycle
 */

<<<<<<< HEAD
import { validateEnv } from "./env";
import { logger } from "./logger";
=======
import { validateEnv } from './env';
import { logger } from './logger';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

let validated = false;

/**
 * Validate environment on startup
 * Call this early in your application (e.g., in a server component or API route handler)
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * In Next.js, you can call this in:
 * - A server component that runs on every request
 * - An API route that runs on startup
 * - Or create a custom server file
 */
export function validateStartup(): void {
  if (validated) {
    return; // Only validate once
  }

  try {
    validateEnv();
    validated = true;
<<<<<<< HEAD
    logger.info("Startup validation passed", {
=======
    logger.info('Startup validation passed', {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    validated = false;
<<<<<<< HEAD
    logger.error("Startup validation failed", error, {
=======
    logger.error('Startup validation failed', error, {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
    // Re-throw to prevent app from starting with invalid configuration
    throw error;
  }
}

/**
 * Check if startup validation has been performed
 */
export function isStartupValidated(): boolean {
  return validated;
}
