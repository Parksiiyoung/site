'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SentencePageFrame } from '@/components/layout/SentencePageFrame';
import { SentenceBar, type SentenceSlotConfig } from '@/components/nav/SentenceBar';
import { getMenuLabel, getMenuOptions, getUtilityLabel } from '@/components/nav/sentenceUtils';
import { IssueCard } from './IssueCard';
import { ArticleCard } from './ArticleCard';
import { sentenceTemplates } from '@/lib/i18n/sentences';
import { mockIssues, getArticlesByIssue } from '@/lib/mock/journal';
import { EASE_OUT_EXPO } from '@/lib/motion';
import type { SupportedLocale } from '@/types';

interface JournalPageProps {
  locale: SupportedLocale;
}

function getJournalViewModeOptions(locale: SupportedLocale) {
  return [
    { value: 'issues', label: locale === 'ko' ? '이슈' : locale === 'ja' ? 'イシュー' : 'issues' },
    { value: 'articles', label: locale === 'ko' ? '아티클' : locale === 'ja' ? '記事' : 'articles' },
  ];
}

export function JournalPage({ locale }: JournalPageProps) {
  const searchParams = useSearchParams();
  const initialIssue = searchParams.get('issue') ?? 'all-issues';

  const [selectedIssue, setSelectedIssue] = useState(initialIssue);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [viewMode, setViewMode] = useState<'issues' | 'articles'>('articles');
  const [sinceValue, setSinceValue] = useState('may-2006');

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const articles = useMemo(() => {
    const issueId = selectedIssue === 'all-issues' ? undefined : selectedIssue.replace('issue-', 'issue-00');
    return getArticlesByIssue(issueId);
  }, [selectedIssue]);

  const articleCountByIssue = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const issue of mockIssues) {
      counts[issue.id] = getArticlesByIssue(issue.id).length;
    }
    return counts;
  }, []);

  const topTemplate = sentenceTemplates['journal-top'][locale];
  const bottomTemplate = sentenceTemplates['journal-bottom'][locale];
  const viewModeOptions = getJournalViewModeOptions(locale);

  const topSlots = useMemo<Record<string, SentenceSlotConfig>>(
    () => ({
      issue: {
        value: selectedIssue,
        label: getMenuLabel('issue', selectedIssue, locale),
        options: getMenuOptions('issue', locale),
        onSelect: setSelectedIssue,
      },
      topic: {
        value: selectedTopic,
        label: getMenuLabel('topic', selectedTopic, locale),
        options: getMenuOptions('topic', locale),
        onSelect: setSelectedTopic,
      },
    }),
    [locale, selectedIssue, selectedTopic],
  );

  const bottomSlots = useMemo<Record<string, SentenceSlotConfig>>(
    () => ({
      since: {
        value: sinceValue,
        label: getMenuLabel('since', sinceValue, locale),
        options: getMenuOptions('since', locale),
        onSelect: setSinceValue,
      },
      viewMode: {
        value: viewMode,
        label: viewModeOptions.find((option) => option.value === viewMode)?.label ?? viewMode,
        options: viewModeOptions,
        onSelect: (value) => setViewMode(value as 'issues' | 'articles'),
      },
      top: {
        display: 'paren',
        label: getUtilityLabel('top', locale),
        onPress: scrollToTop,
      },
    }),
    [locale, scrollToTop, sinceValue, viewMode, viewModeOptions],
  );

  return (
    <SentencePageFrame
      header={<SentenceBar ariaLabel="Journal filters" slots={topSlots} template={topTemplate} />}
      footer={<SentenceBar ariaLabel="Journal utilities" slots={bottomSlots} template={bottomTemplate} />}
    >
      <div className="site-shell py-[var(--page-section-space)]">
          <AnimatePresence mode="wait">
            {viewMode === 'issues' ? (
              <motion.div
                key="issues-grid"
                className="grid grid-cols-1 gap-[var(--gallery-gap)] sm:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              >
                {mockIssues.map((issue, index) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    articleCount={articleCountByIssue[issue.id] ?? 0}
                    priority={index < 2}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="articles-list"
                className="flex flex-col gap-[var(--space-lg)]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              >
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    priority={index < 3}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </SentencePageFrame>
  );
}
