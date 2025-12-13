/*import { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
*/
import { loadSettings } from "../logic/settings";
import { Game } from "../components/tic-tac-toe-game/TicTacToeBoard";
import { PlayerInfoCard } from "../components/rps-game/PlayerInfoCard";
export function TicTacToePage () {

    const settings = loadSettings();
    
      const playerName = settings?.name || 'Player';
      const playerAvatar = settings?.avatar;


    return (
        <div className="game">
            <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar}/>
            <h2>Tic-Tac-Toe</h2>
            <Game />
        </div>

    );
}