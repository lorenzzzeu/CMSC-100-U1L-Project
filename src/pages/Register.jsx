// pages/Register.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    axios.get('http://localhost:3001/register').then((res) => {
      console.log(res.data) // Just for checking, must remove this later
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement registration functionality here
    axios.post('http://localhost:3001/register', { firstName, lastName, email, password }).then(() => {
      alert('Successful') // Just for checking
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      fetchUsers()
      navigate('/')
    }).catch((error) => {
      console.log('Unable to register user')
    });
  };

  return (
    <div className='register-main'>
    <div className='register-card'>
      <div className='logo-container'><img src='src\img\100-logo.png'></img></div>
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='First Name'
          />
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Last Name'
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email Address'
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </div>
        <button type="submit">REGISTER</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
    </div>
  );
}

export default Register;
