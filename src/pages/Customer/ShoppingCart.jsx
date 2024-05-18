
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
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
        setCartItems(response.data); // Set cart items from response
        calculateTotal(response.data)
      } catch (error) {
        console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
      }
    };
  
  const calculateTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + (item.prodPrice * item.prodQuant), 0);
    setTotal(totalPrice);
  };

  const incCartQuantity = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/cart-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prodId: product.prodId,
          prodQuant: 1 // Increment by 1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setCartItems(data);
      calculateTotal(data)
    } catch (error) {
      console.error('Error updating quantity to cart:', error.message);
    }
  };
  
  const decCartQuantity = async (product) => {
    try {
      const token = localStorage.getItem('token');
      // Check if the quantity is already at the minimum (1) before decrementing
      if (product.prodQuant > 1) {
        const response = await fetch('http://localhost:3001/cart-items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            prodId: product.prodId,
            prodQuant: -1 // Decrement by 1
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        setCartItems(data);
        calculateTotal(data)
      } else {
        console.log('Minimum quantity reached. Cannot decrement further.');
      }
    } catch (error) {
      console.error('Error updating quantity to cart:', error.message);
    }
  };

  const removeCartItem = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/remove-cart-item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({prodId: product.prodId})
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setCartItems(data);
      calculateTotal(data)
    } catch (error) {
      console.error('Error removing item to cart:', error.message);
    }
  };
  

  return (
    <>
    <div className='headerCustomer'></div>
    <div className='titleCustomer'>
      <h1>SHOPPING CART</h1>
    </div>
    <hr/>
    <div>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.prodId}>
              <img src={item.prodImage} alt={item.prodName} width="50" />
              <h3>{item.prodName}</h3>
              <p>Price: ${item.prodPrice}</p>
              <div>
                <button onClick={() => decCartQuantity(item)}>–</button>
                <div>{item.prodQuant}</div>
                <button onClick={() => incCartQuantity(item)}>+</button>
              </div> 
              <button onClick={() => removeCartItem(item)}>Remove</button>
            </li>
          ))}
          <div>
            <h2>Total: {total}</h2>
            <Link to='/customer-page/check-out'><button>CHECK OUT</button></Link>
          </div>
        </ul>
      )}
    </div>
    </>

  );
};

export default ShoppingCart;
