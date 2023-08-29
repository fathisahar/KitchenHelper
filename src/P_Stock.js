import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_Stock.css'; 

function P_Stock() {
    const [nameCategory, setNameCategory] = useState('');
    const [nameIngredient, setNameIngredient] = useState('');
    const [nameRecipe, setNameRecipe] = useState('');
    const [quantityIngredient, setQuantityIngredient] = useState('');
    const [categoryIngredient, setCategoryIngredient] = useState('');
    const [categoryRecipe, setCategoryRecipe] = useState('');
    const [instructionsRecipe, setInstructionsRecipe] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState('');
    const [categoryType, setCategoryType] = useState('Please select value.');
    const [categoryError, setCategoryError] = useState(false);
    const [categorySubmitted, setCategorySubmitted] = useState(false);
    const [ingredientCategories, setIngredientCategories] = useState('');
    const [recipeCategories, setRecipeCategories] = useState('');
    
    //const history = useHistory();

    const changeNameCategory = (event) => { setNameCategory(event.target.value);};
    const changeNameIngredient = (event) => { setNameIngredient(event.target.value);};
    const changeNameRecipe = (event) => { setNameRecipe(event.target.value);};
    const changeQuantityIngredient = (event) => { setQuantityIngredient(event.target.value);};
    const changeCategoryIngredient = (event) => { setCategoryIngredient(event.target.value);};
    const changeCategoryRecipe = (event) => { setCategoryRecipe(event.target.value);};
    const changeInstructionsRecipe = (event) => { setInstructionsRecipe(event.target.value);};
    const changeRecipeIngredients = (event) => { setRecipeIngredients(event.target.value);};
    const changeCategoryType = (event) => { setCategoryType(event.target.value);};

    const handleCategorySubmit = () => {
        setCategorySubmitted(true);

        if (nameCategory === '' || categoryType === 'Please select value.') {
            setCategoryError(true);
            console.log('Stopped by empty category field(s).')
            return;
        }
        
        const newCategory = {
            nameCategory: nameCategory,
            categoryType: categoryType
        };

        fetch('http://localhost:5000/add-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            setCategoryError(false);
            setCategorySubmitted(false);
            setNameCategory('');
            setCategoryType('Please select value.');
            fetchIngredientCategories();
            fetchRecipeCategories();
        });
    };
    
    const handleIngredientSubmit = () => {
        const newIngredient = {
            nameIngredient: nameIngredient,        
            quantityIngredient: quantityIngredient, 
            categoryIngredient: categoryIngredient
        };

        fetch('http://localhost:5000/add-ingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newIngredient)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            setNameIngredient('');
            setQuantityIngredient('');
            setCategoryIngredient('');
        });
    };

    const handleRecipeSubmit = () => {
        const newIngredient = {
            nameRecipe: nameRecipe,        
            instructionsRecipe: instructionsRecipe, 
            categoryRecipe: categoryRecipe,
            recipeIngredients: recipeIngredients

        };

        fetch('http://localhost:5000/add-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newIngredient)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            setNameRecipe('');
            setCategoryRecipe('');
            setInstructionsRecipe('');
        });
    };

    const fetchIngredientCategories = () => {
        fetch('http://localhost:5000/get-ingredient-categories')
            .then(response => response.json())
            .then(data => {
                setIngredientCategories(data.categories);
            })
            .catch(error => {
                console.error('Error fetching ingredient categories:', error);
            });
    };

    const fetchRecipeCategories = () => {
        fetch('http://localhost:5000/get-recipe-categories')
            .then(response => response.json())
            .then(data => {
                setRecipeCategories(data.categories);
            })
            .catch(error => {
                console.error('Error fetching ingredient categories:', error);
            });
    };
    

    useEffect(() => {
        fetchIngredientCategories();
        fetchRecipeCategories();
    }, []); 

    return (
        <div>
            <div className="top">
                <h1>insert information page</h1>
                <Link to="/login">Go to the login page</Link>
            </div>
            <div className="container">
                <div className="box">
                    <input
                        type="text"
                        value={nameCategory}
                        onChange={changeNameCategory}
                        placeholder="Category"
                    />
                    <select id="choiceBox" value={categoryType} onChange={changeCategoryType}>
                        <option value="Please select value." disabled>
                            Select an option
                        </option>
                        <option value="ingredient">Ingredient</option>
                        <option value="recipe">Recipe</option>
                    </select>
                    {categorySubmitted && categoryError && (
                        <p className="error-message">Please select a value for both fields.</p>
                    )}
                    <button onClick={handleCategorySubmit}>Submit</button>
                    <div dangerouslySetInnerHTML={{ __html: ingredientCategories }}></div>
                </div>
                <div className="box">
                    <input
                        type="text"
                        value={nameIngredient}
                        onChange={changeNameIngredient}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={quantityIngredient}
                        onChange={changeQuantityIngredient}
                        placeholder="Quantity"
                    />
                    <select id="choiceBox" value={categoryIngredient} onChange={changeCategoryIngredient}>
                        <option value="Please select value." disabled>
                            Select an option
                        </option>
                        {ingredientCategories && ingredientCategories.map((category, index) => (
                           <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleIngredientSubmit}>Submit</button>
                </div>
                <div className="box">
                    <input
                        type="text"
                        value={nameRecipe}
                        onChange={changeNameRecipe}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={instructionsRecipe}
                        onChange={changeInstructionsRecipe}
                        placeholder="Instructions"
                    />
                    <input
                        type="text"
                        value={recipeIngredients}
                        onChange={changeRecipeIngredients}
                        placeholder="Ingredients"
                    />
                    <select id="choiceBox" value={categoryRecipe} onChange={changeCategoryRecipe}>
                        <option value="Please select value." disabled>
                            Select an option
                        </option>
                        {recipeCategories && recipeCategories.map((category, index) => (
                           <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleRecipeSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
    
}

export default P_Stock;
