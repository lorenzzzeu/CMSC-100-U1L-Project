// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import CustomerHome from './pages/CustomerHome'; // Import CustomerHome component
import Root from './pages/Root';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/customer-home" element={<CustomerHome />} />
      <Route path="/admin-page" element={<AdminPage />} />  
      {/* <Route path="/admin-home/*" element={<AdminHome />} /> */}
      <Route path="/admin-page/user-management" element={<UserManagement />} />
      <Route path="/admin-page/product-listings" element={<ProductListings />} />
      <Route path="/admin-page/order-fulfillment" element={<OrderFulfillment />} />
      <Route path="/admin-page/sales-reports" element={<SalesReports />} />
    </Routes>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
