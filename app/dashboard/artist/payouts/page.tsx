<<<<<<< HEAD
"use client";
=======
'use client';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function ArtistPayoutsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Payouts & Earnings</h1>
      <div className="max-w-4xl">
        <div className="bg-spotify-light-gray rounded-lg p-6 mb-6">
          <div className="text-4xl font-bold mb-2">$0.00</div>
          <p className="text-spotify-text-gray">Total earnings</p>
        </div>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Payment History</h2>
          <p className="text-spotify-text-gray">No payments yet</p>
        </div>
      </div>
    </div>
  );
}
