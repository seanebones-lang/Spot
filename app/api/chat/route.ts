import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route for xAI Grok Chat Integration
 * Handles chat messages from the support page and forwards them to xAI Grok API
 * API key is stored securely in environment variables and never exposed to client
 */
export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Get API key from environment variables (server-side only)
    const apiKey = process.env.XAI_API_KEY;

    if (!apiKey) {
      console.error('XAI_API_KEY is not configured');
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

    // Validate that messages have the correct format
    const validMessages = messages.filter((msg: any) => 
      msg && 
      (msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system') &&
      msg.content
    );

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

    // Call xAI Grok API
    // Using the latest Grok-3 model (flagship, released Dec 2025)
    // Supports 128k token context window, text/vision/tools capabilities
    const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
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
          ...validMessages
            .filter((msg: any) => msg.role !== 'system') // Don't duplicate system message
            .map((msg: any) => ({
              role: msg.role,
              content: typeof msg.content === 'string' ? msg.content : String(msg.content)
            }))
        ],
        temperature: 0.7,
        max_tokens: 2000, // 128k context window supports extended conversations
        stream: false,
      }),
    });

    if (!grokResponse.ok) {
      const errorText = await grokResponse.text();
      console.error('xAI Grok API error:', grokResponse.status, errorText);
      
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

    return NextResponse.json({
      message: assistantMessage,
      usage: data.usage || null,
    });

  } catch (error) {
    console.error('Error calling xAI Grok API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}