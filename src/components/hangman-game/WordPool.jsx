import { useState } from "react";


export function WordPoolArray() {
    const [word, setWord ] = useState("");
    const [guessedLetter, setGuessedLetter] = useState([]);
    const [attemptNum, setAttemptNum] = useState(6)

    const words = [
        {
            id: "1",
            key: "crowbar",
            name: "CROWBAR",
            hint: "Wedged shaped and used as a pry",
        },

        {
            id: "2",
            key: "hydra",
            name: "HYDRA",
            hint: "Multiple headed serpent",
        },

        {
            id: "3",
            key: "chidori",
            name: "CHIDORI",
            hint: "A thousand birds",
        },

        {
            id: "4",
            key: "constellation",
            name: "CONSTELLATION",
            hint: "Pattern arrangement of stars",
        },

        {
            id: "5",
            key: "guitar",
            name: "GUITAR",
            hint: "Musical instrument with 6 strings",
        }
    ];


function getRandomWord () {
        const scrambleIndex = Math.floor(Math.random() * words.length);
        
        const randomWord = words[scrambleIndex].key.toLowerCase();
        setWord(randomWord);
        console.log(word)
        setGuessedLetter([]);
        setAttemptNum(6);
        return randomWord;
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

return {gameLost, gameWon, isValidLetter, getRandomWord, attemptNum, word}
}
