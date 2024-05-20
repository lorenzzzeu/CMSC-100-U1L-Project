import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Explore = () => {
    return (
        <>
        <Outlet />
        <div className="about">
            <div className='about-main'>
            {/* <img src='\src\img\farmer.png'/> */}
            <h1>ABOUT</h1>
            <p>The "farm-to-table" movement advocates for a direct connection between consumers and agricultural producers, promoting sustainability, transparency, and community engagement. Here's what you need to know:</p>
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
            <div className='about-content'>
                <h1 className='header'>WHAT'S NEW</h1>
                <div className='news-customer'>
                    <div className='news'>
                    <p className='title'>The Farm-to-Table Movement</p>
                    <p>As they say in action movies: kill the middle man. That pretty much sums up 
                        the concept of farm-to-table, the latest buzzword in restaurant du jour. Instead 
                        of ordering from suppliers or importing overseas, restaurants and other eating 
                        establishments order their ingredients-particularly fruits and vegetables-small-scale 
                        and straight from the source, farmers who cut down the complications of red tape to a 
                        bare minimum. One chef, Tom Colicchio, Top Chef judge and owner of Craft Restaurants, 
                        describes that this is as close as city-dwellers can get to eating from the earth. Having 
                        a direct relationship with farmers results in fresher, cheaper, and more natural produce. 
                        It also has the added benefit of supporting local industry. Dining farm-to-table, or 
                        farm-to-fork in some areas, is also ideally much healthier (Uy, 2017).
                        </p>
                    </div>
                    <div className='news'>
                    <p className='title'>The Wholesome Table Champions</p>
                    <p>The idea behind the farm-to-table concept restaurant is to understand where your food comes from. 
                    Here, ingredients and raw materials are directly sourced from farmers, bypassing brokers, dealers, 
                    stores, and markets. The farm-to-table dining concept is well-accepted because it champions sustainable 
                    and ethical food production. From a macro perspective, this restaurant concept can aid the economy by 
                    supporting local farmers and ensuring food security. It can even benefit the environment because the 
                    system reduces carbon emissions and lessens overall wastage. For your business, this model allows you 
                    to serve only the freshest, organic, wholesome ingredients. It also promotes efficiency as you can maximize 
                    products while minimizing costs. Plus, you can lessen purchasing and transportation expenses as most of your 
                    products come straight from one source. As for customers, most will appreciate this movement as it highlights 
                    putting a premium on their health (The Wholesome Table Champions the Farm-to-Table Concept, n.d.).
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Explore;
