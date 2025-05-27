"use client";

// components/app/Footer.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.jpg";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Styles
  const footerStyle = {
    background: "#222",
    color: "#fff",
    padding: "40px 20px",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
  };

  const footerLogoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  };

  const logoImageStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  };

  const logoTextStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    margin: 0,
  };

  const footerMenuStyle = {
    listStyle: "none",
    padding: 0,
    margin: "10px 0",
    display: "flex",
    gap: isMobile ? "10px" : "20px",
    flexDirection: isMobile ? ("column" as const) : ("row" as const),
  };

  const menuItemStyle = {
    display: "inline",
  };

  const menuLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    transition: "0.3s",
  };

  const footerSocialStyle = {
    marginTop: "15px",
    display: "flex",
    gap: isMobile ? "10px" : "15px",
  };

  const socialLinkStyle = {
    fontSize: "20px",
    color: "#fff",
    transition: "0.3s",
    textDecoration: "none",
  };

  const footerTextStyle = {
    fontSize: "14px",
    color: "#bbb",
    marginTop: "20px",
    margin: "20px 0 0 0",
  };

  return (
    <>
      {/* Google Fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Roboto:400,500,300,700");
      `}</style>

      <footer style={footerStyle}>
        <div style={footerLogoStyle}>
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            style={logoImageStyle}
          />
          <p style={logoTextStyle}>HikeJam</p>
        </div>

        <ul style={footerMenuStyle}>
          <li style={menuItemStyle}>
            <Link
              href="/"
              style={menuLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5383d3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
            >
              Home
            </Link>
          </li>
          <li style={menuItemStyle}>
            <Link
              href="/aboutus"
              style={menuLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5383d3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
            >
              About
            </Link>
          </li>
          <li style={menuItemStyle}>
            <Link
              href="/destinations"
              style={menuLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5383d3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
            >
              Destinations
            </Link>
          </li>
          <li style={menuItemStyle}>
            <Link
              href="/gallery"
              style={menuLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5383d3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
            >
              Gallery
            </Link>
          </li>
          <li style={menuItemStyle}>
            <Link
              href="/contact"
              style={menuLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5383d3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div style={footerSocialStyle}>
          <a
            href="#"
            style={socialLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#5383d3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#fff";
            }}
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="#"
            style={socialLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#5383d3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#fff";
            }}
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            style={socialLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#5383d3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#fff";
            }}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            style={socialLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#5383d3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#fff";
            }}
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <p style={footerTextStyle}>
          © {new Date().getFullYear()} HikeJam. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
