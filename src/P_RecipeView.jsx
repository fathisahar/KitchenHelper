import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_RecipeView.css'; 
import './SCSS_RecipeView.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

function P_RecipeView() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modifiedRecipe, setModifiedRecipe] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    instructions: '',
    description: '',
    category_id: '',
    ingredients: [],
    url: ''
  });
  const [showIngredients, setShowIngredients] = useState(false);
  const [show, setShow] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);

  const fetchRecipes = () => {
    fetch('http://localhost:5000/api/get-recipes')
      .then(response => response.json())
      .then(data => {
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
        console.error('Error fetching ingredients:', error);
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
    setRecipes([{ ...newRecipe }, ...recipes]);
    setModifiedRecipe(true);
    setShowAccordion(true);
    setNewRecipe({
      name: '',
      instructions: '',
      description: '',
      category_id: '',
      ingredients: [],
      url: ''
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

  const changeIngredients = (index, key, value) => {
    if (modifiedRecipe) {
      setModifiedRecipe(null);
    } else {
      const updatedRecipes = [...recipes];
      setModifiedRecipe({ index, key, originalValue: updatedRecipes[index][key], id: updatedRecipes[index].id });
    }

    if (key === 'ingredients') {
      setShowAccordion(!showAccordion);
    }
  };

  const setChecked = (index) => {
    const newCheckedState = {};
    for (let i = 0; i < ingredients.length; i++) {
      if (recipes[index].ingredients.includes(ingredients[i].name)) {
        newCheckedState[ingredients[i].id] = true;
      }
    }
    setCheckedState(newCheckedState);
  };

  const handleCheckboxChange = (ingredientId, index) => {
    const updatedCheckedState = { ...checkedState };
    updatedCheckedState[ingredientId] = !updatedCheckedState[ingredientId];
    setCheckedState(updatedCheckedState);

    const updatedRecipes = [...recipes];
    if (updatedCheckedState[ingredientId]) {
      updatedRecipes[index].ingredients.push(
        ingredients.find((ingredient) => ingredient.id === ingredientId).name
      );
    } else {
      updatedRecipes[index].ingredients = updatedRecipes[index].ingredients.filter(
        (ingredient) => ingredient !== ingredients.find((ingredient) => ingredient.id === ingredientId).name
      );
    }
    setRecipes(updatedRecipes);
  };

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
    fetchIngredients();
  }, []);

  const handleClose = () => {
    setShow(false);
    const newCheckedState = {};
    for (let i = 0; i < ingredients.length; i++) {
      newCheckedState[ingredients[i].id] = false;
    }
    setCheckedState(newCheckedState);
  };

  const handleShow = (index) => {
    setShow(true);
    setChecked(index);
  };

  const confirmRecipeChange = () => {
    setModifiedRecipe(null);
  };

  const cancelRecipeChange = () => {
    setModifiedRecipe(null);
  };

  return (
    <div className='top-view'>
      <div className="filter">
        <button className="add-recipe" onClick={addNewRecipe}>
          + recipe
        </button>
        <div className="filter-box">
          <p className="filter-text">filter by category!</p>
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
                    onChange={(e) => handleRecipeChange(index, 'name', e.target.value)}
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
                  <img className="image" src={recipe.url} height={200} width={200} />
                </div>
                <div className="separation">
                  <div className="left">
                    <input
                      className="recipe-description"
                      value={recipe.description}
                      onChange={(e) => handleRecipeChange(index, 'description', e.target.value)}
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
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                    {showAccordion && modifiedRecipe && modifiedRecipe.id === recipe.id && (
                      <div>
                        <Button bsPrefix='modal-button' variant="primary" onClick={() => handleShow(index)}>
                          edit ingredients!
                        </Button>
                        <Modal scrollable='true' show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>list of all ingredients</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="right-side">
                              <Accordion defaultActiveKey="0" flush>
                                <p className="ingredients-checked">ingredients currently checked</p>
                                <div className="list-ingredients-checked">
                                  {recipes[index].ingredients.map((ingredient, idx) => (
                                    <p key={idx}>{ingredient}</p>
                                  ))}
                                </div>
                                {categories
                                  .filter(category => category.type === 'ingredient')
                                  .map((category, idx) => (
                                    <Accordion.Item eventKey={idx} key={category.id}>
                                      <Accordion.Header bsPrefix='header-modal'>{category.name}</Accordion.Header>
                                      <Accordion.Body>
                                        {ingredients
                                          .filter(ingredient => ingredient.category_id === category.id)
                                          .map(ingredient => (
                                            <div className="list-group" key={ingredient.id}>
                                              <label className="list-group-item">
                                                <input
                                                  className="form-check-input me-1"
                                                  type="checkbox"
                                                  checked={checkedState[ingredient.id]}
                                                  onChange={() => handleCheckboxChange(ingredient.id, index)}
                                                />
                                                {ingredient.name}
                                              </label>
                                            </div>
                                          ))}
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  ))}
                              </Accordion>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" bsPrefix='modal-close' onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" bsPrefix='modal-save' onClick={handleClose}>
                              Save Ingredients
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        {modifiedRecipe && modifiedRecipe.id === recipe.id && (
                          <div>
                            <button className="confirm" onClick={confirmRecipeChange}>Confirm</button>
                            <button className="cancel" onClick={cancelRecipeChange}>Cancel</button>
                          </div>
                        )}
                      </div>
                    )}
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
