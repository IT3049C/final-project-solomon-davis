import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GameHubLayout } from "./components/GameHubLayout.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { LobbyView } from "./components/Lobby.jsx"
import { applySavedTheme } from "./utils/theme.js";
import { RPSGamePage } from "./pages/RPSGamePage.jsx";
import { TicTacToePage } from "./pages/TicTacToePage.jsx";
import {ProtectedRoute} from "./components/navigation/ProtectedRoute.jsx";

applySavedTheme();

const router = createBrowserRouter([
      {
        path: "/",
        element: <GameHubLayout />,
        children: [
          {path: "/", element: <LandingPage />},
          {path: "/lobby", element: <LobbyView />},
          {
            path: "/game/rps",
            element: (
              <ProtectedRoute>
                <RPSGamePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/game/tic-tac-toe",
            element: (
              <ProtectedRoute> 
                  <TicTacToePage />
              </ProtectedRoute>
              ),
            },
          ],
        },
      ]
    );

createRoot(document.getElementById("root")).render(
  
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
