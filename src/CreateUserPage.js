import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CreateUserPage() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const submitUser = () => {
        // Create an object with the new data
        const newData = {
            Name: "geek", // Update with your data
            Age: inputValue,
            Date: "some-date",
            programming: "python"
        };

        // Send POST request to update data
        fetch('http://localhost:5000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Message from the server
        });
    };

    return (
        <div>
            <h1>Welcome to the create user page</h1>
            <Link to="/login">Go to the login page</Link>

            <h1>Text Field Example</h1>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter text..."
            />

            <button onClick={submitUser}>Submit</button>
        </div>
    );
}

export default CreateUserPage;
