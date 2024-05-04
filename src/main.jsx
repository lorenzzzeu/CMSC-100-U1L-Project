import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';import './index.css';
import Home from './pages/Home';
import Root from './pages/Root';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/Customer/CustomerHome';
import AdminPage from './pages/Admin/AdminPage';
import UserManagement from './pages/Admin/UserManagement';
import OrderFulfillment from './pages/Admin/OrderFulfillment';
import SalesReports from './pages/Admin/SalesReports';
import ProductListings from './pages/Admin/ProductListings';
import AdminHome from './pages/Admin/AdminHome';

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    { path: '/', element: <Home /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> }
  ]},
  {path: '/customer-home', element: <CustomerHome />},
  {path: '/admin-page', element: <AdminPage />, children: [
    { path: '/admin-page', element: <AdminHome />},
    { path: 'user-management', element: <UserManagement /> },
    { path: 'product-listings', element: <ProductListings /> },
    { path: 'order-fulfillment', element: <OrderFulfillment /> },
    { path: 'sales-reports', element: <SalesReports /> }
  ]}
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);