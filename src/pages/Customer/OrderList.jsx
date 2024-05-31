import axios from 'axios'; // Importing axios for HTTP requests
import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks from 'react'

// Defining the functional component OrderList
const OrderList = () => {
  // Declaring state variables using the useState hook
  const [orderList, setOrderList] = useState([]);  // State to hold list of orders
  const [products, setProducts] = useState([]);    // State to hold list of products

  // Fetching products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array ensures this runs once

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/product-list');
      setProducts(response.data); // Update the products state with fetched data
    } catch (error) {
      console.error('Unable to fetch products:', error); // Log any errors
    }
  };

  // Fetching orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array ensures this runs once

  // Function to fetch orders from the API
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get('http://localhost:3001/order-transaction', {
        headers: {
          'authorization': `Bearer ${token}` // Attach token to request headers
        }
      });
      setOrderList(response.data); // Update the orderList state with fetched data
    } catch (error) {
      console.error('Error fetching orders:', error.response ? error.response.data : error.message); // Log any errors
    }
  };

  // Function to handle order cancellation
  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      await retrieveProductQuantities(); // Retrieve and update product quantities
      await axios.delete(`http://localhost:3001/order-transaction`, {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: { orderId } // Send orderId in the request body
      });
      // Remove the cancelled order from the orderList state
      setOrderList(orderList.filter(order => order.ordTransId !== orderId));
    } catch (error) {
      console.error('Error cancelling order:', error.response ? error.response.data : error.message); // Log any errors
    }
  };

  // Function to retrieve and update product quantities based on cancelled orders
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
      console.error('Error updating product quantities:', error.response ? error.response.data : error.message); // Log any errors
    }
  };

  // Function to find product name using order product ID
  const findProductName = (ordProdId) => {
    const product = products.find(product => product._id === ordProdId);
    return product ? product.prodName : 'Product Not Found'; // Return product name or default message
  };

  // Function to find product image using order product ID
  const findProductImg = (ordProdId) => {
    const product = products.find(product => product._id === ordProdId);
    return product ? product.prodImage : 'Product Not Found'; // Return product image or default message
  };

  // Rendering the component
  return (
    <>
      <div className='headerCustomer'></div>
      <div className='titleCustomer'>
        <h1>ORDER LIST</h1>
      </div>
      <div>
        {orderList.length === 0 || orderList.every(order => order.ordStatus === 'Completed') ? (
          <div className='noItem'>
            <p>No Orders Yet.</p>
          </div>
        ) : (
          <>
            <div className='order'>
              {orderList.map((order) => (
                order.ordStatus === 'Completed' ? (<div key={order._id}></div>) :
                (
                  <div className='orderCard' key={order._id}>
                    <div className='card-img'><img src={findProductImg(order.ordProdId)} alt="Product" /></div>
                    <h3>{findProductName(order.ordProdId)}</h3>
                    <p>{order.ordDate.substring(0, 10)}</p>
                    <p>{order.time.substring(11, 19)}</p>
                    <p className='status'>{order.ordStatus}</p>
                    {order.ordStatus === 'Pending' ? (
                      <button onClick={() => handleCancelOrder(order.ordTransId)}>CANCEL</button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderList; // Exporting the OrderList component as the default export