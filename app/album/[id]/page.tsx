'use client';

import { useParams } from 'next/navigation';
import { mockData } from '@/lib/data';
import PlayButton from '@/components/PlayButton';
import { usePlayerStore } from '@/stores/playerStore';
import { formatDuration } from '@/lib/utils';
import Link from 'next/link';

export default function AlbumPage() {
  const params = useParams();
  const id = params.id as string;
  const album = mockData.getAlbums().find(a => a.id === id);
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();
  const tracks = mockData.getTracks();

  if (!album) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Album not found</h1>
      </div>
    );
  }

  const albumTracks = tracks.filter(t => album.tracks.some(tr => tr.id === t.id));

  const handlePlayAlbum = () => {
    const firstTrack = albumTracks[0];
    if (firstTrack) {
      setCurrentTrack(firstTrack);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-600/20 to-spotify-dark min-h-full">
      {/* Header */}
      <div className="p-8 pb-4 flex items-end gap-6">
        <img
          src={album.coverArt}
          alt={album.name}
          className="w-60 h-60 object-cover rounded shadow-2xl"
        />
        <div className="flex-1">
          <div className="text-sm font-medium mb-2">Album</div>
          <h1 className="text-6xl font-bold mb-4">{album.name}</h1>
          <Link href={`/artist/${album.artist.id}`} className="text-white hover:underline font-medium mb-2 block">
            {album.artist.name}
          </Link>
          <div className="flex items-center gap-2 text-sm text-spotify-text-gray">
            <span>{new Date(album.releaseDate).getFullYear()}</span>
            <span>•</span>
            <span>{album.tracks.length} songs</span>
            <span>•</span>
            <span>{formatDuration(album.totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-4 flex items-center gap-4">
        <PlayButton
          isPlaying={isPlaying && currentTrack?.albumId === album.id}
          onClick={handlePlayAlbum}
          size="lg"
        />
      </div>

      {/* Track List */}
      <div className="px-8 pb-8">
        <div className="bg-spotify-dark/30 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 text-sm text-spotify-text-gray border-b border-white/10">
            <div>#</div>
            <div>TITLE</div>
            <div className="text-right">⏱</div>
          </div>
          {albumTracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrack(track);
                setIsPlaying(true);
              }}
              className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 hover:bg-white/10 group items-center cursor-pointer"
            >
              <div className="w-4 text-center text-spotify-text-gray group-hover:text-white">
                {currentTrack?.id === track.id && isPlaying ? (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-1 h-1 bg-spotify-green rounded-full"></div>
                  </div>
                ) : (
                  index + 1
                )}
              </div>
              <div className="min-w-0">
                <div className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'}`}>
                  {track.name}
                </div>
              </div>
              <div className="text-sm text-spotify-text-gray text-right">
                {formatDuration(track.duration)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
