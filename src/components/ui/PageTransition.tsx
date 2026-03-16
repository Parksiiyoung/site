'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { EASE_OUT_EXPO } from '@/lib/motion';

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
