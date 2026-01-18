'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function NewslettersPage() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div 
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: '32px',
        color: '#FFFFFF'
      }}
    >
      <h1 
        className="text-4xl font-bold mb-8"
        style={{
          fontSize: '32px',
          lineHeight: '36px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '32px'
        }}
      >
        Newsletters
      </h1>
      <div 
        className="max-w-2xl"
        style={{
          maxWidth: '672px'
        }}
      >
        <div 
          className="bg-spotify-light-gray rounded-lg p-6 mb-6"
          style={{
            backgroundColor: '#181818',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px'
          }}
        >
          <div 
            className="flex items-start gap-4 mb-4"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '16px'
            }}
          >
            <Mail 
              className="w-6 h-6 text-spotify-green flex-shrink-0 mt-1"
              style={{
                width: '24px',
                height: '24px',
                color: '#1DB954',
                flexShrink: 0,
                marginTop: '4px'
              }}
            />
            <div>
              <h3 
                className="font-bold text-lg mb-2"
                style={{
                  fontSize: '18px',
                  lineHeight: '24px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '8px'
                }}
              >
                Stay Updated
              </h3>
              <p 
                className="text-spotify-text-gray mb-4"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#B3B3B3',
                  marginBottom: '16px'
                }}
              >
                Get the latest news, new releases, and exclusive content delivered to your inbox.
              </p>
              <button
                onClick={() => setSubscribed(!subscribed)}
                className={`rounded-full font-medium transition-colors ${
                  subscribed ? 'bg-spotify-green text-black hover:bg-[#1ed760]' : 'bg-white text-black hover:bg-[#f5f5f5]'
                }`}
                style={{
                  padding: '12px 24px',
                  borderRadius: '500px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  transition: 'all 200ms ease-out',
                  backgroundColor: subscribed ? '#1DB954' : '#FFFFFF',
                  color: '#000000',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = subscribed ? '#1ed760' : '#f5f5f5';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = subscribed ? '#1DB954' : '#FFFFFF';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {subscribed ? (
                  <span 
                    className="flex items-center gap-2"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Check 
                      className="w-5 h-5"
                      style={{
                        width: '20px',
                        height: '20px',
                        flexShrink: 0
                      }}
                    />
                    Subscribed
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
