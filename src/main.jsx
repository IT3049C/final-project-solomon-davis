import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { GameHubLayout } from "./components/GameHubLayout.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { LobbyView } from "./components/UserSettings.jsx"
import { applySavedTheme } from "./utils/theme.js";
import { RPSGamePage } from "./pages/RPSGamePage.jsx";
import { TicTacToePage } from "./pages/TicTacToePage.jsx";
import {ProtectedRoute} from "./components/navigation/ProtectedRoute.jsx";
import { WordleGamePage } from "./pages/WordleGamePage.jsx";
import { HangmanGamePage } from "./pages/HangmanGamePage.jsx";
applySavedTheme();

const router = createHashRouter([
      {
        path: "/",
        element: <GameHubLayout />,
        children: [
          {path: "/", element: <LandingPage />},
          {path: "/settings", element: <LobbyView />},
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
                  <TicTacToePage />
              ),
            },
            {
              path: "/game/wordle",
              element: (
                  <WordleGamePage />
              )
            },
             {
              path: "/game/hangman",
              element: (
                  <HangmanGamePage />
              )
            }
          ],
        },
      ]
    );

createRoot(document.getElementById("root")).render(
  
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
