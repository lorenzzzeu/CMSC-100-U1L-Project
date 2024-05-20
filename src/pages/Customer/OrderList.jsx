
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/product-list');
      setProducts(response.data);
    } catch (error) {
      console.error('Unable to fetch products:', error);
    }
  };

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
      await retrieveProductQuantities();
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

  const retrieveProductQuantities = async () => {
    try {
      // Fetch all products
      const response = await axios.get('http://localhost:3001/product-list');
      const products = response.data;
  
      // Update product quantities based on order list
      for (const item of orderList) {
        const product = products.find(prod => prod._id === item.ordProdId);
        if (product) {
          // Calculate new quantity after cancelling an order
          const newQuantity = product.prodQuant + item.ordQty;
          // Update product quantity in the database
          await axios.post('http://localhost:3001/update-product-quantity', { _id: item.ordProdId, prodQuant: newQuantity });
        }
      }
    } catch (error) {
      console.error('Error updating product quantities:', error.response ? error.response.data : error.message);
    }
  };

  const findProductName = (ordProdId) => {
    const product = products.find(product => product._id === ordProdId);
    return product ? product.prodName : 'Product Not Found';
  };

  const findProductImg = (ordProdId) => {
    const product = products.find(product => product._id === ordProdId);
    return product ? product.prodImage : 'Product Not Found';
  };

  return (
    <>
    <div className='headerCustomer'></div>
    <div className='titleCustomer'>
      <h1>ORDER LIST</h1>
    </div>
    <div>
      <div className='order'>
        {orderList.map((order) => (
          <div className='orderCard' key={order.ordTransId}>
            <div className='card-img'><img src={findProductImg(order.ordProdId)}/></div>
            <div className='prodName'>{findProductName(order.ordProdId)}</div>
            <div>{order.ordDate}</div>
            <div>{order.time}</div>
            <div className='status'>{order.ordStatus}</div>
            {order.ordStatus === 'Pending' ? (
              <button onClick={() => handleCancelOrder(order.ordTransId)}>CANCEL</button>
            ): (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default OrderList;