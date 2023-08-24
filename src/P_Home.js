import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function P_Home(){
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
      fetch("http://localhost:5000/data").then((res) =>
        res.json().then((data) => {
          // Setting a data from api
          setdata({
            name: data.Name,
            age: data.Age,
            date: data.Date,
            programming: data.programming,
          });
        })
      );
  }, []);

    return (
      <div>


        <h1>welcome to the home page</h1>
        <Link to="/login">go to the to log in page</Link>

        <header className="App-header">
          <h1>React and flask</h1>
            {/* Calling a data from setdata for showing */}
            <p>{data.name}</p>
            <p>{data.age}</p>
            <p>{data.date}</p>
            <p>{data.programming}</p>
        </header>

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