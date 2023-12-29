import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './SCSS_Recipe.scss';
import './CSS_Recipe.css'; 

function P_Recipe() {
  const [name, setName] = useState('');
  const changeRecipeName = (event) => { setName(event.target.value); };
  const [instructions, setInstructions] = useState('');
  const [description, setDescription] = useState('');
  const changeInstructions = (event) => { setInstructions(event.target.value); };
  const changeDescription = (event) => { setDescription(event.target.value); };
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState('');
  const changeCategory = (event) => { setCategory(event.target.value); };
  const [categories, setCategories] = useState([]);
  const [ingredientCategories, setIngredientCategories] = useState([]);
  const [checkedState, setCheckedState] = useState({});

  const handleRecipeSubmit = () => {
    const list = [];
    const entries = Object.entries(checkedState);

    for (let i = 0; i < entries.length; i++) {
      if (entries[i][1] !== false) {
        list.push(entries[i][0]);
      }
    }

    const newRecipe = {
        name: name,        
        instructions: instructions, 
        description: description,
        category_id: category,
        ingredient_ids: list
    };

    fetch('http://localhost:5000/api/add-recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); 
        setName('');
        setCategory('');
        setInstructions('');
        setDescription('');
    });
  };

  const fetchIngredientCategories = () => {
    fetch('http://localhost:5000/api/get-ingredient-categories')
        .then(response => response.json())
        .then(data => {
            setIngredientCategories(data.categories);
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

const handleCheckboxChange = (ingredientId) => {
  setCheckedState(prevState => ({
    ...prevState,
    [ingredientId]: !prevState[ingredientId],
  }));
};

    const autoResize = (element, textareaName) => {

      element.style.height = (element.scrollHeight) + 'px';

      const isEmpty = element.value.trim() === '';

      if (isEmpty) {
        element.style.border = '2px solid black';
      } else {
        element.style.border = 'none';
      }
    };

    useEffect(() => {
      fetchIngredients();
      fetchCategories();
    }, []); 

    return (
      <div className="top">
        <div className="background">
          <div className="left-side">
            <section class="performance-facts">
              <header class="performance-facts__header">
                <input
                  type="text"
                  value={name}
                  onChange={changeRecipeName}
                  placeholder="Recipe name"
                  className="recipe-name"
                  onInput={(e) => autoResize(e.target)}
                ></input>
                <textarea
                  value={description}
                  onChange={changeDescription}
                  placeholder="Please insert short description of recipe"
                  rows="1"
                  className="description"
                  onInput={(e) => autoResize(e.target)}
                ></textarea>
              </header>
              <table class="performance-facts__table">
                <thead>
                  <tr>
                    <th colspan="3" class="small-info">
                      Amount Per Serving
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colspan="2">
                      <b>Calories</b>
                      200
                    </th>
                    <td>
                      Calories from Fat
                      130
                    </td>
                  </tr>
                  <tr class="thick-row">
                    <td colspan="3" class="small-info">
                      <b>% Daily Value*</b>
                    </td>
                  </tr>
                  {categories
                  .filter(category => category.type === 'ingredient')
                  .map((category) => (
                <React.Fragment key={category.id}>
                  <tr>
                    <th colSpan="2">
                      <b>{category.name}</b>
                      7mg
                    </th>
                    <td>
                      4%
                    </td>
                  </tr>
                  {ingredients
                    .filter((ingredient) => checkedState[ingredient.id] && category.id === ingredient.category_id)
                    .map((ingredient) => (
                      <tr key={ingredient.id}>
                        <td className="blank-cell"></td>
                        <th>{ingredient.name}</th>
                        <td></td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
              </tbody>
              </table>
              <table class="performance-facts__table--grid">
                <tbody>
                  <tr>
                    <td colspan="2">
                      Vitamin A
                      10%
                    </td>
                    <td>
                      Vitamin C
                      0%
                    </td>
                  </tr>
                  <tr class="thin-end">
                    <td colspan="2">
                      Calcium
                      10%
                    </td>
                    <td>
                      Iron
                      6%
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="small-info">* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs. </p>
              <textarea
              value={instructions}
              onChange={changeInstructions}
              placeholder="Please insert instructions for the recipe"
              rows="4"
              className="instructions"
              onInput={(e) => autoResize(e.target)}
            ></textarea>
          </section>
            <select id="choiceBox" value={category} onChange={changeCategory}>
              <option value="" disabled>
                  Select category
              </option>
              {categories
                  .filter(category => category.type === 'recipe')
                  .map((category) => (
                      <option key={category.id} value={category.id}>
                          {category.name}
                      </option>
                  ))}
            </select>
            <button onClick={handleRecipeSubmit}>Submit</button>
          </div>
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
                              onChange={() => handleCheckboxChange(ingredient.id)}
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
        </div>
      </div>
    );
}
export default P_Recipe;
