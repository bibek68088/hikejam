"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetch("/memories.json")
      .then((res) => res.json())
      .then((data) => setMemories(data));
  }, []);

  useEffect(() => {
    if (memories.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % memories.length);
        setFade(true); // fade in
      }, 400); // fade duration
    }, 6000); // show each memory for 6s

    return () => clearInterval(interval);
  }, [memories]);

  if (memories.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
        Loading memories...
      </div>
    );
  }

  const memory = memories[index];

  return (
    <div
      key={memory.id}
      className={`bg-white rounded-2xl shadow-xl w-full max-w-xl border border-gray-200 overflow-hidden transition-opacity duration-1000 ease-in-out ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={memory.image}
          alt={memory.caption}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />
      </div>

      <div className="p-5 text-center bg-white">
        <p className="text-lg font-semibold text-gray-900">{memory.caption}</p>
        <p className="text-sm text-gray-500 italic mt-1">
          {memory.trail} — {memory.location}
        </p>
      </div>
    </div>
  );
};

export default MemoryCarousel;
