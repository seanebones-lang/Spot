<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePlayerStore } from "@/stores/playerStore";
import { logger } from "@/lib/logger";
import { mockData } from "@/lib/data";
import { Track } from "@/types/track";
import PlayButton from "@/components/PlayButton";
import AdBanner from "@/components/AdBanner";
import ErrorToast from "@/components/ErrorToast";
import OnboardingTour from "@/components/OnboardingTour";
import Tooltip from "@/components/Tooltip";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Heart, Music, Radio, Check } from "lucide-react";
=======
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlayerStore } from '@/stores/playerStore';
import { mockData } from '@/lib/data';
import { Track } from '@/types/track';
import PlayButton from '@/components/PlayButton';
import AdBanner from '@/components/AdBanner';
import ErrorToast from '@/components/ErrorToast';
import OnboardingTour from '@/components/OnboardingTour';
import Tooltip from '@/components/Tooltip';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Heart, Music, Radio, Check } from 'lucide-react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function HomePage() {
  const tracks = mockData.getTracks();
  const playlists = mockData.getPlaylists();
  const artists = mockData.getArtists();
<<<<<<< HEAD
  const {
    setCurrentTrack,
    setIsPlaying,
    currentTrack,
    isPlaying,
    addToQueue,
    addToRecentlyPlayed,
    recentlyPlayed,
  } = usePlayerStore();
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issue: only check localStorage after mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const completed = localStorage.getItem("onboarding_completed");
=======
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying, addToQueue, addToRecentlyPlayed, recentlyPlayed } = usePlayerStore();
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fix hydration issue: only check localStorage and window after mount
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    try {
      const completed = localStorage.getItem('onboarding_completed');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      if (!completed) {
        setShowOnboarding(true);
      }
    } catch (err) {
      // localStorage might not be available (e.g., in incognito mode)
<<<<<<< HEAD
      logger.warn("localStorage not available, skipping onboarding check");
    }
=======
      console.warn('localStorage not available, skipping onboarding check');
    }
    
    return () => window.removeEventListener('resize', handleResize);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }, []);

  const handlePlayTrack = (track: Track, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
<<<<<<< HEAD
    logger.debug("handlePlayTrack called", {
      trackName: track.name,
      trackId: track.id,
    });

    try {
      // Clear any previous errors
      setError(null);

      // Add track to queue first if not already there
      addToQueue(track);

      // Set as current track first
      setCurrentTrack(track);
      logger.debug("Track set in store", { trackName: track.name });

      // Add to recently played
      addToRecentlyPlayed(track);

      // Then set playing - Player component will handle loading
      setIsPlaying(true);
      logger.debug("Playing set to true");
    } catch (error) {
      logger.error("Error in handlePlayTrack", error as Error, {
        trackId: track.id,
        trackName: track.name,
      });
      setError("Failed to play track. Please try again.");
=======
    console.log('🎵 handlePlayTrack called:', track.name, track.audioUrl);
    console.log('🎵 Track data:', { id: track.id, name: track.name, audioUrl: track.audioUrl });
    
    try {
      // Clear any previous errors
      setError(null);
      
      // Add track to queue first if not already there
      addToQueue(track);
      
      // Set as current track first
      setCurrentTrack(track);
      console.log('✅ Track set in store:', track.name);
      
      // Add to recently played
      addToRecentlyPlayed(track);
      
      // Then set playing - Player component will handle loading
      setIsPlaying(true);
      console.log('✅ Playing set to true');
    } catch (error) {
      console.error('❌ Error in handlePlayTrack:', error);
      setError('Failed to play track. Please try again.');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }
  };

  const handleRetry = () => {
    if (currentTrack) {
      handlePlayTrack(currentTrack);
    }
  };

<<<<<<< HEAD
  const handlePlayPlaylist = (playlist: (typeof playlists)[0]) => {
    // Add all playlist tracks to queue and play first
    const firstTrack = tracks.find((t) => t.id === playlist.tracks[0]?.id);
=======
  const handlePlayPlaylist = (playlist: typeof playlists[0]) => {
    // Add all playlist tracks to queue and play first
    const firstTrack = tracks.find(t => t.id === playlist.tracks[0]?.id);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (firstTrack) {
      setCurrentTrack(firstTrack);
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="w-full"
      style={{
<<<<<<< HEAD
        padding: "32px",
        paddingBottom: "24px",
        backgroundColor: "#121212",
        minHeight: "100%",
      }}
    >
      {/* Onboarding Tour - Only render after mount to prevent hydration issues */}
      {isMounted && showOnboarding && (
        <OnboardingTour onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Error Toast */}
      {error && (
        <ErrorToast
          message={error}
=======
        padding: isMobile ? '16px' : '32px',
        paddingBottom: '24px',
        backgroundColor: '#121212',
        minHeight: '100%'
      }}
    >
      {/* Onboarding Tour - Only render after mount to prevent hydration issues */}
      {isMounted && showOnboarding && <OnboardingTour onComplete={() => setShowOnboarding(false)} />}

      {/* Error Toast */}
      {error && (
        <ErrorToast 
          message={error} 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          onRetry={handleRetry}
          onDismiss={() => setError(null)}
        />
      )}

      {/* Ad Banner (for free tier) - Temporarily disabled for testing */}
      {/* <AdBanner type="banner" className="mb-8" /> */}

      {/* Recently Played Section - Exact Spotify Style (MOVED TO TOP - Music First!) */}
      {recentlyPlayed.length > 0 && (
<<<<<<< HEAD
        <section className="mb-8" style={{ marginBottom: "32px" }}>
          <div
            className="flex items-center justify-between mb-4"
            style={{ marginBottom: "16px" }}
          >
            <h2
              className="transition-colors gpu-accelerated"
              style={{
                fontSize: "20px",
                lineHeight: "24px",
                height: "24px",
                fontWeight: 700,
                color: "#FFFFFF",
                display: "inline-flex",
                textDecoration: "underline",
                transition: "color 0.05s cubic-bezier(0.3, 0, 1)",
                position: "static",
                cursor: "pointer",
=======
        <section className="mb-8" style={{ marginBottom: '32px' }}>
          <div 
            className="flex items-center justify-between mb-4"
            style={{ marginBottom: '16px' }}
          >
            <h2 
              className="transition-colors gpu-accelerated"
              style={{ 
                fontSize: '20px',
                lineHeight: '24px',
                height: '24px',
                fontWeight: 700,
                color: '#FFFFFF',
                display: 'inline-flex',
                textDecoration: 'underline',
                transition: 'color 0.05s cubic-bezier(0.3, 0, 1)',
                position: 'static',
                cursor: 'pointer'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              Recently Played
            </h2>
<<<<<<< HEAD
            <Link
              href="/history"
              className="text-sm text-spotify-text-gray hover:underline"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 700,
                color: "#B3B3B3",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#B3B3B3";
                e.currentTarget.style.textDecoration = "none";
=======
            <Link 
              href="/history" 
              className="text-sm text-spotify-text-gray hover:underline"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 700,
                color: '#B3B3B3',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B3B3B3';
                e.currentTarget.style.textDecoration = 'none';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              See all
            </Link>
          </div>
<<<<<<< HEAD
          <div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            style={{ gap: "16px" }}
=======
          <div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            style={{ gap: '16px' }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          >
            {recentlyPlayed.slice(0, 6).map((track) => (
              <div
                key={track.id}
                className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-dark-gray transition-all duration-200 group cursor-pointer"
                style={{
<<<<<<< HEAD
                  backgroundColor: "#181818",
                  borderRadius: "8px",
                  padding: "16px",
                  transition: "background-color 200ms ease-out",
                }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("button")) return;
                  handlePlayTrack(track);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#282828";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#181818";
                }}
              >
                <div className="relative mb-3" style={{ marginBottom: "12px" }}>
=======
                  backgroundColor: '#181818',
                  borderRadius: '8px',
                  padding: '16px',
                  transition: 'background-color 200ms ease-out'
                }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  handlePlayTrack(track);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#282828';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#181818';
                }}
              >
                <div className="relative mb-3" style={{ marginBottom: '12px' }}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  <ImageWithFallback
                    src={track.coverArt}
                    alt={track.name}
                    className="w-full aspect-square object-cover rounded"
<<<<<<< HEAD
                    style={{ borderRadius: "4px", aspectRatio: "1" }}
                  />
                  {/* Visual indicator for previously played tracks */}
                  {recentlyPlayed.some((t) => t.id === track.id) && (
                    <div
                      className="absolute top-2 right-2 bg-spotify-green rounded-full p-1"
                      style={{
                        top: "8px",
                        right: "8px",
                        backgroundColor: "#1DB954",
                        borderRadius: "50%",
                        padding: "4px",
                        zIndex: 1,
                      }}
                      aria-label="Previously played"
                    >
                      <Check
                        size={12}
                        className="text-black"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                  )}
                  <div
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      bottom: "8px",
                      right: "8px",
                      transition: "opacity 200ms ease-out",
=======
                    style={{ borderRadius: '4px', aspectRatio: '1' }}
                  />
                  {/* Visual indicator for previously played tracks */}
                  {recentlyPlayed.some(t => t.id === track.id) && (
                    <div 
                      className="absolute top-2 right-2 bg-spotify-green rounded-full p-1"
                      style={{
                        top: '8px',
                        right: '8px',
                        backgroundColor: '#7209B7',
                        borderRadius: '50%',
                        padding: '4px',
                        zIndex: 1
                      }}
                      aria-label="Previously played"
                    >
                      <Check size={12} className="text-black" style={{ width: '12px', height: '12px' }} />
                    </div>
                  )}
                  <div 
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      bottom: '8px',
                      right: '8px',
                      transition: 'opacity 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    <PlayButton
                      isPlaying={currentTrack?.id === track.id && isPlaying}
                      onClick={() => handlePlayTrack(track)}
                      size="sm"
                    />
                  </div>
                </div>
<<<<<<< HEAD
                <h3
                  className="font-semibold text-sm mb-1 truncate"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "4px",
=======
                <h3 
                  className="font-semibold text-sm mb-1 truncate"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {track.name}
                </h3>
<<<<<<< HEAD
                <p
                  className="text-xs text-spotify-text-gray truncate"
                  style={{
                    fontSize: "13px",
                    lineHeight: "16px",
                    color: "#B3B3B3",
=======
                <p 
                  className="text-xs text-spotify-text-gray truncate"
                  style={{
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {track.artist}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

<<<<<<< HEAD
      {/* Made for You - Exact Spotify Style */}
      <section className="mb-8" style={{ marginBottom: "32px" }}>
        <div
          className="flex items-center justify-between mb-4"
          style={{ marginBottom: "16px" }}
        >
          <h2
            className="transition-colors gpu-accelerated"
            style={{
              fontSize: "20px",
              lineHeight: "24px",
              height: "24px",
              fontWeight: 700,
              color: "#FFFFFF",
              display: "inline-flex",
              textDecoration: "underline",
              transition: "color 0.05s cubic-bezier(0.3, 0, 1)",
              position: "static",
              cursor: "pointer",
=======
{/* Made for You - Exact Spotify Style */}
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <div 
          className="flex items-center justify-between mb-4"
          style={{ marginBottom: '16px' }}
        >
          <h2 
            className="transition-colors gpu-accelerated"
            style={{ 
              fontSize: '20px',
              lineHeight: '24px',
              height: '24px',
              fontWeight: 700,
              color: '#FFFFFF',
              display: 'inline-flex',
              textDecoration: 'underline',
              transition: 'color 0.05s cubic-bezier(0.3, 0, 1)',
              position: 'static',
              cursor: 'pointer'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Made for You
          </h2>
<<<<<<< HEAD
          <Link
            href="/mood"
            className="text-sm text-spotify-text-gray hover:underline"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 700,
              color: "#B3B3B3",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#B3B3B3";
              e.currentTarget.style.textDecoration = "none";
=======
          <Link 
            href="/mood" 
            className="text-sm text-spotify-text-gray hover:underline"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              color: '#B3B3B3',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#B3B3B3';
              e.currentTarget.style.textDecoration = 'none';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            See all
          </Link>
        </div>
<<<<<<< HEAD
        <div
          className="relative"
          style={{ position: "relative", overflow: "visible" }}
        >
          <div
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{
              gap: "16px",
              overflowX: "auto",
              paddingBottom: "8px",
=======
        <div 
          className="relative"
          style={{ position: 'relative', overflow: 'visible' }}
        >
          <div 
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{ 
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {playlists.map((playlist, index) => (
              <div
                key={playlist.id}
                className="flex flex-col transition-all gpu-accelerated group cursor-pointer"
                style={{
<<<<<<< HEAD
                  width: "168px",
                  height: "220px",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  position: "relative",
                  display: "block",
                  transition:
                    "transform 200ms cubic-bezier(0.3, 0, 0.1, 1), z-index 0ms",
                  zIndex: 0,
                  flexShrink: 0,
                  willChange: "transform",
                }}
                onClick={() => handlePlayPlaylist(playlist)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.zIndex = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.zIndex = "0";
                }}
              >
                <div
                  className="relative mb-3"
                  style={{
                    marginBottom: "12px",
                    width: "168px",
                    height: "168px",
                  }}
                >
=======
                  width: '168px',
                  height: '220px',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  position: 'relative',
                  display: 'block',
                  transition: 'transform 200ms cubic-bezier(0.3, 0, 0.1, 1), z-index 0ms',
                  zIndex: 0,
                  flexShrink: 0,
                  willChange: 'transform'
                }}
                onClick={() => handlePlayPlaylist(playlist)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.zIndex = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.zIndex = '0';
                }}
              >
                <div className="relative mb-3" style={{ marginBottom: '12px', width: '168px', height: '168px' }}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  <ImageWithFallback
                    src={playlist.coverArt}
                    alt={playlist.name}
                    className="w-full h-full object-cover rounded"
<<<<<<< HEAD
                    style={{ borderRadius: "4px" }}
                  />
                  <div
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      bottom: "8px",
                      right: "8px",
                      transition: "opacity 200ms ease-out",
                    }}
                  >
                    <PlayButton
                      isPlaying={
                        currentTrack?.id === playlist.tracks[0]?.id && isPlaying
                      }
=======
                    style={{ borderRadius: '4px' }}
                  />
                  <div 
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      bottom: '8px',
                      right: '8px',
                      transition: 'opacity 200ms ease-out'
                    }}
                  >
                    <PlayButton
                      isPlaying={currentTrack?.id === playlist.tracks[0]?.id && isPlaying}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      onClick={() => handlePlayPlaylist(playlist)}
                      size="sm"
                    />
                  </div>
                </div>
<<<<<<< HEAD
                <h3
                  className="font-semibold text-sm mb-1 truncate"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "4px",
=======
                <h3 
                  className="font-semibold text-sm mb-1 truncate"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {playlist.name}
                </h3>
<<<<<<< HEAD
                <p
                  className="text-xs text-spotify-text-gray line-clamp-2"
                  style={{
                    fontSize: "13px",
                    lineHeight: "16px",
                    color: "#B3B3B3",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    height: "32px",
=======
                <p 
                  className="text-xs text-spotify-text-gray line-clamp-2"
                  style={{
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#B3B3B3',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: '32px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {playlist.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Songs - Horizontal Card Layout */}
<<<<<<< HEAD
      <section className="mb-8" style={{ marginBottom: "32px" }}>
        <h2
          className="transition-colors gpu-accelerated mb-4"
          style={{
            fontSize: "20px",
            lineHeight: "24px",
            height: "24px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
            display: "inline-flex",
            textDecoration: "underline",
            transition: "color 0.05s cubic-bezier(0.3, 0, 1)",
            position: "static",
            cursor: "pointer",
=======
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="transition-colors gpu-accelerated mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            height: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px',
            display: 'inline-flex',
            textDecoration: 'underline',
            transition: 'color 0.05s cubic-bezier(0.3, 0, 1)',
            position: 'static',
            cursor: 'pointer'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Trending Songs
        </h2>
<<<<<<< HEAD
        <div
          className="relative"
          style={{ position: "relative", overflow: "visible" }}
        >
          <div
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{
              gap: "16px",
              overflowX: "auto",
              paddingBottom: "8px",
=======
        <div 
          className="relative"
          style={{ position: 'relative', overflow: 'visible' }}
        >
          <div 
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{ 
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {tracks.map((track) => (
              <div
                key={track.id}
                className="flex flex-col transition-all gpu-accelerated group cursor-pointer"
                style={{
<<<<<<< HEAD
                  width: "168px",
                  height: "220px",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  position: "relative",
                  display: "block",
                  transition:
                    "transform 200ms cubic-bezier(0.3, 0, 0.1, 1), z-index 0ms",
                  zIndex: 0,
                  flexShrink: 0,
                  willChange: "transform",
                }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("button")) return;
                  handlePlayTrack(track);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.zIndex = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.zIndex = "0";
                }}
              >
                <div
                  className="relative mb-3"
                  style={{
                    marginBottom: "12px",
                    width: "168px",
                    height: "168px",
                  }}
                >
=======
                  width: '168px',
                  height: '220px',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  position: 'relative',
                  display: 'block',
                  transition: 'transform 200ms cubic-bezier(0.3, 0, 0.1, 1), z-index 0ms',
                  zIndex: 0,
                  flexShrink: 0,
                  willChange: 'transform'
                }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  handlePlayTrack(track);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.zIndex = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.zIndex = '0';
                }}
              >
                <div className="relative mb-3" style={{ marginBottom: '12px', width: '168px', height: '168px' }}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  <ImageWithFallback
                    src={track.coverArt}
                    alt={track.name}
                    className="w-full h-full object-cover rounded"
<<<<<<< HEAD
                    style={{ borderRadius: "4px" }}
                  />
                  {/* Visual indicator for previously played tracks */}
                  {recentlyPlayed.some((t) => t.id === track.id) && (
                    <div
                      className="absolute top-2 right-2 bg-spotify-green rounded-full p-1"
                      style={{
                        top: "8px",
                        right: "8px",
                        backgroundColor: "#1DB954",
                        borderRadius: "50%",
                        padding: "4px",
                        zIndex: 1,
                      }}
                      aria-label="Previously played"
                    >
                      <Check
                        size={12}
                        className="text-black"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                  )}
                  <div
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      bottom: "8px",
                      right: "8px",
                      transition: "opacity 200ms ease-out",
=======
                    style={{ borderRadius: '4px' }}
                  />
                  {/* Visual indicator for previously played tracks */}
                  {recentlyPlayed.some(t => t.id === track.id) && (
                    <div 
                      className="absolute top-2 right-2 bg-spotify-green rounded-full p-1"
                      style={{
                        top: '8px',
                        right: '8px',
                        backgroundColor: '#7209B7',
                        borderRadius: '50%',
                        padding: '4px',
                        zIndex: 1
                      }}
                      aria-label="Previously played"
                    >
                      <Check size={12} className="text-black" style={{ width: '12px', height: '12px' }} />
                    </div>
                  )}
                  <div 
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      bottom: '8px',
                      right: '8px',
                      transition: 'opacity 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    <PlayButton
                      isPlaying={currentTrack?.id === track.id && isPlaying}
                      onClick={() => handlePlayTrack(track)}
                      size="sm"
                    />
                  </div>
                </div>
<<<<<<< HEAD
                <h3
                  className="font-semibold text-sm mb-1 truncate"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color:
                      currentTrack?.id === track.id ? "#1DB954" : "#FFFFFF",
                    marginBottom: "4px",
=======
                <h3 
                  className="font-semibold text-sm mb-1 truncate"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 600,
                    color: currentTrack?.id === track.id ? '#7209B7' : '#FFFFFF',
                    marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {track.name}
                </h3>
<<<<<<< HEAD
                <p
                  className="text-xs text-spotify-text-gray truncate"
                  style={{
                    fontSize: "13px",
                    lineHeight: "16px",
                    color: "#B3B3B3",
=======
                <p 
                  className="text-xs text-spotify-text-gray truncate"
                  style={{
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {track.artist}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Artists - Exact Spotify Style */}
<<<<<<< HEAD
      <section className="mb-8" style={{ marginBottom: "32px" }}>
        <h2
          className="transition-colors gpu-accelerated mb-4"
          style={{
            fontSize: "20px",
            lineHeight: "24px",
            height: "24px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
            display: "inline-flex",
            textDecoration: "underline",
            transition: "color 0.05s cubic-bezier(0.3, 0, 1)",
            position: "static",
            cursor: "pointer",
=======
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="transition-colors gpu-accelerated mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            height: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px',
            display: 'inline-flex',
            textDecoration: 'underline',
            transition: 'color 0.05s cubic-bezier(0.3, 0, 1)',
            position: 'static',
            cursor: 'pointer'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Popular Artists
        </h2>
<<<<<<< HEAD
        <div
          className="relative"
          style={{
            position: "relative",
            overflow: "visible",
          }}
        >
          <div
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{
              gap: "16px",
              overflowX: "auto",
              paddingBottom: "8px",
=======
        <div 
          className="relative"
          style={{ 
            position: 'relative',
            overflow: 'visible'
          }}
        >
          <div 
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{ 
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {artists.map((artist, index) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className="flex flex-col transition-all gpu-accelerated text-center group"
                style={{
<<<<<<< HEAD
                  width: "168px",
                  height: "198px",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  position: "relative",
                  display: "block",
                  transition:
                    "transform 200ms cubic-bezier(0.3, 0, 0.1, 1), z-index 0ms",
                  zIndex: 0,
                  textDecoration: "none",
                  flexShrink: 0,
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.zIndex = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.zIndex = "0";
                }}
              >
                <div
                  className="w-full rounded-full overflow-hidden mb-3"
                  style={{
                    width: "168px",
                    height: "168px",
                    marginBottom: "12px",
                    borderRadius: "50%",
=======
                  width: '168px',
                  height: '198px',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  position: 'relative',
                  display: 'block',
                  transition: 'transform 200ms cubic-bezier(0.3, 0, 0.1, 1), z-index 0ms',
                  zIndex: 0,
                  textDecoration: 'none',
                  flexShrink: 0,
                  willChange: 'transform'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.zIndex = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.zIndex = '0';
                }}
              >
                <div 
                  className="w-full rounded-full overflow-hidden mb-3"
                  style={{
                    width: '168px',
                    height: '168px',
                    marginBottom: '12px',
                    borderRadius: '50%'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  <ImageWithFallback
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover"
<<<<<<< HEAD
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <h3
                  className="font-semibold text-sm truncate"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    textAlign: "center",
                    padding: "0 4px",
=======
                    style={{ borderRadius: '50%' }}
                  />
                </div>
                <h3 
                  className="font-semibold text-sm truncate"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    textAlign: 'center',
                    padding: '0 4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {artist.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Categories - Exact Spotify Style */}
<<<<<<< HEAD
      <section className="mb-8" style={{ marginBottom: "32px" }}>
        <h2
          className="transition-colors gpu-accelerated mb-4"
          style={{
            fontSize: "20px",
            lineHeight: "24px",
            height: "24px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
            display: "inline-flex",
            textDecoration: "underline",
            transition: "color 0.05s cubic-bezier(0.3, 0, 1)",
            position: "static",
            cursor: "pointer",
=======
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="transition-colors gpu-accelerated mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            height: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px',
            display: 'inline-flex',
            textDecoration: 'underline',
            transition: 'color 0.05s cubic-bezier(0.3, 0, 1)',
            position: 'static',
            cursor: 'pointer'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Specialized Categories
        </h2>
<<<<<<< HEAD
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ gap: "16px" }}
=======
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ gap: '16px' }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        >
          <Tooltip
            text="Healing frequencies designed to promote relaxation and wellness. Based on sound therapy principles."
            position="top"
            showInfoIcon={true}
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <Music size={32} className="mb-3" />
              <h3 className="text-lg font-bold mb-2">MHz Sounds</h3>
<<<<<<< HEAD
              <p className="text-sm text-white/80 mb-4">
                Healing frequencies for wellness
              </p>
=======
              <p className="text-sm text-white/80 mb-4">Healing frequencies for wellness</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              <Link href="/categories/mhz-sounds" className="text-sm underline">
                Explore →
              </Link>
            </div>
          </Tooltip>
          <Tooltip
            text="Specially curated audio content to support individuals on recovery journeys. Comforting sounds and music."
            position="top"
            showInfoIcon={true}
          >
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg p-6 text-white">
              <Radio size={32} className="mb-3" />
              <h3 className="text-lg font-bold mb-2">Withdrawal Sounds</h3>
<<<<<<< HEAD
              <p className="text-sm text-white/80 mb-4">
                Support for recovery journeys
              </p>
              <Link
                href="/categories/withdrawal-sounds"
                className="text-sm underline"
              >
=======
              <p className="text-sm text-white/80 mb-4">Support for recovery journeys</p>
              <Link href="/categories/withdrawal-sounds" className="text-sm underline">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                Explore →
              </Link>
            </div>
          </Tooltip>
          <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-lg p-6 text-white">
            <Heart size={32} className="mb-3" />
            <h3 className="text-lg font-bold mb-2">Mental Health Podcasts</h3>
<<<<<<< HEAD
            <p className="text-sm text-white/80 mb-4">
              Stories, tips, and support
            </p>
            <Link
              href="/radio?category=mental-health"
              className="text-sm underline"
            >
=======
            <p className="text-sm text-white/80 mb-4">Stories, tips, and support</p>
            <Link href="/radio?category=mental-health" className="text-sm underline">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              Listen →
            </Link>
          </div>
        </div>
      </section>

      {/* Radio Stations - Horizontal Scrollable Cards */}
<<<<<<< HEAD
      <section className="mb-8" style={{ marginBottom: "32px" }}>
        <h2
          className="transition-colors gpu-accelerated mb-4"
          style={{
            fontSize: "20px",
            lineHeight: "24px",
            height: "24px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
            display: "inline-flex",
            textDecoration: "underline",
            transition: "color 0.05s cubic-bezier(0.3, 0, 1)",
            position: "static",
            cursor: "pointer",
=======
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="transition-colors gpu-accelerated mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            height: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px',
            display: 'inline-flex',
            textDecoration: 'underline',
            transition: 'color 0.05s cubic-bezier(0.3, 0, 1)',
            position: 'static',
            cursor: 'pointer'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Radio Stations
        </h2>
<<<<<<< HEAD
        <div
          className="relative"
          style={{ position: "relative", overflow: "visible" }}
        >
          <div
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{
              gap: "16px",
              overflowX: "auto",
              paddingBottom: "8px",
            }}
          >
            {[
              "Pop Radio",
              "Rock Radio",
              "Electronic Radio",
              "Hip-Hop Radio",
              "Jazz Radio",
              "Classical Radio",
            ].map((station) => (
=======
        <div 
          className="relative"
          style={{ position: 'relative', overflow: 'visible' }}
        >
          <div 
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{ 
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px'
            }}
          >
            {['Pop Radio', 'Rock Radio', 'Electronic Radio', 'Hip-Hop Radio', 'Jazz Radio', 'Classical Radio'].map((station) => (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              <div
                key={station}
                className="flex flex-col transition-all gpu-accelerated group cursor-pointer"
                style={{
<<<<<<< HEAD
                  width: "168px",
                  height: "220px",
                  backgroundColor: "#181818",
                  borderRadius: "8px",
                  padding: "16px",
                  position: "relative",
                  transition:
                    "background-color 200ms ease-out, transform 200ms cubic-bezier(0.3, 0, 0.1, 1)",
                  flexShrink: 0,
                  willChange: "transform, background-color",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#282828";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#181818";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "4px",
                    marginBottom: "12px",
                    background:
                      "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Radio size={32} style={{ opacity: 0.5, color: "#FFFFFF" }} />
                </div>
                <h3
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
=======
                  width: '168px',
                  height: '220px',
                  backgroundColor: '#181818',
                  borderRadius: '8px',
                  padding: '16px',
                  position: 'relative',
                  transition: 'background-color 200ms ease-out, transform 200ms cubic-bezier(0.3, 0, 0.1, 1)',
                  flexShrink: 0,
                  willChange: 'transform, background-color'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#282828';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#181818';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div 
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    background: 'linear-gradient(135deg, #7209B7 0%, #457B9D 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Radio size={32} style={{ opacity: 0.5, color: '#FFFFFF' }} />
                </div>
                <h3 
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {station}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
