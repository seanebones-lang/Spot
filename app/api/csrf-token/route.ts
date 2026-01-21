<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { getCsrfToken } from "@/lib/csrf";
import { logger, generateCorrelationId } from "@/lib/logger";
=======
import { NextRequest, NextResponse } from 'next/server';
import { getCsrfToken } from '@/lib/csrf';
import { logger, generateCorrelationId } from '@/lib/logger';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Get CSRF Token Endpoint
 * Returns CSRF token for client-side requests
 * GET /api/csrf-token
 */
export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();

  try {
    const token = await getCsrfToken();

    return NextResponse.json(
      { csrfToken: token },
      {
        headers: {
<<<<<<< HEAD
          "X-CSRF-Token": token,
        },
      },
    );
  } catch (error) {
    logger.error("Error generating CSRF token", error, { correlationId });
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 },
=======
          'X-CSRF-Token': token,
        },
      }
    );

  } catch (error) {
    logger.error('Error generating CSRF token', error, { correlationId });
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}
