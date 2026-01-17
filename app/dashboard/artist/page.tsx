'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Music, Upload, Eye, EyeOff, BarChart3 } from 'lucide-react';
import { useArtistSignupStore } from '@/stores/artistSignupStore';

// Mock track data
const mockTracks = [
  { id: '1', name: 'I Just Might', album: 'Example Album', uploadDate: '2024-01-10', status: 'published', streams: 1250, earnings: 5.00 },
  { id: '2', name: 'HELICOPTER', album: 'Another Album', uploadDate: '2024-01-12', status: 'published', streams: 890, earnings: 3.56 },
  { id: '3', name: 'New Track (Draft)', album: 'Work in Progress', uploadDate: '2024-01-14', status: 'unpublished', streams: 0, earnings: 0 },
];

export default function ArtistDashboardPage() {
  const { approvalStatus } = useArtistSignupStore();
  const [tracks, setTracks] = useState(mockTracks);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const togglePublish = (trackId: string) => {
    setTracks(tracks.map(track => 
      track.id === trackId 
        ? { ...track, status: track.status === 'published' ? 'unpublished' : 'published' }
        : track
    ));
  };

  const totalStreams = tracks.reduce((sum, track) => sum + track.streams, 0);
  const totalEarnings = tracks.reduce((sum, track) => sum + track.earnings, 0);
  const publishedTracks = tracks.filter(t => t.status === 'published');

  if (approvalStatus !== 'approved') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Account Pending Approval</h2>
          <p className="text-spotify-text-gray mb-4">
            Your artist account is currently {approvalStatus === 'pending' ? 'pending approval' : 'under review'}.
            You&apos;ll be able to upload tracks once approved.
          </p>
          <p className="text-sm text-spotify-text-gray">
            Estimated approval time: 24-48 hours
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Artist Dashboard</h1>
        <button className="btn-primary flex items-center gap-2">
          <Upload size={20} />
          Upload Track
        </button>
      </div>

      {/* Live Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={24} className="opacity-80" />
            {autoRefresh && (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            )}
          </div>
          <div className="text-sm opacity-80 mb-1">Total Streams</div>
          <div className="text-3xl font-bold">{totalStreams.toLocaleString()}</div>
          <div className="text-xs opacity-60 mt-1">+{Math.floor(Math.random() * 10)} today</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white">
          <DollarSign size={24} className="opacity-80 mb-2" />
          <div className="text-sm opacity-80 mb-1">Estimated Earnings</div>
          <div className="text-3xl font-bold">${totalEarnings.toFixed(2)}</div>
          <div className="text-xs opacity-60 mt-1">This month</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white">
          <Music size={24} className="opacity-80 mb-2" />
          <div className="text-sm opacity-80 mb-1">Published Tracks</div>
          <div className="text-3xl font-bold">{publishedTracks.length}</div>
          <div className="text-xs opacity-60 mt-1">of {tracks.length} total</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-6 text-white">
          <BarChart3 size={24} className="opacity-80 mb-2" />
          <div className="text-sm opacity-80 mb-1">Avg. per Stream</div>
          <div className="text-3xl font-bold">$0.004</div>
          <div className="text-xs opacity-60 mt-1">Higher than industry</div>
        </div>
      </div>

      {/* Auto-refresh Toggle */}
      <div className="bg-spotify-light-gray rounded-lg p-4 mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold mb-1">Live Statistics</h3>
          <p className="text-sm text-spotify-text-gray">Auto-update stream counts and earnings</p>
        </div>
        <label className="flex items-center gap-3">
          <span className="text-sm">Auto-refresh</span>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="w-12 h-6 rounded-full appearance-none bg-spotify-dark-gray checked:bg-spotify-green transition-colors"
            style={{
              background: autoRefresh ? '#1DB954' : '#282828',
            }}
          />
        </label>
      </div>

      {/* Track Management */}
      <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Track Management</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-spotify-text-gray">
                <th className="pb-3">Track</th>
                <th className="pb-3">Album</th>
                <th className="pb-3">Upload Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Streams</th>
                <th className="pb-3 text-right">Earnings</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => (
                <tr key={track.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-3">
                    <div className="font-medium">{track.name}</div>
                  </td>
                  <td className="py-3 text-spotify-text-gray">{track.album}</td>
                  <td className="py-3 text-spotify-text-gray">{new Date(track.uploadDate).toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      track.status === 'published'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {track.status === 'published' ? 'Published' : 'Unpublished'}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">{track.streams.toLocaleString()}</td>
                  <td className="py-3 text-right font-medium">${track.earnings.toFixed(2)}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => togglePublish(track.id)}
                        className={`p-2 rounded hover:bg-white/10 transition-colors ${
                          track.status === 'published' ? 'text-yellow-400' : 'text-green-400'
                        }`}
                        title={track.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {track.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button className="p-2 rounded hover:bg-white/10 transition-colors text-spotify-text-gray hover:text-white">
                        <BarChart3 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Earnings Dashboard */}
      <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Earnings Dashboard</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-spotify-dark-gray rounded-lg">
            <div>
              <div className="text-sm text-spotify-text-gray">Current Payout Rate</div>
              <div className="text-2xl font-bold">$0.004 per stream</div>
              <div className="text-xs text-spotify-text-gray mt-1">Transparent, higher than industry standard</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">Pending Payment</div>
              <div className="text-xl font-bold">$0.00</div>
            </div>
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">This Month</div>
              <div className="text-xl font-bold">${totalEarnings.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <div className="text-sm text-spotify-text-gray mb-1">Lifetime</div>
              <div className="text-xl font-bold">${totalEarnings.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-spotify-light-gray rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upload New Track</h2>
        <div className="bg-spotify-dark-gray rounded-lg p-6 text-center">
          <Upload size={48} className="mx-auto mb-4 text-spotify-text-gray" />
          <p className="text-spotify-text-gray mb-4">Ready to upload a new track?</p>
          <button className="btn-primary">
            Start Upload
          </button>
          <div className="mt-4 text-xs text-spotify-text-gray space-y-1">
            <p>Preferred: WAV (lossless), FLAC</p>
            <p>Accepted: MP3 (320kbps+), M4A, MP4/AAC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
