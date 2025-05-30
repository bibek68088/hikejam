"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../components/auth-provider";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const { user, logout: authLogout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMobile(!isMobile);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const closeMobileMenu = useCallback(() => setIsMobile(false), []);

  const handleLogout = () => {
    authLogout();
    setIsProfileOpen(false);
    router.push("/");
  };

  useEffect(() => {
    closeMobileMenu();
    setIsProfileOpen(false);
  }, [pathname, closeMobileMenu]);

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
    { href: "/about-us", label: "About Us" },
    { href: "/destinations", label: "Destinations" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => pathname === path;
  const isMobileView = windowWidth <= 768;

  // Styles (keeping the same styles from original)
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
  };

  const navLogoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const logoTextStyle = {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#2b2d42",
    margin: 0,
  };

  const hamburgerStyle = {
    display: isMobileView ? "flex" : "none",
    flexDirection: "column" as const,
    gap: "5px",
    cursor: "pointer",
    zIndex: 1001,
  };

  const barStyle = (index: number) => ({
    width: "25px",
    height: "3px",
    background: "#2b2d42",
    transition: "all 0.3s ease",
    transform: isMobile
      ? index === 0
        ? "rotate(45deg) translate(5px, 5px)"
        : index === 2
        ? "rotate(-45deg) translate(5px, -5px)"
        : "rotate(0deg)"
      : "none",
    opacity: isMobile && index === 1 ? 0 : 1,
  });

  const navMenuStyle = {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
    position: isMobileView ? ("fixed" as const) : ("static" as const),
    top: isMobileView ? 0 : "auto",
    right: isMobileView ? (isMobile ? 0 : "-100%") : "auto",
    height: isMobileView ? "100vh" : "auto",
    width: isMobileView ? "70%" : "auto",
    maxWidth: isMobileView ? "300px" : "none",
    background: "#fff",
    flexDirection: isMobileView ? ("column" as const) : ("row" as const),
    justifyContent: isMobileView ? "center" : "flex-start",
    alignItems: isMobileView ? "center" : "flex-start",
    boxShadow: isMobileView ? "-2px 0 10px rgba(0, 0, 0, 0.1)" : "none",
    transition: "right 0.3s ease",
  };

  const navLinkStyle = (isActiveLink: boolean) => ({
    textDecoration: "none",
    color: isActiveLink ? "#ff6b35" : "#4a4a4a",
    fontWeight: 500,
    padding: isMobileView ? "1rem" : "0.5rem 1rem",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    position: "relative" as const,
    fontSize: isMobileView ? "1.2rem" : "1rem",
    display: "block",
  });

  const activeIndicatorStyle = {
    content: '""',
    position: "absolute" as const,
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%",
    height: "2px",
    background: "#ff6b35",
  };

  const profileContainerStyle = {
    position: "relative" as const,
  };

  const profileIconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const profileDropdownStyle = {
    position: isMobileView ? ("static" as const) : ("absolute" as const),
    top: isMobileView ? "auto" : "100%",
    right: isMobileView ? "auto" : 0,
    background: "white",
    borderRadius: "8px",
    boxShadow: isMobileView ? "none" : "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "0.5rem 0",
    minWidth: "120px",
    marginTop: isMobileView ? "1rem" : "0.5rem",
    width: isMobileView ? "100%" : "auto",
    textAlign: isMobileView ? ("center" as const) : ("left" as const),
  };

  const dropdownItemStyle = {
    display: "block",
    padding: "0.5rem 1rem",
    color: "#4a4a4a",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
    border: "none",
    background: "transparent",
    width: "100%",
    textAlign: "left" as const,
    cursor: "pointer",
  };

  return (
    <div style={navbarStyle}>
      <div style={navLogoStyle}>
        <Image
          src="/placeholder.svg?height=32&width=32"
          alt="logo"
          width={32}
          height={32}
          style={{ borderRadius: "50%" }}
        />
        <p style={logoTextStyle}>HikeJam</p>
      </div>

      <div style={hamburgerStyle} onClick={toggleMenu}>
        <div style={barStyle(0)}></div>
        <div style={barStyle(1)}></div>
        <div style={barStyle(2)}></div>
      </div>

      <ul style={navMenuStyle}>
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              style={navLinkStyle(isActive(href))}
              onMouseEnter={(e) => {
                if (!isActive(href)) {
                  e.currentTarget.style.color = "#ff6b35";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(href)) {
                  e.currentTarget.style.color = "#4a4a4a";
                }
              }}
            >
              {label}
              {isActive(href) && !isMobileView && (
                <div style={activeIndicatorStyle}></div>
              )}
            </Link>
          </li>
        ))}

        <li style={profileContainerStyle} ref={dropdownRef}>
          <div style={profileIconStyle} onClick={toggleProfile}>
            <Image
              src="/placeholder.svg?height=32&width=32"
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
            <div style={profileDropdownStyle}>
              {user ? (
                <>
                  <Link
                    href={
                      user.role === "admin"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                    style={dropdownItemStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                      e.currentTarget.style.color = "#ff6b35";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#4a4a4a";
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={dropdownItemStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                      e.currentTarget.style.color = "#ff6b35";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#4a4a4a";
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    style={dropdownItemStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                      e.currentTarget.style.color = "#ff6b35";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#4a4a4a";
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    style={dropdownItemStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                      e.currentTarget.style.color = "#ff6b35";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#4a4a4a";
                    }}
                  >
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
}
