import React from "react";
import Image from "next/image";
import Link from "next/link";
import MemoryCarousel from "../../components/MemoryCarousel";
import logo from "../../public/logo.jpg";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br from-white to-gray-50">
      {/* LEFT */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center px-8 py-16 overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 z-0 opacity-10 blur-sm">
          <Image
            src={logo}
            alt="HikeJam Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-left max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            <span className="block">Your Trail.</span>
            <span className="block text-orange-500">Your Story.</span>
            <span className="block">Our Journey Together.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            At <strong>HikeJam</strong>, we believe every hike holds a story worth sharing — a sunrise conquered, a trail discovered, a bond formed. Share your journey, relive your memories, and inspire the next hiker.
          </p>
          <Link href="/blog">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 font-semibold text-lg">
              Share Your Story
            </button>
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex md:w-1/2 min-h-screen items-center justify-center px-8 py-16 bg-white">
        <div className="flex flex-col items-center w-full max-w-xl border-l border-orange-100 shadow-2xl rounded-3xl p-6 bg-gradient-to-tr from-orange-50 to-white backdrop-blur-xl">
          <div className="w-full mb-6 text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
               Wall of Memories
            </h2>
            <p className="text-sm text-gray-600 italic">
              A snapshot of the trails shared by people.
            
            </p>
          </div>

          <div className="w-full">
            <MemoryCarousel />
          </div>

          <p className="text-xs text-gray-500 italic mt-6">
            Data from <code>/memories.json</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
