// main.jsx

import React from 'react'; // Import the React library, which is essential for building React components
import ReactDOM from 'react-dom'; // Import the ReactDOM library, which is used for rendering React components to the DOM
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import necessary components and functions from the react-router-dom library
import './index.css'; // Import the global CSS file for styling

// Import various page components for different routes
import Home from './pages/Home';
import Root from './pages/Root';
import Register from './pages/Register';
import CustomerPage from './pages/Customer/CustomerPage';
import AdminPage from './pages/Admin/AdminPage';
import UserManagement from './pages/Admin/UserManagement';
import OrderFulfillment from './pages/Admin/OrderFulfillment';
import SalesReports from './pages/Admin/SalesReports';
import ProductListings from './pages/Admin/ProductListings';
import AdminHome from './pages/Admin/AdminHome';
import ShoppingCart from './pages/Customer/ShoppingCart';
import ProductList from './pages/Customer/ProductList';
import CustomerHome from './pages/Customer/CustomerHome';
import OrderList from './pages/Customer/OrderList';
import Explore from './pages/Explore';
import CustomerProfile from './pages/Customer/CustomerProfile';
import CheckOut from './pages/Customer/CheckOut';
import Login from './pages/Login';

// Define the routing configuration using createBrowserRouter
const router = createBrowserRouter([
  // Root route with nested routes
  { path: '/', element: <Root />, children: [
    { path: '/', element: <Home /> },           // Default home page
    { path: 'login', element: <Login /> },      // Login page
    { path: 'register', element: <Register /> },// Registration page
  ]},
  // Explore route
  { path: 'explore', element: <Explore /> },
  // Customer page route with nested routes
  { path: '/customer-page', element: <CustomerPage />, children: [
    { path: '/customer-page', element: <CustomerHome />}, // Default customer home page
    { path: 'product-list', element: <ProductList /> },   // Product listing page
    { path: 'shopping-cart', element: <ShoppingCart /> }, // Shopping cart page
    { path: 'check-out', element: <CheckOut /> },         // Checkout page
    { path: 'order-list', element: <OrderList/> },        // Order list page
    { path: 'profile', element: <CustomerProfile />}      // Customer profile page
  ]},
  // Admin page route with nested routes
  { path: '/admin-page', element: <AdminPage />, children: [
    { path: '/admin-page', element: <AdminHome />},        // Default admin home page
    { path: 'user-management', element: <UserManagement /> }, // User management page
    { path: 'product-listings', element: <ProductListings /> }, // Product listings page
    { path: 'order-fulfillment', element: <OrderFulfillment /> }, // Order fulfillment page
    { path: 'sales-reports', element: <SalesReports /> }  // Sales reports page
  ]}
]);

// Create a root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application with strict mode and router provider
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);