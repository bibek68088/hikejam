import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Pause, Play, ZoomIn } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('masonry');
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        
        // Use the Admin API endpoint
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search?expression=resource_type:image`;
        
        // Create the authentication string
        const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
        const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
        const auth = btoa(`${apiKey}:${apiSecret}`);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'omit' // Important for CORS
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Process and sort images
        const processedImages = data.resources
          .map(img => ({
            src: img.secure_url,
            caption: img.public_id.split('/').pop(),
            height: img.height,
            width: img.width,
            created_at: new Date(img.created_at)
          }))
          .sort((a, b) => b.created_at - a.created_at); // Sort by newest first

        setImages(processedImages);
        setError(null);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load images. Please try again later.');
      }
    };

    fetchImages();
  }, []);


  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setSelectedImage(images[(currentIndex + 1) % images.length]);
  };

  useEffect(() => {
    let interval;
    if (isPlaying && selectedImage) {
      interval = setInterval(handleNext, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedImage]);

  return (
    <div className="gallery-container">
      <div className="gallery-content">
        <h1 className="gallery-title">Image Gallery</h1>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${activeTab === 'masonry' ? 'active' : ''}`}
              onClick={() => setActiveTab('masonry')}
            >
              Grid View
            </button>
            <button
              className={`tab-button ${activeTab === 'carousel' ? 'active' : ''}`}
              onClick={() => setActiveTab('carousel')}
            >
              Slideshow
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'masonry' && (
              <div className="masonry-grid">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="grid-item"
                    onClick={() => handleImageClick(image, index)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="image-container"
                    >
                      <img
                        src={image.src}
                        alt={image.caption}
                        className="grid-image"
                      />
                      <div className="image-overlay">
                        <ZoomIn className="zoom-icon" />
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'carousel' && (
              <div className="carousel-container">
                <div className="carousel-content">
                  <img
                    src={images[currentIndex]?.src}
                    alt={images[currentIndex]?.caption}
                    className="carousel-image"
                  />
                  <div className="carousel-overlay">
                    <p className="carousel-caption">
                      {images[currentIndex]?.caption}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="carousel-button prev"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                    className="carousel-button next"
                  >
                    <ChevronRight />
                  </button>
                </div>
                <div className="carousel-controls">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="play-button"
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal"
              onClick={closeModal}
            >
              <button
                className="close-button"
                onClick={closeModal}
              >
                <X />
              </button>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  className="modal-image"
                />
                <div className="modal-caption">
                  <p>{selectedImage.caption}</p>
                </div>
                <button
                  onClick={handlePrevious}
                  className="modal-nav prev"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="modal-nav next"
                >
                  <ChevronRight />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;