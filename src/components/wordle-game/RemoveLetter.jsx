import { gameState } from "./WordValidation";

export function removeLetter() {
  if (gameState.current_position > 0) {
    gameState.current_position--;
    const cell = document.getElementById(`cell-${game_state.current_attempt}-${game_state.current_position}`);
  if (cell) {
      cell.textContent = ``;
    }
    
  }
}