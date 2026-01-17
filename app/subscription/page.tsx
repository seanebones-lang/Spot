'use client';

import { useState } from 'react';
import { Check, Crown, Music, Mic2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const tiers = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'month',
    icon: Music,
    color: 'bg-spotify-text-gray',
    features: [
      'Access to millions of tracks',
      'Shuffle play on mobile',
      'Shuffle play on tablet',
      'Shuffle play on computer',
      'Basic sound quality',
      'Ads included'
    ],
    cta: 'Current Plan',
    disabled: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9.99',
    period: 'month',
    icon: Crown,
    color: 'bg-spotify-green',
    popular: true,
    features: [
      'Everything in Free',
      'Ad-free music',
      'On-demand playback',
      'Download for offline listening',
      'High quality audio',
      'Unlimited skips',
      'Cancel anytime'
    ],
    cta: 'Get Premium',
    disabled: false
  },
  {
    id: 'artist',
    name: 'Artist',
    price: '$14.99',
    period: 'month',
    icon: Mic2,
    color: 'bg-empulse-purple',
    features: [
      'Everything in Premium',
      'Upload unlimited tracks',
      'Artist dashboard & analytics',
      'Revenue share ($0.004/stream)',
      'Fan insights',
      'Publishing tools',
      'AI marketing assistance'
    ],
    cta: 'Upgrade to Artist',
    disabled: false
  }
];

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState('premium');

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Choose your plan</h1>
        <p className="text-spotify-text-gray mb-8">
          Listen without limits on your phone, speaker, and other devices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            
            return (
              <div
                key={tier.id}
                className={cn(
                  "relative bg-spotify-light-gray rounded-lg p-6 transition-all",
                  tier.popular && "ring-2 ring-spotify-green",
                  isSelected && "ring-2 ring-white"
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-spotify-green text-black text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", tier.color)}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-spotify-text-gray">/{tier.period}</span>
                </div>

                <button
                  onClick={() => !tier.disabled && setSelectedTier(tier.id)}
                  className={cn(
                    "w-full py-3 rounded-full font-medium mb-6 transition-colors",
                    isSelected
                      ? "bg-white text-black hover:bg-[#f5f5f5]"
                      : tier.id === 'free'
                      ? "bg-spotify-light-gray text-white border border-white/20 hover:bg-spotify-dark-gray cursor-not-allowed"
                      : "bg-spotify-green text-black hover:bg-spotify-green/80"
                  )}
                  disabled={tier.disabled || tier.id === 'free'}
                >
                  {tier.cta}
                </button>

                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-spotify-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-spotify-text-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Payment method</h2>
          <p className="text-spotify-text-gray mb-4">
            Your payment method will be securely processed. You can update it at any time.
          </p>
          <button className="bg-spotify-green hover:bg-spotify-green/80 text-black px-6 py-3 rounded-full font-medium transition-colors">
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}