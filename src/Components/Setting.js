import React from 'react';
import '../App.css';
import Header from './Header';
const Setting = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default Setting;
