import './newuser.css'
import './nav.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FormComponent() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        base64_img: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({ ...formData, base64_img: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const { firstName, lastName, email, base64_img } = formData;
            console.log("formdata : ", formData);
            
            const token = localStorage.getItem('token'); // Retrieve the token
            console.log("Access token : ", token);

            const response = await axios.post('http://localhost:3000/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ firstName, lastName, email, image: base64_img })
            });

            const parsed_response = await response.json();

            if (parsed_response.success) {
                alert(parsed_response.message);
            } else {
                alert(parsed_response.message || 'Login Failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <nav>
                <div className="wrapper">
                    <div className="logo"><a >Admin</a></div>
                    <ul className="nav-links">
                        <li><Link to="/" className='newuser'>Log out</Link></li>
                        <li><Link to="/GetDetails" className='newuser'>Get Details</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="form">
                <h1>Add New Employee</h1>
                <form id="userDataForm" onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="Enter The First Name:" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <input type="text" placeholder="Enter The Last Name:" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <input type="email" placeholder="Enter The Email:" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div>
                        <button type="submit" id="btn">Add</button>
                    </div>
                </form>
            </div>
        </>
    );
}

function logout() {
    // Your logout logic here
}
