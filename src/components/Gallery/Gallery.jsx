import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Pause, Play, ZoomIn } from 'lucide-react';
import data from './data';  // Changed from named import to default import
import './Gallery.css';

const Gallery = () => {
  const [images] = useState(data);  // Using the imported default data
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('masonry');

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

  React.useEffect(() => {
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
                  <div key={index} className="grid-item" onClick={() => handleImageClick(image, index)}>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: index * 0.1 }} 
                      className="image-container"
                    >
                      <img src={image.src} alt={image.caption} className="grid-image" />
                      <div className="image-overlay"><ZoomIn className="zoom-icon" /></div>
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
                    <p className="carousel-caption">{images[currentIndex]?.caption}</p>
                  </div>
                  <button onClick={handlePrevious} className="carousel-button prev">
                    <ChevronLeft />
                  </button>
                  <button onClick={handleNext} className="carousel-button next">
                    <ChevronRight />
                  </button>
                </div>
                <div className="carousel-controls">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="play-button">
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
              <button className="close-button" onClick={closeModal}><X /></button>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={selectedImage.src} alt={selectedImage.caption} className="modal-image" />
                <div className="modal-caption"><p>{selectedImage.caption}</p></div>
                <button onClick={handlePrevious} className="modal-nav prev">
                  <ChevronLeft />
                </button>
                <button onClick={handleNext} className="modal-nav next">
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