import { config, getRandomWord } from "./WordValidation";
import { checkGuess, isLetter } from "./WordValidation";
import { useEffect, useState } from "react";
import { shakeRow } from "./AnimateElement";

export function SetupGrid() {

  const [board, setBoard] = useState(
    Array.from({ length: config.max_attempts }, () =>
      Array(config.word_length).fill("")
    )
  );

  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const [revealResults, setRevealResults] = useState(
    Array.from({ length: config.max_attempts }, () =>
      Array(config.word_length).fill("")
    )
  );

  const [targetWord, setTargetWord] = useState("");
  const [gameMessage, setGameMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);


  function addLetter(letter) {
    if (gameOver) return;
    if (currentPosition >= config.word_length) return;

    setBoard(prev => {
      const updated = prev.map(row => [...row]);
      updated[currentAttempt][currentPosition] = letter;
      return updated;
    });

    setCurrentPosition(position => position + 1);
  }

  function removeLetter() {
    if (gameOver) return;
    if (currentPosition === 0) return;

    setBoard(prev => {
      const updated = prev.map(r => [...r]);
      updated[currentAttempt][currentPosition - 1] = "";
      return updated;
    });

    setCurrentPosition(position => position - 1);
  }

  async function submitGuess() {
    if (gameOver) return;

    if (currentPosition < config.word_length) {
      setGameMessage("Not enough letters");
      shakeRow(currentAttempt);
      return;
    }

    if (!targetWord) return; 

    const user_guess = board[currentAttempt].join("");
    const results = await checkGuess(user_guess, targetWord);

    if (!results) {
      setGameMessage("Invalid Word");
      shakeRow(currentAttempt);
      return;
    }

    // Reveal tile results
    setRevealResults(prev => {
      const updated = prev.map(r => [...r]);
      updated[currentAttempt] = results;
      return updated;
    });

    // Player Win
    if (results.every(row => row === "correct")) {
      setGameMessage("You win!");
      setGameOver(true);
      return;
    }

    const nextAttempt = currentAttempt + 1;

    // Player Lose
    if (nextAttempt >= config.max_attempts) {
      setGameMessage(`Game Over! The word was: ${targetWord}`);
      setGameOver(true);
      return;
    }

    // Continue Searching Words
    setCurrentAttempt(nextAttempt);
    setCurrentPosition(0);
  }

  function handleKeyDown(e) {
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

  //Lock Input
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentPosition, currentAttempt, gameOver]);


  useEffect(() => {
    async function loadWord() {
        
    getRandomWord().then(word => {
    setTargetWord(word);
    console.log("Generated word:", word);
  }
);
    }
    loadWord();
    

}, [])



  return (
    <>
    <div
      id="wordle-grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${config.word_length}, 60px)`
      }}
    >
      {board.map((rowArray, row) =>
        rowArray.map((letter, col) => (
          <div
            key={`${row}-${col}`}
            data-row={row}
            data-col={col}
            className={`letter ${revealResults[row][col]}`}
          >
            {letter}
          </div>
        ))
      )}
    </div>
    <p className="wordle-message">{gameMessage}</p>
    </>
  );
}
