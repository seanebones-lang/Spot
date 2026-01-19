import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { promisify } from "util";
import { exec } from "child_process";
import { logger, generateCorrelationId } from "@/lib/logger";
import { withTimeout } from "@/lib/timeout";

const execAsync = promisify(exec);

/**
 * GTA V Radio Station Configuration
 * Maps station IDs to YouTube video IDs and metadata
 */
const STATIONS = {
  "radio-los-santos": {
    videoId: "C3_FSXZtRe8",
    name: "Radio Los Santos",
    duration: 7200, // 2 hours in seconds
    genre: "Modern Hip-Hop",
  },
  "non-stop-pop": {
    videoId: "Fjp0wu3lEHk",
    name: "Non-Stop-Pop FM",
    duration: 7200,
    genre: "Pop Hits",
  },
  "west-coast-classics": {
    videoId: "z0Wf3IuZnf0",
    name: "West Coast Classics",
    duration: 7200,
    genre: "Old-School Rap",
  },
  "los-santos-rock-radio": {
    videoId: "fZPV-9GlM-c",
    name: "Los Santos Rock Radio",
    duration: 7200,
    genre: "Classic Rock",
  },
  "blonded-los-santos": {
    videoId: "-tVumJBaTWY",
    name: "blonded Los Santos 97.8 FM",
    duration: 5400, // 1.5 hours
    genre: "R&B/Eclectic",
  },
  "blaine-county-talk": {
    videoId: "HS1IG2uy1VE",
    name: "Blaine County Talk Radio",
    duration: 3600, // 1 hour
    genre: "Talk/Conspiracy",
  },
} as const;

type StationId = keyof typeof STATIONS;

/**
 * Check if yt-dlp is available in the system
 */
async function checkYtDlpAvailable(): Promise<boolean> {
  try {
    await execAsync("yt-dlp --version");
    return true;
  } catch {
    try {
      await execAsync("youtube-dl --version");
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Stream YouTube audio using yt-dlp
 * Extracts audio-only stream and supports seeking for "live radio" feel
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ station: string }> },
) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    const params = await context.params;
    const stationId = params.station as StationId;

    // Validate station ID against whitelist (prevent command injection)
    if (!stationId || typeof stationId !== "string") {
      logger.warn("Invalid station ID format", { correlationId, stationId });
      return NextResponse.json(
        { error: "Invalid station ID" },
        { status: 400 },
      );
    }

    const stationConfig = STATIONS[stationId];

    if (!stationConfig) {
      logger.warn("Station not found", { correlationId, stationId });
      return NextResponse.json({ error: "Station not found" }, { status: 404 });
    }

    // Check if yt-dlp is available (with timeout)
    let ytDlpAvailable = false;
    try {
      ytDlpAvailable = await withTimeout(
        checkYtDlpAvailable(),
        5000, // 5 second timeout
        "yt-dlp check timeout",
      );
    } catch (error) {
      logger.warn("yt-dlp availability check failed", { correlationId, error });
    }

    if (!ytDlpAvailable) {
      // Try to use python3 -m yt_dlp as fallback (common in Docker/container environments)
      try {
        await withTimeout(
          execAsync("python3 -m yt_dlp --version"),
          5000,
          "Python yt-dlp check timeout",
        );
        // If this works, we'll use python3 -m yt_dlp in the spawn command
      } catch {
        logger.error("yt-dlp not available", { correlationId });
        return NextResponse.json(
          {
            error:
              "Streaming service unavailable. Please ensure yt-dlp is installed.",
            hint: "Install with: brew install yt-dlp (macOS) or pip install yt-dlp",
          },
          { status: 503 },
        );
      }
    }

    // Get start time from query params (for random mid-stream start)
    const searchParams = request.nextUrl.searchParams;
    const startTimeParam = parseInt(searchParams.get("start") || "0", 10);
    const randomStart = searchParams.get("random") === "true";

    // Validate and sanitize start time
    const startTime = isNaN(startTimeParam) ? 0 : Math.max(0, startTimeParam);

    // Calculate actual start time
    const actualStart = randomStart
      ? Math.floor(Math.random() * stationConfig.duration)
      : Math.max(0, Math.min(startTime, stationConfig.duration - 60)); // Ensure we don't start too close to end

    const youtubeUrl = `https://www.youtube.com/watch?v=${stationConfig.videoId}`;

    // Use yt-dlp to extract best audio format and stream it
    // Format: bestaudio[ext=m4a]/bestaudio[ext=mp3]/bestaudio
    // We'll pipe directly to response for streaming
    // Try multiple methods to find yt-dlp
    let ytDlpCommand = "yt-dlp";
    let args: string[] = [];

    // Check if we can use python3 -m yt_dlp (common in Docker)
    try {
      await execAsync("python3 -m yt_dlp --version");
      ytDlpCommand = "python3";
      args = ["-m", "yt_dlp"];
    } catch {
      // Fall back to direct yt-dlp command
      ytDlpCommand = process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp";
    }

    // Build yt-dlp command for audio-only streaming
    // Sanitize videoId to prevent command injection
    const sanitizedVideoId = stationConfig.videoId.replace(
      /[^a-zA-Z0-9_-]/g,
      "",
    );
    const sanitizedYoutubeUrl = `https://www.youtube.com/watch?v=${sanitizedVideoId}`;

    args = [
      ...args,
      "-f",
      "bestaudio[ext=m4a]/bestaudio[ext=mp3]/bestaudio/best",
      "--no-playlist",
      "--no-warnings",
      "--quiet",
      "--no-check-certificate",
      "--socket-timeout",
      "30", // 30 second socket timeout
      "-o",
      "-", // Output to stdout
      sanitizedYoutubeUrl,
    ];

    // Create a readable stream from yt-dlp
    // Set process timeout (kill after 5 minutes of inactivity)
    const PROCESS_TIMEOUT = 5 * 60 * 1000; // 5 minutes
    let processTimeout: NodeJS.Timeout;

    const ytDlpProcess = spawn(ytDlpCommand, args, {
      stdio: ["ignore", "pipe", "pipe"],
    });

    // Reset timeout on data
    const resetTimeout = () => {
      if (processTimeout) clearTimeout(processTimeout);
      processTimeout = setTimeout(() => {
        logger.warn("yt-dlp process timeout", { correlationId, stationId });
        ytDlpProcess.kill("SIGTERM");
      }, PROCESS_TIMEOUT);
    };
    resetTimeout();

    // Handle errors
    ytDlpProcess.stderr?.on("data", (data) => {
      resetTimeout();
      const error = data.toString();
      // Filter out non-critical warnings
      if (!error.includes("WARNING") && !error.includes("DeprecationWarning")) {
        logger.warn("yt-dlp stderr", { correlationId, error });
      }
    });

    ytDlpProcess.on("error", (error) => {
      clearTimeout(processTimeout);
      logger.error("Failed to spawn yt-dlp", error, {
        correlationId,
        stationId,
      });
    });

    // Create a response stream
    const stream = new ReadableStream({
      async start(controller) {
        // If we need to seek, we'll need to use ffmpeg to handle the seek
        // For now, we'll stream from the beginning and let the client handle seeking
        // In a production setup, you'd pipe through ffmpeg: ffmpeg -ss ${start} -i pipe:0 -f mp3 pipe:1

        ytDlpProcess.stdout?.on("data", (chunk) => {
          resetTimeout();
          try {
            controller.enqueue(new Uint8Array(chunk));
          } catch (error) {
            clearTimeout(processTimeout);
            logger.error("Stream error", error, { correlationId });
            controller.error(error);
          }
        });

        ytDlpProcess.stdout?.on("end", () => {
          clearTimeout(processTimeout);
          controller.close();
        });

        ytDlpProcess.on("close", (code) => {
          clearTimeout(processTimeout);
          if (code !== 0 && code !== null) {
            logger.warn("yt-dlp process exited", { correlationId, code });
            controller.error(
              new Error(`Stream process exited with code ${code}`),
            );
          } else {
            controller.close();
          }
        });
      },
      cancel() {
        clearTimeout(processTimeout);
        ytDlpProcess.kill("SIGTERM");
        logger.info("Stream cancelled", { correlationId, stationId });
      },
    });

    // Set appropriate headers for audio streaming
    const headers = new Headers();
    headers.set("Content-Type", "audio/mpeg");
    headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");
    headers.set("Accept-Ranges", "bytes");
    // CORS is handled by middleware, but set headers for streaming
    // Note: CORS validation happens in middleware.ts

    logger.info("Radio stream started", {
      correlationId,
      stationId,
      duration: Date.now() - startTime,
    });

    return new NextResponse(stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Radio stream error", error, { correlationId, duration });
    return NextResponse.json(
      {
        error: "Failed to start stream",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 },
    );
  }
}

/**
 * Handle OPTIONS for CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Range",
      "Access-Control-Expose-Headers": "Content-Length, Content-Range",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
