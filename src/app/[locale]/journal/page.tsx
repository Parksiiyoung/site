import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import type { SupportedLocale } from '@/types';
import { JournalPage } from '@/components/journal/JournalPage';

export default async function JournalRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<JournalFallback />}>
      <JournalPage locale={locale as SupportedLocale} />
    </Suspense>
  );
}

function JournalFallback() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1920px] px-[var(--space-lg)] py-[var(--space-md)]">
          <div className="sentence-nav h-8 animate-pulse rounded bg-neutral-100" />
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-[1920px] px-[var(--space-lg)] py-[var(--space-lg)]">
          <div className="flex flex-col gap-[var(--space-lg)]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-[var(--space-md)]">
                <div className="aspect-[3/4] w-[160px] shrink-0 animate-pulse rounded bg-neutral-100" />
                <div className="flex flex-1 flex-col gap-[var(--space-sm)] py-[var(--space-xs)]">
                  <div className="h-3 w-24 animate-pulse rounded bg-neutral-100" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-neutral-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
