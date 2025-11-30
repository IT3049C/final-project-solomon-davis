/*import { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
*/
import { Game } from "../components/tic-tac-toe-game/TicTacToeBoard";
export function TicTacToePage () {

    return (
        <div className="game">
            <h2>Tic-Tac-Toe</h2>
            <Game />
        </div>

    );
}