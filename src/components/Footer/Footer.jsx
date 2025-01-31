import React from "react";
import "./Footer.css";
import logo from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="logo" />
        <p>HikeJam</p>
      </div>

      <ul className="footer-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Destinations</a></li>
        <li><a href="#">Gallery</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <div className="footer-social">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-linkedin"></i></a>
      </div>

      <p className="footer-text">© {new Date().getFullYear()} HikeJam. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
