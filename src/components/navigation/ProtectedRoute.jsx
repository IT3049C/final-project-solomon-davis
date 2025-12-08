import { Navigate, useLocation } from "react-router-dom";
import { loadSettings } from "../../logic/settings";
import { useState, useEffect } from "react";

export function ProtectedRoute({children}) {

    const [hasSettings, setSettings] = useState(() =>loadSettings());
    const location = useLocation();

    useEffect(() => {
        const settingsSync = () => {
            setSettings(loadSettings());
        };

        window.addEventListener("storage", settingsSync);
            return () => window.removeEventListener("storage", settingsSync);
        }, []
    );

    if (children === !hasSettings) {{/**If settings are not loaded */}
        {/**Navigate back to the lobby and change the state from the current location pathname to a different one (/lobby)*/}
        return (
            <>
        <h3>Settings Not Saved</h3>
        <Navigate to="/settings" state={{from: location.pathname}} replace /> 
            </>
    );
    }
    {/**Otherwise, go to the directed pathway (/game/rps or /game/tic-tac-toe) and load their elements*/}
    return children;
}