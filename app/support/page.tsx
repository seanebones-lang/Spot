'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SupportPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your EmPulse Music AI assistant powered by xAI Grok. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);
    setIsLoading(true);

    // TODO: Connect to xAI Grok API
    // For now, simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I understand your question. This is a placeholder response. Once connected to xAI Grok, I\'ll provide intelligent assistance for your EmPulse Music experience.',
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-spotify-dark flex flex-col z-50">
      {/* Header */}
      <div className="h-16 bg-spotify-dark-gray border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">EmPulse Music Support</h1>
            <p className="text-sm text-spotify-text-gray">Powered by xAI Grok</p>
          </div>
        </div>
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-spotify-light-gray rounded-full transition-colors"
          aria-label="Close chat"
        >
          <Minimize2 className="w-5 h-5 text-spotify-text-gray" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-4",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[70%] rounded-lg px-4 py-3",
                message.role === 'user'
                  ? "bg-spotify-green text-black"
                  : "bg-spotify-light-gray text-white"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className={cn(
                "text-xs mt-2",
                message.role === 'user' ? "text-black/60" : "text-spotify-text-gray"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 bg-spotify-light-gray rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-spotify-light-gray rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-spotify-text-gray rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-spotify-text-gray rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-spotify-text-gray rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4 flex-shrink-0">
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-spotify-light-gray text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-spotify-green placeholder:text-spotify-text-gray"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              "w-12 h-12 bg-spotify-green hover:bg-spotify-green/80 rounded-full flex items-center justify-center transition-colors",
              (!input.trim() || isLoading) && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-black" />
          </button>
        </form>
      </div>
    </div>
  );
}