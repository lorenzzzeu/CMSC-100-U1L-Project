// src/pages/Home.jsx
import React from 'react';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import Explore from './Explore';
import Footer from './Footer';

function Home() {

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <>
    <div className='appContainer'>
      <nav className='navRoot'>
        <Link to="/admin-page"><img className='logoHeader' src='/src/img/100-logo.png'/></Link>
        <a className='nav-item' href='#main-content'>Home</a>
        <a className='nav-item' href='#about'>About</a>
        <a className='nav-item' href='#contact'>Contact</a>
      </nav>
      <section id='main-content'>
        <div className='main-content-text'>
          <h1>FARM-TO-TABLE</h1>
          <h2>E-Commerce Website</h2>
          <p>The "farm-to-table" movement advocates for a direct connection between consumers and 
            agricultural producers, promoting sustainability, transparency, and community engagement</p>
          <button className='loginBtn' onClick={goToLogin}>Get Started</button>
        </div>
        <img className='homeImg' src='/src/img/meal.png'/>
      </section>
      <section id='about'>
        <Explore/>
      </section>
      <section id='contact'>
        <Footer/>
      </section>
    </div>
    </>
  );
};

export default Home;