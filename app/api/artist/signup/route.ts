import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger, generateCorrelationId } from '@/lib/logger';
import { sanitizeString, sanitizeEmail, sanitizeObjectKeys } from '@/lib/sanitize';

/**
 * Artist Signup Submission API
 * Submits artist signup application for approval
 * Requires authentication
 * Rate limited: 5 requests per day
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();
  
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId, '/api/artist/signup');
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
      );
    }

    // Require authentication
    let user;
    try {
      user = requireAuth(request);
    } catch (error) {
      logger.warn('Unauthorized artist signup attempt', { correlationId });
      return NextResponse.json(
        { error: 'Authentication required. Please log in first.' },
        { status: 401 }
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
        { error: 'At least one creator medium must be selected' },
        { status: 400 }
      );
    }

    if (!accountInfo || !accountInfo.email || !accountInfo.artistName) {
      return NextResponse.json(
        { error: 'Account information is required' },
        { status: 400 }
      );
    }

    // Sanitize account info
    const sanitizedEmail = sanitizeEmail(accountInfo.email);
    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    const sanitizedArtistName = sanitizeString(accountInfo.artistName);
    if (!sanitizedArtistName || sanitizedArtistName.length < 2) {
      return NextResponse.json(
        { error: 'Artist name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!documentsSigned || documentsSigned.length === 0) {
      return NextResponse.json(
        { error: 'All required documents must be signed' },
        { status: 400 }
      );
    }

    if (!w9Data || !w9Data.completed) {
      return NextResponse.json(
        { error: 'W-9 tax form must be completed' },
        { status: 400 }
      );
    }

    if (!digitalSignature) {
      return NextResponse.json(
        { error: 'Digital signature is required' },
        { status: 400 }
      );
    }

    // Generate application ID
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create application record
    // In production, save to database
    const application = {
      id: applicationId,
      userId: user.userId,
      email: sanitizedEmail,
      artistName: sanitizedArtistName,
      selectedMediums,
      documentsSigned,
      w9Data: {
        // Don't store sensitive data like SSN/EIN in plain text in production
        // Use encryption or secure storage
        taxId: w9Data.taxId ? '***' + w9Data.taxId.slice(-4) : null, // Masked
        businessName: w9Data.businessName,
        address: w9Data.address,
        taxClassification: w9Data.taxClassification,
        completed: true,
      },
      proRegistration,
      digitalSignature,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // In production:
    // 1. Save application to database
    // 2. Send notification email to admin
    // 3. Send confirmation email to artist
    // 4. Update user role to 'artist' (pending approval)

    const duration = Date.now() - startTime;
    logger.info('Artist signup application submitted', {
      correlationId,
      applicationId,
      userId: user.userId,
      artistName: sanitizedArtistName,
      mediums: selectedMediums,
      duration,
    });

    return NextResponse.json({
      success: true,
      applicationId,
      message: 'Application submitted successfully. Awaiting admin approval.',
      application: {
        id: application.id,
        status: application.status,
        submittedAt: application.submittedAt,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Artist signup error', error, { correlationId, duration });
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}
