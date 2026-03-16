'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PosterCard } from './PosterCard';
import { HomepageDesktopCollage } from './HomepageDesktopCollage';
import { PosterStack } from './PosterStack';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { calculateGalleryPresentation } from '@/lib/galleryLayout';
import type { Poster, SupportedLocale, NavFilterState } from '@/types';
import { sentenceTemplates, menuLabels } from '@/lib/i18n/sentences';

interface GalleryGridProps {
  filters?: NavFilterState;
  posters: Poster[];
  locale: SupportedLocale;
  onFilterChange?: <K extends keyof NavFilterState>(key: K, value: NavFilterState[K]) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

function shouldUseHomepageCollage(filters?: NavFilterState) {
  if (!filters) return false;

  return filters.category === 'all'
    && filters.decade === '2020s'
    && filters.workType === 'designed'
    && filters.designer === 'Bitnaneun'
    && filters.viewMode === 'gallery';
}

export function GalleryGrid({ posters, locale, filters, onFilterChange }: GalleryGridProps) {
  if (posters.length === 0) {
    return <EmptyState filters={filters} locale={locale} onFilterChange={onFilterChange} />;
  }

  if (shouldUseHomepageCollage(filters)) {
    return (
      <>
        <div className="homepage-collage-desktop-only">
          <HomepageDesktopCollage posters={posters} locale={locale} />
        </div>
        <div className="homepage-collage-mobile-only">
          <GalleryGridContent key={posters.map((poster) => poster.id).join('|')} posters={posters} />
        </div>
      </>
    );
  }

  const gridKey = posters.map((poster) => poster.id).join('|');

  return <GalleryGridContent key={gridKey} posters={posters} />;
}

function GalleryGridContent({ posters }: { posters: Poster[] }) {
  const presentations = useMemo(() => calculateGalleryPresentation(posters), [posters]);
  const { visibleItems, hasMore, sentinelRef } = useInfiniteScroll(presentations, 20);

  return (
    <>
      <motion.div
        className="gallery-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((presentation, index) => (
            <motion.div
              key={presentation.poster.id}
              variants={itemVariants}
              layout
              className={`gallery-grid-cell gallery-grid-cell--${presentation.align}`}
            >
              {presentation.poster.images.length > 1 && presentation.poster.groupId ? (
                <PosterStack
                  presentation={presentation}
                  priority={index < 4}
                />
              ) : (
                <PosterCard
                  presentation={presentation}
                  priority={index < 4}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
      )}
    </>
  );
}

function EmptyState({
  filters,
  locale,
  onFilterChange,
}: {
  filters?: NavFilterState;
  locale: SupportedLocale;
  onFilterChange?: <K extends keyof NavFilterState>(key: K, value: NavFilterState[K]) => void;
}) {
  const template = sentenceTemplates.empty[locale];
  const currentCategory = filters?.category ?? 'all';
  const currentDecade = filters?.decade ?? 'all-time';

  const regex = /\{(\w+)\}/g;
  const pieces: Array<{ type: 'text'; text: string } | { type: 'slot'; name: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      pieces.push({ type: 'text', text: template.slice(lastIndex, match.index) });
    }
    pieces.push({ type: 'slot', name: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < template.length) {
    pieces.push({ type: 'text', text: template.slice(lastIndex) });
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="sentence-nav text-center text-[var(--color-text-muted)]">
        {pieces.map((piece, i) => {
          if (piece.type === 'text') return <span key={i}>{piece.text}</span>;

          if (piece.name === 'category') {
            return <span key={i}>{menuLabels.category[currentCategory][locale]}</span>;
          }

          if (piece.name === 'decade') {
            return <span key={i}>{menuLabels.decade[currentDecade][locale]}</span>;
          }

          if (piece.name === 'resetCategory') {
            return (
              <button
                key={i}
                onClick={() => onFilterChange?.('category', 'all')}
                className="cursor-pointer border-none bg-transparent p-0 font-inherit text-inherit underline transition-colors hover:text-[var(--color-text)]"
              >
                {menuLabels.category.all[locale]}
              </button>
            );
          }

          if (piece.name === 'resetDecade') {
            return (
              <button
                key={i}
                onClick={() => onFilterChange?.('decade', 'all-time')}
                className="cursor-pointer border-none bg-transparent p-0 font-inherit text-inherit underline transition-colors hover:text-[var(--color-text)]"
              >
                {menuLabels.decade['all-time'][locale]}
              </button>
            );
          }

          return <span key={i}>{piece.name}</span>;
        })}
      </p>
    </div>
  );
}
