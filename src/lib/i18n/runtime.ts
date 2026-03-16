import type { SupportedLocale } from '@/types';
import { defaultLocale } from '@/lib/i18n/config';

const LOCALE_PREFIX = /^\/(ko|en|ja)(?=\/|$)/;

export function resolveLocale(_locale?: string | null): SupportedLocale {
  void _locale;
  return defaultLocale;
}

export function getPathLocale(pathname?: string | null): SupportedLocale {
  const localeSegment = pathname?.split('/')[1];
  return resolveLocale(localeSegment);
}

export function toDefaultLocalePath(pathname: string): string {
  if (pathname === '/') {
    return `/${defaultLocale}`;
  }

  const strippedPath = pathname.replace(LOCALE_PREFIX, '');

  return `/${defaultLocale}${strippedPath || ''}`;
}
