import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

type Props = {
  face: 'back' | 'front';
  /** Carta protagonista (seleccionada / revelada). */
  expanded?: boolean;
  selected?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
  className?: string;
};

export function PlayingCard({
  face,
  expanded = false,
  selected,
  dimmed,
  onClick,
  disabled,
  style,
  children,
  className = '',
}: Props) {
  const sizeClass = expanded
    ? // Desktop ~300–340 × 440–500; en pantallas bajas prioriza caber sin clip
      'h-[clamp(320px,min(64vh,calc(84vw*1.48)),500px)] w-[clamp(230px,min(84vw,40vh),340px)]'
    : 'h-[210px] w-[140px] sm:h-[240px] sm:w-[160px] md:h-[270px] md:w-[180px]';

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={style}
      whileHover={
        disabled || face === 'front' || expanded
          ? undefined
          : { y: -14, rotateX: 6, rotateY: -4, scale: 1.04 }
      }
      whileTap={disabled || expanded ? undefined : { scale: 0.98 }}
      className={`relative transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [perspective:1000px] ${sizeClass} ${className}`}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: face === 'front' ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Back */}
        <div
          className={`absolute inset-0 overflow-hidden rounded-2xl border border-[#d4a574]/35 bg-gradient-to-br from-[#2a1e18] via-[#1a1410] to-[#120e0c] shadow-[0_18px_40px_rgba(0,0,0,0.45)] [backface-visibility:hidden] ${
            selected ? 'ring-2 ring-[#d4a574]/60' : ''
          } ${dimmed ? 'opacity-40' : ''}`}
        >
          <div className="absolute inset-3 rounded-xl border border-[#d4a574]/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,165,116,0.18),transparent_45%)]" />
          <div
            className="absolute inset-6 rounded-lg opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(212,165,116,0.12) 0, rgba(212,165,116,0.12) 1px, transparent 1px, transparent 10px)',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="text-3xl opacity-80">♪</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#d4a574]/70">
              Juntadas
            </span>
          </div>
        </div>

        {/* Front — overflow solo recorta el fondo a los bordes; el contenido se dimensiona para caber */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#2c211c] to-[#15100e] shadow-[0_18px_40px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {children}
        </div>
      </motion.div>
    </motion.button>
  );
}
