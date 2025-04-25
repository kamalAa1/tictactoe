import { ThemeProvider } from '@material-tailwind/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { GameContextProvider } from './store/GameContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GameContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </GameContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
