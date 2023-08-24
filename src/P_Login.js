import React from 'react';
import { Link } from 'react-router-dom';

function P_Login() {
    return (
        <div>
            <h1>this is the login page</h1>
            <Link to="/">return to the homepage</Link>
            {'\n'}
            <Link to="/create-user">go to create user page</Link>
        </div>
    );    
}

  export default P_Login;