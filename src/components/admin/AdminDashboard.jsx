import React, { useState } from 'react';
import blogsData from '../Blog/blogs';
import './admin.css';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState(blogsData);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const initialFormState = {
    title: '',
    author: '',
    category: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
  };

  const [formData, setFormData] = useState(initialFormState);

  const stats = {
    totalPosts: blogs.length,
    totalAuthors: new Set(blogs.map(blog => blog.author)).size,
    totalCategories: new Set(blogs.map(blog => blog.category)).size,
    totalViews: blogs.length * 123 // Example calculation
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(blog => 
        blog.id === editingBlog.id 
          ? { ...blog, ...formData }
          : blog
      ));
      showNotification('Blog updated successfully!');
    } else {
      // Add new blog
      const newBlog = {
        ...formData,
        id: blogs.length + 1,
        image: '/api/placeholder/400/300'
      };
      setBlogs([...blogs, newBlog]);
      showNotification('New blog created successfully!');
    }

    setFormData(initialFormState);
    setEditingBlog(null);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      category: blog.category,
      content: blog.content,
      date: blog.date
    });
  };

  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      showNotification('Blog deleted successfully!');
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <header className="dashboard-header">
        <h1>Blog Admin Dashboard</h1>
      </header>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Posts</h3>
          <div className="stat-value">{stats.totalPosts}</div>
        </div>
        <div className="stat-card">
          <h3>Total Authors</h3>
          <div className="stat-value">{stats.totalAuthors}</div>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <div className="stat-value">{stats.totalCategories}</div>
        </div>
        <div className="stat-card">
          <h3>Total Views</h3>
          <div className="stat-value">{stats.totalViews}</div>
        </div>
      </div>

      {/* Blog Form */}
      <form className="blog-form" onSubmit={handleSubmit}>
        <h2>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
        <div className="form-grid">
          <div className="input-group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Blog Title"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Author Name"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="input-group">
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Blog Content"
            required
          />
        </div>
        <div className="action-buttons">
          <button type="submit" className="btn btn-primary">
            {editingBlog ? 'Update Post' : 'Create Post'}
          </button>
          {editingBlog && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditingBlog(null);
                setFormData(initialFormState);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Search Bar */}
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Blog Table */}
      <table className="blog-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.category}</td>
              <td>{new Date(blog.date).toLocaleDateString()}</td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;