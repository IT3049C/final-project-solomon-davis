import { config } from "./WordValidation";
import { handleKeyDown } from "./HandleKey";
import { useEffect } from "react";

export function SetupGrid() {
  const rows = Array.from({length: config.max_attempts});
  const cols = Array.from({length: config.word_length});

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
        document.removeEventListener("keydown", handleKeyDown);

    }
  })
  
  return (
    <div
        id="wordle-grid"
        style={{
            display: "grid",
            gridTemplateColumns: `repeat(${config.word_length}, 60px)`
        }}
    >
        {rows.map((_, row) =>
        cols.map((_, col) => (
            <div 
                key={`${row}-${col}`}
                className="letter"
                id={`cell-${row}-${col}`}
                data-row={row}
                data-col={col}
            
            />
        ))
        )}
    </div>
      
    )} 