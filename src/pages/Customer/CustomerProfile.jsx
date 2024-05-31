// Importing required modules from React and Axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the CustomerProfile functional component
const CustomerProfile = () => {
  // State for storing the user's profile information
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [edit, setEdit] = useState(false);   // State for tracking if the profile is in edit mode
  const [orderList, setOrderList] = useState([]);   // State for storing the list of orders made by the user
  const [products, setProducts] = useState([]);   // State for storing the list of products

  // useEffect to fetch profile details when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem('token');
        if (token) {
          // Make an API call to fetch the profile data
          const response = await axios.get('http://localhost:3001/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setProfile(response.data); // Update the profile state with the fetched data
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message);
      }
    };

    fetchProfile(); // Call the fetchProfile function
  }, []);

  // useEffect to fetch products details when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make an API call to fetch the product list
        const response = await axios.get('http://localhost:3001/product-list');
        // Update the products state with the fetched data
        setProducts(response.data);
      } catch (error) {
        console.error('Unable to fetch products:', error);
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, []);

  // Function to toggle the edit state
  const handleEdit = () => {
    setEdit(!edit);
  }

  // Function to handle input changes in the profile form
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Function to handle the submission of the profile edit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      // Make an API call to update the profile
      const response = await axios.put('http://localhost:3001/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Profile updated successfully');
      // Update the profile state with the response data
      setProfile(response.data.user);
      // Toggle the edit state
      handleEdit();
    } catch (error) {
      setMessage('Error updating profile');
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
    }
  };

  // useEffect to fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to fetch orders from the server
  const fetchOrders = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      // Make an API call to fetch the order transactions
      const response = await axios.get('http://localhost:3001/order-transaction', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      // Update the orderList state with the fetched data
      setOrderList(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response ? error.response.data : error.message);
    }
  };

  // Function to get product details using the product ID
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

  // Render the component
  return (
    <>
      <div className='headerCustomer'></div>
      <div className='profile-container'>
        <div className='profile-details'>
          <img src='\src\img\user.png'/>
          <p className='name'>{profile.firstName} {profile.lastName}</p>
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
              <button className='updateBtn' type='submit'>UPDATE PROFILE</button>
            </form>
          )}
        </div>
        <div className='profile-history'>
          <h3>History of Items Purchased</h3>
          <br/>
          <div className='product-container'>
          {orderList.length === 0 || orderList.every(order => order.ordStatus != 'Completed') ? (
            <div className='noItem'>
            <p>No Purchased Yet.</p>
            </div>
          ) : (
            <>
            {orderList.map((order) => 
              <div key={order._id}>
                {order.ordStatus === 'Completed' && (
                  <>
                  <div className="product-cards" key={order._id}>
                    <div className='card-img'><img src={getProductDetails(order.ordProdId).image} alt={getProductDetails(order.ordProdId).name} /></div> 
                    <h3>{getProductDetails(order.ordProdId).name}</h3>
                    <p>{getProductDetails(order.ordProdId).type}</p>
                    <p>Quantity: {order.ordQty}</p>
                    <p>Price: ${getProductDetails(order.ordProdId).price}</p>
                    <p>{order.ordDate.substring(0, 10)} | {order.time.substring(11, 19)}</p>
                    <p>Transaction ID: {order.ordTransId}</p>
                  </div>
                  </>
                )}
              </div>
            )}
            </>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile; // Export the CustomerProfile component as the default export