// pages/CustomerHome.jsx
import React from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';


const CustomerPage = () => {
  // Assume cartItems and orders are fetched from the server or passed as props
  const cartItems = [];
  const orders = [];

  const isUserSignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  };
  return (
  <div>
    {isUserSignedIn ? (
        <div>
          <nav className='navRoot'>
            <Link to="/customer-page"><img className='logoHeader' src="/src/img/100-logo.png"/></Link>
            <Link to="/customer-page/product-list" className='nav-item'>PRODUCT LIST</Link>
            <Link to="/customer-page/shopping-cart" className='nav-item'>SHOPPING CART</Link>
            <Link to="/customer-page/order-list" className='nav-item'>ORDER LIST</Link>
            <div className='navUser'>
              <Link to="/customer-page/profile" className='profile'><FontAwesomeIcon icon={faCircleUser} color='black' size='2x'/></Link>
              <button onClick={handleLogout}>LOG OUT</button>
            </div>
          </nav>
          <Outlet />
        </div>
      ) : (
        <>
        <Navigate to = '/'/>
        </>
      )}
  </div>
  );
};

export default CustomerPage;
