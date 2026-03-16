'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SentencePageFrame } from '@/components/layout/SentencePageFrame';
import { ArticleView } from './ArticleView';
import type { ArticleFull, SupportedLocale } from '@/types';

interface ArticlePageProps {
  article: ArticleFull;
  locale: SupportedLocale;
}

export function ArticlePage({ article, locale }: ArticlePageProps) {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const backLabel = locale === 'ko' ? '저널로 돌아가기' : locale === 'ja' ? 'ジャーナルに戻る' : 'Back to journal';

  return (
    <SentencePageFrame
      header={(
          <nav className="sentence-nav" aria-label="Article navigation">
            <Link
              href={`/${currentLocale}/journal`}
              className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {backLabel}
            </Link>
            <span className="mx-[var(--space-sm)] text-[var(--color-text-muted)]">/</span>
            <span className="text-[var(--color-text)]">{article.title}</span>
          </nav>
      )}
      footer={(
          <footer className="sentence-nav text-[var(--color-text-muted)]">
            <span>
              Issue {String(article.issue.number).padStart(2, '0')} &middot; {article.issue.title}.{' '}
            </span>
            <button
              onClick={scrollToTop}
              className="cursor-pointer border-none bg-transparent p-0 font-inherit text-inherit"
              aria-label="Scroll to top"
            >
              &uarr;
            </button>
          </footer>
      )}
      mainClassName="pt-[var(--page-section-space)]"
    >
      <ArticleView article={article} />
    </SentencePageFrame>
  );
}
