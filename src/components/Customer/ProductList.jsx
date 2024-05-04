// components/ProductList.jsx
import React, { useState, useEffect } from 'react';
// import { addToCart } from '../utils/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product listings from the server
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
    // Add product to the shopping cart
    addToCart(productId);
    // Optionally, update the UI to reflect the change in the shopping cart
  };

  return (
    <div>
      <h2>Product Listings</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>{product.name}</div>
            <div>{product.description}</div>
            <div>{product.price}</div>
            <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
