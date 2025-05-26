import React, { useState } from "react";
import {
  Save,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import blogsData from "../../Blog/blogs";
import "./BlogManagement.css";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState(blogsData);
  const [editMode, setEditMode] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    date: "",
    image: "",
    content: "",
    category: "",
  });

  // Categories from the original data
  const categories = [
    "Alpine Hiking",
    "Gear Guide",
    "Trail Discovery",
    "Conservation",
    "Safety",
    "Family Hiking",
    "Adventure",
    "Training",
    "Photography",
    "History",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditBlog = (blog) => {
    setEditMode(true);
    setCurrentBlog(blog);
    setFormData({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      date: blog.date,
      image: blog.image,
      content: blog.content,
      category: blog.category,
    });
  };

  const handleNewBlog = () => {
    setEditMode(true);
    setCurrentBlog(null);
    setFormData({
      id: blogs.length + 1,
      title: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      image: "../assets/blog1.jpg",
      content: "",
      category: categories[0],
    });
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentBlog) {
      // Update existing blog
      setBlogs(
        blogs.map((blog) => (blog.id === currentBlog.id ? formData : blog))
      );
    } else {
      // Add new blog
      setBlogs([...blogs, formData]);
    }

    setEditMode(false);
    setCurrentBlog(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setCurrentBlog(null);
  };

  return (
    <div className="blog-management-container">
      <div className="blog-management-header">
        <h2>Blog Management</h2>
        {!editMode && (
          <button className="new-blog-btn" onClick={handleNewBlog}>
            <Plus size={20} />
            <span>New Blog Post</span>
          </button>
        )}
      </div>

      {editMode ? (
        <div className="blog-form-container">
          <button className="back-btn" onClick={handleCancel}>
            <ArrowLeft size={16} />
            <span>Back to blogs</span>
          </button>

          <form onSubmit={handleSubmit} className="blog-form">
            <h3>{currentBlog ? "Edit Blog Post" : "Create New Blog Post"}</h3>

            <div className="form-preview">
              <div className="blog-card preview-card">
                <div className="image-preview">
                  {formData.image ? (
                    <img src="/api/placeholder/300/200" alt="Blog preview" />
                  ) : (
                    <div className="no-image">
                      <ImageIcon size={40} />
                    </div>
                  )}
                </div>
                <div className="blog-content">
                  <span className="blog-category">{formData.category}</span>
                  <h2 className="blog-title">
                    {formData.title || "Blog Title"}
                  </h2>
                  <p className="blog-excerpt">
                    {formData.content || "Blog content will appear here..."}
                  </p>
                  <div className="blog-meta">
                    <span className="blog-author">
                      <User size={16} />
                      {formData.author || "Author Name"}
                    </span>
                    <span className="blog-date">
                      <Calendar size={16} />
                      {formData.date
                        ? new Date(formData.date).toLocaleDateString()
                        : "Date"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="title">
                  <span>Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter blog title"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="author">
                    <User size={16} />
                    <span>Author</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    placeholder="Author name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">
                    <Calendar size={16} />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  <Tag size={16} />
                  <span>Category</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="content">
                  <span>Content</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Enter blog content"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">
                  <ImageIcon size={16} />
                  <span>Image Path</span>
                </label>
                <div className="image-input-container">
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    placeholder="../assets/blog1.jpg"
                  />
                  <button type="button" className="upload-btn">
                    Upload
                  </button>
                </div>
                <small className="image-help">
                  Enter path or upload a new image
                </small>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <Save size={16} />
                  <span>Save Blog Post</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="blogs-table-container">
          <div className="blogs-table-header">
            <div className="search-filter">
              <input type="text" placeholder="Search blogs..." />
              <select defaultValue="all">
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="blogs-count">Showing {blogs.length} blog posts</div>
          </div>
          <table className="blogs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td className="blog-title-cell">
                    <div className="blog-title-with-preview">
                      <img
                        src="/api/placeholder/40/40"
                        alt={blog.title}
                        className="blog-thumbnail"
                      />
                      <span>{blog.title}</span>
                    </div>
                  </td>
                  <td>{blog.author}</td>
                  <td>{new Date(blog.date).toLocaleDateString()}</td>
                  <td>
                    <span className="category-badge">{blog.category}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditBlog(blog)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteBlog(blog.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
