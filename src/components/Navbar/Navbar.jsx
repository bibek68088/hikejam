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
        <li onClick={() => setMenu("home")}>Home{menu === "home" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("about")}>About{menu === "about" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("destination")}>Destinations{menu === "destination" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("gallery")}>Gallery{menu === "gallery" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("contact")}>Contact{menu === "contact" ? <hr /> : <></>}</li>
      </ul>
    </div>
  )
}

export default Navbar;
