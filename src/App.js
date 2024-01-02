import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import P_Home from './P_Home';
import P_Stock from './P_Stock';
import P_Recipe from './P_Recipe.js';
import P_RecipeView from './P_RecipeView.js';
import './CSS_App.css';


function App() {
  return (
    <Router>
      <>
        <header className="main-header">
          <Link to="/">Home</Link>
          <Link to="/stock">Add Stock</Link>
          <Link to="/recipe">Add Recipe</Link>
          <Link to="/recipes">Recipes</Link>
        </header>

        <Routes>
          <Route path="/" element={<P_Home />} />
          <Route path="/stock" element={<P_Stock />} />
          <Route path="/recipe" element={<P_Recipe />} />
          <Route path="/recipes" element={<P_RecipeView />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;
