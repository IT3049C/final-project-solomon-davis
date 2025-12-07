
export function animateElement(element, animation) {
  element.classList.add(`animate__animated`, `animate__${animation}`);
      
 function handleAnimation(){ 
  
          element.classList.remove(`animate__animated`, `animate__${animation}`);
          element.removeEventListener(`animationend`, handleAnimation);

      
        };
        element.addEventListener(`animationend`, handleAnimation);
    }
export function shakeRow(guessAttempt) {
  const rowTiles = document.querySelectorAll(`[data-row="${guessAttempt}"]`);
  rowTiles.forEach(tile => animateElement(tile, `shakeX`)
  );
}