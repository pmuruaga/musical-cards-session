import { motion } from 'framer-motion';
import { CardDeck } from './CardDeck';

export function CardsGame() {
  return (
    <section className="flex flex-col items-center gap-6 py-4">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl text-[#f8ecd8] sm:text-4xl"
        >
          Cartas
        </motion.h1>
        <p className="mt-2 text-[#e8d5c0]/70">
          Elegí una carta. Dale vuelta. Contanos algo.
        </p>
      </div>

      <CardDeck />
    </section>
  );
}
