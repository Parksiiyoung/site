import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter, Sofia_Sans_Extra_Condensed } from 'next/font/google';
import { locales } from '@/lib/i18n/config';
import { resolveLocale } from '@/lib/i18n/runtime';
import { PageTransition } from '@/components/ui/PageTransition';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sofiaSansExtraCondensed = Sofia_Sans_Extra_Condensed({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Bitnaneun',
    template: '%s | Bitnaneun',
  },
  description: "We've been making posters since May 2006. A Korean movie poster design studio.",
  keywords: ['movie poster', 'poster design', 'Korean design', 'bitnaneun', 'film poster'],
  authors: [{ name: 'Bitnaneun Studio' }],
  openGraph: {
    siteName: 'Bitnaneun',
    type: 'website',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const headlineVar = '--font-headline' as const;
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  setRequestLocale(locale);
  const messages = await getMessages();
  const htmlStyle = {
    [headlineVar]: sofiaSansExtraCondensed.style.fontFamily,
  } as CSSProperties;

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${sofiaSansExtraCondensed.variable}`}
      style={htmlStyle}
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <NextIntlClientProvider messages={messages}>
          <PageTransition>{children}</PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
