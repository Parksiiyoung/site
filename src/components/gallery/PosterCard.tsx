'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { GalleryPresentation } from '@/lib/galleryLayout';
import { PosterArtwork } from './PosterArtwork';

interface PosterCardProps {
  presentation: GalleryPresentation;
  priority?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

export function PosterCard({ presentation, priority = false }: PosterCardProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const { poster } = presentation;
  const image = poster.images[presentation.featuredIndex] ?? poster.images[0];
  if (!image) return null;

  return (
    <motion.article
      layoutId={`poster-${poster.id}`}
      variants={itemVariants}
      className="w-full"
    >
      <Link
        href={`/${locale}/poster/${poster.slug}`}
        className="gallery-poster-link"
        style={{ width: `${presentation.scale * 100}%` }}
      >
        <PosterArtwork image={image} priority={priority} />
      </Link>
    </motion.article>
  );
}
