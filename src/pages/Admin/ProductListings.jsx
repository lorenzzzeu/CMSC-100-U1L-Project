import React, { useState } from 'react';
import axios from 'axios';

function ProductListings()  {
  const [prodName, setprodName] = useState('');
  const [prodType, setprodType] = useState('');
  const [prodPrice, setprodPrice] = useState('');
  const [prodDesc, setDesc] = useState('');
  const [prodQuant, setQuant] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement registration functionality here
    axios.post('http://localhost:3001/admin-page/product-listings', { prodName, prodType, prodPrice, prodDesc, prodQuant }).then(() => {
      alert('Successful') // Just for checking
      setprodName('')
      setprodType('')
      setprodPrice('')
      setDesc('')
      setQuant('') // Corrected typo here
    }).catch((error) => {
      console.log('Unable to add Product')
    });
  };

  return (
    <div>
      <h2>Product Listings</h2>
      <hr/>
      <div id='productInput'>
        <form id="prodForm" onSubmit={handleSubmit}>
          <label className="inputlabel"> Product Name </label>
          <br />
          <input type="text" id="prodName" name="prodName" value={prodName} onChange={(e) => setprodName(e.target.value)} required placeholder="Product Name" />
          <br />
          <br />
          <label className="inputlabel"> Product Type </label>
          <br />
          <input type="text" id="prodType" name="prodType" value={prodType} onChange={(e) => setprodType(e.target.value)} required placeholder="Product Type" />
          <br />
          <br />
          <label className="inputlabel"> Product Price </label>
          <br />
          <input type="text" id="prodPrice" name="prodPrice" value={prodPrice} onChange={(e) => setprodPrice(e.target.value)} required placeholder="Product Price" />
          <br />
          <br />
          <label className="inputlabel"> Product Description </label>
          <br />
          <input type="text" id="prodDesc" name="prodDesc" value={prodDesc} onChange={(e) => setDesc(e.target.value)} required placeholder="Product Description" />
          <br />
          <br />
          <label className="inputlabel"> Product Quantity </label>
          <br />
          <input type="text" id="prodQuant" name="prodQuant" value={prodQuant} onChange={(e) => setQuant(e.target.value)} required placeholder="Product Quantity" />
          <br />
          <br />
          <input type="submit" value="Submit" id="submitButton" />
        </form>
      </div>
    </div>
  );
};

export default ProductListings;
