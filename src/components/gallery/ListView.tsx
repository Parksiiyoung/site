'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Poster } from '@/types';

interface ListViewProps {
  posters: Poster[];
}

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

export function ListView({ posters }: ListViewProps) {
  if (posters.length === 0) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-[80px_1fr_1fr_80px] gap-4 border-b border-[var(--color-border)] pb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        <span />
        <span>Title</span>
        <span>Client</span>
        <span className="text-right">Year</span>
      </div>

      {/* Rows */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.03 }}
      >
        {posters.map((poster) => (
          <ListRow key={poster.id} poster={poster} />
        ))}
      </motion.div>
    </div>
  );
}

function ListRow({ poster }: { poster: Poster }) {
  const [isHovered, setIsHovered] = useState(false);
  const image = poster.images[0];
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <motion.div
      variants={rowVariants}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background poster image on hover */}
      {image && (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.15 : 0,
            borderRadius: 'var(--card-radius)',
          }}
        >
          <Image
            src={image.url}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
      )}

      <Link
        href={`/${locale}/poster/${poster.slug}`}
        className="relative z-10 grid grid-cols-[80px_1fr_1fr_80px] items-center gap-4 border-b border-[var(--color-border)] py-3 transition-colors hover:bg-[var(--color-selection)]"
      >
        {/* Thumbnail */}
        <div
          className="relative h-12 w-16 overflow-hidden bg-neutral-100"
          style={{ borderRadius: 'var(--card-radius)' }}
        >
          {image && (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          )}
        </div>

        {/* Title */}
        <span className="truncate text-sm font-medium">
          {poster.title}
          {poster.images.length > 1 && (
            <span className="ml-1 text-[var(--color-text-muted)]">
              ({poster.images.length})
            </span>
          )}
        </span>

        {/* Client */}
        <span className="truncate text-sm text-[var(--color-text-muted)]">
          {poster.client || '\u2014'}
        </span>

        {/* Year */}
        <span className="text-right text-sm text-[var(--color-text-muted)]">
          {poster.year}
        </span>
      </Link>
    </motion.div>
  );
}
