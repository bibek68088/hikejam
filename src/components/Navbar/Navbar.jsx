import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>HikeJam</p>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isMobile ? 'animate' : ''}`}></div>
        <div className={`bar ${isMobile ? 'animate' : ''}`}></div>
        <div className={`bar ${isMobile ? 'animate' : ''}`}></div>
      </div>

      <ul className={`nav-menu ${isMobile ? 'show' : ''}`}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/destinations" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Destinations
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;