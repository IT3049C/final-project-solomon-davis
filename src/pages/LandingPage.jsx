import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function LandingPage() {
    const [parms, setParms] = useSearchParams();
    const searchGames = (parms.get("search") || "").toLowerCase();

    const searchDevs = (parms.get("search") || "").toLowerCase();
    const developers = [
        {
            key: "daviswk90",
            name: "daviswk90",
            games: ["rps, tic-tac-toe"]
        },

        {
            key: "solomon davis",
            name: "Solomon Davis",
            games: ["wordle"]
        }
    ];

    const games = [
        {
            key: "rps",
            name: "Rock Paper Scissors",
            description: "Play a simple game of Rock Paper Scissors!",
            developer: `${developers.name}`

        },

        {
            key: "tic-tac-toe",
            name: "Tic-Tac-Toe",
            description: "Play a simple game of Tic-Tac-Toe!",
            developer: `${developers.name}`
        },

        {
            key: "wordle",
            name: "Wordle",
            description: "Play an exciting word matching game to test your vocabulary and get the highest score!",
            developer: `${developers.name}`
        },

        {
            //One additional game of my choice
            key: "hangman",
            name: "Hangman",
            description: "Play a game of Hangman, where you have 6 tries to guess each word!",
            developer: `${developers.name}`,
        }
    ];

    {/**filter the listed games based off if the game does equal the search, or change the game name to lowercase and see if it includes the search */}
    const filteredGames = games.filter((game) => (!searchGames) || game.name.toLowerCase().includes(searchGames));

    const filteredDevs = developers.filter((dev) => (!searchDevs) || dev.name.toLowerCase().includes(searchDevs));
    
    return (
        <section>
            <h2>Available Games</h2>
            <p>Choose a game:</p>

            <input 
                id="game-search"
                type="text"
                placeholder="Search games..."
                value={searchGames || searchDevs}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value.trim() === "") {
                        setParms({});
                    } else {
                        setParms({search: value});
                    }
                }} />

            <ul style={{textAlign: "left"}}>
                {filteredGames.map((game) => (
                    <li key={game.key}>
                        <Link to={`/game/${game.key}`}>{game.name}</Link>
                        <p>Description: {game.description}</p>
                        <p>Developed By: {game.developer}</p>
                    </li>
                ))}
            </ul>
        </section>
        )
}