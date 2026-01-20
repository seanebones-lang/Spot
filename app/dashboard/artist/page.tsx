"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { logger } from "@/lib/logger";
import {
  TrendingUp,
  DollarSign,
  Music,
  Upload,
  Eye,
  EyeOff,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useArtistSignupStore } from "@/stores/artistSignupStore";
import { MoodState, MoodTags } from "@/types/mood";
import MoodSelector from "@/components/mood/MoodSelector";
import FeelingChips from "@/components/mood/FeelingChips";
import VibeSlider from "@/components/mood/VibeSlider";
import GenreSelector from "@/components/mood/GenreSelector";

// Mock track data
const mockTracks = [
  {
    id: "1",
    name: "I Just Might",
    album: "Example Album",
    uploadDate: "2024-01-10",
    status: "published",
    streams: 1250,
    earnings: 5.0,
  },
  {
    id: "2",
    name: "HELICOPTER",
    album: "Another Album",
    uploadDate: "2024-01-12",
    status: "published",
    streams: 890,
    earnings: 3.56,
  },
  {
    id: "3",
    name: "New Track (Draft)",
    album: "Work in Progress",
    uploadDate: "2024-01-14",
    status: "unpublished",
    streams: 0,
    earnings: 0,
  },
];

interface MoodValidationResult {
  approved: boolean;
  confidence: number;
  suggestions: string[];
  issues: string[] | null;
  recommendedMood: MoodState | null;
  recommendedFeelings: string[] | null;
  recommendedVibe: number | null;
  recommendedGenres: string[] | null;
}

export default function ArtistDashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { approvalStatus, setApprovalStatus } = useArtistSignupStore();

  // Initialize tracks from localStorage first, fallback to mockTracks
  const [tracks, setTracks] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const savedTracks = localStorage.getItem("artist-tracks");
        if (savedTracks) {
          const parsed = JSON.parse(savedTracks);
          if (Array.isArray(parsed) && parsed.length > 0) {
            logger.info("Initialized tracks from localStorage", {
              count: parsed.length,
            });
            return parsed;
          }
        }
      }
    } catch (e) {
      logger.error("Error loading initial tracks", e as Error);
    }
    return mockTracks;
  });
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mood Settings State
  const [moodSettings, setMoodSettings] = useState<MoodTags | null>(null);
  const [moodValidation, setMoodValidation] =
    useState<MoodValidationResult | null>(null);
  const [isValidatingMood, setIsValidatingMood] = useState(false);

  // Load saved tracks from localStorage
  const loadTracks = () => {
    try {
      if (typeof window === "undefined") return;

      const savedTracks = localStorage.getItem("artist-tracks");
      logger.debug("Loading tracks from localStorage", {
        found: !!savedTracks,
        dataLength: savedTracks?.length || 0,
      });

      if (savedTracks) {
        const parsed = JSON.parse(savedTracks);
        logger.debug("Parsed tracks from localStorage", {
          count: Array.isArray(parsed) ? parsed.length : 0,
        });

        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out any invalid tracks and ensure required fields
          const validTracks = parsed.filter((t) => {
            const isValid = t && t.id && t.name;
            if (!isValid) {
              logger.warn("Invalid track filtered out", { track: t });
            }
            return isValid;
          });
          logger.info("Loaded valid tracks", {
            validCount: validTracks.length,
            totalCount: parsed.length,
          });

          if (validTracks.length > 0) {
            logger.debug("Setting tracks state", {
              count: validTracks.length,
            });
            setTracks(validTracks);
          } else {
            logger.warn("No valid tracks found after filtering, using mockTracks");
            setTracks(mockTracks);
          }
        } else {
          logger.warn("Parsed tracks is empty or not array, using mockTracks");
          setTracks(mockTracks);
        }
      } else {
        logger.warn("No tracks found in localStorage, using mockTracks");
        setTracks(mockTracks);
      }
    } catch (e) {
      logger.error("Error loading tracks", e as Error);
      setTracks(mockTracks);
    }
  };

  // Load tracks on mount and whenever component is focused
  useEffect(() => {
    // Always reload on mount to ensure we have latest
    loadTracks();

    // Listen for custom event (for same-tab updates)
    const handleTracksUpdated = () => {
      loadTracks();
    };
    window.addEventListener("tracks-updated", handleTracksUpdated);

    // Reload when window gains focus (user navigates back)
    const handleFocus = () => {
      loadTracks();
    };
    window.addEventListener("focus", handleFocus);

    // Also reload on visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadTracks();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("tracks-updated", handleTracksUpdated);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Only save tracks when they're manually changed (toggle publish, etc.), not on load
  // Don't auto-save on mount/load to prevent overwriting

  // Load saved mood settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("artist-mood-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMoodSettings(parsed);
      } catch (e) {
        console.error("Error loading mood settings:", e);
      }
    }
  }, []);

  // Save mood settings to localStorage
  const saveMoodSettings = (settings: MoodTags) => {
    setMoodSettings(settings);
    localStorage.setItem("artist-mood-settings", JSON.stringify(settings));
  };

  // Validate mood settings with AI
  const validateMoodSettings = async () => {
    if (
      !moodSettings ||
      !moodSettings.mood ||
      moodSettings.feelings.length === 0 ||
      moodSettings.genres.length === 0
    ) {
      return;
    }

    setIsValidatingMood(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const endpoint = apiUrl
        ? `${apiUrl}/api/mood/validate`
        : "/api/mood/validate";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: moodSettings.mood,
          feelings: moodSettings.feelings,
          vibe: moodSettings.vibe,
          genres: moodSettings.genres,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMoodValidation(result);
      } else {
        logger.error("Validation failed", new Error("Mood validation failed"));
      }
    } catch (error) {
      logger.error("Error validating mood", error as Error);
    } finally {
      setIsValidatingMood(false);
    }
  };

  const togglePublish = (trackId: string) => {
    const updatedTracks = tracks.map((track) =>
      track.id === trackId
        ? {
            ...track,
            status: track.status === "published" ? "unpublished" : "published",
          }
        : track,
    );
    setTracks(updatedTracks);
    localStorage.setItem("artist-tracks", JSON.stringify(updatedTracks));
  };

  const totalStreams = tracks.reduce((sum, track) => sum + track.streams, 0);
  const totalEarnings = tracks.reduce((sum, track) => sum + track.earnings, 0);
  const publishedTracks = tracks.filter((t) => t.status === "published");

  if (approvalStatus !== "approved") {
    return (
      <div
        className="w-full"
        style={{
          padding: "32px",
          paddingBottom: "24px",
          backgroundColor: "#121212",
        }}
      >
        <div
          className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg text-center max-w-2xl mx-auto"
          style={{
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Account Pending Approval
          </h2>
          <p
            className="text-spotify-text-gray mb-4"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#B3B3B3",
              marginBottom: "16px",
            }}
          >
            Your artist account is currently{" "}
            {approvalStatus === "pending" ? "pending approval" : "under review"}
            . You&apos;ll be able to upload tracks once approved.
          </p>
          <p
            className="text-sm text-spotify-text-gray mb-4"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "#B3B3B3",
              marginBottom: "16px",
            }}
          >
            Estimated approval time: 24-48 hours
          </p>
          {/* Dev/Test Button - Remove in production */}
          <button
            onClick={() => setApprovalStatus("approved")}
            className="mt-4 px-4 py-2 bg-spotify-green text-black rounded-full font-bold hover:bg-[#1ed760] transition-colors"
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              backgroundColor: "#1DB954",
              color: "#000000",
              borderRadius: "500px",
              fontSize: "14px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            [Dev] Approve Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-8"
      style={{
        padding: "32px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <div
        className="flex items-center justify-between mb-8"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          gap: "16px",
        }}
      >
        <h1
          className="text-4xl font-bold"
          style={{
            fontSize: "32px",
            lineHeight: "36px",
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          Artist Dashboard
        </h1>
        <button
          onClick={() => router.push("/upload")}
          className="btn-primary flex items-center gap-2"
          style={{
            backgroundColor: "#1DB954",
            color: "#000000",
            fontWeight: 700,
            padding: "12px 24px",
            borderRadius: "500px",
            fontSize: "14px",
            lineHeight: "20px",
            border: "none",
            cursor: "pointer",
            transition: "all 200ms ease-out",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            if (
              moodSettings &&
              moodSettings.feelings.length > 0 &&
              moodSettings.genres.length > 0
            ) {
              e.currentTarget.style.backgroundColor = "#1ed760";
              e.currentTarget.style.transform = "scale(1.05)";
            }
          }}
          onMouseLeave={(e) => {
            if (
              moodSettings &&
              moodSettings.feelings.length > 0 &&
              moodSettings.genres.length > 0
            ) {
              e.currentTarget.style.backgroundColor = "#1DB954";
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
        >
          <Upload
            size={20}
            style={{
              width: "20px",
              height: "20px",
              flexShrink: 0,
            }}
          />
          Upload Track
        </button>
      </div>

      {/* Mood Settings Section - Required Before Upload */}
      <div
        className="bg-spotify-light-gray rounded-lg mb-8"
        style={{
          backgroundColor: "#181818",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <div
          className="flex items-center justify-between mb-6"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{
                fontSize: "24px",
                lineHeight: "28px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
              Default Mood Settings
            </h2>
            <p
              className="text-sm text-spotify-text-gray"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
              }}
            >
              Configure your default mood preferences before uploading tracks.
              Default settings are not permitted.
            </p>
          </div>
          {moodSettings &&
            moodSettings.feelings.length > 0 &&
            moodSettings.genres.length > 0 && (
              <button
                onClick={validateMoodSettings}
                disabled={isValidatingMood}
                className="flex items-center gap-2 px-4 py-2 bg-spotify-green text-white rounded-full font-bold hover:bg-opacity-80 transition-colors disabled:opacity-50"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#1DB954",
                  color: "#FFFFFF",
                  borderRadius: "500px",
                  fontSize: "14px",
                  fontWeight: 700,
                  border: "none",
                  cursor: isValidatingMood ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: isValidatingMood ? 0.5 : 1,
                }}
              >
                <Sparkles size={16} />
                {isValidatingMood ? "Validating..." : "AI Validate Settings"}
              </button>
            )}
        </div>

        {/* AI Validation Results */}
        {moodValidation && (
          <div
            className={`mb-6 p-4 rounded-lg border-2 ${
              moodValidation.approved
                ? "bg-green-900/20 border-green-600"
                : "bg-yellow-900/20 border-yellow-600"
            }`}
            style={{
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "24px",
              border: `2px solid ${moodValidation.approved ? "#1DB954" : "#FFA500"}`,
            }}
          >
            <div className="flex items-start gap-3">
              {moodValidation.approved ? (
                <CheckCircle
                  size={20}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
              ) : (
                <AlertTriangle
                  size={20}
                  className="text-yellow-400 flex-shrink-0 mt-0.5"
                />
              )}
              <div className="flex-1">
                <h4
                  className="font-bold mb-2"
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: moodValidation.approved ? "#1DB954" : "#FFA500",
                    marginBottom: "8px",
                  }}
                >
                  {moodValidation.approved
                    ? "✓ Settings Approved"
                    : "⚠️ Settings Need Adjustment"}
                </h4>
                {moodValidation.issues && moodValidation.issues.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm text-white mb-1 font-medium">
                      Issues found:
                    </p>
                    <ul className="list-disc list-inside text-sm text-spotify-text-gray space-y-1">
                      {moodValidation.issues.map((issue, idx) => (
                        <li key={idx}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {moodValidation.suggestions &&
                  moodValidation.suggestions.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-white mb-1 font-medium">
                        Suggestions:
                      </p>
                      <ul className="list-disc list-inside text-sm text-spotify-text-gray space-y-1">
                        {moodValidation.suggestions.map((suggestion, idx) => (
                          <li key={idx}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                {!moodValidation.approved && moodValidation.recommendedMood && (
                  <div className="mt-3">
                    <p className="text-sm text-white mb-2 font-medium">
                      AI Recommendations:
                    </p>
                    <button
                      onClick={() => {
                        if (moodSettings && moodValidation) {
                          saveMoodSettings({
                            mood:
                              moodValidation.recommendedMood ||
                              moodSettings.mood,
                            feelings:
                              moodValidation.recommendedFeelings ||
                              moodSettings.feelings,
                            vibe:
                              moodValidation.recommendedVibe ??
                              moodSettings.vibe,
                            genres:
                              moodValidation.recommendedGenres ||
                              moodSettings.genres,
                          });
                          setMoodValidation(null);
                        }
                      }}
                      className="text-sm text-spotify-green hover:text-spotify-green/80 underline"
                      style={{
                        fontSize: "13px",
                        color: "#1DB954",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Apply AI Recommendations
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mood Configuration UI */}
        {!moodSettings ? (
          <div className="text-center py-8">
            <p className="text-spotify-text-gray mb-4">
              Configure your mood settings to start uploading tracks
            </p>
            <button
              onClick={() => {
                const defaultSettings: MoodTags = {
                  mood: "Content",
                  feelings: [],
                  vibe: 50,
                  genres: [],
                };
                setMoodSettings(defaultSettings);
                saveMoodSettings(defaultSettings);
              }}
              className="px-4 py-2 bg-spotify-green text-black rounded-full font-bold hover:bg-[#1ed760] transition-colors"
              style={{
                padding: "8px 16px",
                backgroundColor: "#1DB954",
                color: "#000000",
                borderRadius: "500px",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              Start Configuration
            </button>
          </div>
        ) : (
          <div>
            <MoodSelector
              selectedMood={moodSettings.mood}
              onSelect={(mood) => saveMoodSettings({ ...moodSettings, mood })}
            />
            <FeelingChips
              selectedFeelings={moodSettings.feelings}
              onToggle={(feeling) => {
                const feelings = moodSettings.feelings.includes(feeling)
                  ? moodSettings.feelings.filter((f) => f !== feeling)
                  : [...moodSettings.feelings, feeling];
                saveMoodSettings({ ...moodSettings, feelings });
              }}
            />
            <VibeSlider
              value={moodSettings.vibe}
              onChange={(vibe) => saveMoodSettings({ ...moodSettings, vibe })}
            />
            <GenreSelector
              selectedGenres={moodSettings.genres}
              onToggle={(genre) => {
                const genres = moodSettings.genres.includes(genre)
                  ? moodSettings.genres.filter((g) => g !== genre)
                  : [...moodSettings.genres, genre];
                saveMoodSettings({ ...moodSettings, genres });
              }}
            />
            <div className="mt-6 p-4 bg-spotify-dark-gray rounded-lg">
              <p className="text-xs text-spotify-text-gray">
                <strong className="text-white">Note:</strong> These are your
                default mood settings. You can adjust them per-track during
                upload, but you must set defaults before uploading.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Live Statistics - Exact Spotify Style */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          className="bg-gradient-to-br from-spotify-green to-spotify-green rounded-lg p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
            borderRadius: "8px",
            padding: "24px",
            color: "#FFFFFF",
          }}
        >
          <div
            className="flex items-center justify-between mb-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <TrendingUp
              size={24}
              className="opacity-80"
              style={{
                width: "24px",
                height: "24px",
                color: "rgba(255, 255, 255, 0.8)",
                flexShrink: 0,
              }}
            />
            {autoRefresh && (
              <div
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#22C55E",
                  borderRadius: "50%",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
          <div
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "4px",
            }}
          >
            Total Streams
          </div>
          <div
            className="text-3xl font-bold"
            style={{
              fontSize: "32px",
              lineHeight: "36px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {totalStreams.toLocaleString()}
          </div>
          <div
            className="text-xs opacity-60 mt-1"
            style={{
              fontSize: "11px",
              lineHeight: "16px",
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: "4px",
            }}
          >
            +{Math.floor(Math.random() * 10)} today
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white">
          <DollarSign size={24} className="opacity-80 mb-2" />
          <div className="text-sm opacity-80 mb-1">Estimated Earnings</div>
          <div className="text-3xl font-bold">${totalEarnings.toFixed(2)}</div>
          <div className="text-xs opacity-60 mt-1">This month</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white">
          <Music size={24} className="opacity-80 mb-2" />
          <div className="text-sm opacity-80 mb-1">Published Tracks</div>
          <div className="text-3xl font-bold">{publishedTracks.length}</div>
          <div className="text-xs opacity-60 mt-1">
            of {tracks.length} total
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-6 text-white">
          <BarChart3 size={24} className="opacity-80 mb-2" />
          <div className="text-sm opacity-80 mb-1">Avg. per Stream</div>
          <div className="text-3xl font-bold">$0.004</div>
          <div className="text-xs opacity-60 mt-1">Higher than industry</div>
        </div>
      </div>

      {/* Auto-refresh Toggle */}
      <div
        className="bg-spotify-light-gray rounded-lg mb-6 flex items-center justify-between"
        style={{
          backgroundColor: "#181818",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            className="font-bold mb-1"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "4px",
            }}
          >
            Live Statistics
          </h3>
          <p
            className="text-sm text-spotify-text-gray"
            style={{
              fontSize: "13px",
              lineHeight: "16px",
              color: "#B3B3B3",
            }}
          >
            Auto-update stream counts and earnings
          </p>
        </div>
        <label
          className="flex items-center gap-3 cursor-pointer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <span
            className="text-sm"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#FFFFFF",
            }}
          >
            Auto-refresh
          </span>
          <div
            role="switch"
            aria-checked={autoRefresh}
            aria-label="Auto-refresh statistics"
            onClick={() => setAutoRefresh(!autoRefresh)}
            style={{
              position: "relative",
              width: "44px",
              height: "24px",
              borderRadius: "12px",
              backgroundColor: autoRefresh ? "#1DB954" : "#727272",
              transition: "background-color 200ms ease-out",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "2px",
                left: autoRefresh ? "22px" : "2px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                transition: "left 200ms ease-out",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </label>
      </div>

      {/* Track Management */}
      <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Track Management</h2>

        {/* Debug Info - Remove after testing */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded text-sm">
            <div className="mb-2">
              <strong>DEBUG INFO:</strong>
            </div>
            <div className="mb-1">
              Tracks state: <strong>{tracks.length}</strong> tracks
            </div>
            <div className="mb-1">
              localStorage:{" "}
              {typeof window !== "undefined"
                ? localStorage.getItem("artist-tracks")
                  ? `${localStorage.getItem("artist-tracks")?.length} chars`
                  : "empty"
                : "N/A"}
            </div>
            {tracks.length > 0 ? (
              <div className="mt-2">
                Track names: {tracks.map((t) => t.name).join(", ")}
              </div>
            ) : (
              <div className="mt-2 text-yellow-400">
                ⚠️ No tracks found - showing mockTracks fallback
              </div>
            )}
            <button
              onClick={() => {
                // Simulate an upload - save test track to localStorage
                const testTrack = {
                  id: "TEST-" + Date.now(),
                  name: "Test Upload " + new Date().toLocaleTimeString(),
                  album: "Test Album",
                  uploadDate: new Date().toISOString(),
                  status: "published",
                  streams: 0,
                  earnings: 0,
                };
                const existing = localStorage.getItem("artist-tracks");
                let allTracks = existing ? JSON.parse(existing) : [];
                allTracks.unshift(testTrack);
                localStorage.setItem(
                  "artist-tracks",
                  JSON.stringify(allTracks),
                );
                logger.debug("Added test track", { testTrack, totalTracks: allTracks.length });
                window.dispatchEvent(new Event("tracks-updated"));
                loadTracks();
              }}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
            >
              🧪 TEST: Add Fake Track to localStorage
            </button>
            <button
              onClick={() => {
                logger.debug("Test: Current localStorage and tracks state", {
                  localStorage: localStorage.getItem("artist-tracks"),
                  tracksCount: tracks.length,
                });
                loadTracks();
              }}
              className="mt-2 ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
            >
              🔄 Reload from localStorage
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-spotify-text-gray">
                <th className="pb-3">Track</th>
                <th className="pb-3">Album</th>
                <th className="pb-3">Upload Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Streams</th>
                <th className="pb-3 text-right">Earnings</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => (
                <tr
                  key={track.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3">
                    <div className="font-medium">{track.name}</div>
                  </td>
                  <td className="py-3 text-spotify-text-gray">{track.album}</td>
                  <td className="py-3 text-spotify-text-gray">
                    {new Date(track.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        track.status === "published"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {track.status === "published"
                        ? "Published"
                        : "Unpublished"}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">
                    {track.streams.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-medium">
                    ${track.earnings.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => togglePublish(track.id)}
                        className={`p-2 rounded hover:bg-white/10 transition-colors ${
                          track.status === "published"
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                        title={
                          track.status === "published" ? "Unpublish" : "Publish"
                        }
                      >
                        {track.status === "published" ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                      <button
                        className="p-2 rounded hover:bg-white/10 transition-colors text-spotify-text-gray hover:text-white"
                        title="View Analytics"
                        aria-label="View track analytics"
                      >
                        <BarChart3 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Earnings Dashboard */}
      <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Earnings Dashboard</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-spotify-dark-gray rounded-lg">
            <div>
              <div className="text-sm text-spotify-text-gray">
                Current Payout Rate
              </div>
              <div className="text-2xl font-bold">$0.004 per stream</div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Transparent, higher than industry standard
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">
                Pending Payment
              </div>
              <div className="text-xl font-bold">$0.00</div>
            </div>
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">
                This Month
              </div>
              <div className="text-xl font-bold">
                ${totalEarnings.toFixed(2)}
              </div>
            </div>
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">
                Lifetime
              </div>
              <div className="text-xl font-bold">
                ${totalEarnings.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-spotify-light-gray rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upload New Track</h2>
        <div className="bg-spotify-dark-gray rounded-lg p-6 text-center">
          <Upload size={48} className="mx-auto mb-4 text-spotify-text-gray" />
          <p className="text-spotify-text-gray mb-4">
            Ready to upload a new track?
          </p>
          <button
            onClick={() => router.push("/upload")}
            className="btn-primary"
            style={{
              backgroundColor: "#1DB954",
              color: "#000000",
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: "500px",
              fontSize: "14px",
              lineHeight: "20px",
              border: "none",
              cursor: "pointer",
              transition: "all 200ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1ed760";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1DB954";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Start Upload
          </button>
          <div className="mt-4 text-xs text-spotify-text-gray space-y-1">
            <p>Preferred: WAV (lossless), FLAC</p>
            <p>Accepted: MP3 (320kbps+), M4A, MP4/AAC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
