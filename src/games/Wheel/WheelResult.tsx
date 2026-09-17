import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { WheelResult } from '../../data/wheelChallenges';
import { formatMinutes } from '../../utils/random';

type Props = {
  result: WheelResult | null;
  onClose: () => void;
};

export function WheelResult({ result, onClose }: Props) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: (i % 2 === 0 ? 1 : -1) * (20 + (i % 6) * 18),
        y: -40 - (i % 5) * 28,
        delay: (i % 8) * 0.04,
        color: i % 3 === 0 ? '#e8a07a' : i % 3 === 1 ? '#f0d5b0' : '#c9a227',
      })),
    [],
  );

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.86, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#2a1e18]/95 to-[#15100e]/98 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${result.category.accent}55, transparent 55%)`,
              }}
            />

            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="pointer-events-none absolute left-1/2 top-1/3 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: p.color }}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: p.x,
                  y: p.y,
                  scale: [0.5, 1.2, 0.4],
                }}
                transition={{ duration: 1.1, delay: p.delay, ease: 'easeOut' }}
              />
            ))}

            <div className="relative z-10">
              <div className="mb-3 text-5xl">{result.category.emoji}</div>
              <h2 className="font-display text-3xl uppercase tracking-wide text-[#f8ecd8]">
                {result.category.name}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#e8d5c0]/90">
                {result.challenge.text}
              </p>
              <p className="mt-5 text-sm uppercase tracking-[0.2em] text-[#d4a574]">
                ⏱ {formatMinutes(result.challenge.maxTimeMinutes)}
              </p>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#c4784a] to-[#a05a38] px-6 py-4 text-lg font-semibold tracking-wide text-[#fff8f0] shadow-[0_10px_30px_rgba(196,120,74,0.35)]"
              >
                ¡Dale!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
