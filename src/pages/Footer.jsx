//pages/Footer.jsx

import React from 'react'; // Import the React library which is necessary to create React components
import { Outlet } from 'react-router-dom'; // Import the Outlet component from react-router-dom which is used to render child routes

// Define a functional component named Footer
const Footer = () => {
    // Return the JSX that defines the structure and content of the Footer component
    return (
        <>
            <Outlet /> {/* The Outlet component renders the matched child route elements */}
            <footer> {/* Define the footer element which contains the footer content */}
                <p>© 2024 Farm-To-Table. All rights reserved.</p> {/* A paragraph element displaying the copyright notice */}
                <p>Contact us: cmsc100@cmsc.com</p> {/* A paragraph element displaying the contact information */}
            </footer>
        </>
    );
}

// Export the Footer component as the default export of this module
export default Footer;