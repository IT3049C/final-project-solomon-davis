import { useState } from "react";
import { words } from "./WordPool";
import { RevealStickFigure } from "./HealthHUD";
export function HangmanGameBoard() {

const [word, setWord ] = useState("");
    const [hint, setHint] = useState("");
    const [guessedLetter, setGuessedLetter] = useState([]);
    const [attemptNum, setAttemptNum] = useState(6)
     const [showHint, setShowHint] = useState(false)


function getRandomWord () {
        const scrambleIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[scrambleIndex].key.toLowerCase();
        const randomWordHint = words[scrambleIndex].hint;

        setWord(randomWord);
        console.log(randomWord)
        setHint(randomWordHint)
        setGuessedLetter([]);
        setAttemptNum(6);
        return [randomWord, randomWordHint]
    }

function isValidLetter(letter) {
    
    if (!/^[a-z]$/.test(letter)) return false;
  
    if (guessedLetter.includes(letter)) return false;
    setGuessedLetter(prevPosition => [...prevPosition, letter]);
    
    if (!word.includes(letter)) {
        setAttemptNum(numAttempts => numAttempts - 1);
        return false;
    }
    return true;
}

function gameWon() {
    return word && word.split("").every(letter => guessedLetter.includes(letter));
    //game one when every letter in the randomized word is the same as the guessed letter and match the position 
}

function gameLost () {
    return attemptNum <= 0 //Game lost if the number of attempts is less than 0
}


const displayWord = word.split("").map(letter => (guessedLetter.includes(letter) ? letter : "_")).join(" ");

function LetterKeyboard( {guessedLetters, onGuess}) {
   const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
  return (
    <div 
    className="letter-keyboard">
    {alphabetArray.map(letter => (
      <button 
        key={letter}
        className="letter-button"
        onClick={() => onGuess(letter)}
        disabled={guessedLetters.includes(letter)}
      >
        {letter.toUpperCase()}
      </button>
    ))}
    </div>
  );
}


return (
    <div className="start-button">
        <button onClick={getRandomWord}>Start Game</button>
        {word && (
            <button 
            className="hint-button"
            onClick={() => setShowHint(true)}
            
            >Click To See Hint</button>
        ) }
        {showHint && <p className="hint">{hint}</p>}
        <RevealStickFigure />
        <h1 className="hangman-board">
            {displayWord.toUpperCase()}
        </h1>
        <p className="attempts-section">Number Of Attempts: {attemptNum}</p>
        <LetterKeyboard 
            guessedLetters={guessedLetter}
            onGuess={(letter) => isValidLetter (letter)} 
        />
        <h2 
            className="display-won"
            display={"hidden"}


        >😊 You Win! The word was: {word}</h2>
        {gameLost && <h2 className="display-lost">🚫 You Lost! The word was: {word}</h2>}
    </div>
);
}
