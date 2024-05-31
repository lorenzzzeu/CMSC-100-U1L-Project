// pages/AdminHome.jsx
import React from 'react'; // Importing React library to create React components
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'; // Importing necessary components and hooks from react-router-dom
import { jwtDecode } from 'jwt-decode';

const AdminPage = () => { // Defining a functional component named AdminPage
  const navigate = useNavigate(); // use to navigate to different pages; Declaring a constant variable navigate and initializing it with the useNavigate hook from react-router-dom, which will be used to navigate between different pages
  const isUserSignedIn = !!localStorage.getItem('token'); // Declaring a constant variable isUserSignedIn and initializing it with the value of whether a token exists in the local storage (if token exists, isUserSignedIn is true, otherwise false)
  let decodedToken = null;
  if(isUserSignedIn){
    const token = localStorage.getItem('token')
    decodedToken = jwtDecode(token);
  }
  const handleLogout = () => { // Declaring a function handleLogout, which will be called when the user clicks on the "LOG OUT" button
    localStorage.removeItem('token'); // Removing the token from local storage
    navigate('/'); // Navigating to the home page after logout
  };

  return ( // Returning JSX to render the component
    <div> {/* Start of JSX - a wrapper div */}
      {isUserSignedIn && decodedToken.type === 'admin' ? ( // Conditional rendering based on whether the user is signed in
        <div> {/* Start of JSX - a div containing navigation links and logout button */}
          <nav className='navRootAdmin'> {/* Navigation container with a class name */}
            <div className='navLinksAdmin'> {/* Container for navigation links with a class name */}
                <Link to="/admin-page"> {/* Link to the admin page */}
                  <img className='logoHeader' src="src/img/100-logo.png"/> {/* Image logo */}
                </Link>
                <Link to="/admin-page/user-management" className='nav-item'>User Management</Link> {/* Link to user management page */}
                <Link to="/admin-page/product-listings" className='nav-item'>Product Listings</Link> {/* Link to product listings page */}
                <Link to="/admin-page/order-fulfillment" className='nav-item'>Order Fulfillment</Link> {/* Link to order fulfillment page */}
                <Link to="/admin-page/sales-reports" className='nav-item'>Sales Report</Link> {/* Link to sales reports page */}
            </div>
            <div className='navUser'> {/* Container for logout button */}
              <button onClick={handleLogout}>LOG OUT</button> {/* Logout button */}
            </div>
          </nav>
          <Outlet/> {/* Outlet for nested routes */}
        </div>
      ) : ( // If user is not signed in
      isUserSignedIn && decodedToken.type != 'admin' ? (
        <> {/* Fragment used for conditional rendering */}
          <Navigate to='/customer-page'/> {/* Redirect to customer page */}
        </>
      ): (
        <>
          <Navigate to='/'/> {/* Redirect to home page */}
        </>
      )
    )}
    </div>
  );
};

export default AdminPage; // Exporting the AdminPage component as default