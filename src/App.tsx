import { GameLayout } from './components/GameLayout';
import { HomeScreen } from './games/Home/HomeScreen';
import { WheelGame } from './games/Wheel/WheelGame';
import { CardsGame } from './games/Cards/CardsGame';
import { SoundProvider } from './hooks/SoundProvider';
import { useGameNavigation } from './hooks/useGameNavigation';

function AppShell() {
  const { view, goHome, goWheel, goCards, setView } = useGameNavigation();

  return (
    <GameLayout
      view={view}
      onHome={goHome}
      onNavigate={(next) => setView(next)}
    >
      {view === 'home' && (
        <HomeScreen onWheel={goWheel} onCards={goCards} />
      )}
      {view === 'wheel' && <WheelGame />}
      {view === 'cards' && <CardsGame />}
    </GameLayout>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <AppShell />
    </SoundProvider>
  );
}
