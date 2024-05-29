// pages/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin-page/listusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Unable to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

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

  const getProductDetails = (ordProdId) => {
    const product = products.find(p => p._id === ordProdId);
    if (product) {
      return {
        name: product.prodName,
        type: product.prodType,
        price: product.prodPrice,
        image: product.prodImage
      };
    } else {
      return {
        name: 'Unknown',
        type: 'Unknown',
        price: 'Unknown',
        image: 'Unknown'
      };
    }
  };

  const totalUsers = users.length;

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
  }

  return (
    <>
    <div id='blur'>
      <div className="titleAdmin">
        <h1>USER MANAGEMENT</h1>
        <p>Total registered users: {totalUsers}</p>
      </div>
      <div className='user-container'>
        {users.map((user) => 
          <div key={user._id}>
            {user.userType == 'customer' && (
              <>
              <div className='user-cards' key={user._id} onClick={() => handleUserClick(user._id)}>
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
              </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
      <div id='popup'>
        <h3>Transaction History </h3>
        {orders.map(order => (
          <div key={order._id}>
            {order.email === selectedUser && (
              <div className="popup-cards">
                <div className='card-img'><img src={getProductDetails(order.ordProdId).image} alt={getProductDetails(order.ordProdId).name} /></div> 
                <h3>{getProductDetails(order.ordProdId).name}</h3>
                <p>{getProductDetails(order.ordProdId).type}</p>
                <p>Quantity: {order.ordQty}</p>
                <p>Price: ${getProductDetails(order.ordProdId).price}</p>
                <p>{order.ordDate.substring(0, 10)} | {order.time.substring(11, 19)}</p>
                <p>Transaction ID: {order.ordTransId}</p>
                <p>{order.ordStatus}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserManagement;
