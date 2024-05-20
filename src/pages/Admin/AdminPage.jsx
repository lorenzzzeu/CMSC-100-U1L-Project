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
      <nav className='navAdmin'>
        <Link to="/admin-page" className='logo'><img src="src/img/100-logo.png"/></Link>
        <Link to="/admin-page/user-management">USER MANAGEMENT</Link>
        <Link to="/admin-page/product-listings">PRODUCT LISTINGS</Link>
        <Link to="/admin-page/order-fulfillment">ORDER FULFILLMENT</Link>
        <Link to="/admin-page/sales-reports">SALES REPORT</Link>
        <div className='navUser'>
          <button onClick={handleLogout}>LOG OUT</button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminPage;
