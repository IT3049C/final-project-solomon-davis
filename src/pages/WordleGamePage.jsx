import { WordleBoard } from "../components/wordle-game/WordleBoard"
import { RevealResults } from "../components/wordle-game/RevealResults"
import { ThemeToggle } from "../components/wordle-game/WordleThemeToggle"
import "..components/wordle-game/styles.css"

export function WordleGamePage() {
    return (
        <>
        <header>
            <h1 className="animate__animated animate__pulse animate__infinite">Wordle</h1>
            <ThemeToggle />
        </header>
        <main>
        <div id="game">
            <RevealResults id="game-result"/>
            <WordleBoard id="wordle-grid"/>
        </div>
        </main>
            
    </>

    )
}
    