// pages/CustomerHome.jsx
import React from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import ProductList from '../../components/Customer/ProductList';
import ShoppingCart from '../../components/Customer/ShoppingCart';
import OrderList from '../../components/Customer/OrderList';
import Root from '../Root';
import Home from '../Home';

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
          <nav className='navCustomer'>
            <Link to="/customer-page">HOME</Link>
            <Link to="/customer-page/product-list">PRODUCT LIST</Link>
            <Link to="/customer-page/shopping-cart">SHOPPING CART</Link>
            <Link to="/customer-page/order-list">ORDER LIST</Link>
            <button onClick={handleLogout}>LOG OUT</button>
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
