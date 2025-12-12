import {NavLink, useNavigate} from "react-router-dom";
import { loadSettings } from "../../logic/settings";

export function Navigation() {
    const navigate = useNavigate();
    const settings = loadSettings();


    const handleLogout = () => {
        {/**Remove the game settings from local storage */}
        localStorage.removeItem(`game.settings`);
        {/**Navigate back to the homepage */}
        navigate(`/`);
    };

    return (
        <nav>
            <NavLink to="/">Home 🎮</NavLink>
            {' | '}
            <NavLink to="/game/rps">Rock Paper Scissors 🪨📄✂️</NavLink>
            {' | '}
            <NavLink to="/game/tic-tac-toe">Tic Tac Toe ✖️⭕</NavLink>
            {' | '}
            <NavLink to="/game/wordle">Wordle 🔠</NavLink>
            {' | '}
            <NavLink to="/game/hangman">Hangman 🧍‍♂️</NavLink>
            {' | '}
            <NavLink to="/settings">Settings ⚙️</NavLink>

            {/**settings and a name */}
            {settings && settings.name && (
                <div>
                    {/**Show logged in users name */}
                    <span>Hello, {settings.name}</span>
                    {/**On clicking the logout button, handle the logout, clear settings and redirect to home */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    );
}