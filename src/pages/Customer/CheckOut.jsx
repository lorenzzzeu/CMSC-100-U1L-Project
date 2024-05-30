// Importing necessary libraries and modules
import axios from 'axios';  // Axios for making HTTP requests
import React, { useEffect, useState } from 'react';  // React and hooks
import { useNavigate } from 'react-router-dom';  // Hook for navigation

// Defining the CheckOut component
const CheckOut = () => {
    // State to hold cart items and total price
    const [cartItems, setCartItems] = useState([]);  // Initialize cartItems state as an empty array
    const [total, setTotal] = useState(0);  // Initialize total state as 0

    // useEffect to fetch cart items when component mounts
    useEffect(() => {
        fetchCartItems();  // Call fetchCartItems to get cart data
    }, []);  // Empty dependency array means this runs once on mount

    // Hook for navigation
    const navigate = useNavigate();  // Initialize navigate function for navigation

    // Function to fetch cart items
    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');  // Retrieve token from local storage
            const response = await axios.get('http://localhost:3001/cart-items', {
                headers: {
                    'authorization': `Bearer ${token}`  // Add token to request headers
                }
            });
            setCartItems(response.data);  // Set fetched data to cartItems state
            calculateTotal(response.data);  // Calculate total price with fetched data
        } catch (error) {
            console.error('Error fetching cart items:', error.response ? error.response.data : error.message);  // Log error
        }
    };

    // Function to calculate total order price
    const calculateTotal = (items) => {
        const totalPrice = items.reduce((acc, item) => acc + (item.prodPrice * item.prodQuant), 0);  // Sum up total price
        setTotal(totalPrice);  // Set the calculated total price to state
    };

    // Function to handle click event for placing order
    const handleClick = async () => {
        try {
            const token = localStorage.getItem('token');  // Retrieve token from local storage
            await axios.post('http://localhost:3001/order-transaction', {}, {
                headers: {
                    'authorization': `Bearer ${token}`  // Add token to request headers
                }
            });
            await updateProductQuantities();  // Update product quantities after order
            setCartItems([]);  // Clear cart items from state
            navigate('/customer-page/order-list');  // Navigate to order list page
        } catch (error) {
            console.error('Error clearing cart items:', error.response ? error.response.data : error.message);  // Log error
        }
    };

    // Function to navigate to cart page
    const goToCart = () => {
        navigate('/customer-page/shopping-cart');  // Navigate to shopping cart page
    };

    // Function to update product quantities in the database
    const updateProductQuantities = async () => {
        try {
            // Fetch all products
            const response = await axios.get('http://localhost:3001/product-list');
            const products = response.data;
        
            // Update product quantities based on cart items
            for (const item of cartItems) {
                const product = products.find(prod => prod._id === item.prodId);  // Find matching product
                if (product) {
                    // Calculate new quantity after placing order
                    const newQuantity = product.prodQuant - item.prodQuant;
                    // Update product quantity in the database
                    await axios.post('http://localhost:3001/update-product-quantity', { _id: item.prodId, prodQuant: newQuantity });
                }
            }
        } catch (error) {
            console.error('Error updating product quantities:', error.response ? error.response.data : error.message);  // Log error
        }
    };

    // JSX to render the component
    return (
        <>
        <div className='headerCustomer'></div>  // Header section (empty div)
        <div className='titleCustomer'>
            <h1>SUMMARY</h1>  // Title of the page
        </div>
        <div className='checkOut'>
            <button onClick={goToCart} className='backBtn'>GO BACK</button>  // Button to navigate back to cart
            <h2>Order Total: {total}</h2>  // Display total order price
            <button onClick={() => handleClick()} className='checkOutbtn'>PLACE ORDER</button>  // Button to place order
        </div>
        <div className='cart'>
        {cartItems.map((item) => (
            <div className='cartCard' key={item.prodId}>  // Key prop for each cart item
                <div className='cart-img'><img src={item.prodImage} alt={item.prodName}/></div>  // Product image
                <h3>{item.prodName}</h3>  // Product name
                <div>Quantity: {item.prodQuant}</div>  // Product quantity
                <p>Price: ${item.prodPrice}</p>  // Product price
            </div>
        ))}
        </div>
    </>
    );
};

export default CheckOut;  // Export the CheckOut component as default