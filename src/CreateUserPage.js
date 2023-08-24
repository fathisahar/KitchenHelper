import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CreateUserPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        const newUser = {
            username: username,
            email: email,
            password: password
        };

        // Send POST request to register user
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Message from the server
            // Clear form fields
            setUsername('');
            setEmail('');
            setPassword('');
        });
    };

    return (
        <div>
            <h1>Create User Page</h1>
            <Link to="/login">Go to the login page</Link>

            <h2>User Registration</h2>
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                />
                <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                />
                <button onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
}

export default CreateUserPage;
