import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { DownloadPage } from '@/components/gallery/DownloadPage';
import { resolveLocale } from '@/lib/i18n/runtime';

export default async function Download({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <DownloadPage locale={locale} />
    </Suspense>
  );
}
