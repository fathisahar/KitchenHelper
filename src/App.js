import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import P_Home from './P_Home.jsx';
import P_Ingredients from './P_Ingredients.jsx';
import P_Categories from './P_Categories.jsx';
import P_RecipeView from './P_RecipeView.jsx';
import './CSS_App.css';

function App() {
  return (
    <Router>
      <div className="main-screen">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"/>
        <nav className="main-nav">
        <Link to="/" className="header"> Home </Link>
        <Link to="/ingredients" className="header" > Ingredients </Link>
        <Link to="/categories" className="header"> Categories </Link>
        <Link to="/recipes" className="header"> Recipes </Link>
      </nav>
        <div className="content-nav">
          <Routes>
            <Route path="/" element={<P_Home />} />
            <Route path="/ingredients" element={<P_Ingredients />} />
            <Route path="/categories" element={<P_Categories />} />
            <Route path="/recipes" element={<P_RecipeView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
