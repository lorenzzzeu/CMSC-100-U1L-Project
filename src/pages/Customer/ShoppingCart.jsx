// Importing necessary modules and components
import axios from 'axios'; // Importing axios for making HTTP requests
import React, { useEffect, useState } from 'react'; // Importing React and hooks
import { Link } from 'react-router-dom'; // Importing Link for navigation

// Defining the ShoppingCart component
const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);   // State to hold cart items
  const [total, setTotal] = useState(0);   // State to hold total price of cart items

  // useEffect hook to fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems(); // Fetch cart items on component mount
  }, []); // Empty dependency array ensures this runs only once

  // Function to fetch cart items from the server
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const response = await axios.get('http://localhost:3001/cart-items', {
        headers: {
          'authorization': `Bearer ${token}` // Set authorization header
        }
      });
      setCartItems(response.data); // Set cart items from response
      calculateTotal(response.data); // Calculate total price
    } catch (error) {
      console.error('Error fetching cart items:', error.response ? error.response.data : error.message); // Log error
    }
  };

  // Function to calculate the total price of cart items
  const calculateTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + (item.prodPrice * item.prodQuant), 0); // Calculate total price
    setTotal(totalPrice); // Update total price state
  };

  // Function to increment the quantity of a cart item
  const incCartQuantity = async (product) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await fetch('http://localhost:3001/cart-items', {
        method: 'POST', // POST request to update quantity
        headers: {
          'Content-Type': 'application/json', // Set content type
          'Authorization': `Bearer ${token}` // Set authorization header
        },
        body: JSON.stringify({
          prodId: product.prodId,
          prodQuant: 1 // Increment by 1
        })
      });

      if (!response.ok) { // Check if response is not OK
        const errorData = await response.json(); // Parse error data
        throw new Error(errorData.message); // Throw error
      }

      const data = await response.json(); // Parse response data
      setCartItems(data); // Update cart items
      calculateTotal(data); // Recalculate total price
    } catch (error) {
      console.error('Error updating quantity to cart:', error.message); // Log error
    }
  };

  // Function to decrement the quantity of a cart item
  const decCartQuantity = async (product) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      // Check if the quantity is already at the minimum (1) before decrementing
      if (product.prodQuant > 1) {
        const response = await fetch('http://localhost:3001/cart-items', {
          method: 'POST', // POST request to update quantity
          headers: {
            'Content-Type': 'application/json', // Set content type
            'Authorization': `Bearer ${token}` // Set authorization header
          },
          body: JSON.stringify({
            prodId: product.prodId,
            prodQuant: -1 // Decrement by 1
          })
        });

        if (!response.ok) { // Check if response is not OK
          const errorData = await response.json(); // Parse error data
          throw new Error(errorData.message); // Throw error
        }

        const data = await response.json(); // Parse response data
        setCartItems(data); // Update cart items
        calculateTotal(data); // Recalculate total price
      } else {
        console.log('Minimum quantity reached. Cannot decrement further.'); // Log minimum quantity reached
      }
    } catch (error) {
      console.error('Error updating quantity to cart:', error.message); // Log error
    }
  };

  // Function to remove a cart item
  const removeCartItem = async (product) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await fetch('http://localhost:3001/remove-cart-item', {
        method: 'DELETE', // DELETE request to remove item
        headers: {
          'Content-Type': 'application/json', // Set content type
          'Authorization': `Bearer ${token}` // Set authorization header
        },
        body: JSON.stringify({ prodId: product.prodId }) // Set product ID in body
      });

      if (!response.ok) { // Check if response is not OK
        const errorData = await response.json(); // Parse error data
        throw new Error(errorData.message); // Throw error
      }

      const data = await response.json(); // Parse response data
      setCartItems(data); // Update cart items
      calculateTotal(data); // Recalculate total price
    } catch (error) {
      console.error('Error removing item to cart:', error.message); // Log error
    }
  };

  // Rendering the shopping cart
  return (
    <>
      <div className='headerCustomer'></div> {/* Header section */}
      <div className='titleCustomer'>
        <h1>SHOPPING CART</h1> {/* Title */}
      </div>
      <div>
        {cartItems.length === 0 ? ( // Check if cart is empty
          <div className='noItem'>
            <p>No items in the cart.</p> {/* Message for empty cart */}
          </div>
        ) : (
          <>
            <div className='checkOut'>
              <Link to='/customer-page/product-list'><button className='backBtn'>BACK</button></Link> {/* Back button */}
              <h2>Total: $ {total}.00</h2> {/* Display total price */}
              <Link to='/customer-page/check-out'><button className='checkOutbtn'>CHECK OUT</button></Link> {/* Check out button */}
            </div>
            <div className='cart'>
              {cartItems.map((item) => ( // Map through cart items
                <div className='cartCard' key={item.prodId}> {/* Cart item */}
                  <div className='cart-img'><img src={item.prodImage} alt={item.prodName} /></div> {/* Item image */}
                  <h3>{item.prodName}</h3> {/* Item name */}
                  <p>Price: ${item.prodPrice}</p> {/* Item price */}
                  <div className='quantity'>
                    <button className='decre' onClick={() => decCartQuantity(item)}>–</button> {/* Decrement button */}
                    <div>{item.prodQuant}</div> {/* Item quantity */}
                    <button className='incre' onClick={() => incCartQuantity(item)}>+</button> {/* Increment button */}
                    <button className='removebtn' onClick={() => removeCartItem(item)}>Remove</button> {/* Remove button */}
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

export default ShoppingCart; // Exporting the ShoppingCart component as default