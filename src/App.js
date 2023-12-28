import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import P_Home from './P_Home';
import P_Stock from './P_Stock';
import P_Recipe from './P_Recipe.js';


function App() {
  return (
    <Router>
      <>
        <header>
          <Link to="/">Home</Link>
          <Link to="/stock">Add Stock</Link>
          <Link to="/recipe">Add Recipe</Link>
        </header>

        <Routes>
          <Route path="/" element={<P_Home />} />
          <Route path="/stock" element={<P_Stock />} />
          <Route path="/recipe" element={<P_Recipe />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;
