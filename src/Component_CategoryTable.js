import React, { useState, useEffect } from 'react';

const Component_CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [modifiedCategory, setModifiedCategory] = useState(null);

    const handleCategoryChange = (index, key, value) => {
        const updatedCategories = [...categories];
        if (!modifiedCategory || modifiedCategory.index !== index) {
            setModifiedCategory({ index, key, originalValue: updatedCategories[index][key], id: updatedCategories[index].id });
        }
        updatedCategories[index][key] = value;
        setCategories(updatedCategories);
    };

    const cancelCategoryChange = () => {
        if (modifiedCategory) {
            const { index, key, originalValue } = modifiedCategory;
            const updatedCategories = [...categories];
            updatedCategories[index][key] = originalValue;
            setCategories(updatedCategories);
            setModifiedCategory(null);
        }
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

    const confirmCategoryChange = () => {
        setModifiedCategory(null);
    };

    useEffect(() => {
        fetchCategories();
    }, []); 

    return (
        <div className="category-table">
            <div>
                <button className="add-category">+ category</button>
                <div className="categories-table">
                    {categories.map((category, index) => (
                        <div className="category-element" key={category.id}>
                            <div className="category-info" key={category.id}>
                                <p className="category-id">{category.id}</p>
                                <input className="category-name" defaultValue={category.name} />
                                <select
                                    id="choiceBox"
                                    value={category.type}
                                    onChange={(e) => handleCategoryChange(index, 'type', e.target.value)}
                                >
                                    <option value="Please select value." disabled>
                                        Select a type
                                    </option>
                                    <option value="ingredient">Ingredient</option>
                                    <option value="recipe">Recipe</option>
                                </select>
                                {modifiedCategory && modifiedCategory.id === category.id && (
                                <div className="confirm">
                                    <button onClick={confirmCategoryChange}>Confirm</button>
                                    <button onClick={cancelCategoryChange}>Cancel</button>
                                </div>
                            )}
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Component_CategoryTable;
