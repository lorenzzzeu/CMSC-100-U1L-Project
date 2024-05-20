import React from 'react';
import { Outlet } from 'react-router-dom';

const Footer = () => {
    return (
        <>
        <Outlet />
        <footer>
            <p>© 2024 Farm-To-Table. All rights reserved.</p>
            <p>Contact us: cmsc100@cmsc.com</p>
        </footer>
    </>
    );
}

export default Footer;
