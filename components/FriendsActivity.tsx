'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';
import PlayButton from './PlayButton';

interface FriendActivity {
  id: string;
  name: string;
  avatar?: string;
  track: {
    id: string;
    name: string;
    artist: string;
    coverArt?: string;
  };
  timestamp: number; // seconds ago
}

// Mock friend activity data
const mockFriendActivity: FriendActivity[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    track: {
      id: 'track1',
      name: 'Midnight Vibes',
      artist: 'DJ Smooth',
      coverArt: '/api/placeholder/40/40',
    },
    timestamp: 120, // 2 minutes ago
  },
  {
    id: '2',
    name: 'Sarah Chen',
    track: {
      id: 'track2',
      name: 'Electric Dreams',
      artist: 'Neon Waves',
      coverArt: '/api/placeholder/40/40',
    },
    timestamp: 450, // 7.5 minutes ago
  },
];

export default function FriendsActivity() {
  const { leftSidebarWidth } = useUIStore();
  const [activities, setActivities] = useState<FriendActivity[]>(mockFriendActivity);

  // In production, this would poll or use WebSocket for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setActivities(prev => prev.map(activity => ({
        ...activity,
        timestamp: activity.timestamp + 1,
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (seconds: number) => {
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Don't show if sidebar is too narrow
  if (leftSidebarWidth < 200) {
    return null;
  }

  return (
    <div className="px-3 mb-4 mt-auto border-t border-white/10 pt-4">
      <h3 className="text-xs font-bold text-spotify-text-gray uppercase tracking-wider mb-3 px-2">
        Friends Activity
      </h3>
      <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
        {activities.length === 0 ? (
          <p className="text-xs text-spotify-text-gray px-2">
            Follow friends to see what they're listening to
          </p>
        ) : (
          activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/track/${activity.track.id}`}
              className="flex items-center gap-2 p-2 rounded hover:bg-white/10 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-empulse-purple to-empulse-blue flex-shrink-0 flex items-center justify-center text-xs font-bold">
                {activity.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white truncate group-hover:text-spotify-green transition-colors">
                  {activity.track.name}
                </div>
                <div className="text-xs text-spotify-text-gray truncate">
                  {activity.name} • {formatTimestamp(activity.timestamp)}
                </div>
              </div>
              {activity.track.coverArt && (
                <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-spotify-light-gray opacity-0 group-hover:opacity-100 transition-opacity">
                  <img
                    src={activity.track.coverArt}
                    alt={activity.track.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
