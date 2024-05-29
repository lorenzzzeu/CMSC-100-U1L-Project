import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';

function ProductListings() {
  const [prodName, setprodName] = useState('');
  const [prodType, setprodType] = useState('');
  const [prodPrice, setprodPrice] = useState(0);
  const [prodDesc, setDesc] = useState('');
  const [prodQuant, setQuant] = useState(0);
  const [prodImage, setImage] = useState('');
  const [products, setProducts] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [currProdID, setProdID] = useState(null);
  const [selectedType, setSelectedType] = useState('All');
  const [sortOrder, setSortOrder] = useState({
    type: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3001/admin-page/product-listings')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log('Unable to fetch products:', error);
      });
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const sortBy = (type) => {
    setSortOrder((prevOrder) => ({
      type,
      ascending: prevOrder.type === type ? !prevOrder.ascending : true
    }));
  };

  const filteredProducts = selectedType === 'All' ? products : products.filter(product => product.prodType === selectedType);

  if (sortOrder.type) {
    filteredProducts.sort((a, b) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { prodName, prodType, prodPrice, prodDesc, prodQuant, prodImage };
    if (isEdit) {
      axios.put(`http://localhost:3001/admin-page/product-listings/${currProdID}`, product)
        .then(() => {
          alert('Product updated successfully');
          setEdit(false);
          setProdID(null);
          clearForm();
          fetchProducts();
        })
        .catch((error) => {
          console.log('Unable to update product:', error);
          alert('Failed to update product');
        });
    } else {
      // Add a new product
      axios.post('http://localhost:3001/product-list', product)
        .then(() => {
          alert('Product added successfully');
          clearForm();
          fetchProducts();
        })
        .catch((error) => {
          console.log('Unable to add product:', error);
          alert('Failed to add product');
        });
    }
  };

  const clearForm = () => {
    setprodName('');
    setprodType('');
    setprodPrice(0);
    setDesc('');
    setQuant(0);
    setImage('');
  };

  const handleEdit = (product) => {
    setprodName(product.prodName);
    setprodType(product.prodType);
    setprodPrice(product.prodPrice);
    setDesc(product.prodDesc);
    setQuant(product.prodQuant);
    setImage(product.prodImage);
    setEdit(true);
    setProdID(product._id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/admin-page/product-listings/${id}`)
      .then(() => {
        alert('Product deleted successfully');
        fetchProducts();
      })
      .catch((error) => {
        console.log('Unable to delete product:', error);
        alert('Failed to delete product');
      });
  };

  return (
    <>
      <div className='titleAdmin'>
        <h1>PRODUCT LISTINGS</h1>
      </div>
      <div className='prod-list-container'>
        <div className='input-container'>
          <form id="prodForm" onSubmit={handleSubmit}>
            <input type="text" id="prodName" name="prodName" value={prodName} onChange={(e) => setprodName(e.target.value)} required placeholder="Product Name" />
            <div>
              <select id="prodType" name="prodType" value={prodType} onChange={(e) => setprodType(e.target.value)} required>
                <option value="Cereals">Cereals</option>
                <option value="Seeds">Seeds</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
              </select>
            </div>
            <input type="number" id="prodPrice" name="prodPrice" value={prodPrice} onChange={(e) => setprodPrice(e.target.value)} required placeholder="Product Price" />
            <input type="text" id="prodDesc" name="prodDesc" value={prodDesc} onChange={(e) => setDesc(e.target.value)} required placeholder="Product Description" />
            <input type="number" id="prodQuant" name="prodQuant" value={prodQuant} onChange={(e) => setQuant(e.target.value)} required placeholder="Product Quantity" />
            <input type="text" id="prodImage" name="prodImage" value={prodImage} onChange={(e) => setImage(e.target.value)} required placeholder="Product Image" />
            <input type="submit" value={isEdit ? "UPDATE" : "SUBMIT"} id="submitButton" />
          </form>
        </div>
        <div className='prod-list-products'>
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
        <div className="product-container">
          {filteredProducts.map((product) => (
            <div className="product-cards" key={product._id}>
              <div className='card-img'><img src={product.prodImage} alt={product.prodName} /></div>
              <h3>{product.prodName}</h3>
              <p>Type: {product.prodType}</p>
              <p>Price: ${product.prodPrice}</p>
              <p>Description: {product.prodDesc}</p>
              <p>Quantity: {product.prodQuant}</p>
              <div className='btn'>
                <button className='editProd' onClick={() => handleEdit(product)}>Edit</button>
                <button className='delProd' onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}

export default ProductListings;
