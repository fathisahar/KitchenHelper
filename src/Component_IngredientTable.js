import React, { useState , useEffect } from 'react';
import './CSS_Stock.css'; 

const Component_IngredientTable = () => {
    const [ingredients, setIngredients] = useState([]);
    const [modifiedIngredient, setModifiedIngredient] = useState(null);
    const [modifiedURL, setModifiedURL] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [newIngredient, setNewIngredient] = useState({
        name: '',
        stock_quantity: '',
        stock_type: 'Select unit',
        category_id:'',
        url:'' });

    const [isCreating, setIsCreating] = useState(false);
    
    const fetchIngredients = () => {
    fetch('http://localhost:5000/api/get-ingredients')
        .then(response => response.json())
        .then(data => {
            setIngredients(data.ingredients);
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

    const handleIngredientChange = (index, key, value) => {
        const updatedIngredients = [...ingredients];
        if (!modifiedIngredient || modifiedIngredient.index !== index) {
            setModifiedIngredient({ index, key, originalValue: updatedIngredients[index][key], id: updatedIngredients[index].id });
        }
        updatedIngredients[index][key] = value;
        setIngredients(updatedIngredients);
    };

    const cancelIngredientChange = () => {
        if (modifiedIngredient) {
            if (!isCreating){
                const { index, key, originalValue } = modifiedIngredient;
                const updatedIngredients = [...ingredients];
                updatedIngredients[index][key] = originalValue;
                setIngredients(updatedIngredients);
                setModifiedIngredient(null);
            } else {
                ingredients.shift();
                setIsCreating(false);
            }
        }
    };

    const addNewIngredient = () => {
        setIngredients([{ ...newIngredient },...ingredients]);
        setIsCreating(true);
        setModifiedIngredient(true);
        setModifiedURL(true);
        setNewIngredient({
            name: '',
            stock_quantity: '',
            stock_type: 'Select unit',
            category_id:'',
            url:''
            });
    };

const increment = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].stock_quantity++;
    setIngredients(updatedIngredients);
    const updatedIngredient = updatedIngredients[index];
  
    updateQuantity(updatedIngredient.id, updatedIngredient.stock_quantity);
  };
  
  const decrement = (index) => {
    const updatedIngredients = [...ingredients];
    if (updatedIngredients[index].stock_quantity > 0){
        updatedIngredients[index].stock_quantity--;
        setIngredients(updatedIngredients);
        const updatedIngredient = updatedIngredients[index];
        updateQuantity(updatedIngredient.id, updatedIngredient.stock_quantity);
    }
  };
  
  const updateQuantity = (ingredientId, newQuantity) => {
    fetch(`http://localhost:5000/api/update-ingredient-quantity/${ingredientId}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            fetchIngredients();
        })
        .catch(error => {
            console.error('Error updating ingredient quantity:', error);
        });
    };

    const confirmIngredientChange = () => {
        setModifiedIngredient(null);
    
        const updatedIngredient = ingredients[modifiedIngredient.index];
    
        const newIngredient = {
            id: updatedIngredient.id,
            name: updatedIngredient.name.toLowerCase(),
            quantity: updatedIngredient.stock_quantity,
            type: updatedIngredient.stock_type,
            category: updatedIngredient.category_id,
            url: updatedIngredient.url
        };
    
        if (isCreating){
            fetch('http://localhost:5000/api/add-ingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newIngredient)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message); 
                fetchIngredients();
            });
        } else {
            fetch('http://localhost:5000/api/modify-ingredient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newIngredient)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message); 
                fetchIngredients();
            });
        };
    }

    const handleIngredientDelete = (ingredientName) => {
        const ingredient = {
            name: ingredientName
          };
        fetch('http://localhost:5000/api/delete-ingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredient)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            fetchIngredients();
        });
    }

    const handleCategoryToggle = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories((prevSelected) =>
                prevSelected.filter((id) => id !== categoryId)
            );
        } else {
          setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
        }
    };

    
    const changeURL =  (index, key, value)  => {
        if (modifiedURL){
            setModifiedURL(null);
        } else {
            const updatedIngredients = [...ingredients];
            setModifiedURL({ index, key, originalValue: updatedIngredients[index][key], id: updatedIngredients[index].id });
        }
    };


    const updateURL = (ingredientId, newURL) => {
        fetch(`http://localhost:5000/api/update-url/${ingredientId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newURL),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchIngredients();
            })
            .catch(error => {
                console.error('Error updating ingredient quantity:', error);
            });
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
        <div className="main-section">
            <div className="category-filter">
                <button className="add-ingredient" onClick={addNewIngredient}>
                    + ingredient
                </button>
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
            <div className="ingredients-table">
                <div className="ingredient-cards-container">
                    {ingredients
                    .filter(
                        (ingredient) =>
                            selectedCategories.length === 0 ||
                            selectedCategories.includes(ingredient.category_id)
                    )
                    .map((ingredient, index) => (
                        <div className="ingredient-card" key={ingredient.id}>
                            <div className="ingredient-info" key={ingredient.id}>
                                <div className="left-section">
                                    <img className="image" src={ingredient.url} height={200} width={200} onClick={(e) => changeURL(index, 'url', e.target.value)}/>
                                    {modifiedURL && modifiedURL.id === ingredient.id &&
                                        <input
                                            className="ingredient-url"
                                            placeholder='url?'
                                            value={ingredient.url}
                                            onInput={(e) => autoStyle(e.target)}
                                        />
                                    }
                                </div>
                                <div className="right-section">
                                    <input
                                        className="ingredient-name"
                                        value={ingredient.name}
                                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                    />
                                    <div className="quantity-section">
                                        <p className="title-card"> 1) quantity and unit</p>
                                        <input
                                            className="ingredient-quantity"
                                            value={ingredient.stock_quantity}
                                            onChange={(e) => handleIngredientChange(index, 'stock_quantity', e.target.value)}
                                        />
                                        <button className='increment' onClick={() => increment(index)}>+</button>
                                        <button className='decrement' onClick={() => decrement(index)}>-</button>
                                        <select
                                            className="ingredient-stock-type"
                                            value={ingredient.stock_type}
                                            onChange={(e) => handleIngredientChange(index, 'stock_type', e.target.value)}
                                        >
                                            <option>
                                                unit?
                                            </option>
                                            <option value="grams">g </option>
                                            <option value="miligrams">mg</option>
                                            <option value="kilograms">kg</option>
                                            <option value="pound">lb</option>
                                            <option value="ounces">oz</option>
                                            <option value="militers">ml</option>
                                            <option value="liters">L</option>
                                            <option value="units">units</option>
                                            <option value="cloves">cloves</option>
                                            <option value="leaves">leaves</option>
                                            <option value="teaspoon">tsp</option>
                                            <option value="tablespoon">tbsp</option>
                                            <option value="bag">bag</option>
                                        </select>
                                    </div>
                                    <p className="title-card"> 2) category</p>
                                    <select
                                        className="ingredient-category"
                                        value={ingredient.category_id}
                                        onChange={(e) => handleIngredientChange(index, 'category_id', e.target.value)}
                                    >
                                        <option value="" disabled>category?</option>
                                        {categories
                                            .filter(category => category.type === 'ingredient')
                                            .map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                    </select>
                                    <button className='delete' onClick={() => handleIngredientDelete(ingredient.name)}> delete </button>
                                    {modifiedIngredient && modifiedIngredient.id === ingredient.id && (
                                        <div className="verifications">
                                            <button className="confirm" onClick={confirmIngredientChange}>Confirm</button>
                                            <button className="cancel" onClick={cancelIngredientChange}>Cancel</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );  
};

  
export default Component_IngredientTable;
