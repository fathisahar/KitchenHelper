import React from 'react';
import { Link } from 'react-router-dom';

function HomePage(){
    return (
        <div>
          <h1>welcome to the home page</h1>
          <Link to="/login-page">go to the to log in page</Link>
        </div>
    );
}

export default HomePage;