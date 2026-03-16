// ─── Core Types ───

export interface Poster {
  id: string;
  title: string;
  slug: string;
  category: CategoryKey;
  workType: WorkType;
  decade: Decade;
  year: number;
  month?: string;
  client?: string;
  designer: string;
  images: PosterImage[];
  groupId?: string;
  groupTitle?: string;
  description?: string;
  downloadable: boolean;
  order: number;
}

export interface PosterImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface PosterGroup {
  id: string;
  title: string;
  slug: string;
  posters: Poster[];
}

// ─── Menu / Filter Types ───

export type CategoryKey =
  | 'all'
  | 'studio-film'
  | 'independent-film'
  | 'series-streaming'
  | 'campaign'
  | 'other';

export type WorkType = 'designed' | 'written' | 'collected';
export type Decade = '2020s' | '2010s' | '2000s' | 'all-time';
export type ViewMode = 'gallery' | 'list';
export type ShareTarget = 'instagram' | 'twitter' | 'threads' | 'reddit' | 'kakaotalk' | 'facebook' | 'pinterest' | 'copy';

export interface NavFilterState {
  category: CategoryKey;
  decade: Decade;
  workType: WorkType;
  designer: string;
  viewMode: ViewMode;
}

export interface MenuSlotOption {
  value: string;
  label: string;
}

export type SentenceContext = 'gallery-top' | 'gallery-bottom' | 'content-top' | 'content-bottom' | 'empty' | 'journal-top' | 'journal-bottom';

// ─── Journal ───

export interface JournalIssue {
  id: string;
  number: number;
  title: string;
  coverImage: PosterImage;
  publishedAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  issue: JournalIssue;
  author: string;
  coverImage: PosterImage;
  publishedAt: string;
}

export interface ArticleBody {
  type: 'text' | 'image' | 'pullQuote' | 'videoEmbed';
  content: string;
  caption?: string;
  attribution?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface ArticleFull extends Article {
  body: ArticleBody[];
}

// ─── Locale ───

export type SupportedLocale = 'ko' | 'en' | 'ja';
