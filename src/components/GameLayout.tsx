import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AmbientBackground } from './AmbientBackground';
import { GameNavigation } from './GameNavigation';
import { SoundToggle } from './SoundToggle';
import type { GameView } from '../hooks/useGameNavigation';

type Props = {
  view: GameView;
  onNavigate: (view: Exclude<GameView, 'home'>) => void;
  onHome: () => void;
  children: ReactNode;
};

export function GameLayout({ view, onNavigate, onHome, children }: Props) {
  return (
    <div className="relative min-h-dvh text-[#f5e6d3]">
      <AmbientBackground />

      <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onHome}
          className="font-display text-left text-lg tracking-wide text-[#f0d5b0] transition hover:text-white sm:text-xl"
        >
          Juegos de la Noche
        </button>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {view !== 'home' && (
            <GameNavigation
              current={view}
              onSelect={onNavigate}
              onHome={onHome}
            />
          )}
          <SoundToggle />
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-2 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
