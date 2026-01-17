'use client';

import Link from 'next/link';
import { usePlayerStore } from '@/stores/playerStore';
import { mockData } from '@/lib/data';
import { Track } from '@/types/track';
import PlayButton from '@/components/PlayButton';
import { Heart, Music, Radio } from 'lucide-react';

export default function HomePage() {
  const tracks = mockData.getTracks();
  const playlists = mockData.getPlaylists();
  const artists = mockData.getArtists();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPlaylist = (playlist: typeof playlists[0]) => {
    // Add all playlist tracks to queue and play first
    const firstTrack = tracks.find(t => t.id === playlist.tracks[0]?.id);
    if (firstTrack) {
      setCurrentTrack(firstTrack);
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-spotify-dark via-spotify-dark-gray to-spotify-dark min-h-full">
      {/* Daily Check-in Card */}
      <div className="mb-8 bg-gradient-to-r from-empulse-purple to-empulse-blue rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Daily Mood Check-in</h2>
            <p className="text-white/80 mb-4">Track your mood and earn points</p>
            <Link href="/check-in" className="btn-primary inline-block">
              Check In Now
            </Link>
          </div>
          <Heart size={64} className="opacity-50" />
        </div>
      </div>

      {/* Today's Affirmation */}
      <div className="mb-8 bg-spotify-light-gray rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2">Today&apos;s Affirmation</h3>
            <p className="text-spotify-text-gray">&quot;You are capable of amazing things. Let today be proof of that.&quot;</p>
        <Link href="/affirmations" className="text-spotify-green text-sm mt-2 inline-block hover:underline">
          View All Affirmations →
        </Link>
      </div>

      {/* Wellness Dashboard */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="bg-spotify-light-gray rounded-lg p-4">
          <div className="text-sm text-spotify-text-gray mb-1">Streak</div>
          <div className="text-2xl font-bold">🔥 5 days</div>
        </div>
        <div className="bg-spotify-light-gray rounded-lg p-4">
          <div className="text-sm text-spotify-text-gray mb-1">Points</div>
          <div className="text-2xl font-bold">150</div>
        </div>
        <div className="bg-spotify-light-gray rounded-lg p-4">
          <div className="text-sm text-spotify-text-gray mb-1">Journal Entries</div>
          <div className="text-2xl font-bold">12</div>
        </div>
      </div>

      {/* Made for You */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Made for You</h2>
          <Link href="/mood" className="text-sm text-spotify-text-gray hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors group cursor-pointer"
              onClick={() => handlePlayPlaylist(playlist)}
            >
              <div className="relative mb-4">
                <img
                  src={playlist.coverArt}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayButton
                    isPlaying={currentTrack?.id === playlist.tracks[0]?.id && isPlaying}
                    onClick={() => handlePlayPlaylist(playlist)}
                    size="sm"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-sm mb-1 truncate">{playlist.name}</h3>
              <p className="text-xs text-spotify-text-gray line-clamp-2">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Songs */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Trending Songs</h2>
        <div className="bg-spotify-light-gray rounded-lg overflow-hidden">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-3 hover:bg-white/10 transition-colors group"
            >
              <div className="w-8 text-center text-spotify-text-gray group-hover:text-white">
                {currentTrack?.id === track.id && isPlaying ? (
                  <Music size={16} className="mx-auto text-spotify-green" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="w-12 h-12 bg-spotify-dark-gray rounded flex-shrink-0">
                <img
                  src={track.coverArt}
                  alt={track.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{track.name}</div>
                <div className="text-sm text-spotify-text-gray truncate">{track.artist}</div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayButton
                  isPlaying={currentTrack?.id === track.id && isPlaying}
                  onClick={() => handlePlayTrack(track)}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.id}`}
              className="bg-spotify-light-gray rounded-full p-4 hover:bg-spotify-light-gray/80 transition-colors text-center group"
            >
              <div className="w-full aspect-square rounded-full overflow-hidden mb-3">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-sm truncate">{artist.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Specialized Categories */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Specialized Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <Music size={32} className="mb-3" />
            <h3 className="text-lg font-bold mb-2">MHz Sounds</h3>
            <p className="text-sm text-white/80 mb-4">Healing frequencies for wellness</p>
            <Link href="/categories/mhz-sounds" className="text-sm underline">
              Explore →
            </Link>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg p-6 text-white">
            <Radio size={32} className="mb-3" />
            <h3 className="text-lg font-bold mb-2">Withdrawal Sounds</h3>
            <p className="text-sm text-white/80 mb-4">Support for recovery journeys</p>
            <Link href="/categories/withdrawal-sounds" className="text-sm underline">
              Explore →
            </Link>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-lg p-6 text-white">
            <Heart size={32} className="mb-3" />
            <h3 className="text-lg font-bold mb-2">Mental Health Podcasts</h3>
            <p className="text-sm text-white/80 mb-4">Stories, tips, and support</p>
            <Link href="/radio?category=mental-health" className="text-sm underline">
              Listen →
            </Link>
          </div>
        </div>
      </section>

      {/* Radio Stations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Radio Stations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Pop Radio', 'Rock Radio', 'Electronic Radio', 'Hip-Hop Radio', 'Jazz Radio', 'Classical Radio'].map((station) => (
            <div
              key={station}
              className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors group cursor-pointer"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-lg mb-3 flex items-center justify-center">
                <Radio size={32} className="text-white opacity-50" />
              </div>
              <h3 className="font-semibold text-sm">{station}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
