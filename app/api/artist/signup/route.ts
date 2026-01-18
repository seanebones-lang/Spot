import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

/**
 * Artist Signup Submission API
 * Submits artist signup application for approval
 * Requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    let user;
    try {
      user = requireAuth(request);
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in first.' },
        { status: 401 }
      );
    }

    const {
      selectedMediums,
      accountInfo,
      documentsSigned,
      w9Data,
      proRegistration,
      digitalSignature,
    } = await request.json();

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
      email: accountInfo.email,
      artistName: accountInfo.artistName,
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

    console.log('Artist signup application submitted:', {
      applicationId,
      userId: user.userId,
      artistName: accountInfo.artistName,
      mediums: selectedMediums,
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
    console.error('Artist signup error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}
