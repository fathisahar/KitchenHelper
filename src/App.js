import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; 
import LoginPage from './LoginPage'; 
import { useState, useEffect } from "react";

function App() {

  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

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
    <div className="kitchenhelper">
      <header className="App-header">
        <h1>React and flask</h1>
          {/* Calling a data from setdata for showing */}
          <p>{data.name}</p>
          <p>{data.age}</p>
          <p>{data.date}</p>
          <p>{data.programming}</p>
      </header>
      <Router>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/login-page" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
