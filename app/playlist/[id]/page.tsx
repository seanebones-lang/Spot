<<<<<<< HEAD
"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Shuffle,
  MoreHorizontal,
  Heart,
  GripVertical,
  ArrowUpDown,
} from "lucide-react";
import { mockData } from "@/lib/data";
import PlayButton from "@/components/PlayButton";
import ContextMenu from "@/components/ContextMenu";
import { usePlayerStore } from "@/stores/playerStore";
import { useLibraryStore } from "@/stores/libraryStore";
import { formatDuration, cn } from "@/lib/utils";
import { shareContent, generateShareUrl, copyLink } from "@/lib/share";
=======
'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Shuffle, MoreHorizontal, Heart, GripVertical, ArrowUpDown } from 'lucide-react';
import { mockData } from '@/lib/data';
import PlayButton from '@/components/PlayButton';
import ContextMenu from '@/components/ContextMenu';
import { usePlayerStore } from '@/stores/playerStore';
import { useLibraryStore } from '@/stores/libraryStore';
import { formatDuration, cn } from '@/lib/utils';
import { shareContent, generateShareUrl, copyLink } from '@/lib/share';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function PlaylistPage() {
  const params = useParams();
  const id = params.id as string;
<<<<<<< HEAD
  const playlist = mockData.getPlaylists().find((p) => p.id === id);
  const {
    setCurrentTrack,
    setIsPlaying,
    currentTrack,
    isPlaying,
    addToQueue,
    setShuffle,
  } = usePlayerStore();
  const { savedTracks, addTrack, removeTrack } = useLibraryStore();
  const tracks = mockData.getTracks();

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    trackId: string;
  } | null>(null);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(
    new Set(savedTracks.map((t) => t.id)),
  );
  const [sortBy, setSortBy] = useState<
    "default" | "title" | "artist" | "album" | "duration" | "date"
  >("default");
=======
  const playlist = mockData.getPlaylists().find(p => p.id === id);
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying, addToQueue, setShuffle } = usePlayerStore();
  const { savedTracks, addTrack, removeTrack } = useLibraryStore();
  const tracks = mockData.getTracks();
  
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; trackId: string } | null>(null);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set(savedTracks.map(t => t.id)));
  const [sortBy, setSortBy] = useState<'default' | 'title' | 'artist' | 'album' | 'duration' | 'date'>('default');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [orderedTracks, setOrderedTracks] = useState(playlist?.tracks || []);

  useEffect(() => {
<<<<<<< HEAD
    setLikedTracks(new Set(savedTracks.map((t) => t.id)));
=======
    setLikedTracks(new Set(savedTracks.map(t => t.id)));
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }, [savedTracks]);

  useEffect(() => {
    if (playlist) {
      setOrderedTracks(playlist.tracks);
    }
  }, [playlist?.tracks]);

  // Sort tracks
  useEffect(() => {
    if (!playlist) return;
<<<<<<< HEAD
    if (sortBy === "default") {
=======
    if (sortBy === 'default') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      setOrderedTracks(playlist.tracks);
      return;
    }

    const sorted = [...playlist.tracks].sort((a, b) => {
<<<<<<< HEAD
      const trackA = tracks.find((t) => t.id === a.id);
      const trackB = tracks.find((t) => t.id === b.id);
      if (!trackA || !trackB) return 0;

      switch (sortBy) {
        case "title":
          return trackA.name.localeCompare(trackB.name);
        case "artist":
          return trackA.artist.localeCompare(trackB.artist);
        case "album":
          return trackA.album.localeCompare(trackB.album);
        case "duration":
=======
      const trackA = tracks.find(t => t.id === a.id);
      const trackB = tracks.find(t => t.id === b.id);
      if (!trackA || !trackB) return 0;

      switch (sortBy) {
        case 'title':
          return trackA.name.localeCompare(trackB.name);
        case 'artist':
          return trackA.artist.localeCompare(trackB.artist);
        case 'album':
          return trackA.album.localeCompare(trackB.album);
        case 'duration':
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          return trackA.duration - trackB.duration;
        default:
          return 0;
      }
    });
    setOrderedTracks(sorted);
  }, [sortBy, playlist?.tracks, tracks]);

  const handleTrackLike = (trackId: string) => {
<<<<<<< HEAD
    const track = tracks.find((t) => t.id === trackId);
=======
    const track = tracks.find(t => t.id === trackId);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (track) {
      if (likedTracks.has(trackId)) {
        removeTrack(trackId);
      } else {
        addTrack(track);
      }
<<<<<<< HEAD
      setLikedTracks((prev) => {
=======
      setLikedTracks(prev => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        const newSet = new Set(prev);
        if (newSet.has(trackId)) {
          newSet.delete(trackId);
        } else {
          newSet.add(trackId);
        }
        return newSet;
      });
    }
  };

  if (!playlist) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Playlist not found</h1>
      </div>
    );
  }

  const handlePlayPlaylist = (shuffle: boolean = false) => {
<<<<<<< HEAD
    const playlistTracks = playlist.tracks
      .map((trackRef) => tracks.find((t) => t.id === trackRef.id))
      .filter(Boolean);

=======
    const playlistTracks = playlist.tracks.map(trackRef => 
      tracks.find(t => t.id === trackRef.id)
    ).filter(Boolean);
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (playlistTracks.length === 0) return;

    if (shuffle) {
      const shuffled = [...playlistTracks].sort(() => Math.random() - 0.5);
      setShuffle(true);
      setCurrentTrack(shuffled[0]!);
      setIsPlaying(true);
<<<<<<< HEAD
      shuffled.slice(1).forEach((track) => track && addToQueue(track));
=======
      shuffled.slice(1).forEach(track => track && addToQueue(track));
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    } else {
      setShuffle(false);
      setCurrentTrack(playlistTracks[0]!);
      setIsPlaying(true);
<<<<<<< HEAD
      playlistTracks.slice(1).forEach((track) => track && addToQueue(track));
=======
      playlistTracks.slice(1).forEach(track => track && addToQueue(track));
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }
  };

  const handleTrackContextMenu = (e: React.MouseEvent, trackId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, trackId });
  };

  const handleTrackClick = (trackId: string) => {
<<<<<<< HEAD
    const track = tracks.find((t) => t.id === trackId);
=======
    const track = tracks.find(t => t.id === trackId);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (track) {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

<<<<<<< HEAD
  const currentTrackData = contextMenu
    ? tracks.find((t) => t.id === contextMenu.trackId)
    : null;

  const totalDuration = playlist.tracks.reduce((acc, trackRef) => {
    const track = tracks.find((t) => t.id === trackRef.id);
=======
  const currentTrackData = contextMenu ? tracks.find(t => t.id === contextMenu.trackId) : null;

  const totalDuration = playlist.tracks.reduce((acc, trackRef) => {
    const track = tracks.find(t => t.id === trackRef.id);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return acc + (track?.duration || 0);
  }, 0);

  return (
<<<<<<< HEAD
    <div
      className="min-h-full relative"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        position: "relative",
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
=======
    <div 
      className="min-h-full relative"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        position: 'relative'
      }}
    >
      {/* Header - Exact Spotify Style with Gradient Background */}
      <div 
        className="p-8 pb-4 flex items-end gap-6 relative"
        style={{
          padding: '32px',
          paddingBottom: '16px',
          gap: '24px',
          position: 'relative',
          background: 'linear-gradient(rgb(83, 83, 83) 0%, transparent 100%)',
          minHeight: '547px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        }}
      >
        <img
          src={playlist.coverArt}
          alt={playlist.name}
          className="w-60 h-60 object-cover rounded shadow-2xl"
          style={{
<<<<<<< HEAD
            width: "232px",
            height: "232px",
            borderRadius: "4px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            flexShrink: 0,
          }}
        />
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
=======
            width: '232px',
            height: '232px',
            borderRadius: '4px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            flexShrink: 0
          }}
        />
        <div className="flex-1" style={{ minWidth: 0 }}>
          <div 
            className="text-sm font-medium mb-2"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 400,
              color: '#FFFFFF',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            Playlist
          </div>
<<<<<<< HEAD
          <h1
            className="text-6xl font-bold mb-4"
            style={{
              fontSize: "72px",
              lineHeight: "80px",
              fontWeight: 900,
              color: "#FFFFFF",
              marginBottom: "16px",
=======
          <h1 
            className="text-6xl font-bold mb-4"
            style={{
              fontSize: '72px',
              lineHeight: '80px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            {playlist.name}
          </h1>
          {playlist.description && (
<<<<<<< HEAD
            <p
              className="text-spotify-text-gray mb-2"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
                marginBottom: "8px",
=======
            <p 
              className="text-spotify-text-gray mb-2"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#B3B3B3',
                marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              {playlist.description}
            </p>
          )}
<<<<<<< HEAD
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
            <span
              className="font-medium text-white"
              style={{
                fontWeight: 700,
                color: "#FFFFFF",
=======
          <div 
            className="flex items-center"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '18px',
              height: '18px',
              color: '#FFFFFF',
              gap: '8px',
              width: '687px',
              transition: 'all'
            }}
          >
            <span 
              className="font-medium text-white"
              style={{
                fontWeight: 700,
                color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              {playlist.owner}
            </span>
            <span>•</span>
            <span>{playlist.tracks.length} songs</span>
            <span>•</span>
            <span>{formatDuration(totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Controls - Exact Spotify Style */}
<<<<<<< HEAD
      <div
        className="px-8 pb-4 flex items-center gap-4"
        style={{
          padding: "0 32px 16px 32px",
          gap: "16px",
        }}
      >
        <PlayButton
          isPlaying={
            isPlaying && playlist.tracks.some((t) => t.id === currentTrack?.id)
          }
=======
      <div 
        className="px-8 pb-4 flex items-center gap-4"
        style={{
          padding: '0 32px 16px 32px',
          gap: '16px'
        }}
      >
        <PlayButton
          isPlaying={isPlaying && playlist.tracks.some(t => t.id === currentTrack?.id)}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          onClick={() => handlePlayPlaylist(false)}
          size="lg"
        />
        <button
          onClick={() => handlePlayPlaylist(true)}
          className="w-16 h-16 flex items-center justify-center text-black bg-white hover:scale-105 rounded-full transition-transform shadow-lg"
          style={{
<<<<<<< HEAD
            width: "56px",
            height: "56px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderRadius: "50%",
            transition: "transform 200ms ease-out",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Shuffle play"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <Shuffle size={32} style={{ width: "28px", height: "28px" }} />
        </button>
        <button
          className="text-spotify-text-gray hover:text-white text-sm font-bold"
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 700,
            color: "#B3B3B3",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            transition: "color 200ms ease-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#B3B3B3";
=======
            width: '56px',
            height: '56px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: '50%',
            transition: 'transform 200ms ease-out',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Shuffle play"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Shuffle size={32} style={{ width: '28px', height: '28px' }} />
        </button>
        <button 
          className="text-spotify-text-gray hover:text-white text-sm font-bold"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 700,
            color: '#B3B3B3',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 200ms ease-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#B3B3B3';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Follow
        </button>
      </div>

      {/* Track List - Exact Spotify Style */}
<<<<<<< HEAD
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
            className="flex items-center justify-between px-4 py-2 border-b border-white/10"
            style={{
              padding: "8px 16px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 flex-1 text-sm text-spotify-text-gray"
              style={{
                gap: "16px",
                fontSize: "11px",
                lineHeight: "16px",
                fontWeight: 400,
                color: "#B3B3B3",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <div style={{ width: "32px", textAlign: "center" }}>#</div>
=======
      <div 
        className="px-8 pb-8"
        style={{
          padding: '0 32px 32px 32px'
        }}
      >
        <div 
          className="bg-spotify-dark/30 backdrop-blur-sm rounded-lg overflow-hidden"
          style={{
            backgroundColor: 'rgba(18, 18, 18, 0.6)',
            backdropFilter: 'blur(4px)',
            borderRadius: '8px'
          }}
        >
          <div 
            className="flex items-center justify-between px-4 py-2 border-b border-white/10"
            style={{
              padding: '8px 16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div 
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 flex-1 text-sm text-spotify-text-gray"
              style={{
                gap: '16px',
                fontSize: '11px',
                lineHeight: '16px',
                fontWeight: 400,
                color: '#B3B3B3',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              <div style={{ width: '32px', textAlign: 'center' }}>#</div>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              <div>TITLE</div>
              <div className="hidden md:block">ALBUM</div>
              <div></div>
              <div className="text-right">⏱</div>
            </div>
            <div className="relative">
              <button
                onClick={() => {
<<<<<<< HEAD
                  const options: Array<
                    | "default"
                    | "title"
                    | "artist"
                    | "album"
                    | "duration"
                    | "date"
                  > = [
                    "default",
                    "title",
                    "artist",
                    "album",
                    "duration",
                    "date",
                  ];
=======
                  const options: Array<'default' | 'title' | 'artist' | 'album' | 'duration' | 'date'> = ['default', 'title', 'artist', 'album', 'duration', 'date'];
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  const currentIndex = options.indexOf(sortBy);
                  setSortBy(options[(currentIndex + 1) % options.length]);
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-spotify-text-gray hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Sort"
              >
                <ArrowUpDown size={16} />
                Sort
              </button>
            </div>
          </div>
          {orderedTracks.map((trackRef, index) => {
<<<<<<< HEAD
            const track = tracks.find((t) => t.id === trackRef.id);
            if (!track) return null;
            const isLiked = likedTracks.has(track.id);
            const originalIndex = playlist.tracks.findIndex(
              (t) => t.id === trackRef.id,
            );
=======
            const track = tracks.find(t => t.id === trackRef.id);
            if (!track) return null;
            const isLiked = likedTracks.has(track.id);
            const originalIndex = playlist.tracks.findIndex(t => t.id === trackRef.id);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            return (
              <div
                key={track.id}
                draggable
                onDragStart={() => setDraggedIndex(originalIndex)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverIndex(originalIndex);
                }}
                onDragEnd={() => {
<<<<<<< HEAD
                  if (
                    draggedIndex !== null &&
                    dragOverIndex !== null &&
                    draggedIndex !== dragOverIndex
                  ) {
=======
                  if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    const newTracks = [...playlist.tracks];
                    const [removed] = newTracks.splice(draggedIndex, 1);
                    newTracks.splice(dragOverIndex, 0, removed);
                    setOrderedTracks(newTracks);
                  }
                  setDraggedIndex(null);
                  setDragOverIndex(null);
                }}
                onClick={() => handleTrackClick(track.id)}
                onContextMenu={(e) => handleTrackContextMenu(e, track.id)}
                className={cn(
                  "grid grid-cols-[auto_auto_1fr_auto_auto_auto] gap-4 px-4 py-2 hover:bg-white/10 group items-center cursor-pointer transition-all",
                  draggedIndex === originalIndex && "opacity-50",
<<<<<<< HEAD
                  dragOverIndex === originalIndex &&
                    "bg-white/20 border-l-2 border-spotify-green",
                )}
                style={{
                  gap: "16px",
                  padding: "12px 16px",
                  transition: "background-color 200ms ease-out",
                  borderRadius: "0",
                }}
                onMouseEnter={(e) => {
                  if (dragOverIndex !== originalIndex) {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
=======
                  dragOverIndex === originalIndex && "bg-white/20 border-l-2 border-spotify-green"
                )}
                style={{
                  gap: '16px',
                  padding: '12px 16px',
                  transition: 'background-color 200ms ease-out',
                  borderRadius: '0'
                }}
                onMouseEnter={(e) => {
                  if (dragOverIndex !== originalIndex) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }
                }}
                onMouseLeave={(e) => {
                  if (dragOverIndex !== originalIndex) {
<<<<<<< HEAD
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <GripVertical
                  size={16}
                  className="text-spotify-text-gray opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#B3B3B3",
                    transition: "opacity 200ms ease-out",
                  }}
                />
                <div
                  className="w-4 text-center text-spotify-text-gray group-hover:text-white"
                  style={{
                    width: "32px",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                    transition: "color 200ms ease-out",
=======
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <GripVertical 
                  size={16} 
                  className="text-spotify-text-gray opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"
                  style={{
                    width: '16px',
                    height: '16px',
                    color: '#B3B3B3',
                    transition: 'opacity 200ms ease-out'
                  }}
                />
                <div 
                  className="w-4 text-center text-spotify-text-gray group-hover:text-white"
                  style={{
                    width: '32px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#B3B3B3',
                    transition: 'color 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {currentTrack?.id === track.id && isPlaying ? (
                    <div className="w-4 h-4 flex items-center justify-center">
<<<<<<< HEAD
                      <div
                        className="w-1 h-1 bg-spotify-green rounded-full"
                        style={{
                          width: "4px",
                          height: "4px",
                          backgroundColor: "#1DB954",
                          borderRadius: "50%",
=======
                      <div 
                        className="w-1 h-1 bg-spotify-green rounded-full"
                        style={{
                          width: '4px',
                          height: '4px',
                          backgroundColor: '#7209B7',
                          borderRadius: '50%'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                        }}
                      ></div>
                    </div>
                  ) : (
                    index + 1
                  )}
                </div>
<<<<<<< HEAD
                <div
                  className="flex items-center gap-3 min-w-0"
                  style={{ gap: "12px" }}
                >
                  <div
                    className="w-10 h-10 bg-spotify-light-gray rounded flex-shrink-0 hidden group-hover:block"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "4px",
                      backgroundColor: "#282828",
                    }}
                  >
                    {track.coverArt && (
                      <img
                        src={track.coverArt}
                        alt={track.name}
                        className="w-full h-full object-cover rounded"
                        style={{ borderRadius: "4px" }}
=======
                <div className="flex items-center gap-3 min-w-0" style={{ gap: '12px' }}>
                  <div 
                    className="w-10 h-10 bg-spotify-light-gray rounded flex-shrink-0 hidden group-hover:block"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '4px',
                      backgroundColor: '#282828'
                    }}
                  >
                    {track.coverArt && (
                      <img 
                        src={track.coverArt} 
                        alt={track.name} 
                        className="w-full h-full object-cover rounded"
                        style={{ borderRadius: '4px' }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      />
                    )}
                  </div>
                  <div className="min-w-0">
<<<<<<< HEAD
                    <div
                      className={`font-medium truncate ${currentTrack?.id === track.id ? "text-spotify-green" : "text-white"}`}
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        color:
                          currentTrack?.id === track.id ? "#1DB954" : "#FFFFFF",
=======
                    <div 
                      className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'}`}
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 400,
                        color: currentTrack?.id === track.id ? '#7209B7' : '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      }}
                    >
                      {track.name}
                    </div>
<<<<<<< HEAD
                    <div
                      className="text-sm text-spotify-text-gray truncate"
                      style={{
                        fontSize: "13px",
                        lineHeight: "16px",
                        color: "#B3B3B3",
=======
                    <div 
                      className="text-sm text-spotify-text-gray truncate"
                      style={{
                        fontSize: '13px',
                        lineHeight: '16px',
                        color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      }}
                    >
                      {track.artist}
                    </div>
                  </div>
                </div>
<<<<<<< HEAD
                <div
                  className="text-sm text-spotify-text-gray truncate hidden md:block"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
=======
                <div 
                  className="text-sm text-spotify-text-gray truncate hidden md:block"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {track.album}
                </div>
<<<<<<< HEAD
                <div
                  className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    gap: "8px",
                    transition: "opacity 200ms ease-out",
=======
                <div 
                  className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    gap: '8px',
                    transition: 'opacity 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackLike(track.id);
                    }}
                    className="text-spotify-text-gray hover:text-white transition-colors"
                    style={{
<<<<<<< HEAD
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 200ms ease-out",
                    }}
                    aria-label={
                      isLiked ? "Remove from Liked Songs" : "Add to Liked Songs"
                    }
                  >
                    <Heart
                      size={16}
                      className={cn(
                        isLiked && "fill-spotify-green text-spotify-green",
                      )}
                      style={{
                        width: "16px",
                        height: "16px",
                        color: isLiked ? "#1DB954" : "#B3B3B3",
=======
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 200ms ease-out'
                    }}
                    aria-label={isLiked ? "Remove from Liked Songs" : "Add to Liked Songs"}
                  >
                    <Heart 
                      size={16} 
                      className={cn(
                        isLiked && "fill-spotify-green text-spotify-green"
                      )}
                      style={{
                        width: '16px',
                        height: '16px',
                        color: isLiked ? '#7209B7' : '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      }}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackContextMenu(e, track.id);
                    }}
                    className="text-spotify-text-gray hover:text-white transition-colors"
                    style={{
<<<<<<< HEAD
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 200ms ease-out",
                    }}
                    aria-label="More options"
                  >
                    <MoreHorizontal
                      size={16}
                      style={{
                        width: "16px",
                        height: "16px",
=======
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 200ms ease-out'
                    }}
                    aria-label="More options"
                  >
                    <MoreHorizontal 
                      size={16}
                      style={{
                        width: '16px',
                        height: '16px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      }}
                    />
                  </button>
                </div>
<<<<<<< HEAD
                <div
                  className="text-sm text-spotify-text-gray text-right"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
=======
                <div 
                  className="text-sm text-spotify-text-gray text-right"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                >
                  {formatDuration(track.duration)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mood Tags */}
        {playlist.moodTags && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">Mood Tags</h3>
            <div className="flex flex-wrap gap-2">
<<<<<<< HEAD
              <span className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm">
                {playlist.moodTags.mood}
              </span>
              {playlist.moodTags.feelings.map((feeling) => (
                <span
                  key={feeling}
                  className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm"
                >
=======
              <span className="px-3 py-1 bg-empulse-purple/20 text-empulse-purple rounded-full text-sm">
                {playlist.moodTags.mood}
              </span>
              {playlist.moodTags.feelings.map((feeling) => (
                <span key={feeling} className="px-3 py-1 bg-empulse-blue/20 text-empulse-blue rounded-full text-sm">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  {feeling}
                </span>
              ))}
              <span className="px-3 py-1 bg-empulse-red/20 text-empulse-red rounded-full text-sm">
                Vibe: {playlist.moodTags.vibe}%
              </span>
              {playlist.moodTags.genres.map((genre) => (
<<<<<<< HEAD
                <span
                  key={genre}
                  className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm"
                >
=======
                <span key={genre} className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && currentTrackData && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          type="track"
          itemId={currentTrackData.artistId}
          isLiked={likedTracks.has(contextMenu.trackId)}
          onClose={() => setContextMenu(null)}
          onPlay={() => {
            handleTrackClick(contextMenu.trackId);
            setContextMenu(null);
          }}
          onAddToQueue={() => {
<<<<<<< HEAD
            const track = tracks.find((t) => t.id === contextMenu.trackId);
=======
            const track = tracks.find(t => t.id === contextMenu.trackId);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            if (track) addToQueue(track);
            setContextMenu(null);
          }}
          onLike={() => handleTrackLike(contextMenu.trackId)}
          onUnlike={() => handleTrackLike(contextMenu.trackId)}
          onShowArtist={() => {
            // Navigate to artist page
            setContextMenu(null);
          }}
          onShowAlbum={() => {
            // Navigate to album page
            setContextMenu(null);
          }}
          onCopyLink={async () => {
<<<<<<< HEAD
            const url = generateShareUrl("track", contextMenu.trackId);
=======
            const url = generateShareUrl('track', contextMenu.trackId);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            await copyLink(url);
            setContextMenu(null);
          }}
          onShare={async () => {
<<<<<<< HEAD
            const track = tracks.find((t) => t.id === contextMenu.trackId);
            if (track) {
              const url = generateShareUrl("track", contextMenu.trackId);
=======
            const track = tracks.find(t => t.id === contextMenu.trackId);
            if (track) {
              const url = generateShareUrl('track', contextMenu.trackId);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              await shareContent({
                title: track.name,
                text: `Check out "${track.name}" by ${track.artist} on EmPulse Music`,
                url,
<<<<<<< HEAD
                type: "track",
=======
                type: 'track',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              });
            }
            setContextMenu(null);
          }}
          onHide={() => {
            // Hide track implementation
            setContextMenu(null);
          }}
          onSnooze={() => {
            // Snooze track implementation
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
}
