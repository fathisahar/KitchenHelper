import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <div>
            <h1>this is the login page</h1>
            <Link to="/home-page">return to the homepage</Link>
            <button type="button">click me to add 1</button>
        </div>
    );    
}

  export default LoginPage;