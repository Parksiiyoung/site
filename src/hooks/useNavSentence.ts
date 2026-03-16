'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { NavFilterState, CategoryKey, Decade, WorkType, ViewMode } from '@/types';
import { defaultFilterState, filterPosters } from '@/lib/filters';
import { mockPosters } from '@/lib/mock/posters';

export function useNavSentence() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialRender = useRef(true);

  const [filters, setFilters] = useState<NavFilterState>(() => ({
    category: (searchParams.get('category') as CategoryKey) || defaultFilterState.category,
    decade: (searchParams.get('decade') as Decade) || defaultFilterState.decade,
    workType: (searchParams.get('workType') as WorkType) || defaultFilterState.workType,
    designer: searchParams.get('designer') || defaultFilterState.designer,
    viewMode: (searchParams.get('view') as ViewMode) || defaultFilterState.viewMode,
  }));

  // Sync filters to URL (skip initial render)
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (filters.category !== defaultFilterState.category) params.set('category', filters.category);
    if (filters.decade !== defaultFilterState.decade) params.set('decade', filters.decade);
    if (filters.workType !== defaultFilterState.workType) params.set('workType', filters.workType);
    if (filters.designer !== defaultFilterState.designer) params.set('designer', filters.designer);
    if (filters.viewMode !== defaultFilterState.viewMode) params.set('view', filters.viewMode);

    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  }, [filters, router, pathname]);

  const updateFilter = useCallback(<K extends keyof NavFilterState>(
    key: K,
    value: NavFilterState[K],
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const filteredPosters = useMemo(
    () => filterPosters(mockPosters, filters),
    [filters],
  );

  return { filters, updateFilter, filteredPosters };
}
