import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';import './index.css';
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

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    { path: '/', element: <Home /> },
    { path: 'register', element: <Register /> },
  ]},
  {
    path: 'explore', element: <Explore />
  },
  {path: '/customer-page', element: <CustomerPage />, children: [
    { path: '/customer-page', element: <CustomerHome />},
    { path: 'product-list', element: <ProductList /> },
    { path: 'shopping-cart', element: <ShoppingCart /> },
    { path: 'check-out', element: <CheckOut /> },
    { path: 'order-list', element: <OrderList/> },
    { path: 'profile', element: <CustomerProfile />}
  ]},
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