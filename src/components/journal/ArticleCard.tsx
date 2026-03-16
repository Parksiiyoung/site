'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EASE_OUT_EXPO } from '@/lib/motion';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function extractExcerpt(article: Article): string {
  // ArticleFull has body, but we type this as Article for flexibility.
  // If body exists, extract from first text block.
  const fullArticle = article as Article & { body?: Array<{ type: string; content: string }> };
  if (fullArticle.body) {
    const firstTextBlock = fullArticle.body.find((block) => block.type === 'text');
    if (firstTextBlock) {
      return firstTextBlock.content.slice(0, 140) + '...';
    }
  }
  return '';
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const excerpt = extractExcerpt(article);

  return (
    <motion.article
      className="group"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
    >
      <Link
        href={`/${locale}/journal/${article.slug}`}
        className="flex gap-[var(--space-md)] no-underline"
      >
        {/* Thumbnail */}
        <div
          className="relative shrink-0 overflow-hidden bg-neutral-100"
          style={{
            width: '160px',
            aspectRatio: '3 / 4',
            borderRadius: 'var(--card-radius)',
          }}
        >
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
            priority={priority}
          />
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col justify-center py-[var(--space-xs)]">
          <p className="text-xs text-[var(--color-text-muted)]">
            Issue {String(article.issue.number).padStart(2, '0')} &middot; {formatDate(article.publishedAt)}
          </p>
          <h3 className="mt-[var(--space-xs)] text-lg font-medium leading-tight text-[var(--color-text)]">
            {article.title}
          </h3>
          {excerpt && (
            <p className="mt-[var(--space-xs)] line-clamp-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {excerpt}
            </p>
          )}
          <p className="mt-[var(--space-sm)] text-xs text-[var(--color-text-muted)]">
            {article.author}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
