import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '@/lib/i18n/config';
import type { SupportedLocale } from '@/types';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as SupportedLocale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: {},
  };
});
