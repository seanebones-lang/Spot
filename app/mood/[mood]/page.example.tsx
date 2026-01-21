// Example: React 19 Suspense Pattern for Mood Playlists
// This demonstrates how to use React 19's use() hook with Suspense
// for better data fetching and streaming

'use client';

import { Suspense } from 'react';
import { use } from 'react'; // React 19 feature
import { VirtualizedTrackList } from '@/components/VirtualizedTrackList';
import { Track } from '@/types/track';

// Async data fetching function - uses Jamendo API (legal, royalty-free)
async function getMoodTracks(mood: string): Promise<{ tracks: Track[] }> {
  // Use Next.js fetch with caching
  const res = await fetch(
    `/api/tracks/mood/${mood}?limit=50`,
    {
      cache: 'force-cache', // Cache for 1 hour
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch mood tracks: ${res.statusText}`);
  }

  const data = await res.json();
  return data; // Returns { tracks, count, mood, source, license }
}

// Component that uses React 19's use() hook
function MoodTracks({ mood }: { mood: string }) {
  // use() automatically handles Suspense boundaries
  // This will suspend until the promise resolves
  const data = use(getMoodTracks(mood));
  const tracks = data.tracks;

  const handlePlay = (track: Track) => {
    // Play track logic
    console.log('Playing track:', track.name);
  };

  return (
    <div>
      <div className="mb-4 text-sm text-spotify-text-gray">
        {data.count} tracks • Source: {data.source} • License: {data.license}
      </div>
      <VirtualizedTrackList
        tracks={tracks}
        onPlay={handlePlay}
        height={600}
      />
    </div>
  );
}

// Main page component with Suspense boundary
export default function MoodPage({ params }: { params: { mood: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {params.mood} Playlist
      </h1>
      
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[600px]">
            <div className="text-spotify-text-gray">
              Loading {params.mood} playlist...
            </div>
          </div>
        }
      >
        <MoodTracks mood={params.mood} />
      </Suspense>
    </div>
  );
}
