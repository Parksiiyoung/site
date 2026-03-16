import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { mockPosters } from '@/lib/mock/posters';
import { PosterDetailPage } from '@/components/poster/PosterDetailPage';
import { resolveLocale } from '@/lib/i18n/runtime';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale, slug } = await params;
  const locale = resolveLocale(routeLocale);
  const poster = mockPosters.find((p) => p.slug === slug);
  if (!poster) return {};

  const image = poster.images[0];
  return {
    title: `${poster.title} — Bitnaneun`,
    description: `${poster.title} poster by ${poster.designer}, ${poster.year}`,
    openGraph: {
      title: `${poster.title} — Bitnaneun`,
      description: `${poster.title} poster by ${poster.designer}, ${poster.year}`,
      images: image
        ? [{ url: image.url, width: image.width, height: image.height, alt: image.alt }]
        : [],
      locale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${poster.title} — Bitnaneun`,
      images: image ? [image.url] : [],
    },
  };
}

export function generateStaticParams() {
  return mockPosters.map((poster) => ({
    slug: poster.slug,
  }));
}

export default async function PosterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: routeLocale, slug } = await params;
  const locale = resolveLocale(routeLocale);
  setRequestLocale(locale);

  const poster = mockPosters.find((p) => p.slug === slug);
  if (!poster) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PosterDetailPage
        poster={poster}
        locale={locale}
      />
    </Suspense>
  );
}
