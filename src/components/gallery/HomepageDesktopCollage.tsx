/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { SupportedLocale, Poster } from '@/types';
import {
  HOME_DESKTOP_COLLAGE_FRAME,
  homeDesktopCollageItems,
  type HomeDesktopCollageLayer,
} from '@/lib/homeDesktopCollage';

interface HomepageDesktopCollageProps {
  locale: SupportedLocale;
  posters: Poster[];
}

function CollageLayer({
  layer,
}: {
  layer: HomeDesktopCollageLayer;
}) {
  const style = {
    left: `${layer.x}px`,
    top: `${layer.y}px`,
    width: `${layer.width}px`,
    height: `${layer.height}px`,
  };

  if (layer.rotate) {
    return (
      <span className="homepage-collage-layer" style={style}>
        <span className="homepage-collage-rotate-frame">
          <span
            className="homepage-collage-rotate-inner"
            style={{
              width: `${layer.innerWidth ?? layer.width}px`,
              height: `${layer.innerHeight ?? layer.height}px`,
              transform: `rotate(${layer.rotate}deg)`,
            }}
          >
            <img
              src={layer.src}
              alt=""
              className="homepage-collage-image"
              draggable="false"
            />
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className="homepage-collage-layer" style={style}>
      <img
        src={layer.src}
        alt=""
        className="homepage-collage-image"
        draggable="false"
      />
    </span>
  );
}

export function HomepageDesktopCollage({ locale, posters }: HomepageDesktopCollageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const updateScale = () => {
      const nextScale = Math.min(node.clientWidth / HOME_DESKTOP_COLLAGE_FRAME.width, 1);
      setScale(nextScale || 1);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  if (posters.length === 0) return null;

  return (
    <div ref={wrapRef} className="homepage-collage-wrap" aria-label="Poster collage">
      <div
        className="homepage-collage-stage"
        style={{ height: `${HOME_DESKTOP_COLLAGE_FRAME.height * scale}px` }}
      >
        <div
          className="homepage-collage-canvas"
          style={{
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
        {homeDesktopCollageItems.map((item, index) => {
          const poster = posters[item.posterIndex % posters.length];
          if (!poster) return null;

          return (
            <Link
              key={item.id}
              href={`/${locale}/poster/${poster.slug}`}
              aria-label={poster.title}
              className="homepage-collage-item"
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                width: `${item.width}px`,
                height: `${item.height}px`,
                zIndex: index + 1,
              }}
            >
              {item.layers.map((layer) => (
                <CollageLayer
                  key={`${item.id}-${layer.src}`}
                  layer={layer}
                />
              ))}
            </Link>
          );
        })}
        </div>
      </div>
    </div>
  );
}
