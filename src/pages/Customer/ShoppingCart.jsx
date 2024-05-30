
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // fetches cart items
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
    <div>
      {cartItems.length === 0 ? (
        <div className='noItem'>
        <p>No items in the cart.</p>
        </div>
      ) : (
        <>
        <div className='checkOut'>
          <Link to='/customer-page/product-list'><button className='backBtn'>BACK</button></Link>
          <h2>Total: $ {total}.00</h2>
          <Link to='/customer-page/check-out'><button className='checkOutbtn'>CHECK OUT</button></Link>
        </div>
        <div className='cart'>
          {cartItems.map((item) => (
            <div className='cartCard' key={item.prodId}>
              <div className='cart-img'><img src={item.prodImage} alt={item.prodName}/></div>
              <h3>{item.prodName}</h3>
              <p>Price: ${item.prodPrice}</p>
              <div className='quantity'>
                <button className='decre' onClick={() => decCartQuantity(item)}>–</button>
                <div>{item.prodQuant}</div>
                <button className='incre' onClick={() => incCartQuantity(item)}>+</button>
                <button className='removebtn' onClick={() => removeCartItem(item)}>Remove</button>
              </div> 
            </div>
          ))}
        </div>
        </>
      )}
    </div>
    </>

  );
};

export default ShoppingCart;
