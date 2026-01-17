'use client';

export default function SecuritySettingsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Security</h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Two-Factor Authentication</h2>
          <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-[#f5f5f5] transition-colors">Enable 2FA</button>
        </div>
      </div>
    </div>
  );
}
