// Root.jsx

// Import the React library which is necessary to create React components
import React from 'react';

// Import the Link and Outlet components from the react-router-dom library
// Link is used for navigation between routes, and Outlet is used for rendering child routes
import { Link, Outlet } from 'react-router-dom';

// Define a functional component named Root
function Root() {
  // The component returns a JSX structure to be rendered
  return (
    // A <div> element that serves as the container for the component's content
    <div>
      <nav className='navRoot'>       {/* A <nav> element with a class name 'navRoot' for styling the navigation bar */}
      </nav>         {/* The Link component can be used here for navigation links, but currently, it is empty */}
      <Outlet />       {/* The Outlet component is used to render the matched child route's component */}
    </div>
  );
}

// Export the Root component as the default export of this module
export default Root;