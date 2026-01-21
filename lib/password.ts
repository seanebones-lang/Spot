/**
 * Password Hashing Utilities
 * Uses bcrypt for secure password hashing
 */

<<<<<<< HEAD
import { hash, compare } from "bcryptjs";
=======
import { hash, compare } from 'bcryptjs';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

const SALT_ROUNDS = 12; // Recommended for 2025-2026 security standards

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
<<<<<<< HEAD
  if (!password || typeof password !== "string") {
    throw new Error("Password must be a non-empty string");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

=======
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }
  
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
<<<<<<< HEAD
  hashedPassword: string,
=======
  hashedPassword: string
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
): Promise<boolean> {
  if (!password || !hashedPassword) {
    return false;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  try {
    return await compare(password, hashedPassword);
  } catch {
    return false;
  }
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
<<<<<<< HEAD

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (password.length > 128) {
    errors.push("Password must be less than 128 characters");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

=======
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Optional: special characters (not required for basic security)
  // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  //   errors.push('Password must contain at least one special character');
  // }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return {
    valid: errors.length === 0,
    errors,
  };
}
