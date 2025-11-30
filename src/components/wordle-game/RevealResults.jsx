import { animateElement } from "./AnimateElement";
import { gameState } from "./WordValidation";

export function revealResults(results) {
  const rowToReveal = gameState.current_attempt;
  const delayBetweenTileReveal = 350;
  results.forEach((result, col) => {
    const cell = document.getElementById(`cell-${rowToReveal}-${col}`);
    setTimeout(() => {
      animateElement(cell, `flipInX`);
      cell.classList.add(result);
  }, col * delayBetweenTileReveal);
  });
}