import { motion } from 'framer-motion';
import type { StoryCard } from '../../data/cards';
import { getCardCategory } from '../../data/cards';

type Props = {
  card: StoryCard;
};

type PromptTier = 'short' | 'medium' | 'long';

function getPromptTier(prompt: string): PromptTier {
  const len = prompt.length;
  if (len > 115) return 'long';
  if (len > 85) return 'medium';
  return 'short';
}

const promptClass: Record<PromptTier, string> = {
  short:
    'text-[clamp(1.05rem,2.6vw,1.3rem)] leading-relaxed tracking-[0.01em]',
  medium:
    'text-[clamp(0.98rem,2.4vw,1.15rem)] leading-[1.55]',
  long: 'text-[clamp(0.92rem,2.2vw,1.05rem)] leading-snug',
};

const titleClass: Record<PromptTier, string> = {
  short: 'text-[clamp(1.35rem,3.6vw,1.85rem)] leading-snug',
  medium: 'text-[clamp(1.25rem,3.3vw,1.7rem)] leading-snug',
  long: 'text-[clamp(1.15rem,3vw,1.55rem)] leading-snug',
};

const shellClass: Record<PromptTier, string> = {
  short: 'gap-3 p-5 sm:gap-4 sm:p-6',
  medium: 'gap-2.5 p-[1.125rem] sm:gap-3 sm:p-5',
  long: 'gap-2 p-4 sm:gap-2.5 sm:p-5',
};

export function CardReveal({ card }: Props) {
  const category = getCardCategory(card);
  const tier = getPromptTier(card.prompt);
  const titleTier =
    card.title.length > 24 && tier === 'short' ? 'medium' : tier;

  return (
    <div
      className={`flex h-full min-h-0 flex-col ${shellClass[tier]}`}
    >
      <div
        className="h-1 w-12 shrink-0 rounded-full"
        style={{
          backgroundColor: category.accent,
          boxShadow: `0 0 16px ${category.glow}`,
        }}
      />

      <p
        className="mt-3 shrink-0 text-[clamp(0.65rem,1.7vw,0.75rem)] uppercase tracking-[0.25em]"
        style={{ color: category.accent }}
      >
        <span className="mr-1.5 text-[clamp(1rem,2.4vw,1.25rem)] normal-case tracking-normal">
          {category.emoji}
        </span>
        {category.name}
      </p>

      <h3
        className={`font-display mt-2 shrink-0 text-[#f8ecd8] ${titleClass[titleTier]}`}
      >
        {card.title}
      </h3>

      {/* Empuja la pregunta hacia abajo sin forzar huecos enormes en prompts largos */}
      <div
        className={`min-h-[0.5rem] shrink ${tier === 'long' ? 'flex-[0.6]' : 'flex-1'}`}
        aria-hidden
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className={`shrink-0 text-[#e8d5c0]/90 ${promptClass[tier]}`}
      >
        {card.prompt}
      </motion.p>
    </div>
  );
}
