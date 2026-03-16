import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { mockArticles, getArticleBySlug } from '@/lib/mock/journal';
import { ArticlePage } from '@/components/journal/ArticlePage';
import { resolveLocale } from '@/lib/i18n/runtime';

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
  const { locale: routeLocale, slug } = await params;
  const locale = resolveLocale(routeLocale);
  setRequestLocale(locale);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ArticlePage article={article} />
    </Suspense>
  );
}
