import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3001/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setProfile(response.data);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
      }
    };

    fetchProfile();
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

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:3001/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Profile updated successfully');
      setProfile(response.data.user);
      handleEdit();
    } catch (error) {
      setMessage('Error updating profile');
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
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

  return (
    <>
      <div className='headerCustomer'></div>
      <div className='profile-container'>
        <div className='profile-details'>
          <img src='\src\img\user.png'/>
          <p>{profile.firstName} {profile.lastName}</p>
          <p className='email'>Email: {profile.email}</p>
          <button className='editBtn' onClick={handleEdit}>EDIT PROFILE</button>
          {edit && (
            <form className='edit-profile' onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  name='firstName'
                  value={profile.firstName}
                  onChange={handleChange}
                  placeholder='Enter new first name'
                />
              </div>
              <div>
                <input
                  type='text'
                  name='lastName'
                  value={profile.lastName}
                  onChange={handleChange}
                  placeholder='Enter new last name'
                />
              </div>
              <div>
                <input
                  type='email'
                  name='email'
                  value={profile.email}
                  onChange={handleChange}
                  placeholder='Enter new email'
                />
              </div>
              <button type='submit'>Update Profile</button>
            </form>
          )}
        </div>
        <div className='profile-history'>
          <h3>History of Items Purchased</h3>
          <br/>
          <div className='orderList'>
          {orderList.map((order) => 
            <div className="order-cards" key={order._id}>
              {order.ordStatus === 'Completed' && (
                <>
                  <div>
                    <img src={getProductDetails(order.ordProdId).image} alt={getProductDetails(order.ordProdId).name} />
                  </div>
                  <div className="prod-details">
                    <h3>{getProductDetails(order.ordProdId).name}</h3>
                    <p>{getProductDetails(order.ordProdId).type}</p>
                  </div>
                  <div className="prod-details">
                    <p>{order.ordDate.substring(0, 10)}</p>
                    <p>{order.time.substring(11, 19)}</p>
                  </div>
                  <div className="prod-details">
                    <p>Price: ${getProductDetails(order.ordProdId).price}</p>
                  </div>
                  <div className="prod-details">
                    <p>{order.ordTransId}</p>
                  </div>
                  <div className="prod-details">
                    <p>{order.ordQty}</p>
                  </div>
                </>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
