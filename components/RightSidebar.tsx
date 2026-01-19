"use client";

import { useState, useEffect } from "react";
import { X, Check, Mic } from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { usePlayerStore } from "@/stores/playerStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LyricsView from "./LyricsView";

type SidebarView = "details" | "lyrics";

export default function RightSidebar() {
  const {
    rightSidebarOpen,
    rightSidebarWidth,
    setRightSidebarOpen,
    setRightSidebarWidth,
  } = useUIStore();
  const { currentTrack } = usePlayerStore();
  const [isResizing, setIsResizing] = useState(false);
  const [view, setView] = useState<SidebarView>("details");

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      setRightSidebarWidth(newWidth);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isResizing || e.touches.length === 0) return;
      const newWidth = window.innerWidth - e.touches[0].clientX;
      setRightSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    const handleTouchEnd = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
      document.addEventListener("touchcancel", handleTouchEnd);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        document.removeEventListener("touchcancel", handleTouchEnd);
      };
    }
  }, [isResizing, setRightSidebarWidth]);

  // Mock data - replace with actual track/album data
  const playlistName = "Coding";
  const albumName = currentTrack?.album || "Echos of choices";
  const artistName = currentTrack?.artist || "NextEleven Label Showcase";

  return (
    <>
      <div
        className={cn(
          "fixed right-0 bottom-[90px] bg-spotify-dark-gray z-40 overflow-y-auto sidebar-scrollbar",
          rightSidebarOpen ? "translate-x-0" : "translate-x-full",
          isResizing ? "" : "transition-transform duration-300 ease-in-out",
        )}
        style={{
          width: `${rightSidebarWidth}px`,
          top: "56px",
          borderLeft: "1px solid #000000",
        }}
      >
        {rightSidebarOpen && (
          <>
            {/* Close Button */}
            <button
              onClick={() => setRightSidebarOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray rounded-full transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>

            {/* View Toggle Buttons */}
            <div className="flex items-center gap-2 p-4 border-b border-white/10">
              <button
                onClick={() => setView("details")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  view === "details"
                    ? "bg-white text-black"
                    : "bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10",
                )}
              >
                Details
              </button>
              <button
                onClick={() => setView("lyrics")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                  view === "lyrics"
                    ? "bg-white text-black"
                    : "bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10",
                )}
              >
                <Mic size={16} />
                Lyrics
              </button>
            </div>

            {/* Content */}
            {view === "details" ? (
              <div className="p-6">
                {/* Playlist/Album Title */}
                <h2 className="text-sm font-medium text-white mb-6 uppercase tracking-wider">
                  {playlistName}
                </h2>

                {/* Album Art & Info */}
                {currentTrack && (
                  <div className="mb-6">
                    <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-spotify-light-gray">
                      {currentTrack.coverArt ? (
                        <img
                          src={currentTrack.coverArt}
                          alt={albumName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center">
                          <span className="text-6xl">🎵</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {albumName}
                      </h3>
                      <Link
                        href={`/artist/${currentTrack.artistId || ""}`}
                        className="text-sm text-spotify-text-gray hover:text-white hover:underline transition-colors"
                      >
                        {artistName}
                      </Link>
                    </div>

                    {/* Check Icon */}
                    <div className="flex items-center gap-2 mt-3">
                      <Check className="w-5 h-5 text-spotify-green" />
                      <span className="text-sm text-spotify-text-gray">
                        Currently playing
                      </span>
                    </div>
                  </div>
                )}

                {/* Credits Section */}
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white">Credits</h3>
                    <button className="text-xs text-spotify-text-gray hover:text-white transition-colors">
                      Show all
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white font-medium">
                          {artistName}
                        </div>
                        <div className="text-xs text-spotify-text-gray">
                          Main Artist
                        </div>
                      </div>
                      <button className="text-xs text-spotify-text-gray hover:text-white px-3 py-1 border border-white/20 rounded-full hover:border-white/40 transition-colors">
                        Unfollow
                      </button>
                    </div>
                  </div>
                </div>

                {/* Next in Queue Section */}
                <div className="border-t border-white/10 pt-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white">
                      Next in queue
                    </h3>
                    <button className="text-xs text-spotify-text-gray hover:text-white transition-colors">
                      Open queue
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[calc(100vh-200px)]">
                <LyricsView />
              </div>
            )}
          </>
        )}
      </div>

      {/* Resize Handle */}
      {rightSidebarOpen && (
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={cn(
            "fixed bottom-[90px] w-1 bg-transparent hover:bg-spotify-green/60 cursor-col-resize z-[60] transition-all touch-none",
            isResizing && "bg-spotify-green/60 w-1",
          )}
          style={{
            top: "56px",
            right: `${rightSidebarWidth}px`,
            touchAction: "none",
          }}
        />
      )}
    </>
  );
}
