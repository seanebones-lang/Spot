"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { mockData } from "@/lib/data";
import { logger } from "@/lib/logger";
import PlayButton from "@/components/PlayButton";
import { usePlayerStore } from "@/stores/playerStore";
import { formatDuration } from "@/lib/utils";
import Link from "next/link";
import { Album } from "@/types/album";
import { Track } from "@/types/track";

export default function AlbumPage() {
  const params = useParams();
  const id = params.id as string;
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } =
    usePlayerStore();
  const [album, setAlbum] = useState<Album | null>(null);
  const [albumTracks, setAlbumTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First check mockData
    const mockAlbum = mockData.getAlbums().find((a) => a.id === id);
    if (mockAlbum) {
      const tracks = mockData.getTracks();
      const mockAlbumTracks = tracks.filter((t) =>
        mockAlbum.tracks.some((tr) => tr.id === t.id),
      );
      setAlbum(mockAlbum);
      setAlbumTracks(mockAlbumTracks);
      setLoading(false);
      return;
    }

    // Then check localStorage for uploaded releases
    try {
      if (typeof window !== "undefined") {
        const savedTracks = localStorage.getItem("artist-tracks");
        if (savedTracks) {
          const uploadedReleases = JSON.parse(savedTracks);
          const uploadedRelease = uploadedReleases.find(
            (r: any) => r.id === id && r.status === "published",
          );

          if (uploadedRelease) {
            // Convert to Album format
            const convertedAlbum: Album = {
              id: uploadedRelease.id,
              name:
                uploadedRelease.releaseType === "single"
                  ? uploadedRelease.name
                  : uploadedRelease.album || uploadedRelease.name,
              artist: {
                id: `artist-${uploadedRelease.id}`,
                name: uploadedRelease.artistName || "Unknown Artist",
                image: "",
                followers: 0,
                verified: false,
              },
              coverArt: uploadedRelease.coverArtUrl || "",
              tracks: uploadedRelease.trackData || [],
              releaseDate:
                uploadedRelease.uploadDate || new Date().toISOString(),
              totalDuration: 0,
            };

            // Use trackData if available, otherwise create minimal tracks
            const convertedTracks: Track[] = uploadedRelease.trackData || [];

            setAlbum(convertedAlbum);
            setAlbumTracks(convertedTracks);
            setLoading(false);
            return;
          }
        }
      }
    } catch (e) {
      logger.error("Error loading uploaded album", e as Error, { albumId: id });
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Album not found</h1>
      </div>
    );
  }

  const handlePlayAlbum = () => {
    const firstTrack = albumTracks[0];
    if (firstTrack) {
      setCurrentTrack(firstTrack);
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="min-h-full"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
      }}
    >
      {/* Header - Exact Spotify Style with Gradient Background */}
      <div
        className="p-8 pb-4 flex items-end gap-6 relative"
        style={{
          padding: "32px",
          paddingBottom: "16px",
          gap: "24px",
          position: "relative",
          background: "linear-gradient(rgb(83, 83, 83) 0%, transparent 100%)",
          minHeight: "547px",
        }}
      >
        {album.coverArt ? (
          <img
            src={album.coverArt}
            alt={album.name}
            className="w-60 h-60 object-cover rounded shadow-2xl"
            style={{
              width: "232px",
              height: "232px",
              borderRadius: "4px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            className="w-60 h-60 bg-gradient-to-br from-spotify-green to-spotify-dark-gray rounded shadow-2xl flex items-center justify-center"
            style={{
              width: "232px",
              height: "232px",
              borderRadius: "4px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
              flexShrink: 0,
              background: "linear-gradient(135deg, #1DB954 0%, #181818 100%)",
            }}
          >
            <span className="text-6xl" style={{ fontSize: "64px" }}>
              💿
            </span>
          </div>
        )}
        <div className="flex-1" style={{ minWidth: 0 }}>
          <div
            className="text-sm font-medium mb-2"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              color: "#FFFFFF",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Album
          </div>
          <h1
            className="text-6xl font-bold mb-4"
            style={{
              fontSize: "72px",
              lineHeight: "80px",
              fontWeight: 900,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            {album.name}
          </h1>
          <Link
            href={`/artist/${album.artist.id}`}
            className="text-white hover:underline font-medium mb-2 block"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              color: "#FFFFFF",
              marginBottom: "8px",
              textDecoration: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecoration = "none")
            }
          >
            {album.artist.name}
          </Link>
          <div
            className="flex items-center"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: "18px",
              height: "18px",
              color: "#FFFFFF",
              gap: "8px",
              width: "687px",
              transition: "all",
            }}
          >
            <span>{new Date(album.releaseDate).getFullYear()}</span>
            <span>•</span>
            <span>{album.tracks.length} songs</span>
            <span>•</span>
            <span>{formatDuration(album.totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-4 flex items-center gap-4">
        <PlayButton
          isPlaying={isPlaying && currentTrack?.albumId === album.id}
          onClick={handlePlayAlbum}
          size="lg"
        />
      </div>

      {/* Track List - Exact Spotify Style */}
      <div
        className="px-8 pb-8"
        style={{
          padding: "0 32px 32px 32px",
        }}
      >
        <div
          className="bg-spotify-dark/30 backdrop-blur-sm rounded-lg overflow-hidden"
          style={{
            backgroundColor: "rgba(18, 18, 18, 0.6)",
            backdropFilter: "blur(4px)",
            borderRadius: "8px",
          }}
        >
          <div
            className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 text-sm text-spotify-text-gray border-b border-white/10"
            style={{
              gap: "16px",
              padding: "8px 16px",
              fontSize: "11px",
              lineHeight: "16px",
              fontWeight: 400,
              color: "#B3B3B3",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ width: "32px", textAlign: "center" }}>#</div>
            <div>TITLE</div>
            <div className="text-right">⏱</div>
          </div>
          {albumTracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrack(track);
                setIsPlaying(true);
              }}
              className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 hover:bg-white/10 group items-center cursor-pointer"
              style={{
                gap: "16px",
                padding: "12px 16px",
                transition: "background-color 200ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div
                className="w-4 text-center text-spotify-text-gray group-hover:text-white"
                style={{
                  width: "32px",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#B3B3B3",
                  transition: "color 200ms ease-out",
                }}
              >
                {currentTrack?.id === track.id && isPlaying ? (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div
                      className="w-1 h-1 bg-spotify-green rounded-full"
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#1DB954",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                ) : (
                  index + 1
                )}
              </div>
              <div className="min-w-0">
                <div
                  className={`font-medium truncate ${currentTrack?.id === track.id ? "text-spotify-green" : "text-white"}`}
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color:
                      currentTrack?.id === track.id ? "#1DB954" : "#FFFFFF",
                  }}
                >
                  {track.name}
                </div>
              </div>
              <div
                className="text-sm text-spotify-text-gray text-right"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#B3B3B3",
                }}
              >
                {formatDuration(track.duration)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
