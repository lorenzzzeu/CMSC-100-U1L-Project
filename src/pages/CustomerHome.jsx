// pages/CustomerHome.jsx
import React from 'react';
import ProductList from '../components/Customer/ProductList';
import ShoppingCart from '../components/Customer/ShoppingCart';
import OrderList from '../components/Customer/OrderList';

const CustomerHome = () => {
  // Assume cartItems and orders are fetched from the server or passed as props
  const cartItems = [];
  const orders = [];

  return (
    <div>
      <ProductList />
      <ShoppingCart cartItems={cartItems} />
      <OrderList orders={orders} />
    </div>
  );
};

export default CustomerHome;
