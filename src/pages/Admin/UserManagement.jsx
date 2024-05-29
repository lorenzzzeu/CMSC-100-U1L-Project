// pages/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin-page/listusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Unable to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  const totalUsers = users.length;

  return (
    <>
      <div className="titleAdmin">
        <h1>USER MANAGEMENT</h1>
        <p>Total registered users: {totalUsers}</p>
      </div>
      {/* <table className="userTable">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <div className='user-container'>
        {users.map((user) => (
          <div className='user-cards' key={user._id}>
            <div className='user-img'><img src='\src\img\user.png'/></div>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            <p>{user.userType}</p>
          </div>
        ))}

      </div>
    </>
  );
};

export default UserManagement;
