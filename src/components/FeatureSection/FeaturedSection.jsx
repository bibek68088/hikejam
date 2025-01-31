import React, { useState } from "react";
import "./FeaturedSection.css";
import { destinations } from "../../data/destinations"; // Importing destinations data

const FeaturedSection = () => {
  return (
    <section className="featured-section">
      {destinations.map((destination, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={index} className="feature-item">
            {isEven ? (
              <>
                <div className="feature-description">
                  <h2>{destination.name}</h2>
                  <p>{destination.description}</p>
                </div>
                <Carousel images={destination.images} />
              </>
            ) : (
              <>
                <Carousel images={destination.images} />
                <div className="feature-description">
                  <h2>{destination.name}</h2>
                  <p>{destination.description}</p>
                </div>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-control prev" onClick={prevSlide}>&lt;</button>
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <button className="carousel-control next" onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default FeaturedSection;
