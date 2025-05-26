import React from "react";
import BlogCard from "./BlogCard";
import blogsData from "./blogs";
import "./blog.css";
import { Newspaper } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="blog-container">
        <header className="blog-header">
          <Newspaper className="inline-block mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-2">The Daily Chronicle</h1>
          <p className="text-lg opacity-90">Exploring Ideas, Sharing Stories</p>
        </header>

        <div className="blog-grid">
          {blogsData.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              author={blog.author}
              date={blog.date}
              image={blog.image}
              content={blog.content}
              category={blog.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
