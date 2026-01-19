"use client";

import { useState } from "react";
import { usePlayerStore } from "@/stores/playerStore";
import { cn } from "@/lib/utils";

export default function PlaybackSettingsPage() {
  const {
    crossfade,
    crossfadeDuration,
    gaplessPlayback,
    normalizeVolume,
    setCrossfade,
    setCrossfadeDuration,
    setGaplessPlayback,
    setNormalizeVolume,
  } = usePlayerStore();

  return (
    <div
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "32px",
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
        }}
      >
        Playback
      </h1>
      <div
        className="max-w-2xl space-y-6"
        style={{
          maxWidth: "672px",
          gap: "24px",
        }}
      >
        {/* Audio Quality - Exact Spotify Style */}
        <div
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{
              fontSize: "20px",
              lineHeight: "28px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Audio Quality
          </h2>
          <select
            className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded"
            style={{
              width: "100%",
              backgroundColor: "#282828",
              color: "#FFFFFF",
              padding: "12px 16px",
              borderRadius: "4px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              border: "1px solid transparent",
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "border-color 200ms ease-out",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#7209B7";
              e.currentTarget.style.borderWidth = "2px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.borderWidth = "1px";
            }}
          >
            <option style={{ backgroundColor: "#282828", color: "#FFFFFF" }}>
              Normal (160 kbps)
            </option>
            <option style={{ backgroundColor: "#282828", color: "#FFFFFF" }}>
              High (320 kbps)
            </option>
            <option style={{ backgroundColor: "#282828", color: "#FFFFFF" }}>
              Very High (Lossless)
            </option>
          </select>
          <p
            className="text-sm text-spotify-text-gray mt-2"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "#B3B3B3",
              marginTop: "8px",
            }}
          >
            Higher quality uses more data. Lossless requires Premium
            subscription.
          </p>
        </div>

        {/* Crossfade - Exact Spotify Style */}
        <div
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <div
            className="flex items-center justify-between mb-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
              gap: "16px",
            }}
          >
            <div>
              <h2
                className="text-xl font-bold"
                style={{
                  fontSize: "20px",
                  lineHeight: "28px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                Crossfade
              </h2>
              <p
                className="text-sm text-spotify-text-gray mt-1"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                  marginTop: "4px",
                }}
              >
                Overlap the end of the current song with the beginning of the
                next one
              </p>
            </div>
            <button
              onClick={() => setCrossfade(!crossfade)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative cursor-pointer",
                crossfade ? "bg-spotify-green" : "bg-spotify-text-gray",
              )}
              style={{
                width: "48px",
                height: "24px",
                borderRadius: "12px",
                backgroundColor: crossfade ? "#7209B7" : "#B3B3B3",
                position: "relative",
                border: "none",
                cursor: "pointer",
                transition: "background-color 200ms ease-out",
              }}
            >
              <div
                className={cn(
                  "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                  crossfade ? "translate-x-6" : "translate-x-0.5",
                )}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  transform: crossfade ? "translateX(24px)" : "translateX(2px)",
                  transition: "transform 200ms ease-out",
                }}
              />
            </button>
          </div>
          {crossfade && (
            <div className="mt-4" style={{ marginTop: "16px" }}>
              <input
                type="range"
                min="0"
                max="12"
                value={crossfadeDuration}
                onChange={(e) => setCrossfadeDuration(Number(e.target.value))}
                className="w-full"
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#282828",
                  borderRadius: "4px",
                  cursor: "pointer",
                  WebkitAppearance: "none",
                  appearance: "none",
                  background: `linear-gradient(to right, #7209B7 0%, #7209B7 ${(crossfadeDuration / 12) * 100}%, #282828 ${(crossfadeDuration / 12) * 100}%, #282828 100%)`,
                }}
              />
              <div
                className="flex justify-between text-xs text-spotify-text-gray mt-2"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                  marginTop: "8px",
                }}
              >
                <span>0s</span>
                <span>{crossfadeDuration}s</span>
                <span>12s</span>
              </div>
            </div>
          )}
        </div>

        {/* Gapless Playback - Exact Spotify Style */}
        <div
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <h2
                className="text-xl font-bold"
                style={{
                  fontSize: "20px",
                  lineHeight: "28px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                Gapless Playback
              </h2>
              <p
                className="text-sm text-spotify-text-gray mt-1"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                  marginTop: "4px",
                }}
              >
                Automatically continue playing songs without gaps
              </p>
            </div>
            <button
              onClick={() => setGaplessPlayback(!gaplessPlayback)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative cursor-pointer",
                gaplessPlayback ? "bg-spotify-green" : "bg-spotify-text-gray",
              )}
              style={{
                width: "48px",
                height: "24px",
                borderRadius: "12px",
                backgroundColor: gaplessPlayback ? "#7209B7" : "#B3B3B3",
                position: "relative",
                border: "none",
                cursor: "pointer",
                transition: "background-color 200ms ease-out",
              }}
            >
              <div
                className={cn(
                  "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                  gaplessPlayback ? "translate-x-6" : "translate-x-0.5",
                )}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  transform: gaplessPlayback
                    ? "translateX(24px)"
                    : "translateX(2px)",
                  transition: "transform 200ms ease-out",
                }}
              />
            </button>
          </div>
        </div>

        {/* Normalize Volume - Exact Spotify Style */}
        <div
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <h2
                className="text-xl font-bold"
                style={{
                  fontSize: "20px",
                  lineHeight: "28px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                Normalize Volume
              </h2>
              <p
                className="text-sm text-spotify-text-gray mt-1"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                  marginTop: "4px",
                }}
              >
                Set the same volume level for all tracks
              </p>
            </div>
            <button
              onClick={() => setNormalizeVolume(!normalizeVolume)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative cursor-pointer",
                normalizeVolume ? "bg-spotify-green" : "bg-spotify-text-gray",
              )}
              style={{
                width: "48px",
                height: "24px",
                borderRadius: "12px",
                backgroundColor: normalizeVolume ? "#7209B7" : "#B3B3B3",
                position: "relative",
                border: "none",
                cursor: "pointer",
                transition: "background-color 200ms ease-out",
              }}
            >
              <div
                className={cn(
                  "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                  normalizeVolume ? "translate-x-6" : "translate-x-0.5",
                )}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  transform: normalizeVolume
                    ? "translateX(24px)"
                    : "translateX(2px)",
                  transition: "transform 200ms ease-out",
                }}
              />
            </button>
          </div>
        </div>

        {/* Explicit Content - Exact Spotify Style */}
        <div
          className="bg-spotify-light-gray rounded-lg p-6"
          style={{
            backgroundColor: "#181818",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <h2
                className="text-xl font-bold"
                style={{
                  fontSize: "20px",
                  lineHeight: "28px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                Allow Explicit Content
              </h2>
              <p
                className="text-sm text-spotify-text-gray mt-1"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                  marginTop: "4px",
                }}
              >
                Play songs with explicit content warnings
              </p>
            </div>
            <button
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative bg-spotify-green cursor-pointer",
              )}
              style={{
                width: "48px",
                height: "24px",
                borderRadius: "12px",
                backgroundColor: "#7209B7",
                position: "relative",
                border: "none",
                cursor: "pointer",
                transition: "background-color 200ms ease-out",
              }}
            >
              <div
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6 transition-transform"
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  transform: "translateX(24px)",
                  transition: "transform 200ms ease-out",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
