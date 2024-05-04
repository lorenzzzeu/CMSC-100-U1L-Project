// components/ShoppingCart.jsx
import React, { useState } from 'react';
// import { removeFromCart } from '../utils/api';

const ShoppingCart = ({ cartItems }) => {
  const [items, setItems] = useState(cartItems);

  const handleRemoveFromCart = (itemId) => {
    // Remove item from the shopping cart
    // removeFromCart(itemId);
    // Optionally, update the UI to reflect the change in the shopping cart
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
