import React from 'react'; // Import the React library to use JSX and create React components.
import { Outlet } from 'react-router-dom'; // Import Link and Outlet components from react-router-dom to handle navigation and nested routing.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component to use font-awesome icons in the application.
import { faCircleCheck, faFileLines, faMap, faSeedling } from '@fortawesome/free-solid-svg-icons'; // Import specific icons from font-awesome free solid icons library.

// Define a functional component named Explore.
const Explore = () => {
    // The component returns a fragment containing the main structure of the Explore page.
    return (
        <>
            {/* Render the Outlet component to display nested routes inside this component. */}
            <Outlet />
            {/* Main container for the about section of the Explore page. */}
            <div className="about">
                {/* Sub-container for the main about content. */}
                <div className='about-main'>
                    {/* Outer container for layout styling. */}
                    <div className='about-outer'>
                        {/* Extra div for additional layout adjustments. */}
                        <div className='extra'></div>
                        {/* Container for the details section. */}
                        <div className='details'>
                            {/* Header for the about section. */}
                            <h1>ABOUT</h1>
                            {/* Paragraph explaining the farm-to-table movement. */}
                            <p>The "farm-to-table" movement advocates for a direct connection between consumers and agricultural producers, promoting sustainability, transparency, and community engagement. Here's what you need to know:</p>
                        </div>
                    </div>
                </div>
                {/* Main content container for detailed about information. */}
                <div className='about-content'>
                    {/* Individual section about the origins of the farm-to-table movement. */}
                    <div className="about-section">
                        {/* FontAwesomeIcon with a seedling icon, custom size, class, and color. */}
                        <FontAwesomeIcon icon={faSeedling} size='3x' className='icon' color='var(--hover)'/>
                        {/* Sub-header for the section. */}
                        <h2>ORIGINS</h2>
                        {/* Paragraph explaining the origins of the farm-to-table concept. */}
                        <p>The farm-to-table concept emerged as a response to concerns about the conventional industrial food system, where food travels long distances, passing through multiple intermediaries, before reaching consumers.</p>
                    </div>
                    {/* Individual section about the principles of the farm-to-table movement. */}
                    <div className="about-section">
                        {/* FontAwesomeIcon with a file lines icon, custom size, class, and color. */}
                        <FontAwesomeIcon icon={faFileLines} size='3x' className='icon' color='#567ed3'/>
                        {/* Sub-header for the section. */}
                        <h2>PRINCIPLES</h2>
                        {/* Paragraph introduction to the principles of farm-to-table. */}
                        <p>At its core, farm-to-table emphasizes:</p>
                        {/* Unordered list detailing the core principles of farm-to-table. */}
                        <ul>
                            <li>Sourcing locally grown or produced food</li>
                            <li>Promoting sustainable farming practices</li>
                            <li>Supporting small-scale farmers and local economies</li>
                            <li>Ensuring food quality, freshness, and traceability</li>
                        </ul>
                    </div>
                    {/* Individual section about the benefits of the farm-to-table movement. */}
                    <div className="about-section">
                        {/* FontAwesomeIcon with a circle check icon, custom size, class, and color. */}
                        <FontAwesomeIcon icon={faCircleCheck} size='3x' className='icon' color='#bf8334'/>
                        {/* Sub-header for the section. */}
                        <h2>BENEFITS</h2>
                        {/* Paragraph introduction to the benefits of farm-to-table. */}
                        <p>The farm-to-table movement offers various benefits:</p>
                        {/* Unordered list detailing the benefits of farm-to-table. */}
                        <ul>
                            <li>Reduced carbon footprint by minimizing food miles</li>
                            <li>Enhanced flavor and nutritional value of fresh, seasonal produce</li>
                            <li>Support for local farmers, fostering stronger communities</li>
                            <li>Promotion of biodiversity and sustainable land stewardship</li>
                        </ul>
                    </div>
                    {/* Individual section about how to participate in the farm-to-table movement. */}
                    <div className="about-section">
                        {/* FontAwesomeIcon with a map icon, custom size, class, and color. */}
                        <FontAwesomeIcon icon={faMap} size='3x' className='icon' color='#713e7f'/>
                        {/* Sub-header for the section. */}
                        <h2>HOW TO PARTICIPATE</h2>
                        {/* Paragraph introduction to ways to participate in farm-to-table. */}
                        <p>You can engage with the farm-to-table movement by:</p>
                        {/* Unordered list detailing how to participate in the farm-to-table movement. */}
                        <ul>
                            <li>Shopping at farmers' markets and local food cooperatives</li>
                            <li>Joining Community-Supported Agriculture (CSA) programs</li>
                            <li>Patronizing farm-to-table restaurants and eateries</li>
                            <li>Growing your own food or supporting urban agriculture initiatives</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Explore; // Export the Explore component as the default export of the module.