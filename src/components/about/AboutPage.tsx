'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { SupportedLocale } from '@/types';
import { EASE_OUT_EXPO } from '@/lib/motion';

const content: Record<SupportedLocale, { title: string; bio: string[]; contact: string }> = {
  en: {
    title: 'Bitnaneun',
    bio: [
      "We've been making movie posters since May 2006.",
      'Based in Seoul, we design for studios, independent filmmakers, and streaming platforms. Our work spans from blockbuster theatrical releases to intimate indie films.',
      'Every poster tells a story before the film begins.',
    ],
    contact: 'For inquiries',
  },
  ko: {
    title: '빛나는',
    bio: [
      '2006년 5월부터 영화 포스터를 만들고 있습니다.',
      '서울을 기반으로 스튜디오, 독립영화 감독, 스트리밍 플랫폼을 위해 작업합니다. 극장 개봉 대작부터 친밀한 독립영화까지 다양한 작업을 합니다.',
      '모든 포스터는 영화가 시작되기 전에 이야기를 전합니다.',
    ],
    contact: '문의',
  },
  ja: {
    title: 'ビッナヌン',
    bio: [
      '2006年5月から映画ポスターを作っています。',
      'ソウルを拠点に、スタジオ、インディー映画監督、ストリーミングプラットフォームのためにデザインしています。',
      'すべてのポスターは、映画が始まる前に物語を伝えます。',
    ],
    contact: 'お問い合わせ',
  },
};

export function AboutPage({ locale }: { locale: SupportedLocale }) {
  const c = content[locale] || content.en;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto flex max-w-[800px] flex-1 flex-col justify-center px-[var(--space-lg)] py-[var(--space-2xl)]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="sentence-nav mb-[var(--space-xl)]"
        >
          {c.title}
        </motion.h1>

        <div className="space-y-6">
          {c.bio.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: EASE_OUT_EXPO }}
              className="text-base leading-relaxed text-[var(--color-text-muted)]"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-[var(--space-2xl)] border-t border-[var(--color-border)] pt-[var(--space-lg)]"
        >
          <p className="text-sm text-[var(--color-text-muted)]">{c.contact}</p>
          <p className="mt-2 text-sm">
            <a
              href="mailto:hello@bitnaneun.com"
              className="underline transition-colors hover:text-[var(--color-hover)]"
            >
              hello@bitnaneun.com
            </a>
          </p>
          <div className="mt-4 flex gap-4 text-sm text-[var(--color-text-muted)]">
            <a
              href="https://instagram.com/bitnaneun"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-text)]"
            >
              Instagram
            </a>
            <a
              href="https://behance.net/bitnaneun"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-text)]"
            >
              Behance
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-[var(--space-xl)]"
        >
          <Link
            href={`/${locale}`}
            className="text-sm text-[var(--color-text-muted)] underline transition-colors hover:text-[var(--color-text)]"
          >
            ← back to gallery
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
