import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { PosterImage } from '@/types';

interface PosterArtworkProps {
  image: PosterImage;
  mode?: 'frame' | 'stack';
  priority?: boolean;
  sizes?: string;
  style?: CSSProperties;
}

const DEFAULT_SIZES = '(max-width: 639px) 50vw, (max-width: 1024px) 33vw, 25vw';

function getAspectRatio(image: PosterImage) {
  return `${image.width} / ${image.height}`;
}

export function PosterArtwork({
  image,
  mode = 'frame',
  priority = false,
  sizes = DEFAULT_SIZES,
  style,
}: PosterArtworkProps) {
  const className = mode === 'stack'
    ? 'gallery-poster-artwork gallery-poster-artwork--stack'
    : 'gallery-poster-artwork gallery-poster-artwork--frame';
  const hasExplicitSize = typeof style?.width !== 'undefined' && typeof style?.height !== 'undefined';
  const resolvedStyle = hasExplicitSize
    ? style
    : { aspectRatio: getAspectRatio(image), ...style };

  return (
    <div
      className={className}
      style={resolvedStyle}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        className="object-contain"
        priority={priority}
        sizes={sizes}
        placeholder={image.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={image.blurDataURL}
      />
    </div>
  );
}
