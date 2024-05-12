// pages/AdminHome.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <nav className='navAdmin'>
        <Link to="/admin-page">Home</Link>
        <Link to="/admin-page/user-management">User Management</Link>
        <Link to="/admin-page/product-listings">Product Listings</Link>
        <Link to="/admin-page/order-fulfillment">Order Fulfillment</Link>
        <Link to="/admin-page/sales-reports">Sales Reports</Link>
        <Link to="/">Log Out</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminPage;
