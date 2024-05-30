// pages/Login.jsx

// Importing necessary modules and hooks from React and other libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Define the Login component
function Login() {
  // Declare state variables for email and password, and a navigation hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // useEffect hook to fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the backend
  const fetchUsers = () => {
    axios.get('http://localhost:3001/register').then((res) => {
      // Log the response data for debugging purposes (should be removed in production)
      // console.log(res.data);
    });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement login functionality here
    try {
      // Send POST request to login endpoint with email and password
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const token = response.data.token;
      const decodedToken = jwtDecode(token); // Decode the JWT to get user information
      console.log(decodedToken);
      // Redirect based on user type
      if (decodedToken.type === 'customer') {
        navigate('/customer-page'); // Redirect to customer page
      } else {
        navigate('/admin-page'); // Redirect to admin page
      }
      // Reload the page to apply changes and store token in local storage
      window.location.reload();
      localStorage.setItem('token', token);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Unable to log in user'); // Fallback error message
      }
    }
  };

  return (
    <>
      <nav className='navRoot'>
        {/* Link to home page with logo */}
        <Link to="/"><img className='logoHeader' src='/src/img/100-logo.png' /></Link>
      </nav>
      <div className='login'>
        <div className='login-card'>
          <img className='logo-container' src='src/img/100-logo.png' />
          <h2>Log In To Your Account</h2>
          <form onSubmit={handleSubmit}>
            {/* Conditionally render error message */}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
            <button className='logBtn' type="submit">LOG IN</button>
          </form>
          <p className='clickRegister'>
            {/* Link to registration page */}
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}

// Export the Login component as default export
export default Login;