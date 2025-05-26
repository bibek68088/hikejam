"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import profile from "../../public/cat.png";
import { logout, isLoggedIn, getUserRole } from "../../pages/admin/auth";
import "./Navbar.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
    setUserRole(getUserRole());
  }, []);

  const toggleMenu = () => setIsMobile(!isMobile);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const closeMobileMenu = useCallback(() => setIsMobile(false), []);

  const handleLogout = () => {
    logout();
    setIsUserLoggedIn(false);
    setUserRole(null);
    setIsProfileOpen(false);
    router.push("/");
  };

  // Close menu on route change
  useEffect(() => {
    closeMobileMenu();
    setIsProfileOpen(false);
  }, [pathname, closeMobileMenu]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/aboutus", label: "About" },
    { href: "/destinations", label: "Destinations" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Image src={logo} alt="logo" width={32} height={32} />
        <p>HikeJam</p>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isMobile ? "animate" : ""}`}></div>
        <div className={`bar ${isMobile ? "animate" : ""}`}></div>
        <div className={`bar ${isMobile ? "animate" : ""}`}></div>
      </div>

      <ul className={`nav-menu ${isMobile ? "show" : ""}`}>
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={isActive(href) ? "active" : ""}>
              {label}
            </Link>
          </li>
        ))}

        <li className="profile-container" ref={dropdownRef}>
          <div className="profile-icon" onClick={toggleProfile}>
            <Image
              src={profile}
              alt="profile"
              width={32}
              height={32}
              style={{
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
                  <Link
                    href={
                      userRole === "admin"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                    className="dropdown-item"
                  >
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="dropdown-item">
                    Login
                  </Link>
                  <Link href="/signup" className="dropdown-item">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
