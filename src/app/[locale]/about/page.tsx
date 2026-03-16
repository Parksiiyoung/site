import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutPage } from '@/components/about/AboutPage';
import { resolveLocale } from '@/lib/i18n/runtime';

export const metadata: Metadata = {
  title: 'About — Bitnaneun',
  description: "We've been making posters since May 2006.",
};

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  setRequestLocale(locale);
  return <AboutPage locale={locale} />;
}
