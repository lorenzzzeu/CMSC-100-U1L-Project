// pages/CustomerPage.jsx

// Importing necessary dependencies from React and React Router
import React from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

// Defining the functional component CustomerPage
const CustomerPage = () => {
  
  const isUserSignedIn = !!localStorage.getItem('token');   // Checking if the user is signed in by looking for a token in localStorage
  let decodedToken = null;
  if(isUserSignedIn){
    const token = localStorage.getItem('token')
    decodedToken = jwtDecode(token);
  }
  const navigate = useNavigate();   // Using the useNavigate hook to programmatically navigate

  // Defining the handleLogout function to remove the token and navigate to the home page
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Navigate to the home page
  };
  
  // Returning the JSX for the component
  return (
    <div>
      {isUserSignedIn && decodedToken.type === 'customer' ? ( // Conditional rendering based on whether the user is signed in
        <div>
          <nav className='navRoot'>
            <div className='navLinks'>
              <Link to="/customer-page"> {/* Link to customer page */}
                <img className='logoHeader' src="/src/img/100-logo.png"/> {/* Company logo */}
              </Link>
              <Link to="/customer-page/product-list" className='nav-item'>Product List</Link> {/* Link to product list */}
              <Link to="/customer-page/shopping-cart" className='nav-item'>Shopping Cart</Link> {/* Link to shopping cart */}
              <Link to="/customer-page/order-list" className='nav-item'>Order List</Link> {/* Link to order list */}
            </div>
            <div className='navUser'>
              <Link to="/customer-page/profile" className='profile'> {/* Link to profile */}
                <FontAwesomeIcon icon={faCircleUser} color='black' size='2x'/> {/* User icon */}
              </Link>
              <button onClick={handleLogout}>LOG OUT</button> {/* Logout button */}
            </div>
          </nav>
          <Outlet /> {/* Render nested routes here */}
        </div>
      ) : ( // If user is not signed in
        isUserSignedIn && decodedToken.type != 'customer' ? (
          <>
            <Navigate to='/admin-page'/> {/* Redirect to admin page */}
          </>
      ): (
        <>
          <Navigate to='/'/> {/* Redirect to home page */}
        </>
      )
      )}
    </div>
  );
};

export default CustomerPage; // Exporting the CustomerPage component as the default export