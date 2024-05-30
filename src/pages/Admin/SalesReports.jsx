// Importing necessary modules and components from React and other libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Declaring a functional component named SalesReports
const SalesReports = () => {
  // Declaring and initializing state variables using useState hook
  const [salesData, setSalesData] = useState([]); // Stores sales data
  const [filteredSalesData, setFilteredSalesData] = useState([]); // Stores filtered sales data
  const [products, setProducts] = useState([]); // Stores product data
  const [selectedType, setSelectedType] = useState('All'); // Stores the selected type for filtering
  const [sortOrder, setSortOrder] = useState({ // Stores the sorting order
    type: '' // Initial sorting type
  });

  // useEffect hook to fetch sales data and products from the server
  useEffect(() => {
    // Fetches sales data from the server
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/orders');
        // Filters and sets sales data where order status is 'Completed'
        setSalesData(response.data.filter(order => order.ordStatus === 'Completed'));
      } catch (error) {
        console.error('Unable to fetch sales data:', error);
      }
    };

    // Fetches products data from the server
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/product-list');
        // Sets the products data received from the server
        setProducts(response.data);
      } catch (error) {
        console.error('Unable to fetch products:', error);
      }
    };

    // Calls the fetch functions when the component mounts
    fetchSalesData();
    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // useEffect hook to apply filtering based on selected type
  useEffect(() => {
    // Filtering logic based on selected type
    if (selectedType === 'All') {
      setFilteredSalesData(salesData);
    } else {
      // Filters sales data based on selected type and updates filteredSalesData state
      setFilteredSalesData(salesData.filter(order => {
        const product = products.find(product => product._id === order.ordProdId);
        return product && product.prodType === selectedType;
      }));
    }
  }, [salesData, selectedType, products]); // Dependencies for this effect

  // Function to handle sorting orders
  const sortBy = (type) => {
    // Sets the sorting order based on the provided type
    setSortOrder((prevOrder) => ({
      type,
      ascending: prevOrder.type === type ? !prevOrder.ascending : true
    }));
  };

  // useEffect hook to sort orders
  useEffect(() => {
    // Sorting logic based on sortOrder
    if (sortOrder.type) {
      const sortedSalesData = [...filteredSalesData].sort((a, b) => {
        // Sorting based on order quantity or order date
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

      // Reverses the sorted array if sortOrder is descending
      if (!sortOrder.ascending) {
        sortedSalesData.reverse();
      }

      // Updates filteredSalesData state with the sorted data
      setFilteredSalesData(sortedSalesData);
    }
  }, [sortOrder, filteredSalesData]); // Dependencies for this effect

  // Function to find product name using foreign order product id
  const findProductName = (ordProdId) => {
    const product = products.find(product => product._id === ordProdId);
    return product ? product.prodName : 'Product Not Found';
  };

  // Function to calculate the order total based on filtered data
  const calculateOrderTotal = (orderId) => {
    let total = 0;
    // Filters order products based on orderId
    const orderProducts = filteredSalesData.filter(order => order._id === orderId);
    // Calculates total for each order product
    orderProducts.forEach(order => {
      const product = products.find(product => product._id === order.ordProdId);
      if (product) {
        total += order.ordQty * product.prodPrice;
      }
    });
    return total;
  };

  // Function to calculate overall total
  const calculateOverallTotal = () => {
    let total = 0;
    // Calculates total for each order in filteredSalesData
    filteredSalesData.forEach(order => {
      total += calculateOrderTotal(order._id);
    });
    return total;
  };

  // Function to filter sales by time (week, month, year)
  const filterSalesByTime = (time) => {
    const today = new Date();
    let startDate;

    // Determines start date based on the provided time frame
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

    // Filters sales data based on order date and updates filteredSalesData state
    const filteredSales = salesData.filter(order => {
      const orderDate = new Date(order.ordDate);
      return orderDate >= startDate;
    });

    setFilteredSalesData(filteredSales);
  };

  // JSX to render the component
  return (
    <>
      {/* Title displaying overall profit */}
      <div className='titleAdmin order'>
        <h1>You made ${calculateOverallTotal()} of profit!</h1>
      </div>
      {/* Div for filtering and sorting options */}
      <div className='sortSales'>
        {/* Div for filtering options */}
        <div className='filterAdmin'>
          <FontAwesomeIcon icon={faFilter} size='1x' className='icon'/>
          {/* Buttons for filtering sales by time */}
          <button onClick={() => filterSalesByTime('week')}>Sales This Week</button>
          <button onClick={() => filterSalesByTime('month')}>Sales This Month</button>
          <button onClick={() => filterSalesByTime('year')}>Sales This Year</button>
        </div>
        {/* Div for sorting options */}
        <div className='sortAdmin'>
          <FontAwesomeIcon icon={faSort} size='1x' className='icon'/>
          {/* Buttons for sorting sales data */}
          <button onClick={() => sortBy('quantity')}>Quantity</button>
          <button onClick={() => sortBy('orderDate')}>Order Date</button>
        </div>
      </div>
      <div className='report-container'>
          {filteredSalesData.map(order => (
            <div className='report-cards' key={order._id}>
              <div className='prodName'>{findProductName(order.ordProdId)}</div>
              <div className='id'>Trans. ID: {order.ordTransId}</div>
              <div className='id'>Prod. ID: {order.ordProdId}</div>
              <div>{order.ordDate.substring(0, 10)}</div>
              <div>{order.time.substring(11, 19)}</div>
              <div className='prodName'>{order.ordQty} qty</div>
              <div>${calculateOrderTotal(order._id)}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SalesReports; // Exporting the SalesReports component
