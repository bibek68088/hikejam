import React from "react";
import BlogCard from "./BlogCard";
import blogsData from "./blogs";
import { Newspaper } from "lucide-react";

const styles = {
  blogContainer: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "2rem",
  },
  blogHeader: {
    textAlign: "center" as const,
    marginBottom: "3rem",
    padding: "2rem 0",
    background: "linear-gradient(135deg, #2d3436 0%, #3c6382 100%)",
    color: "white",
    borderRadius: "1rem",
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  blogHeaderBefore: {
    content: "''",
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b') center/cover",
    opacity: 0.3,
    zIndex: 0,
  },
  blogHeaderContent: {
    position: "relative" as const,
    zIndex: 1,
  },
  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },
  minHeightScreen: {
    minHeight: "100vh",
    backgroundColor: "#f7fafc",
  },
};

const Blog = () => {
  return (
    <div style={styles.minHeightScreen}>
      <div style={styles.blogContainer}>
        <header style={styles.blogHeader}>
          {/* Simulate ::before with a div */}
          <div style={styles.blogHeaderBefore} />
          <div style={styles.blogHeaderContent}>
            <Newspaper
              size={48}
              style={{ display: "inline-block", marginBottom: "1rem" }}
            />
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              The Daily Chronicle
            </h1>
            <p style={{ fontSize: "1.125rem", opacity: 0.9 }}>
              Exploring Ideas, Sharing Stories
            </p>
          </div>
        </header>

        <div style={styles.blogGrid}>
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
