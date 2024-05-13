import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faShoppingCart, faList, faNewspaper } from '@fortawesome/free-solid-svg-icons';

const AdminHome = () => {
  return (
    <>
    <div className='headerAdmin'></div>
    <div className='titleCustomer'>
        <h1>WELCOME TO</h1>
        <h1>The Farm-to-Table E-Commerce Website</h1>
      </div>
    <hr/>
    <div className='admin-container'>
        <div className='admin-cards'>
          <FontAwesomeIcon icon={faUsers} size='5x' className='icon'/>
          <h1>USER MANAGEMENT</h1>
          <p>Manage all the users</p>
          <button>VIEW USERS</button>
        </div>
        <div className='admin-cards'>
          <FontAwesomeIcon icon={faShoppingCart} size='5x' className='icon'/>
          <h1>PRODUCT LISTINGS</h1>
          <p>Check all the available products</p>
          <button>PRODUCTS</button>
        </div>
        <div className='admin-cards'>
          <FontAwesomeIcon icon={faList} size='5x' className='icon'/>
          <h1>ORDER FULFILLMENT</h1>
          <p>View any pending orders</p>
          <button>VIEW ORDER</button>
        </div>
        <div className='admin-cards'>
          <FontAwesomeIcon icon={faNewspaper} size='5x' className='icon'/>
          <h1>SALES REPORTS</h1>
          <p>Time for briefing!</p>
          <button>MAKE A REPORT</button>
        </div>
      </div>
    </>
  );
};

export default AdminHome;