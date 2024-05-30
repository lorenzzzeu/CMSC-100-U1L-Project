// pages/Register.jsx

// Importing necessary modules from React, React Router, and Axios
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Defining the Register functional component
function Register() {
  // Defining state variables to manage form input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // useEffect hook to call fetchUsers function when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the backend
  const fetchUsers = () => {
    axios.get('http://localhost:3001/register').then((res) => {
      // Uncomment the line below for debugging purposes to see the response data
      // console.log(res.data) 
    });
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Sending a POST request to the backend to register a new user
    axios.post('http://localhost:3001/register', { firstName, lastName, email, password })
      .then(() => {
        // alert('Successful'); // Notify the user of successful registration (for debugging)
        // Clear the form input fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        fetchUsers(); // Fetch the updated list of users
        navigate('/login'); // Navigate to the home page
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Unable to register user'); // Fallback error message
        }
      });
  };

  // Returning the JSX to render the registration form
  return (
    <>
      <nav className='navRoot'>
        {/* Link to navigate back to the home page */}
        <Link to="/"><img className='logoHeader' src='/src/img/100-logo.png'/></Link>
      </nav>
      <div className='register-main'>
        <div className='register-card'>
          <img className='logo-container' src='src/img/100-logo.png'/>
          <h2>Register Account</h2>
          {/* Form to handle user registration */}
          <form onSubmit={handleSubmit}>
            {/* Conditionally render error message */}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <div>
              {/* Input field for first name */}
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder='First Name'
              />
            </div>
            <div>
              {/* Input field for last name */}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder='Last Name'
              />
            </div>
            <div>
              {/* Input field for email address */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email Address'
              />
            </div>
            <div>
              {/* Input field for password */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </div>
            {/* Submit button for the form */}
            <button className='logBtn' type="submit">REGISTER</button>
          </form>
          <p>
            {/* Link to navigate to the login page if the user already has an account */}
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

// Exporting the Register component as the default export
export default Register;