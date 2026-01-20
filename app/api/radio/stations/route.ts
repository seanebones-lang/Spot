import { NextRequest, NextResponse } from "next/server";
import { logger, generateCorrelationId } from "@/lib/logger";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";

/**
 * GTA V Radio Station Metadata
 * Returns all available stations with their configuration
 */
const STATIONS = [
  {
    id: "radio-los-santos",
    name: "Radio Los Santos",
    genre: "Modern Hip-Hop",
    description: "FlyLo FM-style banter, ads like Ammu-Nation",
    videoId: "C3_FSXZtRe8",
    duration: 7200,
  },
  {
    id: "non-stop-pop",
    name: "Non-Stop-Pop FM",
    genre: "Pop Hits",
    description: "Cara Delevingne DJ, ego-boost commercials",
    videoId: "Fjp0wu3lEHk",
    duration: 7200,
  },
  {
    id: "west-coast-classics",
    name: "West Coast Classics",
    genre: "Old-School Rap",
    description: "DJ Pooh vibes, gangsta ads",
    videoId: "z0Wf3IuZnf0",
    duration: 7200,
  },
  {
    id: "los-santos-rock-radio",
    name: "Los Santos Rock Radio",
    genre: "Classic Rock",
    description: "Kenny Loggins hosting, Pißwasser jingles",
    videoId: "fZPV-9GlM-c",
    duration: 7200,
  },
  {
    id: "blonded-los-santos",
    name: "blonded Los Santos 97.8 FM",
    genre: "R&B/Eclectic",
    description: "Frank Ocean curated, chill ads",
    videoId: "-tVumJBaTWY",
    duration: 5400,
  },
  {
    id: "blaine-county-talk",
    name: "Blaine County Talk Radio",
    genre: "Talk/Conspiracy",
    description: "Pure talk, no music—callers, rants",
    videoId: "HS1IG2uy1VE",
    duration: 3600,
  },
];

/**
 * GET /api/radio/stations
 * Returns list of all available radio stations
 */
export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(clientId, "/api/radio/stations");
    if (!rateLimit.allowed) {
      logger.warn("Rate limit exceeded for radio stations", {
        correlationId,
        clientId,
      });
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "30",
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.resetTime),
            "Retry-After": String(
              Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
            ),
          },
        },
      );
    }

    const response = NextResponse.json({
      stations: STATIONS,
      count: STATIONS.length,
    });

    // CORS is handled by middleware.ts
    const duration = Date.now() - startTime;
    logger.info("Radio stations list requested", { correlationId, duration });

    return response;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Error getting radio stations", error, {
      correlationId,
      duration,
    });
    return NextResponse.json(
      { error: "Failed to retrieve stations" },
      { status: 500 },
    );
  }
}

/**
 * Handle OPTIONS for CORS preflight
 * Note: CORS is now handled by middleware.ts, but keeping this for compatibility
 */
export async function OPTIONS(request: NextRequest) {
  // CORS preflight is handled by middleware.ts
  return new NextResponse(null, { status: 200 });
}
