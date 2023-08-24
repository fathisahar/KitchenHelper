import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function CreateUserPage() {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        setInputValue('');
      };

    return (
        <div>
          <h1>Welcome to the create user page</h1>
          <Link to="/login">Go to the log in page</Link>
    
          <h1>Text Field Example</h1>
          <form onSubmit={handleSubmit}> 
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter text..."
            />
            <button type="submit">Submit</button> 
          </form>
        </div>
      );
    }

export default CreateUserPage;