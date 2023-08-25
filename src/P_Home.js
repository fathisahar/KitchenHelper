import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function P_Home(){
  

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
    return (
      <div>

        <h1>welcome to the home page</h1>
        <Link to="/login">go to the to log in page</Link>

        <h1>Text Field Example</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text..."
        />
        <p>You entered: {inputValue}</p>

      </div>
    );
}

export default P_Home;