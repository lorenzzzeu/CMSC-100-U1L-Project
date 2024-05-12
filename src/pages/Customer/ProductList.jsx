import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [prods, setProds] = useState([]);
  const [selectedType, setSelectedType] = useState('All'); // State to hold the selected product type

  useEffect(() => {
    fetch('http://localhost:3001/product-list')
      .then(response => response.json())
      .then(data => {
        setProds(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Function to handle changes in the product type selection
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  // Filter products based on the selected product type
  const filteredProds = selectedType === 'All' ? prods : prods.filter(product => product.prodType === selectedType);

  // Sort the filtered products by price (ascending)
  filteredProds.sort((a, b) => a.prodPrice - b.prodPrice);


  return (
    <div>
      <div>
        <h1>View All Products</h1>
        <div>
          <label htmlFor='search'>Search by product type </label>
          <select name='search' onChange={handleTypeChange} value={selectedType}>
              <option value="All">All</option>
              <option value="Cereals">Cereals</option>
              <option value="Seeds">Seeds</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
          </select>
        
        </div>
        <div>
          {/* MANAGE THE DESIGN AND SIZE OF PRODUCT CARDS HERE */}
          {filteredProds.map((product) =>
            <div key={product._id}>
              <img src={product.prodImage}/>
              <h3>{product.prodName}</h3>
              <h4>{product.prodPrice}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
