import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';

export function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      aria-label={enabled ? 'Silenciar sonidos' : 'Activar sonidos'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f0d5b0] backdrop-blur-sm transition hover:bg-white/10 hover:shadow-[0_0_20px_rgba(212,165,116,0.25)]"
    >
      {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </motion.button>
  );
}
