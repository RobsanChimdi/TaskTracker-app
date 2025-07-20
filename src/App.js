import React, { useState, useEffect } from 'react';
import Routing from './Components/Routing';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <Routing theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
