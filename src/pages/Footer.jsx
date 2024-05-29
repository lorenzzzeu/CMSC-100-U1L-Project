//pages/Footer.jsx

import React from 'react'; // Import the React library which is necessary to create React components
import { Outlet } from 'react-router-dom'; // Import the Outlet component from react-router-dom which is used to render child routes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faInstagram, faLinkedin, faPinterest, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

// Define a functional component named Footer
const Footer = () => {
    // Return the JSX that defines the structure and content of the Footer component
    return (
        <>
            <Outlet /> {/* The Outlet component renders the matched child route elements */}
            <hr/>
            <footer> {/* Define the footer element which contains the footer content */}
                <div className='logo-container'>
                    <img className='logo' src='\src\img\100-logo.png'/>
                    <p>© 2024 Farm-To-Table. All rights reserved.</p> {/* A paragraph element displaying the copyright notice */}
                </div>
                <div className='socials'>
                    <FontAwesomeIcon icon={faFacebook} size='2x' className='icon'/>
                    <FontAwesomeIcon icon={faXTwitter} size='2x' className='icon'/>
                    <FontAwesomeIcon icon={faYoutube} size='2x' className='icon'/>
                    <FontAwesomeIcon icon={faInstagram} size='2x' className='icon'/>
                    <FontAwesomeIcon icon={faTiktok} size='2x' className='icon'/>
                    <FontAwesomeIcon icon={faLinkedin} size='2x' className='icon'/>
                    <FontAwesomeIcon icon={faGithub} size='2x' className='icon'/>
                    <FontAwesomeIcon icon={faPinterest} size='2x' className='icon'/>
                </div>
            </footer>
        </>
    );
}

// Export the Footer component as the default export of this module
export default Footer;