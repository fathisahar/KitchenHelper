import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_RecipeView.css'; 
import './SCSS_RecipeView.scss';

function P_RecipeView() {

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

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modifiedRecipe, setModifiedRecipe] = useState(null);
  const [modifiedURL, setModifiedURL] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: 'name?',
    instructions: 'please give instructions?',
    description: 'description?',
    category_id:'category?',
    ingredients:['please choose ingredients?'],
    url:' ' 
  });

  const [showIngredients, setShowIngredients] = useState(false);

  const addNewRecipe = () => {
    setRecipes([{...newRecipe}, ...recipes]);
    setModifiedRecipe(true);
    setShowAccordion(true);

    setNewRecipe({
      name: ' ',
      instructions: ' ',
      description: ' ',
      category_id:' ',
      ingredients:[],
      url:' ' 
    });
  };

  const handleRecipeChange = (index, key, value) => {
    const updatedRecipes = [...recipes];
    if (!modifiedRecipe || modifiedRecipe.index !== index) {  
      setModifiedRecipe({ index, key, originalValue: updatedRecipes[index][key], id: updatedRecipes[index].id });
    }
    updatedRecipes[index][key] = value;
    setRecipes(updatedRecipes);
  };

  const [showAccordion, setShowAccordion] = useState(false);

  const changeIngredients =  (index, key, value)  => {
    if (modifiedRecipe){
        setModifiedRecipe(null);
    } else {
        const updatedRecipes = [...recipes];
        setModifiedRecipe({ index, key, originalValue: updatedRecipes[index][key], id: updatedRecipes[index].id });
    }

    if (key === 'ingredients'){
      setShowAccordion(!showAccordion)
    }
  };

  const handleCheckboxChange = (ingredientId, index) => {
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
            .map((recipe, index) => (
              <div className="card text-center" key={recipe.id}>
                <div className="card-body">
                  <div className="card-title">
                    <input
                      className="recipe-title"
                      value={recipe.name}
                      onChange={(e) =>handleRecipeChange(index, 'name', e.target.value)}
                    />
                    <select
                      className="recipe-category"
                      value={recipe.category_id}
                      onChange={(e) => handleRecipeChange(index, 'category_id', e.target.value)}
                      >
                      <option value="" disabled>category?</option>
                      {categories
                        .filter(category => category.type === 'recipe')
                        .map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <img className="image" src={recipe.url} height={200} width={200}/>
                  </div>
                  <div className="seperation">
                      <div className="left">
                        <input
                          className="recipe-description"
                          value={recipe.description}
                          onChange={(e) =>handleRecipeChange(index, 'description', e.target.value)}
                        />
                        <textarea
                          value={recipe.instructions}
                          onChange={(e) => handleRecipeChange(index, 'instructions', e.target.value)}
                          placeholder="Please insert instructions for the recipe"
                          rows="4"
                          className="card-text"
                          onInput={(e) => {
                            e.currentTarget.style.height = 'auto';
                            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                          }}
                        ></textarea>
                      </div>
                      <div className="right">
                        <p className="ingredients-title"> ingredients in recipe!</p>
                        <ul className="ingredients-list" onClick={(e) => changeIngredients(index, 'ingredients', e.target.value)}>
                          {recipe.ingredients.map((ingredient) => (
                          <li key={ingredient.id}>{ingredient}</li>
                          ))}
                        </ul>
                        {showAccordion && modifiedRecipe.id === recipe.id &&
                        <div className="right-side">
                        <div className="accordion" id="accordionExample">
                          {categories
                          .filter(category => category.type === 'ingredient')
                          .map((category, index) => (
                            <div className="accordion-item" key={category.id}>
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse${index + 1}`}
                                  aria-expanded="false" 
                                  aria-controls={`collapse${index + 1}`}
                                >
                                  {category.name}
                                </button>
                              </h2>
                              <div
                                id={`collapse${index + 1}`}
                                className="accordion-collapse collapse"
                              >
                                <div className="accordion-body">
                                {ingredients
                                  .filter(ingredient => ingredient.category_id === category.id)
                                  .map(ingredient => (
                                    <div className="list-group" key={ingredient.id}>
                                      <label className="list-group-item">
                                        <input
                                          className="form-check-input me-1"
                                          type="checkbox"
                                          checked={checkedState[ingredient.id]}
                                          onChange={() => handleCheckboxChange(ingredient.id,index)}
                                        />
                                        {ingredient.name}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        </div>
                      }
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
