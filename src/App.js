import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import P_Home from './P_Home';
import P_Login from './P_Login';
import P_CreateUser from './P_CreateUser';
import P_Stock from './P_Stock';


function App() {
  return (
    <Router>
      <>
        <header>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/create-user">Create User</Link>
          <Link to="/stock">Add Stock</Link>
        </header>

        <Routes>
          <Route path="/" element={<P_Home />} />
          <Route path="/login" element={<P_Login />} />
          <Route path="/create-user" element={<P_CreateUser />} />
          <Route path="/stock" element={<P_Stock />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;
