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
    <div 
      className="bg-gradient-to-b from-purple-600/20 to-spotify-dark min-h-full"
      style={{
        background: 'linear-gradient(180deg, rgba(114, 9, 183, 0.2) 0%, #121212 100%)',
        minHeight: '100vh',
        backgroundColor: '#121212'
      }}
    >
      {/* Header - Exact Spotify Style */}
      <div 
        className="p-8 pb-4 flex items-end gap-6"
        style={{
          padding: '32px',
          paddingBottom: '16px',
          gap: '24px'
        }}
      >
        <img
          src={album.coverArt}
          alt={album.name}
          className="w-60 h-60 object-cover rounded shadow-2xl"
          style={{
            width: '232px',
            height: '232px',
            borderRadius: '4px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            flexShrink: 0
          }}
        />
        <div className="flex-1" style={{ minWidth: 0 }}>
          <div 
            className="text-sm font-medium mb-2"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 400,
              color: '#FFFFFF',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            Album
          </div>
          <h1 
            className="text-6xl font-bold mb-4"
            style={{
              fontSize: '72px',
              lineHeight: '80px',
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: '16px'
            }}
          >
            {album.name}
          </h1>
          <Link 
            href={`/artist/${album.artist.id}`} 
            className="text-white hover:underline font-medium mb-2 block"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 400,
              color: '#FFFFFF',
              marginBottom: '8px',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            {album.artist.name}
          </Link>
          <div 
            className="flex items-center gap-2 text-sm text-spotify-text-gray"
            style={{
              gap: '8px',
              fontSize: '14px',
              lineHeight: '20px',
              color: '#B3B3B3'
            }}
          >
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

      {/* Track List - Exact Spotify Style */}
      <div 
        className="px-8 pb-8"
        style={{
          padding: '0 32px 32px 32px'
        }}
      >
        <div 
          className="bg-spotify-dark/30 backdrop-blur-sm rounded-lg overflow-hidden"
          style={{
            backgroundColor: 'rgba(18, 18, 18, 0.6)',
            backdropFilter: 'blur(4px)',
            borderRadius: '8px'
          }}
        >
          <div 
            className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 text-sm text-spotify-text-gray border-b border-white/10"
            style={{
              gap: '16px',
              padding: '8px 16px',
              fontSize: '11px',
              lineHeight: '16px',
              fontWeight: 400,
              color: '#B3B3B3',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ width: '32px', textAlign: 'center' }}>#</div>
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
              style={{
                gap: '16px',
                padding: '12px 16px',
                transition: 'background-color 200ms ease-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div 
                className="w-4 text-center text-spotify-text-gray group-hover:text-white"
                style={{
                  width: '32px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#B3B3B3',
                  transition: 'color 200ms ease-out'
                }}
              >
                {currentTrack?.id === track.id && isPlaying ? (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div 
                      className="w-1 h-1 bg-spotify-green rounded-full"
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#1DB954',
                        borderRadius: '50%'
                      }}
                    ></div>
                  </div>
                ) : (
                  index + 1
                )}
              </div>
              <div className="min-w-0">
                <div 
                  className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'}`}
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 400,
                    color: currentTrack?.id === track.id ? '#1DB954' : '#FFFFFF'
                  }}
                >
                  {track.name}
                </div>
              </div>
              <div 
                className="text-sm text-spotify-text-gray text-right"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#B3B3B3'
                }}
              >
                {formatDuration(track.duration)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
