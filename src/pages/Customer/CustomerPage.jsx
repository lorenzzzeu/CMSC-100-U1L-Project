// pages/CustomerHome.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ProductList from '../../components/Customer/ProductList';
import ShoppingCart from '../../components/Customer/ShoppingCart';
import OrderList from '../../components/Customer/OrderList';

const CustomerPage = () => {
  // Assume cartItems and orders are fetched from the server or passed as props
  const cartItems = [];
  const orders = [];

  return (
    // <div>
    //   <ProductList />
    //   <ShoppingCart cartItems={cartItems} />
    //   <OrderList orders={orders} />
    // </div>

    <div>
    <nav>
      <Link to="/customer-page">Home</Link>
      <Link to="/customer-page/product-list">Product List</Link>
      <Link to="/customer-page/shopping-cart">Shopping Cart</Link>
      <Link to="/customer-page/order-list">Order List</Link>
      <Link to="/">Log Out</Link>
    </nav>
    <Outlet />
  </div>
  );
};

export default CustomerPage;
