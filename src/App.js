import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import CreateUserPage from './CreateUserPage'; // Make sure to import the correct path


function App() {
  return (
    <Router>
      <>
        <header>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/create-user">Create User</Link>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;
