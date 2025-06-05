"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Memory {
  id: number;
  image: string;
  caption: string;
  location: string;
  trail: string;
}

const MemoryCarousel: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/memories.json")
      .then((res) => res.json())
      .then((data) => setMemories(data))
      .catch((err) => {
        console.error("Error loading memories.json:", err);
      });
  }, []);

  useEffect(() => {
    if (memories.length <= 1 || paused) return;

    timeoutRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % memories.length);
        setFade(true);
      }, 400);
    }, 6000);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [memories, index, paused]);

  if (memories.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center rounded-xl">
        <span className="text-gray-400">Loading memories...</span>
      </div>
    );
  }

  const memory = memories[index];

  const goToNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % memories.length);
      setFade(true);
    }, 400);
  };

  const goToPrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + memories.length) % memories.length);
      setFade(true);
    }, 400);
  };

  return (
    <div
      className={`relative w-full max-w-3xl aspect-[4/3] overflow-hidden rounded-xl mx-auto shadow-lg transition-opacity duration-1000 ease-in-out ${
        fade ? "opacity-100" : "opacity-0"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={memory.image}
          alt={memory.caption}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 720px"
          priority
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
        <p className="text-white text-lg font-semibold truncate">
          {memory.caption}
        </p>
        <p className="text-sm text-gray-200 italic mt-1 truncate">
          {memory.trail} — {memory.location}
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-full text-xl"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-full text-xl"
      >
        ›
      </button>
    </div>
  );
};

export default MemoryCarousel;
