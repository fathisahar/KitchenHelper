import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_Stock.css'; 

function P_CreateUser() {
    const [nameCategory, setNameCategory] = useState('');
    const [nameIngredient, setNameIngredient] = useState('');
    const [nameRecipe, setNameRecipe] = useState('');
    const [quantityIngredient, setQuantityIngredient] = useState('');
    const [categoryIngredient, setCategoryIngredient] = useState('');
    const [categoryRecipe, setCategoryRecipe] = useState('');
    const [instructionsRecipe, setInstructionsRecipe] = useState('');

    //const history = useHistory();

    const changeNameCategory = (event) => { setNameCategory(event.target.value);};
    const changeNameIngredient = (event) => { setNameIngredient(event.target.value);};
    const changeNameRecipe = (event) => { setNameRecipe(event.target.value);};
    const changeQuantityIngredient = (event) => { setQuantityIngredient(event.target.value);};
    const changeCategoryIngredient = (event) => { setCategoryIngredient(event.target.value);};
    const changeCategoryRecipe = (event) => { setCategoryRecipe(event.target.value);};
    const changeInstructionsRecipe = (event) => { setInstructionsRecipe(event.target.value);};


    const handleCategorySubmit = () => {
        const newCategory = {
            nameCategory: nameCategory
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
            //history.push('/success'); // Redirect to success page
            setNameCategory('');
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
            categoryRecipe: categoryRecipe
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
                    <button onClick={handleCategorySubmit}>Submit</button>
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
                    <input
                        type="text"
                        value={categoryIngredient}
                        onChange={changeCategoryIngredient}
                        placeholder="Category"
                    />
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
                        value={categoryRecipe}
                        onChange={changeCategoryRecipe}
                        placeholder="Category"
                    />
                    <button onClick={handleRecipeSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
    
}

export default P_CreateUser;
