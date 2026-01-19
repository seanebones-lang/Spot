import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { fetchWithTimeout } from "@/lib/timeout";
import { logger, generateCorrelationId } from "@/lib/logger";
import { sanitizeString, sanitizeObjectKeys } from "@/lib/sanitize";

/**
 * API Route for AI Mood Settings Validation
 * Validates artist mood settings and provides suggestions using xAI Grok
 * Rate limited: 30 requests per minute
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(clientId, "/api/mood/validate");
    if (!rateLimit.allowed) {
      logger.warn("Rate limit exceeded for mood validation", {
        correlationId,
        clientId,
      });
      return NextResponse.json(
        { error: "Too many validation requests. Please wait a moment." },
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

    const body = await request.json();
    const sanitizedBody = sanitizeObjectKeys(body);
    const { mood, feelings, vibe, genres } = sanitizedBody;

    // Get API key from environment variables (server-side only)
    const env = getEnv();
    const apiKey = env.XAI_API_KEY;

    if (!apiKey) {
      logger.error("XAI_API_KEY is not configured", { correlationId });
      return NextResponse.json(
        { error: "AI service is not configured. Please contact support." },
        { status: 500 },
      );
    }

    // Validate required fields
    if (!mood || !feelings || vibe === undefined || !genres) {
      return NextResponse.json(
        { error: "Missing required mood settings" },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedMood = sanitizeString(String(mood));
    const sanitizedFeelings = Array.isArray(feelings)
      ? feelings.map((f) => sanitizeString(String(f))).filter(Boolean)
      : [];
    const sanitizedGenres = Array.isArray(genres)
      ? genres.map((g) => sanitizeString(String(g))).filter(Boolean)
      : [];
    const vibeNumber =
      typeof vibe === "number"
        ? Math.max(0, Math.min(100, vibe))
        : parseInt(String(vibe), 10);

    if (isNaN(vibeNumber) || vibeNumber < 0 || vibeNumber > 100) {
      return NextResponse.json(
        { error: "Vibe must be a number between 0 and 100" },
        { status: 400 },
      );
    }

    // Prepare prompt for mood validation
    const validationPrompt = `As an expert music mood analyst for EmPulse Music, analyze these artist-provided mood settings for a track:

Mood: ${sanitizedMood}
Feelings: ${sanitizedFeelings.join(", ")}
Vibe (0-100): ${vibeNumber}
Genres: ${sanitizedGenres.join(", ")}

Your task:
1. Evaluate if these settings are coherent and make sense together
2. Check if the mood aligns with the feelings selected
3. Verify the vibe level matches the mood (e.g., Euphoric should be 70-100, Melancholic should be 0-40)
4. Ensure genres align with the overall mood profile
5. Provide specific suggestions if anything seems off

Respond in JSON format:
{
  "approved": true/false,
  "confidence": 0.0-1.0,
  "suggestions": ["suggestion 1", "suggestion 2"],
  "issues": ["issue 1", "issue 2"] or null,
  "recommendedMood": "mood name" or null,
  "recommendedFeelings": ["feeling1", "feeling2"] or null,
  "recommendedVibe": number or null,
  "recommendedGenres": ["genre1", "genre2"] or null
}

Be specific and actionable. If approved=true, suggestions can still be provided as optional improvements.`;

    // Call xAI Grok API with timeout
    // Using the latest Grok-3 model (flagship, released Dec 2025)
    const grokResponse = await fetchWithTimeout(
      "https://api.x.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-3", // Latest flagship model (Dec 2025)
          messages: [
            {
              role: "system",
              content:
                "You are an expert music mood analyst. Always respond with valid JSON only, no additional text.",
            },
            {
              role: "user",
              content: validationPrompt,
            },
          ],
          temperature: 0.3, // Lower temperature for more consistent validation
          max_tokens: 1000, // Increased for better JSON responses
          stream: false,
        }),
      },
      30000, // 30 second timeout
    );

    if (!grokResponse.ok) {
      const errorText = await grokResponse.text();
      logger.error("xAI Grok API error", new Error(errorText), {
        correlationId,
        status: grokResponse.status,
      });
      return NextResponse.json(
        { error: "Unable to validate mood settings. Please try again." },
        { status: 500 },
      );
    }

    const data = await grokResponse.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from AI validator" },
        { status: 500 },
      );
    }

    // Parse JSON response
    try {
      // Extract JSON from response (sometimes wrapped in markdown code blocks)
      const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : assistantMessage;
      const validationResult = JSON.parse(jsonStr);

      const duration = Date.now() - startTime;
      logger.info("Mood validation completed", {
        correlationId,
        duration,
        approved: validationResult.approved,
      });

      return NextResponse.json(validationResult);
    } catch (parseError) {
      logger.error("Error parsing AI response", parseError, { correlationId });
      // Fallback response
      return NextResponse.json({
        approved: true,
        confidence: 0.7,
        suggestions: [],
        issues: null,
        recommendedMood: null,
        recommendedFeelings: null,
        recommendedVibe: null,
        recommendedGenres: null,
      });
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Error validating mood settings", error, {
      correlationId,
      duration,
    });

    // Handle timeout errors specifically
    if (error instanceof Error && error.message.includes("timeout")) {
      return NextResponse.json(
        { error: "Validation request timed out. Please try again." },
        { status: 504 },
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
