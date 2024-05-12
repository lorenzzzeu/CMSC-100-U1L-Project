// pages/UserManagement.jsx
import React from 'react';

const UserManagement = () => {
  // Fetch list of registered users and calculate total
  const users = [];
  const totalUsers = users.length;

  return (
    <>
      <div className='imgAdmin'></div>
      <div className='titleCustomer'>
          <h1>WELCOME TO</h1>
          <h1>The Farm-to-Table E-Commerce Website</h1>
        </div>
      <hr/>
      <div>
        <h2>User Management</h2>
        <p>Total registered users: {totalUsers}</p>
        {/* Display list of registered users */}
      </div>
    </>

  );
};

export default UserManagement;
