import React from "react";
import "./FeaturedSection.css";
import { destinations } from '../../data.js';

const FeaturedSection = () => {
  return (
    <section className="featured-section">
      <h2 className="section-title">Explore Our Top Picks</h2>
      {destinations.map((destination, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={index} className={`feature-item ${isEven ? "even" : "odd"}`}>
            <div className="feature-image-container">
              <img 
                className="feature-image" 
                src={destination.image} 
                alt={destination.name} 
                loading="lazy"
              />
            </div>
            <div className="feature-description">
              <h2>{destination.name}</h2>
              <p>{destination.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FeaturedSection;