import React, { useState } from 'react';
import './nav.css';
import './style.css';
import axios from 'axios';



    return (
        <body onload={getUsersData()}>
            <nav>
                <div class="wrapper">
                    <div class="logo"><a href="#">Details</a></div>
                    <ul class="nav-links">
                        <li><input type="text" placeholder="search" onkeyup={finduser()} id="searchbar" /></li>
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
        </body>
    );

export default Login;