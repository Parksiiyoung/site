import { contentCategoryLabels, menuLabels, utilityLabels } from '@/lib/i18n/sentences';
import type { CategoryKey, MenuSlotOption, SupportedLocale } from '@/types';

export type SentencePart =
  | { type: 'text'; text: string }
  | { type: 'slot'; name: string };

export function parseSentenceTemplate(template: string): SentencePart[] {
  const regex = /\{(\w+)\}/g;
  const pieces: SentencePart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      pieces.push({ type: 'text', text: template.slice(lastIndex, match.index) });
    }
    pieces.push({ type: 'slot', name: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < template.length) {
    pieces.push({ type: 'text', text: template.slice(lastIndex) });
  }

  return pieces;
}

export function splitSentenceTemplate(template: string) {
  const [leftTemplate = '', rightTemplate = ''] = template.split('|');

  return {
    leftParts: parseSentenceTemplate(leftTemplate),
    rightParts: parseSentenceTemplate(rightTemplate),
  };
}

export function getMenuLabel(slotName: string, value: string, locale: SupportedLocale): string {
  return menuLabels[slotName]?.[value]?.[locale] ?? value;
}

export function getMenuOptions(
  slotName: string,
  locale: SupportedLocale,
  excludeValue?: string,
): MenuSlotOption[] {
  const labels = menuLabels[slotName];
  if (!labels) return [];

  return Object.entries(labels)
    .filter(([value]) => value !== excludeValue)
    .map(([value, localeLabels]) => ({
      value,
      label: localeLabels[locale],
    }));
}

export function getContentCategoryLabel(category: CategoryKey, locale: SupportedLocale): string {
  return contentCategoryLabels[category]?.[locale] ?? getMenuLabel('category', category, locale);
}

export function getUtilityLabel(name: string, locale: SupportedLocale): string {
  return utilityLabels[name]?.[locale] ?? name;
}
