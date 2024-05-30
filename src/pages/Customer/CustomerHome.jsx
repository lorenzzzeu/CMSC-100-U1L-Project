// Import necessary modules and components from 'react' and other libraries
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBowlFood, faBox, faTag } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define a functional component named 'CustomerHome'
const CustomerHome = () => {

  const navigate = useNavigate();   // useNavigate hook from react-router-dom for programmatic navigation; used in navigating

  // Function to navigate to the product list page
  const goToProduct = () => {
    navigate('/customer-page/product-list')
  }

  // Function to navigate to the shopping cart page
  const goToShop = () => {
    navigate('/customer-page/shopping-cart')
  }

  // Function to navigate to the order list page
  const goToOrder = () => {
    navigate('/customer-page/order-list')
  }

  // State to store the user profile information
  const [profile, setProfile] = useState({
    firstName: ''
  });

  // useEffect hook to fetch user details when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (token) {
          // Make a GET request to fetch the profile data
          const response = await axios.get('http://localhost:3001/profile', {
            headers: {
              Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }
          });
          // Update the profile state with the fetched data
          setProfile(response.data);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error.response ? error.response.data : error.message); // Log any error that occurs during the fetch process
      }
    };

    // Call the fetchProfile function
    fetchProfile();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      {/* Header section, might contain news and offers about the store */}
      <div className='headerCustomer'></div>
      {/* Title section welcoming the user */}
      <div className='titleCustomer'>
        <h1>WELCOME, {profile.firstName}!</h1>
      </div>
      {/* Main container for customer-related options */}
      <div className='customer-container'>
        {/* Card for viewing products */}
        <div className='customer-cards'>
          <FontAwesomeIcon icon={faBowlFood} size='5x' className='icon'/>
          <h1>PRODUCTS</h1>
          <p>Products from farm straight to your table</p>
          <button onClick={goToProduct}>VIEW PRODUCTS</button>
        </div>
        {/* Card for accessing the shopping cart */}
        <div className='customer-cards'>
          <FontAwesomeIcon icon={faShoppingCart} size='5x' className='icon'/>
          <h1>SHOP</h1>
          <p>Check what's on stock right now</p>
          <button onClick={goToShop}>SHOPPING CART</button>
        </div>
        {/* Card for viewing orders */}
        <div className='customer-cards'>
          <FontAwesomeIcon icon={faBox} size='5x' className='icon'/>
          <h1>ORDER</h1>
          <p>View your pendings and confirmations</p>
          <button onClick={goToOrder}>VIEW ORDER</button>
        </div>
        {/* Card for viewing discounts */}
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

// Export the CustomerHome component as the default export
export default CustomerHome;