import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './CSS_Recipe.css';

function P_Recipe() {
  const [recipeName, setRecipeName] = useState('');
  const changeRecipeName = (event) => { setRecipeName(event.target.value); };
  const [recipeInstructions, setRecipeInstructions] = useState('Please insert recipe instructions here.');
  const changeRecipeInstructions = (event) => { setRecipeInstructions(event.target.value); };
  const [ingredients, setIngredients] = useState([]);

    const fetchIngredients = () => {
        fetch('http://localhost:5000/api/get-all-ingredients')
            .then(response => response.json())
            .then(data => {
                 console.log('Received data:', data);
                setIngredients(data.categories);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    };


    useEffect(() => {
        //fetchIngredients();
    }, []); 

    useEffect(() => {
        if (ingredients.length > 0) {
            console.log(ingredients[0][0].name);
        }
    }, [ingredients]);

  return (
    <div className="top">
      <h1>insert information</h1>
      <Link to="/stock">Go to the stock page</Link>
      <br></br><br></br>
      <div className="containers">
        <input
          type="text"
          value={recipeName}
          onChange={changeRecipeName}
          placeholder="New recipe name"
        />
        <br></br>
        <textarea value={recipeInstructions} onChange={changeRecipeInstructions} rows="4" cols="50"></textarea>
        <br></br><br></br>










        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
      </div>
      
    </div>
  )
}
export default P_Recipe;
