<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  type?: "banner" | "interstitial" | "psa";
=======
'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  type?: 'banner' | 'interstitial' | 'psa';
  mood?: string;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  className?: string;
  onClose?: () => void;
  onAdClick?: () => void;
}

<<<<<<< HEAD
export default function AdBanner({
  type = "banner",
  className,
  onClose,
  onAdClick,
=======
export default function AdBanner({ 
  type = 'banner', 
  mood,
  className,
  onClose,
  onAdClick 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}: AdBannerProps) {
  const [adContent, setAdContent] = useState<{
    title: string;
    description: string;
    image?: string;
    cta: string;
  } | null>(null);

  useEffect(() => {
<<<<<<< HEAD
    // In production, fetch contextual ad based on context
    // For now, use mock wellness-focused ads
    if (type === "psa") {
      setAdContent({
        title: "Mental Health Support",
        description:
          "If you or someone you know is struggling, help is available 24/7.",
        cta: "Get Help Now",
      });
    } else {
      setAdContent({
        title: "Premium Features",
        description:
          "Upgrade to Premium for ad-free listening and lossless audio.",
        cta: "Upgrade Now",
      });
    }
  }, [type]);

  if (!adContent) return null;

  if (type === "interstitial") {
    return (
      <div
        className={cn(
          "fixed inset-0 bg-black/90 z-[200] flex items-center justify-center",
          className,
        )}
      >
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
              <img
                src={adContent.image}
                alt=""
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
=======
              <img src={adContent.image} alt="" className="w-full h-48 object-cover rounded-lg mb-4" />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
    <div
      className={cn(
        "bg-spotify-light-gray rounded-lg p-4 relative transition-all duration-200 hover:bg-spotify-dark-gray",
        className,
      )}
      style={{
        borderRadius: "8px",
        backgroundColor: type === "psa" ? "#282828" : "#181818",
=======
    <div 
      className={cn(
        "bg-spotify-light-gray rounded-lg p-4 relative transition-all duration-200 hover:bg-spotify-dark-gray",
        className
      )}
      style={{
        borderRadius: '8px',
        backgroundColor: type === 'psa' ? '#282828' : '#181818'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-spotify-text-gray hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          aria-label="Close ad"
        >
<<<<<<< HEAD
          <X size={16} style={{ width: "16px", height: "16px" }} />
=======
          <X size={16} style={{ width: '16px', height: '16px' }} />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        </button>
      )}
      <div className="flex items-center gap-4">
        {adContent.image && (
<<<<<<< HEAD
          <img
            src={adContent.image}
            alt=""
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            style={{ borderRadius: "4px" }}
          />
        )}
        <div className="flex-1 min-w-0">
          {type === "psa" && (
            <div
              className="text-xs font-bold text-spotify-green mb-1 uppercase tracking-wider"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "#1DB954",
=======
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
                color: '#7209B7'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Public Service Announcement
            </div>
          )}
<<<<<<< HEAD
          <h4
            className="font-semibold text-white text-sm truncate"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
=======
          <h4 
            className="font-semibold text-white text-sm truncate"
            style={{ 
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 600
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {adContent.title}
          </h4>
<<<<<<< HEAD
          <p
            className="text-xs text-spotify-text-gray mt-1 line-clamp-2"
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              color: "#B3B3B3",
=======
          <p 
            className="text-xs text-spotify-text-gray mt-1 line-clamp-2"
            style={{ 
              fontSize: '12px',
              lineHeight: '16px',
              color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {adContent.description}
          </p>
        </div>
        <button
          onClick={onAdClick}
          className="px-4 py-2 bg-spotify-green hover:bg-[#1ED760] text-black rounded-full text-sm font-semibold transition-colors whitespace-nowrap flex-shrink-0"
          style={{
<<<<<<< HEAD
            borderRadius: "500px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.05em",
=======
            borderRadius: '500px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.05em'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          {adContent.cta}
        </button>
      </div>
    </div>
  );
}
