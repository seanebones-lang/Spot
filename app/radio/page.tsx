<<<<<<< HEAD
"use client";

import { useEffect, useRef } from "react";
import { Radio, Mic } from "lucide-react";
import PlayButton from "@/components/PlayButton";
import { logger } from "@/lib/logger";
import { useRadioStore, RadioStation } from "@/stores/radioStore";
import { usePlayerStore } from "@/stores/playerStore";
import { audioPlayer } from "@/lib/player";
import { Track } from "@/types/track";
import { MoodState } from "@/types/mood";
=======
'use client';

import { useEffect, useRef } from 'react';
import { Radio, Mic } from 'lucide-react';
import PlayButton from '@/components/PlayButton';
import { useRadioStore, RadioStation } from '@/stores/radioStore';
import { usePlayerStore } from '@/stores/playerStore';
import { audioPlayer } from '@/lib/player';
import { Track } from '@/types/track';
import { MoodState } from '@/types/mood';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function RadioPage() {
  const {
    stations,
    currentStation,
    isPlaying,
    isLoading,
    error,
    setStations,
    playStation,
    stopStation,
    togglePlayPause,
  } = useRadioStore();

<<<<<<< HEAD
  const {
    currentTrack,
    setCurrentTrack,
=======
  const { 
    currentTrack, 
    setCurrentTrack, 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    setIsPlaying: setPlayerIsPlaying,
    isPlaying: playerIsPlaying,
    setProgress,
  } = usePlayerStore();

  // Ref to prevent circular updates between radio store and player store
  const isSyncingRef = useRef(false);

  // Fetch stations on mount
  useEffect(() => {
    const fetchStations = async () => {
      try {
<<<<<<< HEAD
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const endpoint = apiUrl
          ? `${apiUrl}/api/radio/stations`
          : "/api/radio/stations";
=======
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const endpoint = apiUrl ? `${apiUrl}/api/radio/stations` : '/api/radio/stations';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setStations(data.stations);
        } else {
<<<<<<< HEAD
          logger.error("Failed to fetch stations", new Error("HTTP error"));
        }
      } catch (error) {
        logger.error("Error fetching stations", error as Error);
=======
          console.error('Failed to fetch stations');
        }
      } catch (error) {
        console.error('Error fetching stations:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }
    };

    fetchStations();
  }, [setStations]);

  // Handle station playback using system player
  useEffect(() => {
    if (!currentStation) {
      // If no station selected, clear track if it's a radio track
<<<<<<< HEAD
      if (currentTrack?.id?.startsWith("radio-")) {
=======
      if (currentTrack?.id?.startsWith('radio-')) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        setCurrentTrack(null);
        setPlayerIsPlaying(false);
      }
      return;
    }

    // Convert radio station to Track format for system player
    const createTrackFromStation = (station: RadioStation): Track => {
      const randomStart = Math.floor(Math.random() * station.duration);
<<<<<<< HEAD
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const streamUrl = apiUrl
        ? `${apiUrl}/api/radio/stream/${station.id}?start=${randomStart}&random=false`
        : `/api/radio/stream/${station.id}?start=${randomStart}&random=false`;

      return {
        id: `radio-${station.id}`,
        name: station.name,
        artist: "Radio Station",
        artistId: "radio",
        album: station.genre,
        albumId: "radio-stations",
        duration: station.duration * 1000, // Convert to milliseconds
        audioUrl: streamUrl,
        coverArt: "", // Radio stations don't have cover art
        moodTags: {
          mood: "Content" as MoodState,
=======
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const streamUrl = apiUrl
        ? `${apiUrl}/api/radio/stream/${station.id}?start=${randomStart}&random=false`
        : `/api/radio/stream/${station.id}?start=${randomStart}&random=false`;
      
      return {
        id: `radio-${station.id}`,
        name: station.name,
        artist: 'Radio Station',
        artistId: 'radio',
        album: station.genre,
        albumId: 'radio-stations',
        duration: station.duration * 1000, // Convert to milliseconds
        audioUrl: streamUrl,
        coverArt: '', // Radio stations don't have cover art
        moodTags: {
          mood: 'Content' as MoodState,
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          feelings: [],
          vibe: 5,
          genres: [],
        },
<<<<<<< HEAD
        format: "MP3",
        quality: "high",
=======
        format: 'MP3',
        quality: 'high',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        genre: station.genre,
      };
    };

    // Create track from station
    const radioTrack = createTrackFromStation(currentStation);
<<<<<<< HEAD

    // Only load if it's a different station
    if (currentTrack?.id !== radioTrack.id) {
      logger.info("Loading radio station", { stationName: currentStation.name });
      useRadioStore.getState().setIsLoading(true);

      // Set up load callback with error handling
      let loadTimeout: NodeJS.Timeout | null = null;

      audioPlayer.setOnLoadCallback(() => {
        logger.debug("Radio station loaded");
=======
    
    // Only load if it's a different station
    if (currentTrack?.id !== radioTrack.id) {
      console.log('📻 Loading radio station:', currentStation.name);
      useRadioStore.getState().setIsLoading(true);
      
      // Set up load callback with error handling
      let loadTimeout: NodeJS.Timeout | null = null;
      
      audioPlayer.setOnLoadCallback(() => {
        console.log('✅ Radio station loaded');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        if (loadTimeout) clearTimeout(loadTimeout);
        useRadioStore.getState().setIsLoading(false);
        // Check current playing state from store (not closure) to handle async state updates
        const currentIsPlaying = useRadioStore.getState().isPlaying;
        if (currentIsPlaying) {
<<<<<<< HEAD
          logger.debug("Auto-playing radio station");
=======
          console.log('▶️ Auto-playing radio station');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          // Small delay to ensure audio is fully ready
          setTimeout(() => {
            audioPlayer.play();
            setPlayerIsPlaying(true);
          }, 100);
        }
      });
<<<<<<< HEAD

      // Log stream URL for debugging
      logger.debug("Radio stream URL", { url: radioTrack.audioUrl });

      // Set a timeout to detect if loading is taking too long or failing silently
      loadTimeout = setTimeout(() => {
        if (!audioPlayer.isTrackLoaded()) {
          logger.warn("Radio station taking too long to load");
          useRadioStore
            .getState()
            .setError(
              "Radio stream is taking too long to load. Please check if yt-dlp is installed on the server.",
            );
=======
      
      // Log stream URL for debugging
      console.log('📡 Radio stream URL:', radioTrack.audioUrl);
      
      // Set a timeout to detect if loading is taking too long or failing silently
      loadTimeout = setTimeout(() => {
        if (!audioPlayer.isTrackLoaded()) {
          console.warn('⚠️ Radio station taking too long to load, checking for errors...');
          useRadioStore.getState().setError('Radio stream is taking too long to load. Please check if yt-dlp is installed on the server.');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          useRadioStore.getState().setIsLoading(false);
        }
      }, 15000); // 15 second timeout

      // Helper function to restart stream with new random start
      const restartStream = (station: RadioStation, trackId: string) => {
        const newRandomStart = Math.floor(Math.random() * station.duration);
<<<<<<< HEAD
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const newStreamUrl = apiUrl
          ? `${apiUrl}/api/radio/stream/${station.id}?start=${newRandomStart}&random=false`
          : `/api/radio/stream/${station.id}?start=${newRandomStart}&random=false`;

=======
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const newStreamUrl = apiUrl
          ? `${apiUrl}/api/radio/stream/${station.id}?start=${newRandomStart}&random=false`
          : `/api/radio/stream/${station.id}?start=${newRandomStart}&random=false`;
        
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        audioPlayer.loadTrack(
          newStreamUrl,
          trackId,
          (prog) => setProgress(prog),
          () => {
            // If it ends again, restart (seamless loop)
            if (currentStation?.id === station.id) {
              restartStream(station, trackId);
            }
<<<<<<< HEAD
          },
        );

=======
          }
        );
        
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        // Auto-play the new stream if currently playing (check store value)
        const currentIsPlaying = useRadioStore.getState().isPlaying;
        if (currentIsPlaying) {
          audioPlayer.play();
        }
      };

      // Load track with special handling for radio streams
<<<<<<< HEAD
      audioPlayer.loadTrack(
        radioTrack.audioUrl,
        radioTrack.id,
        (prog) => {
          // Update progress for radio (though it's continuous)
          setProgress(prog);
        },
        () => {
          // When stream ends, restart with new random start (seamless loop)
          logger.debug("Radio stream ended, restarting with new random start");
          if (currentStation) {
            restartStream(currentStation, radioTrack.id);
          }
        },
      );

      // Set as current track in player store
      setCurrentTrack(radioTrack);
=======
      if (radioTrack.audioUrl) {
        audioPlayer.loadTrack(
          radioTrack.audioUrl,
          radioTrack.id,
          (prog) => {
            // Update progress for radio (though it's continuous)
            setProgress(prog);
          },
          () => {
            // When stream ends, restart with new random start (seamless loop)
            console.log('🔄 Radio stream ended, restarting with new random start');
            if (currentStation) {
              restartStream(currentStation, radioTrack.id);
            }
          }
        );

        // Set as current track in player store
        setCurrentTrack(radioTrack);
      } else {
        console.error('❌ Radio track has no audio URL');
        useRadioStore.getState().setError('Radio stream URL is not available');
        useRadioStore.getState().setIsLoading(false);
      }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    } else {
      // Track is already loaded - if playing state changed, ensure playback state matches
      // This handles the case where user clicks play on an already-loaded station
      if (isPlaying && !audioPlayer.isPlaying()) {
<<<<<<< HEAD
        logger.debug("Track already loaded, starting playback");
=======
        console.log('▶️ Track already loaded, starting playback');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        audioPlayer.play();
        setPlayerIsPlaying(true);
      }
    }
<<<<<<< HEAD
  }, [
    currentStation?.id,
    currentTrack?.id,
    isPlaying,
    setCurrentTrack,
    setPlayerIsPlaying,
    setProgress,
  ]);

  // Handle play/pause state changes - sync radio store to player store
  useEffect(() => {
    if (!currentStation || !currentTrack?.id?.startsWith("radio-")) {
=======
  }, [currentStation?.id, currentTrack?.id, isPlaying, setCurrentTrack, setPlayerIsPlaying, setProgress]);

  // Handle play/pause state changes - sync radio store to player store
  useEffect(() => {
    if (!currentStation || !currentTrack?.id?.startsWith('radio-')) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return;
    }

    // Prevent circular updates
    if (isSyncingRef.current) {
      return;
    }

    // When radio store play state changes, update the player
    if (isPlaying !== playerIsPlaying) {
      isSyncingRef.current = true;
<<<<<<< HEAD

      if (isPlaying) {
        logger.debug("Playing radio station");
        audioPlayer.play();
        setPlayerIsPlaying(true);
      } else {
        logger.debug("Pausing radio station");
        audioPlayer.pause();
        setPlayerIsPlaying(false);
      }

=======
      
      if (isPlaying) {
        console.log('▶️ Playing radio station');
        audioPlayer.play();
        setPlayerIsPlaying(true);
      } else {
        console.log('⏸️ Pausing radio station');
        audioPlayer.pause();
        setPlayerIsPlaying(false);
      }
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Reset sync flag after state update
      setTimeout(() => {
        isSyncingRef.current = false;
      }, 0);
    }
<<<<<<< HEAD
  }, [
    isPlaying,
    currentStation?.id,
    currentTrack?.id,
    playerIsPlaying,
    setPlayerIsPlaying,
  ]);
=======
  }, [isPlaying, currentStation?.id, currentTrack?.id, playerIsPlaying, setPlayerIsPlaying]);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

  // Listen to player store changes from external controls (Player component)
  // Only sync if change came from outside (not from radio store)
  useEffect(() => {
<<<<<<< HEAD
    if (!currentTrack?.id?.startsWith("radio-") || !currentStation) {
=======
    if (!currentTrack?.id?.startsWith('radio-') || !currentStation) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return;
    }

    // Prevent circular updates
    if (isSyncingRef.current) {
      return;
    }

    // Only sync if player store changed but radio store didn't (external control)
    const radioStore = useRadioStore.getState();
    if (playerIsPlaying !== radioStore.isPlaying) {
      isSyncingRef.current = true;
      radioStore.setIsPlaying(playerIsPlaying);
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Reset sync flag
      setTimeout(() => {
        isSyncingRef.current = false;
      }, 0);
    }
  }, [playerIsPlaying, currentTrack?.id, currentStation?.id]);

  const handleStationClick = (station: RadioStation) => {
    if (currentStation?.id === station.id) {
      // Toggle play/pause if same station
      togglePlayPause();
    } else {
      // Play new station
      playStation(station);
      // The useEffect will handle loading the new station via system player
    }
  };

  return (
<<<<<<< HEAD
    <div
      className="p-8"
      style={{
        padding: "32px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <h1
        className="text-4xl font-bold mb-8"
        style={{
          fontSize: "32px",
          lineHeight: "36px",
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: "32px",
=======
    <div 
      className="p-8"
      style={{
        padding: '32px',
        backgroundColor: '#121212',
        minHeight: '100vh',
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        }}
      >
        Radio Stations
      </h1>

      {/* Error Message */}
      {error && (
<<<<<<< HEAD
        <div
          className="mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg"
          style={{
            marginBottom: "16px",
            padding: "16px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.5)",
            borderRadius: "8px",
=======
        <div 
          className="mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg"
          style={{
            marginBottom: '16px',
            padding: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '8px',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          <p className="text-red-400 text-sm">{error}</p>
          <p className="text-red-300 text-xs mt-2">
<<<<<<< HEAD
            To enable radio streaming, install yt-dlp:{" "}
            <code className="bg-black/30 px-2 py-1 rounded">
              brew install yt-dlp
            </code>{" "}
            (macOS) or{" "}
            <code className="bg-black/30 px-2 py-1 rounded">
              pip install yt-dlp
            </code>
=======
            To enable radio streaming, install yt-dlp: <code className="bg-black/30 px-2 py-1 rounded">brew install yt-dlp</code> (macOS) or <code className="bg-black/30 px-2 py-1 rounded">pip install yt-dlp</code>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </p>
        </div>
      )}

      {/* Featured Stations - GTA V Los Santos Radio */}
<<<<<<< HEAD
      <section className="mb-8" style={{ marginBottom: "32px" }}>
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            fontSize: "24px",
            lineHeight: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "16px",
=======
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="text-2xl font-bold mb-4"
          style={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Featured Stations
        </h2>
        {isLoading && stations.length === 0 ? (
          <div className="text-spotify-text-gray">Loading stations...</div>
        ) : (
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
            {stations.map((station) => {
              const isCurrentStation = currentStation?.id === station.id;
              const isStationPlaying = isCurrentStation && isPlaying;
<<<<<<< HEAD

=======
              
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              return (
                <div
                  key={station.id}
                  className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-dark-gray transition-all duration-200 group cursor-pointer"
                  style={{
<<<<<<< HEAD
                    backgroundColor: isCurrentStation ? "#282828" : "#181818",
                    borderRadius: "8px",
                    padding: "16px",
                    transition: "background-color 200ms ease-out",
                    border: isCurrentStation ? "1px solid #1DB954" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrentStation) {
                      e.currentTarget.style.backgroundColor = "#282828";
=======
                    backgroundColor: isCurrentStation ? '#282828' : '#181818',
                    borderRadius: '8px',
                    padding: '16px',
                    transition: 'background-color 200ms ease-out',
                    border: isCurrentStation ? '1px solid #7209B7' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrentStation) {
                      e.currentTarget.style.backgroundColor = '#282828';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrentStation) {
<<<<<<< HEAD
                      e.currentTarget.style.backgroundColor = "#181818";
=======
                      e.currentTarget.style.backgroundColor = '#181818';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }
                  }}
                  onClick={() => handleStationClick(station)}
                >
<<<<<<< HEAD
                  <div
                    className="w-full aspect-square bg-gradient-to-br from-spotify-green to-spotify-green rounded-lg mb-3 flex items-center justify-center"
                    style={{
                      borderRadius: "4px",
                      aspectRatio: "1",
                      marginBottom: "12px",
                      background: isCurrentStation
                        ? "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)"
                        : "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
                    }}
                  >
                    <Radio
                      size={32}
                      className="text-white opacity-50"
                      style={{
                        width: "32px",
                        height: "32px",
                        color: "#FFFFFF",
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <h3
                    className="font-semibold text-sm truncate mb-1"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      marginBottom: "4px",
=======
                  <div 
                    className="w-full aspect-square bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-lg mb-3 flex items-center justify-center"
                    style={{
                      borderRadius: '4px',
                      aspectRatio: '1',
                      marginBottom: '12px',
                      background: isCurrentStation 
                        ? 'linear-gradient(135deg, #7209B7 0%, #8a1dd0 100%)'
                        : 'linear-gradient(135deg, #7209B7 0%, #457B9D 100%)'
                    }}
                  >
                    <Radio 
                      size={32} 
                      className="text-white opacity-50"
                      style={{
                        width: '32px',
                        height: '32px',
                        color: '#FFFFFF',
                        opacity: 0.5
                      }}
                    />
                  </div>
                  <h3 
                    className="font-semibold text-sm truncate mb-1"
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      marginBottom: '4px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {station.name}
                  </h3>
<<<<<<< HEAD
                  <p
                    className="text-xs text-spotify-text-gray"
                    style={{
                      fontSize: "13px",
                      lineHeight: "16px",
                      color: "#B3B3B3",
=======
                  <p 
                    className="text-xs text-spotify-text-gray"
                    style={{
                      fontSize: '13px',
                      lineHeight: '16px',
                      color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    }}
                  >
                    {station.genre}
                  </p>
<<<<<<< HEAD
                  <div
                    className="opacity-0 group-hover:opacity-100 transition-opacity mt-2"
                    style={{
                      marginTop: "8px",
                      transition: "opacity 200ms ease-out",
                      opacity: isCurrentStation ? 1 : 0,
                    }}
                  >
                    <PlayButton
                      isPlaying={isStationPlaying}
                      onClick={(e) => {
                        e?.stopPropagation();
                        togglePlayPause();
                      }}
                      size="sm"
=======
                  <div 
                    className="opacity-0 group-hover:opacity-100 transition-opacity mt-2"
                    style={{
                      marginTop: '8px',
                      transition: 'opacity 200ms ease-out',
                      opacity: isCurrentStation ? 1 : 0,
                    }}
                  >
                    <PlayButton 
                      isPlaying={isStationPlaying} 
                      onClick={(e) => {
                        e?.stopPropagation();
                        togglePlayPause();
                      }} 
                      size="sm" 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      disabled={isLoading && isCurrentStation}
                    />
                  </div>
                  {isLoading && isCurrentStation && (
                    <div className="mt-2 text-xs text-spotify-text-gray">
                      Loading...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Currently Playing Station */}
      {currentStation && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
<<<<<<< HEAD
          <div
            className="bg-spotify-light-gray rounded-lg p-6 flex items-center gap-4"
            style={{
              backgroundColor: "#181818",
              borderRadius: "8px",
              padding: "24px",
            }}
          >
            <div
              className="w-20 h-20 bg-gradient-to-br from-spotify-green to-spotify-green rounded-lg flex items-center justify-center"
              style={{
                borderRadius: "8px",
                background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
              }}
            >
              <Radio
                size={48}
                className="text-white opacity-50"
                style={{
                  width: "48px",
                  height: "48px",
                  color: "#FFFFFF",
                  opacity: 0.5,
=======
          <div 
            className="bg-spotify-light-gray rounded-lg p-6 flex items-center gap-4"
            style={{
              backgroundColor: '#181818',
              borderRadius: '8px',
              padding: '24px',
            }}
          >
            <div 
              className="w-20 h-20 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-lg flex items-center justify-center"
              style={{
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7209B7 0%, #8a1dd0 100%)'
              }}
            >
              <Radio 
                size={48} 
                className="text-white opacity-50"
                style={{
                  width: '48px',
                  height: '48px',
                  color: '#FFFFFF',
                  opacity: 0.5
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{currentStation.name}</h3>
<<<<<<< HEAD
              <p className="text-spotify-text-gray mb-2">
                {currentStation.genre}
              </p>
              {currentStation.description && (
                <p className="text-sm text-spotify-text-gray">
                  {currentStation.description}
                </p>
              )}
            </div>
            <PlayButton
              isPlaying={isPlaying}
              onClick={togglePlayPause}
=======
              <p className="text-spotify-text-gray mb-2">{currentStation.genre}</p>
              {currentStation.description && (
                <p className="text-sm text-spotify-text-gray">{currentStation.description}</p>
              )}
            </div>
            <PlayButton 
              isPlaying={isPlaying} 
              onClick={togglePlayPause} 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              size="lg"
              disabled={isLoading}
            />
          </div>
        </section>
      )}

      {/* Mental Health Podcasts Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mental Health Podcasts</h2>
        <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg p-6 border border-green-600/30">
          <div className="flex items-start gap-4">
            <Mic size={48} className="text-green-500 flex-shrink-0" />
            <div className="flex-1">
<<<<<<< HEAD
              <h3 className="text-xl font-bold mb-2">
                Wellness & Recovery Podcasts
              </h3>
              <p className="text-spotify-text-gray mb-4">
                Stories of resilience, expert advice, and community support for
                mental health and recovery journeys.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Recovery Stories",
                  "Mindfulness",
                  "Therapy Talk",
                  "Community Support",
                  "Coping Strategies",
                ].map((topic) => (
=======
              <h3 className="text-xl font-bold mb-2">Wellness & Recovery Podcasts</h3>
              <p className="text-spotify-text-gray mb-4">
                Stories of resilience, expert advice, and community support for mental health and recovery journeys.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Recovery Stories', 'Mindfulness', 'Therapy Talk', 'Community Support', 'Coping Strategies'].map((topic) => (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  <span
                    key={topic}
                    className="px-3 py-1 bg-green-600/30 text-green-400 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Custom Station */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create Custom Station</h2>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <p className="text-spotify-text-gray mb-4">
<<<<<<< HEAD
            Build your own radio station based on mood, genre, or artist
            preferences
          </p>
          <button className="btn-primary">Create Station</button>
=======
            Build your own radio station based on mood, genre, or artist preferences
          </p>
          <button className="btn-primary">
            Create Station
          </button>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        </div>
      </section>
    </div>
  );
}
