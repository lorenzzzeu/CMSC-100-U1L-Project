// pages/UserManagement.jsx
import React from 'react';

const UserManagement = () => {
  // Fetch list of registered users and calculate total
  const users = [];
  const totalUsers = users.length;

  return (
    <>
      <div className='headerAdmin'></div>
      <div className='titleAdmin'>
        <h1>USER MANAGEMENT</h1>
        <p>Total registered users: {totalUsers}</p>
      </div>
    </>

  );
};

export default UserManagement;
