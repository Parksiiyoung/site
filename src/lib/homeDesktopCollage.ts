export interface HomeDesktopCollageLayer {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  innerHeight?: number;
  innerWidth?: number;
  rotate?: number;
}

export interface HomeDesktopCollageItem {
  height: number;
  id: string;
  layers: HomeDesktopCollageLayer[];
  posterIndex: number;
  width: number;
  x: number;
  y: number;
}

export const HOME_DESKTOP_COLLAGE_FRAME = {
  width: 1280,
  height: 1560,
} as const;

export const homeDesktopCollageItems: HomeDesktopCollageItem[] = [
  {
    id: 'slot-01',
    posterIndex: 10,
    x: 42,
    y: 20,
    width: 225,
    height: 322,
    layers: [
      { src: '/figma/home-desktop/01.png', x: 0, y: 0, width: 225, height: 322 },
    ],
  },
  {
    id: 'slot-02',
    posterIndex: 2,
    x: 322,
    y: 20,
    width: 229,
    height: 327,
    layers: [
      { src: '/figma/home-desktop/02.png', x: 0, y: 0, width: 229, height: 327 },
    ],
  },
  {
    id: 'slot-03',
    posterIndex: 0,
    x: 589,
    y: 0,
    width: 307.985,
    height: 379.378,
    layers: [
      {
        src: '/figma/home-desktop/03.png',
        x: 0,
        y: 0,
        width: 307.985,
        height: 379.378,
        innerWidth: 235.373,
        innerHeight: 332.833,
        rotate: 13.8,
      },
      { src: '/figma/home-desktop/04.png', x: 32.823, y: 23.378, width: 226, height: 323 },
    ],
  },
  {
    id: 'slot-04',
    posterIndex: 1,
    x: 925,
    y: 20,
    width: 312,
    height: 335,
    layers: [
      { src: '/figma/home-desktop/05.png', x: 58, y: 0, width: 236.906, height: 335 },
      { src: '/figma/home-desktop/06.png', x: 0, y: 72, width: 312, height: 228 },
    ],
  },
  {
    id: 'slot-05',
    posterIndex: 10,
    x: 23,
    y: 398,
    width: 294.737,
    height: 345.599,
    layers: [
      { src: '/figma/home-desktop/07.png', x: 23, y: 26, width: 203, height: 287 },
      {
        src: '/figma/home-desktop/08.png',
        x: 5.95,
        y: 30.03,
        width: 238.123,
        height: 309.335,
        innerWidth: 201.185,
        innerHeight: 284.55,
        rotate: -7.84,
      },
      {
        src: '/figma/home-desktop/09.png',
        x: 26,
        y: 38,
        width: 268.737,
        height: 307.599,
        innerWidth: 181.354,
        innerHeight: 256.501,
        rotate: 23.55,
      },
      {
        src: '/figma/home-desktop/10.png',
        x: 0,
        y: 0,
        width: 254.407,
        height: 315.949,
        innerWidth: 197.313,
        innerHeight: 279.073,
        rotate: 12.84,
      },
      { src: '/figma/home-desktop/11.png', x: 81, y: 0, width: 174, height: 246 },
      {
        src: '/figma/home-desktop/12.png',
        x: 34.01,
        y: 51.01,
        width: 197.166,
        height: 261.235,
        innerWidth: 173.14,
        innerHeight: 244.883,
        rotate: -5.84,
      },
      { src: '/figma/home-desktop/13.png', x: 66, y: 26, width: 188, height: 266 },
    ],
  },
  {
    id: 'slot-06',
    posterIndex: 6,
    x: 318,
    y: 387,
    width: 253.302,
    height: 321.485,
    layers: [
      {
        src: '/figma/home-desktop/14.png',
        x: 0,
        y: 0,
        width: 253.302,
        height: 321.485,
        innerWidth: 200.9,
        innerHeight: 287.748,
        rotate: -11.28,
      },
      { src: '/figma/home-desktop/15.png', x: 31.473, y: 21, width: 211, height: 301 },
    ],
  },
  {
    id: 'slot-07',
    posterIndex: 9,
    x: 611,
    y: 404,
    width: 295,
    height: 311,
    layers: [
      { src: '/figma/home-desktop/16.png', x: 0, y: 53, width: 295, height: 206 },
      { src: '/figma/home-desktop/17.png', x: 50, y: 0, width: 217, height: 311 },
    ],
  },
  {
    id: 'slot-08',
    posterIndex: 4,
    x: 946,
    y: 489,
    width: 308,
    height: 201,
    layers: [
      { src: '/figma/home-desktop/18.png', x: 0, y: 0, width: 308, height: 201 },
    ],
  },
  {
    id: 'slot-09',
    posterIndex: 3,
    x: 42,
    y: 774,
    width: 245.833,
    height: 335.6,
    layers: [
      {
        src: '/figma/home-desktop/19.png',
        x: 7.16,
        y: 0,
        width: 238.673,
        height: 317.209,
        innerWidth: 207,
        innerHeight: 296,
        rotate: 6.39,
      },
      { src: '/figma/home-desktop/20.png', x: 0, y: 29.6, width: 214, height: 306 },
    ],
  },
  {
    id: 'slot-10',
    posterIndex: 2,
    x: 315,
    y: 771,
    width: 279,
    height: 285,
    layers: [
      { src: '/figma/home-desktop/21.png', x: 40, y: 0, width: 199, height: 285 },
      { src: '/figma/home-desktop/22.png', x: 0, y: 57, width: 279, height: 186 },
    ],
  },
  {
    id: 'slot-11',
    posterIndex: 8,
    x: 650,
    y: 751,
    width: 247,
    height: 354,
    layers: [
      { src: '/figma/home-desktop/23.png', x: 0, y: 0, width: 247, height: 354 },
    ],
  },
  {
    id: 'slot-12',
    posterIndex: 4,
    x: 942,
    y: 820,
    width: 318,
    height: 225,
    layers: [
      { src: '/figma/home-desktop/24.png', x: 0, y: 0, width: 318, height: 225 },
    ],
  },
  {
    id: 'slot-13',
    posterIndex: 3,
    x: 51,
    y: 1210,
    width: 241,
    height: 344,
    layers: [
      { src: '/figma/home-desktop/25.png', x: 0, y: 0, width: 241, height: 344 },
    ],
  },
  {
    id: 'slot-14',
    posterIndex: 5,
    x: 349,
    y: 1179,
    width: 267,
    height: 381,
    layers: [
      { src: '/figma/home-desktop/26.png', x: 0, y: 0, width: 267, height: 381 },
    ],
  },
  {
    id: 'slot-15',
    posterIndex: 9,
    x: 685,
    y: 1198,
    width: 240,
    height: 344,
    layers: [
      { src: '/figma/home-desktop/27.png', x: 0, y: 0, width: 240, height: 344 },
    ],
  },
  {
    id: 'slot-16',
    posterIndex: 7,
    x: 968,
    y: 1156,
    width: 269,
    height: 386,
    layers: [
      { src: '/figma/home-desktop/28.png', x: 0, y: 0, width: 269, height: 386 },
    ],
  },
];
