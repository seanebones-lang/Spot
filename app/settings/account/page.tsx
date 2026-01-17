'use client';

export default function AccountSettingsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Account</h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" defaultValue="user@example.com" className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input type="text" defaultValue="User" className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded" />
            </div>
          </div>
        </div>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-[#f5f5f5] transition-colors">Change Password</button>
        </div>
      </div>
    </div>
  );
}
