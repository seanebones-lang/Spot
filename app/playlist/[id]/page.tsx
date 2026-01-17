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

export default function PlaylistPage() {
  const params = useParams();
  const id = params.id as string;
  const playlist = mockData.getPlaylists().find(p => p.id === id);
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying, addToQueue, setShuffle } = usePlayerStore();
  const { savedTracks, addTrack, removeTrack } = useLibraryStore();
  const tracks = mockData.getTracks();
  
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; trackId: string } | null>(null);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set(savedTracks.map(t => t.id)));
  const [sortBy, setSortBy] = useState<'default' | 'title' | 'artist' | 'album' | 'duration' | 'date'>('default');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [orderedTracks, setOrderedTracks] = useState(playlist?.tracks || []);

  useEffect(() => {
    setLikedTracks(new Set(savedTracks.map(t => t.id)));
  }, [savedTracks]);

  useEffect(() => {
    if (playlist) {
      setOrderedTracks(playlist.tracks);
    }
  }, [playlist?.tracks]);

  // Sort tracks
  useEffect(() => {
    if (!playlist) return;
    if (sortBy === 'default') {
      setOrderedTracks(playlist.tracks);
      return;
    }

    const sorted = [...playlist.tracks].sort((a, b) => {
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
          return trackA.duration - trackB.duration;
        default:
          return 0;
      }
    });
    setOrderedTracks(sorted);
  }, [sortBy, playlist?.tracks, tracks]);

  const handleTrackLike = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (track) {
      if (likedTracks.has(trackId)) {
        removeTrack(trackId);
      } else {
        addTrack(track);
      }
      setLikedTracks(prev => {
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
    const playlistTracks = playlist.tracks.map(trackRef => 
      tracks.find(t => t.id === trackRef.id)
    ).filter(Boolean);
    
    if (playlistTracks.length === 0) return;

    if (shuffle) {
      const shuffled = [...playlistTracks].sort(() => Math.random() - 0.5);
      setShuffle(true);
      setCurrentTrack(shuffled[0]!);
      setIsPlaying(true);
      shuffled.slice(1).forEach(track => track && addToQueue(track));
    } else {
      setShuffle(false);
      setCurrentTrack(playlistTracks[0]!);
      setIsPlaying(true);
      playlistTracks.slice(1).forEach(track => track && addToQueue(track));
    }
  };

  const handleTrackContextMenu = (e: React.MouseEvent, trackId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, trackId });
  };

  const handleTrackClick = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (track) {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const currentTrackData = contextMenu ? tracks.find(t => t.id === contextMenu.trackId) : null;

  const totalDuration = playlist.tracks.reduce((acc, trackRef) => {
    const track = tracks.find(t => t.id === trackRef.id);
    return acc + (track?.duration || 0);
  }, 0);

  return (
    <div className="bg-gradient-to-b from-purple-600/20 to-spotify-dark min-h-full">
      {/* Header */}
      <div className="p-8 pb-4 flex items-end gap-6">
        <img
          src={playlist.coverArt}
          alt={playlist.name}
          className="w-60 h-60 object-cover rounded shadow-2xl"
        />
        <div className="flex-1">
          <div className="text-sm font-medium mb-2">Playlist</div>
          <h1 className="text-6xl font-bold mb-4">{playlist.name}</h1>
          {playlist.description && (
            <p className="text-spotify-text-gray mb-2">{playlist.description}</p>
          )}
          <div className="flex items-center gap-2 text-sm text-spotify-text-gray">
            <span className="font-medium text-white">{playlist.owner}</span>
            <span>•</span>
            <span>{playlist.tracks.length} songs</span>
            <span>•</span>
            <span>{formatDuration(totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-4 flex items-center gap-4">
        <PlayButton
          isPlaying={isPlaying && playlist.tracks.some(t => t.id === currentTrack?.id)}
          onClick={() => handlePlayPlaylist(false)}
          size="lg"
        />
        <button
          onClick={() => handlePlayPlaylist(true)}
          className="w-16 h-16 flex items-center justify-center text-black bg-white hover:scale-105 rounded-full transition-transform shadow-lg"
          aria-label="Shuffle play"
        >
          <Shuffle size={32} />
        </button>
        <button className="text-spotify-text-gray hover:text-white text-sm font-bold">
          Follow
        </button>
      </div>

      {/* Track List */}
      <div className="px-8 pb-8">
        <div className="bg-spotify-dark/30 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 flex-1 text-sm text-spotify-text-gray">
              <div>#</div>
              <div>TITLE</div>
              <div>ALBUM</div>
              <div></div>
              <div className="text-right">⏱</div>
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  const options: Array<'default' | 'title' | 'artist' | 'album' | 'duration' | 'date'> = ['default', 'title', 'artist', 'album', 'duration', 'date'];
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
            const track = tracks.find(t => t.id === trackRef.id);
            if (!track) return null;
            const isLiked = likedTracks.has(track.id);
            const originalIndex = playlist.tracks.findIndex(t => t.id === trackRef.id);
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
                  if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
                    const newTracks = [...playlist.tracks];
                    const [removed] = newTracks.splice(draggedIndex, 1);
                    newTracks.splice(dragOverIndex, 0, removed);
                    setOrderedTracks(newTracks);
                    // In production, save to backend
                  }
                  setDraggedIndex(null);
                  setDragOverIndex(null);
                }}
                onClick={() => handleTrackClick(track.id)}
                onContextMenu={(e) => handleTrackContextMenu(e, track.id)}
                className={cn(
                  "grid grid-cols-[auto_auto_1fr_auto_auto_auto] gap-4 px-4 py-2 hover:bg-white/10 group items-center cursor-pointer transition-all",
                  draggedIndex === originalIndex && "opacity-50",
                  dragOverIndex === originalIndex && "bg-white/20 border-l-2 border-spotify-green"
                )}
              >
                <GripVertical 
                  size={16} 
                  className="text-spotify-text-gray opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing" 
                />
                <div className="w-4 text-center text-spotify-text-gray group-hover:text-white">
                  {currentTrack?.id === track.id && isPlaying ? (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-1 h-1 bg-spotify-green rounded-full"></div>
                    </div>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-spotify-light-gray rounded flex-shrink-0 hidden group-hover:block">
                    {track.coverArt && (
                      <img src={track.coverArt} alt={track.name} className="w-full h-full object-cover rounded" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'}`}>
                      {track.name}
                    </div>
                    <div className="text-sm text-spotify-text-gray truncate">{track.artist}</div>
                  </div>
                </div>
                <div className="text-sm text-spotify-text-gray truncate hidden md:block">
                  {track.album}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackLike(track.id);
                    }}
                    className="text-spotify-text-gray hover:text-white transition-colors"
                    aria-label={isLiked ? "Remove from Liked Songs" : "Add to Liked Songs"}
                  >
                    <Heart 
                      size={16} 
                      className={cn(
                        isLiked && "fill-spotify-green text-spotify-green"
                      )} 
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackContextMenu(e, track.id);
                    }}
                    className="text-spotify-text-gray hover:text-white transition-colors"
                    aria-label="More options"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div className="text-sm text-spotify-text-gray text-right">
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
              <span className="px-3 py-1 bg-empulse-purple/20 text-empulse-purple rounded-full text-sm">
                {playlist.moodTags.mood}
              </span>
              {playlist.moodTags.feelings.map((feeling) => (
                <span key={feeling} className="px-3 py-1 bg-empulse-blue/20 text-empulse-blue rounded-full text-sm">
                  {feeling}
                </span>
              ))}
              <span className="px-3 py-1 bg-empulse-red/20 text-empulse-red rounded-full text-sm">
                Vibe: {playlist.moodTags.vibe}%
              </span>
              {playlist.moodTags.genres.map((genre) => (
                <span key={genre} className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm">
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
            const track = tracks.find(t => t.id === contextMenu.trackId);
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
            const url = generateShareUrl('track', contextMenu.trackId);
            await copyLink(url);
            setContextMenu(null);
          }}
          onShare={async () => {
            const track = tracks.find(t => t.id === contextMenu.trackId);
            if (track) {
              const url = generateShareUrl('track', contextMenu.trackId);
              await shareContent({
                title: track.name,
                text: `Check out "${track.name}" by ${track.artist} on EmPulse Music`,
                url,
                type: 'track',
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
