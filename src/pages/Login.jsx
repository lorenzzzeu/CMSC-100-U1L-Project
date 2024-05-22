// pages/Login.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    axios.get('http://localhost:3001/register').then((res) => {
      // console.log(res.data) // Just for checking, must remove this later
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement login functionality here
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password })
      const token = response.data.token
      const decodedToken = jwtDecode(token); // Decode the JWT to get the user type
      console.log(decodedToken)
      if (decodedToken.type === 'customer') {
        navigate('/customer-page'); // Redirect to admin page
      } else {
        navigate('/admin-page'); // Redirect to customer page
      }
      window.location.reload()
      localStorage.setItem('token', token)
    } catch(error) {
      console.log('Unable to log in', error)
    }
  };

  return (
    <>
    <nav className='navRoot'>
      <Link to="/"><img className='logoHeader' src='/src/img/100-logo.png'/></Link>
    </nav>
    <div className='login'>
      <div className='login-card'>
        <img className='logo-container' src='src\img\100-logo.png'/>
        <h2>Log In To Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
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
          <button type="submit">LOG IN</button>
        </form>
        <p className='clickRegister'>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
    </>
  );
}

export default Login;
