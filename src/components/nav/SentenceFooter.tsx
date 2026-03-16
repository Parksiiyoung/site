'use client';

import { useMemo, useState } from 'react';
import { sentenceTemplates } from '@/lib/i18n/sentences';
import type { NavFilterState, SupportedLocale, ViewMode } from '@/types';
import { SentenceBar, type SentenceSlotConfig } from './SentenceBar';
import { getMenuLabel, getMenuOptions, getUtilityLabel } from './sentenceUtils';

interface SentenceFooterProps {
  locale: SupportedLocale;
  filters: NavFilterState;
  onFilterChange: <K extends keyof NavFilterState>(key: K, value: NavFilterState[K]) => void;
  onScrollTop: () => void;
}

export function SentenceFooter({ locale: localeProp, filters, onFilterChange, onScrollTop }: SentenceFooterProps) {
  const locale: SupportedLocale = localeProp && sentenceTemplates['gallery-bottom'][localeProp] ? localeProp : 'en';
  const template = sentenceTemplates['gallery-bottom'][locale];
  const [sinceValue, setSinceValue] = useState('may-2006');

  const slots = useMemo<Record<string, SentenceSlotConfig>>(
    () => ({
      since: {
        value: sinceValue,
        label: getMenuLabel('since', sinceValue, locale),
        options: getMenuOptions('since', locale),
        onSelect: setSinceValue,
      },
      viewMode: {
        value: filters.viewMode,
        label: getMenuLabel('viewMode', filters.viewMode, locale),
        options: getMenuOptions('viewMode', locale),
        onSelect: (value) => onFilterChange('viewMode', value as ViewMode),
      },
      top: {
        display: 'paren',
        label: getUtilityLabel('top', locale),
        onPress: onScrollTop,
      },
    }),
    [filters.viewMode, locale, onFilterChange, onScrollTop, sinceValue],
  );

  return (
    <footer aria-label="Gallery utilities">
      <SentenceBar ariaLabel="Gallery utilities" slots={slots} template={template} />
    </footer>
  );
}
