import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter, Noto_Sans_KR, Noto_Sans_JP, Sofia_Sans_Extra_Condensed } from 'next/font/google';
import { locales } from '@/lib/i18n/config';
import { PageTransition } from '@/components/ui/PageTransition';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-kr',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-jp',
  weight: ['400', '500', '700'],
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
    default: 'Bitnaneun — 빛나는',
    template: '%s | Bitnaneun',
  },
  description: "We've been making posters since May 2006. A Korean movie poster design studio.",
  keywords: ['movie poster', 'poster design', 'Korean design', '빛나는', 'bitnaneun', 'film poster'],
  authors: [{ name: 'Bitnaneun Studio' }],
  openGraph: {
    siteName: 'Bitnaneun — 빛나는',
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
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const htmlStyle = {
    [headlineVar]: sofiaSansExtraCondensed.style.fontFamily,
  } as CSSProperties;

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${notoSansKR.variable} ${notoSansJP.variable} ${sofiaSansExtraCondensed.variable}`}
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
