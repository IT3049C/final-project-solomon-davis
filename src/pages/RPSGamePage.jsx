import { GameSection } from "../components/rps-game/GameSection";
import { HighScoresSection } from "../components/rps-game/HighScoresSection";
import { PlayerInfoCard } from "../components/rps-game/PlayerInfoCard";
import { loadSettings } from "../logic/settings";

{/**RPS now manages its own settings 
    Uses loadSetting() to directly load from localStorage
    Do not need to nest it in a router component

    This approach is "self-contained", as RPSGamePage handles its own data needs
    and works as a substitute for the Router component.
    It is more optizmized, allowing for less code and faster processing
  */}
export function RPSGamePage() {
  const settings = loadSettings();

  const playerName = settings?.name || 'Player';
  const playerAvatar = settings?.avatar;
  const difficulty = settings?.difficulty || 'normal';

  const handleBackToSettings = () => {
    console.log(`going back to the settings view`);
  };
  console.log(playerAvatar);
  return (
    <main>
      <header>
        <h2>Rock Paper Scissors</h2>
        <nav>
          <a onClick={handleBackToSettings} className="nav-link">
            ← Back to Settings
          </a>
        </nav>
      </header>
      <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar} />
      <GameSection difficulty={difficulty} />
      <HighScoresSection />
    </main>
  );
}
