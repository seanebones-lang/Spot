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
    <div 
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: '32px',
        color: '#FFFFFF'
      }}
    >
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
        Devices
      </h1>
      <p 
        className="text-spotify-text-gray mb-8"
        style={{
          fontSize: '14px',
          lineHeight: '20px',
          color: '#B3B3B3',
          marginBottom: '32px'
        }}
      >
        Manage your connected devices and control playback remotely.
      </p>
      
      <div 
        className="max-w-2xl space-y-4"
        style={{
          maxWidth: '672px',
          gap: '16px'
        }}
      >
        {devices.map((device) => {
          const Icon = deviceIcons[device.type];
          return (
            <div
              key={device.id}
              className={cn(
                "bg-spotify-light-gray rounded-lg p-6 flex items-center justify-between transition-all",
                device.isActive && "ring-2 ring-spotify-green"
              )}
              style={{
                backgroundColor: '#181818',
                borderRadius: '8px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'all 200ms ease-out',
                border: device.isActive ? '2px solid #1DB954' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#282828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#181818';
              }}
            >
              <div 
                className="flex items-center gap-4 flex-1"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flex: '1 1 0%'
                }}
              >
                <div 
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    device.isActive ? "bg-spotify-green" : "bg-spotify-dark-gray"
                  )}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: device.isActive ? '#1DB954' : '#282828',
                    flexShrink: 0
                  }}
                >
                  <Icon 
                    className="w-6 h-6 text-white"
                    style={{
                      width: '24px',
                      height: '24px',
                      color: '#FFFFFF'
                    }}
                  />
                </div>
                <div 
                  className="flex-1"
                  style={{
                    flex: '1 1 0%',
                    minWidth: 0
                  }}
                >
                  <div 
                    className="flex items-center gap-2"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}
                  >
                    <div 
                      className="font-medium"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 400,
                        color: '#FFFFFF'
                      }}
                    >
                      {device.name}
                    </div>
                    {device.isActive && (
                      <Check 
                        className="w-5 h-5 text-spotify-green"
                        style={{
                          width: '20px',
                          height: '20px',
                          color: '#1DB954',
                          flexShrink: 0
                        }}
                      />
                    )}
                  </div>
                  <div 
                    className="text-sm text-spotify-text-gray"
                    style={{
                      fontSize: '13px',
                      lineHeight: '16px',
                      color: '#B3B3B3'
                    }}
                  >
                    {device.isActive ? 'Active now' : `Last active: ${device.lastActive}`}
                  </div>
                </div>
              </div>
              {!device.isActive && (
                <button
                  onClick={() => handleTransferPlayback(device.id)}
                  className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:scale-105 transition-transform"
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    borderRadius: '500px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    transition: 'all 200ms ease-out',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Transfer Playback
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div 
        className="mt-8 max-w-2xl"
        style={{
          marginTop: '32px',
          maxWidth: '672px'
        }}
      >
        <h2 
          className="text-xl font-bold mb-4"
          style={{
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px'
          }}
        >
          Device Settings
        </h2>
        <div 
          className="bg-spotify-light-gray rounded-lg p-6 space-y-4"
          style={{
            backgroundColor: '#181818',
            borderRadius: '8px',
            padding: '24px',
            gap: '16px'
          }}
        >
          <div 
            className="flex items-center justify-between"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              <div 
                className="font-medium"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '4px'
                }}
              >
                Apple Watch Integration
              </div>
              <div 
                className="text-sm text-spotify-text-gray"
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#B3B3B3'
                }}
              >
                Sync music and control playback from your watch
              </div>
            </div>
            <button 
              className="w-12 h-6 rounded-full bg-spotify-green relative cursor-pointer"
              style={{
                width: '48px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: '#1DB954',
                position: 'relative',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 200ms ease-out'
              }}
            >
              <div 
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  transition: 'transform 200ms ease-out'
                }}
              />
            </button>
          </div>
          <div 
            className="flex items-center justify-between"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              <div 
                className="font-medium"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '4px'
                }}
              >
                Stress Monitoring
              </div>
              <div 
                className="text-sm text-spotify-text-gray"
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#B3B3B3'
                }}
              >
                Use device sensors to suggest music based on stress levels
              </div>
            </div>
            <button 
              className="w-12 h-6 rounded-full bg-spotify-text-gray relative cursor-pointer"
              style={{
                width: '48px',
                height: '24px',
                borderRadius: '12px',
                backgroundColor: '#B3B3B3',
                position: 'relative',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 200ms ease-out'
              }}
            >
              <div 
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  transition: 'transform 200ms ease-out'
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
