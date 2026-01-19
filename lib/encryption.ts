/**
 * Data Encryption Utilities
 * Encrypts sensitive data before storage (e.g., W-9 tax forms)
 * Uses AES-256-GCM for authenticated encryption
 */

import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from "crypto";
import { logger } from "./logger";

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32; // 32 bytes for AES-256
const IV_LENGTH = 16; // 16 bytes for AES-GCM
const AUTH_TAG_LENGTH = 16; // 16 bytes for GCM authentication tag

/**
 * Get encryption key from environment
 * Falls back to JWT_SECRET if ENCRYPTION_KEY not set (not recommended for production)
 */
function getEncryptionKey(): Buffer {
  const encryptionKey = process.env.ENCRYPTION_KEY;

  if (encryptionKey) {
    // Expect hex-encoded 64-character string (32 bytes)
    if (encryptionKey.length !== 64) {
      throw new Error("ENCRYPTION_KEY must be 64 hex characters (32 bytes)");
    }

    try {
      return Buffer.from(encryptionKey, "hex");
    } catch (error) {
      throw new Error("ENCRYPTION_KEY must be valid hex string");
    }
  }

  // Fallback: derive key from JWT_SECRET (not recommended for production)
  if (process.env.JWT_SECRET) {
    logger.warn(
      "Using JWT_SECRET as encryption key. Set ENCRYPTION_KEY for production.",
    );
    // Derive 32-byte key from JWT_SECRET using SHA-256
    return createHash("sha256").update(process.env.JWT_SECRET).digest();
  }

  throw new Error(
    "ENCRYPTION_KEY or JWT_SECRET must be set. " +
      "For production, set ENCRYPTION_KEY (64 hex characters).",
  );
}

/**
 * Encrypt data
 * Returns encrypted data with IV and auth tag (base64 encoded)
 */
export function encrypt(data: string): string {
  try {
    const key = getEncryptionKey();
    const iv = randomBytes(IV_LENGTH);

    const cipher = createCipheriv(ALGORITHM, key, iv);

    // Encrypt data
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");

    // Get authentication tag
    const authTag = cipher.getAuthTag();

    // Combine IV + authTag + encrypted data
    // Format: base64(iv:authTag:encryptedData)
    const combined = Buffer.concat([
      iv,
      authTag,
      Buffer.from(encrypted, "base64"),
    ]);

    return combined.toString("base64");
  } catch (error) {
    logger.error("Encryption failed", error);
    throw new Error("Failed to encrypt data");
  }
}

/**
 * Decrypt data
 * Expects base64 encoded string with IV + authTag + encrypted data
 */
export function decrypt(encryptedData: string): string {
  try {
    const key = getEncryptionKey();

    // Decode base64
    const combined = Buffer.from(encryptedData, "base64");

    // Extract components
    const iv = combined.subarray(0, IV_LENGTH);
    const authTag = combined.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const encrypted = combined.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    // Decrypt data
    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    logger.error("Decryption failed", error);
    throw new Error(
      "Failed to decrypt data. Data may be corrupted or key may be incorrect.",
    );
  }
}

/**
 * Encrypt JSON object
 */
export function encryptJson<T>(data: T): string {
  const jsonString = JSON.stringify(data);
  return encrypt(jsonString);
}

/**
 * Decrypt JSON object
 */
export function decryptJson<T>(encryptedData: string): T {
  const jsonString = decrypt(encryptedData);
  return JSON.parse(jsonString) as T;
}

/**
 * Check if encryption is properly configured
 */
export function isEncryptionConfigured(): boolean {
  try {
    getEncryptionKey();
    return true;
  } catch {
    return false;
  }
}
