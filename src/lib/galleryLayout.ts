import type { Poster } from '@/types';
import { simpleHash } from './filters';

export interface GalleryLayerTransform {
  rotate: number;
  scale: number;
  x: number;
  y: number;
}

export interface GalleryPresentation {
  align: 'start' | 'center' | 'end';
  featuredIndex: number;
  layers: GalleryLayerTransform[];
  poster: Poster;
  scale: number;
  stackDepth: number;
}

function getFeaturedIndex(poster: Poster) {
  let landscapeIndex = -1;
  let widestRatio = 0;

  poster.images.forEach((image, index) => {
    const ratio = image.width / image.height;
    if (ratio > widestRatio) {
      widestRatio = ratio;
      landscapeIndex = index;
    }
  });

  return widestRatio > 1.08 ? landscapeIndex : 0;
}

function getScale(poster: Poster, featuredIndex: number, hash: number) {
  const baseScale = (90 + (hash % 19)) / 100;
  const featuredImage = poster.images[featuredIndex] ?? poster.images[0];

  if (!featuredImage) return baseScale;

  const aspectRatio = featuredImage.width / featuredImage.height;
  if (aspectRatio > 1.12) {
    return Math.min(baseScale + 0.08, 1.08);
  }

  return baseScale;
}

function getAlign(): GalleryPresentation['align'] {
  return 'center';
}

function getLayerTransforms(hash: number, count: number): GalleryLayerTransform[] {
  const direction = hash % 2 === 0 ? 1 : -1;
  const depth = count > 1 ? 3 : 1;

  return Array.from({ length: depth }, (_, index) => {
    if (index === 0) {
      return { rotate: 0, scale: 1, x: 0, y: 0 };
    }

    const offset = index;

    return {
      rotate: direction * (index === 1 ? -3.5 : 4.5),
      scale: 1 - offset * 0.018,
      x: direction * (index === 1 ? -10 : 12),
      y: index === 1 ? 8 : -6,
    };
  });
}

export function calculateGalleryPresentation(posters: Poster[]): GalleryPresentation[] {
  return posters.map((poster, index) => {
    const hash = simpleHash(`${poster.id}-${index}`);
    const featuredIndex = getFeaturedIndex(poster);

    return {
      align: getAlign(),
      featuredIndex,
      layers: getLayerTransforms(hash, poster.images.length),
      poster,
      scale: getScale(poster, featuredIndex, hash),
      stackDepth: poster.images.length > 1 ? 3 : 1,
    };
  });
}
