import { useState } from "react";

export function ThemeToggle() {
    const [isLightMode, setIsLightMode] = useState(false);

    function handleThemeToggle() {
        setIsLightMode(prev => !prev)
        document.body.classList.toggle("light-mode")
        console.log("clicked");
    }
    return (
        <button 
            id="mode-toggle"
            onClick={handleThemeToggle}
        >{isLightMode ? "🌙" : "☀️"}
        </button>
    )
}