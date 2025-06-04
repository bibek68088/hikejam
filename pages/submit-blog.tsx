import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/logo.jpg";

const SubmitBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content, image });
    alert("Blog submitted! (This is just a frontend demo.)");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-100 px-4 py-16 overflow-hidden">
      {/* Watermark Logo with inline animation */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <Image
          src={logo}
          alt="Watermark"
          width={400}
          height={400}
          className="opacity-10 blur-sm animate-pulse scale-110"
        />
      </div>

      {/* Blog Form Container */}
      <div className="relative max-w-3xl mx-auto backdrop-blur-md bg-white/80 shadow-2xl rounded-2xl p-10 space-y-6 z-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 text-center tracking-tight animate-fade-in">
          ✍️ Share Your Hike Story
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., My First Summit at Annapurna"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition duration-200"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {preview && (
              <div className="mt-4">
                <Image
                  src={preview}
                  alt="Preview"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-md object-cover"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Your Story</label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="Write about your hiking experience, the trail, what inspired you, and any unforgettable moments..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition duration-200"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transform transition-all duration-300 hover:scale-105"
          >
            🚀 Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitBlog;
