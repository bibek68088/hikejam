"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import "./Navbar.css"
import logo from "../assets/logo.jpg"
import profile from "../assets/cat.png"
import { logout, isLoggedIn, getUserRole } from "../admin/auth"

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn())
    setUserRole(getUserRole())
  }, [])

  const toggleMenu = () => {
    setIsMobile(!isMobile)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const closeMobileMenu = useCallback(() => {
    setIsMobile(false)
  }, [])

  const handleLogout = () => {
    logout()
    setIsUserLoggedIn(false)
    setUserRole(null)
    setIsProfileOpen(false)
    navigate("/")
  }

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu()
    setIsProfileOpen(false)
  }, [location, closeMobileMenu])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo || "/placeholder.svg"} alt="logo" />
        <p>HikeJam</p>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isMobile ? "animate" : ""}`}></div>
        <div className={`bar ${isMobile ? "animate" : ""}`}></div>
        <div className={`bar ${isMobile ? "animate" : ""}`}></div>
      </div>

      <ul className={`nav-menu ${isMobile ? "show" : ""}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink to="/aboutus" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/destinations" className={({ isActive }) => (isActive ? "active" : "")}>
            Destinations
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" className={({ isActive }) => (isActive ? "active" : "")}>
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
        </li>
        <li className="profile-container" ref={dropdownRef}>
          <div className="profile-icon" onClick={toggleProfile}>
            <img
              src={profile || "/placeholder.svg"}
              alt="profile"
              style={{
                width: "32px",
                height: "32px",
                objectFit: "cover",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </div>
          {isProfileOpen && (
            <div className="profile-dropdown">
              {isUserLoggedIn ? (
                <>
                  {userRole === "admin" ? (
                    <NavLink to="/admin/dashboard" className="dropdown-item">
                      Profile
                    </NavLink>
                  ) : (
                    <NavLink to="/user/dashboard" className="dropdown-item">
                      Profile
                    </NavLink>
                  )}
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="dropdown-item">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="dropdown-item">
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Navbar

