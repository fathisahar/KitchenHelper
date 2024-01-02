import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_RecipeView.css'; 

function P_RecipeView() {

    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = () => {
        fetch('http://localhost:5000/api/get-recipes')
            .then(response => response.json())
            .then(data => {
                setRecipes(data.recipes);
            })
            .catch(error => {
                console.error('Error fetching ingredient categories:', error);
            });
      };

      useEffect(() => {
        fetchRecipes();
      }, []); 

      return (
        <div className="view">
          {recipes.map((recipe) => (
            <div className="card text-center" key={recipe.id}>
              <div className="card-body">
                <div className="card-title">
                  <h5>{recipe.name}</h5>
                </div>
                <div className="seperation">
                    <div className="left">
                    <strong>{recipe.description}</strong>
                    <br></br>
                    <br></br>
                    <p className="card-text">{recipe.instructions}</p>
                    </div>
                    <div className="right">
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );  
}

export default P_RecipeView;
