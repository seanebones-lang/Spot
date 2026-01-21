<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { mockData } from "@/lib/data";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { Album } from "@/types/album";

export default function NewReleasesPage() {
  const [publishedReleases, setPublishedReleases] = useState<
    (Album & { genre?: string; moodTags?: any; explicitContent?: boolean })[]
  >([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedMood, setSelectedMood] = useState<string>("all");

=======
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Album } from '@/types/album';

export default function NewReleasesPage() {
  const [publishedReleases, setPublishedReleases] = useState<(Album & { genre?: string; moodTags?: any; explicitContent?: boolean })[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Load published tracks from localStorage (uploaded by artists)
  useEffect(() => {
    const loadPublishedReleases = () => {
      try {
<<<<<<< HEAD
        if (typeof window !== "undefined") {
          const savedTracks = localStorage.getItem("artist-tracks");
=======
        if (typeof window !== 'undefined') {
          const savedTracks = localStorage.getItem('artist-tracks');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          if (savedTracks) {
            const tracks = JSON.parse(savedTracks);
            // Filter only published tracks and convert to album format
            const published = tracks
<<<<<<< HEAD
              .filter(
                (t: any) => t && t.status === "published" && t.id && t.name,
              )
              .map(
                (
                  track: any,
                ): Album & {
                  genre?: string;
                  moodTags?: any;
                  explicitContent?: boolean;
                } => ({
                  id: track.id,
                  name:
                    track.releaseType === "single"
                      ? track.name
                      : track.album || track.name,
                  artist: {
                    id: `artist-${track.id}`,
                    name: track.artistName || "Unknown Artist",
                    image: "",
                    followers: 0,
                    verified: false,
                  },
                  coverArt: track.coverArtUrl || "", // Use cover art if available from upload
                  tracks: [],
                  releaseDate: track.uploadDate || new Date().toISOString(),
                  totalDuration: 0,
                  genre: track.genre || "",
                  moodTags: track.moodTags || null,
                  explicitContent: track.explicitContent || false,
                }),
              )
              .reverse(); // Newest first

            logger.info("Loaded published releases", {
              count: published.length,
            });
=======
              .filter((t: any) => t && t.status === 'published' && t.id && t.name)
              .map((track: any): Album & { genre?: string; moodTags?: any; explicitContent?: boolean } => ({
                id: track.id,
                name: track.releaseType === 'single' ? track.name : (track.album || track.name),
                artist: {
                  id: `artist-${track.id}`,
                  name: track.artistName || 'Unknown Artist',
                  image: '',
                  followers: 0,
                  verified: false,
                },
                coverArt: track.coverArtUrl || '', // Use cover art if available from upload
                tracks: [],
                releaseDate: track.uploadDate || new Date().toISOString(),
                totalDuration: 0,
                genre: track.genre || '',
                moodTags: track.moodTags || null,
                explicitContent: track.explicitContent || false,
              }))
              .reverse(); // Newest first
            
            console.log('📥 [New Releases] Loaded', published.length, 'published releases');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            setPublishedReleases(published);
          }
        }
      } catch (e) {
<<<<<<< HEAD
        logger.error("Error loading published releases", e as Error);
=======
        console.error('Error loading published releases:', e);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }
    };

    loadPublishedReleases();
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Listen for updates
    const handleTracksUpdated = () => {
      loadPublishedReleases();
    };
<<<<<<< HEAD
    window.addEventListener("tracks-updated", handleTracksUpdated);
    window.addEventListener("storage", handleTracksUpdated);

    return () => {
      window.removeEventListener("tracks-updated", handleTracksUpdated);
      window.removeEventListener("storage", handleTracksUpdated);
=======
    window.addEventListener('tracks-updated', handleTracksUpdated);
    window.addEventListener('storage', handleTracksUpdated);
    
    return () => {
      window.removeEventListener('tracks-updated', handleTracksUpdated);
      window.removeEventListener('storage', handleTracksUpdated);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    };
  }, []);

  const mockAlbums = mockData.getAlbums();
  // Combine published releases (newest first) with mock albums
  // Show published releases first since they're the newest
  let albums = [...publishedReleases, ...mockAlbums];
<<<<<<< HEAD

  // Filter by genre
  if (selectedGenre !== "all") {
    albums = albums.filter((a) => {
      const genre = (a as any).genre || "";
      return genre.toLowerCase() === selectedGenre.toLowerCase();
    });
  }

  // Filter by mood
  if (selectedMood !== "all" && selectedMood) {
    albums = albums.filter((a) => {
      const moodTags = (a as any).moodTags;
      if (!moodTags) return false;
      const mood = moodTags.mood || "";
      const feelings = moodTags.feelings || [];
      return (
        mood.toLowerCase() === selectedMood.toLowerCase() ||
        feelings.some(
          (f: string) => f.toLowerCase() === selectedMood.toLowerCase(),
        )
      );
    });
  }

  albums = albums.slice(0, 20);
  const playlists = mockData.getPlaylists();

  // Get unique genres from published releases
  const availableGenres = Array.from(
    new Set(publishedReleases.map((r) => r.genre).filter(Boolean)),
  ) as string[];

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
=======
  
  // Filter by genre
  if (selectedGenre !== 'all') {
    albums = albums.filter(a => {
      const genre = (a as any).genre || '';
      return genre.toLowerCase() === selectedGenre.toLowerCase();
    });
  }
  
  // Filter by mood
  if (selectedMood !== 'all' && selectedMood) {
    albums = albums.filter(a => {
      const moodTags = (a as any).moodTags;
      if (!moodTags) return false;
      const mood = moodTags.mood || '';
      const feelings = moodTags.feelings || [];
      return mood.toLowerCase() === selectedMood.toLowerCase() || 
             feelings.some((f: string) => f.toLowerCase() === selectedMood.toLowerCase());
    });
  }
  
  albums = albums.slice(0, 20);
  const playlists = mockData.getPlaylists();
  
  // Get unique genres from published releases
  const availableGenres = Array.from(new Set(publishedReleases.map(r => r.genre).filter(Boolean))) as string[];

  return (
    <div 
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: '32px',
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
        New Releases
      </h1>

<<<<<<< HEAD
      <section className="mb-12" style={{ marginBottom: "48px" }}>
        <h2
          className="text-2xl font-bold mb-6"
          style={{
            fontSize: "24px",
            lineHeight: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "24px",
=======
      <section 
        className="mb-12"
        style={{ marginBottom: '48px' }}
      >
        <h2 
          className="text-2xl font-bold mb-6"
          style={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '24px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          New Albums
        </h2>
<<<<<<< HEAD
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          style={{ gap: "24px" }}
=======
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          style={{ gap: '24px' }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        >
          {albums.slice(0, 12).map((album) => (
            <Link
              key={album.id}
              href={`/album/${album.id}`}
              className="group bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg p-4 transition-all duration-200"
              style={{
<<<<<<< HEAD
                backgroundColor: "#181818",
                borderRadius: "8px",
                padding: "16px",
                transition: "background-color 200ms ease-out",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#282828";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#181818";
              }}
            >
              <div
                className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray"
                style={{
                  borderRadius: "4px",
                  aspectRatio: "1",
                  marginBottom: "16px",
                  backgroundColor: "#282828",
                  position: "relative",
=======
                backgroundColor: '#181818',
                borderRadius: '8px',
                padding: '16px',
                transition: 'background-color 200ms ease-out',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#282828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#181818';
              }}
            >
              <div 
                className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray"
                style={{
                  borderRadius: '4px',
                  aspectRatio: '1',
                  marginBottom: '16px',
                  backgroundColor: '#282828',
                  position: 'relative'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {album.coverArt ? (
                  <>
                    <Image
                      src={album.coverArt}
                      alt={album.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{
<<<<<<< HEAD
                        borderRadius: "4px",
                        transition: "transform 200ms ease-out",
=======
                        borderRadius: '4px',
                        transition: 'transform 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      }}
                    />
                    {/* Parental Advisory Sticker */}
                    {(album as any).explicitContent && (
                      <div
                        className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded"
                        style={{
<<<<<<< HEAD
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: "#DC2626",
                          color: "#FFFFFF",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                          zIndex: 10,
=======
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: '#DC2626',
                          color: '#FFFFFF',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                          zIndex: 10
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                        }}
                      >
                        ⚠️ Explicit
                      </div>
                    )}
                  </>
                ) : (
<<<<<<< HEAD
                  <div
                    className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #1DB954 0%, #181818 100%)",
                      borderRadius: "4px",
                    }}
                  >
                    <span className="text-4xl" style={{ fontSize: "32px" }}>
                      💿
                    </span>
                  </div>
                )}
              </div>
              <h3
                className="font-semibold text-sm text-white mb-1 truncate group-hover:underline"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                {album.name}
              </h3>
              <p
                className="text-xs text-spotify-text-gray truncate"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
=======
                  <div 
                    className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #7209B7 0%, #181818 100%)',
                      borderRadius: '4px'
                    }}
                  >
                    <span className="text-4xl" style={{ fontSize: '32px' }}>💿</span>
                  </div>
                )}
              </div>
              <h3 
                className="font-semibold text-sm text-white mb-1 truncate group-hover:underline"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {album.name}
              </h3>
              <p 
                className="text-xs text-spotify-text-gray truncate"
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {album.artist.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
<<<<<<< HEAD
        <h2
          className="text-2xl font-bold mb-6"
          style={{
            fontSize: "24px",
            lineHeight: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "24px",
=======
        <h2 
          className="text-2xl font-bold mb-6"
          style={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '24px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          New Playlists
        </h2>
<<<<<<< HEAD
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          style={{ gap: "24px" }}
=======
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          style={{ gap: '24px' }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        >
          {playlists.slice(0, 12).map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlist/${playlist.id}`}
              className="group bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg p-4 transition-all duration-200"
              style={{
<<<<<<< HEAD
                backgroundColor: "#181818",
                borderRadius: "8px",
                padding: "16px",
                transition: "background-color 200ms ease-out",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#282828";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#181818";
              }}
            >
              <div
                className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray"
                style={{
                  borderRadius: "4px",
                  aspectRatio: "1",
                  marginBottom: "16px",
                  backgroundColor: "#282828",
=======
                backgroundColor: '#181818',
                borderRadius: '8px',
                padding: '16px',
                transition: 'background-color 200ms ease-out',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#282828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#181818';
              }}
            >
              <div 
                className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray"
                style={{
                  borderRadius: '4px',
                  aspectRatio: '1',
                  marginBottom: '16px',
                  backgroundColor: '#282828'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {playlist.coverArt ? (
                  <Image
                    src={playlist.coverArt}
                    alt={playlist.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{
<<<<<<< HEAD
                      borderRadius: "4px",
                      transition: "transform 200ms ease-out",
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #1DB954 0%, #181818 100%)",
                      borderRadius: "4px",
                    }}
                  >
                    <span className="text-4xl" style={{ fontSize: "32px" }}>
                      🎵
                    </span>
                  </div>
                )}
              </div>
              <h3
                className="font-semibold text-sm text-white mb-1 truncate group-hover:underline"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                {playlist.name}
              </h3>
              <p
                className="text-xs text-spotify-text-gray truncate"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
=======
                      borderRadius: '4px',
                      transition: 'transform 200ms ease-out'
                    }}
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #7209B7 0%, #181818 100%)',
                      borderRadius: '4px'
                    }}
                  >
                    <span className="text-4xl" style={{ fontSize: '32px' }}>🎵</span>
                  </div>
                )}
              </div>
              <h3 
                className="font-semibold text-sm text-white mb-1 truncate group-hover:underline"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {playlist.name}
              </h3>
              <p 
                className="text-xs text-spotify-text-gray truncate"
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {playlist.owner}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
