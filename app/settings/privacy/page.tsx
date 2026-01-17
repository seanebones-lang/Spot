'use client';

export default function PrivacySettingsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Privacy</h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Data Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Share listening activity</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Show my activity</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
