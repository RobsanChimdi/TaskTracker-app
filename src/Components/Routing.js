import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Setting from './Setting';
import About from '../About';

const Routing = ({ theme, setTheme }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting theme={theme} setTheme={setTheme} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default Routing;
