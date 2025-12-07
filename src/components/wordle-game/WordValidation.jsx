export const config = {
  max_attempts: 6,
  word_length: 5
};

export const gameState = {
  current_attempt: 0,
  current_position: 0,
  target_word: "",
};



export async function getRandomWord() {
  const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${config.word_length}`);

  const data = await response.json();
  return data[0];
}

 export async function checkGuess(guess, targetWord) {
  const is_Valid = await isValidWord(guess.toLowerCase());
  if (!is_Valid) {
    return Array(config.word_length).fill("incorrect");
  }



  const target_letters = targetWord.toLowerCase().split("");
  const guess_letters = guess.toLowerCase().split("");

  return guess_letters.map((letter, index) => {
    if (letter === target_letters[index]) {
      return `correct`;
  
  } else if (target_letters.includes(letter)) {
      return `misplaced`;

  } else {

      return `incorrect`;
  }
  })
}

export async function isValidWord(word) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

  return response.ok;

}

export function isLetter(letter){
  const symbolArray = [',', '.', '/', `\\`, `'`, ';']
  if (letter != symbolArray) {
  return letter.length ==
   1 && /[a-z]/i.test(letter);
  }

}