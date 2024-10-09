import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import GetDetails from './GetDetails';


export default function Routingapp() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/GetDetails" exact element={<GetDetails />} />
        <Route path="/getUsersData" element={<GetDetails />} />
      </Routes>
    </Router>
  );
}
