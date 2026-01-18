import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { fetchWithTimeout } from '@/lib/timeout';
import { logger, generateCorrelationId } from '@/lib/logger';
import { sanitizeString } from '@/lib/sanitize';

/**
 * API Route for xAI Grok Chat Integration
 * Handles chat messages from the support page and forwards them to xAI Grok API
 * API key is stored securely in environment variables and never exposed to client
 * Rate limited: 20 requests per hour
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();
  
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId, '/api/chat');
    if (!rateLimit.allowed) {
      logger.warn('Rate limit exceeded for chat', { correlationId, clientId });
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
            'X-RateLimit-Reset': String(rateLimit.resetTime),
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
          },
        }
      );
    }

    const { messages } = await request.json();

    // Get API key from environment variables (server-side only)
    const env = getEnv();
    const apiKey = env.XAI_API_KEY;

    if (!apiKey) {
      logger.error('XAI_API_KEY is not configured', { correlationId });
      return NextResponse.json(
        { error: 'AI service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Limit message history to prevent abuse
    const maxMessages = 50;
    const limitedMessages = messages.slice(-maxMessages);

    // Validate and sanitize that messages have the correct format
    const validMessages = limitedMessages
      .filter((msg: any) => 
        msg && 
        (msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system') &&
        msg.content &&
        typeof msg.content === 'string'
      )
      .map((msg: any) => ({
        role: msg.role,
        content: sanitizeString(msg.content).slice(0, 5000), // Limit message length
      }));

    if (validMessages.length === 0) {
      return NextResponse.json(
        { error: 'No valid messages found' },
        { status: 400 }
      );
    }

    // Prepare context for EmPulse Music assistant
    const systemPrompt = `You are a helpful AI assistant for EmPulse Music, a music streaming platform with wellness and mental health features. 
You help users with:
- Music discovery and recommendations
- Platform features and navigation
- Playlist creation and management
- Account and subscription questions
- Wellness features (mood tracking, affirmations, journaling)
- Technical support and troubleshooting

Be friendly, concise, and helpful. If you don't know something, admit it and suggest contacting support.
Keep responses under 300 words unless the user asks for detailed information.`;

    // Call xAI Grok API with timeout
    // Using the latest Grok-3 model (flagship, released Dec 2025)
    // Supports 128k token context window, text/vision/tools capabilities
    const grokResponse = await fetchWithTimeout(
      'https://api.x.ai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'grok-3', // Latest flagship model (Dec 2025)
          messages: [
            { role: 'system', content: systemPrompt },
            // Filter and map messages, ensuring proper format
            ...validMessages.filter((msg: any) => msg.role !== 'system') // Don't duplicate system message
          ],
          temperature: 0.7,
          max_tokens: 2000, // 128k context window supports extended conversations
          stream: false,
        }),
      },
      30000 // 30 second timeout
    );

    if (!grokResponse.ok) {
      const errorText = await grokResponse.text();
      logger.error('xAI Grok API error', new Error(errorText), { 
        correlationId, 
        status: grokResponse.status 
      });
      
      // Provide user-friendly error messages
      if (grokResponse.status === 401) {
        return NextResponse.json(
          { error: 'Authentication failed. Please try again later.' },
          { status: 500 }
        );
      } else if (grokResponse.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please wait a moment and try again.' },
          { status: 429 }
        );
      } else {
        return NextResponse.json(
          { error: 'Unable to process request. Please try again.' },
          { status: 500 }
        );
      }
    }

    const data = await grokResponse.json();

    // Extract the assistant's response
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response from AI assistant' },
        { status: 500 }
      );
    }

    const duration = Date.now() - startTime;
    logger.info('Chat request completed', { 
      correlationId, 
      messageCount: validMessages.length,
      duration,
      usage: data.usage 
    });

    return NextResponse.json({
      message: assistantMessage,
      usage: data.usage || null,
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Error calling xAI Grok API', error, { correlationId, duration });
    
    // Handle timeout errors specifically
    if (error instanceof Error && error.message.includes('timeout')) {
      return NextResponse.json(
        { error: 'Request timed out. Please try again with a shorter message.' },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}