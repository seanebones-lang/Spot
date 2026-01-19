'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Radio as RadioIcon, Eye, EyeOff, BarChart3, AlertCircle, Users } from 'lucide-react';

// Mock station data
const mockStations = [
  { id: '1', name: 'Indie Rock Radio', genre: 'Alternative', uploadDate: '2024-01-10', status: 'published', listeners: 1250, earnings: 5.00 },
  { id: '2', name: 'Electronic Vibes', genre: 'Electronic', uploadDate: '2024-01-12', status: 'published', listeners: 890, earnings: 3.56 },
  { id: '3', name: 'Jazz Lounge (Draft)', genre: 'Jazz', uploadDate: '2024-01-14', status: 'unpublished', listeners: 0, earnings: 0 },
];

export default function RadioDashboardPage() {
  const [stations, setStations] = useState(mockStations);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const togglePublish = (stationId: string) => {
    const updatedStations = stations.map(station => 
      station.id === stationId 
        ? { ...station, status: station.status === 'published' ? 'unpublished' : 'published' }
        : station
    );
    setStations(updatedStations);
  };

  const totalListeners = stations.reduce((sum, station) => sum + station.listeners, 0);
  const totalEarnings = stations.reduce((sum, station) => sum + station.earnings, 0);
  const publishedStations = stations.filter(s => s.status === 'published');

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
      <div 
        className="flex items-center justify-between mb-8"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          gap: '16px'
        }}
      >
        <h1 
          className="text-4xl font-bold"
          style={{
            fontSize: '32px',
            lineHeight: '36px',
            fontWeight: 700,
            color: '#FFFFFF'
          }}
        >
          Radio Station Dashboard
        </h1>
      </div>

      {/* Legal Requirements Notice */}
      <div 
        className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-6 mb-8"
        style={{
          backgroundColor: 'rgba(13, 115, 236, 0.2)',
          border: '1px solid rgba(13, 115, 236, 0.5)',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px'
        }}
      >
        <div className="flex items-start gap-3">
          <AlertCircle size={24} className="text-blue-400 flex-shrink-0" style={{ color: '#60A5FA' }} />
          <div>
            <h3 
              className="text-lg font-bold mb-2"
              style={{
                fontSize: '18px',
                lineHeight: '24px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '8px'
              }}
            >
              Legal Requirements for Radio Stations
            </h3>
            <ul 
              className="text-sm text-spotify-text-gray space-y-1 list-disc list-inside"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#B3B3B3',
                listStyle: 'disc',
                paddingLeft: '20px'
              }}
            >
              <li>You must have proper <strong>broadcasting licenses</strong> and rights to stream music content</li>
              <li>Music licensing through <strong>Performance Rights Organizations (PROs)</strong> like ASCAP, BMI, SESAC required</li>
              <li>Digital performance rights secured for online streaming distribution</li>
              <li>Station identification and branding must not infringe on existing trademarks</li>
              <li>Compliance with FCC regulations (if applicable) and international broadcasting laws</li>
              <li>Proper metadata and station information (call letters, format, location) must be accurate</li>
              <li>Live stream or automated playlist rights verification required before going live</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}
      >
        <div 
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
            }}
          >
            Total Stations
          </div>
          <div 
            className="text-3xl font-bold"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}
          >
            {stations.length}
          </div>
          <div 
            className="text-xs opacity-60 mt-1"
            style={{
              fontSize: '12px',
              opacity: 0.6,
              marginTop: '4px'
            }}
          >
            {publishedStations.length} live
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #7209B7 0%, #457B9D 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
            }}
          >
            Total Listeners
          </div>
          <div 
            className="text-3xl font-bold flex items-center gap-2"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Users size={24} style={{ width: '24px', height: '24px' }} />
            {totalListeners.toLocaleString()}
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
            }}
          >
            Total Earnings
          </div>
          <div 
            className="text-3xl font-bold flex items-center gap-2"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <DollarSign size={24} style={{ width: '24px', height: '24px' }} />
            ${totalEarnings.toFixed(2)}
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white"
          style={{
            background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
            borderRadius: '8px',
            padding: '24px',
            color: '#FFFFFF'
          }}
        >
          <div 
            className="text-sm opacity-80 mb-1"
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '4px'
            }}
          >
            Avg. Listeners/Station
          </div>
          <div 
            className="text-3xl font-bold"
            style={{
              fontSize: '32px',
              lineHeight: '36px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}
          >
            {publishedStations.length > 0 ? Math.round(totalListeners / publishedStations.length).toLocaleString() : '0'}
          </div>
        </div>
      </div>

      {/* Upload Section - Feature Coming Soon */}
      <div 
        className="bg-spotify-light-gray rounded-lg p-6 mb-8"
        style={{
          backgroundColor: '#181818',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px'
        }}
      >
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
          Create New Radio Station
        </h2>
        <div 
          className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-6 text-center"
          style={{
            backgroundColor: 'rgba(234, 179, 8, 0.2)',
            border: '1px solid rgba(234, 179, 8, 0.5)',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <RadioIcon 
            size={48} 
            className="mx-auto mb-4 text-yellow-400"
            style={{
              width: '48px',
              height: '48px',
              color: '#FACC15',
              margin: '0 auto 16px'
            }}
          />
          <h3 
            className="text-xl font-bold mb-2 text-white"
            style={{
              fontSize: '20px',
              lineHeight: '24px',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '8px'
            }}
          >
            Feature Coming Soon
          </h3>
          <p 
            className="text-spotify-text-gray"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: '#B3B3B3'
            }}
          >
            Radio station creation is currently under development. We&apos;re ensuring all broadcasting licenses, music rights, and legal compliance requirements are properly verified before launch.
          </p>
        </div>
      </div>

      {/* Station Management */}
      <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Station Management</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-spotify-text-gray">
                <th className="pb-3">Station Name</th>
                <th className="pb-3">Genre</th>
                <th className="pb-3">Created Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Listeners</th>
                <th className="pb-3 text-right">Earnings</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => (
                <tr key={station.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-3">
                    <div className="font-medium">{station.name}</div>
                  </td>
                  <td className="py-3 text-spotify-text-gray">{station.genre}</td>
                  <td className="py-3 text-spotify-text-gray">{new Date(station.uploadDate).toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      station.status === 'published'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {station.status === 'published' ? 'Live' : 'Offline'}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">{station.listeners.toLocaleString()}</td>
                  <td className="py-3 text-right font-medium">${station.earnings.toFixed(2)}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => togglePublish(station.id)}
                        className={`p-2 rounded hover:bg-white/10 transition-colors ${
                          station.status === 'published' ? 'text-yellow-400' : 'text-green-400'
                        }`}
                        title={station.status === 'published' ? 'Take Offline' : 'Go Live'}
                      >
                        {station.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button 
                        className="p-2 rounded hover:bg-white/10 transition-colors text-spotify-text-gray hover:text-white"
                        title="View Analytics"
                        aria-label="View station analytics"
                      >
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
              <div className="text-sm text-spotify-text-gray">Revenue Model</div>
              <div className="text-2xl font-bold">Advertising + Subscriptions</div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Ad revenue from audio spots, sponsorships, and brand partnerships
              </div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Plus subscription revenue from premium memberships (ad-free, exclusive content)
              </div>
              <div className="text-xs text-spotify-text-gray mt-1">
                Note: Must pay PRO royalties (ASCAP/BMI/SESAC) and SoundExchange fees before profit
              </div>
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
    </div>
  );
}
