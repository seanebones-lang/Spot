'use client';

export default function ArtistAnalyticsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Analytics</h1>
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <div className="text-3xl font-bold mb-2">0</div>
          <p className="text-spotify-text-gray">Total Streams</p>
        </div>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <div className="text-3xl font-bold mb-2">0</div>
          <p className="text-spotify-text-gray">Listeners</p>
        </div>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <div className="text-3xl font-bold mb-2">$0.00</div>
          <p className="text-spotify-text-gray">Revenue</p>
        </div>
      </div>
    </div>
  );
}
