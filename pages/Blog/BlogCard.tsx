import React from "react";
import Image, { StaticImageData } from "next/image";
import { Calendar, User } from "lucide-react";

interface BlogCardProps {
  title: string;
  author: string;
  date: string;
  image: string | StaticImageData;
  content: string;
  category: string;
}

const styles = {
  blogCard: {
    backgroundColor: "white",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  blogCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
  },
  blogImageWrapper: {
    position: "relative" as const,
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
  blogImageHover: {
    transform: "scale(1.05)",
    transition: "transform 0.3s ease",
  },
  blogImage: {
    transition: "transform 0.3s ease",
  },
  blogContent: {
    padding: "1.5rem",
  },
  blogCategory: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    backgroundColor: "#3c6382",
    color: "white",
    borderRadius: "1rem",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
    fontWeight: 500,
  },
  blogTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#2d3436",
    margin: "0.5rem 0",
    lineHeight: 1.4,
  },
  blogExcerpt: {
    color: "#636e72",
    fontSize: "0.875rem",
    lineHeight: 1.6,
    marginBottom: "1rem",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  },
  blogMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#636e72",
    paddingTop: "1rem",
    borderTop: "1px solid #eee",
  },
  blogAuthor: {
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  blogDate: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
};

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  author,
  date,
  image,
  content,
  category,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <article
      style={{
        ...styles.blogCard,
        ...(isHovered ? styles.blogCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={`Read more about ${title}`}
    >
      <div
        style={{
          ...styles.blogImageWrapper,
          ...(isHovered ? styles.blogImageHover : {}),
        }}
      >
        <Image
          src={image}
          alt={title}
          fill={false}
          width={400}
          height={200}
          style={{
            objectFit: "cover",
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.05)" : "none",
          }}
          sizes="(max-width: 768px) 100vw, 400px"
          priority={false}
        />
      </div>
      <div style={styles.blogContent}>
        <span style={styles.blogCategory}>{category}</span>
        <h2 style={styles.blogTitle}>{title}</h2>
        <p style={styles.blogExcerpt}>{content}</p>
        <div style={styles.blogMeta}>
          <span style={styles.blogAuthor}>
            <User size={16} aria-hidden="true" />
            {author}
          </span>
          <span style={styles.blogDate}>
            <Calendar size={16} aria-hidden="true" />
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
