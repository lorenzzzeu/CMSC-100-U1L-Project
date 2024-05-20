// Root.jsx

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      <nav className='navRoot'>
      </nav>
      <Outlet />
      </div>
  );
}
export default Root;