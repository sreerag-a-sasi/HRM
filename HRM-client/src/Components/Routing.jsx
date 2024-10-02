import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import GetDetails from './GetDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/get-details" element={<GetDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
