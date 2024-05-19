// Root.jsx

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      <nav className='navRoot'>
        {/* <Link to="/login">Login</Link> */}
        {/* <Link to="/register">Register</Link> */}
        <Link to="/admin-page"><img className='logoHeader' src='/src/img/100-logo.png'/></Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Root;
