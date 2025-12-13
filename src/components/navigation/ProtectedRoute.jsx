import { Navigate, useLocation } from "react-router-dom";
import { loadSettings } from "../../logic/settings";

export function ProtectedRoute({children}) {

    const hasSettings = loadSettings();
    const location = useLocation();

    if (!hasSettings) {{/**If settings are not loaded */}
        {/**Navigate back to the lobby and change the state from the current location pathname to a different one (/lobby)*/}
        return <Navigate to="/settings" state={{from: location.pathname}} replace />;
    }
    {/**Otherwise, go to the directed pathway (/game/rps or /game/tic-tac-toe) and load their elements*/}
    return children;
}