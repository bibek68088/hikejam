import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';
import Carousel from 'react-bootstrap/Carousel'; // or the appropriate Carousel library


const Gallery = () => {
  const [imageGallery, setImageGallery] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.cloudinary.com/v1_1/dwehxenro/resources/image`, // Replace YOUR_CLOUD_NAME
          {
            params: {
              max_results: 100, // Fetch up to 100 images
              next_cursor: '',  // Leave empty for the first request
            },
            headers: {
              Authorization: `Basic ${btoa('845265365279399' + ':' + 'PhaNiyN5vSE8POojTaHP-ht6wQo')}`, // Replace YOUR_API_KEY and YOUR_API_SECRET
            },
          }
        );

        // Filter out sample images
        const images = response.data.resources
          .filter(image => !image.public_id.includes("sample")) // Exclude images with "sample" in the public_id
          .map(image => ({
            src: image.url,
            caption: image.public_id,
          }));

        setImageGallery(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Hiking Adventure Gallery</h1>
      <div className="carousel-wrapper">
        <Carousel showThumbs={false} dynamicHeight={true} infiniteLoop={true} autoPlay>
          {imageGallery.map((image, index) => (
            <div className="carousel-slide" key={index}>
              <img src={image.src} alt={image.caption} />
              <p className="carousel-caption">{image.caption}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="grid-gallery">
        {imageGallery.map((image, index) => (
          <div className="grid-item" key={index}>
            <img src={image.src} alt={image.caption} />
            <div className="overlay">
              <p className="overlay-caption">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
