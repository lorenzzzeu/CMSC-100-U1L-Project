import React from 'react'; // Import the React library to use JSX and create components.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component from the '@fortawesome/react-fontawesome' package.
import { faUsers, faShoppingCart, faList, faNewspaper } from '@fortawesome/free-solid-svg-icons'; // Import specific icons from the '@fortawesome/free-solid-svg-icons' package.
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from the 'react-router-dom' package for navigation.

// Define a functional component called AdminHome.
const AdminHome = () => {

  // Initialize the navigate function using the useNavigate hook.
  const navigate = useNavigate(); // use to navigate different pages

  // Define a function to navigate to the user management page.
  const goToUsers = () => {
    navigate('/admin-page/user-management')
  }

  // Define a function to navigate to the product listings page.
  const goToProduct = () => {
    navigate('/admin-page/product-listings')
  }

  // Define a function to navigate to the order fulfillment page.
  const goToOrder = () => {
    navigate('/admin-page/order-fulfillment')
  }

  // Define a function to navigate to the sales reports page.
  const goToSales = () => {
    navigate('/admin-page/sales-reports')
  }

  // Return the JSX to render the component.
  return (
    <>
      {/* Title section */}
      <div className='titleCustomer'>
        <h1>Manage Your Website</h1>
      </div>
      {/* Main container for admin cards */}
      <div className='admin-container'>
        {/* User Management Card */}
        <div className='admin-cards'>
          {/* User Management Icon */}
          <FontAwesomeIcon icon={faUsers} size='5x' className='icon'/>
          <h1>USER MANAGEMENT</h1>
          <p>Manage all the users</p>
          <button onClick={goToUsers}>VIEW USERS</button>
        </div>
        {/* Product Listings Card */}
        <div className='admin-cards'>
          {/* Product Listings Icon */}
          <FontAwesomeIcon icon={faShoppingCart} size='5x' className='icon'/>
          <h1>PRODUCT LISTINGS</h1>
          <p>Check all the available products</p>
          <button onClick={goToProduct}>PRODUCTS</button>
        </div>
        {/* Order Fulfillment Card */}
        <div className='admin-cards'>
          {/* Order Fulfillment Icon */}
          <FontAwesomeIcon icon={faList} size='5x' className='icon'/>
          <center><h1>ORDER FULFILLMENT</h1></center>
          <p>View any pending orders</p>
          <button onClick={goToOrder}>VIEW ORDER</button>
        </div>
        {/* Sales Reports Card */}
        <div className='admin-cards'>
          {/* Sales Reports Icon */}
          <FontAwesomeIcon icon={faNewspaper} size='5x' className='icon'/>
          <h1>SALES REPORTS</h1>
          <p>Time for briefing!</p>
          <button onClick={goToSales}>MAKE A REPORT</button>
        </div>
      </div>
    </>
  );
};

export default AdminHome; // Export the AdminHome component as the default export.