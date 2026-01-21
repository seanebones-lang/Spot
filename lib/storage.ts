/**
 * Cloud Storage Integration
 * Supports AWS S3 and Cloudflare R2 (S3-compatible)
 * Handles file uploads with integrity verification
 */

<<<<<<< HEAD
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createHash } from "crypto";
import { logger } from "./logger";
import { getEnv } from "./env";
=======
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createHash } from 'crypto';
import { logger } from './logger';
import { getEnv } from './env';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

// Storage client singleton
let s3Client: S3Client | null = null;

/**
 * Initialize S3 client (AWS S3 or Cloudflare R2)
 */
function getS3Client(): S3Client | null {
  if (s3Client) {
    return s3Client;
  }

  // Try Cloudflare R2 first (cheaper alternative)
  const r2AccountId = process.env.R2_ACCOUNT_ID;
  const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID;
  const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const r2Endpoint = process.env.R2_ENDPOINT;

  if (r2AccountId && r2AccessKeyId && r2SecretAccessKey && r2Endpoint) {
    s3Client = new S3Client({
<<<<<<< HEAD
      region: "auto",
=======
      region: 'auto',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      endpoint: r2Endpoint,
      credentials: {
        accessKeyId: r2AccessKeyId,
        secretAccessKey: r2SecretAccessKey,
      },
    });
<<<<<<< HEAD
    logger.info("Initialized Cloudflare R2 storage client");
=======
    logger.info('Initialized Cloudflare R2 storage client');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return s3Client;
  }

  // Fall back to AWS S3
  const awsRegion = process.env.AWS_REGION;
  const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (awsRegion && awsAccessKeyId && awsSecretAccessKey) {
    s3Client = new S3Client({
      region: awsRegion,
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      },
    });
<<<<<<< HEAD
    logger.info("Initialized AWS S3 storage client");
    return s3Client;
  }

  logger.warn(
    "No cloud storage configured. File uploads will fail. Set R2_* or AWS_* environment variables.",
  );
=======
    logger.info('Initialized AWS S3 storage client');
    return s3Client;
  }

  logger.warn('No cloud storage configured. File uploads will fail. Set R2_* or AWS_* environment variables.');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return null;
}

/**
 * Get bucket name from environment
 */
function getBucketName(): string | null {
  return process.env.R2_BUCKET_NAME || process.env.AWS_S3_BUCKET || null;
}

/**
 * Calculate file checksum (SHA-256)
 */
export function calculateFileHash(buffer: Buffer): string {
<<<<<<< HEAD
  return createHash("sha256").update(buffer).digest("hex");
=======
  return createHash('sha256').update(buffer).digest('hex');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

/**
 * Upload file to cloud storage
 */
export interface UploadResult {
  url: string;
  key: string;
  checksum: string;
  size: number;
}

export async function uploadFile(
  buffer: Buffer,
  key: string,
  contentType: string,
<<<<<<< HEAD
  makePublic: boolean = true,
=======
  makePublic: boolean = true
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
): Promise<UploadResult> {
  const client = getS3Client();
  const bucket = getBucketName();

  if (!client || !bucket) {
<<<<<<< HEAD
    throw new Error(
      "Cloud storage not configured. Set R2_* or AWS_* environment variables.",
    );
=======
    throw new Error('Cloud storage not configured. Set R2_* or AWS_* environment variables.');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  // Calculate file checksum for integrity verification
  const checksum = calculateFileHash(buffer);

  // Upload file
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
<<<<<<< HEAD
    ...(makePublic ? { ACL: "public-read" } : {}), // Public read for R2, use signed URLs for private files
    // Store checksum as metadata for verification
    Metadata: {
      checksum: checksum,
=======
    ...(makePublic ? { ACL: 'public-read' } : {}), // Public read for R2, use signed URLs for private files
    // Store checksum as metadata for verification
    Metadata: {
      'checksum': checksum,
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    },
  });

  await client.send(command);

  // Construct public URL
  let url: string;
  if (process.env.R2_ENDPOINT && process.env.R2_PUBLIC_URL) {
    // Cloudflare R2 with custom domain
    url = `${process.env.R2_PUBLIC_URL}/${key}`;
  } else if (process.env.R2_ENDPOINT) {
    // Cloudflare R2 direct endpoint
    url = `${process.env.R2_ENDPOINT}/${bucket}/${key}`;
  } else {
    // AWS S3
<<<<<<< HEAD
    const region = process.env.AWS_REGION || "us-east-1";
    url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }

  logger.info("File uploaded to cloud storage", {
    key,
    size: buffer.length,
    checksum,
  });
=======
    const region = process.env.AWS_REGION || 'us-east-1';
    url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }

  logger.info('File uploaded to cloud storage', { key, size: buffer.length, checksum });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

  return {
    url,
    key,
    checksum,
    size: buffer.length,
  };
}

/**
 * Generate signed URL for private file access (valid for 1 hour)
 */
<<<<<<< HEAD
export async function getSignedFileUrl(
  key: string,
  expiresIn: number = 3600,
): Promise<string> {
=======
export async function getSignedFileUrl(key: string, expiresIn: number = 3600): Promise<string> {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const client = getS3Client();
  const bucket = getBucketName();

  if (!client || !bucket) {
<<<<<<< HEAD
    throw new Error("Cloud storage not configured");
=======
    throw new Error('Cloud storage not configured');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const url = await getSignedUrl(client, command, { expiresIn });
  return url;
}

/**
 * Delete file from cloud storage
 */
export async function deleteFile(key: string): Promise<void> {
  const client = getS3Client();
  const bucket = getBucketName();

  if (!client || !bucket) {
<<<<<<< HEAD
    throw new Error("Cloud storage not configured");
=======
    throw new Error('Cloud storage not configured');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  await client.send(command);
<<<<<<< HEAD
  logger.info("File deleted from cloud storage", { key });
=======
  logger.info('File deleted from cloud storage', { key });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

/**
 * Verify file integrity using stored checksum
 */
<<<<<<< HEAD
export async function verifyFileIntegrity(
  key: string,
  expectedChecksum: string,
): Promise<boolean> {
=======
export async function verifyFileIntegrity(key: string, expectedChecksum: string): Promise<boolean> {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const client = getS3Client();
  const bucket = getBucketName();

  if (!client || !bucket) {
    return false;
  }

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await client.send(command);
    const storedChecksum = response.Metadata?.checksum;

    if (!storedChecksum) {
<<<<<<< HEAD
      logger.warn("No checksum metadata found for file", { key });
=======
      logger.warn('No checksum metadata found for file', { key });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return false;
    }

    return storedChecksum === expectedChecksum;
  } catch (error) {
<<<<<<< HEAD
    logger.error("Error verifying file integrity", error, { key });
=======
    logger.error('Error verifying file integrity', error, { key });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return false;
  }
}
