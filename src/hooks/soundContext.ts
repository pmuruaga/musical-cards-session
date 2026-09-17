import { createContext } from 'react';
import type { SoundName } from './soundTypes';

export type { SoundName } from './soundTypes';

export type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
};

export const SoundContext = createContext<SoundContextValue | null>(null);
