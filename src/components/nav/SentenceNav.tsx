'use client';

import { useMemo } from 'react';
import { sentenceTemplates } from '@/lib/i18n/sentences';
import type { NavFilterState, SupportedLocale } from '@/types';
import { SentenceBar, type SentenceSlotConfig } from './SentenceBar';
import { getMenuLabel, getMenuOptions } from './sentenceUtils';

interface SentenceNavProps {
  locale: SupportedLocale;
  filters: NavFilterState;
  onFilterChange: <K extends keyof NavFilterState>(key: K, value: NavFilterState[K]) => void;
}

export function SentenceNav({ locale: localeProp, filters, onFilterChange }: SentenceNavProps) {
  const locale: SupportedLocale = localeProp && sentenceTemplates['gallery-top'][localeProp] ? localeProp : 'en';
  const template = sentenceTemplates['gallery-top'][locale];

  const slots = useMemo<Record<string, SentenceSlotConfig>>(
    () => ({
      category: {
        value: filters.category,
        label: getMenuLabel('category', filters.category, locale),
        options: getMenuOptions('category', locale),
        onSelect: (value) => onFilterChange('category', value as NavFilterState['category']),
      },
      decade: {
        value: filters.decade,
        label: getMenuLabel('decade', filters.decade, locale),
        options: getMenuOptions('decade', locale),
        onSelect: (value) => onFilterChange('decade', value as NavFilterState['decade']),
      },
      workType: {
        value: filters.workType,
        label: getMenuLabel('workType', filters.workType, locale),
        options: getMenuOptions('workType', locale),
        onSelect: (value) => onFilterChange('workType', value as NavFilterState['workType']),
      },
      designer: {
        value: filters.designer,
        label: getMenuLabel('designer', filters.designer, locale),
        options: getMenuOptions('designer', locale),
        onSelect: (value) => onFilterChange('designer', value),
      },
    }),
    [filters.category, filters.decade, filters.designer, filters.workType, locale, onFilterChange],
  );

  return (
    <nav aria-label="Gallery filters">
      <SentenceBar ariaLabel="Gallery filters" slots={slots} template={template} />
    </nav>
  );
}
