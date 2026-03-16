'use client';

import { Suspense, useCallback } from 'react';
import { SentencePageFrame } from '@/components/layout/SentencePageFrame';
import { SentenceNav } from '@/components/nav/SentenceNav';
import { SentenceFooter } from '@/components/nav/SentenceFooter';
import { GalleryGrid } from './GalleryGrid';
import { ListView } from './ListView';
import { useNavSentence } from '@/hooks/useNavSentence';
import type { SupportedLocale } from '@/types';

interface GalleryPageProps {
  locale: SupportedLocale;
}

export function GalleryPage({ locale }: GalleryPageProps) {
  const { filters, updateFilter, filteredPosters } = useNavSentence();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <SentencePageFrame
      header={(
        <Suspense fallback={<div className="sentence-nav h-8" />}>
          <SentenceNav
            locale={locale}
            filters={filters}
            onFilterChange={updateFilter}
          />
        </Suspense>
      )}
      footer={(
        <Suspense fallback={<div className="sentence-nav h-8" />}>
          <SentenceFooter
            locale={locale}
            filters={filters}
            onFilterChange={updateFilter}
            onScrollTop={scrollToTop}
          />
        </Suspense>
      )}
    >
      <div className="site-shell pt-[var(--gallery-top-space)] pb-[var(--gallery-bottom-space)]">
        {filters.viewMode === 'gallery' ? (
          <GalleryGrid posters={filteredPosters} locale={locale} filters={filters} onFilterChange={updateFilter} />
        ) : (
          <ListView posters={filteredPosters} />
        )}
      </div>
    </SentencePageFrame>
  );
}
