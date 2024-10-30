import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './user.css'; // Assuming you have a CSS file for styling

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  });
  const [newImage, setNewImage] = useState(null); // State to hold the new image

  useEffect(() => {
    const loadUserData = async () => {
      if (id) {
        console.log(`Loading user data for ID: ${id}`);
        try {
          const token = localStorage.getItem('token');
          console.log("Token retrieved:", token);
          const response = await axios.get(`http://localhost:3000/users/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          console.log("Response data:", response.data.data);
          const data = response.data.data;
          if (data) {
            setUser({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || '',
              image: data.image || ''
            });
            console.log("User data set:", data);
          } else {
            console.error('Unexpected data structure:', response.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          alert('Error fetching user data');
        }
      } else {
        console.error('No ID found in search params');
      }
    };
    loadUserData();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Access the first selected file
    if (file) {
      console.log("File selected:", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("File read successfully, updating image state.");
        setNewImage(reader.result); // Update newImage state with base64 encoded string
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      console.log("No file selected, setting image to null.");
      setNewImage(null); // Set newImage to null if no file is selected
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to continue this process.");
      return;
    }

    const firstName = document.querySelector("input[name='firstName']").value;
    const lastName = document.querySelector("input[name='lastName']").value;
    const image = newImage; // Use newImage instead of user.image

    const data = {
      firstName,
      lastName,
      image: image || null  // Ensure image is null if not selected
    };
    console.log("Editing user with data:", data);

    try {
      // Send a PUT request to update user data
      const response = await axios.put(`http://localhost:3000/users/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Response from update:", response.data);
      const parsed_response = response.data;
      if (parsed_response.success) {
        alert(parsed_response.message);
        setUser(parsed_response.data); // Update state with new user data
        console.log("User updated successfully:", parsed_response.data);
        window.location.reload();
      } else {
        alert(parsed_response.message || "Update Failed");
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("Error during update");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to continue this process.");
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Delete response:", response.data);
      if (response.data.success) {
        alert(response.data.message);
        navigate('/getdetails'); // Redirect after deletion
      } else {
        alert(response.data.message || "Delete Failed");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  console.log("Current user state:", user);
  return (
    <div>
      <div className="content">
        <div className="photopage">
          <img id="profilepic" width="150" height="150" src={user.image ? `http://localhost:3000/${user.image}` : '/admin.png'} alt="Profile" />
        </div>
        <div className="field">
          <input
            type="text"
            className="inputfield"
            placeholder="First Name"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="inputfield"
            placeholder="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="inputfield"
            placeholder="Email"
            value={user.email}
            disabled
          />
          <input
            type="file"
            className="inputfield"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="edit">
        <img src='/pencil.png' width="50" height="50" onClick={handleEdit} alt="Edit" />
        <img src='/bin.png' width="50" height="50" onClick={handleDelete} alt="Delete" />
      </div>
    </div>
  );
};

export default UserPage;
