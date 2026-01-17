'use client';

export default function PlaybackSettingsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Playback</h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Audio Quality</h2>
          <select className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded">
            <option>Normal (160 kbps)</option>
            <option>High (320 kbps)</option>
            <option>Very High (Lossless)</option>
          </select>
        </div>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Crossfade</h2>
          <input type="range" min="0" max="12" defaultValue="0" className="w-full" />
        </div>
      </div>
    </div>
  );
}
