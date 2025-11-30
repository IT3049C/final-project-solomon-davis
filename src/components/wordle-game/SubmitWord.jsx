import { checkGuess, gameState, config } from "./WordValidation";
import { shakeRow } from "./AnimateElement";
import { revealResults } from "./RevealResults";
import { handleKeyDown } from "./HandleKey";

const game_result_paragraph = document.getElementById(`game-result`);

export async function submitGuess(){
  if (gameState.current_position < config.word_length) {
    console.error(`Invalid Input`);
    shakeRow();
    return;
  }

const rowTiles = document.querySelectorAll(`[data-row="${gameState.current_attempt}"]`);
const user_guess = Array.from(rowTiles).map((tile) => {
  return tile.textContent;
}).join("");
console.log(user_guess);

const results = await checkGuess(user_guess);
console.log(results);

if (!results) {
  showMessage(`Invalid Word`);
  shakeRow();
  return;
}

revealResults(results);


const is_won = results.every((rz) => rz === `correct`);
if (is_won) {
  showMessage(`Game Over!`);
  lockInput();
  return;
}

gameState.current_attempt--;
gameState.current_position = 0;

const is_lost = gameState.current_attempt >= config.max_attempts;
if (is_lost) {
  lockInput();
  showMessage(`You Lost`);
}

revealResults()

function showMessage(msg) {
  game_result_paragraph.textContent = msg;
}

function lockInput() {
  document.removeEventListener(`keydown`, handleKeyDown);
}

gameState.current_attempt++;
gameState.current_position = 0;

}