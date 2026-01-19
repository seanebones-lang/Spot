import { NextRequest, NextResponse } from "next/server";

/**
 * Neuralink Brainwave API
 * Receives brainwave data and converts to mood/music recommendations
 * Mock implementation for future Neuralink SDK integration
 */

interface BrainwaveData {
  alpha: number; // 8-13 Hz: Relaxed, creative
  beta: number; // 13-30 Hz: Focused, alert
  theta: number; // 4-8 Hz: Meditative, drowsy
  gamma: number; // 30-100 Hz: High focus
  timestamp: number;
}

export async function POST(req: NextRequest) {
  try {
    const brainwaveData: BrainwaveData = await req.json();

    // Analyze brainwave patterns
    const mood = analyzeBrainwaves(brainwaveData);
    const recommendation = getMusicRecommendation(mood);

    return NextResponse.json({
      success: true,
      mood,
      recommendation,
      brainwaveData,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Brainwave analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze brainwaves", message: error.message },
      { status: 500 },
    );
  }
}

function analyzeBrainwaves(data: BrainwaveData): string {
  // Determine mood from dominant brainwave pattern
  const { alpha, beta, theta, gamma } = data;

  const max = Math.max(alpha, beta, theta, gamma);

  if (max === alpha) return "chill"; // Relaxed, creative
  if (max === beta) return "energetic"; // Focused, alert
  if (max === theta) return "meditative"; // Meditative, drowsy
  if (max === gamma) return "intense"; // High focus

  return "neutral";
}

function getMusicRecommendation(mood: string): {
  genre: string;
  tracks: string[];
  playlist: string;
} {
  const recommendations: Record<string, any> = {
    chill: {
      genre: "Chill",
      tracks: ["chill-beats", "ambient-soundscape"],
      playlist: "chill-playlist",
    },
    energetic: {
      genre: "Electronic",
      tracks: ["upbeat-electronic", "dance-music"],
      playlist: "energy-playlist",
    },
    meditative: {
      genre: "Ambient",
      tracks: ["meditation-music", "nature-sounds"],
      playlist: "meditation-playlist",
    },
    intense: {
      genre: "Rock",
      tracks: ["intense-rock", "metal"],
      playlist: "intense-playlist",
    },
  };

  return recommendations[mood] || recommendations.chill;
}

// GET endpoint for testing
export async function GET(req: NextRequest) {
  return NextResponse.json({
    service: "neuralink-brainwaves",
    version: "∞.0.0",
    status: "experimental",
    supportedWaves: ["alpha", "beta", "theta", "gamma"],
    moodMapping: {
      alpha: "chill",
      beta: "energetic",
      theta: "meditative",
      gamma: "intense",
    },
    note: "Requires Neuralink hardware/API (currently experimental)",
  });
}
