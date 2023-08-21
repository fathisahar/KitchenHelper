import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; 
import LoginPage from './LoginPage'; 

function App() {
  return (
    <div className="kitchenhelper">
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
