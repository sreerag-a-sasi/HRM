import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token
    console.log("Access token : ", token);

    try {
      const response = await axios.get('/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('User data:', data);
        setUsers(data.data);
      } else {
        console.log('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const findUser = (event) => {
    // Implement the search functionality here
    console.log("Searching for user:", event.target.value);
  };

  const logout = () => {
    // Implement the logout functionality here
    localStorage.removeItem('token');
    console.log("Logged out");
  };

  const handleView = (userId) => {
    // Implement the view functionality here
    console.log("Viewing user:", userId);
  };

  return (
    <div>
      <nav>
        <div className="wrapper">
          <div className="logo"><Link to="#">Details</Link></div>
          <ul className="nav-links">
            <li><input type="text" placeholder="search" onKeyUp={findUser} id="searchbar" /></li>
            <li><button onClick={logout}>Log out</button></li>
            <li><Link to="/admin">Create New</Link></li>
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
          {users.map(user => (
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

export default App;
