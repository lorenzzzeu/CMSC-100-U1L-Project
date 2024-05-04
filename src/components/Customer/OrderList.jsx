// components/OrderList.jsx
import React, { useState, useEffect } from 'react';
// import { cancelOrder } from '../utils/api';

const OrderList = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders);

  const handleCancelOrder = (orderId) => {
    // Cancel the order
    // cancelOrder(orderId);
    // Optionally, update the UI to reflect the change in order status
  };

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orderList.map((order) => (
          <li key={order.id}>
            <div>{order.id}</div>
            <div>{order.status}</div>
            <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
