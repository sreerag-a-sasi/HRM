import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './user.css'; // Assuming you have a CSS file for styling

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  });

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
          console.log("Response data:", response.data);
          const data = response.data.data;

          if (data) {
            setUser({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || '',
              image: data.image || '/public/nandu2.jpg'
            });
            console.log("User data set:", data);
          } else {
            console.error('Unexpected data structure:', response.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.error('No ID found in search params');
      }
    };

    loadUserData();
  }, [id]);

  const handleEdit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert("You must be logged in to continue this process.");
      return;
    }

    const { firstName, lastName, image } = user;
    const data = { firstName, lastName, image };
    console.log("Editing user with data:", data);

    try {
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
      } else {
        alert(parsed_response.message || "Update Failed");
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log("File read successfully, updating image state.");
      setUser((prevUser) => ({ ...prevUser, image: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
    // Implement delete functionality here
  };

  console.log("Current user state:", user);

  return (
    <div>
      <div className="content">
        <div className="photopage">
          <img id="profilepic" width="150" height="150" src={user.image || '/public/nandu2.jpg'} />
        </div>
        <div className="field">
          <input type="text" className="inputfield" placeholder="First Name" value={user.firstName} readOnly />
          <input type="text" className="inputfield" placeholder="Last Name" value={user.lastName} readOnly />
          <input type="text" className="inputfield" placeholder="Email" value={user.email} readOnly />
          <input type="file" className="inputfield" id="image" name="image" accept="image/*" onChange={handleFileChange} />
        </div>
      </div>
      <div className="edit">
        <img src='/public/pencil.png' width="50" height="50" onClick={handleEdit} />
        <img src='/public/bin.png' width="50" height="50" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default UserPage;
