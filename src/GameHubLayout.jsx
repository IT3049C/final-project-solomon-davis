import './App.css'
import { applySavedTheme } from './utils/theme';
import { useEffect } from 'react';

export function GameHubLayout(){
  useEffect(() => {
    applySavedTheme();
  }, [])

  return (
    <main>
      <header>
      <h1>GameHub</h1>
      <p>Welcome to GameHub</p>
      </header>
      <Navigation />
      <Outlet />
    </main>
  )
}

