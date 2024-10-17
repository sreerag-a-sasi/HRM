import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './user.css'; // Assuming you have a CSS file for styling



const UserPage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  });
  const { id } = useParams();

  useEffect(() => {
    const loadUserData = async () => {
      if (id) {
        try {
          const token = localStorage.getItem('token'); // Retrieve the token
          console.log("Access token : ", token);
          // Make an HTTP request to get user data
          const response = await axios.get(`http://localhost:3000/users/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          console.log("user data : ", response.data);
          setUser(response.data.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.error('No ID found in search params');
      }
    };

    loadUserData();
  }, [id]);

  const handleEdit = (event) => {
    console.log("Edit button clicked");
    // Implement edit functionality here
  };

  const handleDelete = (event) => {
    console.log("Delete button clicked");
    // Implement delete functionality here
  };

  return (
    <content>
      <div className="content">
        <div className="photopage">
          <img id="profilepic" alt="" width="150px" height="150px" src={user.image || './images/user.png'} />
        </div>
        <div className="field">
          <input type="text" className='inputfield' placeholder="firstname" value={user.firstName || 'null'} disabled />
          <input type="text" className='inputfield' placeholder="lastname" value={user.lastName || 'null'} disabled />
          <input type="text" className='inputfield' placeholder="email" value={user.email || 'null'} disabled />
          <input type="file" className='inputfield' id="image" name="image" accept="image/*" placeholder="image" />
        </div>
      </div>
      <div className="edit">
        <div><img src='./images/bin.png' alt="" width="50px" height="50px" onClick={handleEdit} /></div>
        <div><img src='./bin.png' alt="" width="50px" height="50px" onClick={handleDelete} /></div>
      </div>
    </content >
  );
};

export default UserPage;
