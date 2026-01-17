'use client';

import { useParams } from 'next/navigation';
import { mockData } from '@/lib/data';
import PlayButton from '@/components/PlayButton';
import { usePlayerStore } from '@/stores/playerStore';
import Link from 'next/link';

export default function ArtistPage() {
  const params = useParams();
  const id = params.id as string;
  const artist = mockData.getArtists().find(a => a.id === id);
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();
  const tracks = mockData.getTracks();
  const albums = mockData.getAlbums();

  if (!artist) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Artist not found</h1>
      </div>
    );
  }

  const artistTracks = tracks.filter(t => t.artistId === artist.id);
  const artistAlbums = albums.filter(a => a.artist.id === artist.id);

  const handlePlayArtist = () => {
    const firstTrack = artistTracks[0];
    if (firstTrack) {
      setCurrentTrack(firstTrack);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-600/20 to-spotify-dark min-h-full">
      {/* Header */}
      <div className="p-8 pb-4 flex items-end gap-6">
        <div className="w-60 h-60 rounded-full overflow-hidden shadow-2xl">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          {artist.verified && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold bg-blue-500 px-2 py-1 rounded">VERIFIED ARTIST</span>
            </div>
          )}
          <h1 className="text-6xl font-bold mb-4">{artist.name}</h1>
          <div className="text-spotify-text-gray">
            {artist.followers.toLocaleString()} followers
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-4 flex items-center gap-4">
        <PlayButton
          isPlaying={isPlaying && artistTracks.some(t => t.id === currentTrack?.id)}
          onClick={handlePlayArtist}
          size="lg"
        />
        <button className="text-spotify-text-gray hover:text-white text-sm font-bold">
          Follow
        </button>
      </div>

      {/* Popular Tracks */}
      <div className="px-8 pb-8">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        <div className="space-y-1 mb-8">
          {artistTracks.slice(0, 5).map((track, index) => (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrack(track);
                setIsPlaying(true);
              }}
              className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group cursor-pointer"
            >
              <div className="w-8 text-center text-spotify-text-gray group-hover:text-white">
                {currentTrack?.id === track.id && isPlaying ? (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-1 h-1 bg-spotify-green rounded-full"></div>
                  </div>
                ) : (
                  index + 1
                )}
              </div>
              <div className="w-12 h-12 bg-spotify-light-gray rounded">
                <img src={track.coverArt} alt={track.name} className="w-full h-full object-cover rounded" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'}`}>
                  {track.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Albums */}
        {artistAlbums.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {artistAlbums.map((album) => (
                <Link key={album.id} href={`/album/${album.id}`}>
                  <div className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors">
                    <img src={album.coverArt} alt={album.name} className="w-full aspect-square object-cover rounded mb-3" />
                    <h3 className="font-semibold text-sm truncate">{album.name}</h3>
                    <p className="text-xs text-spotify-text-gray">Album</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
