// Login.jsx
import React, { useState } from 'react';
import './nav.css';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (event) => {
    try {
      event.preventDefault();
      console.log("Login ...");

      const datas = {
        email,
        password,
      };

      const response = await axios.post('/login', datas);

      console.log("response :", response);

      const token = response.data.data;
      console.log("token : ", token);
      const success = response.data.success;
      console.log("success : ",success);
      

      if (response.data.success && token) {
        localStorage.setItem('token', token);
        alert(response.data.message);
        console.log("redirecting to the users page...");
        navigate('/getUsersData'); // Navigate to the GetDetails page
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div>
      <nav>
        <div className="wrapper">
          <div className="logo"><a href="#">Login</a></div>
          <ul className="nav-links">
            <li><a href="forgot-password.html">Forgot Password</a></li>
            <li><a href="employee.html">Employee login</a></li>
          </ul>
        </div>
      </nav>
      <div className="form">
        <h1>Please Enter Your details</h1>
        <form id="userLogin" onSubmit={login}>
          <div>
            <input
              type="email"
              placeholder="Enter The email :"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter The Password :"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div><button type="submit" id="btn">Login</button></div>
        </form>
      </div>
    </div>
  );
}

export default Login;
