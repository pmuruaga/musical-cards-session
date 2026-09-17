import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  pickChallengeFromCategory,
  wheelCategories,
  type WheelCategory,
  type WheelResult as WheelResultType,
} from '../../data/wheelChallenges';
import { useSound } from '../../hooks/useSound';
import {
  computeSpinRotation,
  getSegmentAngle,
  getWinningIndex,
} from '../../utils/wheelMath';
import { WheelResult } from './WheelResult';

/** Espacio de diseño SVG (diámetro máximo ~600px). El display se controla por CSS. */
const SIZE = 600;
const CENTER = SIZE / 2;
const RADIUS = 278;
const LABEL_RADIUS = RADIUS * 0.64;
const HUB_OUTER = 58;
const HUB_INNER = 48;

function buildSegmentPath(index: number, total: number): string {
  const angle = getSegmentAngle(total);
  const start = ((index * angle - 90 - angle / 2) * Math.PI) / 180;
  const end = (((index + 1) * angle - 90 - angle / 2) * Math.PI) / 180;
  const x1 = CENTER + RADIUS * Math.cos(start);
  const y1 = CENTER + RADIUS * Math.sin(start);
  const x2 = CENTER + RADIUS * Math.cos(end);
  const y2 = CENTER + RADIUS * Math.sin(end);
  return `M ${CENTER} ${CENTER} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 0 1 ${x2} ${y2} Z`;
}

function getWheelLabelLines(cat: WheelCategory): string[] {
  if (cat.wheelLabel) {
    return Array.isArray(cat.wheelLabel) ? [...cat.wheelLabel] : [cat.wheelLabel];
  }
  return [cat.name];
}

export function Wheel() {
  const { play } = useSound();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [result, setResult] = useState<WheelResultType | null>(null);
  const rotationRef = useRef(0);
  const lastTickSegment = useRef(-1);
  const rafRef = useRef<number | null>(null);

  const segmentCount = wheelCategories.length;
  const segmentAngle = useMemo(
    () => getSegmentAngle(segmentCount),
    [segmentCount],
  );

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const spin = useCallback(() => {
    if (spinning) return;

    const targetIndex = Math.floor(Math.random() * segmentCount);
    const start = rotationRef.current;
    const end = computeSpinRotation(start, targetIndex, segmentCount);
    const duration = 5200 + Math.random() * 1200;
    const startTime = performance.now();

    setSpinning(true);
    setWinnerIndex(null);
    setResult(null);
    lastTickSegment.current = -1;

    const animate = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      // Custom ease-out with long deceleration
      const eased = 1 - (1 - t) ** 4;
      const current = start + (end - start) * eased;
      setRotation(current);

      const seg = Math.floor((((current % 360) + 360) % 360) / segmentAngle);
      if (seg !== lastTickSegment.current) {
        lastTickSegment.current = seg;
        if (t < 0.95) play('tick');
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const finalIndex = getWinningIndex(end, segmentCount);
      const category = wheelCategories[finalIndex];
      const challenge = pickChallengeFromCategory(category);

      setRotation(end);
      setSpinning(false);
      setWinnerIndex(finalIndex);
      play('stop');
      play('reveal');
      setResult({ category, challenge, categoryIndex: finalIndex });
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [play, segmentAngle, segmentCount, spinning]);

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8">
      <div
        className="relative"
        style={{
          /* Mobile ~320+, tablet ~440–520, desktop/TV ~520–600; limita por alto y ancho */
          width: 'clamp(320px, min(78vw, 58vh), 600px)',
          maxWidth: '100%',
        }}
      >
        {/* Pointer — más grande, proporcional al tamaño de la ruleta */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[10px]">
          <svg
            viewBox="0 0 44 48"
            className="h-[clamp(36px,7.5vw,48px)] w-[clamp(30px,6.5vw,40px)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
            aria-hidden
          >
            <polygon points="22,48 0,0 44,0" fill="#f0d5b0" />
          </svg>
        </div>

        <div
          className={`relative w-full rounded-full p-[2.2%] transition duration-500 ${
            spinning
              ? 'shadow-[0_0_50px_rgba(196,120,74,0.35)]'
              : 'shadow-[0_20px_60px_rgba(0,0,0,0.45)]'
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent" />
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            width="100%"
            height="100%"
            className="relative z-10 aspect-square w-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'none' : 'transform 0.3s ease',
            }}
          >
            {wheelCategories.map((cat, i) => {
              const mid = ((i * segmentAngle - 90) * Math.PI) / 180;
              const lx = CENTER + LABEL_RADIUS * Math.cos(mid);
              const ly = CENTER + LABEL_RADIUS * Math.sin(mid);
              const dimmed =
                winnerIndex !== null && winnerIndex !== i && !spinning;
              const lines = getWheelLabelLines(cat);
              const lineHeight = 18;
              const textBlockHeight = (lines.length - 1) * lineHeight;
              const emojiY = ly - 18 - textBlockHeight / 2;
              const firstLineY = ly + 14 - textBlockHeight / 2;

              return (
                <g key={cat.id} opacity={dimmed ? 0.35 : 1}>
                  <path
                    d={buildSegmentPath(i, segmentCount)}
                    fill={cat.color}
                    stroke="rgba(15,12,10,0.55)"
                    strokeWidth="2"
                    style={{
                      filter:
                        winnerIndex === i && !spinning
                          ? `drop-shadow(0 0 14px ${cat.accent})`
                          : undefined,
                    }}
                  />
                  <text
                    x={lx}
                    y={emojiY}
                    fill="#f8ecd8"
                    fontSize="34"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${i * segmentAngle}, ${lx}, ${ly})`}
                  >
                    {cat.emoji}
                  </text>
                  <text
                    x={lx}
                    y={firstLineY}
                    fill="#f8ecd8"
                    fontSize="15"
                    fontWeight="700"
                    letterSpacing="0.03em"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${i * segmentAngle}, ${lx}, ${ly})`}
                    opacity={0.95}
                  >
                    {lines.map((line, lineIndex) => (
                      <tspan
                        key={`${cat.id}-${lineIndex}`}
                        x={lx}
                        dy={lineIndex === 0 ? 0 : lineHeight}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}

            <circle
              cx={CENTER}
              cy={CENTER}
              r={HUB_OUTER}
              fill="#1a1410"
              stroke="#d4a574"
              strokeWidth="3.5"
            />
            <circle cx={CENTER} cy={CENTER} r={HUB_INNER} fill="#2a1e18" />
          </svg>

          <button
            type="button"
            disabled={spinning}
            onClick={spin}
            className="absolute left-1/2 top-1/2 z-20 flex aspect-square w-[clamp(92px,17.5%,108px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#d4a574]/50 bg-gradient-to-b from-[#3a2a22] to-[#1a1410] text-[clamp(0.8rem,2.4vw,0.95rem)] font-semibold tracking-[0.15em] text-[#f0d5b0] shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition enabled:hover:shadow-[0_0_28px_rgba(212,165,116,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {spinning ? '...' : 'GIRAR'}
          </button>
        </div>
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: spinning ? 1 : 1.03 }}
        whileTap={{ scale: spinning ? 1 : 0.97 }}
        disabled={spinning}
        onClick={spin}
        className="rounded-2xl bg-gradient-to-r from-[#c4784a] to-[#a05a38] px-10 py-4 text-lg font-semibold tracking-wide text-[#fff8f0] shadow-[0_12px_32px_rgba(196,120,74,0.3)] disabled:cursor-not-allowed disabled:opacity-55"
      >
        {spinning ? 'Girando…' : 'Girar la ruleta'}
      </motion.button>

      <WheelResult result={result} onClose={() => setResult(null)} />
    </div>
  );
}
