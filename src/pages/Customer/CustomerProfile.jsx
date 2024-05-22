import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [edit, setEdit] = useState(false);

  const [message, setMessage] = useState('');

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    // Fetch user profile on component mount
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
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
      const response = await axios.put('/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Error updating profile');
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

  return (
    <>
      <div className='headerCustomer'></div>
      <div className='profile-container'>
        <div className='profile-details'>
          <img src='\src\img\user.png'/>
          <p><strong>First Name Last Name</strong> {profile.firstName}{profile.lastName}</p>
          <p className='email'>Email {profile.email}</p>
          {/* You can display more details here if needed */}
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
              <div>
                <input
                  type='password'
                  name='password'
                  value={profile.password}
                  onChange={handleChange}
                  placeholder='Enter new password'
                />
              </div>
              <button type='submit'>Update Profile</button>
            </form>
          )}
        </div>
        <div className='profile-history'>
        <h3>History of Items Purchased</h3>
        <div>
          {orderList.map((order) => 
          <div key={order._id}>
            {order.ordStatus === 'Confirmed' ? (
              <>
                <h1>{order.ordTransId}</h1>
                <div>{order.ordDate.substring(0, 10)}</div>
                <div>{order.time.substring(11, 19)}</div>
                <div>Completed</div>
              </>
            ): (
              <div></div>
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
