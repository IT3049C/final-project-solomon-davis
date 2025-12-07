import { PlayerInfoCard } from "../components/rps-game/PlayerInfoCard"
import { SetupGrid } from "../components/wordle-game/WordleBoard"
import { ThemeToggle } from "../components/wordle-game/WordleThemeToggle"
import "../components/wordle-game/style.css"
import { loadSettings } from "../logic/settings"

export function WordleGamePage() {

    const settings = loadSettings();
    const playerName = settings?.name || 'Player';
    const playerAvatar = settings?.avatar;

    return (
        <>
        <header>
            <h1 className="animate__animated animate__pulse animate__infinite">Wordle</h1>
            <ThemeToggle />
        </header>
        <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar}/>
        <main>
        <div id="game">
            <SetupGrid id="wordle-grid"/>
        </div>
        </main>
            
    </>

    )
}
    