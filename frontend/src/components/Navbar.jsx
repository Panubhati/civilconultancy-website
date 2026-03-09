import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src="/logo.png" alt="Logo" className="logo" />
                <span className="site-name">Anita Construction</span>
            </div>
            <ul className="nav-links">
                <li><Link to="/" className="nav-item">Home</Link></li>
                <li><Link to="/about" className="nav-item">About Us</Link></li>
                <li><Link to="/services" className="nav-item">Services</Link></li>
                <li><Link to="/projects" className="nav-item">Projects</Link></li>
                <li><Link to="/contact" className="nav-item">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
