// App.jsx

import React from 'react'; // Importing the React library which is necessary for using JSX and creating components.
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing BrowserRouter, Route, and Routes components from 'react-router-dom' library to enable routing in the application.
import './index.css'; // Importing the main stylesheet for the application.

// Importing various components that will be used as pages in the application.
import CustomerHome from './pages/CustomerHome'; // Importing the CustomerHome component.
import Root from './pages/Root'; // Importing the Root component.
import Login from './pages/Login'; // Importing the Login component.
import Register from './pages/Register'; // Importing the Register component.
import Explore from './pages/Explore'; // Importing the Explore component.
import AdminHome from './pages/Admin/AdminHome'; // Importing the AdminHome component.

// Defining the main App component.
const App = () => {
  // Checking if the user is signed in by verifying the presence of a 'token' in the local storage.
  const isUserSignedIn = !!localStorage.getItem('token');

  return (
    // Defining the routes for the application.
    <Routes>
      <Route path="/" element={<Root />} />       {/* // Route for the root path ("/") that renders the Root component. */}
      <Route path="/login" element={<Login />} />       {/* // Route for the login path ("/login") that renders the Login component. */}
      <Route path="/register" element={<Register />} />      {/* // Route for the register path ("/register") that renders the Register component. */}
      <Route path="/explore" element={<Explore />} />      {/* // Route for the explore path ("/explore") that renders the Explore component. */}
      {isUserSignedIn && <Route path="/customer-home" element={<CustomerHome />} />}       {/* // Conditional route that only renders the CustomerHome component if the user is signed in. */}
      {isUserSignedIn && <Route path="/admin-home" element={<AdminHome />} />}       {/* // Conditional route that only renders the AdminHome component if the user is signed in. */}
    </Routes>
  );
};

// Rendering the application to the DOM.
ReactDOM.render(
  // Wrapping the application in React.StrictMode to help identify potential problems.
  <React.StrictMode>
    // Wrapping the App component in Router to enable routing functionality.
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  // Specifying the root DOM element where the application will be mounted.
  document.getElementById('root')
);