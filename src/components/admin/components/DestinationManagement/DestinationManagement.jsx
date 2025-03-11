import { useState, useEffect } from "react"
import "./DestinationManagement.css"
import hikingDestinations from "../../data/hikingDestinations"

const DestinationManagement = () => {
  const [destinations, setDestinations] = useState([])
  const [filteredDestinations, setFilteredDestinations] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentDestination, setCurrentDestination] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    difficulty: "Moderate",
    duration: "",
    trailhead: "",
    location: { lat: 0, lng: 0 },
    trailheadLocation: { lat: 0, lng: 0 },
    image: "",
    reviews: [],
  })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  // Load destinations from local storage or use initial data
  useEffect(() => {
    try {
      // Try to get from localStorage first
      const storedDestinations = localStorage.getItem("hikingDestinations")
      if (storedDestinations) {
        const parsedDestinations = JSON.parse(storedDestinations)
        if (Array.isArray(parsedDestinations) && parsedDestinations.length > 0) {
          console.log("Loaded destinations from localStorage:", parsedDestinations.length)
          setDestinations(parsedDestinations)
          setFilteredDestinations(parsedDestinations)
          return
        }
      }

      // If localStorage is empty or invalid, use the imported data
      console.log("Using initial destinations data:", hikingDestinations.length)
      setDestinations(hikingDestinations)
      setFilteredDestinations(hikingDestinations)

      // Save the initial data to localStorage for future use
      localStorage.setItem("hikingDestinations", JSON.stringify(hikingDestinations))
    } catch (error) {
      console.error("Error initializing destinations:", error)
      // Fallback to initial data if there's an error
      setDestinations(hikingDestinations)
      setFilteredDestinations(hikingDestinations)
    }
  }, [])

  // Filter destinations based on search query
  useEffect(() => {
    if (!Array.isArray(destinations)) {
      console.error("destinations is not an array:", destinations)
      return
    }

    try {
      const filtered = destinations.filter((destination) => {
        const query = searchQuery.toLowerCase()
        return (
          destination.name.toLowerCase().includes(query) ||
          destination.description.toLowerCase().includes(query) ||
          destination.difficulty.toLowerCase().includes(query) ||
          destination.trailhead.toLowerCase().includes(query)
        )
      })

      // Sort filtered destinations
      const sorted = [...filtered].sort((a, b) => {
        let compareA, compareB

        if (sortBy === "name" || sortBy === "trailhead" || sortBy === "difficulty") {
          compareA = a[sortBy].toLowerCase()
          compareB = b[sortBy].toLowerCase()
        } else if (sortBy === "duration") {
          // Extract hours from duration (e.g., "4-5 hours" → 4)
          compareA = Number.parseInt(a[sortBy].split("-")[0])
          compareB = Number.parseInt(b[sortBy].split("-")[0])
        } else if (sortBy === "reviews") {
          compareA = a.reviews.length
          compareB = b.reviews.length
        } else {
          compareA = a[sortBy]
          compareB = b[sortBy]
        }

        if (sortOrder === "asc") {
          return compareA > compareB ? 1 : -1
        } else {
          return compareA < compareB ? 1 : -1
        }
      })

      setFilteredDestinations(sorted)
    } catch (error) {
      console.error("Error filtering/sorting destinations:", error)
      setFilteredDestinations([...destinations])
    }
  }, [destinations, searchQuery, sortBy, sortOrder])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      // Handle nested objects (location and trailheadLocation)
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: Number.parseFloat(value) || value,
        },
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Set new sort field and default to ascending
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      difficulty: "Moderate",
      duration: "",
      trailhead: "",
      location: { lat: 0, lng: 0 },
      trailheadLocation: { lat: 0, lng: 0 },
      image: "",
      reviews: [],
    })
    setIsEditing(false)
    setCurrentDestination(null)
  }

  const handleSelect = (destination) => {
    setCurrentDestination(destination)
    setFormData({
      ...destination,
      // Make sure we're working with a copy, not a reference
      location: { ...destination.location },
      trailheadLocation: { ...destination.trailheadLocation },
    })
    setIsEditing(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form data
    if (!formData.name || !formData.description || !formData.trailhead) {
      alert("Please fill in all required fields")
      return
    }

    let updatedDestinations

    if (isEditing) {
      // Update existing destination
      updatedDestinations = destinations.map((dest) => (dest.id === formData.id ? { ...formData } : dest))
    } else {
      // Create new destination
      const newDestination = {
        ...formData,
        id: Date.now(), // Simple ID generation (use UUID in production)
        reviews: [],
      }
      updatedDestinations = [...destinations, newDestination]
    }

    // Update state and local storage
    setDestinations(updatedDestinations)
    localStorage.setItem("hikingDestinations", JSON.stringify(updatedDestinations))

    // Reset form
    resetForm()
  }

  const handleDelete = () => {
    if (!currentDestination) return

    const updatedDestinations = destinations.filter((dest) => dest.id !== currentDestination.id)

    setDestinations(updatedDestinations)
    localStorage.setItem("hikingDestinations", JSON.stringify(updatedDestinations))

    setIsDeleteModalOpen(false)
    resetForm()
  }

  const confirmDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const cancelDelete = () => {
    setIsDeleteModalOpen(false)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(destinations, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "hiking-destinations.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="destination-management-page">
      <div className="destination-header">
        <h1>Destination Management</h1>
        <div className="destination-actions">
          <button className="destination-new-button" onClick={resetForm} aria-label="Create new destination">
            + New Destination
          </button>
          <button className="destination-export-button" onClick={exportData} aria-label="Export destinations data">
            Export Data
          </button>
        </div>
      </div>

      <div className="destination-grid">
        <div className="destination-sidebar">
          <div className="destination-search-container">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="destination-search"
              aria-label="Search destinations"
            />
          </div>

          <div className="destination-list-header">
            <div className="destination-column-header" onClick={() => handleSort("name")}>
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </div>
            <div className="destination-column-header" onClick={() => handleSort("difficulty")}>
              Difficulty {sortBy === "difficulty" && (sortOrder === "asc" ? "↑" : "↓")}
            </div>
            <div className="destination-column-header" onClick={() => handleSort("duration")}>
              Duration {sortBy === "duration" && (sortOrder === "asc" ? "↑" : "↓")}
            </div>
          </div>

          <div className="destination-list">
            {Array.isArray(filteredDestinations) && filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className={`destination-item ${currentDestination?.id === destination.id ? "active" : ""}`}
                  onClick={() => handleSelect(destination)}
                >
                  <div className="destination-name">{destination.name}</div>
                  <div className="destination-difficulty">
                    <span className={`difficulty-badge ${destination.difficulty.toLowerCase()}`}>
                      {destination.difficulty}
                    </span>
                  </div>
                  <div className="destination-duration">{destination.duration}</div>
                </div>
              ))
            ) : (
              <div className="destination-no-items">No destinations found</div>
            )}
          </div>
        </div>

        <div className="destination-content">
          <form onSubmit={handleSubmit} className="destination-form">
            <div className="destination-form-header">
              <h2>{isEditing ? "Edit Destination" : "Create New Destination"}</h2>
              {isEditing && (
                <button
                  type="button"
                  className="destination-delete-button"
                  onClick={confirmDelete}
                  aria-label="Delete destination"
                >
                  Delete
                </button>
              )}
            </div>

            <div className="destination-form-group">
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="destination-form-group description-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                required
              ></textarea>
            </div>

            <div className="destination-form-row">
              <div className="destination-form-group">
                <label htmlFor="difficulty">Difficulty *</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="destination-form-group">
                <label htmlFor="duration">Duration *</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="e.g. 4-5 hours"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="destination-form-group">
              <label htmlFor="trailhead">Trailhead *</label>
              <input
                type="text"
                id="trailhead"
                name="trailhead"
                value={formData.trailhead}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="destination-form-section">
              <h3>Coordinates</h3>
              <div className="destination-form-row">
                <div className="destination-form-group">
                  <label htmlFor="location.lat">Destination Latitude *</label>
                  <input
                    type="number"
                    id="location.lat"
                    name="location.lat"
                    step="0.0001"
                    value={formData.location.lat}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="destination-form-group">
                  <label htmlFor="location.lng">Destination Longitude *</label>
                  <input
                    type="number"
                    id="location.lng"
                    name="location.lng"
                    step="0.0001"
                    value={formData.location.lng}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="destination-form-row">
                <div className="destination-form-group">
                  <label htmlFor="trailheadLocation.lat">Trailhead Latitude *</label>
                  <input
                    type="number"
                    id="trailheadLocation.lat"
                    name="trailheadLocation.lat"
                    step="0.0001"
                    value={formData.trailheadLocation.lat}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="destination-form-group">
                  <label htmlFor="trailheadLocation.lng">Trailhead Longitude *</label>
                  <input
                    type="number"
                    id="trailheadLocation.lng"
                    name="trailheadLocation.lng"
                    step="0.0001"
                    value={formData.trailheadLocation.lng}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="destination-form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="/assets/image.jpg"
              />
            </div>

            <div className="destination-form-actions">
              <button type="button" className="destination-cancel-button" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="destination-save-button">
                {isEditing ? "Save Changes" : "Create Destination"}
              </button>
            </div>
          </form>

          {isEditing && currentDestination && (
            <div className="destination-reviews-section">
              <h3>Reviews ({currentDestination.reviews.length})</h3>
              {currentDestination.reviews.length > 0 ? (
                <div className="destination-reviews-list">
                  {currentDestination.reviews.map((review, index) => (
                    <div key={index} className="destination-review-item">
                      <div className="destination-review-header">
                        <span className="destination-review-user">{review.user}</span>
                        <span className="destination-review-rating">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </div>
                      <p className="destination-review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="destination-no-reviews">No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="destination-delete-modal-overlay">
          <div className="destination-delete-modal">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete <strong>{currentDestination?.name}</strong>? This action cannot be undone.
            </p>
            <div className="destination-modal-actions">
              <button className="destination-cancel-button" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="destination-delete-button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DestinationManagement

