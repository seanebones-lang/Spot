'use client';

import { Smartphone, Monitor } from 'lucide-react';

export default function DevicesSettingsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Devices</h1>
      <div className="max-w-2xl space-y-4">
        <div className="bg-spotify-light-gray rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Monitor className="w-8 h-8 text-spotify-text-gray" />
            <div>
              <div className="font-medium">Chrome Browser</div>
              <div className="text-sm text-spotify-text-gray">Active now</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
