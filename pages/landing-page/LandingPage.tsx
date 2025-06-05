"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MemoryCarousel from "../../components/MemoryCarousel"; // ← Adjust path if needed
import logo from "../../public/logo.jpg";                   // ← Adjust path if needed

const LandingPage: React.FC = () => {
  // State to trigger fade-in of hero text on mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(tm);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gray-50 overflow-hidden">
      {/* ─────────── Diagonal SVG Divider ─────────── */}
      {/* Creates a slanted white polygon between the two panels on large screens */}
      <svg
        className="hidden lg:block absolute top-0 right-1/2 h-full w-[60vw] -translate-x-1/2"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 100,0 50,100 0,100" className="fill-white" />
      </svg>

      <div className="flex flex-col lg:flex-row h-full">
        {/* ─────────── LEFT HERO PANEL ─────────── */}
        <div className="
            relative z-10 flex-1 flex items-center justify-center
            px-4 md:px-8 lg:px-16 py-12
            bg-gradient-to-br from-white to-gray-100
            overflow-hidden
          "
        >
          {/* Faint background logo behind hero text */}
          <div className="absolute inset-0 opacity-10 blur-sm">
            <Image
              src={logo}
              alt="HikeJam Logo"
              fill
              objectFit="contain"
              priority
            />
          </div>

          {/* Semi-transparent overlay to keep text legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/60"></div>

          {/* Hero Text */}
          <div
            className={`
              relative z-20 max-w-2xl space-y-6
              transition-opacity duration-700 ease-out
              ${mounted ? "opacity-100" : "opacity-0"}
            `}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
              <span className="block">Your Trail.</span>
              <span className="block text-orange-500 relative group">
                Your Story.
                {/* Gradient underline that animates on hover */}
                <span
                  className="
                    absolute bottom-0 left-0 h-1 w-20 
                    bg-gradient-to-r from-orange-400 to-orange-600 
                    rounded-full 
                    scale-x-0 group-hover:scale-x-100 
                    origin-left 
                    transition-transform duration-300
                  "
                />
              </span>
              <span className="block">Our Journey Together.</span>
            </h1>

            <p className="text-base md:text-xl text-gray-700 leading-relaxed">
              At <strong>HikeJam</strong>, we believe every hike tells a story worth sharing—a sunrise conquered, a trail discovered, a bond formed. Share your journey, relive your memories, and inspire the next hiker.
            </p>

            <Link href="/blog">
              <button
                className="
                  inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600
                  hover:from-orange-600 hover:to-orange-700
                  text-white px-8 py-4 rounded-full shadow-lg
                  transform hover:scale-105 transition-transform duration-300
                  font-semibold text-lg
                "
              >
                Share Your Story
                <svg
                  className="ml-2 h-5 w-5 stroke-current"
                  fill="none"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* ─────────── RIGHT “WALL OF MEMORIES” PANEL ─────────── */}
        <div className="
            relative z-10 flex-1 flex items-center justify-center
            px-4 md:px-8 lg:px-16 py-12 bg-white
          "
        >
          {/* Outer Card Container */}
          <div
            className="
              relative w-full max-w-lg flex flex-col
              border border-gray-200 shadow-2xl rounded-3xl
              p-6 bg-orange-50/90 backdrop-blur-md
              overflow-hidden
            "
            style={{ minHeight: "600px" }}
          >
            {/* Card Header */}
            <div className="w-full text-center mb-6">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-1 tracking-tight">
                Wall of Memories
              </h2>
              <p className="text-sm text-gray-600 italic">
                A snapshot of the trails shared by people.
              </p>
            </div>

            {/* Carousel: fills the remaining card space */}
            <div className="w-full flex-1 overflow-hidden rounded-2xl">
              <MemoryCarousel />
            </div>

            {/* Attribution */}
            <p className="text-xs text-gray-500 italic mt-4 text-center">
              Data from <code>/memories.json</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
