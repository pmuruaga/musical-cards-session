import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { storyCards, type StoryCard } from '../../data/cards';
import { useSound } from '../../hooks/useSound';
import { shuffleArray } from '../../utils/random';
import { CardReveal } from './CardReveal';
import { PlayingCard } from './PlayingCard';

const DECK_SIZE = 5;

type Phase = 'spread' | 'selected' | 'revealed';

type DeckCard = {
  slotId: string;
  card: StoryCard;
};

function dealDeck(excludeId: string | null): DeckCard[] {
  const pool = excludeId
    ? storyCards.filter((card) => card.id !== excludeId)
    : storyCards;
  const shuffled = shuffleArray(pool.length >= DECK_SIZE ? pool : storyCards);
  const picked = shuffled.slice(0, DECK_SIZE);

  return picked.map((card, i) => ({
    slotId: `slot-${Date.now()}-${i}`,
    card,
  }));
}

const SPREAD = [
  { x: -118, y: 24, rotate: -12 },
  { x: -58, y: 8, rotate: -5 },
  { x: 0, y: 0, rotate: 0 },
  { x: 58, y: 8, rotate: 5 },
  { x: 118, y: 24, rotate: 12 },
];

const SPREAD_WIDE = [
  { x: -180, y: 28, rotate: -14 },
  { x: -90, y: 8, rotate: -6 },
  { x: 0, y: 0, rotate: 0 },
  { x: 90, y: 8, rotate: 6 },
  { x: 180, y: 28, rotate: 14 },
];

export function CardDeck() {
  const { play } = useSound();
  const [deck, setDeck] = useState<DeckCard[]>(() => dealDeck(null));
  const [phase, setPhase] = useState<Phase>('spread');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [lastCardId, setLastCardId] = useState<string | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768,
  );

  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const positions = wide ? SPREAD_WIDE : SPREAD;

  const choose = useCallback(
    (slotId: string) => {
      if (phase !== 'spread') return;
      const item = deck.find((d) => d.slotId === slotId);
      if (!item) return;

      setSelectedSlot(slotId);
      setPhase('selected');
      play('flip');

      window.setTimeout(() => {
        setPhase('revealed');
        setLastCardId(item.card.id);
        play('reveal');
      }, 420);
    },
    [deck, phase, play],
  );

  const reshuffle = useCallback(() => {
    play('shuffle');
    setPhase('spread');
    setSelectedSlot(null);
    setShuffleKey((k) => k + 1);
    setDeck(dealDeck(lastCardId));
  }, [lastCardId, play]);

  const focusMode = phase === 'selected' || phase === 'revealed';

  return (
    <div
      className={`flex w-full flex-col items-center ${
        focusMode ? 'gap-5 sm:gap-6' : 'gap-8'
      }`}
    >
      <div
        className={`relative flex w-full max-w-3xl items-center justify-center transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          focusMode
            ? 'h-[clamp(340px,min(70vh,calc(84vw*1.55)),540px)]'
            : 'h-[320px] sm:h-[360px]'
        }`}
      >
        {/* Table surface */}
        <div className="absolute inset-x-4 bottom-6 top-10 rounded-[40%] bg-[radial-gradient(ellipse_at_center,_rgba(90,55,35,0.45)_0%,_rgba(30,20,15,0.15)_55%,_transparent_75%)] blur-[1px]" />
        <div className="absolute inset-x-10 bottom-10 h-24 rounded-full bg-black/25 blur-2xl" />

        <AnimatePresence mode="popLayout">
          {deck.map((item, index) => {
            const isSelected = item.slotId === selectedSlot;
            const spread = positions[index] ?? positions[2];
            const hiding = phase !== 'spread' && !isSelected;
            const showFront = isSelected && phase === 'revealed';
            const expanded = isSelected && focusMode;

            return (
              <motion.div
                key={`${shuffleKey}-${item.slotId}`}
                className="absolute"
                initial={{
                  opacity: 0,
                  y: 40,
                  x: 0,
                  rotate: 0,
                  scale: 0.85,
                }}
                animate={
                  hiding
                    ? {
                        opacity: 0,
                        scale: 0.7,
                        x: spread.x * 1.4,
                        y: spread.y + 40,
                        rotate: spread.rotate * 1.5,
                      }
                    : expanded
                      ? {
                          opacity: 1,
                          x: 0,
                          y: 0,
                          rotate: 0,
                          scale: 1,
                          zIndex: 20,
                        }
                      : {
                          opacity: 1,
                          x: spread.x,
                          y: spread.y,
                          rotate: spread.rotate,
                          scale: 1,
                          zIndex: index,
                        }
                }
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 22,
                  delay: phase === 'spread' ? index * 0.04 : 0,
                }}
              >
                <PlayingCard
                  face={showFront ? 'front' : 'back'}
                  expanded={expanded}
                  selected={isSelected}
                  dimmed={hiding}
                  disabled={phase !== 'spread'}
                  onClick={() => choose(item.slotId)}
                >
                  <CardReveal card={item.card} />
                </PlayingCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase === 'revealed' && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={reshuffle}
            className="rounded-2xl border border-[#7a9bc4]/35 bg-gradient-to-r from-[#3a4a6b]/80 to-[#2a3548]/90 px-10 py-4 text-lg font-semibold tracking-wide text-[#e8eef8] shadow-[0_12px_32px_rgba(60,80,120,0.3)]"
          >
            Otra carta
          </motion.button>
        )}
      </AnimatePresence>

      {phase === 'spread' && (
        <p className="text-sm text-[#e8d5c0]/55">Elegí una carta</p>
      )}
    </div>
  );
}
