
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

  // fetches cart items
  useEffect(() => {
    fetchCartItems();
  }, []);

  // used in navigating
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const response = await axios.get('http://localhost:3001/cart-items', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      setCartItems(response.data);
      calculateTotal(response.data)
    } catch (error) {
      console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
    }
  };
  
  // calculates order total
  const calculateTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + (item.prodPrice * item.prodQuant), 0);
    setTotal(totalPrice);
  };

  // clears cart after checks out
  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/order-transaction', {}, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      await updateProductQuantities();
      setCartItems([]); // Clear cart items in the state
      navigate('/customer-page/order-list')
    } catch (error) {
      console.error('Error clearing cart items:', error.response ? error.response.data : error.message);
    }
  };

  // navigates to cart
  const goToCart = () => {
    navigate('/customer-page/shopping-cart')
  }

  const updateProductQuantities = async () => {
    try {
      // Fetch all products
      const response = await axios.get('http://localhost:3001/product-list');
      const products = response.data;
  
      // Update product quantities based on cart items
      for (const item of cartItems) {
        const product = products.find(prod => prod._id === item.prodId);
        if (product) {
          // Calculate new quantity after placing order
          const newQuantity = product.prodQuant - item.prodQuant;
          // Update product quantity in the database
          await axios.post('http://localhost:3001/update-product-quantity', { _id: item.prodId, prodQuant: newQuantity });
        }
      }
    } catch (error) {
      console.error('Error updating product quantities:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <>
    <div className='headerCustomer'></div>
    <div className='titleCustomer'>
    <h1>SUMMARY</h1>
    </div>
    <div className='checkOut'>
      <button onClick={goToCart} className='backBtn'>GO BACK</button>
      <h2>Order Total: {total}</h2>
      <button onClick={() => handleClick()} className='checkOutbtn'>PLACE ORDER</button>
    </div>
    <div className='cart'>
    {cartItems.map((item) => (
        <div className='cartCard' key={item.prodId}>
          <div className='cart-img'><img src={item.prodImage} alt={item.prodName}/></div>
          <h3>{item.prodName}</h3>
          <div>Quantity: {item.prodQuant}</div>
          <p>Price: ${item.prodPrice}</p>
        </div>
    ))}
    </div>
  </>
  );
};

export default CheckOut;
