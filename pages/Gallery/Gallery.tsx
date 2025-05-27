"use client";

import React, { useState, useEffect, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Pause,
  Play,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";

// Define TypeScript interfaces
interface GalleryImage {
  src: string;
  caption: string;
  height: number;
  width: number;
}

// Static image data (replace with actual images or Cloudinary fetch)
const staticImages: GalleryImage[] = [
  {
    src: "/images/image1.jpg",
    caption: "Mountain View",
    height: 600,
    width: 800,
  },
  {
    src: "/images/image2.jpg",
    caption: "Forest Trail",
    height: 600,
    width: 800,
  },
  {
    src: "/images/image3.jpg",
    caption: "Sunset Peak",
    height: 600,
    width: 800,
  },
  {
    src: "/images/image4.jpg",
    caption: "River Valley",
    height: 600,
    width: 800,
  },
  {
    src: "/images/image5.jpg",
    caption: "Hiking Path",
    height: 600,
    width: 800,
  },
];

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>(staticImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"masonry" | "carousel">("masonry");
  const [error, setError] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<
    "prev" | "next" | "play" | "close" | null
  >(null);
  const [columns, setColumns] = useState<number>(1);

  // Handle responsive masonry grid columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setColumns(4);
      } else if (window.innerWidth >= 1024) {
        setColumns(3);
      } else if (window.innerWidth >= 640) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle carousel autoplay
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && selectedImage) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setSelectedImage(images[(currentIndex + 1) % images.length]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedImage, currentIndex, images]);

  const handleImageClick = (image: GalleryImage, index: number) => {
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
    setSelectedImage(
      images[(currentIndex - 1 + images.length) % images.length]
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setSelectedImage(images[(currentIndex + 1) % images.length]);
  };

  // Inline styles
  const galleryContainerStyle: CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    padding: "2rem",
  };

  const galleryContentStyle: CSSProperties = {
    maxWidth: "1280px",
    margin: "0 auto",
  };

  const galleryTitleStyle: CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: 300,
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: "3rem",
  };

  const errorMessageStyle: CSSProperties = {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    padding: "1rem",
    borderRadius: "0.5rem",
    textAlign: "center",
    margin: "2rem auto",
    maxWidth: "600px",
  };

  const tabsStyle: CSSProperties = {
    width: "100%",
  };

  const tabsListStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2.5rem",
    backgroundColor: "#f9fafb",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    borderRadius: "0.5rem",
    padding: "0.25rem",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    border: "1px solid #f3f4f6",
  };

  const tabButtonStyle = (
    isActive: boolean,
    isHovered: boolean
  ): CSSProperties => ({
    padding: "0.5rem 1.5rem",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: isActive ? "#1a1a1a" : "#4b5563",
    backgroundColor: isActive
      ? "white"
      : isHovered
      ? "rgba(255, 255, 255, 0.5)"
      : "none",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ...(isActive && { boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }),
  });

  const masonryGridStyle: CSSProperties = {
    columns: columns,
    gap: "1.5rem",
    width: "100%",
  };

  const gridItemStyle: CSSProperties = {
    breakInside: "avoid",
    marginBottom: "1.5rem",
    position: "relative",
  };

  const imageContainerStyle: CSSProperties = {
    position: "relative",
    cursor: "pointer",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
  };

  const gridImageStyle = (isHovered: boolean): CSSProperties => ({
    width: "100%",
    height: "auto",
    borderRadius: "0.5rem",
    boxShadow: isHovered
      ? "0 4px 6px rgba(0, 0, 0, 0.1)"
      : "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "block",
    transform: isHovered ? "scale(1.02)" : "scale(1)",
  });

  const imageOverlayStyle = (isHovered: boolean): CSSProperties => ({
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.3s ease",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const zoomIconStyle = (isHovered: boolean): CSSProperties => ({
    width: "1.5rem",
    height: "1.5rem",
    color: "white",
    transform: isHovered ? "scale(1)" : "scale(0.8)",
    transition: "transform 0.3s ease",
  });

  const carouselContainerStyle: CSSProperties = {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    maxWidth: "896px",
    margin: "0 auto",
    border: "1px solid #f3f4f6",
  };

  const carouselContentStyle: CSSProperties = {
    position: "relative",
    aspectRatio: "16/9",
    borderRadius: "0.5rem",
    overflow: "hidden",
    backgroundColor: "#f9fafb",
  };

  const carouselImageStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  };

  const carouselOverlayStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
    padding: "2rem 1.5rem 1.5rem",
  };

  const carouselCaptionStyle: CSSProperties = {
    color: "white",
    fontSize: "1.125rem",
    fontWeight: 500,
    textAlign: "center",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  };

  const carouselButtonStyle = (isHovered: boolean): CSSProperties => ({
    position: "absolute",
    top: "50%",
    transform: isHovered ? "translateY(-50%) scale(1.1)" : "translateY(-50%)",
    backgroundColor: isHovered ? "white" : "rgba(255, 255, 255, 0.9)",
    padding: "0.75rem",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "#1a1a1a",
    zIndex: 10,
  });

  const carouselButtonPrevStyle: CSSProperties = {
    left: "1.5rem",
  };

  const carouselButtonNextStyle: CSSProperties = {
    right: "1.5rem",
  };

  const carouselControlsStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginTop: "1.5rem",
  };

  const playButtonStyle = (isHovered: boolean): CSSProperties => ({
    backgroundColor: isHovered ? "#f3f4f6" : "#f9fafb",
    padding: "0.75rem",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    color: "#4b5563",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  });

  const modalStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    backdropFilter: "blur(8px)",
  };

  const modalContentStyle: CSSProperties = {
    position: "relative",
    maxWidth: "1280px",
    width: "100%",
  };

  const closeButtonStyle = (isHovered: boolean): CSSProperties => ({
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
    color: isHovered ? "white" : "rgba(255, 255, 255, 0.8)",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    padding: "0.5rem",
    zIndex: 60,
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  });

  const modalImageStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    maxHeight: "90vh",
    objectFit: "contain",
    borderRadius: "0.375rem",
  };

  const modalCaptionStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1.5rem",
    textAlign: "center",
    color: "white",
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)",
  };

  const modalCaptionPStyle: CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: 500,
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  };

  const modalNavStyle = (isHovered: boolean): CSSProperties => ({
    position: "absolute",
    top: "50%",
    transform: isHovered ? "translateY(-50%) scale(1.1)" : "translateY(-50%)",
    backgroundColor: isHovered
      ? "rgba(255, 255, 255, 0.2)"
      : "rgba(255, 255, 255, 0.1)",
    padding: "0.75rem",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "white",
  });

  const modalNavPrevStyle: CSSProperties = {
    left: "1.5rem",
  };

  const modalNavNextStyle: CSSProperties = {
    right: "1.5rem",
  };

  return (
    <div style={galleryContainerStyle}>
      <div style={galleryContentStyle}>
        <h1 style={galleryTitleStyle}>Image Gallery</h1>
        {error && <div style={errorMessageStyle}>{error}</div>}

        <div style={tabsStyle}>
          <div style={tabsListStyle}>
            <button
              style={tabButtonStyle(
                activeTab === "masonry",
                hoveredTab === "masonry"
              )}
              onClick={() => setActiveTab("masonry")}
              onMouseEnter={() => setHoveredTab("masonry")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              Grid View
            </button>
            <button
              style={tabButtonStyle(
                activeTab === "carousel",
                hoveredTab === "carousel"
              )}
              onClick={() => setActiveTab("carousel")}
              onMouseEnter={() => setHoveredTab("carousel")}
              onMouseLeave={() => setHoveredTab(null)}
            >
              Slideshow
            </button>
          </div>

          <div>
            {activeTab === "masonry" && (
              <div style={masonryGridStyle}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    style={gridItemStyle}
                    onClick={() => handleImageClick(image, index)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={imageContainerStyle}
                      onMouseEnter={() => setHoveredImage(index)}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <Image
                        src={image.src}
                        alt={image.caption}
                        style={gridImageStyle(hoveredImage === index)}
                        width={image.width}
                        height={image.height}
                      />
                      <div style={imageOverlayStyle(hoveredImage === index)}>
                        <ZoomIn style={zoomIconStyle(hoveredImage === index)} />
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "carousel" && (
              <div style={carouselContainerStyle}>
                <div style={carouselContentStyle}>
                  <Image
                    src={images[currentIndex]?.src}
                    alt={images[currentIndex]?.caption}
                    style={carouselImageStyle}
                    width={896}
                    height={504} // 16:9 aspect ratio (896 * 9/16)
                  />
                  <div style={carouselOverlayStyle}>
                    <p style={carouselCaptionStyle}>
                      {images[currentIndex]?.caption}
                    </p>
                  </div>
                  <button
                    onClick={handlePrevious}
                    style={{
                      ...carouselButtonStyle(hoveredButton === "prev"),
                      ...carouselButtonPrevStyle,
                    }}
                    onMouseEnter={() => setHoveredButton("prev")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    style={{
                      ...carouselButtonStyle(hoveredButton === "next"),
                      ...carouselButtonNextStyle,
                    }}
                    onMouseEnter={() => setHoveredButton("next")}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <ChevronRight />
                  </button>
                </div>
                <div style={carouselControlsStyle}>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={playButtonStyle(hoveredButton === "play")}
                    onMouseEnter={() => setHoveredButton("play")}
                    onMouseLeave={() => setHoveredButton(null)}
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
              style={modalStyle}
              onClick={closeModal}
            >
              <button
                style={closeButtonStyle(hoveredButton === "close")}
                onClick={closeModal}
                onMouseEnter={() => setHoveredButton("close")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <X />
              </button>
              <div
                style={modalContentStyle}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  style={modalImageStyle}
                  width={1280}
                  height={720} // Arbitrary height, adjusted by object-fit
                />
                <div style={modalCaptionStyle}>
                  <p style={modalCaptionPStyle}>{selectedImage.caption}</p>
                </div>
                <button
                  onClick={handlePrevious}
                  style={{
                    ...modalNavStyle(hoveredButton === "prev"),
                    ...modalNavPrevStyle,
                  }}
                  onMouseEnter={() => setHoveredButton("prev")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    ...modalNavStyle(hoveredButton === "next"),
                    ...modalNavNextStyle,
                  }}
                  onMouseEnter={() => setHoveredButton("next")}
                  onMouseLeave={() => setHoveredButton(null)}
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
