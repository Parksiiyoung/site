import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { DownloadPage } from '@/components/gallery/DownloadPage';
import type { SupportedLocale } from '@/types';

export default async function Download({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <DownloadPage locale={locale as SupportedLocale} />
    </Suspense>
  );
}
