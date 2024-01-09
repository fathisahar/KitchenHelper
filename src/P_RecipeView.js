import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_RecipeView.css'; 
import './SCSS_RecipeView.scss';

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
                  <p>{recipe.name}</p>
                  <img className="image" src={recipe.url} height={200} width={200}/>
                </div>
                <div className="seperation">
                    <div className="left">
                    <p className="recipe-description">{recipe.description}</p>
                    <br></br>
                    <br></br>
                    <p className="card-text">{recipe.instructions}</p>
                    </div>
                    <div className="right">
                      <p className="ingredients-title"> ingredients in recipe!</p>
                    <ul className="ingredients-list">
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
