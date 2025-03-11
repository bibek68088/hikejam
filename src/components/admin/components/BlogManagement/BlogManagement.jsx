import { useState, useRef, useEffect } from "react"
import { Save, Plus, Edit, Trash2, ArrowLeft, ImageIcon, Calendar, User, Tag, Upload } from "lucide-react"
import blogsData from "../../../Blog/blogs"
import "./BlogManagement.css"

const BlogManagement = () => {
  const [blogs, setBlogs] = useState(blogsData)
  const [editMode, setEditMode] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(null)
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    date: "",
    image: "",
    content: "",
    category: "",
  })
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

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
  ]

  // Update image preview when form data changes
  useEffect(() => {
    if (formData.image) {
      // Check if it's a base64 image or a URL/path
      if (formData.image.startsWith("data:image")) {
        setImagePreview(formData.image)
      } else {
        // For demo purposes, use a placeholder if it's a path
        setImagePreview("/api/placeholder/300/200")
      }
    } else {
      setImagePreview(null)
    }
  }, [formData.image])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file is an image
    if (!file.type.match("image.*")) {
      alert("Please select an image file (jpg, png, etc.)")
      return
    }

    // Validate file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setFormData({
        ...formData,
        image: event.target.result,
      })
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleEditBlog = (blog) => {
    setEditMode(true)
    setCurrentBlog(blog)
    setFormData({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      date: blog.date,
      image: blog.image,
      content: blog.content,
      category: blog.category,
    })
  }

  const handleNewBlog = () => {
    setEditMode(true)
    setCurrentBlog(null)
    setFormData({
      id: blogs.length + 1,
      title: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      image: "",
      content: "",
      category: categories[0],
    })
  }

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentBlog) {
      // Update existing blog
      setBlogs(blogs.map((blog) => (blog.id === currentBlog.id ? formData : blog)))
    } else {
      // Add new blog
      setBlogs([...blogs, formData])
    }

    setEditMode(false)
    setCurrentBlog(null)
  }

  const handleCancel = () => {
    setEditMode(false)
    setCurrentBlog(null)
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

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
                  {imagePreview ? (
                    <img src={imagePreview || "/placeholder.svg"} alt="Blog preview" />
                  ) : (
                    <div className="no-image">
                      <ImageIcon size={40} />
                    </div>
                  )}
                </div>
                <div className="blog-content">
                  <span className="blog-category">{formData.category}</span>
                  <h2 className="blog-title">{formData.title || "Blog Title"}</h2>
                  <p className="blog-excerpt">{formData.content || "Blog content will appear here..."}</p>
                  <div className="blog-meta">
                    <span className="blog-author">
                      <User size={16} />
                      {formData.author || "Author Name"}
                    </span>
                    <span className="blog-date">
                      <Calendar size={16} />
                      {formData.date ? new Date(formData.date).toLocaleDateString() : "Date"}
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
                <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
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
                  <span>Blog Image</span>
                </label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="file-input-hidden"
                  />
                  <div className="image-input-container">
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Image path or URL"
                      className="image-path-input"
                    />
                    <button type="button" className="upload-btn" onClick={triggerFileInput}>
                      <Upload size={16} />
                      Upload
                    </button>
                  </div>
                  {imagePreview && (
                    <div className="image-preview-thumbnail">
                      <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => {
                          setFormData({ ...formData, image: "" })
                          if (fileInputRef.current) fileInputRef.current.value = ""
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <small className="image-help">Enter image path or upload a new image from your computer</small>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
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
                        src={blog.image.startsWith("data:image") ? blog.image : "/api/placeholder/40/40"}
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
                      <button className="edit-btn" onClick={() => handleEditBlog(blog)}>
                        <Edit size={16} />
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteBlog(blog.id)}>
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
  )
}

export default BlogManagement

