import { NextRequest, NextResponse } from 'next/server';

/**
 * Track Upload API - Currently Disabled
 *
 * Audio and image uploads are disabled in UI-only mode.
 */
export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      error: 'Upload functionality is currently disabled',
      message: 'This is a UI-only demo mode. Audio and image uploads are not available.'
    },
    { status: 503 }
  );
}
