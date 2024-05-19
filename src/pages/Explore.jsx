import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Explore(){
    return(
        <div className="app-container">
            <nav className='navRoot'>
            <Link to="/">BACK</Link> 
            {/* Temporary */}
          </nav>
          <Outlet />
            <div className="about">
                <h1>ABOUT</h1>
                <p>"Farm-to-table" is a dynamic social movement that champions a direct and transparent connection between consumers 
                    and the agricultural producers who supply their food. It represents a departure from the conventional industrial 
                    food system, where products often pass through numerous intermediaries before reaching the consumer's plate. 
                    At its core, the farm-to-table movement aims to promote sustainability, support local economies, and prioritize 
                    the quality and freshness of ingredients. By shortening the supply chain, consumers can have greater confidence 
                    in the origin and quality of their food, while farmers gain fairer compensation for their labor and resources. 
                    This movement underscores the importance of knowing where food comes from, how it's produced, and the impact of 
                    its cultivation on the environment and local communities. It encourages consumers to forge connections with farmers 
                    through farmers' markets, community-supported agriculture (CSA) programs, and direct purchasing arrangements. 
                    Moreover, farm-to-table practices often prioritize seasonal and organic produce, as well as humane and environmentally 
                    responsible animal husbandry practices. By fostering a deeper appreciation for the journey of food from farm to table, 
                    this movement seeks to create a more sustainable and equitable food system for present and future generations.</p>
            </div>
        </div>
    );
}

// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';

// const Explore = () => {
//     return (
//         <div className="explore-container">
//             <nav className='navRoot'>
//                 <Link to="/">BACK</Link>
//             </nav>
//             <Outlet />
//             <div className="about">
//                 <h1>ABOUT</h1>
//                 <p>The "farm-to-table" movement advocates for a direct connection between consumers and agricultural producers, promoting sustainability, transparency, and community engagement. Here's what you need to know:</p>
//                 <div className="about-section">
//                     <h2>Origins</h2>
//                     <p>The farm-to-table concept emerged as a response to concerns about the conventional industrial food system, where food travels long distances, passing through multiple intermediaries, before reaching consumers.</p>
//                 </div>
//                 <div className="about-section">
//                     <h2>Principles</h2>
//                     <p>At its core, farm-to-table emphasizes:</p>
//                     <ul>
//                         <li>Sourcing locally grown or produced food</li>
//                         <li>Promoting sustainable farming practices</li>
//                         <li>Supporting small-scale farmers and local economies</li>
//                         <li>Ensuring food quality, freshness, and traceability</li>
//                     </ul>
//                 </div>
//                 <div className="about-section">
//                     <h2>Benefits</h2>
//                     <p>The farm-to-table movement offers various benefits:</p>
//                     <ul>
//                         <li>Reduced carbon footprint by minimizing food miles</li>
//                         <li>Enhanced flavor and nutritional value of fresh, seasonal produce</li>
//                         <li>Support for local farmers, fostering stronger communities</li>
//                         <li>Promotion of biodiversity and sustainable land stewardship</li>
//                     </ul>
//                 </div>
//                 <div className="about-section">
//                     <h2>How to Participate</h2>
//                     <p>You can engage with the farm-to-table movement by:</p>
//                     <ul>
//                         <li>Shopping at farmers' markets and local food cooperatives</li>
//                         <li>Joining Community-Supported Agriculture (CSA) programs</li>
//                         <li>Patronizing farm-to-table restaurants and eateries</li>
//                         <li>Growing your own food or supporting urban agriculture initiatives</li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Explore;
