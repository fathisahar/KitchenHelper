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
    const [ingredientCategories, setIngredientCategories] = useState([]);
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
            setQuantityType('Please select value.');
            setQuantityIngredient('');
            setCategoryIngredient('Please select value.');
            fetchIngredients();
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

    useEffect(() => {
        updateDropdowns();
        setQuantityType('Please select value.');
    }, []); 

    const updateDropdowns = () => {
        fetchIngredientCategories();
        fetchCategories();
        fetchIngredients();
        console.log('Everything fetched.')
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
        fetch('http://localhost:5000/api/modify-category', {
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

    const handleIngredientModify = () => {
        if (ingredientToModify === 'Please select value.'){
            setIngredientModifyError(true);
            setShowIngredientDelete(false);
            setShowIngredientCancel(true);
        } else {
            setIngredientModifyError(false);
            setIngredientModify(true);
            setShowIngredientModify(false);
            setShowIngredientDelete(false);
            setShowIngredientCancel(true);
            setShowIngredientModifyVerification(true);
        }
    }
    
    const handleIngredientDelete = () => {
        if (ingredientToModify === 'Please select value.'){
            setIngredientDeleteError(true);
        } else {
            setIngredientDeleteError(false);
            setShowIngredientCancel(true);
            setIngredientDelete(true);
            setShowIngredientDeleteVerification(true);
            setShowIngredientDelete(false);
            setShowIngredientModify(false);
        }
    }
    
    const handleIngredientModifySubmit = () => {
        const modifiedIngredient = {
            ingredientToModify: ingredientToModify,
            newNameIngredient: newNameIngredient,
            newQuantityIngredient: newQuantityIngredient,
            newQuantityType: newQuantityType,
            newCategoryIngredient: newCategoryIngredient
        }
        fetch('http://localhost:5000/api/modify-ingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedIngredient)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            handleIngredientCancel();
            updateDropdowns();
            setNewNameIngredient('');
            setNewCategoryIngredient('Please select value.');
            setNewQuantityType('Please select value.');
            setNewQuantityIngredient('');
        });
    }

    const handleIngredientDeleteSubmit = () => {
        const modifiedIngredient = {
            ingredientToModify: ingredientToModify
        }
        fetch('http://localhost:5000/api/delete-ingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedIngredient)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            setIngredientToModify('Please select value.');
            setShowIngredientDeleteVerificationSubmit(false);
            setShowIngredientDelete(true);
            setShowIngredientModify(true);
            setShowIngredientCancel(false);
            updateDropdowns();
        });
    }
    

    const handleIngredientModifyVerification = () => {
        setShowIngredientCancel(true);
        setShowIngredientModifyVerificationSubmit(true);
        setShowIngredientModifyVerification(false);
    } 

    const handleIngredientDeleteVerification = () => {
        setShowIngredientCancel(true);
        setShowIngredientDeleteVerification(false);
        setShowIngredientDeleteVerificationSubmit(true);
    } 
    
    const handleIngredientCancel = () => {
        setIngredientToModify('Please select value.')
        setIngredientModifyError(false);
        setIngredientModify(false);
        setShowIngredientModify(true);
        setShowIngredientDelete(true);
        setShowIngredientCancel(false);
        setShowIngredientModifyVerification(false);
        setShowIngredientModifyVerificationSubmit(false);
        setShowIngredientDeleteVerification(false);
        setShowIngredientDeleteVerificationSubmit(false);
        setIngredientDeleteError(false);
    }

    const [ingredientModify, setIngredientModify] = useState(false);
    const [showIngredientModify, setShowIngredientModify] = useState(true);
    const [ingredientDelete, setIngredientDelete] = useState(false);
    const [showIngredientDelete, setShowIngredientDelete] = useState(true);
    const [showIngredientCancel, setShowIngredientCancel] = useState(false);
    const [ingredientModifyError, setIngredientModifyError] = useState(false);
    const [ingredientDeleteError, setIngredientDeleteError] = useState(false);

    const [showIngredientModifyVerification, setShowIngredientModifyVerification] = useState(false);
    const [showIngredientModifyVerificationSubmit, setShowIngredientModifyVerificationSubmit] = useState(false);
    const [showIngredientDeleteVerification, setShowIngredientDeleteVerification] = useState(false);
    const [showIngredientDeleteVerificationSubmit, setShowIngredientDeleteVerificationSubmit] = useState(false);
    const [showIngredientModifySubmit, setShowIngredientModifySubmit] = useState(false);
    const [showIngredientDeleteSubmit, setShowIngredientDeleteSubmit] = useState(false);

    const [newNameIngredient, setNewNameIngredient] = useState('');
    const [newCategoryIngredient, setNewCategoryIngredient] = useState('Please select value.');
    const [newQuantityType, setNewQuantityType] = useState('Please select value.');
    const [newQuantityIngredient, setNewQuantityIngredient] = useState('');
    const [ingredientToModify, setIngredientToModify] = useState('Please select value.');
    const [ingredients, setIngredients] = useState([]);
    const [newNameIngredientPlaceholder, setNewNameIngredientPlaceholder] = useState('Name');
    const [newQuantityIngredientPlaceholder, setNewQuantityIngredientPlaceholder] = useState('Quantity');
    
    const changeNewNameIngredient = (event) => { setNewNameIngredient(event.target.value);};
    const changeNewCategoryIngredient = (event) => { setNewCategoryIngredient(event.target.value);};
    const changeNewQuantityIngredient = (event) => { setNewQuantityIngredient(event.target.value);};
    const changeNewQuantityType = (event) => { setNewQuantityType(event.target.value);};
    
    const changeSelectedIngredient = (event) => {
        const selectedIndex = event.target.value; 
        const selectedIngredient = ingredients[selectedIndex];
        setIngredientToModify(selectedIngredient.id);
        console.log(selectedIngredient);
        setNewNameIngredientPlaceholder(selectedIngredient.name);
        setNewQuantityIngredientPlaceholder(selectedIngredient.stock_quantity);
        setNewQuantityType(selectedIngredient.stock_type)
        setNewCategoryIngredient(selectedIngredient.category_id);
      };
      
    return (
        <div>
            <div className="top">
                <h1>insert information</h1>
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
                            <option value="bag">bag</option>
                        </select>
                        <select id="choiceBox" value={categoryIngredient} onChange={changeCategoryIngredient}>
                            <option value="Please select value." disabled>
                                Select category
                            </option>
                            {categories
                                .filter(category => category.type === 'ingredient')
                                .map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                        {ingredientSubmitted && ingredientError && (
                            <p className="error-message">Please select a value for all fields.</p>
                        )}
                        <button onClick={handleIngredientSubmit}>Submit</button>
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
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {categoryToModifyError && (
                            <p className="error-message">Please select a category to modify.</p>
                        )}
                        {showModifyCategory && (
                            <div className='nomatter'>
                                <button onClick={handleCategoryModify}>Modify</button>
                            </div>
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
                        <p> Ingredient</p>
                        <select id="choiceBox" value={ingredientToModify} onChange={changeSelectedIngredient}>
                            <option value="Please select value." disabled>
                                Select ingredient
                            </option>
                            {ingredients.map((ingredient) => (
                                <option key={ingredient.id} value={ingredient.id}>
                                    {ingredient.name}
                                </option>
                            ))}
                        </select>
                        {ingredientModifyError && (
                            <p className="error-message">Please select a value for the ingredient.</p>
                        )}
                        {showIngredientModify && (
                            <button onClick={handleIngredientModify}>Modify</button>
                        )}
                        {showIngredientDelete && (
                            <button onClick={handleIngredientDelete}>Delete</button>
                        )}
                        {ingredientModify && (
                            <div className="nomatter">
                                <input
                                type="text"
                                value={newNameIngredient}
                                onChange={changeNewNameIngredient}
                                placeholder={newNameIngredientPlaceholder}
                            />
                            <input
                                type="text"
                                value={newQuantityIngredient}
                                onChange={changeNewQuantityIngredient}
                                placeholder={newQuantityIngredientPlaceholder}
                            />
                            <select id="choiceBox" value={newQuantityType} onChange={changeNewQuantityType}>
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
                                <option value="bag">bag</option>
                            </select>
                            <select id="choiceBox" value={newCategoryIngredient} onChange={changeNewCategoryIngredient}>
                                <option value="Please select value." disabled>
                                    Select category
                                </option>
                                {categories
                                    .filter(category => category.type === 'ingredient')
                                    .map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        )}
                        {showIngredientModifyVerification && (
                            <button onClick={handleIngredientModifyVerification}>Submit</button>
                        )}
                        {showIngredientModifyVerificationSubmit && (
                            <div className="nomatter">
                                <p className="verification-message">Are you sure you want to submit to modify?</p>
                                <button onClick={handleIngredientModifySubmit}>Submit</button>
                            </div>
                        )}
                        {showIngredientDeleteVerification && (
                            <button onClick={handleIngredientDeleteVerification}>Submit</button>
                        )}
                        {ingredientDeleteError && (
                            <p className="error-message">Please select a value for the ingredient.</p>
                        )}
                        {showIngredientDeleteVerificationSubmit && (
                            <div className="nomatter">
                                <p className="verification-message">Are you sure you want to submit to delete?</p>
                                <button onClick={handleIngredientDeleteSubmit}>Submit</button>
                            </div>
                        )}
                        {showIngredientCancel && (
                            <button onClick={handleIngredientCancel}>Cancel</button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
    
}

export default P_Stock;
