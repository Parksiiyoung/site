'use client';

import { useCallback } from 'react';
import { SentencePageFrame } from '@/components/layout/SentencePageFrame';
import { ContentSentenceNav } from '@/components/nav/ContentSentenceNav';
import { ContentSentenceFooter } from '@/components/nav/ContentSentenceFooter';
import { share } from '@/lib/share';
import { PosterDetail } from './PosterDetail';
import type { Poster, SupportedLocale, ShareTarget } from '@/types';

interface PosterDetailPageProps {
  poster: Poster;
  relatedPosters: Poster[];
  locale: SupportedLocale;
}

export function PosterDetailPage({ poster, relatedPosters, locale }: PosterDetailPageProps) {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleShare = useCallback((target: ShareTarget) => {
    void share(target, {
      url: window.location.href,
      text: `${poster.title} — Bitnaneun`,
      image: poster.images[0]?.url ?? '',
    });
  }, [poster]);

  return (
    <SentencePageFrame
      header={(
        <ContentSentenceNav
          poster={poster}
          locale={locale}
        />
      )}
      footer={(
        <ContentSentenceFooter
          poster={poster}
          locale={locale}
          onShare={handleShare}
          onScrollTop={scrollToTop}
        />
      )}
      mainClassName="pt-[var(--page-section-space)]"
    >
      <PosterDetail
        poster={poster}
        relatedPosters={relatedPosters}
        locale={locale}
      />
    </SentencePageFrame>
  );
}
