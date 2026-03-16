import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { resolveLocale } from '@/lib/i18n/runtime';
import { GalleryPage } from '@/components/gallery/GalleryPage';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  setRequestLocale(locale);

  return (
    <Suspense fallback={<GalleryFallback />}>
      <GalleryPage locale={locale} />
    </Suspense>
  );
}

function GalleryFallback() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1920px] px-[var(--space-lg)] py-[var(--space-md)]">
          <div className="sentence-nav h-8 animate-pulse rounded bg-neutral-100" />
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-[1920px] px-[var(--space-lg)] py-[var(--space-lg)]">
          <div className="grid grid-cols-12 gap-[var(--gallery-gap)]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="col-span-4 aspect-[3/4] animate-pulse rounded bg-neutral-100"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
