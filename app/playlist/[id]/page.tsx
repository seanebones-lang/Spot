'use client';

import { use } from 'react';
import { useParams } from 'next/navigation';
import { mockData } from '@/lib/data';
import PlayButton from '@/components/PlayButton';
import { usePlayerStore } from '@/stores/playerStore';
import { formatDuration } from '@/lib/utils';

export default function PlaylistPage() {
  const params = useParams();
  const id = params.id as string;
  const playlist = mockData.getPlaylists().find(p => p.id === id);
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying, addToQueue } = usePlayerStore();
  
  const tracks = mockData.getTracks();

  if (!playlist) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Playlist not found</h1>
      </div>
    );
  }

  const handlePlayPlaylist = () => {
    const firstTrack = tracks.find(t => t.id === playlist.tracks[0]?.id);
    if (firstTrack) {
      setCurrentTrack(firstTrack);
      setIsPlaying(true);
      // Add remaining tracks to queue
      playlist.tracks.slice(1).forEach(trackRef => {
        const track = tracks.find(t => t.id === trackRef.id);
        if (track) addToQueue(track);
      });
    }
  };

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
          isPlaying={isPlaying && currentTrack?.id === playlist.tracks[0]?.id}
          onClick={handlePlayPlaylist}
          size="lg"
        />
        <button className="text-spotify-text-gray hover:text-white text-sm font-bold">
          Follow
        </button>
      </div>

      {/* Track List */}
      <div className="px-8 pb-8">
        <div className="bg-spotify-dark/30 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 text-sm text-spotify-text-gray border-b border-white/10">
            <div>#</div>
            <div>TITLE</div>
            <div>ALBUM</div>
            <div className="text-right">⏱</div>
          </div>
          {playlist.tracks.map((trackRef, index) => {
            const track = tracks.find(t => t.id === trackRef.id);
            if (!track) return null;
            return (
              <div
                key={track.id}
                className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 hover:bg-white/10 group items-center"
              >
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
                    <img src={track.coverArt} alt={track.name} className="w-full h-full object-cover rounded" />
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
    </div>
  );
}
