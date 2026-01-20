"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";

export default function SupportPage() {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string; timestamp: Date }>
  >([
    {
      role: "assistant",
      content:
        "Hello! I'm your EmPulse Music AI assistant powered by xAI Grok. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    const userMessageObj = {
      role: "user" as const,
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessageObj]);
    setIsLoading(true);

    try {
      // Call our API route which handles xAI Grok API communication
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const endpoint = apiUrl ? `${apiUrl}/api/chat` : "/api/chat";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessageObj],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Failed to get response from assistant",
        );
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.message ||
            "I apologize, but I encountered an issue. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      logger.error("Error sending message", error as Error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `Sorry, I encountered an error: ${error.message}. Please try again or contact support if the issue persists.`
              : "Sorry, I encountered an unexpected error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-spotify-dark flex flex-col z-50"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#121212",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      {/* Header - Exact Spotify Style */}
      <div
        className="h-16 bg-spotify-dark-gray border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0"
        style={{
          height: "64px",
          backgroundColor: "#181818",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          flexShrink: 0,
        }}
      >
        <div
          className="flex items-center gap-4"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green rounded-full flex items-center justify-center"
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Bot
              className="w-6 h-6 text-white"
              style={{
                width: "24px",
                height: "24px",
                color: "#FFFFFF",
              }}
            />
          </div>
          <div>
            <h1
              className="text-white font-bold text-lg"
              style={{
                fontSize: "18px",
                lineHeight: "24px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "2px",
              }}
            >
              EmPulse Music Support
            </h1>
            <p
              className="text-sm text-spotify-text-gray"
              style={{
                fontSize: "13px",
                lineHeight: "16px",
                color: "#B3B3B3",
              }}
            >
              Powered by xAI Grok-3
            </p>
          </div>
        </div>
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-spotify-light-gray rounded-full transition-colors"
          style={{
            padding: "8px",
            backgroundColor: "transparent",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            transition: "background-color 200ms ease-out",
          }}
          aria-label="Close chat"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#282828";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Minimize2
            className="w-5 h-5 text-spotify-text-gray"
            style={{
              width: "20px",
              height: "20px",
              color: "#B3B3B3",
            }}
          />
        </button>
      </div>

      {/* Messages Area - Exact Spotify Style */}
      <div
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
        style={{
          flex: "1 1 0%",
          overflowY: "auto",
          padding: "24px",
          gap: "24px",
          backgroundColor: "#121212",
          minHeight: 0,
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-4",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
            style={{
              display: "flex",
              gap: "16px",
              justifyContent:
                message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {message.role === "assistant" && (
              <div
                className="w-8 h-8 bg-gradient-to-br from-spotify-green to-spotify-green rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{
                  width: "32px",
                  height: "32px",
                  background:
                    "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "4px",
                }}
              >
                <Bot
                  className="w-5 h-5 text-white"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#FFFFFF",
                  }}
                />
              </div>
            )}
            <div
              className={cn(
                "max-w-[70%] rounded-lg px-4 py-3",
                message.role === "user"
                  ? "bg-spotify-green text-black"
                  : "bg-spotify-light-gray text-white",
              )}
              style={{
                maxWidth: "70%",
                borderRadius: "8px",
                padding: "12px 16px",
                backgroundColor:
                  message.role === "user" ? "#1DB954" : "#181818",
                color: message.role === "user" ? "#000000" : "#FFFFFF",
              }}
            >
              <p
                className="text-sm whitespace-pre-wrap"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.content}
              </p>
              <p
                className={cn(
                  "text-xs mt-2",
                  message.role === "user"
                    ? "text-black/60"
                    : "text-spotify-text-gray",
                )}
                style={{
                  fontSize: "11px",
                  lineHeight: "16px",
                  marginTop: "8px",
                  color:
                    message.role === "user" ? "rgba(0, 0, 0, 0.6)" : "#B3B3B3",
                }}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {message.role === "user" && (
              <div
                className="w-8 h-8 bg-spotify-light-gray rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#282828",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "4px",
                }}
              >
                <User
                  className="w-5 h-5 text-white"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#FFFFFF",
                  }}
                />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-spotify-green to-spotify-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-spotify-light-gray rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-spotify-text-gray rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-spotify-text-gray rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-spotify-text-gray rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Exact Spotify Style */}
      <div
        className="border-t border-white/10 flex-shrink-0"
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "16px 24px",
          paddingBottom: "calc(16px + 90px)", // Account for player bar height (90px)
          flexShrink: 0,
          backgroundColor: "#181818",
          position: "relative",
          zIndex: 60,
          minHeight: "80px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSend}
          className="flex gap-3 w-full"
          style={{
            display: "flex",
            gap: "12px",
            width: "100%",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-spotify-light-gray text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-spotify-green placeholder:text-spotify-text-gray"
            style={{
              flex: "1 1 0%",
              backgroundColor: "#282828",
              color: "#FFFFFF",
              borderRadius: "500px",
              padding: "12px 24px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              border: "1px solid transparent",
              outline: "none",
              fontFamily: "inherit",
              transition: "all 200ms ease-out",
              minWidth: "0",
              width: "100%",
              display: "block",
            }}
            disabled={isLoading}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#1DB954";
              e.currentTarget.style.borderWidth = "2px";
              e.currentTarget.style.borderStyle = "solid";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.borderWidth = "1px";
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              "w-12 h-12 bg-spotify-green hover:bg-[#1ed760] rounded-full flex items-center justify-center transition-colors",
              (!input.trim() || isLoading) && "opacity-50 cursor-not-allowed",
            )}
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#1DB954",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: !input.trim() || isLoading ? "not-allowed" : "pointer",
              transition: "all 200ms ease-out",
              opacity: !input.trim() || isLoading ? 0.5 : 1,
            }}
            aria-label="Send message"
            onMouseEnter={(e) => {
              if (input.trim() && !isLoading) {
                e.currentTarget.style.backgroundColor = "#1ed760";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1DB954";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Send
              className="w-5 h-5 text-black"
              style={{
                width: "20px",
                height: "20px",
                color: "#000000",
              }}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
