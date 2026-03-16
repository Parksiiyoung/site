'use client';

import { useCallback } from 'react';
import { SentencePageFrame } from '@/components/layout/SentencePageFrame';
import { SentenceNav } from '@/components/nav/SentenceNav';
import { SentenceFooter } from '@/components/nav/SentenceFooter';
import { DownloadSelector } from './DownloadSelector';
import { useNavSentence } from '@/hooks/useNavSentence';
import type { SupportedLocale } from '@/types';

interface DownloadPageProps {
  locale: SupportedLocale;
}

export function DownloadPage({ locale }: DownloadPageProps) {
  const { filters, updateFilter, filteredPosters } = useNavSentence();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <SentencePageFrame
      header={(
        <SentenceNav
          locale={locale}
          filters={filters}
          onFilterChange={updateFilter}
        />
      )}
      footer={(
        <SentenceFooter
          locale={locale}
          filters={filters}
          onFilterChange={updateFilter}
          onScrollTop={scrollToTop}
        />
      )}
    >
      <div className="site-shell py-[var(--page-section-space)]">
        <DownloadSelector posters={filteredPosters} />
      </div>
    </SentencePageFrame>
  );
}
