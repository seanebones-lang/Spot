'use client';

import { memo, useCallback } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Track } from '@/types/track';
import ImageWithFallback from './ImageWithFallback';
import PlayButton from './PlayButton';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface VirtualizedTrackListProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
  height?: number;
  currentTrackId?: string | null;
  isPlaying?: boolean;
  className?: string;
}

interface TrackRowData {
  tracks: Track[];
  onPlay: (track: Track) => void;
  currentTrackId?: string | null;
  isPlaying?: boolean;
}

const TrackRow = memo(({ index, style, data }: ListChildComponentProps<TrackRowData>) => {
  const { tracks, onPlay, currentTrackId, isPlaying } = data;
  const track = tracks[index];
  const isCurrentTrack = currentTrackId === track.id;

  const handleClick = useCallback(() => {
    onPlay(track);
  }, [track, onPlay]);

  return (
    <div
      style={style}
      className={cn(
        'flex items-center gap-3 px-4 py-2 hover:bg-white/10 rounded-lg cursor-pointer group',
        isCurrentTrack && 'bg-white/5'
      )}
      onClick={handleClick}
    >
      <div className="w-12 h-12 bg-spotify-light-gray rounded flex-shrink-0">
        <ImageWithFallback
          src={track.coverArt}
          alt={track.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            'font-medium truncate',
            isCurrentTrack ? 'text-spotify-green' : 'text-white'
          )}
        >
          {track.name}
        </div>
        <div className="text-sm text-spotify-text-gray truncate">
          {track.artist}
        </div>
      </div>
      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <PlayButton
          isPlaying={isCurrentTrack && !!isPlaying}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          size="sm"
        />
        <span className="text-xs text-spotify-text-gray w-12 text-right">
          {formatDuration(track.duration)}
        </span>
      </div>
    </div>
  );
});

TrackRow.displayName = 'TrackRow';

export const VirtualizedTrackList = memo(({
  tracks,
  onPlay,
  height = 500,
  currentTrackId,
  isPlaying,
  className,
}: VirtualizedTrackListProps) => {
  const itemData: TrackRowData = {
    tracks,
    onPlay,
    currentTrackId,
    isPlaying,
  };

  if (tracks.length === 0) {
    return (
      <div className={cn('flex items-center justify-center h-full text-spotify-text-gray', className)}>
        <p>No tracks available</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <AutoSizer>
        {({ height: autoHeight, width }) => (
          <FixedSizeList
            height={autoHeight}
            width={width}
            itemCount={tracks.length}
            itemSize={80}
            itemData={itemData}
            overscanCount={5}
          >
            {TrackRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
});

VirtualizedTrackList.displayName = 'VirtualizedTrackList';
