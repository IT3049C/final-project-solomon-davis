import { SetupGrid } from "../components/wordle-game/WordleBoard"
import { ThemeToggle } from "../components/wordle-game/WordleThemeToggle"
import "../components/wordle-game/style.css"

export function WordleGamePage() {
    return (
        <>
        <header>
            <h1 className="animate__animated animate__pulse animate__infinite">Wordle</h1>
            <ThemeToggle />
        </header>
        <main>
        <div id="game">
            <SetupGrid id="wordle-grid"/>
        </div>
        </main>
            
    </>

    )
}
    