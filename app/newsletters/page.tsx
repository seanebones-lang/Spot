'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function NewslettersPage() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Newsletters</h1>
      <div className="max-w-2xl">
        <div className="bg-spotify-light-gray rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <Mail className="w-6 h-6 text-spotify-green flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
              <p className="text-spotify-text-gray mb-4">Get the latest news, new releases, and exclusive content delivered to your inbox.</p>
              <button
                onClick={() => setSubscribed(!subscribed)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  subscribed ? 'bg-spotify-green text-black hover:bg-spotify-green/80' : 'bg-white text-black hover:bg-[#f5f5f5]'
                }`}
              >
                {subscribed ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
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
