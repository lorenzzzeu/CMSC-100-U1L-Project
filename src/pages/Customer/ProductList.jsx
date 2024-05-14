  import React, { useEffect, useState } from 'react';

  const ProductList = () => {
    const [prods, setProds] = useState([]);
    const [selectedType, setSelectedType] = useState('All'); // State to hold the selected product type
    const [sortOrder, setSortOrder] = useState({
      type: ''
    });


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

    const sortBy = (type) => {
      setSortOrder((prevOrder) => ({
        type,
        ascending: prevOrder.type === type ? !prevOrder.ascending : true
      }));
    };  

    // Filter products based on the selected product type
    const filteredProds = selectedType === 'All' ? prods : prods.filter(product => product.prodType === selectedType);

    // Sort the filtered products by price (ascending)
    if (sortOrder.type) {
      filteredProds.sort((a, b) => {
        if (sortOrder.type === 'price') {
          return a.prodPrice - b.prodPrice;
        } else if (sortOrder.type === 'name') {
          return a.prodName.localeCompare(b.prodName);
        } else if (sortOrder.type === 'quantity') {
          return a.prodQuant - b.prodQuant;
        } else if (sortOrder.type === 'type') {
          return a.prodType.localeCompare(b.prodType);
        }
        return 0;
      });
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
          <button onClick={() => sortBy('name')}>NAME</button>
          <button onClick={() => sortBy('price')}>PRICE</button>
          <button onClick={() => sortBy('quantity')}>QUANTITY</button>
          <button onClick={() => sortBy('type')}>TYPE</button>
        </div>
        <div className='product-container'>
          {filteredProds.map((product) =>
            <div className='product-cards' key={product._id}>
              <div className='card-img'><img src={product.prodImage}/></div>
              <h3>{product.prodName}</h3>
              <h4>Price: Php {product.prodPrice}</h4>
              <p>Food Type: {product.prodType}</p>
              <p>Quantity: {product.prodQuant}</p>
            </div>
          )}
        </div>
          
      </>
    );
  };

  export default ProductList;
