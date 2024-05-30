// src/pages/Home.jsx

// Importing necessary modules and components from React and other files
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importing Link, Outlet, and useNavigate from react-router-dom
import Explore from './Explore'; // Importing the Explore component
import Footer from './Footer'; // Importing the Footer component

// Defining the Home component
function Home() {

  // Using the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  // Defining a function that navigates to the login page
  const goToLogin = () => {
    navigate('/login') // Navigates to the '/login' route
  }

  // Returning the JSX to render the Home component
  return (
    <>
      {/* Wrapper div for the entire page content */}
      <div className='appContainer'>
        
        {/* Navigation bar */}
        <nav className='navRootHome'>
          {/* Link to the admin page with a logo */}
          <Link to="/admin-page"><img className='logoHeader' src='/src/img/100-logo.png'/></Link>
          {/* Navigation links to different sections of the page */}
          <a className='nav-item' href='#main-content'>Home</a>
          <a className='nav-item' href='#about'>About</a>
          <a className='nav-item' href='#contact'>Contact</a>
        </nav>
        
        {/* Main content section */}
        <section id='main-content'>
          <div className='main-content-text'>
            {/* Main heading */}
            <h1>FARM-TO-TABLE</h1>
            {/* Subheading */}
            <h2>E-Commerce Website</h2>
            {/* Paragraph describing the farm-to-table movement */}
            <p>The "farm-to-table" movement advocates for a direct connection between consumers and 
              agricultural producers, promoting sustainability, transparency, and community engagement</p>
            {/* Button that navigates to the login page when clicked */}
            <button className='loginBtn' onClick={goToLogin}>Get Started</button>
          </div>
          {/* Image displayed next to the main content */}
          <img className='homeImg' src='/src/img/meal.png'/>
        </section>
        
        {/* About section containing the Explore component */}
        <section id='about'>
          <Explore/>
        </section>
        
        {/* Contact section containing the Footer component */}
        <section id='contact'>
          <Footer/>
        </section>
      </div>
    </>
  );
};

export default Home; // Exporting the Home component as the default export of this module