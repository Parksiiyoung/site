import type { Poster, NavFilterState } from '@/types';

export const defaultFilterState: NavFilterState = {
  category: 'all',
  decade: '2020s',
  workType: 'designed',
  designer: 'Bitnaneun',
  viewMode: 'gallery',
};

export function filterPosters(posters: Poster[], filters: NavFilterState): Poster[] {
  return posters.filter((poster) => {
    if (filters.category !== 'all' && poster.category !== filters.category) {
      return false;
    }
    if (filters.decade !== 'all-time' && poster.decade !== filters.decade) {
      return false;
    }
    if (filters.workType !== poster.workType) {
      return false;
    }
    if (filters.designer !== 'everyone' && poster.designer !== filters.designer) {
      return false;
    }
    return true;
  });
}

/**
 * Simple deterministic hash for layout randomization.
 */
export function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}
