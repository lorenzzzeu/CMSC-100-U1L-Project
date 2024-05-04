import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';import './index.css';
import Home from './pages/Home';
import Root from './pages/Root';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: [
    { path: '/', element: <Home /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> }
  ]}
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);