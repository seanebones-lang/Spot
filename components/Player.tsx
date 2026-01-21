<<<<<<< HEAD
"use client";

import { useEffect, useState, memo } from "react";
import { Shuffle, SkipBack, SkipForward, Repeat, List } from "lucide-react";
import { usePlayerStore } from "@/stores/playerStore";
import { audioPlayer } from "@/lib/player";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import PictureInPicturePlayer from "./PictureInPicturePlayer";
import QueuePanel from "./QueuePanel";
import FullScreenPlayer from "./FullScreenPlayer";
import ImageWithFallback from "./ImageWithFallback";
import { formatDuration } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
import { logger } from "@/lib/logger";

const Player = memo(function Player() {
=======
'use client';

import { useEffect, useState, useTransition, memo, useMemo, useCallback } from 'react';
import { Shuffle, SkipBack, SkipForward, Repeat, List } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { audioPlayer } from '@/lib/player';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import ImageWithFallback from './ImageWithFallback';
import { formatDuration } from '@/lib/utils';
import { Maximize2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load heavy modal components
const PictureInPicturePlayer = dynamic(() => import('./PictureInPicturePlayer'), { ssr: false });
const QueuePanel = dynamic(() => import('./QueuePanel'), { ssr: false });
const FullScreenPlayer = dynamic(() => import('./FullScreenPlayer'), { ssr: false });

function Player() {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    shuffle,
    repeat,
    setIsPlaying,
    setProgress,
    setVolume,
    setShuffle,
    setRepeat,
    playNext,
    playPrevious,
  } = usePlayerStore();

  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
<<<<<<< HEAD

  useEffect(() => {
    if (currentTrack) {
      logger.debug("Player: Loading track", {
        trackName: currentTrack.name,
        audioUrl: currentTrack.audioUrl,
      });
=======
  const [isMobile, setIsMobile] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentTrack) {
      // Check if audioUrl exists (media content not loaded yet)
      if (!currentTrack.audioUrl) {
        console.log('ℹ️ Player: Track has no audio URL (UI-only mode):', currentTrack.name);
        setProgress(0);
        return;
      }

      console.log('🎧 Player: Loading track:', currentTrack.name, currentTrack.audioUrl);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const wasPlaying = isPlaying;

      // Set up load callback to auto-play if was playing
      audioPlayer.setOnLoadCallback(() => {
        if (wasPlaying) {
<<<<<<< HEAD
          logger.debug("Track loaded, resuming playback");
=======
          console.log('✅ Track loaded, resuming playback');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          audioPlayer.play();
          setIsPlaying(true);
        }
      });

      audioPlayer.loadTrack(
        currentTrack.audioUrl,
        currentTrack.id,
        (prog) => setProgress(prog),
        () => {
<<<<<<< HEAD
          if (repeat === "one") {
            audioPlayer.play();
          } else if (repeat === "all") {
=======
          if (repeat === 'one') {
            audioPlayer.play();
          } else if (repeat === 'all') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            playNext();
          } else {
            playNext();
          }
<<<<<<< HEAD
        },
=======
        }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );

      // Reset progress when loading new track
      setProgress(0);
    } else {
<<<<<<< HEAD
      logger.debug("Player: No currentTrack set");
=======
      console.log('⚠️ Player: No currentTrack set');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id, repeat]); // Only depend on track ID to avoid re-loading

  useEffect(() => {
<<<<<<< HEAD
    // Skip if no track loaded
    if (!currentTrack) return;

    logger.debug("Player: isPlaying changed", { isPlaying });
    if (isPlaying) {
      logger.debug("Player: Starting playback");
      audioPlayer.play();
    } else {
      logger.debug("Player: Pausing playback");
=======
    // Skip if no track loaded or no audio URL
    if (!currentTrack || !currentTrack.audioUrl) return;

    console.log('🎮 Player: isPlaying changed to:', isPlaying);
    if (isPlaying) {
      console.log('▶️ Player: Starting playback');
      audioPlayer.play();
    } else {
      console.log('⏸️ Player: Pausing playback');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      audioPlayer.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    audioPlayer.setVolume(volume);
  }, [volume]);

<<<<<<< HEAD
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (position: number) => {
    const seconds = position / 1000;
    audioPlayer.seek(seconds);
    const newProgress =
      position > 0 && currentTrack
        ? (position / currentTrack.duration) * 100
        : 0;
    setProgress(newProgress);
  };

  const currentTime = currentTrack
    ? (progress / 100) * currentTrack.duration
    : 0;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-player-height bg-spotify-dark-gray border-t border-spotify-light-gray px-2 sm:px-4 z-50"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "90px",
        backgroundColor: "#181818",
        borderTop: "1px solid #282828",
        padding: "0 8px",
        zIndex: 50,
      }}
    >
      <div
        className="flex items-center justify-between h-full max-w-screen-2xl mx-auto gap-2 sm:gap-4"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          maxWidth: "1536px",
          margin: "0 auto",
          gap: "8px",
        }}
      >
        {/* Left - Now Playing - Responsive for mobile */}
        <div
          className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0"
          style={{
            gap: "8px",
            minWidth: 0,
            flex: "1 1 30%",
          }}
        >
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 bg-spotify-light-gray rounded flex-shrink-0"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "4px",
              backgroundColor: "#282828",
              flexShrink: 0,
=======
  const handlePlayPause = useCallback(() => {
    startTransition(() => {
      setIsPlaying(!isPlaying);
    });
  }, [isPlaying, setIsPlaying]);

  const handleSeek = useCallback((position: number) => {
    const seconds = position / 1000;
    audioPlayer.seek(seconds);
    const newProgress = position > 0 && currentTrack 
      ? (position / currentTrack.duration) * 100 
      : 0;
    setProgress(newProgress);
  }, [currentTrack, setProgress]);
  
  const currentTime = useMemo(() => {
    return currentTrack 
      ? (progress / 100) * currentTrack.duration 
      : 0;
  }, [currentTrack, progress]);

  return (
    <div
      role="region"
      aria-label="Audio player"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-0 left-0 right-0 bg-spotify-dark-gray border-t border-spotify-light-gray px-2 sm:px-4 z-50"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: isMobile ? '60px' : '90px',
        backgroundColor: '#181818',
        borderTop: '1px solid #282828',
        padding: '0 8px',
        zIndex: 50,
        transition: 'height 300ms ease-out'
      }}
    >
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {currentTrack && (
          <>
            Now playing: {currentTrack.name} by {currentTrack.artist}
            {isPlaying ? 'Playing' : 'Paused'}
          </>
        )}
      </div>
      <div 
        className="flex items-center justify-between h-full max-w-screen-2xl mx-auto gap-2 sm:gap-4"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          maxWidth: '1536px',
          margin: '0 auto',
          gap: '8px'
        }}
      >
        {/* Left - Now Playing - Responsive for mobile */}
        <div 
          className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0"
          style={{
            gap: '8px',
            minWidth: 0,
            flex: '1 1 30%'
          }}
        >
          <div 
            className="w-12 h-12 sm:w-14 sm:h-14 bg-spotify-light-gray rounded flex-shrink-0"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '4px',
              backgroundColor: '#282828',
              flexShrink: 0
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {currentTrack?.coverArt ? (
              <ImageWithFallback
                src={currentTrack.coverArt}
                alt={currentTrack.name}
                className="w-full h-full object-cover rounded"
<<<<<<< HEAD
                style={{ borderRadius: "4px" }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="text-2xl" style={{ fontSize: "24px" }}>
                  🎵
                </span>
=======
                style={{ borderRadius: '4px' }}
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span className="text-2xl" style={{ fontSize: '24px' }}>🎵</span>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              </div>
            )}
          </div>
          {currentTrack ? (
            <>
              <div className="min-w-0" style={{ minWidth: 0 }}>
<<<<<<< HEAD
                <div
                  className="text-sm font-medium text-white truncate"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#FFFFFF",
=======
                <div 
                  className="text-sm font-medium text-white truncate"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 400,
                    color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {currentTrack.name}
                </div>
<<<<<<< HEAD
                <div className="flex items-center gap-2" style={{ gap: "8px" }}>
                  <div
                    className="text-xs text-spotify-text-gray truncate"
                    style={{
                      fontSize: "13px",
                      lineHeight: "16px",
                      color: "#B3B3B3",
=======
                <div 
                  className="flex items-center gap-2"
                  style={{ gap: '8px' }}
                >
                  <div 
                    className="text-xs text-spotify-text-gray truncate"
                    style={{
                      fontSize: '13px',
                      lineHeight: '16px',
                      color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {currentTrack.artist}
                  </div>
                </div>
              </div>
            </>
          ) : (
<<<<<<< HEAD
            <div
              className="text-sm text-spotify-text-gray"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
=======
            <div 
              className="text-sm text-spotify-text-gray"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              No track selected
            </div>
          )}
        </div>

        {/* Center - Controls - Responsive for mobile */}
        <div
<<<<<<< HEAD
          className="flex flex-col items-center gap-1 sm:gap-2 flex-1 hidden sm:flex"
          style={{
            flex: "1 1 40%",
            gap: "4px",
            maxWidth: "722px",
          }}
        >
          <div
            className="flex items-center gap-1 sm:gap-2"
            style={{
              gap: "8px",
              alignItems: "center",
              justifyContent: "center",
=======
          className="flex flex-col items-center gap-1 sm:gap-2 flex-1"
          style={{
            flex: isMobile ? '0 0 auto' : '1 1 40%',
            gap: isMobile ? '2px' : '4px',
            maxWidth: isMobile ? 'none' : '722px',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            justifyContent: 'center'
          }}
        >
          <div 
            className="flex items-center gap-1 sm:gap-2"
            style={{
              gap: '8px',
              alignItems: 'center',
              justifyContent: 'center'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            <button
              onClick={() => setShuffle(!shuffle)}
<<<<<<< HEAD
              aria-label={shuffle ? "Shuffle on" : "Shuffle off"}
              aria-pressed={shuffle}
              disabled={!currentTrack}
              className={`text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                shuffle ? "text-spotify-green" : ""
              }`}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: currentTrack ? "pointer" : "not-allowed",
                color: shuffle ? "#1DB954" : "#B3B3B3",
                transition: "color 200ms ease-out",
                opacity: currentTrack ? 1 : 0.5,
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (currentTrack && !shuffle) {
                  e.currentTarget.style.color = "#FFFFFF";
=======
              disabled={!currentTrack}
              aria-label={shuffle ? 'Shuffle on' : 'Shuffle off'}
              aria-pressed={shuffle}
              className={`text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                shuffle ? 'text-spotify-green' : ''
              }`}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: currentTrack ? 'pointer' : 'not-allowed',
                color: shuffle ? '#7209B7' : '#B3B3B3',
                transition: 'color 200ms ease-out',
                opacity: currentTrack ? 1 : 0.5,
                padding: '4px',
                display: isMobile ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (currentTrack && !shuffle) {
                  e.currentTarget.style.color = '#FFFFFF';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }
              }}
              onMouseLeave={(e) => {
                if (!shuffle) {
<<<<<<< HEAD
                  e.currentTarget.style.color = "#B3B3B3";
                }
              }}
            >
              <Shuffle size={16} style={{ width: "16px", height: "16px" }} />
            </button>
            <button
              onClick={playPrevious}
              aria-label="Previous track"
              disabled={!currentTrack}
              className="text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: currentTrack ? "pointer" : "not-allowed",
                color: "#B3B3B3",
                transition: "color 200ms ease-out",
                opacity: currentTrack ? 1 : 0.5,
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (currentTrack) {
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#B3B3B3";
              }}
            >
              <SkipBack size={20} style={{ width: "20px", height: "20px" }} />
            </button>
            <PlayButton
              isPlaying={isPlaying}
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              aria-pressed={isPlaying}
=======
                  e.currentTarget.style.color = '#B3B3B3';
                }
              }}
            >
              <Shuffle size={16} style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              onClick={playPrevious}
              disabled={!currentTrack}
              aria-label="Previous track"
              className="text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: currentTrack ? 'pointer' : 'not-allowed',
                color: '#B3B3B3',
                transition: 'color 200ms ease-out',
                opacity: currentTrack ? 1 : 0.5,
                padding: '4px',
                display: isMobile ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (currentTrack) {
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B3B3B3';
              }}
            >
              <SkipBack size={20} style={{ width: '20px', height: '20px' }} />
            </button>
            <PlayButton 
              isPlaying={isPlaying} 
              onClick={handlePlayPause} 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              size="md"
              disabled={!currentTrack}
            />
            <button
              onClick={playNext}
<<<<<<< HEAD
              aria-label="Next track"
              disabled={!currentTrack}
              className="text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: currentTrack ? "pointer" : "not-allowed",
                color: "#B3B3B3",
                transition: "color 200ms ease-out",
                opacity: currentTrack ? 1 : 0.5,
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (currentTrack) {
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#B3B3B3";
              }}
            >
              <SkipForward
                size={20}
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            <button
              onClick={() => {
                const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
=======
              disabled={!currentTrack}
              aria-label="Next track"
              className="text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: currentTrack ? 'pointer' : 'not-allowed',
                color: '#B3B3B3',
                transition: 'color 200ms ease-out',
                opacity: currentTrack ? 1 : 0.5,
                padding: '4px',
                display: isMobile ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (currentTrack) {
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B3B3B3';
              }}
            >
              <SkipForward size={20} style={{ width: '20px', height: '20px' }} />
            </button>
            <button
              onClick={() => {
                const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                const currentIndex = modes.indexOf(repeat);
                setRepeat(modes[(currentIndex + 1) % modes.length]);
              }}
              disabled={!currentTrack}
<<<<<<< HEAD
              aria-label={`Repeat ${repeat === "off" ? "off" : repeat === "all" ? "all" : "one"}`}
              aria-pressed={repeat !== "off"}
              className={`text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                repeat !== "off" ? "text-spotify-green" : ""
              }`}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: currentTrack ? "pointer" : "not-allowed",
                color: repeat !== "off" ? "#1DB954" : "#B3B3B3",
                transition: "color 200ms ease-out",
                opacity: currentTrack ? 1 : 0.5,
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (currentTrack && repeat === "off") {
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                if (repeat === "off") {
                  e.currentTarget.style.color = "#B3B3B3";
                }
              }}
            >
              <Repeat size={16} style={{ width: "16px", height: "16px" }} />
=======
              aria-label={`Repeat ${repeat === 'off' ? 'off' : repeat === 'all' ? 'all' : 'one'}`}
              aria-pressed={repeat !== 'off'}
              className={`text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                repeat !== 'off' ? 'text-spotify-green' : ''
              }`}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: currentTrack ? 'pointer' : 'not-allowed',
                color: repeat !== 'off' ? '#7209B7' : '#B3B3B3',
                transition: 'color 200ms ease-out',
                opacity: currentTrack ? 1 : 0.5,
                padding: '4px',
                display: isMobile ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (currentTrack && repeat === 'off') {
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (repeat === 'off') {
                  e.currentTarget.style.color = '#B3B3B3';
                }
              }}
            >
              <Repeat size={16} style={{ width: '16px', height: '16px' }} />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </button>
          </div>
          {currentTrack && (
            <ProgressBar
              progress={progress}
              duration={currentTrack.duration * 1000}
              currentTime={currentTime * 1000}
              onSeek={handleSeek}
            />
          )}
        </div>

        {/* Right - Volume & Extras - Responsive for mobile */}
        <div
          className="flex items-center gap-2 sm:gap-4 flex-1 justify-end"
          style={{
<<<<<<< HEAD
            flex: "1 1 30%",
            gap: "8px",
            justifyContent: "flex-end",
            alignItems: "center",
=======
            flex: isMobile ? '0 0 auto' : '1 1 30%',
            gap: '8px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: isMobile ? 'none' : 'flex'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          <button
            onClick={() => setIsQueueOpen(true)}
<<<<<<< HEAD
            aria-label="Open queue"
            aria-expanded={isQueueOpen}
            disabled={!currentTrack}
            className="text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: currentTrack ? "pointer" : "not-allowed",
              color: "#B3B3B3",
              transition: "color 200ms ease-out",
              opacity: currentTrack ? 1 : 0.5,
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
=======
            disabled={!currentTrack}
            className="text-spotify-text-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: currentTrack ? 'pointer' : 'not-allowed',
              color: '#B3B3B3',
              transition: 'color 200ms ease-out',
              opacity: currentTrack ? 1 : 0.5,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
            title="Queue"
            onMouseEnter={(e) => {
              if (currentTrack) {
<<<<<<< HEAD
                e.currentTarget.style.color = "#FFFFFF";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#B3B3B3";
            }}
          >
            <List size={20} style={{ width: "20px", height: "20px" }} />
=======
                e.currentTarget.style.color = '#FFFFFF';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#B3B3B3';
            }}
          >
            <List size={20} style={{ width: '20px', height: '20px' }} />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </button>
          {currentTrack && (
            <button
              onClick={() => setIsFullScreen(true)}
<<<<<<< HEAD
              aria-label="Open fullscreen player"
              className="text-spotify-text-gray hover:text-white transition-colors"
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#B3B3B3",
                transition: "color 200ms ease-out",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Full screen"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#B3B3B3";
              }}
            >
              <Maximize2 size={20} style={{ width: "20px", height: "20px" }} />
=======
              className="text-spotify-text-gray hover:text-white transition-colors"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#B3B3B3',
                transition: 'color 200ms ease-out',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Full screen"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B3B3B3';
              }}
            >
              <Maximize2 size={20} style={{ width: '20px', height: '20px' }} />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </button>
          )}
          {currentTrack && <PictureInPicturePlayer />}
          <VolumeControl volume={volume} onVolumeChange={setVolume} />
        </div>
      </div>
<<<<<<< HEAD

      <QueuePanel isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />
      <FullScreenPlayer
        isOpen={isFullScreen}
        onClose={() => setIsFullScreen(false)}
      />
    </div>
  );
});

export default Player;
=======
      
      {isQueueOpen && <QueuePanel isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />}
      {isFullScreen && <FullScreenPlayer isOpen={isFullScreen} onClose={() => setIsFullScreen(false)} />}
    </div>
  );
}

// Memoize Player to prevent unnecessary re-renders
export default memo(Player);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
