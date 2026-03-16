'use client';

import { useMemo, useState } from 'react';
import { sentenceTemplates } from '@/lib/i18n/sentences';
import type { Poster, ShareTarget, SupportedLocale } from '@/types';
import { SentenceBar, type SentenceSlotConfig } from './SentenceBar';
import { getMenuLabel, getMenuOptions, getUtilityLabel } from './sentenceUtils';

interface ContentSentenceFooterProps {
  poster: Poster;
  locale: SupportedLocale;
  onShare: (target: ShareTarget) => void;
  onScrollTop: () => void;
}

function formatPosterDate(poster: Poster) {
  return poster.month ? `${poster.month} ${poster.year}` : `${poster.year}`;
}

export function ContentSentenceFooter({ poster, locale: localeProp, onShare, onScrollTop }: ContentSentenceFooterProps) {
  const locale = localeProp && sentenceTemplates['content-bottom'][localeProp] ? localeProp : 'en';
  const template = sentenceTemplates['content-bottom'][locale];
  const [shareTarget, setShareTarget] = useState<ShareTarget>('instagram');

  const slots = useMemo<Record<string, SentenceSlotConfig>>(
    () => ({
      client: {
        label: poster.client || 'Bitnaneun',
      },
      date: {
        display: 'plain',
        label: formatPosterDate(poster),
      },
      shareTarget: {
        value: shareTarget,
        label: getMenuLabel('shareTarget', shareTarget, locale),
        options: getMenuOptions('shareTarget', locale),
        onSelect: (value) => {
          const target = value as ShareTarget;
          setShareTarget(target);
          onShare(target);
        },
      },
      top: {
        display: 'paren',
        label: getUtilityLabel('top', locale),
        onPress: onScrollTop,
      },
    }),
    [locale, onScrollTop, onShare, poster, shareTarget],
  );

  return (
    <footer aria-label="Poster utilities">
      <SentenceBar ariaLabel="Poster utilities" slots={slots} template={template} />
    </footer>
  );
}
