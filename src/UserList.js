import React, { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/get-users')
            .then(response => response.json())
            .then(data => {
                setUsers(data.users);
            });
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        Username: {user.username}, Email: {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
