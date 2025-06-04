"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../components/auth-provider";
import logo from "../../public/logo.jpg";
import profileImg from "../../public/cat.png";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const { user, logout: authLogout } = useAuth();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
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
    { href: "/Blog", label: "Blog" },
    { href: "/aboutus", label: "About" },
    { href: "/destinations", label: "Destinations" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => pathname === path;
  const isMobileView = windowWidth <= 768;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt="logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <p className="text-xl font-semibold text-gray-800 m-0">HikeJam</p>
      </div>

      <div
        className="flex flex-col gap-[5px] cursor-pointer md:hidden z-50"
        onClick={toggleMenu}
      >
        <span
          className={`h-[3px] w-[25px] bg-gray-800 transition-transform ${
            isMobile ? "rotate-45 translate-y-[5px]" : ""
          }`}
        ></span>
        <span
          className={`h-[3px] w-[25px] bg-gray-800 transition-opacity ${
            isMobile ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`h-[3px] w-[25px] bg-gray-800 transition-transform ${
            isMobile ? "-rotate-45 -translate-y-[5px]" : ""
          }`}
        ></span>
      </div>

      <ul
        className={`${
          isMobileView
            ? `fixed top-0 right-0 h-screen w-[70%] max-w-[300px] bg-white flex flex-col items-center justify-center space-y-6 shadow-lg transition-all duration-300 ${
                isMobile ? "right-0" : "-right-full"
              }`
            : "hidden md:flex md:gap-8"
        }`}
      >
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`relative text-[1rem] md:text-base font-medium ${
                isActive(href) ? "text-orange-500" : "text-gray-700"
              } hover:text-orange-500 transition`}
            >
              {label}
              {isActive(href) && !isMobileView && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-[2px] bg-orange-500"></span>
              )}
            </Link>
          </li>
        ))}

        <li className="relative" ref={dropdownRef}>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={toggleProfile}
          >
            <Image
              src={profileImg}
              alt="profile"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>
          {isProfileOpen && (
            <div
              className={`${
                isMobileView
                  ? "static mt-4 w-full text-center"
                  : "absolute right-0 mt-2 min-w-[120px] bg-white shadow-lg rounded-md"
              } z-40`}
            >
              {user ? (
                <>
                  <Link
                    href={
                      user.role === "admin"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                    className="block w-full px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-100 text-left"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-100 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block w-full px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-100 text-left"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-gray-100 text-left"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
