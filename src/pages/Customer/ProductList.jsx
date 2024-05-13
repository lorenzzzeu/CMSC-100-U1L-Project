  import React, { useEffect, useState } from 'react';

  const ProductList = () => {
    const [prods, setProds] = useState([]);
    const [selectedType, setSelectedType] = useState('All'); // State to hold the selected product type
    const [sortByPrice, setSortByPrice] = useState(false);
    const [sortByName, setSortByName] = useState(false);

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

    const toggleSortByPrice = () => {
      setSortByPrice(!sortByPrice);
    };

    const toggleSortByName = () => {
      setSortByName(!sortByName);
    };

    // Filter products based on the selected product type
    const filteredProds = selectedType === 'All' ? prods : prods.filter(product => product.prodType === selectedType);

    // Sort the filtered products by price (ascending)
    if (sortByPrice){
      filteredProds.sort((a, b) => a.prodPrice - b.prodPrice);
    }

    if (sortByName){
      filteredProds.sort((a, b) => a.prodName.localeCompare(b.prodName));
    }

    return (
      <>
        <div className='headerCustomer'></div>
        <div className='titleCustomer'>
          <h1>AVAILABLE PRODUCTS</h1>
        </div>
        <hr/>
        <div className='sortProduct'>
          <div className='searchProduct'>
            <label htmlFor='search'>SEARCH BY PRODUCT TYPES</label>
            <select name='search' onChange={handleTypeChange} value={selectedType}>
                <option value="All">All</option>
                <option value="Cereals">Cereals</option>
                <option value="Seeds">Seeds</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
            </select>
          </div>
          <p>SORT BY</p>
          <button onClick={toggleSortByName}>NAME</button>
          <button onClick={toggleSortByPrice}>PRICE</button>
        </div>
        

        <div className='product-container'>
          {/* MANAGE THE DESIGN AND SIZE OF PRODUCT CARDS HERE */}
          {filteredProds.map((product) =>
            <div className='product-cards' key={product._id}>
              <div className='card-img'><img src={product.prodImage}/></div>
              <h3>{product.prodName}</h3>
              <h4>Php {product.prodPrice}</h4>
            </div>
          )}
        </div>
          
      </>
    );
  };

  export default ProductList;
