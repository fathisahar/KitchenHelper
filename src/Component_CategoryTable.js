import React, { useState, useEffect } from 'react';

const Component_CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [modifiedCategory, setModifiedCategory] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: '',
  });
  const [isCreating, setIsCreating] = useState(false);

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

  const handleCategoryChange = (index, key, value) => {
    const updatedCategories = [...categories];
    if (!modifiedCategory || modifiedCategory.index !== index) {
      setModifiedCategory({
        index,
        key,
        originalValue: updatedCategories[index][key],
        id: updatedCategories[index].id,
      });
    }
    updatedCategories[index][key] = value;
    setCategories(updatedCategories);
  };

  const cancelCategoryChange = () => {
    if (modifiedCategory) {
      if (!isCreating) {
        const { index, key, originalValue } = modifiedCategory;
        const updatedCategories = [...categories];
        updatedCategories[index][key] = originalValue;
        setCategories(updatedCategories);
        setModifiedCategory(null);
      } else {
        categories.shift();
        setIsCreating(false);
      }
    }
  };

  const addNewCategory = () => {
    const tempCategories = [
      {...newCategory}, ...categories];
    setCategories(tempCategories);
    setIsCreating(true);
    setModifiedCategory(true);
    setNewCategory({
      name: '',
      type: '',
    });
  };

  const confirmCategoryChange = () => {
    setModifiedCategory(null);

    const updatedCategory = categories[modifiedCategory.index];

    const newCategory = {
      name: updatedCategory.name.toLowerCase(),
      type: updatedCategory.type,
    };

    if (isCreating){
        fetch('http://localhost:5000/api/add-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchCategories();
            })
            .catch(error => {
                console.error('Error adding category:', error);
        });
    } else {
        fetch('http://localhost:5000/api/modify-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            fetchCategories();
        });
    }
  };

  const handleCategoryDelete = (categoryName) => {
    const category = {
        name: categoryName
      };
    fetch('http://localhost:5000/api/delete-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); 
        fetchCategories();
    });
}

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-table">
      <div>
        <button className="add-category" onClick={addNewCategory}>
          + category
        </button>
        <div className="categories-table">
          {categories.map((category, index) => (
            <div className="category-element" key={category.id}>
              <div className="category-info" key={category.id}>
                <p className="category-id">{category.id}</p>
                <input
                  className="category-name"
                  defaultValue={category.name}
                  onChange={e => handleCategoryChange(index, 'name', e.target.value)}
                />
                <select
                  id="choiceBox"
                  value={category.type || 'Please select value.'}
                  onChange={e => handleCategoryChange(index, 'type', e.target.value)}
                >
                  <option value="Please select value." disabled>
                    Select a type
                  </option>
                  <option value="ingredient">Ingredient</option>
                  <option value="recipe">Recipe</option>
                </select>
                <button className='delete' onClick={() => handleCategoryDelete(category.name)}>X</button>
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
