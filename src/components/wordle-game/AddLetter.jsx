import { config, gameState } from "./WordValidation";
import { animateElement } from "./AnimateElement";

export function addLetter(letter) {
  if (gameState.current_position < config.word_length) {
    const cell = document.getElementById(`cell-${gameState.current_attempt}-${gameState.current_position}`);
    if (cell) {
      cell.textContent = letter;
      animateElement(cell, `bounceIn`);
    }
    gameState.current_position++;
  }
}