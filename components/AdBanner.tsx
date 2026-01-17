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

  return (
    <div className={cn(
      "bg-gradient-to-r from-empulse-purple/20 to-empulse-blue/20 border border-empulse-purple/30 rounded-lg p-4 relative",
      className
    )}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-spotify-text-gray hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      )}
      <div className="flex items-center gap-4">
        {adContent.image && (
          <img src={adContent.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-white text-sm">{adContent.title}</h4>
          <p className="text-xs text-spotify-text-gray mt-1">{adContent.description}</p>
        </div>
        <button
          onClick={onAdClick}
          className="px-4 py-2 bg-spotify-green text-black rounded-full text-sm font-semibold hover:scale-105 transition-transform whitespace-nowrap"
        >
          {adContent.cta}
        </button>
      </div>
    </div>
  );
}
