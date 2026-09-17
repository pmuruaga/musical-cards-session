import { useContext } from 'react';
import { SoundContext } from './soundContext';

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error('useSound must be used within SoundProvider');
  }
  return ctx;
}
