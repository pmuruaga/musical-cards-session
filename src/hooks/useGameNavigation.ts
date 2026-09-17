import { useMemo, useState } from 'react';

export type GameView = 'home' | 'wheel' | 'cards';

export function useGameNavigation(initial: GameView = 'home') {
  const [view, setView] = useState<GameView>(initial);

  return useMemo(
    () => ({
      view,
      goHome: () => setView('home'),
      goWheel: () => setView('wheel'),
      goCards: () => setView('cards'),
      setView,
    }),
    [view],
  );
}
