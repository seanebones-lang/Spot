'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

export default function TrialsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Free Trials</h1>
      <div className="max-w-4xl">
        <div className="bg-spotify-light-gray rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">Try Premium Free for 30 Days</h2>
          <ul className="space-y-3 mb-6">
            {['Ad-free music', 'On-demand playback', 'Download for offline', 'High quality audio'].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-spotify-green flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link href="/subscription" className="inline-block bg-spotify-green hover:bg-spotify-green/80 text-black px-8 py-3 rounded-full font-medium transition-colors">
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
