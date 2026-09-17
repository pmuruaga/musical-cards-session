import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Dices, Spade } from 'lucide-react';

type Props = {
  onWheel: () => void;
  onCards: () => void;
};

export function HomeScreen({ onWheel, onCards }: Props) {
  return (
    <section className="flex min-h-[calc(100dvh-6rem)] flex-col items-center justify-center gap-10 py-6">
      <div className="max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 text-xs uppercase tracking-[0.35em] text-[#d4a574]/70"
        >
          Encuentro musical
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-3xl leading-tight text-[#f8ecd8] sm:text-4xl md:text-5xl"
        >
          Taller de Canto - Juntadas Musicales
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-4 text-base text-[#e8d5c0]/75 sm:text-lg"
        >
          Una pausa. Un juego. Y seguimos con la música.
        </motion.p>
      </div>

      <div className="grid w-full max-w-4xl gap-5 md:grid-cols-2">
        <GameOption
          delay={0.18}
          accent="from-[#c4784a]/25 to-[#6b3a28]/10"
          glow="hover:shadow-[0_0_40px_rgba(196,120,74,0.28)]"
          icon={<Dices className="h-8 w-8 text-[#e8a07a]" />}
          title="Ruleta"
          description="Dejá que la suerte decida qué te toca hacer."
          emoji="🎡"
          onClick={onWheel}
        />
        <GameOption
          delay={0.26}
          accent="from-[#7a9bc4]/20 to-[#3a4a6b]/10"
          glow="hover:shadow-[0_0_40px_rgba(122,155,196,0.25)]"
          icon={<Spade className="h-8 w-8 text-[#a8c0e0]" />}
          title="Cartas"
          description="Elegí una carta. Dale vuelta. Y descubrí qué te toca contar."
          emoji="🃏"
          onClick={onCards}
        />
      </div>
    </section>
  );
}

type OptionProps = {
  delay: number;
  accent: string;
  glow: string;
  icon: ReactNode;
  title: string;
  description: string;
  emoji: string;
  onClick: () => void;
};

function GameOption({
  delay,
  accent,
  glow,
  icon,
  title,
  description,
  emoji,
  onClick,
}: OptionProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${accent} p-7 text-left backdrop-blur-md transition ${glow} sm:p-8`}
    >
      <div className="absolute -right-6 -top-6 text-7xl opacity-15 transition group-hover:opacity-25">
        {emoji}
      </div>
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
        {icon}
      </div>
      <h2 className="font-display text-3xl text-[#f8ecd8]">{title}</h2>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-[#e8d5c0]/75">
        {description}
      </p>
      <span className="mt-6 inline-flex text-sm uppercase tracking-[0.2em] text-[#d4a574]/80">
        Entrar →
      </span>
    </motion.button>
  );
}
