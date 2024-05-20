// pages/AdminHome.jsx
import React from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  };

  return (
    <div>
      <nav className='navRoot'>
        <Link to="/admin-page"><img className='logoHeader' src="src/img/100-logo.png"/></Link>
        <Link to="/admin-page/user-management" className='nav-item'>USER MANAGEMENT</Link>
        <Link to="/admin-page/product-listings" className='nav-item'>PRODUCT LISTINGS</Link>
        <Link to="/admin-page/order-fulfillment" className='nav-item'>ORDER FULFILLMENT</Link>
        <Link to="/admin-page/sales-reports" className='nav-item'>SALES REPORT</Link>
        <div className='navUser'>
          <button onClick={handleLogout}>LOG OUT</button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminPage;
