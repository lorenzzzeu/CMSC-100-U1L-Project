import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Explore = () => {
    return (
        <>
        <Outlet />
        <div className="about">
            <div className='about-container'>
                <div className='about-main'>
                    <h1>ABOUT</h1>
                    <p>The "farm-to-table" movement advocates for a direct connection between consumers and agricultural producers, promoting sustainability, transparency, and community engagement. Here's what you need to know:</p>
                    <div className='slider-frame'>
                        <div className='slide-images'>
                            <div className='img-container'>
                                <img src='\src\img\img1.jpg'></img>
                            </div>
                            <div className='img-container'>
                                <img src='\src\img\img2.jpg'></img>
                            </div>
                            <div className='img-container'>
                                <img src='\src\img\img3.jpg'></img>
                            </div>
                            <div className='img-container'>
                                <img src='\src\img\img4.jpg'></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='about-content'>
                    <div className="about-section origin">
                        <h2>ORIGINS</h2>
                        <p>The farm-to-table concept emerged as a response to concerns about the conventional industrial food system, where food travels long distances, passing through multiple intermediaries, before reaching consumers.</p>
                    </div>
                    <div className="about-section">
                        <h2>PRINCIPLES</h2>
                        <p>At its core, farm-to-table emphasizes:</p>
                        <ul>
                            <li>Sourcing locally grown or produced food</li>
                            <li>Promoting sustainable farming practices</li>
                            <li>Supporting small-scale farmers and local economies</li>
                            <li>Ensuring food quality, freshness, and traceability</li>
                        </ul>
                    </div>
                    <div className="about-section">
                        <h2>BENEFITS</h2>
                        <p>The farm-to-table movement offers various benefits:</p>
                        <ul>
                            <li>Reduced carbon footprint by minimizing food miles</li>
                            <li>Enhanced flavor and nutritional value of fresh, seasonal produce</li>
                            <li>Support for local farmers, fostering stronger communities</li>
                            <li>Promotion of biodiversity and sustainable land stewardship</li>
                        </ul>
                    </div>
                    <div className="about-section">
                        <h2>HOW TO PARTICIPATE</h2>
                        <p>You can engage with the farm-to-table movement by:</p>
                        <ul>
                            <li>Shopping at farmers' markets and local food cooperatives</li>
                            <li>Joining Community-Supported Agriculture (CSA) programs</li>
                            <li>Patronizing farm-to-table restaurants and eateries</li>
                            <li>Growing your own food or supporting urban agriculture initiatives</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Explore;
