// Login.jsx
import React, { useState } from 'react';
import './loginnav.css';
import './loginstyle.css';
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

      const response = await axios.post('http://localhost:3000/login', datas);

      const token = response.data.data;
      console.log("token details : ", token);
      

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
          <ul className="navlinks">
            <li><a href="forgot-password.html">Forgot Password</a></li>
          </ul>
        </div>
      </nav>
      <div className="page">
        <h1>Please Enter Your details</h1>
        <form id="userLogin" onSubmit={login}>
          <div>
            <input className='details'
              type="email"
              placeholder="Enter The email :"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input className='details'
              type="password"
              placeholder="Enter The Password :"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div><button type="submit" id="loginbutton">Login</button></div>
        </form>
      </div>
    </div>
  );
}

export default Login;
