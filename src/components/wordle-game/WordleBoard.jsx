import { config, getRandomWord } from "./WordValidation";
import { checkGuess, isLetter } from "./WordValidation";
import { useEffect } from "react";
import { useState } from "react";
import { shakeRow } from "./AnimateElement";



export function SetupGrid() {
    const [board, setBoard] = useState(
    Array.from({length: config.max_attempts}, () =>
    Array(config.word_length).fill(""))
);
const [currentAttempt, setCurrentAttempt] = useState(0);
const [currentPosition, setCurrentPosition] = useState(0);

function addLetter(letter) {

  if (currentPosition >= config.word_length) return;

  setBoard(prev => {
    const updatedPosition = prev.map(row => [...row]);
    updatedPosition[currentAttempt][currentPosition] = letter;
    return updatedPosition;
  });

  setCurrentPosition(pos => pos + 1);
}

function removeLetter() {
  if (currentPosition > 0) {
    setBoard(prev => {
        const updatedPosition = prev.map(row => [...row]);
        updatedPosition[currentAttempt][currentPosition - 1] = "";
        setCurrentPosition(pos => pos - 1)
        return updatedPosition;
    })
}
}

const [revealResults, setrevealResults] = useState( 
  Array(config.max_attempts).fill(null).map(() => Array(config.word_length).fill(""))
);


async function submitGuess(){
  if (currentPosition < config.word_length) {
    console.error(`Invalid Input`);
    shakeRow(currentAttempt);
    return;
  }

const user_guess = board[currentAttempt].join("");
console.log(user_guess);

const results = await checkGuess(user_guess, targetWord);
console.log(results);

if (!results) {
  setGameMessage(`Not enough letters`);
  shakeRow(currentAttempt);
  return;
}

setrevealResults( prev => {
    const updatedTile = [...prev]
    updatedTile[currentAttempt] = results
    return updatedTile;
});

    
const is_won = results.every((rz) => rz === `correct`);
if (is_won) {
  setGameMessage('Game Over!');
  setGameOver(true);
  return;
}

const nextAttempt = currentAttempt + 1;

const is_lost = nextAttempt >= config.max_attempts;
if (is_lost) {
  setGameMessage('Game Over!');
  setGameOver(true);
  return;
}


function setGameMessage() {
  return
}

function setGameOver() {
  return
}

setCurrentAttempt(nextAttempt);
setCurrentPosition(0);

}

const [targetWord, setTargetWord] = useState("");

useEffect(() => {
    getRandomWord().then(word => setTargetWord(word));
}, []);




function handleKeyDown(e) {
    const key = e.key;
    if (isLetter(key)) { //if key was a letter addLetter
      
      addLetter(key.toLowerCase());
    
    } else if (key == "Backspace") { //if key is backpace removeLetter
      
      removeLetter();
    
    } else if (e.key == "Enter" && currentPosition === config.word_length) { //if key was enter submitGuess
  
      submitGuess();
  
    }
  
    }
    
    useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
        document.removeEventListener("keydown", handleKeyDown);

    };
  }, [])
  
  
  return (
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
                className={`letter ${revealResults[row][col]} flip`}>
            
            {letter}</div>
        ))
        )}
    </div>
      
    )


}
 