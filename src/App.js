import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Import your Home component
import SecondPage from './SecondPage'; // Import your SecondPage component

function App() {
  return (
    <div className="kitchenhelper">
      {/* Your main content */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/second-page" element={<SecondPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
