'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getPathLocale } from '@/lib/i18n/runtime';
import { EASE_OUT_EXPO } from '@/lib/motion';
import type { JournalIssue } from '@/types';

interface IssueCardProps {
  issue: JournalIssue;
  articleCount: number;
  priority?: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function IssueCard({ issue, articleCount, priority = false }: IssueCardProps) {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const issueNumber = String(issue.number).padStart(2, '0');

  return (
    <motion.article
      className="group relative overflow-hidden"
      style={{ borderRadius: 'var(--card-radius)' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
    >
      <Link href={`/${locale}/journal?issue=issue-${issue.number}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
          <Image
            src={issue.coverImage.url}
            alt={issue.coverImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            priority={priority}
          />

          {/* Issue label overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-[var(--space-md)]">
            <p className="text-xs font-medium uppercase tracking-widest text-white/70">
              Issue {issueNumber}
            </p>
            <h2 className="mt-[var(--space-xs)] text-xl font-medium text-white">
              {issue.title}
            </h2>
            <p className="mt-[var(--space-xs)] text-sm text-white/60">
              {formatDate(issue.publishedAt)} &middot; {articleCount} articles
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
