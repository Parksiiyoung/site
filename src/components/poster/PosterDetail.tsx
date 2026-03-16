'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Poster, SupportedLocale } from '@/types';
import { RelatedWorks } from './RelatedWorks';
import { EASE_OUT_EXPO } from '@/lib/motion';

interface PosterDetailProps {
  poster: Poster;
  relatedPosters: Poster[];
  locale: SupportedLocale;
}

const imageVariants = {
  initial: { opacity: 0, scale: 1.05, filter: 'blur(20px)' },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export function PosterDetail({ poster, relatedPosters, locale }: PosterDetailProps) {
  const mainImage = poster.images[0];
  if (!mainImage) return null;

  return (
    <div className="mx-auto flex w-full max-w-[var(--detail-max-width)] flex-col gap-[var(--detail-section-gap)] px-[var(--layout-gutter)]">
      {/* Main poster image */}
      <motion.div
        layoutId={`poster-${poster.id}`}
        className="relative mx-auto w-full"
        style={{ aspectRatio: mainImage.width / mainImage.height }}
      >
        <motion.div
          variants={imageVariants}
          initial="initial"
          animate="animate"
          className="relative h-full w-full"
        >
          <Image
            src={mainImage.url}
            alt={mainImage.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Additional images */}
      {poster.images.length > 1 && (
        <div className="grid grid-cols-1 gap-[var(--detail-image-gap)] md:grid-cols-2">
          {poster.images.slice(1).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: EASE_OUT_EXPO }}
              className="relative overflow-hidden bg-neutral-100"
              style={{
                aspectRatio: img.width / img.height,
                borderRadius: 'var(--card-radius)',
              }}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 250px"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Poster info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="border-t border-[var(--color-border)] pt-[var(--space-lg)]"
      >
        <div className="max-w-[720px]">
          <h1 className="text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-none">{poster.title}</h1>
          <div className="mt-[var(--space-sm)] space-y-1 text-sm text-[var(--color-text-muted)]">
            {poster.client && <p>{poster.client}</p>}
            <p>{poster.month ? `${poster.month} ` : ''}{poster.year}</p>
            <p>{poster.designer}</p>
          </div>
          {poster.description && (
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--color-text-muted)]">
              {poster.description}
            </p>
          )}
        </div>
      </motion.div>

      {/* Related works */}
      {relatedPosters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: EASE_OUT_EXPO }}
          className="mt-[var(--space-2xl)]"
        >
          <RelatedWorks posters={relatedPosters} locale={locale} />
        </motion.div>
      )}
    </div>
  );
}
