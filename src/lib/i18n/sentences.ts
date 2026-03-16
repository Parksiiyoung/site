import type { CategoryKey, SupportedLocale, SentenceContext } from '@/types';

/**
 * Sentence templates per locale.
 * Slots are marked with {slotName} — the renderer replaces them with interactive sentence tokens.
 */
export const sentenceTemplates: Record<SentenceContext, Record<SupportedLocale, string>> = {
  'gallery-top': {
    en: 'looking at {category} from the {decade}|{workType} by {designer}',
    ko: '{decade}에 {designer}가 {workType}|{category}를 보는 중',
    ja: '{decade}の{category}を見ています|{designer}が{workType}',
  },
  'gallery-bottom': {
    en: 'We have been making posters since {since}.|Download from {viewMode} {top}',
    ko: '{since}부터 포스터를 만들고 있습니다.|{viewMode}에서 다운로드 {top}',
    ja: '{since}からポスターを作っています。|{viewMode}からダウンロード {top}',
  },
  'content-top': {
    en: '{title} in {category} from the {decade}|{workType} by {designer}',
    ko: '{title} — {decade}의 {category}|{designer}가 {workType}',
    ja: '{title} — {decade}の{category}|{designer}が{workType}',
  },
  'content-bottom': {
    en: 'This was created for client {client} in {date}.|Share to {shareTarget} {top}',
    ko: '클라이언트 {client}를 위해 제작, {date}.|{shareTarget}에 공유 {top}',
    ja: 'クライアント {client} のために制作、{date}。|{shareTarget}でシェア {top}',
  },
  'journal-top': {
    en: 'reading {issue}, about {topic}',
    ko: '{issue}를 읽는 중, {topic}에 대해',
    ja: '{issue}を読んでいます、{topic}について',
  },
  'journal-bottom': {
    en: 'Bitnaneun journal, published since {since}.|View as {viewMode} {top}',
    ko: '빛나는 저널, {since}부터 발행.|{viewMode}로 보기 {top}',
    ja: 'ビッナヌンジャーナル、{since}から発行。|{viewMode}で見る {top}',
  },
  empty: {
    en: "we looked everywhere, but there are no {category} from the {decade}. try {resetCategory} or {resetDecade}?",
    ko: '아무리 찾아봐도 {decade}의 {category}는 없어요. {resetCategory}나 {resetDecade}로 바꿔볼까요?',
    ja: 'どこを探しても{decade}の{category}はありません。{resetCategory}か{resetDecade}を試しますか？',
  },
};

export const menuLabels: Record<string, Record<string, Record<SupportedLocale, string>>> = {
  category: {
    all: { en: 'every posters', ko: '모든 포스터', ja: 'すべてのポスター' },
    'studio-film': { en: 'studio film posters', ko: '극장 영화 포스터', ja: 'スタジオ映画ポスター' },
    'independent-film': { en: 'independent film posters', ko: '독립영화 포스터', ja: 'インディーズ映画ポスター' },
    'series-streaming': { en: 'series & streaming posters', ko: '시리즈/스트리밍 포스터', ja: 'シリーズ/配信ポスター' },
    campaign: { en: 'campaign posters', ko: '캠페인 포스터', ja: 'キャンペーンポスター' },
    other: { en: 'something else', ko: '그 밖의 것들', ja: 'その他' },
  },
  decade: {
    '2020s': { en: '2020s', ko: '2020년대', ja: '2020年代' },
    '2010s': { en: '2010s', ko: '2010년대', ja: '2010年代' },
    '2000s': { en: '2000s', ko: '2000년대', ja: '2000年代' },
    'all-time': { en: 'all time', ko: '전체 연대', ja: '全年代' },
  },
  workType: {
    designed: { en: 'designed', ko: '디자인한', ja: 'デザイン' },
    written: { en: 'written', ko: '쓴', ja: '執筆' },
    collected: { en: 'Collected', ko: '수집한', ja: '収集' },
  },
  viewMode: {
    gallery: { en: 'gallery mode', ko: '갤러리 모드', ja: 'ギャラリーモード' },
    list: { en: 'list view', ko: '리스트 뷰', ja: 'リストビュー' },
  },
  since: {
    'may-2006': { en: 'May 2006', ko: '2006년 5월', ja: '2006年5月' },
    '7300-days': { en: '7,300 days', ko: '7,300일', ja: '7,300日' },
    '20-years': { en: '20 years', ko: '20년', ja: '20年' },
  },
  issue: {
    'all-issues': { en: 'all issues', ko: '전체 이슈', ja: 'すべてのイシュー' },
    'issue-1': { en: 'Issue 01', ko: '이슈 01', ja: 'イシュー01' },
    'issue-2': { en: 'Issue 02', ko: '이슈 02', ja: 'イシュー02' },
  },
  topic: {
    all: { en: 'everything', ko: '모든 것', ja: 'すべて' },
    process: { en: 'the process', ko: '과정', ja: 'プロセス' },
    inspiration: { en: 'inspiration', ko: '영감', ja: 'インスピレーション' },
  },
  shareTarget: {
    instagram: { en: 'Instagram', ko: '인스타그램', ja: 'Instagram' },
    twitter: { en: 'Twitter', ko: '트위터', ja: 'Twitter' },
    threads: { en: 'Threads', ko: '쓰레드', ja: 'Threads' },
    reddit: { en: 'Reddit', ko: '레딧', ja: 'Reddit' },
    kakaotalk: { en: 'KakaoTalk', ko: '카카오톡', ja: 'KakaoTalk' },
    facebook: { en: 'Facebook', ko: '페이스북', ja: 'Facebook' },
    pinterest: { en: 'Pinterest', ko: '핀터레스트', ja: 'Pinterest' },
    copy: { en: 'clipboard', ko: '클립보드', ja: 'クリップボード' },
  },
  designer: {
    everyone: { en: 'everyone', ko: '모두', ja: '全員' },
    Bitnaneun: { en: 'Bin-na-nun', ko: 'Bin-na-nun', ja: 'Bin-na-nun' },
  },
};

export const contentCategoryLabels: Record<CategoryKey, Record<SupportedLocale, string>> = {
  all: { en: 'every posters', ko: '모든 포스터', ja: 'すべてのポスター' },
  'studio-film': { en: 'film posters', ko: '영화 포스터', ja: '映画ポスター' },
  'independent-film': { en: 'independent film posters', ko: '독립영화 포스터', ja: 'インディーズ映画ポスター' },
  'series-streaming': { en: 'series & streaming posters', ko: '시리즈 포스터', ja: 'シリーズポスター' },
  campaign: { en: 'campaign posters', ko: '캠페인 포스터', ja: 'キャンペーンポスター' },
  other: { en: 'something else', ko: '그 밖의 것들', ja: 'その他' },
};

export const utilityLabels: Record<string, Record<SupportedLocale, string>> = {
  top: {
    en: 'top',
    ko: 'top',
    ja: 'top',
  },
};
