import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import GetDetails from './details/GetDetails';
import { Resetpassword } from './resetpage/Reset-password';
import UserPage from './userpage/userPage';
import FormComponent  from './newuser/Newuser';
import ForgotPassword from './forgot-password/Forgot'

export default function Routingapp() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/getDetails" exact element={<GetDetails />} />
        <Route path="/getUsersData" element={<GetDetails />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/userPage/:id" element={<UserPage />} />
        <Route path="/Newuser" element={< FormComponent />} />
        <Route path='/Forgot' element={< ForgotPassword />} />
      </Routes>
    </Router>
  );
}
