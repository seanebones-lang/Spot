'use client';

export default function LanguageSettingsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Language & Region</h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <label className="block text-sm font-medium mb-2">Language</label>
          <select className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <label className="block text-sm font-medium mb-2">Region</label>
          <select className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded">
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
          </select>
        </div>
      </div>
    </div>
  );
}
