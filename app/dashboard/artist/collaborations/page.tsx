"use client";

export default function ArtistCollaborationsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Collaborations</h1>
      <div className="max-w-4xl">
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Collaborative Projects</h2>
          <p className="text-spotify-text-gray">No collaborations yet</p>
        </div>
      </div>
    </div>
  );
}
