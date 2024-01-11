import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_RecipeView.css'; 
import './SCSS_RecipeView.scss';

function P_RecipeView() {

    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [checkedState, setCheckedState] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);

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

      const fetchCategories = () => {
        fetch('http://localhost:5000/api/get-categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data.categories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    };
    
    const fetchIngredients = () => {
      fetch('http://localhost:5000/api/get-ingredients')
        .then(response => response.json())
        .then(data => {
          const newCheckedState = {};
          setIngredients(data.ingredients);
          for (let i = 0; i < data.ingredients.length; i++) {
            newCheckedState[data.ingredients[i].id] = false;
          }
          setCheckedState(newCheckedState);
        })
        .catch(error => {
          console.error('Error fetching ingredient categories:', error);
        });
    };
    

    const handleCategoryToggle = (categoryId) => {
      if (selectedCategories.includes(categoryId)) {
          setSelectedCategories((prevSelected) =>
              prevSelected.filter((id) => id !== categoryId)
          );
      } else {
        setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
      }
  };

    const addNewRecipe = () => {

    };

    useEffect(() => {
      fetchRecipes();
      fetchCategories();
      fetchIngredients();
    }, []); 

      return (
        <div className='top-view'>
          <div className="filter">
            <button className="add-recipe" onClick={addNewRecipe}>
              + recipe
            </button>
            <div className="filter-box">
                    <p className="filter-text">filter by category! </p>
                    {categories
                    .filter((category) => category.type === 'recipe')
                    .map((category) => (
                        <div className="choice" key={category.id}>
                            <input 
                                className="check"
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onChange={() => handleCategoryToggle(category.id)}
                            />
                            <label htmlFor={`category-${category.id}`}>
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
          </div>
          <div className="view">
            {recipes
            .filter(
              (recipe) =>
                  selectedCategories.length === 0 ||
                  selectedCategories.includes(recipe.category_id)
            )
            .map((recipe) => (
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
        </div>
      );  
}

export default P_RecipeView;
