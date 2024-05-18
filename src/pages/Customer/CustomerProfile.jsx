import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user profile on component mount
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  return (
    <>
      <div className='headerCustomer'></div>
      <div className='titleCustomer'>
        <h1>PROFILE</h1>
      </div>
      <hr />
      <div>
        <h3>User Details:</h3>
        <p><strong>First Name:</strong> {profile.firstName}</p>
        <p><strong>Last Name:</strong> {profile.lastName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        {/* You can display more details here if needed */}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type='text'
            name='firstName'
            value={profile.firstName}
            onChange={handleChange}
            placeholder="Enter new first name"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type='text'
            name='lastName'
            value={profile.lastName}
            onChange={handleChange}
            placeholder="Enter new last name"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter new email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={profile.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>
        <button type='submit'>Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default CustomerProfile;
