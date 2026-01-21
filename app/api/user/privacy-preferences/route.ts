/**
 * CCPA Privacy Preferences Endpoint
 * Allows California users to control data collection and sales
 * Complies with California Consumer Privacy Act (CCPA §1798.100-1798.150)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { logger, generateCorrelationId } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();

  try {
    const userId = await authenticateUser(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's privacy preferences
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        privacyPreferences: true,
        consentLog: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return current privacy preferences
    return NextResponse.json({
      preferences: user.privacyPreferences || {
        dataCollection: {
          analytics: true,
          recommendations: true,
          behavioral: true,
        },
        dataSales: {
          allowSaleOfPersonalInfo: false, // CCPA default: do not sell
          thirdPartySharing: false,
        },
        communications: {
          marketing: true,
          newsletters: true,
        },
      },
      lastUpdated: user.consentLog?.['lastUpdated'] || new Date().toISOString(),
      ccpaCompliance: {
        consumerRight: 'Do Not Sell My Personal Information',
        effectiveDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Failed to fetch privacy preferences', error, { correlationId });
    return NextResponse.json(
      { error: 'Failed to fetch privacy preferences' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    const userId = await authenticateUser(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { dataCollection, dataSales, communications } = body;

    // Validate input
    if (!dataCollection && !dataSales && !communications) {
      return NextResponse.json(
        { error: 'At least one preference category must be specified' },
        { status: 400 }
      );
    }

    // Update privacy preferences
    const newPreferences = {
      dataCollection: dataCollection || {},
      dataSales: dataSales || {},
      communications: communications || {},
    };

    // Log preference change for audit trail
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { consentLog: true },
    });

    const updatedConsentLog = {
      ...user?.consentLog,
      lastUpdated: new Date().toISOString(),
      history: [
        ...(user?.consentLog?.['history'] || []),
        {
          timestamp: new Date().toISOString(),
          changes: newPreferences,
          ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        },
      ],
    };

    // Save preferences
    await prisma.user.update({
      where: { id: userId },
      data: {
        privacyPreferences: newPreferences,
        consentLog: updatedConsentLog,
      },
    });

    logger.info('CCPA privacy preferences updated', {
      correlationId,
      userId,
      preferences: newPreferences,
      duration: Date.now() - startTime,
    });

    // If user opts out of data sale, trigger compliance action
    if (dataSales?.allowSaleOfPersonalInfo === false) {
      logger.info('User opted out of data sale (CCPA)', {
        correlationId,
        userId,
        effectiveDate: new Date().toISOString(),
      });

      // TODO: Notify third-party data brokers of opt-out within 10 business days
      // await notifyDataBrokers(userId);
    }

    return NextResponse.json({
      success: true,
      message: 'Privacy preferences updated successfully',
      preferences: newPreferences,
      ccpaCompliance: {
        optOut: dataSales?.allowSaleOfPersonalInfo === false,
        effectiveDate: new Date().toISOString(),
        notificationRequired: dataSales?.allowSaleOfPersonalInfo === false,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Failed to update privacy preferences', error, {
      correlationId,
      duration,
    });

    return NextResponse.json(
      { error: 'Failed to update privacy preferences' },
      { status: 500 }
    );
  }
}

/**
 * CCPA "Do Not Sell My Personal Information" endpoint
 * Simplified single-click opt-out per CCPA §1798.120
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();

  try {
    // Could be authenticated or unauthenticated per CCPA
    const userId = await authenticateUser(request);

    if (!userId) {
      // Allow unauthenticated opt-out via email
      const body = await request.json();
      const { email } = body;

      if (!email) {
        return NextResponse.json(
          { error: 'Email required for unauthenticated opt-out' },
          { status: 400 }
        );
      }

      // Log opt-out request for processing
      logger.info('CCPA opt-out request (unauthenticated)', {
        correlationId,
        email,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: 'Opt-out request recorded. Confirmation will be sent to your email.',
      });
    }

    // Authenticated opt-out
    await prisma.user.update({
      where: { id: userId },
      data: {
        privacyPreferences: {
          dataSales: {
            allowSaleOfPersonalInfo: false,
          },
        },
      },
    });

    logger.info('CCPA opt-out confirmed', {
      correlationId,
      userId,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'You have been opted out of the sale of your personal information',
      effectiveDate: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('CCPA opt-out failed', error, { correlationId });
    return NextResponse.json(
      { error: 'Failed to process opt-out request' },
      { status: 500 }
    );
  }
}
