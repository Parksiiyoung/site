'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EASE_OUT_EXPO } from '@/lib/motion';
import type { MenuSlotOption } from '@/types';
import { splitSentenceTemplate, type SentencePart } from './sentenceUtils';

type SentenceTone = 'default' | 'emphasis' | 'subtle';
type SentenceDisplay = 'paren' | 'plain';

export interface SentenceSlotConfig {
  ariaLabel?: string;
  display?: SentenceDisplay;
  label: string;
  onPress?: () => void;
  onSelect?: (value: string) => void;
  options?: MenuSlotOption[];
  tone?: SentenceTone;
  value?: string;
}

interface SentenceBarProps {
  ariaLabel: string;
  className?: string;
  slots: Record<string, SentenceSlotConfig>;
  template: string;
}

const dropVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE_OUT_EXPO, staggerChildren: 0.045 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.18 },
  },
};

const optionVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: EASE_OUT_EXPO },
  },
};

export function SentenceBar({ ariaLabel, className = '', slots, template }: SentenceBarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [dropLeft, setDropLeft] = useState(0);
  const [dropHeight, setDropHeight] = useState(0);
  const [dropElement, setDropElement] = useState<HTMLDivElement | null>(null);

  const { leftParts, rightParts } = useMemo(() => splitSentenceTemplate(template), [template]);
  const activeConfig = activeSlot ? slots[activeSlot] : undefined;

  const activeOptions = useMemo(() => {
    if (!activeConfig?.options) return [];

    return activeConfig.options.filter((option) => option.value !== activeConfig.value);
  }, [activeConfig]);

  const measureDrop = useCallback(() => {
    if (!activeSlot || !rootRef.current) return;

    const trigger = triggerRefs.current[activeSlot];
    if (!trigger) return;

    const rootRect = rootRef.current.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const dropWidth = dropElement?.getBoundingClientRect().width ?? 0;
    const rawLeft = triggerRect.left - rootRect.left;
    const maxLeft = Math.max(rootRect.width - dropWidth, 0);

    setDropLeft(Math.max(0, Math.min(rawLeft, maxLeft)));
  }, [activeSlot, dropElement]);

  useEffect(() => {
    if (!activeSlot || activeOptions.length === 0) return;

    measureDrop();

    const handleResize = () => measureDrop();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [activeOptions.length, activeSlot, measureDrop]);

  useEffect(() => {
    if (!activeSlot) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setActiveSlot(null);
        setDropHeight(0);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveSlot(null);
        setDropHeight(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeSlot]);

  useEffect(() => {
    if (!dropElement) return;

    const updateMetrics = () => {
      setDropHeight(dropElement.getBoundingClientRect().height);
      measureDrop();
    };

    updateMetrics();

    const observer = new ResizeObserver(updateMetrics);
    observer.observe(dropElement);

    return () => observer.disconnect();
  }, [dropElement, measureDrop]);

  const registerTrigger = useCallback(
    (slotName: string) => (node: HTMLButtonElement | null) => {
      triggerRefs.current[slotName] = node;
      if (node && activeSlot === slotName) {
        requestAnimationFrame(measureDrop);
      }
    },
    [activeSlot, measureDrop],
  );

  const handleSlotPress = useCallback(
    (slotName: string) => {
      const config = slots[slotName];
      const options = config.options?.filter((option) => option.value !== config.value) ?? [];

      if (config.onSelect && options.length > 0) {
        setActiveSlot((current) => {
          const nextSlot = current === slotName ? null : slotName;
          if (!nextSlot) setDropHeight(0);
          return nextSlot;
        });
        return;
      }

      config.onPress?.();
      setActiveSlot(null);
      setDropHeight(0);
    },
    [slots],
  );

  const handleSelect = useCallback(
    (value: string) => {
      if (!activeSlot) return;

      const config = slots[activeSlot];
      config.onSelect?.(value);
      setActiveSlot(null);
      setDropHeight(0);
    },
    [activeSlot, slots],
  );

  return (
    <div ref={rootRef} className={`sentence-nav sentence-frame ${className}`}>
      <div
        className={`sentence-line ${rightParts.length === 0 ? 'sentence-line--single' : ''}`}
        aria-label={ariaLabel}
      >
        <SentenceCluster
          activeSlot={activeSlot}
          parts={leftParts}
          registerTrigger={registerTrigger}
          slots={slots}
          onSlotPress={handleSlotPress}
        />

        {rightParts.length > 0 && (
          <SentenceCluster
            activeSlot={activeSlot}
            align="right"
            parts={rightParts}
            registerTrigger={registerTrigger}
            slots={slots}
            onSlotPress={handleSlotPress}
          />
        )}
      </div>

      <motion.div
        className="sentence-dropzone"
        animate={{
          height: activeSlot ? dropHeight : 0,
          marginTop: activeSlot ? 4 : 0,
        }}
        transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
      >
        <AnimatePresence initial={false}>
          {activeSlot && activeOptions.length > 0 && (
            <motion.div
              ref={setDropElement}
              key={activeSlot}
              variants={dropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="sentence-options"
              style={{ left: dropLeft }}
            >
              {activeOptions.map((option) => (
                <motion.button
                  key={option.value}
                  variants={optionVariants}
                  onClick={() => handleSelect(option.value)}
                  className="sentence-option"
                  type="button"
                >
                  <span className="sentence-slot-paren">(</span>
                  <span className="sentence-slot-text">{option.label}</span>
                  <span className="sentence-slot-paren">)</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function SentenceCluster({
  activeSlot,
  align = 'left',
  parts,
  registerTrigger,
  slots,
  onSlotPress,
}: {
  activeSlot: string | null;
  align?: 'left' | 'right';
  parts: SentencePart[];
  registerTrigger: (slotName: string) => (node: HTMLButtonElement | null) => void;
  slots: Record<string, SentenceSlotConfig>;
  onSlotPress: (slotName: string) => void;
}) {
  return (
    <div
      className={`sentence-cluster ${align === 'right' ? 'sentence-cluster--right' : ''}`}
    >
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return (
            <span key={`${part.text}-${index}`} className="sentence-piece">
              {part.text}
            </span>
          );
        }

        const config = slots[part.name];
        if (!config) return null;

        const hasOptions = (config.options?.filter((option) => option.value !== config.value).length ?? 0) > 0;
        const isInteractive = Boolean(config.onSelect && hasOptions);
        const isAction = Boolean(config.onPress) && !isInteractive;
        const isActive = activeSlot === part.name;
        const display = config.display ?? 'paren';
        const tone = config.tone ?? 'default';
        const toneClass = `sentence-slot-text--${tone}`;
        const token = (
          <>
            {display === 'paren' && <span className="sentence-slot-paren">(</span>}
            <span className={`sentence-slot-text ${toneClass}`}>{config.label}</span>
            {display === 'paren' && <span className="sentence-slot-paren">)</span>}
          </>
        );

        if (isInteractive || isAction) {
          return (
            <button
              key={`${part.name}-${index}`}
              ref={isInteractive ? registerTrigger(part.name) : undefined}
              type="button"
              aria-expanded={isInteractive ? isActive : undefined}
              aria-haspopup={isInteractive ? 'listbox' : undefined}
              aria-label={config.ariaLabel}
              className={`sentence-slot-button ${isActive ? 'sentence-slot-button--active' : ''}`}
              onClick={() => onSlotPress(part.name)}
            >
              {token}
            </button>
          );
        }

        return (
          <span key={`${part.name}-${index}`} className="sentence-slot-static">
            {token}
          </span>
        );
      })}
    </div>
  );
}
