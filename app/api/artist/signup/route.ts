<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { logger, generateCorrelationId } from "@/lib/logger";
import {
  sanitizeString,
  sanitizeEmail,
  sanitizeObjectKeys,
} from "@/lib/sanitize";
import { checkBodySize } from "@/lib/bodyLimit";
import { requireCsrfToken } from "@/lib/csrf";
import { encryptJson } from "@/lib/encryption";
import prisma from "@/lib/db";
=======
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger, generateCorrelationId } from '@/lib/logger';
import { sanitizeString, sanitizeEmail, sanitizeObjectKeys } from '@/lib/sanitize';
import { checkBodySize } from '@/lib/bodyLimit';
import { requireCsrfToken } from '@/lib/csrf';
import { encryptJson } from '@/lib/encryption';
import prisma from '@/lib/db';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Artist Signup Submission API
 * Submits artist signup application for approval
 * Requires authentication
 * Rate limited: 5 requests per day
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  try {
    // CSRF protection
    requireCsrfToken(request);

    // Rate limiting
    const clientId = getClientIdentifier(request);
<<<<<<< HEAD
    const rateLimit = await checkRateLimit(clientId, "/api/artist/signup");
    if (!rateLimit.allowed) {
      logger.warn("Rate limit exceeded for artist signup", {
        correlationId,
        clientId,
      });
      return NextResponse.json(
        { error: "Too many applications. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.resetTime),
            "Retry-After": String(
              Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
            ),
          },
        },
=======
    const rateLimit = await checkRateLimit(clientId, '/api/artist/signup');
    if (!rateLimit.allowed) {
      logger.warn('Rate limit exceeded for artist signup', { correlationId, clientId });
      return NextResponse.json(
        { error: 'Too many applications. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
            'X-RateLimit-Reset': String(rateLimit.resetTime),
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
          },
        }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Require authentication
    let user;
    try {
      user = requireAuth(request);
    } catch (error) {
<<<<<<< HEAD
      logger.warn("Unauthorized artist signup attempt", { correlationId });
      return NextResponse.json(
        { error: "Authentication required. Please log in first." },
        { status: 401 },
=======
      logger.warn('Unauthorized artist signup attempt', { correlationId });
      return NextResponse.json(
        { error: 'Authentication required. Please log in first.' },
        { status: 401 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Check body size
    const bodySizeCheck = checkBodySize(request);
    if (!bodySizeCheck.valid) {
      return NextResponse.json(
        { error: bodySizeCheck.error },
<<<<<<< HEAD
        { status: 413 }, // 413 Payload Too Large
=======
        { status: 413 } // 413 Payload Too Large
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    const body = await request.json();
    const {
      selectedMediums,
      accountInfo,
      documentsSigned,
      w9Data,
      proRegistration,
      digitalSignature,
    } = sanitizeObjectKeys(body);

    // Validation
    if (!selectedMediums || selectedMediums.length === 0) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "At least one creator medium must be selected" },
        { status: 400 },
=======
        { error: 'At least one creator medium must be selected' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    if (!accountInfo || !accountInfo.email || !accountInfo.artistName) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Account information is required" },
        { status: 400 },
=======
        { error: 'Account information is required' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Sanitize account info
    const sanitizedEmail = sanitizeEmail(accountInfo.email);
    if (!sanitizedEmail) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Invalid email format" },
        { status: 400 },
=======
        { error: 'Invalid email format' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }
    const sanitizedArtistName = sanitizeString(accountInfo.artistName);
    if (!sanitizedArtistName || sanitizedArtistName.length < 2) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Artist name must be at least 2 characters long" },
        { status: 400 },
=======
        { error: 'Artist name must be at least 2 characters long' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    if (!documentsSigned || documentsSigned.length === 0) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "All required documents must be signed" },
        { status: 400 },
=======
        { error: 'All required documents must be signed' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    if (!w9Data || !w9Data.completed) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "W-9 tax form must be completed" },
        { status: 400 },
=======
        { error: 'W-9 tax form must be completed' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    if (!digitalSignature) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Digital signature is required" },
        { status: 400 },
=======
        { error: 'Digital signature is required' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Generate application ID
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Encrypt W-9 sensitive data before storage
    let w9DataEncrypted: string | null = null;
    try {
      // Store full W-9 data encrypted (including SSN/EIN)
      const w9DataForEncryption = {
        taxId: w9Data.taxId || null,
        businessName: w9Data.businessName || null,
        address: w9Data.address || null,
        taxClassification: w9Data.taxClassification || null,
        completed: true,
        timestamp: new Date().toISOString(),
      };
<<<<<<< HEAD

      w9DataEncrypted = encryptJson(w9DataForEncryption);
      logger.info("W-9 data encrypted successfully", { correlationId });
    } catch (encryptionError) {
      logger.error("Failed to encrypt W-9 data", encryptionError, {
        correlationId,
      });
      return NextResponse.json(
        { error: "Failed to process sensitive data. Please contact support." },
        { status: 500 },
=======
      
      w9DataEncrypted = encryptJson(w9DataForEncryption);
      logger.info('W-9 data encrypted successfully', { correlationId });
    } catch (encryptionError) {
      logger.error('Failed to encrypt W-9 data', encryptionError, { correlationId });
      return NextResponse.json(
        { error: 'Failed to process sensitive data. Please contact support.' },
        { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Save application to database with encrypted W-9 data
    const application = await prisma.artistApplication.create({
      data: {
        applicationId,
        userId: user.userId,
        email: sanitizedEmail,
        artistName: sanitizedArtistName,
        selectedMediums: selectedMediums || null,
        documentsSigned: documentsSigned || null,
        w9DataEncrypted: w9DataEncrypted, // Encrypted sensitive data
        proRegistration: proRegistration || null,
        digitalSignature: digitalSignature || null,
<<<<<<< HEAD
        status: "PENDING",
=======
        status: 'PENDING',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      },
    });

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to artist
    // TODO: Update user role to 'artist' (pending approval) - or handle on approval

    const duration = Date.now() - startTime;
<<<<<<< HEAD
    logger.info("Artist signup application submitted", {
=======
    logger.info('Artist signup application submitted', {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      correlationId,
      applicationId,
      userId: user.userId,
      artistName: sanitizedArtistName,
      mediums: selectedMediums,
      duration,
    });

    return NextResponse.json({
      success: true,
      applicationId: application.applicationId,
<<<<<<< HEAD
      message: "Application submitted successfully. Awaiting admin approval.",
=======
      message: 'Application submitted successfully. Awaiting admin approval.',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      application: {
        id: application.id,
        applicationId: application.applicationId,
        status: application.status,
        submittedAt: application.submittedAt,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
<<<<<<< HEAD
    logger.error("Artist signup error", error, { correlationId, duration });
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 },
=======
    logger.error('Artist signup error', error, { correlationId, duration });
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}
