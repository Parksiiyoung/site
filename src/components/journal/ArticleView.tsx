'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EASE_OUT_EXPO } from '@/lib/motion';
import type { ArticleFull, ArticleBody } from '@/types';

interface ArticleViewProps {
  article: ArticleFull;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function renderBodyBlock(block: ArticleBody, index: number) {
  switch (block.type) {
    case 'text':
      return (
        <motion.p
          key={index}
          className="text-base leading-[1.8] text-[var(--color-text)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.05 * index }}
        >
          {block.content}
        </motion.p>
      );

    case 'pullQuote':
      return (
        <motion.blockquote
          key={index}
          className="my-[var(--space-lg)] border-l-[3px] border-[var(--color-text)] py-[var(--space-xs)] pl-[var(--space-md)]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <p className="text-xl font-light italic leading-relaxed text-[var(--color-text)]">
            {block.content}
          </p>
          {block.attribution && (
            <footer className="mt-[var(--space-sm)] text-sm text-[var(--color-text-muted)]">
              &mdash; {block.attribution}
            </footer>
          )}
        </motion.blockquote>
      );

    case 'image':
      return (
        <motion.figure
          key={index}
          className="my-[var(--space-lg)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          {block.imageUrl && (
            <div
              className="relative w-full overflow-hidden bg-neutral-100"
              style={{
                aspectRatio:
                  block.imageWidth && block.imageHeight
                    ? `${block.imageWidth} / ${block.imageHeight}`
                    : '3 / 4',
                borderRadius: 'var(--card-radius)',
              }}
            >
              <Image
                src={block.imageUrl}
                alt={block.imageAlt ?? ''}
                fill
                sizes="(max-width: 768px) 100vw, 680px"
                className="object-cover"
              />
            </div>
          )}
          {block.caption && (
            <figcaption className="mt-[var(--space-sm)] text-center text-xs text-[var(--color-text-muted)]">
              {block.caption}
            </figcaption>
          )}
        </motion.figure>
      );

    case 'videoEmbed':
      return (
        <div
          key={index}
          className="my-[var(--space-lg)] aspect-video w-full overflow-hidden"
          style={{ borderRadius: 'var(--card-radius)' }}
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    default:
      return null;
  }
}

export function ArticleView({ article }: ArticleViewProps) {
  const issueNumber = String(article.issue.number).padStart(2, '0');

  return (
    <article className="mx-auto max-w-[680px] px-[var(--space-lg)]">
      {/* Header */}
      <header className="mb-[var(--space-xl)]">
        <p className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
          Issue {issueNumber} &middot; {article.issue.title}
        </p>
        <motion.h1
          className="mt-[var(--space-sm)] text-3xl font-medium leading-tight text-[var(--color-text)] md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          {article.title}
        </motion.h1>
        <p className="mt-[var(--space-sm)] text-sm text-[var(--color-text-muted)]">
          {article.author} &middot; {formatDate(article.publishedAt)}
        </p>
      </header>

      {/* Cover image */}
      <motion.div
        className="relative mb-[var(--space-xl)] aspect-[3/4] w-full overflow-hidden bg-neutral-100"
        style={{ borderRadius: 'var(--card-radius)' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 }}
      >
        <Image
          src={article.coverImage.url}
          alt={article.coverImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 680px"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Body blocks */}
      <div className="flex flex-col gap-[var(--space-md)]">
        {article.body.map((block, index) => renderBodyBlock(block, index))}
      </div>
    </article>
  );
}
