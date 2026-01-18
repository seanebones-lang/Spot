'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePlayerStore } from '@/stores/playerStore';
import { mockData } from '@/lib/data';
import { Track } from '@/types/track';
import PlayButton from '@/components/PlayButton';
import AdBanner from '@/components/AdBanner';
import ErrorToast from '@/components/ErrorToast';
import OnboardingTour from '@/components/OnboardingTour';
import Tooltip from '@/components/Tooltip';
import { Heart, Music, Radio } from 'lucide-react';

export default function HomePage() {
  const tracks = mockData.getTracks();
  const playlists = mockData.getPlaylists();
  const artists = mockData.getArtists();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying, addToQueue, addToRecentlyPlayed, recentlyPlayed } = usePlayerStore();
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed');
    if (!completed) {
      setShowOnboarding(true);
    }
  }, []);

  const handlePlayTrack = (track: Track, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('🎵 handlePlayTrack called:', track.name, track.audioUrl);
    console.log('🎵 Track data:', { id: track.id, name: track.name, audioUrl: track.audioUrl });
    
    try {
      // Clear any previous errors
      setError(null);
      
      // Add track to queue first if not already there
      addToQueue(track);
      
      // Set as current track first
      setCurrentTrack(track);
      console.log('✅ Track set in store:', track.name);
      
      // Add to recently played
      addToRecentlyPlayed(track);
      
      // Then set playing - Player component will handle loading
      setIsPlaying(true);
      console.log('✅ Playing set to true');
    } catch (error) {
      console.error('❌ Error in handlePlayTrack:', error);
      setError('Failed to play track. Please try again.');
    }
  };

  const handleRetry = () => {
    if (currentTrack) {
      handlePlayTrack(currentTrack);
    }
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
    <div 
      className="p-8 min-h-full"
      style={{ 
        padding: '32px',
        backgroundColor: '#121212',
        minHeight: '100vh'
      }}
    >
      {/* Onboarding Tour */}
      {showOnboarding && <OnboardingTour onComplete={() => setShowOnboarding(false)} />}

      {/* Error Toast */}
      {error && (
        <ErrorToast 
          message={error} 
          onRetry={handleRetry}
          onDismiss={() => setError(null)}
        />
      )}

      {/* Ad Banner (for free tier) - Temporarily disabled for testing */}
      {/* <AdBanner type="banner" className="mb-8" /> */}

      {/* Daily Check-in Card */}
      <div data-tour="check-in" className="mb-8 bg-gradient-to-r from-empulse-purple to-empulse-blue rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Daily Mood Check-in</h2>
            <p className="text-white/80 mb-4">Track your mood and earn points</p>
            <Link href="/check-in" className="px-6 py-3 bg-transparent border-2 border-spotify-green text-spotify-green hover:shadow-[0_0_20px_rgba(29,185,84,0.6)] rounded-full font-semibold transition-all duration-300 inline-block">
              Check In Now
            </Link>
          </div>
          <Heart size={64} className="opacity-50" />
        </div>
      </div>

      {/* Mood Matcher Card */}
      <div data-tour="mood-matcher" className="mb-8 bg-gradient-to-r from-empulse-purple/20 to-empulse-blue/20 rounded-lg p-6 border border-empulse-purple/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Mood Matcher</h2>
            <p className="text-spotify-text-gray mb-4">
              Not sure what to listen to? Find music that matches your current mood.
            </p>
            <Link 
              href="/mood" 
              className="px-6 py-3 bg-empulse-purple hover:bg-empulse-purple/80 text-white rounded-full font-semibold transition-all duration-300 inline-block"
            >
              Find My Mood →
            </Link>
          </div>
          <Heart size={64} className="opacity-30" />
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

      {/* Recently Played Section - Exact Spotify Style */}
      {recentlyPlayed.length > 0 && (
        <section className="mb-8" style={{ marginBottom: '32px' }}>
          <div 
            className="flex items-center justify-between mb-4"
            style={{ marginBottom: '16px' }}
          >
            <h2 
              className="text-2xl font-bold"
              style={{ 
                fontSize: '24px',
                lineHeight: '28px',
                fontWeight: 700,
                color: '#FFFFFF'
              }}
            >
              Recently Played
            </h2>
            <Link 
              href="/history" 
              className="text-sm text-spotify-text-gray hover:underline"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 700,
                color: '#B3B3B3',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B3B3B3';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              See all
            </Link>
          </div>
          <div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            style={{ gap: '16px' }}
          >
            {recentlyPlayed.slice(0, 6).map((track) => (
              <div
                key={track.id}
                className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-dark-gray transition-all duration-200 group cursor-pointer"
                style={{
                  backgroundColor: '#181818',
                  borderRadius: '8px',
                  padding: '16px',
                  transition: 'background-color 200ms ease-out'
                }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  handlePlayTrack(track);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#282828';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#181818';
                }}
              >
                <div className="relative mb-3" style={{ marginBottom: '12px' }}>
                  <img
                    src={track.coverArt}
                    alt={track.name}
                    className="w-full aspect-square object-cover rounded"
                    style={{ borderRadius: '4px', aspectRatio: '1' }}
                  />
                  <div 
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      bottom: '8px',
                      right: '8px',
                      transition: 'opacity 200ms ease-out'
                    }}
                  >
                    <PlayButton
                      isPlaying={currentTrack?.id === track.id && isPlaying}
                      onClick={() => handlePlayTrack(track)}
                      size="sm"
                    />
                  </div>
                </div>
                <h3 
                  className="font-semibold text-sm mb-1 truncate"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '4px'
                  }}
                >
                  {track.name}
                </h3>
                <p 
                  className="text-xs text-spotify-text-gray truncate"
                  style={{
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#B3B3B3'
                  }}
                >
                  {track.artist}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Wellness Dashboard */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="bg-spotify-light-gray rounded-lg p-4">
          <div className="text-sm text-spotify-text-gray mb-1">Streak</div>
          <div className="text-2xl font-bold">🔥 5 days</div>
        </div>
        <div data-tour="points" className="bg-spotify-light-gray rounded-lg p-4">
          <div className="text-sm text-spotify-text-gray mb-1">Points</div>
          <div className="text-2xl font-bold">150</div>
        </div>
        <div className="bg-spotify-light-gray rounded-lg p-4">
          <div className="text-sm text-spotify-text-gray mb-1">Journal Entries</div>
          <div className="text-2xl font-bold">12</div>
        </div>
      </div>

      {/* Made for You - Exact Spotify Style */}
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <div 
          className="flex items-center justify-between mb-4"
          style={{ marginBottom: '16px' }}
        >
          <h2 
            className="text-2xl font-bold"
            style={{ 
              fontSize: '24px',
              lineHeight: '28px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}
          >
            Made for You
          </h2>
          <Link 
            href="/mood" 
            className="text-sm text-spotify-text-gray hover:underline"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              color: '#B3B3B3',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#B3B3B3';
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            See all
          </Link>
        </div>
        <div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          style={{ gap: '16px' }}
        >
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-dark-gray transition-all duration-200 group cursor-pointer"
              style={{
                backgroundColor: '#181818',
                borderRadius: '8px',
                padding: '16px',
                transition: 'background-color 200ms ease-out'
              }}
              onClick={() => handlePlayPlaylist(playlist)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#282828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#181818';
              }}
            >
              <div className="relative mb-4" style={{ marginBottom: '16px' }}>
                <img
                  src={playlist.coverArt}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded"
                  style={{ borderRadius: '4px', aspectRatio: '1' }}
                />
                <div 
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    bottom: '8px',
                    right: '8px',
                    transition: 'opacity 200ms ease-out'
                  }}
                >
                  <PlayButton
                    isPlaying={currentTrack?.id === playlist.tracks[0]?.id && isPlaying}
                    onClick={() => handlePlayPlaylist(playlist)}
                    size="sm"
                  />
                </div>
              </div>
              <h3 
                className="font-semibold text-sm mb-1 truncate"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '4px'
                }}
              >
                {playlist.name}
              </h3>
              <p 
                className="text-xs text-spotify-text-gray line-clamp-2"
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#B3B3B3',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {playlist.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Songs - Exact Spotify Style */}
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="text-2xl font-bold mb-4"
          style={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px'
          }}
        >
          Trending Songs
        </h2>
        <div 
          className="bg-spotify-light-gray rounded-lg overflow-hidden"
          style={{
            backgroundColor: '#181818',
            borderRadius: '8px'
          }}
        >
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-3 hover:bg-white/10 transition-colors group cursor-pointer"
              style={{
                padding: '12px 16px',
                gap: '16px',
                transition: 'background-color 200ms ease-out'
              }}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('button')) return;
                handlePlayTrack(track);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div 
                className="w-8 text-center text-spotify-text-gray group-hover:text-white flex-shrink-0"
                style={{
                  width: '32px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#B3B3B3',
                  transition: 'color 200ms ease-out'
                }}
              >
                {currentTrack?.id === track.id && isPlaying ? (
                  <Music size={16} className="mx-auto text-spotify-green" style={{ color: '#1DB954' }} />
                ) : (
                  <span className="opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 200ms ease-out' }}>
                    {index + 1}
                  </span>
                )}
              </div>
              <div 
                className="w-12 h-12 bg-spotify-dark-gray rounded flex-shrink-0 relative group/cover"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '4px',
                  backgroundColor: '#282828'
                }}
              >
                <img
                  src={track.coverArt}
                  alt={track.name}
                  className="w-full h-full object-cover rounded"
                  style={{ borderRadius: '4px' }}
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity bg-black/30 rounded"
                  style={{
                    borderRadius: '4px',
                    transition: 'opacity 200ms ease-out',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <PlayButton
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayTrack(track, e);
                    }}
                    size="sm"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div 
                  className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-spotify-green' : ''}`}
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 400,
                    color: currentTrack?.id === track.id ? '#1DB954' : '#FFFFFF'
                  }}
                >
                  {track.name}
                </div>
                <div 
                  className="text-sm text-spotify-text-gray truncate"
                  style={{
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#B3B3B3'
                  }}
                >
                  {track.artist}
                </div>
              </div>
              <div 
                className={`flex-shrink-0 transition-opacity ${currentTrack?.id === track.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                style={{
                  transition: 'opacity 200ms ease-out'
                }}
              >
                <PlayButton
                  isPlaying={currentTrack?.id === track.id && isPlaying}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayTrack(track, e);
                  }}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Artists - Exact Spotify Style */}
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="text-2xl font-bold mb-4"
          style={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px'
          }}
        >
          Popular Artists
        </h2>
        <div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          style={{ gap: '16px' }}
        >
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.id}`}
              className="bg-spotify-light-gray rounded-full p-4 hover:bg-spotify-dark-gray transition-all duration-200 text-center group"
              style={{
                backgroundColor: '#181818',
                borderRadius: '500px',
                padding: '16px',
                transition: 'background-color 200ms ease-out, transform 200ms ease-out',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#282828';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#181818';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div 
                className="w-full aspect-square rounded-full overflow-hidden mb-3"
                style={{
                  marginBottom: '12px',
                  aspectRatio: '1'
                }}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <h3 
                className="font-semibold text-sm truncate"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}
              >
                {artist.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Specialized Categories - Exact Spotify Style */}
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="text-2xl font-bold mb-4"
          style={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px'
          }}
        >
          Specialized Categories
        </h2>
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ gap: '16px' }}
        >
          <Tooltip
            text="Healing frequencies designed to promote relaxation and wellness. Based on sound therapy principles."
            position="top"
            showInfoIcon={true}
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <Music size={32} className="mb-3" />
              <h3 className="text-lg font-bold mb-2">MHz Sounds</h3>
              <p className="text-sm text-white/80 mb-4">Healing frequencies for wellness</p>
              <Link href="/categories/mhz-sounds" className="text-sm underline">
                Explore →
              </Link>
            </div>
          </Tooltip>
          <Tooltip
            text="Specially curated audio content to support individuals on recovery journeys. Comforting sounds and music."
            position="top"
            showInfoIcon={true}
          >
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg p-6 text-white">
              <Radio size={32} className="mb-3" />
              <h3 className="text-lg font-bold mb-2">Withdrawal Sounds</h3>
              <p className="text-sm text-white/80 mb-4">Support for recovery journeys</p>
              <Link href="/categories/withdrawal-sounds" className="text-sm underline">
                Explore →
              </Link>
            </div>
          </Tooltip>
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
