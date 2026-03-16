'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getPathLocale } from '@/lib/i18n/runtime';
import { EASE_OUT_EXPO } from '@/lib/motion';
import type { GalleryPresentation } from '@/lib/galleryLayout';
import { PosterArtwork } from './PosterArtwork';

interface PosterStackProps {
  presentation: GalleryPresentation;
  priority?: boolean;
}

function getDeckIndexes(total: number, featuredIndex: number, depth: number) {
  if (total <= 1) return [featuredIndex];

  const nextIndex = (featuredIndex + 1) % total;
  const previousIndex = total === 2 ? nextIndex : (featuredIndex - 1 + total) % total;
  const deck = [featuredIndex, nextIndex, previousIndex];

  while (deck.length < depth) {
    deck.push(deck[deck.length - 1] ?? featuredIndex);
  }

  return deck.slice(0, depth);
}

function getLayerMotion(index: number, layers: GalleryPresentation['layers']) {
  if (index === 0) {
    return {
      rotate: 0,
      scale: 1,
      x: 0,
      y: 0,
      zIndex: 30,
    };
  }

  const transform = layers[index] ?? layers[layers.length - 1] ?? {
    rotate: 0,
    scale: 0.97,
    x: 0,
    y: 0,
  };

  return {
    rotate: transform.rotate,
    scale: transform.scale,
    x: transform.x,
    y: transform.y,
    zIndex: 30 - index,
  };
}

export function PosterStack({ presentation, priority = false }: PosterStackProps) {
  const { poster } = presentation;
  const images = poster.images;
  const pathname = usePathname();
  const locale = getPathLocale(pathname);

  if (images.length === 0) return null;

  const featuredImage = images[presentation.featuredIndex] ?? images[0];
  const detailHref = `/${locale}/poster/${poster.slug}`;
  const deckIndexes = getDeckIndexes(
    images.length,
    presentation.featuredIndex,
    presentation.stackDepth,
  );

  if (images.length === 1) {
    return (
      <motion.article
        layoutId={`poster-${poster.id}`}
        className="w-full"
      >
        <Link
          href={detailHref}
          className="gallery-poster-link"
          style={{ width: `${presentation.scale * 100}%` }}
        >
          <PosterArtwork image={featuredImage} priority={priority} />
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      layoutId={`poster-${poster.id}`}
      className="relative w-full"
    >
      <Link
        href={detailHref}
        className="gallery-poster-link"
        style={{ width: `${presentation.scale * 100}%` }}
      >
        <div
          className="gallery-poster-stack-frame"
          style={{ aspectRatio: `${featuredImage.width} / ${featuredImage.height}` }}
        >
          {deckIndexes.map((imageIndex, visibleIndex) => {
            const image = images[imageIndex] ?? images[images.length - 1] ?? featuredImage;

            return (
              <motion.div
                key={`${poster.id}-slot-${visibleIndex}`}
                className="gallery-poster-stack-layer"
                animate={getLayerMotion(visibleIndex, presentation.layers)}
                transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
              >
                <PosterArtwork
                  image={image}
                  mode="stack"
                  priority={priority && visibleIndex === 0}
                  style={{ width: '100%', height: '100%' }}
                />
              </motion.div>
            );
          })}
        </div>
      </Link>
    </motion.article>
  );
}
