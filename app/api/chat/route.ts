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

    // Get the last user message
    const userMessages = messages.filter((msg: any) => msg.role === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1];

    if (!lastUserMessage || !lastUserMessage.content) {
      return NextResponse.json(
        { error: 'No user message found' },
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
    // Using the Grok API endpoint for chat completions
    const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-beta', // Using the beta model
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((msg: any) => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 500,
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