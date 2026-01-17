'use client';

export default function DonationsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Donate</h1>
      <div className="max-w-4xl">
        <div className="bg-spotify-light-gray rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Support Mental Health Organizations</h2>
          <p className="text-spotify-text-gray mb-4">A portion of your donation goes to mental health causes</p>
          <button className="bg-spotify-green hover:bg-spotify-green/80 text-black px-6 py-3 rounded-full font-medium transition-colors">Donate Now</button>
        </div>
      </div>
    </div>
  );
}
