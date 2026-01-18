import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route for AI Mood Settings Validation
 * Validates artist mood settings and provides suggestions using xAI Grok
 */
export async function POST(request: NextRequest) {
  try {
    const { mood, feelings, vibe, genres } = await request.json();

    // Get API key from environment variables (server-side only)
    const apiKey = process.env.XAI_API_KEY;

    if (!apiKey) {
      console.error('XAI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Validate required fields
    if (!mood || !feelings || vibe === undefined || !genres) {
      return NextResponse.json(
        { error: 'Missing required mood settings' },
        { status: 400 }
      );
    }

    // Prepare prompt for mood validation
    const validationPrompt = `As an expert music mood analyst for EmPulse Music, analyze these artist-provided mood settings for a track:

Mood: ${mood}
Feelings: ${feelings.join(', ')}
Vibe (0-100): ${vibe}
Genres: ${genres.join(', ')}

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

    // Call xAI Grok API
    // Using the latest Grok-3 model (flagship, released Dec 2025)
    const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-3', // Latest flagship model (Dec 2025)
        messages: [
          {
            role: 'system',
            content: 'You are an expert music mood analyst. Always respond with valid JSON only, no additional text.'
          },
          {
            role: 'user',
            content: validationPrompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent validation
        max_tokens: 1000, // Increased for better JSON responses
        stream: false,
      }),
    });

    if (!grokResponse.ok) {
      const errorText = await grokResponse.text();
      console.error('xAI Grok API error:', grokResponse.status, errorText);
      return NextResponse.json(
        { error: 'Unable to validate mood settings. Please try again.' },
        { status: 500 }
      );
    }

    const data = await grokResponse.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response from AI validator' },
        { status: 500 }
      );
    }

    // Parse JSON response
    try {
      // Extract JSON from response (sometimes wrapped in markdown code blocks)
      const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : assistantMessage;
      const validationResult = JSON.parse(jsonStr);

      return NextResponse.json(validationResult);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
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
    console.error('Error validating mood settings:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
