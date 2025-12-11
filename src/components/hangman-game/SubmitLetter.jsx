import { getRandomWord, isValidWord,  } from "../wordle-game/WordValidation";

export function handleKeyDown(e) {
    if (gameOver) return;

    const key = e.key;

    if (isLetter(key)) {
      addLetter(key.toLowerCase());
    } else if (key === "Backspace") {
      removeLetter();
    } else if (key === "Enter" && currentPosition === config.word_length) {
      submitGuess();
    }
  }
