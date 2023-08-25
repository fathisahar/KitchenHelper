import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function P_CreateUser() {
    const [category, setCategory] = useState('');
    //const history = useHistory();

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmit = () => {
        const newCategory = {
            category: category
        };

        // Send POST request to insert the new category
        fetch('http://localhost:5000/add-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Message from the server
            //history.push('/success'); // Redirect to success page
        });
    };

    return (
        <div>
            <h1>Create Category Page</h1>
            <Link to="/login">Go to the login page</Link>

            <h2>Create Category</h2>
            <div>
                <input
                    type="text"
                    value={category}
                    onChange={handleCategoryChange}
                    placeholder="Category"
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default P_CreateUser;
