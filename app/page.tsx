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
  // Issue-4: Track image load errors
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

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
      className="w-full bg-spotify-dark min-h-full"
      style={{ 
        padding: '32px',
        paddingBottom: '24px'
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

      {/* Recently Played Section - Exact Spotify Style (MOVED TO TOP - Music First!) */}
      {recentlyPlayed.length > 0 && (
        <section className="mb-8" style={{ marginBottom: '32px' }}>
          <div 
            className="flex items-center justify-between mb-4"
            style={{ marginBottom: '16px' }}
          >
            <h2 
              className="inline-flex text-xl leading-6 h-6 font-bold text-white underline cursor-pointer transition-colors duration-[50ms] gpu-accelerated"
              style={{
                fontSize: '20px',
                lineHeight: '24px',
                transition: 'color 0.05s cubic-bezier(0.3, 0, 1)'
              }}
            >
              Recently Played
            </h2>
            <Link 
              href="/history" 
              className="text-sm leading-5 font-bold text-spotify-text-gray hover:text-white hover:underline transition-colors duration-200 no-underline"
              style={{
                fontSize: '14px',
                lineHeight: '20px'
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
                className="bg-spotify-dark-gray rounded-lg p-4 hover:bg-[#282828] transition-all duration-200 group cursor-pointer relative"
                style={{
                  width: '168px',
                  height: '220px',
                  borderRadius: '8px',
                  transition: 'transform 200ms ease, background-color 200ms ease-out'
                }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  handlePlayTrack(track);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.zIndex = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.zIndex = '0';
                }}
              >
                <div className="relative mb-3" style={{ marginBottom: '12px', width: '168px', height: '168px' }}>
                  {imageErrors.has(track.id) ? (
                    <div className="w-full h-full bg-spotify-light-gray rounded flex items-center justify-center" style={{ borderRadius: '4px' }}>
                      <Music size={32} className="text-spotify-text-gray" />
                    </div>
                  ) : (
                    <img
                      src={track.coverArt}
                      alt={track.name}
                      className="w-full h-full object-cover rounded"
                      style={{ borderRadius: '4px', width: '168px', height: '168px' }}
                      onError={() => setImageErrors(prev => new Set(prev).add(track.id))}
                    />
                  )}
                  <div 
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      bottom: '8px',
                      right: '8px'
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
                  className="text-sm font-semibold mb-1 truncate text-white"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}
                >
                  {track.name}
                </h3>
                <p 
                  className="text-[13px] leading-4 text-spotify-text-gray truncate"
                  style={{
                    lineHeight: '16px'
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
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="inline-flex text-xl leading-6 h-6 font-bold text-white underline cursor-pointer transition-colors duration-[50ms] gpu-accelerated"
            style={{
              fontSize: '20px',
              lineHeight: '24px',
              transition: 'color 0.05s cubic-bezier(0.3, 0, 1)'
            }}
          >
            Made for You
          </h2>
          <Link 
            href="/mood" 
            className="text-sm leading-5 font-bold text-spotify-text-gray hover:text-white hover:underline transition-colors duration-200 no-underline"
            style={{
              fontSize: '14px',
              lineHeight: '20px'
            }}
          >
            See all
          </Link>
        </div>
        <div 
          className="relative"
          style={{ position: 'relative', overflow: 'visible' }}
        >
          <div 
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{ 
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px'
            }}
          >
            {playlists.map((playlist, index) => (
              <div
                key={playlist.id}
                className="flex flex-col transition-all duration-200 gpu-accelerated group cursor-pointer relative flex-shrink-0"
                style={{
                  width: '168px',
                  height: '220px',
                  transition: 'transform 200ms ease',
                  zIndex: 0
                }}
                onClick={() => handlePlayPlaylist(playlist)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.zIndex = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.zIndex = '0';
                }}
              >
                <div className="relative mb-3" style={{ marginBottom: '12px', width: '168px', height: '168px' }}>
                  {imageErrors.has(playlist.id) ? (
                    <div className="w-full h-full bg-spotify-light-gray rounded flex items-center justify-center" style={{ borderRadius: '4px' }}>
                      <Music size={32} className="text-spotify-text-gray" />
                    </div>
                  ) : (
                    <img
                      src={playlist.coverArt}
                      alt={playlist.name}
                      className="w-full h-full object-cover rounded"
                      style={{ borderRadius: '4px', width: '168px', height: '168px' }}
                      onError={() => setImageErrors(prev => new Set(prev).add(playlist.id))}
                    />
                  )}
                  <div 
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      bottom: '8px',
                      right: '8px'
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
                  className="text-sm font-semibold mb-1 truncate text-white"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}
                >
                  {playlist.name}
                </h3>
                <p 
                  className="text-[13px] leading-4 text-spotify-text-gray line-clamp-2"
                  style={{
                    lineHeight: '16px',
                    height: '32px',
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
        </div>
      </section>

      {/* Trending Songs - Exact Spotify Style */}
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="inline-flex text-xl leading-6 h-6 font-bold text-white underline cursor-pointer transition-colors duration-[50ms] gpu-accelerated mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            marginBottom: '16px',
            transition: 'color 0.05s cubic-bezier(0.3, 0, 1)'
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
              className="flex items-center gap-4 p-3 hover:bg-white/10 transition-colors duration-200 group cursor-pointer"
              style={{
                padding: '12px 16px',
                gap: '16px'
              }}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('button')) return;
                handlePlayTrack(track);
              }}
            >
              <div 
                className="w-8 text-center text-spotify-text-gray group-hover:text-white flex-shrink-0 transition-colors duration-200"
                style={{
                  width: '32px',
                  fontSize: '14px',
                  lineHeight: '20px'
                }}
              >
                {currentTrack?.id === track.id && isPlaying ? (
                  <Music size={16} className="mx-auto text-spotify-green" />
                ) : (
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                {imageErrors.has(`trending-${track.id}`) ? (
                  <div className="w-full h-full bg-spotify-dark-gray rounded flex items-center justify-center" style={{ borderRadius: '4px' }}>
                    <Music size={20} className="text-spotify-text-gray" />
                  </div>
                ) : (
                  <img
                    src={track.coverArt}
                    alt={track.name}
                    className="w-full h-full object-cover rounded"
                    style={{ borderRadius: '4px' }}
                    onError={() => setImageErrors(prev => new Set(prev).add(`trending-${track.id}`))}
                  />
                )}
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
                  className={cn(
                    "text-sm leading-5 font-normal truncate",
                    currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'
                  )}
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px'
                  }}
                >
                  {track.name}
                </div>
                <div 
                  className="text-[13px] leading-4 text-spotify-text-gray truncate"
                  style={{
                    lineHeight: '16px'
                  }}
                >
                  {track.artist}
                </div>
              </div>
              <div 
                className={cn(
                  "flex-shrink-0 transition-opacity duration-200",
                  currentTrack?.id === track.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}
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
          className="inline-flex text-xl leading-6 h-6 font-bold text-white underline cursor-pointer transition-colors duration-[50ms] gpu-accelerated mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            marginBottom: '16px',
            transition: 'color 0.05s cubic-bezier(0.3, 0, 1)'
          }}
        >
          Popular Artists
        </h2>
        <div 
          className="relative"
          style={{ 
            position: 'relative',
            overflow: 'visible'
          }}
        >
          <div 
            className="flex gap-4 overflow-x-auto horizontal-scroll"
            style={{ 
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '8px'
            }}
          >
            {artists.map((artist, index) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className="flex flex-col transition-all gpu-accelerated text-center group"
                style={{
                  width: '168px',
                  height: '198px',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  position: 'relative',
                  display: 'block',
                  transition: 'all 0.2s ease',
                  zIndex: 0,
                  textDecoration: 'none',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.zIndex = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.zIndex = '0';
                }}
              >
                <div 
                  className="w-full rounded-full overflow-hidden mb-3"
                  style={{
                    width: '168px',
                    height: '168px',
                    marginBottom: '12px',
                    borderRadius: '50%'
                  }}
                >
                  {imageErrors.has(`artist-${artist.id}`) ? (
                    <div className="w-full h-full bg-spotify-light-gray rounded-full flex items-center justify-center">
                      <Music size={48} className="text-spotify-text-gray" />
                    </div>
                  ) : (
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '50%' }}
                      onError={() => setImageErrors(prev => new Set(prev).add(`artist-${artist.id}`))}
                    />
                  )}
                </div>
                <h3 
                  className="text-sm font-semibold truncate text-white text-center px-1"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px'
                  }}
                >
                  {artist.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Categories - Exact Spotify Style */}
      <section className="mb-8" style={{ marginBottom: '32px' }}>
        <h2 
          className="inline-flex text-xl leading-6 h-6 font-bold text-white underline cursor-pointer transition-colors duration-[50ms] gpu-accelerated mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            marginBottom: '16px',
            transition: 'color 0.05s cubic-bezier(0.3, 0, 1)'
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
        <h2 
          className="inline-flex text-xl leading-6 h-6 font-bold text-white underline cursor-pointer transition-colors duration-[50ms] gpu-accelerated mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            marginBottom: '16px',
            transition: 'color 0.05s cubic-bezier(0.3, 0, 1)'
          }}
        >
          Radio Stations
        </h2>
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
