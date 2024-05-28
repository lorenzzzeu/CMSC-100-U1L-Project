// pages/AdminHome.jsx
import React from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate()
  const isUserSignedIn = !!localStorage.getItem('token')
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  };

  return (
    <div>
    {isUserSignedIn ? (
      <div>
        <nav className='navRoot'>
          <div className='navLinks'>
              <Link to="/admin-page">
                <img className='logoHeader' src="src/img/100-logo.png"/>
              </Link>
              <Link to="/admin-page/user-management" className='nav-item'>User Management</Link>
              <Link to="/admin-page/product-listings" className='nav-item'>Product Listings</Link>
              <Link to="/admin-page/order-fulfillment" className='nav-item'>Order Fulfillment</Link>
              <Link to="/admin-page/sales-reports" className='nav-item'>Sales Report</Link>
            </div>
          <div className='navUser'>
            <button onClick={handleLogout}>LOG OUT</button>
          </div>
        </nav>
        <Outlet/>
      </div>
      ) : (
        <>
        <Navigate to = '/'/>
        </>
      )}
  </div>
  );
};

export default AdminPage;
