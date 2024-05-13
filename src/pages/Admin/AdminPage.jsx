// pages/AdminHome.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <nav className='navAdmin'>
        <Link to="/admin-page">HOME</Link>
        <Link to="/admin-page/user-management">USER MANAGEMENT</Link>
        <Link to="/admin-page/product-listings">PRODUCT LISTINGS</Link>
        <Link to="/admin-page/order-fulfillment">ORDER FULFILLMENT</Link>
        <Link to="/admin-page/sales-reports">SALES REPORT</Link>
        <Link to="/">LOG OUT</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminPage;
