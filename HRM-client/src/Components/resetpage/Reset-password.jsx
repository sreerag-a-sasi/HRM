import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Reset.css";

export function Resetpassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (event) => {
    event.preventDefault();

    const currentUrl = window.location.href; // Define currentUrl here

    console.log("Resetting password ...");

    const data = {
      currentUrl,
      password,
    };

    console.log("Data (front-end):", data);

    try {
      const response = await axios.patch('http://localhost:3000/reset-password', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response:", response);

      const parsed_response = response.data;
      console.log("Parsed response:", parsed_response);

      if (parsed_response.success) {
        setMessage(parsed_response.message);
        alert(parsed_response.message);
        navigate('/'); // Navigate to a success page after resetting the password
      } else {
        setMessage(parsed_response.message);
        alert(parsed_response.message);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setMessage("An error occurred during the password reset. Please try again.");
    }
  };

  return (
    <section>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>

      <div className="signin">
        <div className="content">
          <h2>Reset Password</h2>
          <form id="reset-password" onSubmit={handleReset}>
            <div>
              <input
                type="password"
                placeholder="Enter The Password :"
                name="password"
                id="password"
                className='password-input'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div>
                <button type="submit" className="submit-button">Submit</button>
              </div>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </section>
  );
}
