// Importing necessary modules and components from React and Axios library
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Defining a functional component called OrderFulfillment
const OrderFulfillment = () => {
  // Defining state variables for orders and products using useState hook
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // useEffect hook to fetch orders when the component mounts
  useEffect(() => {
    // Declaring an asynchronous function to fetch orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/orders'); // Making a GET request to fetch orders from the server
        setOrders(response.data); // Updating the orders state with the fetched data
      } catch (error) {
        console.error('Unable to fetch orders:', error);
      }
    };

    // Calling the fetchOrders function when the component mounts
    fetchOrders();
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    // Declaring an asynchronous function to fetch products
    const fetchProducts = async () => {
      try {
        // Making a GET request to fetch products from the server
        const response = await axios.get('http://localhost:3001/product-list');
        // Updating the products state with the fetched data
        setProducts(response.data);
      } catch (error) {
        console.error('Unable to fetch products:', error);
      }
    };

    // Calling the fetchProducts function when the component mounts
    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  // Function to handle confirming orders
  const handleConfirmOrder = async (orderId) => {
    try {
      // Making a PUT request to confirm the order with the given orderId
      await axios.put('http://localhost:3001/admin/orders/confirm', {
        orderId: orderId
      });

      // Fetching updated orders after confirming the order and updating the orders state
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  // Function to handle completing orders
  const handleCompleteOrder = async (orderId) => {
    try {
      // Making a PUT request to mark the order with the given orderId as completed
      await axios.put('http://localhost:3001/admin/orders/complete', {
        orderId: orderId
      });

      // Fetching updated orders after completing the order and updating the orders state
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  // Function to handle rejecting orders
  const handleRejectOrder = async (orderId) => {
    try {
      // Making a PUT request to reject the order with the given orderId
      await axios.put('http://localhost:3001/admin/orders/reject', {
        orderId: orderId
      });

      // Fetching updated orders after rejecting the order and updating the orders state
      const response = await axios.get('http://localhost:3001/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  // Function to get product name using order product id
  const getProductName = (ordProdId) => {
    const product = products.find(p => p._id === ordProdId); // Finding the product with the given ordProdId
    return product ? product.prodName : 'Unknown'; // Returning the product name if found, else returning 'Unknown'
  };

  // Function to get product type using order product id
  const getProductType = (ordProdId) => {
    const product = products.find(p => p._id === ordProdId); // Finding the product with the given ordProdId
    return product ? product.prodType : 'Unknown'; // Returning the product type if found, else returning 'Unknown'
  };

  // Rendering JSX elements
  return (
    <>
      {/* Title */}
      <div className='titleAdmin'>
        <h1>ORDER FULFILLMENT</h1>
      </div>
      {/* Container for orders */}
      <div className='order-container'>
        {/* Mapping through orders and rendering order cards */}
        {orders.map(order => (
          <div className='order-cards' key={order._id}>
            {/* Displaying product name and type */}
            <div className='prodName'>{getProductName(order.ordProdId)} | {getProductType(order.ordProdId)}</div>
            {/* Displaying order quantity */}
            <div className='prodName'>{order.ordQty} qty</div>
            {/* Displaying transaction ID */}
            <div>Trans. ID: {order.ordTransId}</div>
            {/* Displaying product ID */}
            <div>Prod. ID: {order.ordProdId}</div>
            {/* Displaying order status */}
            <div>{order.ordStatus}</div>
            {/* Conditional rendering of buttons based on order status */}
            {order.ordStatus === 'Pending' ? (
              <div>
                {/* Button to confirm order */}
                <button className='confirmBtn' onClick={() => handleConfirmOrder(order._id)}>Confirm</button>
                {/* Button to reject order */}
                <button className='confirmBtn' onClick={() => handleRejectOrder(order._id)}>Reject</button>
              </div>
            ) : (
              order.ordStatus === 'Completed' || order.ordStatus === 'Rejected' ? (<div></div>) : (
                <div>
                  {/* Button to mark order as delivered */}
                  <button className='confirmBtn' onClick={() => handleCompleteOrder(order._id)}>Delivered</button>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderFulfillment; // Exporting the OrderFulfillment component