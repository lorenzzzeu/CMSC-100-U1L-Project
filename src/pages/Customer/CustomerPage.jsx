// pages/CustomerHome.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ProductList from '../../components/Customer/ProductList';
import ShoppingCart from '../../components/Customer/ShoppingCart';
import OrderList from '../../components/Customer/OrderList';
import Root from '../Root';

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
    // <div>
    //   <ProductList />
    //   <ShoppingCart cartItems={cartItems} />
    //   <OrderList orders={orders} />
    // </div>

  <div>
    {isUserSignedIn ? (
        <div>
          <nav>
            <Link to="/customer-page">Home</Link>
            <Link to="/customer-page/product-list">Product List</Link>
            <Link to="/customer-page/shopping-cart">Shopping Cart</Link>
            <Link to="/customer-page/order-list">Order List</Link>
            <button onClick={handleLogout}>Log Out</button>
          </nav>
          <Outlet />
        </div>
      ) : (
        <>
        <Root />
        </>
      )}
  </div>
  );
};

export default CustomerPage;
