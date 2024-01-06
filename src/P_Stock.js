import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './CSS_Stock.css'; 
import Component_IngredientTable from './Component_IngredientTable'; 
import Component_CategoryTable from './Component_CategoryTable';

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

    const Select = ({ id, value, onChange, options, defaultOption }) => (
        <select id={id} value={value} onChange={onChange}>
            {defaultOption && (
                <option value={defaultOption.value} disabled={defaultOption.disabled}>
                    {defaultOption.label}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );

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
        });
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
            updateDropdowns();
        });
    }



    const [newNameIngredient, setNewNameIngredient] = useState('');
    const [newCategoryIngredient, setNewCategoryIngredient] = useState('Please select value.');
    const [newQuantityType, setNewQuantityType] = useState('Please select value.');
    const [newQuantityIngredient, setNewQuantityIngredient] = useState('');
    const [ingredientToModify, setIngredientToModify] = useState('Please select value.');
    const [ingredients, setIngredients] = useState([]);
    const [newNameIngredientPlaceholder, setNewNameIngredientPlaceholder] = useState('Name');
    const [newQuantityIngredientPlaceholder, setNewQuantityIngredientPlaceholder] = useState('Quantity');
    
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
            <div className="row">
                <div>
                    <Component_IngredientTable />
                </div>
                <div>
                    <Component_CategoryTable />
                </div>
            </div>
        </div>
    );
    
}

export default P_Stock;
