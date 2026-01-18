/**
 * Performance Utilities
 * 
 * Helper functions and hooks for performance optimization:
 * - Lazy loading utilities
 * - Memoization helpers
 * - Virtualization helpers
 * - Performance monitoring
 */

import React, { useMemo, useCallback, useRef, useEffect } from 'react';

/**
 * Lazy load component with loading state
 */
export function lazyLoad<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    fallback?: React.ReactNode;
    delay?: number;
  } = {}
) {
  const { fallback = null, delay = 200 } = options;

  const LazyComponent = React.lazy(() => {
    if (delay > 0) {
      return new Promise<{ default: T }>((resolve) => {
        setTimeout(() => {
          resolve(importFn());
        }, delay);
      });
    }
    return importFn();
  });

  function LazyWrapper(props: React.ComponentPropsWithoutRef<T>) {
    return React.createElement(
      React.Suspense,
      { fallback },
      React.createElement(LazyComponent, props)
    );
  }

  LazyWrapper.displayName = 'LazyWrapper';
  
  return LazyWrapper;
}

/**
 * Memoize expensive calculations
 */
export function useMemoized<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}

/**
 * Stable callback reference (prevents unnecessary re-renders)
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    ((...args: any[]) => callbackRef.current(...args)) as T,
    []
  );
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Intersection Observer hook for lazy loading images/content
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return { elementRef, isIntersecting };
}

/**
 * Virtualized list helper - calculate visible range
 */
export function calculateVisibleRange(
  scrollTop: number,
  containerHeight: number,
  itemHeight: number,
  totalItems: number,
  overscan: number = 3
) {
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - overscan
  );
  const endIndex = Math.min(
    totalItems - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  return { startIndex, endIndex };
}

/**
 * Performance monitoring - Measure render time
 */
export function useRenderTime(componentName?: string) {
  const renderStartRef = useRef<number>(0);

  useEffect(() => {
    renderStartRef.current = performance.now();

    return () => {
      const renderTime = performance.now() - renderStartRef.current;
      if (componentName && renderTime > 16) {
        // Warn if render takes longer than one frame (16ms)
        console.warn(
          `[Performance] ${componentName} took ${renderTime.toFixed(2)}ms to render`
        );
      }
    };
  });
}

/**
 * Prevent unnecessary re-renders with shallow comparison
 */
export function shallowEqual<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      !Object.is((objA as any)[key], (objB as any)[key])
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Batch state updates for performance
 */
export function useBatchedUpdates() {
  const updatesRef = useRef<(() => void)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const batch = useCallback((update: () => void) => {
    updatesRef.current.push(update);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updatesRef.current.forEach((update) => update());
      updatesRef.current = [];
    }, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return batch;
}

/**
 * Image lazy loading with placeholder
 */
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = React.useState<string>(placeholder || '');
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };

    img.onerror = () => {
      // Fallback to placeholder on error
      if (placeholder) {
        setImageSrc(placeholder);
      }
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholder]);

  return { imageSrc, isLoaded };
}

/**
 * Code splitting helper - Load module on demand
 */
export async function loadModule<T>(
  importFn: () => Promise<T>,
  timeout: number = 5000
): Promise<T> {
  return Promise.race([
    importFn(),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Module load timeout')), timeout)
    ),
  ]);
}
