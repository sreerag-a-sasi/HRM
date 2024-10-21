import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgot.css';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleForgot = async (event) => {
        event.preventDefault();
        const data = { email };
        console.log("Email submitted:", email);

        try {
            const response = await axios.post('http://localhost:3000/forgot-password', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response received:", response);

            // Check if the response data contains a success field
            if (response.data.success) {
                setMessage(response.data.message);
                alert(response.data.message);
                console.log("redirecting to the Login page...");
                navigate('/');
            } else {
                setMessage(response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Axios error:", error);
            setMessage("An error occurred. Please try again later.");
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

            <div className="signin">
                <div className="content">
                    <h2>Forgot Password</h2>
                    <form id="forgot-password" onSubmit={handleForgot}>
                        <div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                id="email"
                                className="email-input" // Added class name
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
