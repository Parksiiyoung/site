'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Poster, SupportedLocale } from '@/types';
import { EASE_OUT_EXPO } from '@/lib/motion';

interface RelatedWorksProps {
  posters: Poster[];
  locale: SupportedLocale;
}

export function RelatedWorks({ posters, locale }: RelatedWorksProps) {
  if (posters.length === 0) return null;

  return (
    <section>
      <h2 className="mb-[var(--space-lg)] text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        Related Works
      </h2>
      <div className="grid grid-cols-2 gap-[var(--space-md)] sm:grid-cols-3 md:grid-cols-4">
        {posters.slice(0, 4).map((poster, i) => {
          const img = poster.images[0];
          if (!img) return null;

          return (
            <motion.div
              key={poster.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              <Link
                href={`/${locale}/poster/${poster.slug}`}
                className="group block"
              >
                <div
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
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-2 text-sm">{poster.title}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{poster.year}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
