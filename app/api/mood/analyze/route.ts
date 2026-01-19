import { NextRequest, NextResponse } from "next/server";
import { pipeline } from "@xenova/transformers";

/**
 * AI Mood Analysis API
 * Uses @xenova/transformers for audio classification
 * Generates mood embeddings and tags for music discovery
 */

// Cache the classifier to avoid reloading on every request
let classifier: any = null;

async function getClassifier() {
  if (!classifier) {
    classifier = await pipeline(
      "audio-classification",
      "Xenova/facebook/musicgen-small", // Music generation model with mood understanding
    );
  }
  return classifier;
}

export async function POST(req: NextRequest) {
  try {
    const { track, audioUrl, audioBuffer } = await req.json();

    if (!track && !audioUrl && !audioBuffer) {
      return NextResponse.json(
        { error: "Missing required field: track, audioUrl, or audioBuffer" },
        { status: 400 },
      );
    }

    // Load classifier (cached)
    const moodClassifier = await getClassifier();

    // Process audio for mood analysis
    let audioData: any;

    if (audioBuffer) {
      // Use provided audio buffer
      audioData = audioBuffer;
    } else if (audioUrl) {
      // Fetch audio from URL
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      audioData = Buffer.from(arrayBuffer);
    } else if (track?.audioUrl || track?.url) {
      // Use track audio URL
      const audioUrl = track.audioUrl || track.url;
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      audioData = Buffer.from(arrayBuffer);
    } else {
      return NextResponse.json(
        { error: "No audio data provided" },
        { status: 400 },
      );
    }

    // Analyze mood using transformer model
    const moodAnalysis = await moodClassifier(audioData, {
      top_k: 5, // Get top 5 mood predictions
    });

    // Extract mood tags and confidence scores
    const moods = moodAnalysis.map((result: any) => ({
      label: result.label,
      score: result.score,
    }));

    // Generate mood embeddings for similarity search
    const embeddings =
      (await moodClassifier.getEmbeddings?.(audioData)) || null;

    // Return comprehensive mood analysis
    return NextResponse.json({
      success: true,
      track: track?.id || track?.name || "unknown",
      moods,
      primaryMood: moods[0]?.label || "unknown",
      confidence: moods[0]?.score || 0,
      embeddings,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Mood analysis error:", error);
    return NextResponse.json(
      {
        error: "Failed to analyze mood",
        message: error.message,
      },
      { status: 500 },
    );
  }
}

// GET endpoint for testing
export async function GET(req: NextRequest) {
  return NextResponse.json({
    service: "mood-analysis",
    version: "1.0.0",
    model: "Xenova/facebook/musicgen-small",
    status: "ready",
  });
}
