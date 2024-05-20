import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderFulfillment = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Unable to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirmOrder = async (orderId) => {
    try {
      await axios.post(`http://localhost:3001/admin/orders/confirm/${orderId}`);
  
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  
  const handleRejectOrder = async (orderId) => {
    try {
      await axios.post(`http://localhost:3001/admin/orders/reject/${orderId}`);
  
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  return (
    <>
      <div className='headerAdmin'></div>
      <div className='titleAdmin'>
        <h1>ORDER FULFILLMENT</h1>
      </div>
      <table className='orderTable'>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.ordTransId}</td>
              <td>{order.ordProdId}</td>
              <td>{order.ordQty}</td>
              <td>{order.ordStatus}</td>
              <td>
                <button className='confirmBtn' onClick={() => handleConfirmOrder(order._id)}>Confirm</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderFulfillment;