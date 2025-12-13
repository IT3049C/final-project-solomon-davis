import '../App.css'
import { applySavedTheme } from '../utils/theme';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './navigation/Navigation';

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

