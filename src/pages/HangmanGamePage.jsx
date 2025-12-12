import { HangmanGameBoard } from "../components/hangman-game/HangmanBoard";
import { loadSettings } from "../logic/settings";
import { PlayerInfoCard } from "../components/rps-game/PlayerInfoCard";
export function HangmanGamePage () {

    const settings = loadSettings();
    
      const playerName = settings?.name || 'Player';
      const playerAvatar = settings?.avatar;


    return (
        <div className="game">
            <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar}/>
            <h2>Hangman</h2>
            <HangmanGameBoard />
        </div>
    );
}