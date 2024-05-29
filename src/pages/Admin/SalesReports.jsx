import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesReports = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredSalesData, setFilteredSalesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [sortOrder, setSortOrder] = useState({
    type: ''
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/orders');
        setSalesData(response.data.filter(order => order.ordStatus === 'Completed'));
      } catch (error) {
        console.error('Unable to fetch sales data:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/product-list');
        setProducts(response.data);
      } catch (error) {
        console.error('Unable to fetch products:', error);
      }
    };

    fetchSalesData();
    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply filtering based on selected type
    if (selectedType === 'All') {
      setFilteredSalesData(salesData);
    } else {
      setFilteredSalesData(salesData.filter(order => {
        const product = products.find(product => product._id === order.ordProdId);
        return product && product.prodType === selectedType;
      }));
    }
  }, [salesData, selectedType, products]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const sortBy = (type) => {
    setSortOrder((prevOrder) => ({
      type,
      ascending: prevOrder.type === type ? !prevOrder.ascending : true
    }));
  };

  useEffect(() => {
    if (sortOrder.type) {
      const sortedSalesData = [...filteredSalesData].sort((a, b) => {
        if (sortOrder.type === 'quantity') {
          if (a.ordQty !== b.ordQty) {
            return a.ordQty - b.ordQty;
          } else {
            return a._id.localeCompare(b._id);
          }
        } else if (sortOrder.type === 'orderDate') {
          return new Date(a.ordDate) - new Date(b.ordDate);
        }
        return 0;
      });
  
      if (!sortOrder.ascending) {
        sortedSalesData.reverse();
      }
  
      setFilteredSalesData(sortedSalesData);
    }
  }, [sortOrder, filteredSalesData]);
  

  const findProductName = (ordProdId) => {
    const product = products.find(product => product._id === ordProdId);
    return product ? product.prodName : 'Product Not Found';
  };

  const calculateOrderTotal = (orderId) => {
    let total = 0;
    const orderProducts = filteredSalesData.filter(order => order._id === orderId);
    orderProducts.forEach(order => {
      const product = products.find(product => product._id === order.ordProdId);
      if (product) {
        total += order.ordQty * product.prodPrice;
      }
    });
    return total;
  };

  const calculateOverallTotal = () => {
    let total = 0;
    filteredSalesData.forEach(order => {
      total += calculateOrderTotal(order._id);
    });
    return total;
  };


  const filterSalesByTime = (time) => {
    const today = new Date();
    let startDate;

    if (time === 'week') {
      startDate = new Date(today.setDate(today.getDate() - today.getDay()));
    } else if (time === 'month') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (time === 'year') {
      startDate = new Date(today.getFullYear(), 0, 1);
    } else {
      console.error('Invalid time frame provided');
      return;
    }

    const filteredSales = salesData.filter(order => {
      const orderDate = new Date(order.ordDate);
      return orderDate >= startDate;
    });

    setFilteredSalesData(filteredSales);
  };

  return (
    <>
      <div className='titleAdmin'>
        <h1>SALES REPORT</h1>
      </div>
      <div className='sortSales'>
        <div className='filterAdmin'>
          <p>FILTER BY</p>
          <button onClick={() => filterSalesByTime('week')}>Sales This Week</button>
          <button onClick={() => filterSalesByTime('month')}>Sales This Month</button>
          <button onClick={() => filterSalesByTime('year')}>Sales This Year</button>
        </div>
        <div className='sortAdmin'>
          <p>SORT BY</p>
          <button onClick={() => sortBy('quantity')}>Quantity</button>
          <button onClick={() => sortBy('orderDate')}>Order Date</button>
        </div>
      </div>
      <table className='salesTable'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Time</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredSalesData.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.ordProdId}</td>
              <td>{findProductName(order.ordProdId)}</td>
              <td>{order.ordQty}</td>
              <td>{order.ordDate.substring(0, 10)}</td>
              <td>{order.time.substring(11, 19)}</td>
              <td>{calculateOrderTotal(order._id)}</td>
              
            </tr>
          ))}
          <tr>
            <td colSpan="6" className="overallTotal">Overall Total</td>
            <td>{calculateOverallTotal()}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SalesReports;
