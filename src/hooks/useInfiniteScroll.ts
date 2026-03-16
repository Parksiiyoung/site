'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

const PAGE_SIZE = 20;

/**
 * Hook for intersection-observer-based infinite scroll.
 * Returns the current visible slice and a ref to attach to the sentinel element.
 */
export function useInfiniteScroll<T>(items: T[], pageSize: number = PAGE_SIZE) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const setSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!node) {
        sentinelRef.current = null;
        return;
      }

      sentinelRef.current = node;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setVisibleCount((prev) => Math.min(prev + pageSize, items.length));
          }
        },
        { rootMargin: '400px' },
      );

      observerRef.current.observe(node);
    },
    [items.length, pageSize],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { visibleItems, hasMore, sentinelRef: setSentinelRef };
}
