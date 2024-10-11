import React from 'react';
import "./app.css"

export function App(props) {
  return (
    <div>
        <div className="content">
          <div className="photopage">
            <img id="profilepic" alt="" width="150px" height="150px" />
          </div>
          <div className="details">
            <input type="text" placeholder="firstname" id="firstName" />
            <input type="text" placeholder="lastname" id="lastName" />
            <input type="text" placeholder="email" id="email" disabled />
            <input type="file" id="image" name="image" accept="image/*" placeholder="image" />
          </div>
        </div>
        <div className="edit">
          <div><img src="images/pencil (1).png" alt="" width="50px" height="50px" onclick="handledit(event)" /></div>
          <div><img src="images/bin.png" alt="" width="50px" height="50px" onclick="handledelete(event)" /></div>
        </div>
      </div>
  );
}
// Log to console
console.log('Hello console')