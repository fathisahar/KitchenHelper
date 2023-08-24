import React, { useState, useEffect } from 'react';

function DataComponent() {
    const [data, setData] = useState({});

    useEffect(() => {
        // Fetch data from Flask server
        fetch('http://localhost:5000/data') // Update with your server URL
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h2>Data from Flask Server</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default DataComponent;
