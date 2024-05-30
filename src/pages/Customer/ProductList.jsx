import axios from 'axios'; // Import the axios library for making HTTP requests
import React, { useEffect, useState } from 'react'; // Import React and some hooks from the react library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component and some icons from the FontAwesome library
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';

// Define the ProductList component
const ProductList = () => {
  const [prods, setProds] = useState([]);   // State to hold the list of products
  const [cartItems, setCartItems] = useState([]);   // State to hold the items in the cart
  const [selectedType, setSelectedType] = useState('All');   // State to hold the selected product type for filtering
  const [sortOrder, setSortOrder] = useState({   // State to hold the sorting order
    type: ''
  });

  // Fetch products from the server when the component mounts
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

  // Function to set sorting order based on the selected type
  const sortBy = (type) => {
    setSortOrder((prevOrder) => ({
      type,
      ascending: prevOrder.type === type ? !prevOrder.ascending : true
    }));
  };

  // Filter products based on the selected product type
  const filteredProds = selectedType === 'All' ? prods : prods.filter(product => product.prodType === selectedType);

  // Sort the filtered products by the selected criterion
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

  // Fetch cart items from the server when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Function to fetch cart items
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const response = await axios.get('http://localhost:3001/cart-items', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      setCartItems(response.data); // Set cart items from response
    } catch (error) {
      console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
    }
  };

  // Function to add a product to the cart
  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/cart-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify({
          prodId: product._id,
          prodName: product.prodName,
          prodPrice: product.prodPrice,
          prodDesc: product.prodDesc,
          prodImage: product.prodImage,
          prodQuant: 1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
    }
  };

  // Function to check if the add to cart button should be disabled
  const isDisabled = (product) => {
    const cartProduct = cartItems.find((item) => item.prodId === product._id);
    return cartProduct ? cartProduct.prodQuant >= product.prodQuant : false;
  };

  // JSX to render the component
  return (
    <>
      <div className='headerCustomer'></div>
      <div className='titleCustomer'>
        <h1>AVAILABLE PRODUCTS</h1>
      </div>
      <div className='sortProduct'>
        <div className='searchProduct'>
          <FontAwesomeIcon icon={faFilter} size='1x' className='icon'/>
          <select name='search' onChange={handleTypeChange} value={selectedType}>
              <option value="All">All</option>
              <option value="Cereals">Cereals</option>
              <option value="Seeds">Seeds</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
          </select>
        </div>
        <div className='sorting'>
          <FontAwesomeIcon icon={faSort} size='1x' className='icon'/>
          <button onClick={() => sortBy('name')}>NAME</button>
          <button onClick={() => sortBy('price')}>PRICE</button>
          <button onClick={() => sortBy('quantity')}>QUANTITY</button>
          <button onClick={() => sortBy('type')}>TYPE</button>
        </div>
      </div>
      <div className='product-container'>
        {filteredProds.map((product) =>
          <div className='product-cards' key={product._id}>
            <div className='card-img'><img src={product.prodImage}/></div>
            <h3>{product.prodName}</h3>
            <p>{product.prodType}</p>  
            <h4>$ {product.prodPrice}</h4>
            <p>Quantity: {product.prodQuant}</p>
            {product.prodQuant > 0 ? (
              <button onClick={() => {addToCart(product)}} disabled={isDisabled(product)} className='addToCart'>Add to Cart</button>
            ) : (
                <h4 className='soldOut'>SOLD OUT</h4>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList; // Export the ProductList component as the default export