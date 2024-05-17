
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CheckOut = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      fetchCartItems();
    }, []);
  
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
  
  const calculateTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + (item.prodPrice * item.prodQuant), 0);
    setTotal(totalPrice);
  };

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/order-transaction', {}, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      await updateProductQuantities();
      setIsClicked(true);
      setCartItems([]); // Clear cart items in the state
    } catch (error) {
      console.error('Error clearing cart items:', error.response ? error.response.data : error.message);
    }
  };

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
    {isClicked ? (
      <>
        <div className='headerCustomer'></div>
        <h1>Order Successful</h1>
        <Link to='/customer-page/order-list'>View Purchase</Link>
      </>
    ) : (
        <>
            <div className='headerCustomer'></div>
            <div className='titleCustomer'>
            <h1>SUMMARY</h1>
            </div>
            <hr/>
            <div>
                <ul>
                {cartItems.map((item) => (
                    <li key={item.prodId}>
                    <img src={item.prodImage} alt={item.prodName} width="50" />
                    <h3>{item.prodName}</h3>
                    <div>Quantity: {item.prodQuant}</div>
                    <p>Price: ${item.prodPrice}</p>
                    </li>
                ))}
                <div>
                    <h2>Order Total: {total}</h2>
                </div>
                <div>
                    <button onClick={() => handleClick()}>PLACE ORDER</button>
                </div>
                </ul>
            </div>
        </>
    )}
    </>

  );
};

export default CheckOut;
