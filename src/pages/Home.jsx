// src/pages/Home.jsx
import React from 'react';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const goToNewPage = () => {
    navigate('/explore')
  }


  return (
    <div className='appContainer'>
      <div className='main-content'>
        <h1>WELCOME TO</h1>
        <h1 className='welcome2'>Farm-to-Table E-commerce Website</h1>
        <button onClick={() => goToNewPage()}>EXPLORE NOW</button>
      </div>
      <Login/>
    </div>
  );
};

export default Home;