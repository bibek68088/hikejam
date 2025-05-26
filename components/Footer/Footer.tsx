// components/app/Footer.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.jpg";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <Image src={logo} alt="logo" width={50} height={50} />
        <p>HikeJam</p>
      </div>

      <ul className="footer-menu">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/aboutus">About</Link>
        </li>
        <li>
          <Link href="/destinations">Destinations</Link>
        </li>
        <li>
          <Link href="/gallery">Gallery</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <div className="footer-social">
        <a href="#">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>

      <p className="footer-text">
        © {new Date().getFullYear()} HikeJam. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
