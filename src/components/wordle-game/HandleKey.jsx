import { addLetter } from "./AddLetter";
import { removeLetter } from "./RemoveLetter";
import { submitGuess } from "./SubmitWord";
import { isLetter } from "./WordValidation";

export function handleKeyDown(e) {
  const key = e.key;
  if (isLetter(key)) { //if key was a letter addLetter
    
    addLetter(key.toLowerCase());
  
  } else if (key == "Backspace") { //if key is backpace removeLetter
    
    removeLetter();
  
  } else if (e.key == "Enter") { //if key was enter submitGuess

    submitGuess();

  }

  }