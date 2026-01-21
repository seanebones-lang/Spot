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

  useEffect(() => {
    if (currentTrack) {
      logger.debug("Player: Loading track", {
        trackName: currentTrack.name,
        audioUrl: currentTrack.audioUrl,
      });
      const wasPlaying = isPlaying;

      // Set up load callback to auto-play if was playing
      audioPlayer.setOnLoadCallback(() => {
        if (wasPlaying) {
          logger.debug("Track loaded, resuming playback");
          audioPlayer.play();
          setIsPlaying(true);
        }
      });

      audioPlayer.loadTrack(
        currentTrack.audioUrl,
        currentTrack.id,
        (prog) => setProgress(prog),
        () => {
          if (repeat === "one") {
            audioPlayer.play();
          } else if (repeat === "all") {
            playNext();
          } else {
            playNext();
          }
        },
      );

      // Reset progress when loading new track
      setProgress(0);
    } else {
      logger.debug("Player: No currentTrack set");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id, repeat]); // Only depend on track ID to avoid re-loading

  useEffect(() => {
    // Skip if no track loaded
    if (!currentTrack) return;

    logger.debug("Player: isPlaying changed", { isPlaying });
    if (isPlaying) {
      logger.debug("Player: Starting playback");
      audioPlayer.play();
    } else {
      logger.debug("Player: Pausing playback");
      audioPlayer.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    audioPlayer.setVolume(volume);
  }, [volume]);

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
            }}
          >
            {currentTrack?.coverArt ? (
              <ImageWithFallback
                src={currentTrack.coverArt}
                alt={currentTrack.name}
                className="w-full h-full object-cover rounded"
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
              </div>
            )}
          </div>
          {currentTrack ? (
            <>
              <div className="min-w-0" style={{ minWidth: 0 }}>
                <div
                  className="text-sm font-medium text-white truncate"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#FFFFFF",
                  }}
                >
                  {currentTrack.name}
                </div>
                <div className="flex items-center gap-2" style={{ gap: "8px" }}>
                  <div
                    className="text-xs text-spotify-text-gray truncate"
                    style={{
                      fontSize: "13px",
                      lineHeight: "16px",
                      color: "#B3B3B3",
                    }}
                  >
                    {currentTrack.artist}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              className="text-sm text-spotify-text-gray"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
              }}
            >
              No track selected
            </div>
          )}
        </div>

        {/* Center - Controls - Responsive for mobile */}
        <div
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
            }}
          >
            <button
              onClick={() => setShuffle(!shuffle)}
              aria-label={shuffle ? "Disable shuffle" : "Enable shuffle"}
              aria-pressed={shuffle}
              disabled={!currentTrack}
              aria-label={shuffle ? "Shuffle on" : "Shuffle off"}
              aria-pressed={shuffle}
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
                }
              }}
              onMouseLeave={(e) => {
                if (!shuffle) {
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
              aria-label="Previous track"
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
              size="md"
              disabled={!currentTrack}
            />
            <button
              onClick={playNext}
              aria-label="Next track"
              disabled={!currentTrack}
              aria-label="Next track"
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
                const currentIndex = modes.indexOf(repeat);
                setRepeat(modes[(currentIndex + 1) % modes.length]);
              }}
              disabled={!currentTrack}
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
            flex: "1 1 30%",
            gap: "8px",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setIsQueueOpen(true)}
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
            }}
            title="Queue"
            onMouseEnter={(e) => {
              if (currentTrack) {
                e.currentTarget.style.color = "#FFFFFF";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#B3B3B3";
            }}
          >
            <List size={20} style={{ width: "20px", height: "20px" }} />
          </button>
          {currentTrack && (
            <button
              onClick={() => setIsFullScreen(true)}
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
            </button>
          )}
          {currentTrack && <PictureInPicturePlayer />}
          <VolumeControl volume={volume} onVolumeChange={setVolume} />
        </div>
      </div>

      <QueuePanel isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />
      <FullScreenPlayer
        isOpen={isFullScreen}
        onClose={() => setIsFullScreen(false)}
      />
    </div>
  );
});

export default Player;
