'use client';

import { Suspense } from 'react';
import { use } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { VirtualizedTrackList } from '@/components/VirtualizedTrackList';
import { Track } from '@/types/track';
import { Music, AlertCircle } from 'lucide-react';

// Async data fetching function - uses Jamendo API (legal, royalty-free)
async function getMoodTracks(mood: string): Promise<{ tracks: Track[]; count: number; source: string; license: string }> {
  const res = await fetch(
    `/api/tracks/mood/${mood}?limit=50`,
    {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || `Failed to fetch ${mood} tracks`);
  }

  return res.json();
}

// Component that uses React 19's use() hook
function MoodTracks({ mood }: { mood: string }) {
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();
  
  let data;
  try {
    data = use(getMoodTracks(mood));
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-center p-8">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2 text-white">Failed to Load Tracks</h2>
        <p className="text-spotify-text-gray mb-4">
          {(error as Error).message || 'Unable to fetch tracks. Please try again later.'}
        </p>
        <p className="text-sm text-spotify-text-gray">
          Make sure JAMENDO_API_KEY is set in your .env file
        </p>
      </div>
    );
  }

  const tracks = data.tracks || [];

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-center p-8">
        <Music size={48} className="text-spotify-text-gray mb-4" />
        <h2 className="text-xl font-bold mb-2 text-white">No Tracks Found</h2>
        <p className="text-spotify-text-gray">
          No tracks available for "{mood}" mood. Try a different mood.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-spotify-text-gray">
          <span className="font-semibold text-white">{data.count}</span> tracks • 
          Source: <span className="font-medium">{data.source}</span> • 
          License: <span className="font-medium">{data.license}</span>
        </div>
      </div>
      <VirtualizedTrackList
        tracks={tracks}
        onPlay={handlePlay}
        height={600}
        currentTrackId={null}
        isPlaying={false}
      />
    </div>
  );
}

// Main page component with Suspense boundary
export default function MoodPage({ params }: { params: { mood: string } }) {
  const moodDisplay = params.mood
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div 
      className="p-8"
      style={{
        padding: '32px',
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#FFFFFF'
      }}
    >
      <div className="mb-8">
        <h1 
          className="text-4xl font-bold mb-2"
          style={{
            fontSize: '32px',
            lineHeight: '36px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '8px'
          }}
        >
          {moodDisplay} Playlist
        </h1>
        <p 
          className="text-spotify-text-gray"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            color: '#B3B3B3'
          }}
        >
          Discover music that matches your {moodDisplay.toLowerCase()} mood
        </p>
      </div>
      
      <Suspense
        fallback={
          <div 
            className="flex items-center justify-center h-[600px]"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '600px'
            }}
          >
            <div className="text-center">
              <div 
                className="animate-spin rounded-full h-12 w-12 border-b-2 border-spotify-green mx-auto mb-4"
                style={{
                  borderColor: '#7209B7',
                  borderBottomColor: 'transparent'
                }}
              />
              <div 
                className="text-spotify-text-gray"
                style={{
                  fontSize: '14px',
                  color: '#B3B3B3'
                }}
              >
                Loading {moodDisplay.toLowerCase()} playlist...
              </div>
            </div>
          </div>
        }
      >
        <MoodTracks mood={params.mood} />
      </Suspense>
    </div>
  );
}
