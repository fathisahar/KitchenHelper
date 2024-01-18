import React, { useState, useEffect } from 'react';
import './CSS_Stock.css'; 

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
  const [selectedTypes, setSelectedTypes] = useState([]);

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

const handleTypeToggle = (type) => {
  if (selectedTypes.includes(type)) {
    setSelectedTypes((prevSelected) =>
      prevSelected.filter((selectedType) => selectedType !== type)
    );
  } else {
    setSelectedTypes((prevSelected) => [...prevSelected, type]);
  }
};


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="main-section">
      <div className="category-filter">
        <button className="add-category" onClick={addNewCategory}>
            + category
          </button>
          <div className="filter-box">
            <p className="filter-text">filter by type!</p>
            <div className='choice'>
              <input
                className="check"
                type="checkbox"
                id='ingredient'
                checked={selectedTypes.includes('ingredient')}
                onChange={() => handleTypeToggle('ingredient')}
              />
              <label>Ingredient</label>
            </div>
            <div className='choice'>
              <input
                className="check"
                type="checkbox"
                id='recipe'
                checked={selectedTypes.includes('recipe')}
                onChange={() => handleTypeToggle('recipe')}
              />
              <label>Recipe</label>
            </div>
          </div>
      </div>
      <div className="categories-table">
        <div className="category-cards-container">
          {categories
          .filter(
            (category) =>
            selectedTypes.length === 0 ||
            selectedTypes.includes(category.type)
          )
          .map((category, index) => (
            <div className="category-card" key={category.id}>
              <div className="category-info" key={category.id}>
                <div className="left-section">
                  <img className="image" src={category.url} height={200} width={200} />
                </div>
                <div className="right-section-category">
                  <input
                    className="category-name"
                    defaultValue={category.name}
                    onChange={e => handleCategoryChange(index, 'name', e.target.value)}
                  />
                  <select
                    id="choicebox-category"
                    className="choicebox-category"
                    value={category.type || 'Please select value.'}
                    onChange={e => handleCategoryChange(index, 'type', e.target.value)}
                  >
                    <option value="Please select value." disabled>
                      Select a type
                    </option>
                    <option value="ingredient">Ingredient</option>
                    <option value="recipe">Recipe</option>
                  </select>
                  <button className='delete' onClick={() => handleCategoryDelete(category.name)}> delete </button>
                  {modifiedCategory && modifiedCategory.id === category.id && (
                    <div className="verifications">
                      <button className="confirm" onClick={confirmCategoryChange}>Confirm</button>
                      <button className="cancel" onClick={cancelCategoryChange}>Cancel</button>
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

export default Component_CategoryTable;
