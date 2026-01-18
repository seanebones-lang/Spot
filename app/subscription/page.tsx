'use client';

import { useState } from 'react';
import { Check, Crown, Music, Mic2, CreditCard, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
    disabled: false,
    current: false
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
      'Lossless audio (FLAC/WAV)',
      'Unlimited skips',
      'Cancel anytime'
    ],
    cta: 'Get Premium',
    disabled: false,
    current: true
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
      'Fan insights & demographics',
      'Publishing tools',
      'AI marketing assistance',
      'Priority support'
    ],
    cta: 'Upgrade to Artist',
    disabled: false,
    current: false
  }
];

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState('premium');
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - Exact Spotify Style */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontSize: '32px', lineHeight: '36px', fontWeight: 700 }}>
            Choose your plan
          </h1>
          <p className="text-spotify-text-gray" style={{ fontSize: '14px', lineHeight: '20px' }}>
            Listen without limits on your phone, speaker, and other devices.
          </p>
        </div>

        {/* Tier Cards - Spotify Grid Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            const isCurrent = tier.current;
            
            return (
              <div
                key={tier.id}
                className={cn(
                  "relative bg-spotify-light-gray rounded-lg p-6 transition-all duration-200",
                  tier.popular && "ring-2 ring-spotify-green",
                  isSelected && "ring-2 ring-white",
                  "hover:bg-spotify-dark-gray"
                )}
                style={{ 
                  borderRadius: '8px',
                  backgroundColor: isSelected ? '#282828' : '#181818'
                }}
              >
                {tier.popular && (
                  <div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-spotify-green text-black text-xs font-bold px-3 py-1 rounded-full"
                    style={{ 
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em'
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}
                
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", tier.color)}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ fontSize: '24px', lineHeight: '28px', fontWeight: 700 }}
                >
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <span 
                    className="text-4xl font-bold"
                    style={{ fontSize: '32px', lineHeight: '36px', fontWeight: 900 }}
                  >
                    {tier.price}
                  </span>
                  <span className="text-spotify-text-gray" style={{ fontSize: '14px' }}>
                    /{tier.period}
                  </span>
                </div>

                <button
                  onClick={() => !tier.disabled && setSelectedTier(tier.id)}
                  className={cn(
                    "w-full py-3 rounded-full font-medium mb-6 transition-all duration-200",
                    isCurrent
                      ? "bg-white text-black hover:bg-[#f5f5f5] cursor-default"
                      : isSelected
                      ? "bg-white text-black hover:bg-[#f5f5f5]"
                      : tier.id === 'free'
                      ? "bg-spotify-light-gray text-white border border-white/20 hover:bg-spotify-dark-gray cursor-not-allowed"
                      : "bg-spotify-green text-black hover:bg-[#1ED760]"
                  )}
                  style={{
                    borderRadius: '500px',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.1em'
                  }}
                  disabled={tier.disabled || isCurrent}
                >
                  {isCurrent ? 'Current Plan' : tier.cta}
                </button>

                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check 
                        className="w-5 h-5 text-spotify-green flex-shrink-0 mt-0.5" 
                        style={{ width: '20px', height: '20px' }}
                      />
                      <span 
                        className="text-sm text-spotify-text-gray"
                        style={{ fontSize: '14px', lineHeight: '20px' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Payment Section - Spotify Style */}
        <div 
          className="bg-spotify-light-gray rounded-lg p-6 mb-8"
          style={{ borderRadius: '8px' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-spotify-green" />
            <h2 
              className="text-xl font-bold"
              style={{ fontSize: '24px', lineHeight: '28px', fontWeight: 700 }}
            >
              Payment method
            </h2>
          </div>
          <p 
            className="text-spotify-text-gray mb-4"
            style={{ fontSize: '14px', lineHeight: '20px' }}
          >
            Your payment method will be securely processed through Stripe. You can update it at any time in Settings.
          </p>
          {hasPaymentMethod ? (
            <div className="flex items-center gap-3 p-4 bg-spotify-dark-gray rounded-md">
              <CreditCard className="w-5 h-5 text-spotify-text-gray" />
              <div>
                <div className="text-white font-medium">•••• •••• •••• 4242</div>
                <div className="text-xs text-spotify-text-gray">Expires 12/25</div>
              </div>
              <button 
                className="ml-auto text-spotify-green hover:text-[#1ED760] text-sm font-medium transition-colors"
                onClick={() => setHasPaymentMethod(false)}
              >
                Change
              </button>
            </div>
          ) : (
            <button 
              className="bg-spotify-green hover:bg-[#1ED760] text-black px-6 py-3 rounded-full font-medium transition-colors"
              style={{
                borderRadius: '500px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.1em'
              }}
              onClick={() => setHasPaymentMethod(true)}
            >
              Add Payment Method
            </button>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 
            className="text-xl font-bold mb-4"
            style={{ fontSize: '24px', lineHeight: '28px', fontWeight: 700 }}
          >
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: '16px', fontWeight: 600 }}>
                Can I change plans anytime?
              </h3>
              <p className="text-spotify-text-gray" style={{ fontSize: '14px', lineHeight: '20px' }}>
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: '16px', fontWeight: 600 }}>
                What payment methods do you accept?
              </h3>
              <p className="text-spotify-text-gray" style={{ fontSize: '14px', lineHeight: '20px' }}>
                We accept all major credit cards, debit cards, and PayPal through our secure Stripe integration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: '16px', fontWeight: 600 }}>
                Can I cancel my subscription?
              </h3>
              <p className="text-spotify-text-gray" style={{ fontSize: '14px', lineHeight: '20px' }}>
                Yes, you can cancel your subscription at any time. Your access continues until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}