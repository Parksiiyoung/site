import type { JournalIssue, ArticleFull, PosterImage } from '@/types';

const CDN = 'https://cdn.myportfolio.com/a728c80e9ed6dd94f3c91726ef12c093';

// ─── Cover Images ───

const parisTexasCover: PosterImage = {
  url: `${CDN}/e57cbbf3-60bc-4ba4-9fc7-4f5e2a70aef8_rw_1920.jpg?h=c4671d8821eb3f8d081d884f97b30859`,
  alt: 'Paris, Texas poster used as journal cover',
  width: 1080,
  height: 1528,
};

const moonlightCover: PosterImage = {
  url: `${CDN}/62b7c51858cbd8b522d4fe3cff2f6df25f4294f506d4e6b1b149455edc82506b6d39df47eda119c9_rw_1920.jpg?h=f8366b66717019ae342245a37efe76d4`,
  alt: 'Moonlight poster used as journal cover',
  width: 1080,
  height: 1528,
};

const grandBudapestCover: PosterImage = {
  url: `${CDN}/d0b02ee5-83a7-4361-81a5-0192a22daae9_rw_1920.jpg?h=d052dd3e0036108707c34797b26085ed`,
  alt: 'The Grand Budapest Hotel poster',
  width: 1080,
  height: 1528,
};

const hummingbirdCover: PosterImage = {
  url: `${CDN}/f34561db-b3c2-4f34-a1f9-bcd73c536c67_rw_1920.jpg?h=927ddd3917d7ed8683e139fb4b4f88e5`,
  alt: 'House of Hummingbird poster',
  width: 1080,
  height: 1528,
};

const theFallCover: PosterImage = {
  url: `${CDN}/0ed2a5b1-1476-4d35-a3ea-7e01ca2bb605_rw_1920.jpg?h=f30f646baee101f2d3f8a6ebe86fb411`,
  alt: 'The Fall poster',
  width: 1080,
  height: 1528,
};

const dogvilleCover: PosterImage = {
  url: `${CDN}/fa059585-d7e8-4fdf-b368-45d4a96f5940_rw_1920.jpg?h=3517054a9d2f6304db140444d76eeb74`,
  alt: 'Dogville poster',
  width: 1080,
  height: 1528,
};

const nakedLunchCover: PosterImage = {
  url: `${CDN}/000c5c19-4cbb-4e47-b0fc-1dbb6a7d50cb_rw_1920.jpg?h=0b4ec68ec189706568517b232d3e2821`,
  alt: 'Naked Lunch poster',
  width: 1080,
  height: 1528,
};

// ─── Issues ───

export const mockIssues: JournalIssue[] = [
  {
    id: 'issue-001',
    number: 1,
    title: 'On Making',
    coverImage: parisTexasCover,
    publishedAt: '2025-09-01',
  },
  {
    id: 'issue-002',
    number: 2,
    title: 'Light & Shadow',
    coverImage: moonlightCover,
    publishedAt: '2026-01-15',
  },
];

// ─── Articles ───

export const mockArticles: ArticleFull[] = [
  // ── Issue 1: On Making ──
  {
    id: 'art-001',
    title: 'Why We Still Print',
    slug: 'why-we-still-print',
    issue: mockIssues[0],
    author: 'Bitnaneun',
    coverImage: grandBudapestCover,
    publishedAt: '2025-09-01',
    body: [
      {
        type: 'text',
        content:
          'In an age where most movie posters exist only as compressed JPEGs scrolled past in half a second, we still send our designs to the printer. There is something irreplaceable about holding a finished poster in your hands — the weight of the paper, the slight texture under your fingertips, the way ink sits differently depending on the stock.',
      },
      {
        type: 'pullQuote',
        content: 'A poster on a wall is a commitment. A poster on a screen is a suggestion.',
        attribution: 'Bitnaneun',
      },
      {
        type: 'text',
        content:
          'The process of preparing a file for offset printing forces a different kind of discipline. Every color must be considered not as a hex value but as a physical mixture of pigments. Every gradient risks banding. Every fine line risks disappearing. These constraints are not limitations — they are the grammar of a language we have spent twenty years learning to speak.',
      },
      {
        type: 'image',
        content: '',
        imageUrl: grandBudapestCover.url,
        imageAlt: 'The Grand Budapest Hotel poster detail showing print texture',
        imageWidth: 1080,
        imageHeight: 1528,
        caption: 'The Grand Budapest Hotel — offset print on Munken Lynx 300gsm',
      },
      {
        type: 'text',
        content:
          'We do not print because it is fashionable or nostalgic. We print because the poster deserves to exist as a physical object. The film it represents was projected onto a physical screen, watched by physical people sitting in a physical room. The poster should honor that materiality.',
      },
    ],
  },
  {
    id: 'art-002',
    title: 'Color Grading for Paper',
    slug: 'color-grading-for-paper',
    issue: mockIssues[0],
    author: 'Bitnaneun',
    coverImage: hummingbirdCover,
    publishedAt: '2025-09-01',
    body: [
      {
        type: 'text',
        content:
          'When a film colorist works on a DI suite, they are painting with light. When we adapt those colors for a poster, we are translating light into pigment. This translation is never one-to-one. The gamut of CMYK is narrower than sRGB, and the emotional resonance of a color can shift entirely when it moves from a backlit screen to a reflective surface.',
      },
      {
        type: 'pullQuote',
        content: 'The color you see on screen is a promise. The color on paper is the truth.',
        attribution: 'Bitnaneun',
      },
      {
        type: 'text',
        content:
          'For House of Hummingbird, the warm amber tones of the original film palette had to be pushed slightly toward ochre to maintain their emotional warmth on uncoated stock. On screen, amber glows. On paper, it can feel muddy if you do not adjust for the absorption characteristics of the substrate.',
      },
      {
        type: 'image',
        content: '',
        imageUrl: hummingbirdCover.url,
        imageAlt: 'House of Hummingbird color detail',
        imageWidth: 1080,
        imageHeight: 1528,
        caption: 'House of Hummingbird — color adjusted for uncoated stock',
      },
      {
        type: 'text',
        content:
          'We always proof on the final stock before approving a print run. A soft proof on a calibrated monitor gets you eighty percent of the way there. The last twenty percent lives in the physical proof, where you discover that your deep blacks are slightly green, or that your skin tones have drifted cool.',
      },
    ],
  },
  {
    id: 'art-003',
    title: 'The Geometry of Composition',
    slug: 'the-geometry-of-composition',
    issue: mockIssues[0],
    author: 'Bitnaneun',
    coverImage: theFallCover,
    publishedAt: '2025-09-01',
    body: [
      {
        type: 'text',
        content:
          'Every poster begins with an invisible grid. Not the rigid twelve-column grid of web design, but a looser structural framework that guides the eye from the first point of contact to the last detail. In Korean poster design, this framework often follows a vertical reading flow that differs from the Western left-to-right, top-to-bottom convention.',
      },
      {
        type: 'text',
        content:
          'For The Fall, the composition needed to feel like a descent — visually and emotionally. The title placement at the bottom third, the figure falling through negative space, the palette darkening as the eye moves downward. Every element conspires to create a single feeling before the viewer has read a single word.',
      },
      {
        type: 'pullQuote',
        content: 'Composition is not arrangement. It is choreography.',
        attribution: 'Bitnaneun',
      },
      {
        type: 'image',
        content: '',
        imageUrl: theFallCover.url,
        imageAlt: 'The Fall composition analysis',
        imageWidth: 1080,
        imageHeight: 1528,
        caption: 'The Fall — vertical descent composition',
      },
    ],
  },
  // ── Issue 2: Light & Shadow ──
  {
    id: 'art-004',
    title: 'Moonlight and the Blue Hour',
    slug: 'moonlight-and-the-blue-hour',
    issue: mockIssues[1],
    author: 'Bitnaneun',
    coverImage: moonlightCover,
    publishedAt: '2026-01-15',
    body: [
      {
        type: 'text',
        content:
          'Barry Jenkins films exist in a particular quality of light — the blue hour between day and night, when the sky becomes a soft gradient and skin tones take on an otherworldly warmth against cool shadows. Capturing this liminal light in a static poster was one of the most challenging and rewarding projects we have undertaken.',
      },
      {
        type: 'pullQuote',
        content: 'In Moonlight, darkness is not the absence of light. It is light you have not yet learned to see.',
        attribution: 'Bitnaneun',
      },
      {
        type: 'text',
        content:
          'The poster uses a split-tone approach: deep cyan shadows and warm amber highlights, with the midtones carefully balanced to avoid the image collapsing into a simple duotone. The human face, lit from below and to the side, becomes a landscape of light and shadow where the viewer projects their own emotional reading.',
      },
      {
        type: 'image',
        content: '',
        imageUrl: moonlightCover.url,
        imageAlt: 'Moonlight poster light study',
        imageWidth: 1080,
        imageHeight: 1528,
        caption: 'Moonlight — split-tone blue hour palette',
      },
    ],
  },
  {
    id: 'art-005',
    title: 'Negative Space as Character',
    slug: 'negative-space-as-character',
    issue: mockIssues[1],
    author: 'Bitnaneun',
    coverImage: dogvilleCover,
    publishedAt: '2026-01-15',
    body: [
      {
        type: 'text',
        content:
          'Lars von Trier stripped Dogville down to chalk outlines on a bare stage. When designing the poster, we felt compelled to honor that radical minimalism. The challenge was to create something visually compelling using almost nothing — the same challenge von Trier set for himself.',
      },
      {
        type: 'text',
        content:
          'In graphic design, we talk about negative space as a tool. In this project, negative space became the primary character. The empty areas of the poster do not frame the content — they are the content. The viewer is confronted with absence, and that absence creates a tension that draws the eye inward.',
      },
      {
        type: 'pullQuote',
        content: 'The empty space on a poster is not wasted. It is the silence between words that gives speech its meaning.',
        attribution: 'Bitnaneun',
      },
      {
        type: 'image',
        content: '',
        imageUrl: dogvilleCover.url,
        imageAlt: 'Dogville negative space study',
        imageWidth: 1080,
        imageHeight: 1528,
        caption: 'Dogville — negative space as narrative device',
      },
    ],
  },
  {
    id: 'art-006',
    title: 'Ink and Hallucination',
    slug: 'ink-and-hallucination',
    issue: mockIssues[1],
    author: 'Bitnaneun',
    coverImage: nakedLunchCover,
    publishedAt: '2026-01-15',
    body: [
      {
        type: 'text',
        content:
          'Cronenberg understood that the boundary between the real and the imagined is not a line but a gradient. Designing the Naked Lunch poster meant finding a visual language for that gradient — something that feels simultaneously precise and hallucinatory, controlled and on the verge of dissolving.',
      },
      {
        type: 'text',
        content:
          'We experimented with generative distortion techniques applied to hand-drawn elements. The typeface was set, printed, scanned, manipulated, printed again, and scanned once more. Each generation introduced subtle artifacts — the same entropic process that Burroughs used in his cut-up technique. The final result looks designed, but underneath it is the accumulation of many small accidents.',
      },
      {
        type: 'pullQuote',
        content: 'To design for Cronenberg, you must be willing to let the design mutate.',
        attribution: 'Bitnaneun',
      },
      {
        type: 'image',
        content: '',
        imageUrl: nakedLunchCover.url,
        imageAlt: 'Naked Lunch poster process detail',
        imageWidth: 1080,
        imageHeight: 1528,
        caption: 'Naked Lunch — generative distortion through analog re-scanning',
      },
      {
        type: 'text',
        content:
          'The lesson of this project extends beyond a single poster. It taught us that control and chaos are not opposites but collaborators. The best designs emerge when you set up rigorous systems and then allow them to break in interesting ways.',
      },
    ],
  },
];

/** Get all articles for a specific issue, or all articles if no issue ID given. */
export function getArticlesByIssue(issueId?: string): ArticleFull[] {
  if (!issueId || issueId === 'all-issues') return mockArticles;
  return mockArticles.filter((article) => article.issue.id === issueId);
}

/** Find a single article by slug. */
export function getArticleBySlug(slug: string): ArticleFull | undefined {
  return mockArticles.find((article) => article.slug === slug);
}
