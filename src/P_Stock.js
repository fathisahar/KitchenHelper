import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_Stock.css'; 
import Select from 'react-select';

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
    const [ingredientCategories, setIngredientCategories] = useState([]);
    const [recipeCategories, setRecipeCategories] = useState([]); 
    const [quantityType, setQuantityType] = useState(''); 
    const [ingredientError, setIngredientError] = useState(false);
    const [ingredientSubmitted, setIngredientSubmitted] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryToModifyError, setCategoryToModifyError] = useState(false);
    const [categoryToModifyNameError, setCategoryToModifyNameError] = useState(false);
    const [modifyCategory, setModifyCategory] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(false);
    const [showDeleteCategory, setShowDeleteCategory] = useState(true);
    const [showModifyCategory, setShowModifyCategory] = useState(true);
    const [showCancelCategory, setShowCancelCategory] = useState(false);
    const [showVerificationModifyCategory, setShowVerificationModifyCategory] = useState(false);
    const [showFirstSubmitModifyCategory, setShowFirstSubmitModifyCategory] = useState(true);
    const [showVerificationDeleteCategory, setShowVerificationDeleteCategory] = useState(false);
    const [showFirstSubmitDeleteCategory, setShowFirstSubmitDeleteCategory] = useState(true);
    const [categoryToModify, setCategoryToModify] = useState('Please select value.');
    const [categoryNewName, setCategoryNewName] = useState('');
    
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
    const changeQuantityType = (event) => { setQuantityType(event.target.value);};
    const changeCategoryToModify = (event) => { setCategoryToModify(event.target.value);};
    const changeCategoryNewName = (event) => { setCategoryNewName(event.target.value);};

    const handleCategorySubmit = () => {
        setCategorySubmitted(true);

        if (nameCategory === '' || categoryType === 'Please select value.') {
            setCategoryError(true);
            console.log('Stopped by empty category field(s).')
            return;
        }
        
        const newCategory = {
            nameCategory: nameCategory.toLowerCase(),
            categoryType: categoryType
        };

        fetch('http://localhost:5000/api/add-category', {
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
            setCategoryIngredient('Please select value.');
            setCategoryRecipe('Please select value.');
            updateDropdowns();
        });
    };
    
    const handleIngredientSubmit = () => {
        setIngredientSubmitted(true);
        if (nameIngredient === '' || quantityIngredient === '' || quantityType === '' || categoryIngredient === 'Please select value.') {
            setIngredientError(true);
            console.log('Stopped by empty ingredient field(s).')
            return;
        }

        const newIngredient = {
            nameIngredient: nameIngredient.toLowerCase(),        
            quantityIngredient: quantityIngredient, 
            quantityType: quantityType,
            categoryIngredient: categoryIngredient
        };

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

        fetch('http://localhost:5000/api/add-recipe', {
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
        fetch('http://localhost:5000/api/get-ingredient-categories')
            .then(response => response.json())
            .then(data => {
                setIngredientCategories(data.categories);
            })
            .catch(error => {
                console.error('Error fetching ingredient categories:', error);
            });
            setCategoryIngredient('Please select value.');
    };

    const fetchRecipeCategories = () => {
        fetch('http://localhost:5000/api/get-recipe-categories')
            .then(response => response.json())
            .then(data => {
                setRecipeCategories(data.categories);
            })
            .catch(error => {
                console.error('Error fetching recipe categories:', error);
            });
            setCategoryRecipe('Please select value.');
    };

    const fetchCategories = () => {
        fetch('http://localhost:5000/api/get-categories')
            .then(response => response.json())
            .then(data => {
                console.log('Received data:', data);
                setCategories(data.categories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
            //setCategories('Please select value.');
    };

    useEffect(() => {
        updateDropdowns();
        setQuantityType('Please select value.');
    }, []); 

    const updateDropdowns = () => {
        fetchIngredientCategories();
        fetchRecipeCategories();
        fetchCategories();
    }

    const handleCategoryDelete = () => {
        setShowModifyCategory(false);
        if (categoryToModify === 'Please select value.') {
            setCategoryToModifyError(true);
            setShowCancelCategory(true);
            setShowDeleteCategory(true);
        } else {
            setDeleteCategory(true);
            setCategoryToModifyError(false);
            setShowDeleteCategory(false);
            setShowCancelCategory(true);
            setShowFirstSubmitDeleteCategory(false);
            setShowVerificationDeleteCategory(true);
        }
        
    }

    const handleCategoryDeleteSubmit = () => {
        const modifiedCategory = {
            categoryToModify: categoryToModify
        }
        fetch('http://localhost:5000/api/delete-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedCategory)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            setCategoryToModify('Please select value.');
            setShowVerificationDeleteCategory(false);
            setShowDeleteCategory(true);
            setShowModifyCategory(true);
            setShowCancelCategory(false);
            updateDropdowns();
        });
    }

    const handleVerificationCategoryDelete = () => {
        setShowVerificationDeleteCategory(true);
        setShowFirstSubmitDeleteCategory(false);
        setShowCancelCategory(true);
    }
    
    const handleCategoryModify = () => {
        if (categoryToModify === 'Please select value.') {
            setCategoryToModifyError(true);
            console.log('Stopped by empty category select.')
            setModifyCategory(false);
            setShowModifyCategory(true);
        } else {
            setCategoryToModifyError(false);
            setShowModifyCategory(false);
            setModifyCategory(true);
        }
        setShowDeleteCategory(false);
        setShowCancelCategory(true);
    }

    const handleCategoryModifySubmit = () => {
        const modifiedCategory = {
            categoryToModify: categoryToModify,
            categoryNewName: categoryNewName
        }
        fetch('http://localhost:5000/api/modift-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedCategory)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            setCategoryToModify('Please select value.');
            setCategoryNewName('New category name')
            updateDropdowns();
        });
    }

    const handleVerificationCategoryModify = () => {
        if (categoryNewName === '') {
            setCategoryToModifyNameError(true);
            console.log('Stopped by empty category select.')
        } else {
            setCategoryToModifyNameError(false);
            setShowVerificationModifyCategory(true);
            setShowFirstSubmitModifyCategory(false);
            setShowCancelCategory(true);
        }
    } 

    const handleCancelCategory = () => {
        setShowDeleteCategory(true);
        setShowModifyCategory(true);
        setShowCancelCategory(false);
        setCategoryToModifyError(false);
        setDeleteCategory(false);
        setModifyCategory(false);
        setShowVerificationModifyCategory(false);
        setCategoryToModify('Please select value.')
    }


    return (
        <div>
            <div className="top">
                <h1>insert information</h1>
                <Link to="/login">Go to the login page</Link>
            </div>
            <div className="row">
                <div className="container">
                    <div className="box">
                        <p>Category</p>
                        <input
                            type="text"
                            value={nameCategory}
                            onChange={changeNameCategory}
                            placeholder="Category"
                        />
                        <select id="choiceBox" value={categoryType} onChange={changeCategoryType}>
                            <option value="Please select value." disabled>
                                Select a type
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
                        <p>Ingredient</p>
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
                        <select id="choiceBox" value={quantityType} onChange={changeQuantityType}>
                            <option value="Please select value." disabled>
                                Select unit
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
                        </select>
                        <select id="choiceBox" value={categoryIngredient} onChange={changeCategoryIngredient}>
                            <option value="Please select value." disabled>
                                Select category
                            </option>
                            {ingredientCategories && ingredientCategories.map((category, index) => (
                            <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {ingredientSubmitted && ingredientError && (
                            <p className="error-message">Please select a value for all fields.</p>
                        )}
                        <button onClick={handleIngredientSubmit}>Submit</button>
                    </div>
                    <div className="box">
                        <p>Recipe</p>
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
                                Select category
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
            <div className="top">
                <h1>modify information</h1>
            </div>
            <div className="row">
                <div className="container">
                    <div className="box">
                        <p>Category</p>
                        <select id="choiceBox" value={categoryToModify} onChange={changeCategoryToModify}>
                            <option value="Please select value." disabled>
                                    Select category
                                </option>
                                {categories && categories.map((category, index) => (
                                <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                        </select>
                        {showModifyCategory && (
                            <div className='nomatter'>
                                <button onClick={handleCategoryModify}>Modify</button>
                            </div>
                        )}
                        {categoryToModifyError && (
                            <p className="error-message">Please select a category to modify.</p>
                        )}
                        {modifyCategory && (
                            <div className="nomatter">
                                <input
                                type="text"
                                value={categoryNewName}
                                onChange={changeCategoryNewName}
                                placeholder="New category name"
                                />
                                {showFirstSubmitModifyCategory && (
                                    <div className="nomatter">
                                        {categoryToModifyNameError && (
                                            <p className="error-message">Please enter a value for the field.</p>
                                        )}
                                        <button onClick={handleVerificationCategoryModify}>Submit</button>
                                    </div>
                                )}
                                {showVerificationModifyCategory && (
                                    <div className="nomatter">
                                        <p>Are you sure you want to modify the category?</p>
                                        <button onClick={handleCategoryModifySubmit}>Submit</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {showDeleteCategory && (
                            <button onClick={handleCategoryDelete}>Delete</button>
                        )}
                        {deleteCategory && (
                            <div className="nomatter">
                                {showFirstSubmitDeleteCategory && (
                                    <button onClick={handleVerificationCategoryDelete}>Submit</button>
                                )}
                                {showVerificationDeleteCategory && (
                                    <div className="nomatter">
                                        <p>Are you sure you want to delete the category?</p>
                                        <button onClick={handleCategoryDeleteSubmit}>Submit</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {showCancelCategory && (
                            <button onClick={handleCancelCategory}>Cancel</button>
                        )}
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
                        <select id="choiceBox" value={quantityType} onChange={changeQuantityType}>
                            <option value="Please select value." disabled>
                                Select unit
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
                        </select>
                        <select id="choiceBox" value={categoryIngredient} onChange={changeCategoryIngredient}>
                            <option value="Please select value." disabled>
                                Select category
                            </option>
                            {ingredientCategories && ingredientCategories.map((category, index) => (
                            <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {ingredientSubmitted && ingredientError && (
                            <p className="error-message">Please select a value for all fields.</p>
                        )}
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
                                Select category
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
        </div>
    );
    
}

export default P_Stock;
