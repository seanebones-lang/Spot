'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  type?: 'banner' | 'interstitial' | 'psa';
  mood?: string;
  className?: string;
  onClose?: () => void;
  onAdClick?: () => void;
}

export default function AdBanner({ 
  type = 'banner', 
  mood,
  className,
  onClose,
  onAdClick 
}: AdBannerProps) {
  const [adContent, setAdContent] = useState<{
    title: string;
    description: string;
    image?: string;
    cta: string;
  } | null>(null);

  useEffect(() => {
    // In production, fetch contextual ad based on mood/context
    // For now, use mock wellness-focused ads
    if (type === 'psa') {
      setAdContent({
        title: 'Mental Health Support',
        description: 'If you or someone you know is struggling, help is available 24/7.',
        cta: 'Get Help Now',
      });
    } else if (mood) {
      setAdContent({
        title: 'Wellness Resources',
        description: `Discover tools to support your ${mood} mood journey.`,
        cta: 'Explore Wellness',
      });
    } else {
      setAdContent({
        title: 'Premium Features',
        description: 'Upgrade to Premium for ad-free listening and lossless audio.',
        cta: 'Upgrade Now',
      });
    }
  }, [type, mood]);

  if (!adContent) return null;

  if (type === 'interstitial') {
    return (
      <div className={cn("fixed inset-0 bg-black/90 z-[200] flex items-center justify-center", className)}>
        <div className="bg-spotify-dark-gray rounded-lg max-w-md w-full mx-4 p-6">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-spotify-text-gray hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
          <div className="text-center space-y-4">
            {adContent.image && (
              <img src={adContent.image} alt="" className="w-full h-48 object-cover rounded-lg mb-4" />
            )}
            <h3 className="text-xl font-bold text-white">{adContent.title}</h3>
            <p className="text-spotify-text-gray">{adContent.description}</p>
            <button
              onClick={onAdClick}
              className="w-full bg-spotify-green text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              {adContent.cta}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Banner style - matches Spotify ad banner styling
  return (
    <div 
      className={cn(
        "bg-spotify-light-gray rounded-lg p-4 relative transition-all duration-200 hover:bg-spotify-dark-gray",
        className
      )}
      style={{
        borderRadius: '8px',
        backgroundColor: type === 'psa' ? '#282828' : '#181818'
      }}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-spotify-text-gray hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          aria-label="Close ad"
        >
          <X size={16} style={{ width: '16px', height: '16px' }} />
        </button>
      )}
      <div className="flex items-center gap-4">
        {adContent.image && (
          <img 
            src={adContent.image} 
            alt="" 
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            style={{ borderRadius: '4px' }}
          />
        )}
        <div className="flex-1 min-w-0">
          {type === 'psa' && (
            <div 
              className="text-xs font-bold text-spotify-green mb-1 uppercase tracking-wider"
              style={{ 
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#1DB954'
              }}
            >
              Public Service Announcement
            </div>
          )}
          <h4 
            className="font-semibold text-white text-sm truncate"
            style={{ 
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 600
            }}
          >
            {adContent.title}
          </h4>
          <p 
            className="text-xs text-spotify-text-gray mt-1 line-clamp-2"
            style={{ 
              fontSize: '12px',
              lineHeight: '16px',
              color: '#B3B3B3'
            }}
          >
            {adContent.description}
          </p>
        </div>
        <button
          onClick={onAdClick}
          className="px-4 py-2 bg-spotify-green hover:bg-[#1ED760] text-black rounded-full text-sm font-semibold transition-colors whitespace-nowrap flex-shrink-0"
          style={{
            borderRadius: '500px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}
        >
          {adContent.cta}
        </button>
      </div>
    </div>
  );
}
