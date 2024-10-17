import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import GetDetails from './details/GetDetails';
import { Resetpassword } from './resetpage/Reset-password';
import UserPage from './userpage/userPage';
import FormComponent  from './newuser/Newuser';

export default function Routingapp() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/GetDetails" exact element={<GetDetails />} />
        <Route path="/getUsersData" element={<GetDetails />} />
        <Route path="/Reset-password" element={<Resetpassword />} />
        <Route path="/userPage/:id" element={<UserPage />} />
        <Route path="/Newuser" element={< FormComponent />} />
      </Routes>
    </Router>
  );
}
