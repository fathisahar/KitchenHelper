import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import P_Home from './P_Home';
import P_Ingredients from './P_Ingredients';
import P_Recipe from './P_Recipe.js';
import P_Categories from './P_Categories.js';
import P_RecipeView from './P_RecipeView.js';
import './CSS_App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"/>
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/ingredients">Ingredients</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/recipe">Add Recipe</Link>
          <Link to="/recipes">Recipes</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<P_Home />} />
            <Route path="/ingredients" element={<P_Ingredients />} />
            <Route path="/categories" element={<P_Categories />} />
            <Route path="/recipe" element={<P_Recipe />} />
            <Route path="/recipes" element={<P_RecipeView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
