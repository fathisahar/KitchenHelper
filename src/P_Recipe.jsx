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
  const [url, setURL] = useState(null);

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
        ingredient_ids: list,
        url: url
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

  const autoStyle = (element, textareaName) => {

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
          <h1 className="title">Insert Information</h1>
            <input
              type="text"
              value={name}
              onChange={changeRecipeName}
              placeholder="New recipe name"
              className="recipe-name"
              onInput={(e) => autoStyle(e.target)}
            ></input>
            <textarea
              value={description}
              onChange={changeDescription}
              placeholder="Please insert short description of recipe"
              rows="2"
              className="description"
              onInput={(e) => autoStyle(e.target)}
            ></textarea>
            <textarea
              value={instructions}
              onChange={changeInstructions}
              placeholder="Please insert instructions for the recipe"
              rows="4"
              className="instructions"
              onInput={(e) => autoStyle(e.target)}
            ></textarea>
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
            <p>
              {Object.entries(checkedState)
              .filter(([ids, isChecked]) => isChecked)
              .map(([ids, isChecked]) => (
                <span key={ids}>
                  Ingredient ID: {ids}, Checked: {isChecked.toString()}<br />
                </span>
              ))}
            </p>
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
