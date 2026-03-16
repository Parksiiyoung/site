import type { SupportedLocale } from '@/types';

export const locales: SupportedLocale[] = ['ko', 'en', 'ja'];
export const defaultLocale: SupportedLocale = 'en';

export const localeNames: Record<SupportedLocale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
};
