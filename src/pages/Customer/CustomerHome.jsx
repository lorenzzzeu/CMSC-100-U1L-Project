import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBowlFood, faBox, faTag } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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

  return (
    <>
    {/* MAY CONTAIN NEWS AND OFFERS ABOUT THE STORE */}
    <div className='headerCustomer'></div>
      <div className='titleCustomer'>
        <h1>WELCOME, user!</h1>
      </div>
      <hr/>
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
      <h1 className='header'>WHAT'S NEW</h1>
      <div className='news-customer'>
        <div className='news'>
          <p className='title'>The Farm-to-Table Movement</p>
          <p>As they say in action movies: kill the middle man. That pretty much sums up 
            the concept of farm-to-table, the latest buzzword in restaurant du jour. Instead 
            of ordering from suppliers or importing overseas, restaurants and other eating 
            establishments order their ingredients-particularly fruits and vegetables-small-scale 
            and straight from the source, farmers who cut down the complications of red tape to a 
            bare minimum. One chef, Tom Colicchio, Top Chef judge and owner of Craft Restaurants, 
            describes that this is as close as city-dwellers can get to eating from the earth. Having 
            a direct relationship with farmers results in fresher, cheaper, and more natural produce. 
            It also has the added benefit of supporting local industry. Dining farm-to-table, or 
            farm-to-fork in some areas, is also ideally much healthier (Uy, 2017).
            </p>
        </div>
        <div className='news'>
        <p className='title'>The Wholesome Table Champions</p>
          <p>
          The idea behind the farm-to-table concept restaurant is to understand where your food comes from. 
          Here, ingredients and raw materials are directly sourced from farmers, bypassing brokers, dealers, 
          stores, and markets. The farm-to-table dining concept is well-accepted because it champions sustainable 
          and ethical food production. From a macro perspective, this restaurant concept can aid the economy by 
          supporting local farmers and ensuring food security. It can even benefit the environment because the 
          system reduces carbon emissions and lessens overall wastage. For your business, this model allows you 
          to serve only the freshest, organic, wholesome ingredients. It also promotes efficiency as you can maximize 
          products while minimizing costs. Plus, you can lessen purchasing and transportation expenses as most of your 
          products come straight from one source. As for customers, most will appreciate this movement as it highlights 
          putting a premium on their health (The Wholesome Table Champions the Farm-to-Table Concept, n.d.).
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomerHome;