import React, { useState, useEffect } from 'react';
import './CSS_App.css';

function P_Home(){

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
        setSelectedCategories((prevSelected) =>
            prevSelected.filter((id) => id !== categoryId)
        );
    } else {
        setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
    }
  };

  const fetchRecipes = () => {
    fetch('http://localhost:5000/api/get-possible-recipes')
      .then(response => response.json())
      .then(data => {
        console.log(data.recipes);
        setRecipes(data.recipes);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
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

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>welcome to the home page</h1>
      <div className='scene'>
        <div className="category-filter">
            <div className="filter-box">
                <p className="filter-text">filter by category! </p>
                {categories
                .filter((category) => category.type === 'ingredient')
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
      <div className='recipes'>
        {recipes
          .filter(
              (recipe) =>
                  selectedCategories.length === 0 ||
                  selectedCategories.includes(recipe.category_id)
          )
          .map((recipe, index) => (
        <div className="card text-center" key={recipe.id}>
          <div className="card-body">
            <div className="card-title">
              <input
                className="recipe-title"
                value={recipe.name}
                readOnly
              />
              <select
                className="recipe-category"
                value={recipe.category_id}
                readOnly
              >
                {categories
                  .filter(category => category.id === recipe.category_id)
                  .map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              <img className="image" src={recipe.url} height={200} width={200} alt={recipe.name} />
            </div>
            <div className="content">
              <div className="separation">
                <div className="left">
                  <input
                    className="recipe-description"
                    value={recipe.description}
                    readOnly
                  />
                  <textarea
                    value={recipe.instructions}
                    rows="4"
                    className="card-text"
                    readOnly
                  ></textarea>
                </div>
                <div className="right">
                  <p className="ingredients-title">ingredients in recipe!</p>
                  <ul className="ingredients-list">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
  );
}

export default P_Home;
