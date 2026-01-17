'use client';

import { useState } from 'react';
import { Smartphone, Monitor, Watch, Speaker, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Device {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'watch' | 'speaker';
  isActive: boolean;
  lastActive?: string;
}

const mockDevices: Device[] = [
  { id: '1', name: 'Chrome Browser', type: 'desktop', isActive: true, lastActive: 'Now' },
  { id: '2', name: 'iPhone 15 Pro', type: 'mobile', isActive: false, lastActive: '2 hours ago' },
  { id: '3', name: 'Apple Watch', type: 'watch', isActive: false, lastActive: '1 day ago' },
  { id: '4', name: 'HomePod Mini', type: 'speaker', isActive: false, lastActive: '3 days ago' },
];

const deviceIcons = {
  desktop: Monitor,
  mobile: Smartphone,
  watch: Watch,
  speaker: Speaker,
};

export default function DevicesSettingsPage() {
  const [devices] = useState<Device[]>(mockDevices);

  const handleTransferPlayback = (deviceId: string) => {
    // In production, transfer playback to device
    console.log('Transfer playback to device:', deviceId);
  };

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Devices</h1>
      <p className="text-spotify-text-gray mb-8">
        Manage your connected devices and control playback remotely.
      </p>
      
      <div className="max-w-2xl space-y-4">
        {devices.map((device) => {
          const Icon = deviceIcons[device.type];
          return (
            <div
              key={device.id}
              className={cn(
                "bg-spotify-light-gray rounded-lg p-6 flex items-center justify-between transition-all",
                device.isActive && "ring-2 ring-spotify-green"
              )}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  device.isActive ? "bg-spotify-green" : "bg-spotify-dark-gray"
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{device.name}</div>
                    {device.isActive && (
                      <Check className="w-5 h-5 text-spotify-green" />
                    )}
                  </div>
                  <div className="text-sm text-spotify-text-gray">
                    {device.isActive ? 'Active now' : `Last active: ${device.lastActive}`}
                  </div>
                </div>
              </div>
              {!device.isActive && (
                <button
                  onClick={() => handleTransferPlayback(device.id)}
                  className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:scale-105 transition-transform"
                >
                  Transfer Playback
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Device Settings</h2>
        <div className="bg-spotify-light-gray rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Apple Watch Integration</div>
              <div className="text-sm text-spotify-text-gray">
                Sync music and control playback from your watch
              </div>
            </div>
            <button className="w-12 h-6 rounded-full bg-spotify-green relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Stress Monitoring</div>
              <div className="text-sm text-spotify-text-gray">
                Use device sensors to suggest music based on stress levels
              </div>
            </div>
            <button className="w-12 h-6 rounded-full bg-spotify-text-gray relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
