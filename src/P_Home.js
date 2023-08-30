import React from 'react';
import { Link } from 'react-router-dom';

function P_Home(){

  
    return (
      <div>

        <h1>welcome to the home page</h1>
        <Link to="/login">go to the to log in page</Link>

      </div>
    );
}

export default P_Home;