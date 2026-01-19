/**
 * React Performance Optimization Utilities
 * Provides patterns for React.memo, useMemo, useCallback optimization
 *
 * High-Priority Components for Memoization:
 * - Player, TopBar, Sidebar (render frequently on state changes)
 * - MoodSelector, TrackCard, PlaylistCard (render in lists)
 * - AudioVisualizer (computationally expensive)
 * - Equalizer (renders on every frequency update)
 */

import React, { useMemo, useCallback, ComponentType, ReactNode } from 'react';

/**
 * Custom hook for expensive computations
 * Prevents recalculation on every render
 *
 * Usage:
 * const stats = useExpensiveComputation(tracks, (t) => t.length > 100);
 */
export function useExpensiveComputation<T, R>(
  data: T[],
  computeFn: (data: T[]) => R,
  deps: React.DependencyList
): R {
  return useMemo(() => computeFn(data), [data, ...deps]);
}

/**
 * Memoized callback wrapper
 * Use for event handlers passed to memoized children
 *
 * Usage:
 * const handleClick = useMemoizedCallback(() => {
 *   playTrack(trackId);
 * }, [trackId]);
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps) as T;
}

/**
 * Performance monitoring hook
 * Logs component render times for debugging
 *
 * Usage:
 * useRenderMetrics('PlayerComponent', 50); // Alert if >50ms
 */
export function useRenderMetrics(componentName: string, threshold: number = 100) {
  const renderStart = React.useRef(Date.now());

  React.useEffect(() => {
    const renderTime = Date.now() - renderStart.current;
    if (renderTime > threshold) {
      console.warn(
        `Slow render: ${componentName} took ${renderTime}ms (threshold: ${threshold}ms)`
      );
    }
  });
}

/**
 * Memoization configuration for high-frequency components
 * Prevents re-renders when props haven't changed (shallowEqual)
 */
export const MEMOIZATION_CONFIG = {
  // Audio player (updates on every playback state change)
  PLAYER: {
    displayName: 'MemoizedPlayer',
    shouldUpdate: (prevProps: any, nextProps: any) =>
      prevProps.trackId !== nextProps.trackId ||
      prevProps.isPlaying !== nextProps.isPlaying ||
      prevProps.volume !== nextProps.volume,
  },

  // Top navigation bar
  TOPBAR: {
    displayName: 'MemoizedTopBar',
    shouldUpdate: (prevProps: any, nextProps: any) =>
      prevProps.user?.id !== nextProps.user?.id ||
      prevProps.searchQuery !== nextProps.searchQuery,
  },

  // Sidebar navigation
  SIDEBAR: {
    displayName: 'MemoizedSidebar',
    shouldUpdate: (prevProps: any, nextProps: any) =>
      prevProps.playlists?.length !== nextProps.playlists?.length ||
      prevProps.currentPage !== nextProps.currentPage,
  },

  // Audio visualizer (computationally expensive)
  VISUALIZER: {
    displayName: 'MemoizedVisualizer',
    shouldUpdate: (prevProps: any, nextProps: any) =>
      prevProps.isActive !== nextProps.isActive,
  },

  // Equalizer display
  EQUALIZER: {
    displayName: 'MemoizedEqualizer',
    shouldUpdate: (prevProps: any, nextProps: any) =>
      prevProps.bands !== nextProps.bands ||
      prevProps.preset !== nextProps.preset,
  },

  // Track card in lists
  TRACK_CARD: {
    displayName: 'MemoizedTrackCard',
    shouldUpdate: (prevProps: any, nextProps: any) =>
      prevProps.track?.id !== nextProps.track?.id ||
      prevProps.isSelected !== nextProps.isSelected,
  },

  // Playlist card
  PLAYLIST_CARD: {
    displayName: 'MemoizedPlaylistCard',
    shouldUpdate: (prevProps: any, nextProps: any) =>
      prevProps.playlist?.id !== nextProps.playlist?.id,
  },

  // Mood selector
  MOOD_SELECTOR: {
    displayName: 'MemoizedMoodSelector',
    shouldUpdate: (prevProps: any, nextProps: any) =>
      JSON.stringify(prevProps.selectedMoods) !== JSON.stringify(nextProps.selectedMoods),
  },
};

/**
 * Memoize a component with custom comparison function
 *
 * Usage:
 * export default withMemoization(PlayerComponent, MEMOIZATION_CONFIG.PLAYER.shouldUpdate);
 */
export function withMemoization<P extends object>(
  Component: ComponentType<P>,
  arePropsEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
) {
  const MemoizedComponent = React.memo(
    Component,
    arePropsEqual ? (prev, next) => !arePropsEqual(prev, next) : undefined
  );

  MemoizedComponent.displayName = `Memoized(${Component.displayName || Component.name})`;

  return MemoizedComponent;
}

/**
 * Lazy load expensive components
 * Reduces initial bundle and renders components only when needed
 *
 * Usage:
 * const EqualizePanel = withLazyLoading(() => import('@/components/Equalizer'));
 */
export function withLazyLoading<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>
) {
  const Component = React.lazy(importFn);

  return (props: P) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
}

/**
 * List virtualization helper
 * Renders only visible items in large lists for performance
 *
 * Note: In production, use react-window or react-virtualized
 * This is a basic example of the pattern
 */
export interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / itemHeight));
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
    >
      <div style={{ height: items.length * itemHeight }}>
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {visibleItems.map((item, i) => (
            <div key={startIndex + i}>{renderItem(item, startIndex + i)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Debounce hook for search, resize, scroll events
 * Prevents excessive re-renders
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Throttle hook for high-frequency events (scroll, resize)
 */
export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = React.useState<T>(value);
  const lastUpdated = React.useRef(Date.now());

  React.useEffect(() => {
    const now = Date.now();

    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
      }, interval - (now - lastUpdated.current));

      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttledValue;
}

/**
 * Hook for tracking previous prop/state
 * Useful for detecting changes
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
