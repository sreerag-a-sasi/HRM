import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import './nav.css';
import './get.css';
import './style.css';

const GetDetails = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  console.log("getUsers page running...!");

  useEffect(() => {
    console.log("getUsers function loading...!");
    getUsersData();
  }, []);

  const getUsersData = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token
    console.log("Access token : ", token);

    try {
      const response = await axios.get('http://localhost:3000/Users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('User data:', data);
        setUsers(data.data);
        setFilteredUsers(data.data); // Initialize filtered users with all users
      } else {
        console.log('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const findUser = async () => {
    console.log("keyword function is working...");

    const token = localStorage.getItem('token');
    console.log("token : ", token);

    try {
      const response = await axios.get(`http://localhost:3000/users?keyword=${encodeURIComponent(keyword)}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("response : ", response);

      if (response.status === 200) {
        const data = response.data;
        console.log('User data:', data.data);
        setFilteredUsers(data.data);
      } else {
        console.log('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (keyword) {
      findUser();
    } else {
      setFilteredUsers(users); // Reset to all users if keyword is empty
    }
  }, [keyword]);

  // const logout = () => {
  //   const navigate = useNavigate();
  //   axios.get('/logout', {
  //     credentials: 'include' // Include cookies in the request
  // })
  //     .then(response => response.json())
  //     .then(data => {
  //         if (data.statusCode === 200) {
  //             clearConsole();
  //             navigate('/Login');  // Redirect to login page after logout
  //         } else {
  //             alert('Logout failed');
  //         }
  //     })
  //     .catch(error => console.error('Error:', error));
  //   localStorage.removeItem('token');
  //   console.log("Logged out");
  // };
  const logout = () => {
    axios.get('/logout', {
      withCredentials: true // Include cookies in the request
    })

      .then(response => {
        console.log("response", response);
        if (response.status === 200) {
          localStorage.removeItem('token');
          console.log("Logged out");
          navigate('/');  // Redirect to login page after logout
        } else {
          alert('Logout failed');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleView = (userId) => {
    console.log("Viewing user:", userId);
  };

  return (
    <div>
      <nav>
        <div className="wrapper">
          <div className="logo"><Link to="#">Details</Link></div>
          <ul className="nav-links">
            <li><input type="text" placeholder="search" onChange={(e) => setKeyword(e.target.value)} id='searchbar' /></li>
            <li><button onClick={logout} className='navbutton'>Log out</button></li>
            <li><Link to="/admin" className='navbutton'>Create New</Link></li>
          </ul>
        </div>
      </nav>
      <table>
        <thead>
          <tr>
            <th>First-Name</th>
            <th>Last-Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody id="dataContainer">
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td><input className="in" type="text" id={`name-${user._id}`} value={user.firstName || "Null"} disabled placeholder="name" /></td>
              <td><input className="in" type="text" id={`username-${user._id}`} value={user.lastName || "Null"} disabled placeholder="username" /></td>
              <td><input className="in" type="email" id={`email-${user._id}`} value={user.email || "Null"} disabled placeholder="email" /></td>
              <td><button onClick={() => handleView(user._id)} id="viewbutton">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetDetails;
