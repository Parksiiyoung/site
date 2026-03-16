'use client';

import { useMemo } from 'react';
import { sentenceTemplates } from '@/lib/i18n/sentences';
import type { Poster, SupportedLocale } from '@/types';
import { SentenceBar, type SentenceSlotConfig } from './SentenceBar';
import { getContentCategoryLabel, getMenuLabel } from './sentenceUtils';

interface ContentSentenceNavProps {
  poster: Poster;
  locale: SupportedLocale;
}

export function ContentSentenceNav({ poster, locale: localeProp }: ContentSentenceNavProps) {
  const locale = localeProp && sentenceTemplates['content-top'][localeProp] ? localeProp : 'en';
  const template = sentenceTemplates['content-top'][locale];

  const slots = useMemo<Record<string, SentenceSlotConfig>>(
    () => ({
      title: {
        display: 'plain',
        label: poster.title,
        tone: 'emphasis',
      },
      category: {
        label: getContentCategoryLabel(poster.category, locale),
      },
      decade: {
        label: getMenuLabel('decade', poster.decade, locale),
      },
      workType: {
        label: getMenuLabel('workType', poster.workType, locale),
      },
      designer: {
        label: getMenuLabel('designer', poster.designer, locale),
      },
    }),
    [locale, poster.category, poster.decade, poster.designer, poster.title, poster.workType],
  );

  return (
    <nav aria-label="Poster context">
      <SentenceBar ariaLabel="Poster context" slots={slots} template={template} />
    </nav>
  );
}
