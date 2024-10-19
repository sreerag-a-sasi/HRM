import './newuser.css';
import './nav.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FormComponent() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        image: ''
    });

    const navigate = useNavigate(); // For navigation after submission

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed: ${name} = ${value}`); // Log the input changes
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("File selected:", file); // Log the selected file
        const reader = new FileReader();

        reader.onloadend = () => {
            console.log("File read as data URL:", reader.result); // Log the data URL
            setFormData({ ...formData, image: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("Form submitted with data:", formData); // Log form data on submit

        try {
            const { firstName, lastName, email, image } = formData;
            const token = localStorage.getItem('token'); // Retrieve the token
            console.log("Access token:", token);

            const response = await axios.post('http://localhost:3000/users', {
                firstName,
                lastName,
                email,
                image
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Response from server:", response.data); // Log server response

            if (response.data.success) {
                alert(response.data.message);
                navigate('/GetDetails'); // Redirect after success
            } else {
                alert(response.data.message || 'Submission Failed');
            }
        } catch (error) {
            console.error('Error during submission:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <nav>
                <div className="wrapper">
                    <div className="logo"><a href="/">Admin</a></div>
                    <ul className="nav-links">
                        <li><Link to="/" className='newuser' onClick={logout}>Log out</Link></li>
                        <li><Link to="/GetDetails" className='newuser'>Get Details</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="employeeform">
                <h1 id='heading'>Add New Employee</h1>
                <form id="userDataForm" onSubmit={handleSubmit}>
                    <div>
                        <input className='newdata' type="text" placeholder="Enter The First Name:" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <input className='newdata' type="text" placeholder="Enter The Last Name:" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <input className='newdata' type="email" placeholder="Enter The Email:" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <input className='newdata' type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div>
                        <button type="submit" id="add">Add</button>
                    </div>
                </form>
            </div>
        </>
    );
}

function logout() {
    console.log("Logging out..."); // Log logout action
    localStorage.removeItem('token'); // Example: removing token
    window.location.href = '/'; // Redirect to home or login page
}
