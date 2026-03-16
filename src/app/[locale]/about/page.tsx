import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutPage } from '@/components/about/AboutPage';
import type { SupportedLocale } from '@/types';

export const metadata: Metadata = {
  title: 'About — Bitnaneun',
  description: "We've been making posters since May 2006.",
};

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPage locale={locale as SupportedLocale} />;
}
