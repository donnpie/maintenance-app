import './Nav.css';
import Link from './Link.jsx';

const Header = (props) => {
    return (
        <div className="header-container">
            <Link title="Home" href="/" />
            <Link title="View all items" href="/view-all" />
            <Link title="Add new item" href="/new" />
            <Link title="Filter by status" href="/filter/status" />
            
            {/* <Link title="View user details" href="/user" />
            <Link title="View repo details" href="/repo" /> */}
        </div>
    );
}

export default Header;