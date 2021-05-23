//maintenance-app src/components/Home.jsx

import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the maintenance app!</h1>
            <p>To get started, click "View all items" to see a list of jobcards.</p>
            <p>Once there, click on an item's hyperlink to edit it.</p>
            <p>To bulk edit the status, follow these steps:</p>
            <ol>
                <li>Click "Filter by status"</li>
                <li>Select the current status and click "Filter"</li>
                <li>Select the new status at the bottom of the page and click "Update"</li>
            </ol>
        
        
        
        </div>
    );
}

export default Home;