import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderFulfillment = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/product-list');
        setProducts(response.data);
      } catch (error) {
        console.error('Unable to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleConfirmOrder = async (orderId) => {
    try {
      await axios.put('http://localhost:3001/admin/orders/confirm', {
        orderId: orderId
      });
  
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  
  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put('http://localhost:3001/admin/orders/complete', {
        orderId: orderId
      });
  
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  
  const handleRejectOrder = async (orderId) => {
    try {
      await axios.put('http://localhost:3001/admin/orders/reject', {
        orderId: orderId
      });
  
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const getProductName = (ordProdId) => {
    const product = products.find(p => p._id === ordProdId);
    return product ? product.prodName : 'Unknown';
  };

  const getProductType = (ordProdId) => {
    const product = products.find(p => p._id === ordProdId);
    return product ? product.prodType : 'Unknown';
  };

  return (
    <>
      <div className='titleAdmin'>
        <h1>ORDER FULFILLMENT</h1>
      </div>
      <div className='order-container'>
        {orders.map(order => (
          <>
          <div className='order-cards' key={order._id}>
            <div className='prodName'>{getProductName(order.ordProdId)} | {getProductType(order.ordProdId)}</div>
            <div>{order.ordQty}</div>
            <div>Trans. ID: {order.ordTransId}</div>
            <div>Prod. ID: {order.ordProdId}</div>
            <div>{order.ordStatus}</div>
            {order.ordStatus === 'Pending' ? (
                <div>
                  <button className='confirmBtn' onClick={() => handleConfirmOrder(order._id)}>Confirm</button>
                  <button className='confirmBtn' onClick={() => handleRejectOrder(order._id)}>Reject</button>
                </div>
              ) : (
                order.ordStatus === 'Completed' || order.ordStatus === 'Rejected' ? (<div></div>) : (
                  <div>
                    <button className='confirmBtn' onClick={() => handleCompleteOrder(order._id)}>Delivered</button>
                  </div>
                )
              )
            }
          </div>
          </>
        ))}
      </div>
    </>
  );
};

export default OrderFulfillment;