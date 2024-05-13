import React, { useState } from 'react';
import axios from 'axios';

function ProductListings()  {
  const [prodName, setprodName] = useState('');
  const [prodType, setprodType] = useState('');
  const [prodPrice, setprodPrice] = useState('');
  const [prodDesc, setDesc] = useState('');
  const [prodQuant, setQuant] = useState('');
  const [prodImage, setImage] = useState('')

  const fetchProducts = () => {
    axios.get('http://localhost:3001/admin-page/product-listings').then((res) => {
      console.log(res.data) // Just for checking, must remove this later
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement registration functionality here
    axios.post('http://localhost:3001/admin-page/product-listings', { prodName, prodType, prodPrice, prodDesc, prodQuant, prodImage }).then(() => {
      alert('Successful') // Just for checking
      setprodName('')
      setprodType('')
      setprodPrice(0)
      setDesc('')
      setQuant(0) // Corrected typo here
      setImage('')
      fetchProducts()
    }).catch((error) => {
      console.log('Unable to add Product')
    });
  };

  return (
    <>
      <div className='headerAdmin'></div>
      <div className='titleAdmin'>
        <h1>PRODUCT LISTING</h1>
      </div>
      <hr/>
      <div className='input-container'>
        <div id='productInput'>
          <form id="prodForm" onSubmit={handleSubmit}>
            <input type="text" id="prodName" name="prodName" value={prodName} onChange={(e) => setprodName(e.target.value)} required placeholder="Product Name" />
            <input type="text" id="prodType" name="prodType" value={prodType} onChange={(e) => setprodType(e.target.value)} required placeholder="Product Type" />
            <input type="number" id="prodPrice" name="prodPrice" value={prodPrice} onChange={(e) => setprodPrice(e.target.value)} required placeholder="Product Price" />
            <input type="text" id="prodDesc" name="prodDesc" value={prodDesc} onChange={(e) => setDesc(e.target.value)} required placeholder="Product Description" />
            <input type="number" id="prodQuant" name="prodQuant" value={prodQuant} onChange={(e) => setQuant(e.target.value)} required placeholder="Product Quantity" />
            <input type="text" id="prodImage" name="prodImage" value={prodImage} onChange={(e) => setImage(e.target.value)} required placeholder="Product Image" />
            <input type="submit" value="Submit" id="submitButton" />
          </form>
        </div>
      </div> 
    </>

  );
};

export default ProductListings;
