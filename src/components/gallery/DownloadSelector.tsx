'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { EASE_OUT_EXPO } from '@/lib/motion';
import type { Poster } from '@/types';

interface DownloadSelectorProps {
  posters: Poster[];
}

type Quality = 'web' | 'print';

export function DownloadSelector({ posters }: DownloadSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [quality, setQuality] = useState<Quality>('web');
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    if (selected.size === posters.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(posters.map((p) => p.id)));
    }
  }, [posters, selected.size]);

  const handleDownload = useCallback(async () => {
    if (selected.size === 0) return;

    setIsDownloading(true);
    setProgress(0);

    try {
      // Dynamic import JSZip only when needed
      const [{ default: JSZip }, { saveAs }] = await Promise.all([
        import('jszip'),
        import('file-saver'),
      ]);

      const zip = new JSZip();
      const selectedPosters = posters.filter((p) => selected.has(p.id));

      for (let i = 0; i < selectedPosters.length; i++) {
        const poster = selectedPosters[i];
        const imageUrl = poster.images[0]?.url;
        if (!imageUrl) continue;

        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const ext = blob.type.includes('png') ? 'png' : blob.type.includes('svg') ? 'svg' : 'jpg';
          zip.file(`${poster.title}.${ext}`, blob);
        } catch {
          // Skip failed downloads
        }

        setProgress(((i + 1) / selectedPosters.length) * 100);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `bitnaneun-posters-${quality}-${Date.now()}.zip`);
    } catch {
      // ZIP generation failed
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  }, [selected, posters, quality]);

  return (
    <div>
      {/* Selection toolbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: EASE_OUT_EXPO }}
        className="sticky top-16 z-30 mb-[var(--space-lg)] flex items-center justify-between rounded bg-neutral-50 px-6 py-3 shadow-sm ring-1 ring-[var(--color-border)]"
      >
        <div className="flex items-center gap-4">
          <span className="text-sm">
            <strong>{selected.size}</strong> poster{selected.size !== 1 ? 's' : ''} selected
          </span>
          <button
            onClick={selectAll}
            className="cursor-pointer text-sm text-[var(--color-text-muted)] underline transition-colors hover:text-[var(--color-text)]"
          >
            {selected.size === posters.length ? 'deselect all' : 'select all'}
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Quality toggle */}
          <div className="flex rounded border border-[var(--color-border)] text-sm">
            <button
              onClick={() => setQuality('web')}
              className={`cursor-pointer px-3 py-1 transition-colors ${quality === 'web' ? 'bg-[var(--color-accent)] text-white' : ''}`}
            >
              web (1920px)
            </button>
            <button
              onClick={() => setQuality('print')}
              className={`cursor-pointer px-3 py-1 transition-colors ${quality === 'print' ? 'bg-[var(--color-accent)] text-white' : ''}`}
            >
              print (original)
            </button>
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={selected.size === 0 || isDownloading}
            className="cursor-pointer rounded bg-[var(--color-accent)] px-4 py-1.5 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isDownloading ? 'Downloading...' : 'Download ZIP'}
          </button>
        </div>
      </motion.div>

      {/* Progress bar */}
      <AnimatePresence>
        {isDownloading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 4 }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden rounded-full bg-neutral-200"
          >
            <motion.div
              className="h-full bg-[var(--color-accent)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid with checkboxes */}
      <div className="grid grid-cols-2 gap-[var(--space-md)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {posters.map((poster) => {
          const img = poster.images[0];
          if (!img) return null;
          const isSelected = selected.has(poster.id);

          return (
            <button
              key={poster.id}
              onClick={() => toggleSelect(poster.id)}
              className={`group relative cursor-pointer overflow-hidden text-left transition-all ${
                isSelected ? 'ring-2 ring-[var(--color-accent)]' : 'ring-1 ring-transparent'
              }`}
              style={{ borderRadius: 'var(--card-radius)' }}
            >
              <div
                className="relative bg-neutral-100"
                style={{ aspectRatio: img.width / img.height }}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className={`object-cover transition-all ${isSelected ? 'brightness-90' : ''}`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Checkbox overlay */}
                <div
                  className={`absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                    isSelected
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                      : 'border-white/80 bg-white/30 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="mt-1 truncate px-1 text-xs">{poster.title}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
