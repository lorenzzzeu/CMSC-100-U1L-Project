import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBowlFood, faBox, faTag } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerHome = () => {

  const navigate = useNavigate();

  const goToProduct = () => {
    navigate('/customer-page/product-list')
  }

  const goToShop = () => {
    navigate('/customer-page/shopping-cart')
  }

  const goToOrder = () => {
    navigate('/customer-page/order-list')
  }

  const [profile, setProfile] = useState({
    firstName: ''
  });

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

  return (
    <>
    {/* MAY CONTAIN NEWS AND OFFERS ABOUT THE STORE */}
    <div className='headerCustomer'></div>
      <div className='titleCustomer'>
        <h1>WELCOME, {profile.firstName}!</h1>
      </div>
      <div className='customer-container'>
        <div className='customer-cards'>
          <FontAwesomeIcon icon={faBowlFood} size='5x' className='icon'/>
          <h1>PRODUCTS</h1>
          <p>Products from farm straight to your table</p>
          <button onClick={goToProduct}>VIEW PRODUCTS</button>
        </div>
        <div className='customer-cards'>
          <FontAwesomeIcon icon={faShoppingCart} size='5x' className='icon'/>
          <h1>SHOP</h1>
          <p>Check what's on stock right now</p>
          <button onClick={goToShop}>SHOPPING CART</button>
        </div>
        <div className='customer-cards'>
          <FontAwesomeIcon icon={faBox} size='5x' className='icon'/>
          <h1>ORDER</h1>
          <p>View your pendings and confirmations</p>
          <button onClick={goToOrder}>VIEW ORDER</button>
        </div>
        <div className='customer-cards'>
          <FontAwesomeIcon icon={faTag} size='5x' className='icon'/>
          <h1>DISCOUNTS</h1>
          <p>Payday Sale at 50% and other discounts</p>
          <button onClick={goToShop}>CHECK OFFERS</button>
        </div>
      </div>
    </>
  );
};

export default CustomerHome;