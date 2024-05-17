
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/order-transaction', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      setOrderList(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response ? error.response.data : error.message);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/order-transaction/${orderId}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      // Remove the cancelled order from the orderList state
      setOrderList(orderList.filter(order => order.ordTransId !== orderId));
    } catch (error) {
      console.error('Error cancelling order:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
    <div className='headerCustomer'></div>
    <div className='titleCustomer'>
      <h1>ORDER LIST</h1>
    </div>
    <hr/>
    <div>
    <ul>
        {orderList.map((order) => (
          <li key={order.ordTransId}>
            <div>{order.ordTransId}</div>
            <div>{order.ordDate}</div>
            <div>{order.time}</div>
            <div>{order.ordStatus}</div>
            {order.ordStatus === 'Pending' ? (
              <button onClick={() => handleCancelOrder(order.ordTransId)}>Cancel</button>
            ): (
              <div></div>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default OrderList;
