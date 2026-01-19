import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  sanitizeFilename,
  sanitizeString,
  isValidMimeType,
  isValidFileSize,
  ALLOWED_AUDIO_TYPES,
  ALLOWED_IMAGE_TYPES,
  mbToBytes,
  sanitizeObjectKeys,
} from "@/lib/sanitize";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { logger, generateCorrelationId } from "@/lib/logger";
import { getEnv } from "@/lib/env";
import { checkBodySize } from "@/lib/bodyLimit";
import { requireCsrfToken } from "@/lib/csrf";
import { uploadFile, calculateFileHash } from "@/lib/storage";
import prisma from "@/lib/db";

// File size limits (in MB, converted to bytes)
const MAX_AUDIO_SIZE = mbToBytes(50); // 50MB
const MAX_IMAGE_SIZE = mbToBytes(5); // 5MB

/**
 * API Route for Submitting Track Upload for Review
 * Handles track submission with file uploads (audio + cover art) and all metadata
 * Requires authentication
 * Rate limited: 10 requests per day
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(clientId, "/api/tracks/submit");
    if (!rateLimit.allowed) {
      logger.warn("Rate limit exceeded for track submission", {
        correlationId,
        clientId,
      });
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.resetTime),
            "Retry-After": String(
              Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
            ),
          },
        },
      );
    }

    // Require authentication
    let user;
    try {
      user = requireAuth(request);
    } catch (error) {
      logger.warn("Unauthorized track submission attempt", { correlationId });
      return NextResponse.json(
        { error: "Authentication required. Please log in to submit tracks." },
        { status: 401 },
      );
    }

    // Check if user is an approved artist
    // In production, check user.role === 'artist' && user.artistApproved === true
    // For now, allow any authenticated user

    // CSRF protection
    try {
      requireCsrfToken(request);
    } catch (error) {
      logger.warn("CSRF token validation failed for track submission", {
        correlationId,
      });
      return NextResponse.json(
        {
          error:
            "CSRF token validation failed. Please refresh the page and try again.",
        },
        { status: 403 },
      );
    }

    // Check body size (for file uploads, this is a soft limit)
    const bodySizeCheck = checkBodySize(request);
    if (!bodySizeCheck.valid) {
      return NextResponse.json(
        { error: bodySizeCheck.error },
        { status: 413 }, // 413 Payload Too Large
      );
    }

    // Parse FormData
    const formDataObj = await request.formData();

    // Get metadata payload first
    const payloadStr = formDataObj.get("payload") as string;
    if (!payloadStr) {
      return NextResponse.json(
        { error: "Missing metadata payload" },
        { status: 400 },
      );
    }

    let formData: any;
    try {
      formData = JSON.parse(payloadStr);
      // Sanitize object keys to prevent prototype pollution
      formData = sanitizeObjectKeys(formData);
    } catch (error) {
      logger.warn("Invalid JSON payload", { correlationId, error });
      return NextResponse.json(
        { error: "Invalid metadata payload format" },
        { status: 400 },
      );
    }

    const releaseType = formData.releaseType || "single";

    // Validate release type
    if (!["single", "ep", "lp"].includes(releaseType)) {
      return NextResponse.json(
        { error: "Invalid release type. Must be single, ep, or lp" },
        { status: 400 },
      );
    }

    // Get files based on release type
    const audioFile =
      releaseType === "single"
        ? (formDataObj.get("audioFile") as File | null)
        : null;
    const coverArtFile = formDataObj.get("coverArtFile") as File | null;

    // For EP/LP, get all track files
    const trackFiles: File[] = [];
    if (releaseType !== "single") {
      let index = 0;
      let trackFile = formDataObj.get(`track_${index}_file`) as File | null;
      while (trackFile) {
        trackFiles.push(trackFile);
        index++;
        trackFile = formDataObj.get(`track_${index}_file`) as File | null;
      }
    }

    // Validate and sanitize required fields
    if (releaseType === "single") {
      if (!formData.metadata || !formData.metadata.trackName) {
        return NextResponse.json(
          { error: "Track name is required" },
          { status: 400 },
        );
      }
      // Sanitize track name
      formData.metadata.trackName = sanitizeString(formData.metadata.trackName);

      if (!audioFile) {
        return NextResponse.json(
          { error: "Audio file is required" },
          { status: 400 },
        );
      }

      // Validate audio file
      if (!isValidMimeType(audioFile.type, ALLOWED_AUDIO_TYPES)) {
        logger.warn("Invalid audio file type", {
          correlationId,
          mimeType: audioFile.type,
        });
        return NextResponse.json(
          {
            error: `Invalid audio file type. Allowed types: ${ALLOWED_AUDIO_TYPES.join(", ")}`,
          },
          { status: 400 },
        );
      }

      if (!isValidFileSize(audioFile.size, MAX_AUDIO_SIZE)) {
        return NextResponse.json(
          {
            error: `Audio file too large. Maximum size is ${MAX_AUDIO_SIZE / mbToBytes(1)}MB`,
          },
          { status: 400 },
        );
      }
    } else {
      if (!formData.metadata || !formData.metadata.albumName) {
        return NextResponse.json(
          {
            error: `${releaseType === "ep" ? "EP" : "Album"} name is required`,
          },
          { status: 400 },
        );
      }
      // Sanitize album name
      formData.metadata.albumName = sanitizeString(formData.metadata.albumName);

      if (!formData.tracks || formData.tracks.length === 0) {
        return NextResponse.json(
          { error: "At least one track is required" },
          { status: 400 },
        );
      }
      if (trackFiles.length !== formData.tracks.length) {
        return NextResponse.json(
          { error: "Number of track files must match number of tracks" },
          { status: 400 },
        );
      }
      const minTracks = releaseType === "ep" ? 2 : 7;
      if (formData.tracks.length < minTracks) {
        return NextResponse.json(
          {
            error: `${releaseType === "ep" ? "EP" : "Album"} must have at least ${minTracks} tracks`,
          },
          { status: 400 },
        );
      }

      // Validate all track files
      for (let i = 0; i < trackFiles.length; i++) {
        const trackFile = trackFiles[i];
        if (!isValidMimeType(trackFile.type, ALLOWED_AUDIO_TYPES)) {
          logger.warn("Invalid audio file type in track", {
            correlationId,
            index: i,
            mimeType: trackFile.type,
          });
          return NextResponse.json(
            { error: `Track ${i + 1}: Invalid audio file type` },
            { status: 400 },
          );
        }
        if (!isValidFileSize(trackFile.size, MAX_AUDIO_SIZE)) {
          return NextResponse.json(
            {
              error: `Track ${i + 1}: File too large. Maximum size is ${MAX_AUDIO_SIZE / mbToBytes(1)}MB`,
            },
            { status: 400 },
          );
        }
      }
    }

    // Validate cover art if provided
    if (coverArtFile) {
      if (!isValidMimeType(coverArtFile.type, ALLOWED_IMAGE_TYPES)) {
        logger.warn("Invalid cover art file type", {
          correlationId,
          mimeType: coverArtFile.type,
        });
        return NextResponse.json(
          {
            error: `Invalid cover art file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
          },
          { status: 400 },
        );
      }
      if (!isValidFileSize(coverArtFile.size, MAX_IMAGE_SIZE)) {
        return NextResponse.json(
          {
            error: `Cover art file too large. Maximum size is ${MAX_IMAGE_SIZE / mbToBytes(1)}MB`,
          },
          { status: 400 },
        );
      }
    }

    if (!formData.artistMoodTags || !formData.artistMoodTags.mood) {
      return NextResponse.json(
        { error: "Mood tags are required" },
        { status: 400 },
      );
    }

    if (!formData.legalWarranties) {
      return NextResponse.json(
        { error: "Legal warranties are required" },
        { status: 400 },
      );
    }

    // Validate all legal warranties are checked
    const requiredWarranties = [
      "ownsMasterRights",
      "isOriginalComposition",
      "samplesCleared",
      "hasMechanicalLicenses",
      "agreesToIndemnify",
    ];

    const missingWarranties = requiredWarranties.filter(
      (warranty) => !formData.legalWarranties[warranty],
    );

    if (missingWarranties.length > 0) {
      return NextResponse.json(
        {
          error: "All legal warranties must be accepted",
          missingWarranties,
        },
        { status: 400 },
      );
    }

    // Generate submission ID (UUID-like format)
    const submissionId =
      releaseType === "single"
        ? `TRK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        : `${releaseType.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Upload audio file(s) to cloud storage
    let audioFileUrl: string | null = null;
    let audioFileUrls: string[] = [];
    let audioFileChecksum: string | null = null;
    let audioFileChecksums: string[] = [];
    let coverArtUrl: string | null = null;
    let coverArtChecksum: string | null = null;

    try {
      if (releaseType === "single" && audioFile) {
        // Single track
        const sanitizedOriginalName = sanitizeFilename(audioFile.name);
        const audioExtension = sanitizedOriginalName.split(".").pop() || "mp3";
        const audioBuffer = Buffer.from(await audioFile.arrayBuffer());

        // Calculate checksum before upload
        audioFileChecksum = calculateFileHash(audioBuffer);

        // Upload to cloud storage
        const storageKey = `audio/${submissionId}/audio.${audioExtension}`;
        const uploadResult = await uploadFile(
          audioBuffer,
          storageKey,
          audioFile.type,
          true, // Public access
        );

        audioFileUrl = uploadResult.url;

        logger.info("Audio file uploaded to cloud storage", {
          correlationId,
          submissionId,
          key: storageKey,
          checksum: uploadResult.checksum,
          size: uploadResult.size,
        });
      } else if (releaseType !== "single" && trackFiles.length > 0) {
        // Multiple tracks for EP/LP
        for (let i = 0; i < trackFiles.length; i++) {
          const trackFile = trackFiles[i];
          const trackInfo = formData.tracks[i];
          const sanitizedOriginalName = sanitizeFilename(trackFile.name);
          const audioExtension =
            sanitizedOriginalName.split(".").pop() || "mp3";
          const trackNumber = trackInfo?.trackNumber || i + 1;
          const audioBuffer = Buffer.from(await trackFile.arrayBuffer());

          // Calculate checksum
          const checksum = calculateFileHash(audioBuffer);
          audioFileChecksums.push(checksum);

          // Upload to cloud storage
          const storageKey = `audio/${submissionId}/track_${trackNumber}.${audioExtension}`;
          const uploadResult = await uploadFile(
            audioBuffer,
            storageKey,
            trackFile.type,
            true, // Public access
          );

          audioFileUrls.push(uploadResult.url);

          logger.info("Track file uploaded to cloud storage", {
            correlationId,
            submissionId,
            trackNumber,
            key: storageKey,
            checksum: uploadResult.checksum,
            size: uploadResult.size,
          });
        }
      }

      // Upload cover art file (if provided) to cloud storage
      if (coverArtFile) {
        const sanitizedOriginalName = sanitizeFilename(coverArtFile.name);
        const coverArtExtension =
          sanitizedOriginalName.split(".").pop() || "jpg";
        const coverArtBuffer = Buffer.from(await coverArtFile.arrayBuffer());

        // Calculate checksum
        coverArtChecksum = calculateFileHash(coverArtBuffer);

        // Upload to cloud storage
        const storageKey = `cover-art/${submissionId}/cover.${coverArtExtension}`;
        const uploadResult = await uploadFile(
          coverArtBuffer,
          storageKey,
          coverArtFile.type,
          true, // Public access
        );

        coverArtUrl = uploadResult.url;

        logger.info("Cover art uploaded to cloud storage", {
          correlationId,
          submissionId,
          key: storageKey,
          checksum: uploadResult.checksum,
          size: uploadResult.size,
        });
      }
    } catch (uploadError) {
      // If cloud storage is not configured, return helpful error
      if (
        uploadError instanceof Error &&
        uploadError.message.includes("Cloud storage not configured")
      ) {
        logger.error(
          "Cloud storage not configured for file upload",
          uploadError,
          { correlationId },
        );
        return NextResponse.json(
          {
            error:
              "File storage is not configured. Please configure S3 or R2 storage for file uploads.",
            details:
              process.env.NODE_ENV === "development"
                ? uploadError.message
                : undefined,
          },
          { status: 500 },
        );
      }

      // Re-throw other errors to be caught by outer catch
      throw uploadError;
    }

    // Sanitize metadata fields
    if (formData.metadata) {
      if (formData.metadata.artistFullLegalName) {
        formData.metadata.artistFullLegalName = sanitizeString(
          formData.metadata.artistFullLegalName,
        );
      }
      // Sanitize other string fields as needed
    }

    // Store checksums in metadata for integrity verification
    const metadataWithChecksums = {
      ...(formData.metadata || {}),
      fileChecksums: {
        audio:
          releaseType === "single" ? audioFileChecksum : audioFileChecksums,
        coverArt: coverArtChecksum,
      },
    };

    // Save submission to database
    const submissionRecord = await prisma.trackSubmission.create({
      data: {
        submissionId,
        userId: user.userId,
        releaseType: releaseType.toUpperCase() as "SINGLE" | "EP" | "LP",
        trackName:
          releaseType === "single" ? formData.metadata.trackName : null,
        albumName:
          releaseType !== "single" ? formData.metadata.albumName : null,
        artistName: formData.metadata.artistFullLegalName,
        audioFileUrl: releaseType === "single" ? audioFileUrl : null,
        audioFileUrls: releaseType !== "single" ? audioFileUrls : [],
        audioFileName:
          releaseType === "single" ? audioFile?.name || null : null,
        audioFileSize:
          releaseType === "single" ? audioFile?.size || null : null,
        audioFileType:
          releaseType === "single" ? audioFile?.type || null : null,
        coverArtUrl: coverArtUrl || null,
        coverArtFileName: coverArtFile?.name || null,
        coverArtFileSize: coverArtFile?.size || null,
        status: "PUBLISHED",
        publishedAt: new Date(),
        // Store complex objects as JSON (including checksums)
        metadata: metadataWithChecksums,
        moodTags: formData.artistMoodTags || null,
        tracks: releaseType !== "single" ? formData.tracks || null : null,
        composers: formData.composers || null,
        lyricists: formData.lyricists || null,
        publishers: formData.publishers || null,
        rightsMetadata: formData.rightsMetadata || null,
        legalWarranties: formData.legalWarranties || null,
      },
    });

    // Log publication
    const totalFileSize =
      releaseType === "single"
        ? (audioFile?.size || 0) + (coverArtFile?.size || 0)
        : trackFiles.reduce((sum, f) => sum + f.size, 0) +
          (coverArtFile?.size || 0);

    const duration = Date.now() - startTime;
    logger.info("Track published", {
      correlationId,
      submissionId,
      userId: user.userId,
      releaseType,
      trackName:
        releaseType === "single"
          ? formData.metadata?.trackName
          : formData.metadata?.albumName,
      totalFileSize,
      duration,
    });

    return NextResponse.json({
      success: true,
      submissionId: submissionRecord.submissionId,
      message: "Track published successfully and is now live",
      submission: {
        id: submissionRecord.id,
        submissionId: submissionRecord.submissionId,
        status: submissionRecord.status,
        submittedAt: submissionRecord.submittedAt,
        publishedAt: submissionRecord.publishedAt,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Error submitting track", error, { correlationId, duration });
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while submitting your track. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 },
    );
  }
}
