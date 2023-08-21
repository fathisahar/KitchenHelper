import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <div>
            <h1>this is the login page</h1>
            <Link to="/home-page">return to the homepage</Link>
        </div>
    );    
}

  export default LoginPage;