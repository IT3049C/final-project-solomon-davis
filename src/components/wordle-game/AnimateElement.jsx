import { gameState } from "./WordValidation";

export function animateElement(element, animation) {
  element.classList.add(`animate__animated`, `animate__${animation}`);
      element.addEventListener(`animationend`, () => {
          element.classList.remove(`animate__animated`, `animate__${animation}`);
        
      
        });
    }

export function shakeRow() {
  const rowTiles = document.querySelectorAll(`[data-row="${gameState.current_attempt}"]`);
  rowTiles.forEach(tile => {
    animateElement(tile, `shakeX`);
  });
}