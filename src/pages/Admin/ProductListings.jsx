// pages/ProductListings.jsx
import React, {useState} from 'react';

const ProductListings = () => {
  const [formData, setFormData] = useState({
    prodID: '',
    prodName: '',
    prodType: '',
    prodPrice: '',
    prodDesc: '',
    prodQuant: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/admin-page/product-listings', formData);
      // Reset form data after successful submission
      setFormData({
        prodID: '',
        prodName: '',
        prodType: '',
        prodPrice: '',
        prodDesc: '',
        prodQuant: ''
      });
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Product Listings</h2>
      <hr/>
      <div id='productInput'>
        <form id="prodForm" onSubmit={handleSubmit}>
          <label className="inputlabel"> Name </label>
          <br />
          <input type="text" id="prodID" name="prodID" value={formData.prodID} placeholder="Product ID" />
          <br />
          <br />
          <label className="inputlabel"> Product Name </label>
          <br />
          <input type="text" id="prodName" name="prodName" placeholder="Product Name" />
          <br />
          <br />
          <label className="inputlabel"> Product Type </label>
          <br />
          <input type="text" id="prodType" name="prodType" placeholder="Product Type" />
          <br />
          <br />
          <label className="inputlabel"> Product Price </label>
          <br />
          <input type="text" id="prodPrice" name="prodPrice" placeholder="Product Price" />
          <br />
          <br />
          <label className="inputlabel"> Product Description </label>
          <br />
          <input type="text" id="prodDesc" name="prodDesc" placeholder="Product Description" />
          <br />
          <br />
          <label className="inputlabel"> Product Quantity </label>
          <br />
          <input type="text" id="prodQuant" name="prodQuant" placeholder="Product Quantity" />
          <br />
          <br />
          <input type="submit" value="Submit" id="submitButton" />
        </form>
      </div>
    </div>
  );
};

export default ProductListings;
