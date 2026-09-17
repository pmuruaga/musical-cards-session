import { motion } from 'framer-motion';
import type { GameView } from '../hooks/useGameNavigation';
import { Dices, Spade } from 'lucide-react';

type Props = {
  current: GameView;
  onSelect: (view: Exclude<GameView, 'home'>) => void;
  onHome: () => void;
};

const tabs = [
  { id: 'wheel' as const, label: 'Ruleta', icon: Dices },
  { id: 'cards' as const, label: 'Cartas', icon: Spade },
];

export function GameNavigation({ current, onSelect, onHome }: Props) {
  return (
    <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 p-1.5 backdrop-blur-md">
      <button
        type="button"
        onClick={onHome}
        className="rounded-full px-3 py-2 text-sm text-[#e8d5c0]/70 transition hover:text-[#f5e6d3]"
      >
        Inicio
      </button>

      {tabs.map((tab) => {
        const active = current === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className="relative rounded-full px-4 py-2 text-sm font-medium text-[#f5e6d3]"
          >
            {active && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c4784a]/40 to-[#a07040]/35 shadow-[0_0_24px_rgba(196,120,74,0.25)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon size={16} />
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
