import React from 'react';
import { Calendar, User } from 'lucide-react';

const BlogCard = ({
  title,
  author,
  date,
  image,
  content,
  category,
}) => {
  return (
    <article className="blog-card">
      <img src={image} alt={title} className="blog-image" />
      <div className="blog-content">
        <span className="blog-category">{category}</span>
        <h2 className="blog-title">{title}</h2>
        <p className="blog-excerpt">{content}</p>
        <div className="blog-meta">
          <span className="blog-author">
            <User size={16} />
            {author}
          </span>
          <span className="blog-date">
            <Calendar size={16} />
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;