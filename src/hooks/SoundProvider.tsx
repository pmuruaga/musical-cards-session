import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { SoundContext } from './soundContext';
import type { SoundName } from './soundTypes';

function createTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType,
  volume: number,
  startAt = 0,
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime + startAt);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + startAt + duration,
  );
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(ctx.currentTime + startAt);
  oscillator.stop(ctx.currentTime + startAt + duration + 0.02);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    if (ctxRef.current.state === 'suspended') {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;

      try {
        switch (name) {
          case 'tick':
            createTone(ctx, 880, 0.04, 'triangle', 0.05);
            break;
          case 'stop':
            createTone(ctx, 330, 0.18, 'sine', 0.08);
            createTone(ctx, 440, 0.22, 'sine', 0.05, 0.05);
            break;
          case 'reveal':
            createTone(ctx, 523, 0.2, 'sine', 0.07);
            createTone(ctx, 659, 0.25, 'sine', 0.05, 0.08);
            break;
          case 'shuffle':
            createTone(ctx, 220, 0.08, 'triangle', 0.04);
            createTone(ctx, 280, 0.08, 'triangle', 0.04, 0.06);
            createTone(ctx, 200, 0.1, 'triangle', 0.03, 0.12);
            break;
          case 'flip':
            createTone(ctx, 400, 0.12, 'sine', 0.06);
            createTone(ctx, 520, 0.16, 'sine', 0.04, 0.08);
            break;
          default:
            break;
        }
      } catch {
        // Audio is optional — never break gameplay.
      }
    },
    [enabled, getCtx],
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ enabled, toggle, play }),
    [enabled, toggle, play],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}
