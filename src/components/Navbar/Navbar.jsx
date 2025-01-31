import React, { useState } from 'react'
import './Navbar.css'
import logo from "../assets/logo.jpg"

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>HikeJam</p>
      </div>

 
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`nav-menu ${isMobile ? 'show' : ''}`}>
  <li className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>Home</li>
  <li className={menu === "about" ? "active" : ""} onClick={() => setMenu("about")}>About</li>
  <li className={menu === "destination" ? "active" : ""} onClick={() => setMenu("destination")}>Destinations</li>
  <li className={menu === "gallery" ? "active" : ""} onClick={() => setMenu("gallery")}>Gallery</li>
  <li className={menu === "contact" ? "active" : ""} onClick={() => setMenu("contact")}>Contact</li>
</ul>

    </div>
  )
}

export default Navbar;
