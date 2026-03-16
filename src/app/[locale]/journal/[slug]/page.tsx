import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { mockArticles, getArticleBySlug } from '@/lib/mock/journal';
import { ArticlePage } from '@/components/journal/ArticlePage';
import type { SupportedLocale } from '@/types';

export function generateStaticParams() {
  return mockArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ArticlePage article={article} locale={locale as SupportedLocale} />
    </Suspense>
  );
}
