// pages/UserManagement.jsx
import React, { useState, useEffect } from 'react'; // Importing necessary modules from React
import axios from 'axios'; // Importing axios for making HTTP requests

const UserManagement = () => { // Declaring a functional component called UserManagement
  const [users, setUsers] = useState([]); // State variable to store users data, initialized as an empty array
  const [orders, setOrders] = useState([]); // State variable to store orders data, initialized as an empty array
  const [products, setProducts] = useState([]); // State variable to store products data, initialized as an empty array
  const [selectedUser, setSelectedUser] = useState(null); // State variable to store the currently selected user, initialized as null

  // useEffect hook to fetch users data when the component mounts
  useEffect(() => {
    const fetchUsers = async () => { // Asynchronous function to fetch users data
      try {
        const response = await axios.get('http://localhost:3001/admin-page/listusers'); // Making a GET request to fetch users data
        setUsers(response.data); // Updating the users state variable with the fetched data
      } catch (error) {
        console.error('Unable to fetch users:', error); // Logging an error if fetching users data fails
      }
    };
    fetchUsers(); // Calling the fetchUsers function when the component mounts
  }, []);

  // Similar useEffect hooks to fetch orders and products data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Unable to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // fetches products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/product-list');
        setProducts(response.data);
      } catch (error) {
        console.error('Unable to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to get product details based on order product ID; gets products details using foregin order product id
  const getProductDetails = (ordProdId) => {
    const product = products.find(p => p._id === ordProdId); // Finding the product with the matching ID
    if (product) { // If product is found
      return {
        name: product.prodName,
        type: product.prodType,
        price: product.prodPrice,
        image: product.prodImage
      };
    } else { // If product is not found
      return {
        name: 'Unknown',
        type: 'Unknown',
        price: 'Unknown',
        image: 'Unknown'
      };
    }
  };

  // gets total number of users
  const totalUsers = users.length;

   // Function to handle user click events; style change on div when clicked 
  const handleUserClick = (userId) => {
    setSelectedUser(userId); // Setting the selected user ID
    document.getElementById('blur').classList.toggle('active'); // Toggling the 'active' class on the blur element
    document.getElementById('popup').classList.toggle('active'); // Toggling the 'active' class on the popup element
  }

  // Function to toggle the visibility of the popup; pop-up
  const toggle = () => {
    document.getElementById('popup').classList.toggle('active'); // Toggling the 'active' class on the popup element
    document.getElementById('blur').classList.toggle('active'); // Toggling the 'active' class on the blur element
  }

  // feature: pop-up about transaction history of user when clicked

  // Returning JSX for the UserManagement component
  return (
    <>
    <div id='blur'> // Main container for the component
      <div className="titleAdmin"> // Container for title and total users count
        <h1>USER MANAGEMENT</h1> // Title of the page
        <p>Total registered users: {totalUsers - 1}</p> // Displaying the total number of registered users
      </div>
      <div className='user-container'> // Container for displaying users
        {users.map((user) =>  // Mapping through the users array
          <div key={user._id}> // Unique key for each user
            {user.userType == 'customer' && ( // Checking if the user is of type 'customer'
              <> // React fragment to wrap multiple elements
              <div className='user-cards' key={user._id} onClick={() => handleUserClick(user._id)}> // Div representing each user card
                <h3>{user.firstName} {user.lastName}</h3> // Displaying user's first and last name
                <p>{user.email}</p> // Displaying user's email
              </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
      <div id='popup'> // Popup container
        <button onClick={toggle}>x</button> // Button to close the popup
        <h3>Transaction History </h3> // Heading for transaction history
        <div className='popup-container'> // Container for displaying transaction history
         {orders.map(order => ( // Mapping through the orders array
          <div key={order._id}> // Unique key for each order
            {order.email === selectedUser && ( // Checking if the order belongs to the selected user
              <div className="popup-cards"> // Div representing each order card
                <div className='card-img'><img src={getProductDetails(order.ordProdId).image} alt={getProductDetails(order.ordProdId).name} /></div> // Displaying product image
                <h3>{getProductDetails(order.ordProdId).name}</h3> // Displaying product name
                <p>{getProductDetails(order.ordProdId).type}</p> // Displaying product type
                <p>Quantity: {order.ordQty}</p> // Displaying order quantity
                <p>Price: ${getProductDetails(order.ordProdId).price}</p> // Displaying product price
                <p>{order.ordDate.substring(0, 10)} | {order.time.substring(11, 19)}</p> // Displaying order date and time
                <p>Transaction ID: {order.ordTransId}</p> // Displaying transaction ID
                <p>{order.ordStatus}</p> // Displaying order status
              </div>
            )}
          </div>
        ))} 
        </div>
      </div>
    </>
  );
};

export default UserManagement; // Exporting the UserManagement component