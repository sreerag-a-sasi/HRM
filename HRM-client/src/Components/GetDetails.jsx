{/* <body onload={getUsersData()}>
  <nav>
    <div class="wrapper">
      <div class="logo"><a href="#">Details</a></div>
      <ul class="nav-links">
        <li><input type="text" placeholder="search" onkeyup={finduser()} id="searchbar"/></li>
        <li><a onclick={logout()}>Log out</a></li>
        <li><a href="Admin.jsx">Create New</a></li>
      </ul>
    </div>
  </nav>
  <table>
    <thead>
      <tr>
        <th>First-Name</th>
        <th>Last-Name</th>
        <th>email</th>
      </tr>
    </thead>
    <tbody id="dataContainer"></tbody>
  </table>
  <script src="script.js"></script>
</body> */}




import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token
    console.log("Access token : ", token);

    let response = await fetch('/users', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User data:', data);
      setUsers(data.data);
    } else {
      console.log('Error fetching user data:', response.statusText);
    }
  };

  return (
    <div>
      <nav>
        <div className="wrapper">
          <div className="logo"><a href="#">Details</a></div>
          <ul className="nav-links">
            <li><input type="text" placeholder="search" onKeyUp={finduser()} id="searchbar" /></li>
            <li><a onClick={logout}>Log out</a></li>
            <li><a href="admin.html">Create New</a></li>
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
